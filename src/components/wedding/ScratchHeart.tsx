import { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { celebrationColors } from '@/lib/invitation';

const AnimatedButton = motion.create(Button);
export function ScratchHeart({ reveal, label }: { reveal: string; label: string }) {
  const [revealed, setRevealed] = useState(false);
  const revealHeart = () => {
    if (revealed) return;
    setRevealed(true);
    confetti({ particleCount: 55, spread: 75, origin: { y: 0.55 }, colors: celebrationColors() });
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-[210px] w-[230px]">
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden={!revealed}>
          {revealed && <div className="text-center px-3">
            <p className="font-display text-3xl text-primary leading-tight">{reveal}</p>
            <p className="mt-3 font-serif-l text-xs uppercase tracking-[0.12em] text-foreground/70">{label}</p>
          </div>}
        </div>
        <AnimatePresence>
          {!revealed && <AnimatedButton
            type="button" variant="ghost" aria-label={`Reveal ${label}`} onClick={revealHeart}
            exit={{ opacity: 0, scale: 1.12 }} transition={{ duration: 0.45 }}
            className="heart-cover absolute inset-0 z-10 h-full w-full touch-manipulation border-0 p-0 hover:bg-transparent"
          >
            <svg viewBox="0 0 230 210" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <path d="M115 195 C90 170 15 120 15 66 C15 11 84 0 115 49 C146 0 215 11 215 66 C215 120 140 170 115 195Z" fill="var(--heart-fill)" stroke="var(--heart-border)" strokeWidth="1.5" />
            </svg>
            <span className="relative font-serif-l text-sm tracking-[0.15em] text-accent-foreground">♡</span>
          </AnimatedButton>}
        </AnimatePresence>
        {revealed && <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute inset-3 rounded-full border border-primary/30 pointer-events-none" />}
      </div>
      <p className="font-serif-l text-xs uppercase tracking-[0.15em] text-primary/75">{revealed ? '✦' : label}</p>
    </div>
  );
}
