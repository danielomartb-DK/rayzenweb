import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative overflow-hidden"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Animated gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-neon-blue/10 blur-[120px] animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-neon-purple/15 blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-cyan/5 blur-[140px] animate-float" style={{ animationDelay: '4s' }} />
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Content wrapper — perfectly centered */}
            <div
                className="relative z-10"
                style={{
                    width: '100%',
                    maxWidth: '1280px',
                    margin: '0 auto',
                    padding: '140px 24px 80px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block !p-4 rounded-full glass text-neon-cyan text-sm font-medium glow-cyan">
                        🌐 Unidad Académica · Programación Web
                    </span>
                </motion.div>

                <div style={{ height: '32px' }} />

                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="font-extrabold font-[Outfit] leading-tight"
                    style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)', width: '100%', maxWidth: '900px' }}
                >
                    Programación{' '}
                    <span className="gradient-text glow-text-blue">Web</span>
                </motion.h1>

                <div style={{ height: '16px' }} />

                {/* Subtitle */}
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.25 }}
                    className="font-bold font-[Outfit] text-gray-300"
                    style={{ fontSize: 'clamp(1.25rem, 3vw, 2.25rem)', width: '100%', maxWidth: '900px' }}
                >
                    Redes y Arquitectura Web
                </motion.h2>

                <div style={{ height: '32px' }} />

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35 }}
                    className="text-gray-400 leading-relaxed"
                    style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.125rem)', width: '100%', maxWidth: '600px' }}
                >
                    Plataforma interactiva de aprendizaje. Explora los fundamentos de Internet,
                    modelos de red, protocolos de comunicación, arquitectura cliente-servidor
                    y el funcionamiento de la Web moderna.
                </motion.p>

                <div style={{ height: '48px' }} />

                {/* CTA Buttons — centered row */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '24px',
                    }}
                >
                    <a href="#features" className="btn-neon">
                        Explorar Temáticas →
                    </a>
                    <a href="#roadmap" className="btn-neon-outline">
                        Ver Ruta de Aprendizaje
                    </a>
                </motion.div>

                <div style={{ height: '64px' }} />

                {/* Stats — centered grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.65 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '20px',
                        width: '100%',
                        maxWidth: '800px',
                    }}
                >
                    {[
                        { value: '12', label: 'Temáticas' },
                        { value: '7+', label: 'Protocolos' },
                        { value: '2', label: 'Modelos de Red' },
                        { value: '∞', label: 'Conexiones' },
                    ].map((stat) => (
                        <motion.div
                            key={stat.label}
                            whileHover={{ scale: 1.05 }}
                            className="glass rounded-2xl"
                            style={{
                                padding: '28px 16px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <div className="font-bold gradient-text font-[Outfit]" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}>
                                {stat.value}
                            </div>
                            <div className="text-gray-400" style={{ fontSize: '0.8rem', marginTop: '8px' }}>
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
