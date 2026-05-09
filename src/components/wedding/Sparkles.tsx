import { useEffect, useMemo, useState } from "react";

export function Sparkles({ count = 40 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 3,
      })),
    [count]
  );
  if (!mounted) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-gold animate-sparkle"
          style={{
            top: `${d.top}%`,
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
            boxShadow: "0 0 8px rgba(212,175,55,0.9), 0 0 16px rgba(212,175,55,0.5)",
          }}
        />
      ))}
    </div>
  );
}
