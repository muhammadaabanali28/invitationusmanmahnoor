import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";

export function OpeningEnvelope({ onOpen }: { onOpen: () => void }) {
  const [opened, setOpened] = useState(false);

  const handleClick = () => {
    if (opened) return;
    setOpened(true);
    // paper sound
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(180, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.6);
      g.gain.setValueAtTime(0.08, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
      o.connect(g).connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + 0.7);
    } catch {}

    confetti({
      particleCount: 180,
      spread: 110,
      origin: { y: 0.6 },
      colors: ["#d4af37", "#f5e6a8", "#fff8e7", "#a07d2a"],
    });

    setTimeout(onOpen, 1700);
  };

  return (
    <AnimatePresence>
      <motion.section
        key="scene1"
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 1 }}
        className="relative flex min-h-screen items-center justify-center px-4"
      >
        <div className="absolute inset-0 bg-radial-gold opacity-60" />
        <div className="relative" style={{ perspective: 1200 }}>
          {/* Envelope back */}
          <motion.div
            className="relative h-72 w-72 sm:h-80 sm:w-80 rounded-full glass animate-glow-pulse cursor-pointer"
            onClick={handleClick}
            whileHover={{ scale: opened ? 1 : 1.04 }}
            whileTap={{ scale: 0.96 }}
            animate={opened ? { scale: 1.4, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* envelope flap */}
            <motion.div
              className="absolute inset-x-6 top-6 h-1/2 origin-top rounded-t-full bg-gradient-to-b from-gold/40 to-gold/10 border border-gold/40"
              style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
              animate={opened ? { rotateX: -180 } : { rotateX: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <p className="font-display text-6xl sm:text-7xl text-gold-gradient glow-text tracking-wide">
                U &amp; M
              </p>
              <span className="mt-3 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
              <p className="mt-3 font-script text-2xl text-cream/90">Click Me</p>
            </div>
            {/* ornate ring */}
            <div className="absolute -inset-3 rounded-full border border-gold/30" />
            <div className="absolute -inset-6 rounded-full border border-gold/15" />
          </motion.div>
        </div>
        <p className="absolute bottom-10 left-1/2 -translate-x-1/2 font-serif-l italic text-gold/60 text-sm tracking-[0.3em]">
          A WEDDING INVITATION
        </p>
      </motion.section>
    </AnimatePresence>
  );
}
