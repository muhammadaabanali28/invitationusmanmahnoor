import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Divider() {
  return (
    <div className="my-8 flex items-center justify-center gap-4">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/70" />
      <svg width="20" height="20" viewBox="0 0 20 20" className="text-gold">
        <path d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8 Z" fill="currentColor" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/70" />
    </div>
  );
}
