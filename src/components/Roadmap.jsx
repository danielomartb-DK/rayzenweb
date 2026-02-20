import { motion } from 'framer-motion';

const milestones = [
    {
        phase: 'Tema 1',
        title: 'Internet y sus Orígenes',
        description: 'Historia de Internet, ARPANET, evolución de la red global, conmutación de paquetes y la creación de la World Wide Web por Tim Berners-Lee.',
        status: 'completed',
        icon: '🌍',
    },
    {
        phase: 'Tema 2',
        title: 'Protocolos de Comunicación',
        description: 'Reglas fundamentales que gobiernan la transmisión de datos: sintaxis, semántica y temporización. Servicios de Internet: HTTP, FTP, SMTP, DNS, VoIP.',
        status: 'completed',
        icon: '📨',
    },
    {
        phase: 'Tema 3',
        title: 'Modelos de Red (OSI y TCP/IP)',
        description: 'Modelo OSI de 7 capas como referencia teórica y modelo TCP/IP de 4 capas como implementación práctica. Direccionamiento IP, puertos y subnetting.',
        status: 'current',
        icon: '📡',
    },
    {
        phase: 'Tema 4',
        title: 'Arquitectura Web',
        description: 'Modelo Cliente-Servidor, arquitectura de tres capas (presentación, lógica, datos), navegadores, servidores web y CGI.',
        status: 'upcoming',
        icon: '🏗️',
    },
    {
        phase: 'Tema 5',
        title: 'Protocolo HTTP y la Web',
        description: 'Peticiones HTTP (GET, POST, PUT, DELETE), códigos de estado, HTTPS, y organizaciones de Internet (W3C, ICANN, IETF).',
        status: 'upcoming',
        icon: '🌐',
    },
];

function getStatusStyles(status) {
    switch (status) {
        case 'completed':
            return {
                dot: 'bg-neon-cyan',
                dotShadow: '0 0 20px rgba(6,253,216,0.6), 0 0 40px rgba(6,253,216,0.2)',
                badge: 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10',
                card: 'border-neon-cyan/20 hover:border-neon-cyan/40',
                label: 'Completado ✓',
            };
        case 'current':
            return {
                dot: 'bg-neon-blue animate-pulse-glow',
                dotShadow: '0 0 20px rgba(0,212,255,0.6), 0 0 40px rgba(0,212,255,0.2)',
                badge: 'text-neon-blue border-neon-blue/30 bg-neon-blue/10',
                card: 'border-neon-blue/30 glow-blue hover:border-neon-blue/50',
                label: 'En progreso ◉',
            };
        default:
            return {
                dot: 'bg-gray-600',
                dotShadow: 'none',
                badge: 'text-gray-500 border-gray-600 bg-gray-800',
                card: 'border-gray-700/50 hover:border-gray-600/50',
                label: 'Próximamente',
            };
    }
}

