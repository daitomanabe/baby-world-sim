import React, { useEffect, useMemo, useRef } from "react";
import { getMonthData } from "../../data";
import { getMonthDataInterpolated, isMonthInterpolated } from "../../lib/interp";
import { EvidenceBadge } from "../../components/Evidence";

type Props = {
  /** Current month (0-48) */
  month: number;
  /** Show detailed parameter values */
  showDetails?: boolean;
};

export default function VisualSimCanvas({ month, showDetails = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Get the render params for the current month
  const monthData = useMemo(() => getMonthDataInterpolated(month), [month]);
  const { visual } = monthData.renderParams;
  const isInterpolated = useMemo(() => isMonthInterpolated(month), [month]);

  // Get vision representation for stage info
  const visionStage = monthData.senses.vision.stage;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, w, h);

    // Background gradient (representing a simple scene)
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#1b2a4a");
    g.addColorStop(1, "#2a1040");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // Draw simple scene elements
    // Face-like circle (infants have face preference)
    ctx.fillStyle = "rgba(255, 230, 200, 0.9)";
    ctx.beginPath();
    ctx.arc(w * 0.32, h * 0.48, Math.min(w, h) * 0.18, 0, Math.PI * 2);
    ctx.fill();

    // Eyes on the face
    ctx.fillStyle = "rgba(60, 80, 100, 0.9)";
    ctx.beginPath();
    ctx.arc(w * 0.27, h * 0.43, 12, 0, Math.PI * 2);
    ctx.arc(w * 0.37, h * 0.43, 12, 0, Math.PI * 2);
    ctx.fill();

    // Toy-like rectangle (high contrast object)
    ctx.fillStyle = "rgba(120, 200, 255, 0.9)";
    ctx.fillRect(w * 0.62, h * 0.55, w * 0.22, h * 0.18);

    // Red ball (high saturation)
    ctx.fillStyle = "rgba(255, 80, 80, 0.9)";
    ctx.beginPath();
    ctx.arc(w * 0.75, h * 0.3, 40, 0, Math.PI * 2);
    ctx.fill();

    // Apply visual filters based on renderParams

    // 1. Capture current canvas state
    const imageData = ctx.getImageData(0, 0, w, h);

    // 2. Apply contrast and saturation to pixel data
    const data = imageData.data;
    const contrastFactor = visual.contrast;
    const saturationFactor = visual.saturation;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Apply contrast
      let nr = ((r / 255 - 0.5) * contrastFactor + 0.5) * 255;
      let ng = ((g / 255 - 0.5) * contrastFactor + 0.5) * 255;
      let nb = ((b / 255 - 0.5) * contrastFactor + 0.5) * 255;

      // Apply saturation
      const gray = 0.299 * nr + 0.587 * ng + 0.114 * nb;
      nr = gray + saturationFactor * (nr - gray);
      ng = gray + saturationFactor * (ng - gray);
      nb = gray + saturationFactor * (nb - gray);

      data[i] = Math.max(0, Math.min(255, nr));
      data[i + 1] = Math.max(0, Math.min(255, ng));
      data[i + 2] = Math.max(0, Math.min(255, nb));
    }

    ctx.putImageData(imageData, 0, 0);

    // 3. Apply blur using CSS filter (Canvas 2D limitation)
    if (visual.blurPx > 0) {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = w;
      tempCanvas.height = h;
      const tempCtx = tempCanvas.getContext("2d");
      if (tempCtx) {
        tempCtx.drawImage(canvas, 0, 0);
        ctx.clearRect(0, 0, w, h);
        ctx.filter = `blur(${visual.blurPx}px)`;
        ctx.drawImage(tempCanvas, 0, 0);
        ctx.filter = "none";
      }
    }

    // 4. Apply vignette effect
    if (visual.vignetteStrength > 0) {
      const vg = ctx.createRadialGradient(
        w / 2, h / 2, Math.min(w, h) * 0.15,
        w / 2, h / 2, Math.min(w, h) * 0.7
      );
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, `rgba(0,0,0,${visual.vignetteStrength})`);
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);
    }

    // 5. Show semantic labels if alpha > threshold
    if (visual.semanticLabelAlpha > 0.1) {
      ctx.font = "14px sans-serif";
      ctx.fillStyle = `rgba(255, 255, 255, ${visual.semanticLabelAlpha})`;
      ctx.fillText("顔", w * 0.30, h * 0.70);
      ctx.fillText("おもちゃ", w * 0.68, h * 0.80);
      ctx.fillText("ボール", w * 0.72, h * 0.22);
    }

  }, [month, visual]);

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>視覚シミュレーション（近似）</div>
        <EvidenceBadge
          evidenceLevel="hospital_handout"
          sourceUrl="https://www.nationwidechildrens.org/family-resources-education/health-wellness-and-safety-resources/helping-hands/infant-vision-birth-to-one-year"
          sourceTitle="Nationwide Children's Hospital: Infant Vision"
          isInterpolated={isInterpolated}
          compact
        />
      </div>

      <div className="small" style={{ marginTop: 4, color: "#666" }}>
        {monthData.ageLabel} - {visionStage}
      </div>

      <canvas
        ref={canvasRef}
        width={720}
        height={420}
        style={{ width: "100%", marginTop: 12, borderRadius: 10 }}
      />

      {showDetails && (
        <div style={{ marginTop: 12, fontSize: 11, color: "#888", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
          <div>blur: {visual.blurPx.toFixed(1)}px</div>
          <div>contrast: {visual.contrast.toFixed(2)}</div>
          <div>saturation: {visual.saturation.toFixed(2)}</div>
          <div>vignette: {visual.vignetteStrength.toFixed(2)}</div>
          <div>depth cue: {visual.depthCueStrength.toFixed(2)}</div>
          <div>semantic: {visual.semanticLabelAlpha.toFixed(2)}</div>
        </div>
      )}

      <div className="small" style={{ marginTop: 8, padding: "8px", backgroundColor: "#f8f9fa", borderRadius: 6 }}>
        ※ これは「視覚発達の代表的傾向」を画面上に近似したものです。
        実際の見え方を正確に再現するものではありません。
      </div>
    </div>
  );
}
