import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Temáticas', href: '#features' },
    { label: 'Ruta de Aprendizaje', href: '#roadmap' },
    { label: 'Recursos', href: '#footer' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 glass"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-6 md:py-8">
                {/* Logo */}
                <a href="#hero" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center glow-blue">
                        <span className="text-white font-bold text-lg font-[Outfit]">⟨/⟩</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold font-[Outfit] gradient-text leading-tight">RayzenWeb</span>
                        <span className="text-[10px] text-gray-500 leading-tight">Redes & Arquitectura</span>
                    </div>
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-sm font-medium text-gray-300 hover:text-neon-cyan transition-colors duration-300 relative group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                    <button className="btn-neon text-sm !py-2.5 !px-6">
                        Explorar Temáticas
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    <motion.span
                        animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                        className="block w-6 h-0.5 bg-neon-cyan"
                    />
                    <motion.span
                        animate={open ? { opacity: 0 } : { opacity: 1 }}
                        className="block w-6 h-0.5 bg-neon-cyan"
                    />
                    <motion.span
                        animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                        className="block w-6 h-0.5 bg-neon-cyan"
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden glass"
                    >
                        <div className="flex flex-col items-center gap-4 py-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-gray-300 hover:text-neon-cyan transition-colors"
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <button className="btn-neon text-sm !py-2.5 !px-6 mt-2">
                                Explorar Temáticas
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
