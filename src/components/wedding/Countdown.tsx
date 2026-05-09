import { useEffect, useState } from "react";

const TARGET = new Date("2026-12-15T19:00:00+05:00").getTime();

export function Countdown() {
  const [t, setT] = useState(() => TARGET - Date.now());
  useEffect(() => {
    const i = setInterval(() => setT(TARGET - Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const clamp = Math.max(0, t);
  const d = Math.floor(clamp / 86400000);
  const h = Math.floor((clamp / 3600000) % 24);
  const m = Math.floor((clamp / 60000) % 60);
  const s = Math.floor((clamp / 1000) % 60);
  const items = [
    { v: d, l: "Days" },
    { v: h, l: "Hours" },
    { v: m, l: "Minutes" },
    { v: s, l: "Seconds" },
  ];
  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto">
      {items.map((it) => (
        <div key={it.l} className="glass rounded-xl px-2 py-4 sm:px-4 sm:py-6 text-center animate-glow-pulse">
          <div className="font-display text-3xl sm:text-5xl text-gold-gradient">
            {String(it.v).padStart(2, "0")}
          </div>
          <div className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-cream/70">
            {it.l}
          </div>
        </div>
      ))}
    </div>
  );
}