export default function Roadmap() {
    return (
        <section id="roadmap" className="relative section-block overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 container-main flex flex-col items-center">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                    style={{ marginBottom: '64px' }}
                >
                    <span className="inline-block !px-5 !py-2 rounded-full glass text-neon-cyan text-sm font-medium" style={{ marginBottom: '20px' }}>
                        🗺️ Ruta de Aprendizaje
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold font-[Outfit]" style={{ marginBottom: '20px' }}>
                        Tu <span className="gradient-text">Roadmap</span> del Curso
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed mx-auto" style={{ maxWidth: '640px' }}>
                        Recorrido estructurado desde los fundamentos de Internet
                        hasta el dominio del protocolo HTTP y la arquitectura web.
                    </p>
                </motion.div>

                {/* ===== TIMELINE ===== */}

                {/* Mobile layout: single column */}
                <div className="md:hidden relative" style={{ maxWidth: '500px', margin: '0 auto' }}>
                    {/* Line */}
                    <div className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-blue to-gray-700" style={{ left: '20px' }} />

                    {milestones.map((m, i) => {
                        const s = getStatusStyles(m.status);
                        return (
                            <motion.div
                                key={m.phase}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                style={{ paddingLeft: '52px', paddingBottom: i < milestones.length - 1 ? '40px' : '0' }}
                                className="relative"
                            >
                                {/* Dot */}
                                <div className="absolute" style={{ left: '13px', top: '24px' }}>
                                    <div className={`w-[14px] h-[14px] rounded-full ${s.dot}`} style={{ boxShadow: s.dotShadow }} />
                                </div>

                                {/* Card */}
                                <div className={`glass rounded-2xl border ${s.card} transition-all duration-300`} style={{ padding: '24px' }}>
                                    <div className="flex items-center flex-wrap" style={{ gap: '10px', marginBottom: '12px' }}>
                                        <span className="text-xl">{m.icon}</span>
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${s.badge}`}>{m.phase}</span>
                                        <span className={`text-[10px] ml-auto px-2 py-0.5 rounded-full ${s.badge}`}>{s.label}</span>
                                    </div>
                                    <h3 className="text-base font-bold font-[Outfit] text-white" style={{ marginBottom: '8px' }}>{m.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{m.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Desktop layout: centered alternating timeline */}
                <div className="hidden md:block relative mx-auto" style={{ maxWidth: '960px' }}>
                    {/* Center vertical line */}
                    <div
                        className="absolute bg-gradient-to-b from-neon-cyan via-neon-blue to-gray-700"
                        style={{ left: '50%', transform: 'translateX(-50%)', top: 0, bottom: 0, width: '2px' }}
                    />

                    {milestones.map((m, i) => {
                        const s = getStatusStyles(m.status);
                        const isLeft = i % 2 === 0;

                        return (
                            <motion.div
                                key={m.phase}
                                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.5, delay: i * 0.12 }}
                                className="relative"
                                style={{ paddingBottom: i < milestones.length - 1 ? '56px' : '0' }}
                            >
                                {/* Center dot */}
                                <div
                                    className="absolute z-20"
                                    style={{ left: '50%', transform: 'translateX(-50%)', top: '28px' }}
                                >
                                    <div
                                        className={`rounded-full ${s.dot}`}
                                        style={{ width: '16px', height: '16px', boxShadow: s.dotShadow }}
                                    />
                                </div>

                                {/* Horizontal connector line */}
                                <div
                                    className="absolute"
                                    style={{
                                        top: '35px',
                                        height: '2px',
                                        background: 'rgba(255,255,255,0.08)',
                                        ...(isLeft
                                            ? { right: '50%', width: '32px', marginRight: '8px' }
                                            : { left: '50%', width: '32px', marginLeft: '8px' }
                                        ),
                                    }}
                                />

                                {/* Card row: use grid to force exact 50/50 split */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
                                    {isLeft ? (
                                        <>
                                            {/* Card on the LEFT */}
                                            <div>
                                                <div className={`glass rounded-2xl border ${s.card} transition-all duration-300 hover:translate-y-[-4px]`} style={{ padding: '28px' }}>
                                                    <div className="flex items-center flex-wrap" style={{ gap: '10px', marginBottom: '14px' }}>
                                                        <span className="text-2xl">{m.icon}</span>
                                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${s.badge}`}>{m.phase}</span>
                                                        <span className={`text-[10px] ml-auto px-2 py-0.5 rounded-full ${s.badge}`}>{s.label}</span>
                                                    </div>
                                                    <h3 className="text-lg font-bold font-[Outfit] text-white" style={{ marginBottom: '10px' }}>{m.title}</h3>
                                                    <p className="text-gray-400 text-sm leading-relaxed">{m.description}</p>
                                                </div>
                                            </div>
                                            {/* Empty right side */}
                                            <div />
                                        </>
                                    ) : (
                                        <>
                                            {/* Empty left side */}
                                            <div />
                                            {/* Card on the RIGHT */}
                                            <div>
                                                <div className={`glass rounded-2xl border ${s.card} transition-all duration-300 hover:translate-y-[-4px]`} style={{ padding: '28px' }}>
                                                    <div className="flex items-center flex-wrap" style={{ gap: '10px', marginBottom: '14px' }}>
                                                        <span className="text-2xl">{m.icon}</span>
                                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${s.badge}`}>{m.phase}</span>
                                                        <span className={`text-[10px] ml-auto px-2 py-0.5 rounded-full ${s.badge}`}>{s.label}</span>
                                                    </div>
                                                    <h3 className="text-lg font-bold font-[Outfit] text-white" style={{ marginBottom: '10px' }}>{m.title}</h3>
                                                    <p className="text-gray-400 text-sm leading-relaxed">{m.description}</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
