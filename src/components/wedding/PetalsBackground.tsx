import { useEffect, useMemo, useState } from "react";

export function PetalsBackground({ count = 22 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 14,
        size: 14 + Math.random() * 26,
        xEnd: (Math.random() - 0.5) * 240,
        opacity: 0.5 + Math.random() * 0.5,
        rotate: Math.random() * 360,
      })),
    [count]
  );
  if (!mounted) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute animate-petal"
          style={{
            left: `${p.left}%`,
            top: 0,
            width: p.size,
            height: p.size,
            animationDelay: `-${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
            ["--x-end" as string]: `${p.xEnd}px`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          <svg viewBox="0 0 32 32" className="h-full w-full drop-shadow-[0_0_6px_rgba(212,175,55,0.6)]">
            <defs>
              <radialGradient id={`pg${p.id}`} cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#fff5d6" />
                <stop offset="60%" stopColor="#e6c878" />
                <stop offset="100%" stopColor="#a07d2a" />
              </radialGradient>
            </defs>
            <path
              d="M16 2 C24 8 28 16 16 30 C4 16 8 8 16 2 Z"
              fill={`url(#pg${p.id})`}
              opacity="0.95"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}
