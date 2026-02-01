import type { Curve } from "../types";
import type { MonthlyData, CurveV3, VisualRenderParams, AudioRenderParams } from "../data/model";
import { MONTHS, getCurveV3 } from "../data";

// ============================================================================
// Legacy v0.2 Curve Interpolation (weeks)
// ============================================================================

export function evalCurve(curve: Curve, week: number): number {
  const pts = curve.points.slice().sort((a, b) => a.week - b.week);
  if (pts.length === 0) return 0;

  if (week <= pts[0].week) return pts[0].value;
  if (week >= pts[pts.length - 1].week) return pts[pts.length - 1].value;

  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    if (week >= a.week && week <= b.week) {
      const t = (week - a.week) / (b.week - a.week);
      return a.value + (b.value - a.value) * t;
    }
  }
  return pts[pts.length - 1].value;
}

// ============================================================================
// v0.3 Monthly Data Interpolation
// ============================================================================

/**
 * Linear interpolation between two values
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Get monthly data with interpolation support.
 * If the exact month exists, returns it directly.
 * Otherwise, linearly interpolates between adjacent months.
 *
 * @param monthFloat - The month to query (can be fractional, e.g., 2.5)
 * @returns The monthly data (interpolated if necessary)
 */
export function getMonthDataInterpolated(monthFloat: number): MonthlyData {
  const monthClamped = clamp(monthFloat, 0, 48);
  const monthFloor = Math.floor(monthClamped);
  const monthCeil = Math.ceil(monthClamped);

  // If exact month match, return directly
  if (monthFloor === monthCeil) {
    const exactData = MONTHS.find(m => m.month === monthFloor);
    if (exactData) return exactData;
  }

  // Get adjacent months for interpolation
  const dataA = MONTHS.find(m => m.month === monthFloor);
  const dataB = MONTHS.find(m => m.month === monthCeil);

  if (!dataA) {
    // Fallback to month 0 if before range
    return MONTHS[0];
  }

  if (!dataB) {
    // Fallback to last month if after range
    return MONTHS[MONTHS.length - 1];
  }

  // Interpolation factor
  const t = monthClamped - monthFloor;

  // Interpolate visual render params
  const visual = interpolateVisualParams(dataA.renderParams.visual, dataB.renderParams.visual, t);

  // Interpolate audio render params
  const audio = interpolateAudioParams(dataA.renderParams.audio, dataB.renderParams.audio, t);

  // For discrete fields, prefer the closer month
  const closer = t < 0.5 ? dataA : dataB;

  return {
    ...closer,
    month: monthClamped,
    ageLabel: `${monthClamped.toFixed(1)} months`,
    renderParams: {
      visual,
      audio,
      notes: [...dataA.renderParams.notes, ...dataB.renderParams.notes]
    }
  };
}

/**
 * Interpolate visual render parameters between two months
 */
export function interpolateVisualParams(
  a: VisualRenderParams,
  b: VisualRenderParams,
  t: number
): VisualRenderParams {
  return {
    blurPx: lerp(a.blurPx, b.blurPx, t),
    vignetteStrength: lerp(a.vignetteStrength, b.vignetteStrength, t),
    saturation: lerp(a.saturation, b.saturation, t),
    contrast: lerp(a.contrast, b.contrast, t),
    depthCueStrength: lerp(a.depthCueStrength, b.depthCueStrength, t),
    motionSensitivity: lerp(a.motionSensitivity, b.motionSensitivity, t),
    semanticLabelAlpha: lerp(a.semanticLabelAlpha, b.semanticLabelAlpha, t)
  };
}

/**
 * Interpolate audio render parameters between two months
 */
export function interpolateAudioParams(
  a: AudioRenderParams,
  b: AudioRenderParams,
  t: number
): AudioRenderParams {
  return {
    panningJitter: lerp(a.panningJitter, b.panningJitter, t),
    speechInNoiseSuggestedSNRdB: lerp(a.speechInNoiseSuggestedSNRdB, b.speechInNoiseSuggestedSNRdB, t)
  };
}

/**
 * Evaluate a v0.3 curve at a specific month
 */
export function evalCurveV3(curve: CurveV3, month: number): number {
  const pts = curve.points.slice().sort((a, b) => a.month - b.month);
  if (pts.length === 0) return 0;

  // Clamp to curve's valid range
  if (month <= pts[0].month) return pts[0].value;
  if (month >= pts[pts.length - 1].month) return pts[pts.length - 1].value;

  // Linear interpolation between points
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    if (month >= a.month && month <= b.month) {
      const t = (month - a.month) / (b.month - a.month);
      return lerp(a.value, b.value, t);
    }
  }

  return pts[pts.length - 1].value;
}

/**
 * Evaluate a curve by key at a specific month
 */
export function evalCurveByKey(curveKey: string, month: number): number | undefined {
  const curve = getCurveV3(curveKey);
  if (!curve) return undefined;
  return evalCurveV3(curve, month);
}

/**
 * Check if data at a given month is interpolated (proxy data)
 */
export function isMonthInterpolated(month: number): boolean {
  const data = MONTHS.find(m => m.month === Math.round(month));
  if (!data) return true; // Unknown months are considered interpolated

  // Check if any sensory data is marked as interpolated
  return (
    data.senses.vision.isInterpolated ||
    data.senses.hearing.isInterpolated ||
    data.senses.touch.isInterpolated ||
    data.senses.smell.isInterpolated ||
    data.senses.taste.isInterpolated ||
    data.cognition.isInterpolated ||
    data.language.isInterpolated ||
    data.motor.isInterpolated
  );
}
