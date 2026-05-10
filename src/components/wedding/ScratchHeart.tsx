import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

export function ScratchHeart({ reveal, label }: { reveal: string; label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);
  const scratched = useRef(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const W = 220, H = 220;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);
    ctxRef.current = ctx;
    scratched.current = 0;

    /* ---- Draw heart cover ---- */
    const drawHeart = (cx: number, cy: number, size: number) => {
      ctx.beginPath();
      ctx.moveTo(cx, cy + size * 0.35);
      ctx.bezierCurveTo(cx + size * 1.1, cy - size * 0.2, cx + size * 1.1, cy - size * 0.9, cx, cy - size * 0.4);
      ctx.bezierCurveTo(cx - size * 1.1, cy - size * 0.9, cx - size * 1.1, cy - size * 0.2, cx, cy + size * 0.35);
      ctx.closePath();
    };

    // Gold gradient fill for the whole canvas first (clip to heart)
    ctx.save();
    drawHeart(W / 2, H / 2 + 5, 75);
    ctx.clip();

    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "#f5e6a8");
    grad.addColorStop(0.3, "#d4af37");
    grad.addColorStop(0.6, "#a07d2a");
    grad.addColorStop(1, "#f5e6a8");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Subtle inner shine
    const shine = ctx.createRadialGradient(W * 0.35, H * 0.3, 5, W * 0.35, H * 0.3, 90);
    shine.addColorStop(0, "rgba(255,255,220,0.45)");
    shine.addColorStop(1, "rgba(255,255,220,0)");
    ctx.fillStyle = shine;
    ctx.fillRect(0, 0, W, H);

    ctx.restore();

    // Scratch hint text inside heart
    ctx.save();
    drawHeart(W / 2, H / 2 + 5, 75);
    ctx.clip();
    ctx.fillStyle = "rgba(60,40,0,0.55)";
    ctx.font = "bold 13px 'Cormorant Garamond', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦ Scratch ✦", W / 2, H / 2 + 10);
    ctx.restore();

    // Switch to erase mode for scratching
    ctx.globalCompositeOperation = "destination-out";

    const getPos = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = W / rect.width;
      const scaleY = H / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };

    const scratch = (e: PointerEvent) => {
      if (!drawing.current) return;
      const { x, y } = getPos(e);
      ctx.beginPath();
      ctx.arc(x, y, 26, 0, Math.PI * 2);
      ctx.fill();
      scratched.current += 1;
      if (scratched.current > 20) {
        setRevealed(true);
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.5 },
          colors: ["#d4af37", "#f5e6a8", "#fff8e7", "#ff9ecd"],
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

        {/* Scratch canvas — hidden when revealed */}
        <AnimatePresence>
          {!revealed && (
            <motion.canvas
              ref={canvasRef}
              key="canvas"
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 cursor-pointer touch-none"
              style={{ width: W, height: H }}
            />
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
        {revealed ? "✦ Revealed ✦" : "Scratch to reveal"}
      </p>
    </div>
  );
}
