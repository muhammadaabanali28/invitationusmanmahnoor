import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

export function ScratchHeart({ reveal, label }: { reveal: string; label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);
  const scratched = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = 220, h = 220;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);
    // Heart-shaped gold cover
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#d4af37");
    grad.addColorStop(0.5, "#f5e6a8");
    grad.addColorStop(1, "#a07d2a");
    ctx.fillStyle = grad;
    ctx.beginPath();
    const cx = w / 2, cy = h / 2 + 10, s = 80;
    ctx.moveTo(cx, cy + s * 0.7);
    ctx.bezierCurveTo(cx + s, cy + s * 0.2, cx + s, cy - s * 0.6, cx, cy - s * 0.2);
    ctx.bezierCurveTo(cx - s, cy - s * 0.6, cx - s, cy + s * 0.2, cx, cy + s * 0.7);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.font = "600 14px 'Cormorant Garamond', serif";
    ctx.textAlign = "center";
    ctx.fillText("Scratch ♥", cx, cy);

    ctx.globalCompositeOperation = "destination-out";

    const scratch = (e: PointerEvent) => {
      if (!drawing.current) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
      scratched.current += 1;
      if (scratched.current > 18 && !revealed) {
        setRevealed(true);
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#d4af37", "#f5e6a8", "#fff8e7"],
        });
      }
    };
    const down = (e: PointerEvent) => { drawing.current = true; scratch(e); };
    const up = () => { drawing.current = false; };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", scratch);
    window.addEventListener("pointerup", up);
    return () => {
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", scratch);
      window.removeEventListener("pointerup", up);
    };
  }, [revealed]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-[220px] w-[220px] animate-heartbeat">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="font-display text-5xl text-gold-gradient glow-text">{reveal}</p>
            <p className="mt-1 font-serif-l text-xs uppercase tracking-[0.3em] text-cream/70">{label}</p>
          </div>
        </div>
        <canvas ref={canvasRef} className="absolute inset-0 cursor-pointer touch-none" style={{ width: 220, height: 220 }} />
      </div>
    </div>
  );
}
