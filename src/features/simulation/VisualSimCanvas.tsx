import React, { useEffect, useMemo, useRef } from "react";
import { getCurve } from "../../data";
import { evalCurve } from "../../lib/interp";

type Props = { week: number };

export default function VisualSimCanvas({ week }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const clarityCurve = getCurve("vision.clarity");
  const clarity = useMemo(() => {
    if (!clarityCurve) return 0.3;
    return evalCurve(clarityCurve, week);
  }, [clarityCurve, week]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Placeholder scene: simple gradient + shapes
    const w = canvas.width;
    const h = canvas.height;

    // “Clarity” drives blur + saturation-like overlay (very rough placeholder)
    const blurPx = Math.round((1 - clarity) * 18);

    ctx.clearRect(0, 0, w, h);

    // background gradient
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#1b2a4a");
    g.addColorStop(1, "#2a1040");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // face-like circle (to hint attention bias later)
    ctx.fillStyle = "rgba(255, 230, 200, 0.9)";
    ctx.beginPath();
    ctx.arc(w * 0.32, h * 0.48, Math.min(w, h) * 0.18, 0, Math.PI * 2);
    ctx.fill();

    // toy-like rectangle
    ctx.fillStyle = "rgba(120, 200, 255, 0.9)";
    ctx.fillRect(w * 0.62, h * 0.55, w * 0.22, h * 0.18);

    // Apply a crude blur by drawing the canvas onto itself with shadow (cheap fake)
    if (blurPx > 0) {
      const img = ctx.getImageData(0, 0, w, h);
      ctx.clearRect(0, 0, w, h);
      ctx.filter = `blur(${blurPx}px)`;
      // Draw original image data back
      // Use an offscreen canvas for compatibility
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const offCtx = off.getContext("2d");
      if (!offCtx) return;
      offCtx.putImageData(img, 0, 0);
      ctx.drawImage(off, 0, 0);
      ctx.filter = "none";
    }

    // Vignette
    const vg = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.15, w / 2, h / 2, Math.min(w, h) * 0.65);
    vg.addColorStop(0, "rgba(0,0,0,0)");
    vg.addColorStop(1, `rgba(0,0,0,${0.45 * (1 - clarity)})`);
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, w, h);
  }, [clarity, week]);

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>視覚（近似）</div>
        <div className="small">clarity={clarity.toFixed(2)}（仮）</div>
      </div>

      <div className="small" style={{ marginTop: 8 }}>
        ※ これは「視覚発達の代表的傾向」を画面上に近似したもの。断定ではありません。
      </div>

      <canvas ref={canvasRef} width={720} height={420} style={{ width: "100%", marginTop: 12, borderRadius: 10 }} />
    </div>
  );
}
