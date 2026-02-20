import { useEffect, useRef, useState } from 'react';

export default function BackgroundMusic() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Si la música ya se reprodujo, no necesitamos seguir escuchando clicks
        if (isPlaying) return;

        const playAudio = () => {
            if (audioRef.current && !isPlaying) {
                // Reducimos el volumen un poco (30%) para que sea ambiental y elegante
                audioRef.current.volume = 0.3;

                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true);
                        // Ya no necesitamos capturar más clics globales para este fin
                        window.removeEventListener('click', playAudio);
                        window.removeEventListener('keydown', playAudio);
                    })
                    .catch((err) => {
                        // Por si el navegador bloquea la reproducción por alguna política (rara vez pasa en un click real)
                        console.log("Audio play failed or was blocked:", err);
                    });
            }
        };

        // Capturamos cualquier intento de interacción temprana del usuario (un click, una tecla, etc.)
        window.addEventListener('click', playAudio, { once: true });
        window.addEventListener('keydown', playAudio, { once: true });

        return () => {
            window.removeEventListener('click', playAudio);
            window.removeEventListener('keydown', playAudio);
        };
    }, [isPlaying]);

    return (
        <audio
            ref={audioRef}
            src="/musica.mp3"
            loop // Hace que la canción se reinicie infinitamente
            preload="auto"
        />
    );
}
