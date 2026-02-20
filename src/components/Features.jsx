import { useState } from 'react';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';

const features = [
    {
        icon: '🌍',
        title: 'Internet y su Historia',
        description: 'Desde ARPANET en 1969 hasta la WWW moderna. Evolución de una red militar a la infraestructura global que conecta miles de millones de dispositivos.',
        color: 'blue',
        details: [
            'ARPANET (1969): Primera red de conmutación de paquetes',
            'TCP/IP adoptado en 1983 como protocolo estándar',
            'Tim Berners-Lee crea la WWW en 1991 en el CERN',
            'Navegador Mosaic (1993): populariza la web gráfica',
            'Web 2.0: redes sociales, contenido generado por usuarios',
            'Actualidad: IoT, Cloud Computing, 5G, Web3'
        ]
    },
    {
        icon: '📡',
        title: 'Modelo OSI',
        description: 'Marco de referencia de 7 capas creado por la ISO para estandarizar la comunicación entre sistemas heterogéneos.',
        color: 'purple',
        details: [
            'Capa 7 - Aplicación: HTTP, FTP, SMTP, DNS',
            'Capa 6 - Presentación: cifrado, compresión, formato',
            'Capa 5 - Sesión: control de diálogo, sincronización',
            'Capa 4 - Transporte: TCP (confiable), UDP (rápido)',
            'Capa 3 - Red: enrutamiento IP, direccionamiento lógico',
            'Capa 2 - Enlace de datos: MAC, switches, tramas',
            'Capa 1 - Física: cables, señales eléctricas, bits'
        ]
    },
    {
        icon: '🔗',
        title: 'Modelo TCP/IP',
        description: 'Modelo práctico de 4 capas que sustenta Internet. TCP garantiza entrega confiable, IP maneja direccionamiento y enrutamiento.',
        color: 'cyan',
        details: [
            'Capa de Acceso a Red: Ethernet, Wi-Fi, hardware',
            'Capa de Internet: IP, ICMP, ARP, enrutamiento',
            'Capa de Transporte: TCP (streams), UDP (datagramas)',
            'Capa de Aplicación: HTTP, DNS, FTP, SSH, SMTP',
            'Three-way handshake: SYN → SYN-ACK → ACK',
            'Ventana deslizante y control de congestión'
        ]
    },
    {
        icon: '📨',
        title: 'Protocolos de Comunicación',
        description: 'Reglas que definen cómo se transmiten datos entre dispositivos: formato, secuencia, detección de errores y acciones correctivas.',
        color: 'pink',
        details: [
            'Protocolo: conjunto de reglas para la comunicación',
            'Sintaxis: formato y estructura de los datos',
            'Semántica: significado de cada sección de bits',
            'Temporización: cuándo y a qué velocidad enviar',
            'Protocolos orientados a conexión vs sin conexión',
            'Control de flujo, errores y congestión'
        ]
    },
    {
        icon: '🌐',
        title: 'Servicios de Internet',
        description: 'HTTP para navegación web, FTP para archivos, SMTP para correo, DNS para nombres de dominio, VoIP para voz e IRC para chat.',
        color: 'blue',
        details: [
            'HTTP/HTTPS: navegación web (puerto 80/443)',
            'FTP: transferencia de archivos (puerto 21)',
            'SMTP: envío de correo electrónico (puerto 25)',
            'POP3/IMAP: recepción de correo (110/143)',
            'DNS: resolución de nombres de dominio (puerto 53)',
            'VoIP: llamadas de voz sobre IP (SIP, RTP)',
            'IRC: chat en tiempo real por canales'
        ]
    },
    {
        icon: '🚪',
        title: 'Puertos de Red',
        description: 'Puntos lógicos de conexión (0-65535) que permiten que múltiples servicios operen simultáneamente en un dispositivo.',
        color: 'purple',
        details: [
            'Puerto 80: HTTP · Puerto 443: HTTPS',
            'Puerto 21: FTP · Puerto 22: SSH',
            'Puerto 25: SMTP · Puerto 53: DNS',
            'Puerto 3306: MySQL · Puerto 5432: PostgreSQL',
            'Puertos bien conocidos: 0-1023',
            'Puertos registrados: 1024-49151',
            'Puertos efímeros: 49152-65535'
        ]
    },
    {
        icon: '📍',
        title: 'Dirección IP (IPv4 e IPv6)',
        description: 'Identificadores únicos para dispositivos en red. IPv4 usa 32 bits, IPv6 amplía a 128 bits con espacio prácticamente ilimitado.',
        color: 'cyan',
        details: [
            'IPv4: 32 bits, notación decimal (192.168.0.1)',
            'Clases A, B, C, D (multicast), E (reservada)',
            'Direcciones privadas: 10.x, 172.16-31.x, 192.168.x',
            'NAT: traduce IPs privadas a públicas',
            'IPv6: 128 bits, notación hexadecimal',
            'Subnetting y CIDR para segmentación de redes'
        ]
    },
    {
        icon: '🖥️',
        title: 'Arquitectura Cliente-Servidor',
        description: 'El cliente envía peticiones y el servidor las procesa. Permite escalabilidad, mantenimiento centralizado y acceso concurrente.',
        color: 'blue',
        details: [
            'Cliente: inicia peticiones (navegador, app móvil)',
            'Servidor: procesa peticiones y envía respuestas',
            'Comunicación mediante request/response sobre HTTP',
            'Servidores: Apache, Nginx, IIS',
            'Ventajas: centralización, seguridad, escalabilidad',
            'Variantes: P2P, híbrido, microservicios'
        ]
    },
    {
        icon: '🏗️',
        title: 'Arquitectura de Tres Capas',
        description: 'Separa la aplicación en presentación (UI), lógica de negocio y datos. Mejora mantenibilidad y escalabilidad independiente.',
        color: 'purple',
        details: [
            'Capa de Presentación: HTML, CSS, JS, React',
            'Capa de Lógica: Node.js, Python, Java, PHP',
            'Capa de Datos: MySQL, PostgreSQL, MongoDB',
            'Comunicación vía APIs REST o GraphQL',
            'Patrón MVC como implementación común',
            'Evolución: microservicios y serverless'
        ]
    },
    {
        icon: '📡',
        title: 'Protocolo HTTP',
        description: 'Protocolo de aplicación que sustenta la WWW. Stateless, basado en texto, con métodos GET, POST, PUT y DELETE.',
        color: 'cyan',
        details: [
            'GET: solicitar recursos · POST: enviar datos',
            'PUT/PATCH: actualizar · DELETE: eliminar',
            'Códigos: 200 OK, 301, 404, 500',
            'Headers: Content-Type, Authorization, Cache',
            'HTTPS: HTTP + TLS/SSL para cifrado',
            'HTTP/2: multiplexación, compresión, push'
        ]
    },
    {
        icon: '⚡',
        title: 'Cliente Web vs Servidor Web',
        description: 'El navegador renderiza la interfaz (HTML/CSS/JS). El servidor ejecuta lógica, consulta bases de datos y devuelve respuestas.',
        color: 'pink',
        details: [
            'Navegadores: Chrome, Firefox, Safari, Edge',
            'Motores: Blink, Gecko, WebKit',
            'Servidores: Apache, Nginx, Node.js, Caddy',
            'Contenido estático vs dinámico',
            'SSR vs CSR (Server vs Client Rendering)',
            'CDN: distribución global de contenido'
        ]
    },
    {
        icon: '🏛️',
        title: 'Organizaciones de Internet',
        description: 'W3C define estándares web, ICANN gestiona dominios, IETF desarrolla protocolos mediante RFCs, ISOC promueve acceso abierto.',
        color: 'blue',
        details: [
            'W3C: estándares HTML, CSS, accesibilidad',
            'ICANN: gestión de dominios y direcciones IP',
            'IETF: protocolos de Internet mediante RFCs',
            'Internet Society (ISOC): políticas y educación',
            'IEEE: estándares de redes (802.11 Wi-Fi)',
            'IANA: asignación de puertos y protocolos'
        ]
    },
];

export default function Features() {
    const [expandedCard, setExpandedCard] = useState(null);

    return (
        <section id="features" className="relative section-block">
            {/* Background accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="relative z-10 container-main flex flex-col items-center">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                    style={{ marginBottom: '64px' }}
                >
                    <span className="inline-block !px-5 !py-2 rounded-full glass text-neon-purple text-sm font-medium" style={{ marginBottom: '20px' }}>
                        📚 Contenido del Curso
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold font-[Outfit]" style={{ marginBottom: '20px' }}>
                        Temáticas de{' '}
                        <span className="gradient-text">Estudio</span>
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed mx-auto" style={{ maxWidth: '640px' }}>
                        Explora cada tema de la unidad de Programación Web.
                        Haz clic en cualquier tarjeta para ver el contenido detallado.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="!p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '24px' }}>
                    {features.map((f, i) => (
                        <FeatureCard
                            key={f.title}
                            {...f}
                            index={i}
                            isExpanded={expandedCard === i}
                            onToggle={() => setExpandedCard(expandedCard === i ? null : i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
