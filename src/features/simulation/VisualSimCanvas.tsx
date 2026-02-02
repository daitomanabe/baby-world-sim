import React, { useEffect, useMemo, useRef } from "react";
import { getMonthDataInterpolated, isMonthInterpolated } from "../../lib/interp";
import { calculateColorVision, COLOR_VISION_SOURCES } from "../../lib/colorVision";
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

  // Get color vision model based on research
  const colorVision = useMemo(() => calculateColorVision(month), [month]);

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

    // Draw simple scene elements with distinct colors for color vision testing

    // Face-like circle (skin tone - warm color)
    ctx.fillStyle = "rgba(255, 220, 185, 0.95)";
    ctx.beginPath();
    ctx.arc(w * 0.32, h * 0.48, Math.min(w, h) * 0.18, 0, Math.PI * 2);
    ctx.fill();

    // Eyes on the face (dark)
    ctx.fillStyle = "rgba(50, 60, 70, 0.95)";
    ctx.beginPath();
    ctx.arc(w * 0.27, h * 0.43, 12, 0, Math.PI * 2);
    ctx.arc(w * 0.37, h * 0.43, 12, 0, Math.PI * 2);
    ctx.fill();

    // Blue toy block
    ctx.fillStyle = "rgba(50, 120, 220, 0.95)";
    ctx.fillRect(w * 0.58, h * 0.58, w * 0.12, h * 0.15);

    // Green toy block
    ctx.fillStyle = "rgba(80, 200, 80, 0.95)";
    ctx.fillRect(w * 0.72, h * 0.58, w * 0.12, h * 0.15);

    // Red ball (high saturation - should be visible early)
    ctx.fillStyle = "rgba(230, 50, 50, 0.95)";
    ctx.beginPath();
    ctx.arc(w * 0.75, h * 0.28, 35, 0, Math.PI * 2);
    ctx.fill();

    // Yellow star
    ctx.fillStyle = "rgba(255, 220, 50, 0.95)";
    drawStar(ctx, w * 0.18, h * 0.25, 5, 30, 15);

    // Purple flower
    ctx.fillStyle = "rgba(160, 80, 200, 0.95)";
    ctx.beginPath();
    ctx.arc(w * 0.50, h * 0.20, 20, 0, Math.PI * 2);
    ctx.fill();

    // Apply visual filters based on color vision research + renderParams

    // 1. Get image data for pixel manipulation
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;

    // Extract color vision parameters
    const { lCone, mCone, sCone, redGreenChannel, blueYellowChannel, saturationSensitivity } = colorVision;

    // 2. Apply color vision model + contrast/saturation from renderParams
    const contrastFactor = visual.contrast;

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      // Normalize to 0-1
      let rn = r / 255;
      let gn = g / 255;
      let bn = b / 255;

      // === Color Vision Model (Research-based) ===
      // Simulate cone responses
      const lResponse = rn * lCone;
      const mResponse = gn * mCone;
      const sResponse = bn * sCone;

      // Calculate luminance
      const luminance = 0.299 * rn + 0.587 * gn + 0.114 * bn;

      // Apply opponent channel processing
      // Red-green channel affects red/green discrimination
      // Blue-yellow channel affects blue discrimination
      rn = luminance + (lResponse - luminance) * redGreenChannel;
      gn = luminance + (mResponse - luminance) * redGreenChannel;
      bn = luminance + (sResponse - luminance) * blueYellowChannel;

      // Apply saturation sensitivity (research: doesn't reach adult until adolescence)
      const avgColor = (rn + gn + bn) / 3;
      rn = avgColor + (rn - avgColor) * saturationSensitivity;
      gn = avgColor + (gn - avgColor) * saturationSensitivity;
      bn = avgColor + (bn - avgColor) * saturationSensitivity;

      // === RenderParams Processing ===
      // Apply contrast from model
      rn = (rn - 0.5) * contrastFactor + 0.5;
      gn = (gn - 0.5) * contrastFactor + 0.5;
      bn = (bn - 0.5) * contrastFactor + 0.5;

      // Apply saturation from model (multiplicative with color vision saturation)
      const gray = 0.299 * rn + 0.587 * gn + 0.114 * bn;
      const modelSat = visual.saturation;
      rn = gray + modelSat * (rn - gray);
      gn = gray + modelSat * (gn - gray);
      bn = gray + modelSat * (bn - gray);

      // Convert back to 0-255
      data[i] = Math.max(0, Math.min(255, Math.round(rn * 255)));
      data[i + 1] = Math.max(0, Math.min(255, Math.round(gn * 255)));
      data[i + 2] = Math.max(0, Math.min(255, Math.round(bn * 255)));
    }

    ctx.putImageData(imageData, 0, 0);

    // 3. Apply blur
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

    // 4. Apply vignette effect (peripheral vision limitation)
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
      ctx.fillText("顔", w * 0.30, h * 0.72);
      ctx.fillText("青", w * 0.62, h * 0.80);
      ctx.fillText("緑", w * 0.76, h * 0.80);
      ctx.fillText("赤", w * 0.73, h * 0.20);
      ctx.fillText("黄", w * 0.16, h * 0.36);
      ctx.fillText("紫", w * 0.48, h * 0.12);
    }

  }, [month, visual, colorVision]);

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>視覚シミュレーション（色覚研究モデル）</div>
        <EvidenceBadge
          evidenceLevel={COLOR_VISION_SOURCES.pmc9314692.evidenceLevel}
          sourceUrl={COLOR_VISION_SOURCES.pmc9314692.url}
          sourceTitle="Skelton 2022: Infant color perception"
          isInterpolated={isInterpolated}
          compact
        />
      </div>

      <div className="small" style={{ marginTop: 4, color: "#666" }}>
        {monthData.ageLabel} - {colorVision.stage}
      </div>

      <canvas
        ref={canvasRef}
        width={720}
        height={420}
        style={{ width: "100%", marginTop: 12, borderRadius: 10 }}
      />

      {showDetails && (
        <>
          <div style={{ marginTop: 12, fontSize: 11, color: "#888" }}>
            <strong>色覚発達:</strong> L錐体(赤):{(colorVision.lCone*100).toFixed(0)}% |
            M錐体(緑):{(colorVision.mCone*100).toFixed(0)}% |
            S錐体(青):{(colorVision.sCone*100).toFixed(0)}%
          </div>
          <div style={{ marginTop: 4, fontSize: 11, color: "#888" }}>
            <strong>対向チャネル:</strong> 赤-緑:{(colorVision.redGreenChannel*100).toFixed(0)}% |
            青-黄:{(colorVision.blueYellowChannel*100).toFixed(0)}% |
            彩度感度:{(colorVision.saturationSensitivity*100).toFixed(0)}%
          </div>
          <div style={{ marginTop: 4, fontSize: 11, color: "#888", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 4 }}>
            <div>blur: {visual.blurPx.toFixed(1)}px</div>
            <div>contrast: {visual.contrast.toFixed(2)}</div>
            <div>vignette: {visual.vignetteStrength.toFixed(2)}</div>
          </div>
        </>
      )}

      <div className="small" style={{ marginTop: 8, padding: "8px", backgroundColor: "#f0fdf4", borderRadius: 6, fontSize: 10 }}>
        <strong>根拠:</strong> {colorVision.evidenceRef}
      </div>

      <div className="small" style={{ marginTop: 8, padding: "8px", backgroundColor: "#f8f9fa", borderRadius: 6 }}>
        ※ 色覚モデルはSkelton (2022)等の研究に基づく近似です。
        実際の見え方には個人差があり、教育目的の推定値として参照してください。
      </div>
    </div>
  );
}

// Helper function to draw a star shape
function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
}
