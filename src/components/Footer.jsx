import { motion } from 'framer-motion';

const footerLinks = [
    {
        title: 'Temáticas',
        links: [
            { label: 'Internet', href: '#features' },
            { label: 'Modelo OSI', href: '#features' },
            { label: 'TCP/IP', href: '#features' },
            { label: 'Protocolos', href: '#features' },
            { label: 'HTTP', href: '#features' },
        ],
    },
    {
        title: 'Arquitectura',
        links: [
            { label: 'Cliente-Servidor', href: '#features' },
            { label: 'Tres Capas', href: '#features' },
            { label: 'Puertos de Red', href: '#features' },
            { label: 'Direcciones IP', href: '#features' },
        ],
    },
    {
        title: 'Recursos',
        links: [
            { label: 'MDN Web Docs', href: '#' },
            { label: 'W3Schools', href: '#' },
            { label: 'RFC Editor', href: '#' },
            { label: 'Can I Use', href: '#' },
        ],
    },
    {
        title: 'Organizaciones',
        links: [
            { label: 'W3C', href: '#' },
            { label: 'ICANN', href: '#' },
            { label: 'IETF', href: '#' },
            { label: 'Internet Society', href: '#' },
            { label: 'IEEE', href: '#' },
        ],
    },
];

const socialLinks = ['GitHub', 'MDN', 'W3Schools', 'Stack Overflow'];

export default function Footer() {
    return (
        <footer id="footer" className="relative overflow-hidden">
            {/* Top gradient divider */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent" />

            {/* ===== CTA SECTION ===== */}
            <div style={{ paddingTop: '120px', paddingBottom: '120px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="container-main text-center flex flex-col items-center"
                >
                    <div className="mx-auto" style={{ maxWidth: '680px' }}>
                        <h2 className="text-3xl md:text-5xl font-extrabold font-[Outfit] leading-tight" style={{ marginBottom: '24px' }}>
                            ¿Listo para{' '}
                            <span className="gradient-text">Dominar</span>
                            <br className="hidden sm:block" />
                            {' '}la Programación Web?
                        </h2>

                        <p className="text-gray-400 text-base md:text-lg leading-relaxed mx-auto" style={{ maxWidth: '520px', marginBottom: '40px' }}>
                            Explora cada temática, comprende la arquitectura de Internet
                            y conviértete en un profesional del desarrollo web.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: '16px' }}>
                            <a href="#features" className="btn-neon">Explorar Temáticas →</a>
                            <a href="#roadmap" className="btn-neon-outline">Ver Ruta Completa</a>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ===== LINKS + BOTTOM BAR ===== */}
            <div style={{ background: 'rgba(8, 8, 24, 0.6)' }}>
                <div className="container-main flex flex-col items-center">

                    {/* Links Grid */}
                    <div style={{ paddingTop: '64px', paddingBottom: '64px' }}>
                        <div
                            className="grid grid-cols-2 lg:grid-cols-4 mx-auto"
                            style={{ maxWidth: '880px', gap: '48px 64px' }}
                        >
                            {footerLinks.map((col) => (
                                <div key={col.title}>
                                    <h4
                                        className="text-xs font-bold text-white uppercase tracking-widest font-[Outfit]"
                                        style={{ marginBottom: '24px', letterSpacing: '0.1em' }}
                                    >
                                        {col.title}
                                    </h4>
                                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {col.links.map((link) => (
                                            <li key={link.label}>
                                                <a
                                                    href={link.href}
                                                    className="text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-200"
                                                >
                                                    {link.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Separator */}
                    <div className="mx-auto" style={{ maxWidth: '880px' }}>
                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                    </div>

                    {/* Bottom Bar */}
                    <div style={{ paddingTop: '32px', paddingBottom: '32px' }}>
                        <div
                            className="flex flex-col md:flex-row items-center justify-between mx-auto"
                            style={{ maxWidth: '880px', gap: '24px' }}
                        >
                            {/* Logo */}
                            <div className="flex items-center" style={{ gap: '12px' }}>
                                <div
                                    className="rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center"
                                    style={{ width: '32px', height: '32px' }}
                                >
                                    <span className="text-white font-bold text-xs font-[Outfit]">⟨/⟩</span>
                                </div>
                                <span className="text-sm font-semibold font-[Outfit] gradient-text">
                                    RayzenWeb
                                </span>
                            </div>

                            {/* Copyright */}
                            <p className="text-xs text-gray-500 text-center">
                                © 2026 RayzenWeb · Programación Web. Material educativo.
                            </p>

                            {/* Social links */}
                            <div className="flex items-center" style={{ gap: '24px' }}>
                                {socialLinks.map((s) => (
                                    <a
                                        key={s}
                                        href="#"
                                        className="text-xs text-gray-500 hover:text-neon-cyan transition-colors duration-200"
                                    >
                                        {s}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}
