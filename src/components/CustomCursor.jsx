import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
    const canvasRef = useRef(null);
    const mainDotRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        // Only enable on fine pointer (desktop)
        if (!window.matchMedia('(pointer: fine)').matches) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', handleResize);

        // Initial positions
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let rafId = null;

        // --- Liquid Physics Configuration ---
        const numPoints = 16;
        // Spring nodes that follow each other
        const points = Array.from({ length: numPoints }, () => ({ x: mouseX, y: mouseY, vx: 0, vy: 0 }));
        const ripples = [];

        let hoverState = false; // Accessible immediately in animation loop
        let magneticElement = null;

        // --- Animation Loop ---
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // 1. Instantly update main solid dot via styles (zero latency)
            if (mainDotRef.current) {
                mainDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            }

            // 2. Calculate Spring Physics for Liquid Tail
            let leader = { x: mouseX, y: mouseY };

            for (let i = 0; i < numPoints; i++) {
                const p = points[i];

                // Distance to the node ahead of it
                const dx = leader.x - p.x;
                const dy = leader.y - p.y;

                // Acceleration / Spring pull
                p.vx += dx * 0.45;
                p.vy += dy * 0.45;

                // Friction / Damping to prevent infinite oscillation
                p.vx *= 0.55;
                p.vy *= 0.55;

                p.x += p.vx;
                p.y += p.vy;

                // Current point becomes the leader for the next point
                leader = p;
            }

            // 3. Draw Water Ripple Waves (Clicks)
            for (let i = ripples.length - 1; i >= 0; i--) {
                const r = ripples[i];
                r.radius += r.speed;
                r.alpha -= 0.02; // fade out

                if (r.alpha <= 0) {
                    ripples.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.arc(r.centerX, r.centerY, r.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(0, 212, 255, ${r.alpha})`;
                ctx.lineWidth = 1 + r.alpha * 3;
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#00d4ff';
                ctx.stroke();
            }

            // 4. Draw Liquid Trail Path
            if (points[0]) {
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);

                // Quadratic curves for smooth blob line
                for (let i = 1; i < numPoints - 1; i++) {
                    const xc = (points[i].x + points[i + 1].x) / 2;
                    const yc = (points[i].y + points[i + 1].y) / 2;
                    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
                }
                ctx.quadraticCurveTo(
                    points[numPoints - 2].x, points[numPoints - 2].y,
                    points[numPoints - 1].x, points[numPoints - 1].y
                );

                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';

                // Dynamically react to hover
                ctx.lineWidth = hoverState ? 12 : 6;

                // Fading gradient tail
                const grad = ctx.createLinearGradient(points[0].x, points[0].y, points[numPoints - 1].x, points[numPoints - 1].y);
                grad.addColorStop(0, 'rgba(6, 253, 216, 0.8)'); // Neon Cyan start
                grad.addColorStop(1, 'rgba(0, 212, 255, 0)');   // Fade to transparent blue

                ctx.strokeStyle = grad;
                ctx.shadowBlur = hoverState ? 20 : 10;
                ctx.shadowColor = '#06fdd8';
                ctx.stroke();
            }

            // 5. Draw Deep Ambient Glow Base
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, hoverState ? 80 : 40, 0, Math.PI * 2);
            ctx.fillStyle = hoverState
                ? 'rgba(0, 253, 255, 0.08)'
                : 'rgba(0, 212, 255, 0.05)';
            ctx.shadowBlur = hoverState ? 30 : 15;
            ctx.shadowColor = '#00d4ff';
            ctx.fill();

            // Ensure crisp rendering in loop
            ctx.shadowBlur = 0;

            // --- Magnetic Effect Update ---
            if (magneticElement) {
                const rect = magneticElement.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // Calculate distance from center of the hovered element
                const distX = mouseX - centerX;
                const distY = mouseY - centerY;

                // Apply magnetic pull
                const pullX = distX * 0.2;
                const pullY = distY * 0.2;

                magneticElement.style.transform = `translate(${pullX}px, ${pullY}px)`;
            }

            rafId = requestAnimationFrame(animate);
        };

        // --- Global Event Listeners ---
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeaveGlobal = () => setIsVisible(false);
        const handleMouseEnterGlobal = () => setIsVisible(true);

        const handleMouseDown = () => {
            setIsClicking(true);
            // Generate double ripple wave
            ripples.push({
                centerX: mouseX,
                centerY: mouseY,
                radius: 5,
                speed: 3 + Math.random() * 2,
                alpha: 1
            });
            ripples.push({
                centerX: mouseX,
                centerY: mouseY,
                radius: 15,
                speed: 5 + Math.random() * 2,
                alpha: 0.8
            });
        };

        const handleMouseUp = () => setIsClicking(false);

        // Contextual Hover Logic (Anchors, Buttons)
        const handleMouseOver = (e) => {
            const target = e.target;
            const interactive = target.closest('a') || target.closest('button') || target.closest('.cursor-pointer') || target.closest('.btn-neon') || target.closest('.btn-neon-outline');

            if (interactive) {
                setIsHovering(true);
                hoverState = true;

                // Activate magnetic effect on buttons
                if (interactive.classList.contains('btn-neon') || interactive.classList.contains('btn-neon-outline')) {
                    magneticElement = interactive;
                    // Set linear transition to prevent lag while following mouse
                    interactive.style.transition = 'transform 0.1s linear, background-color 0.3s, box-shadow 0.3s, color 0.3s';
                }
            }
        };

        const handleMouseOut = (e) => {
            const target = e.target;
            const interactive = target.closest('a') || target.closest('button') || target.closest('.cursor-pointer') || target.closest('.btn-neon') || target.closest('.btn-neon-outline');

            if (interactive) {
                setIsHovering(false);
                hoverState = false;

                // Release magnetic effect
                if (magneticElement === interactive) {
                    magneticElement.style.transform = 'translate(0px, 0px)';
                    // Restore smooth bounce-back transition
                    magneticElement.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.3s, box-shadow 0.3s, color 0.3s';
                    magneticElement = null;
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeaveGlobal);
        document.body.addEventListener('mouseenter', handleMouseEnterGlobal);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', handleMouseOut);

        // Initial start
        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeaveGlobal);
            document.body.removeEventListener('mouseenter', handleMouseEnterGlobal);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(rafId);
        };
    }, []);

    const containerClass = `fixed inset-0 pointer-events-none z-[9999] hidden md:block transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`;

    return (
        <div className={containerClass}>
            {/* 
        High Performance Canvas
        Handles Liquid Physics Trail, Ambient Glow, and Ripple Waves 
      */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
                style={{ width: '100vw', height: '100vh', mixBlendMode: 'screen' }}
            />

            {/* 
        Primary Physical Target
        Zero-latency central bright core 
      */}
            <div
                ref={mainDotRef}
                className="absolute left-0 top-0 rounded-full"
                style={{
                    width: isHovering ? '16px' : '12px',
                    height: isHovering ? '16px' : '12px',
                    marginLeft: isHovering ? '-8px' : '-6px',
                    marginTop: isHovering ? '-8px' : '-6px',
                    backgroundColor: isClicking ? '#ffffff' : '#e0ffff',
                    boxShadow: isHovering
                        ? '0 0 20px 5px #06fdd8, 0 0 40px 10px #00d4ff, 0 0 60px 15px #00d4ff'
                        : '0 0 15px 4px #06fdd8, 0 0 30px 8px #00d4ff',
                    transition: 'width 0.2s, height 0.2s, background-color 0.2s, box-shadow 0.2s, margin 0.2s',
                    willChange: 'transform',
                }}
            />
        </div>
    );
}
