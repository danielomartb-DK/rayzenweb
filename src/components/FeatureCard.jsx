import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

export default function FeatureCard({ icon, title, description, details, color = 'blue', index = 0, isExpanded, onToggle }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

    const colorMap = {
        blue: { border: 'hover:border-neon-blue/40', shadow: 'hover:shadow-[0_0_30px_rgba(0,212,255,0.15)]', iconBg: 'from-neon-blue/20 to-neon-blue/5', dot: 'bg-neon-blue' },
        purple: { border: 'hover:border-neon-purple/40', shadow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]', iconBg: 'from-neon-purple/20 to-neon-purple/5', dot: 'bg-neon-purple' },
        cyan: { border: 'hover:border-neon-cyan/40', shadow: 'hover:shadow-[0_0_30px_rgba(6,253,216,0.15)]', iconBg: 'from-neon-cyan/20 to-neon-cyan/5', dot: 'bg-neon-cyan' },
        pink: { border: 'hover:border-neon-pink/40', shadow: 'hover:shadow-[0_0_30px_rgba(244,114,182,0.15)]', iconBg: 'from-neon-pink/20 to-neon-pink/5', dot: 'bg-neon-pink' },
    };

    const c = colorMap[color] || colorMap.blue;

    function handleMouseMove(e) {
        if (isExpanded) return;
        const rect = ref.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(px);
        y.set(py);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onToggle}
            style={{ rotateX: isExpanded ? 0 : rotateX, rotateY: isExpanded ? 0 : rotateY, transformStyle: 'preserve-3d', padding: '28px' }}
            className={`glass rounded-2xl transition-all duration-300 cursor-pointer ${c.border} ${c.shadow} ${isExpanded ? 'ring-1 ring-neon-blue/30 glow-blue' : ''}`}
        >
            <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${c.iconBg} flex items-center justify-center text-2xl mb-4`}
                style={{ transform: 'translateZ(30px)' }}
            >
                {icon}
            </div>
            <h3
                className="text-lg font-bold font-[Outfit] text-white mb-2"
                style={{ transform: 'translateZ(20px)' }}
            >
                {title}
            </h3>
            <p
                className="text-gray-400 leading-relaxed text-sm mb-3"
                style={{ transform: 'translateZ(10px)' }}
            >
                {description}
            </p>

            {/* Expand indicator */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
                <motion.span
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-neon-cyan"
                >
                    ▶
                </motion.span>
                <span>{isExpanded ? 'Ocultar detalles' : 'Ver contenido detallado'}</span>
            </div>

            {/* Expandable details */}
            <AnimatePresence>
                {isExpanded && details && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                            {details.map((detail, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-start gap-2 text-sm text-gray-300"
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-1.5 shrink-0`} />
                                    <span>{detail}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
