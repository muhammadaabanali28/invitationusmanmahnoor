import { useState } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

export function ScratchHeart({ reveal, label }: { reveal: string; label: string }) {
  const [revealed, setRevealed] = useState(false);
  const W = 190, H = 190;

  const revealHeart = () => {
    if (revealed) return;
    setRevealed(true);
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.55 },
      colors: ["#d4af37", "#f5e6a8", "#fff8e7", "#ff9ecd"],
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: W, height: H }}>
        {/* Revealed content underneath */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-2">
            <p className="font-display text-4xl sm:text-5xl text-gold-gradient glow-text leading-tight">
              {reveal}
            </p>
            <p className="mt-2 font-serif-l text-[10px] uppercase tracking-[0.35em] text-cream/60">
              {label}
            </p>
          </div>
        </div>

        {/* Click cover — hidden when revealed */}
        <AnimatePresence>
          {!revealed && (
            <motion.button
              type="button"
              key="heart-cover"
              aria-label={`Reveal ${label}`}
              onClick={revealHeart}
              onTouchStart={revealHeart}
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.18, rotate: 8 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer touch-manipulation border-0 bg-transparent p-0 outline-none"
            >
              <span className="flex h-[150px] w-[150px] rotate-45 items-center justify-center bg-gradient-to-br from-gold-soft via-gold to-gold-dark shadow-[0_0_35px_rgba(212,175,55,0.35)] transition-transform duration-300 hover:scale-105 active:scale-95 before:absolute before:-left-[75px] before:top-0 before:h-[150px] before:w-[150px] before:rounded-full before:bg-gold-soft after:absolute after:-top-[75px] after:left-0 after:h-[150px] after:w-[150px] after:rounded-full after:bg-gold-soft">
                <span className="relative z-10 -rotate-45 font-serif-l text-[10px] uppercase tracking-[0.28em] text-ink/70">
                  Click
                </span>
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Revealed celebration ring */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              key="ring"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                boxShadow: "0 0 0 3px rgba(212,175,55,0.6), 0 0 30px rgba(212,175,55,0.3)",
                borderRadius: "50%",
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Label below */}
      <p className="font-serif-l text-[11px] uppercase tracking-[0.35em] text-gold/60">
        {revealed ? "✦ Revealed ✦" : "Tap to reveal"}
      </p>
    </div>
  );
}
