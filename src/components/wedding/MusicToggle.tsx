import { useEffect, useRef, useState } from "react";
import { Music2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function MusicToggle({ start }: { start: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!start || !audioRef.current) return;
    audioRef.current.volume = 0.4;
    // Small delay so envelope animation completes first
    const t = setTimeout(() => {
      audioRef.current
        ?.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }, 800);
    return () => clearTimeout(t);
  }, [start]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} loop src="/wedding-music.mp3" />
      <motion.button
        onClick={toggle}
        aria-label="Toggle music"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full glass text-gold animate-glow-pulse hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-shadow"
      >
        <motion.div
          key={playing ? "playing" : "paused"}
          initial={{ rotate: -30, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {playing ? <Music2 size={22} /> : <VolumeX size={22} />}
        </motion.div>
        {/* Ripple when playing */}
        {playing && (
          <motion.span
            className="absolute inset-0 rounded-full border border-gold/40"
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>
    </>
  );
}
