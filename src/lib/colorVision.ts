/**
 * Color Vision Development Model
 *
 * Based on scientific research:
 * - Skelton (2022) PMC9314692: Infant color perception timeline
 * - AAO: Vision Development: Newborn to 12 Months
 * - Wikipedia: Infant visual development
 *
 * Key findings:
 * - Newborns: Cones immature, largely monochromatic, can detect high-contrast red
 * - 1 month: Red (L-cone) perception emerging
 * - 2 months: Dichromatic (red-green channel developing)
 * - 3 months: Trichromatic (blue-yellow channel developing)
 * - 4 months: Both opponent channels functional, color categorization begins
 * - 5-6 months: Near-adult color perception, 5 color categories
 * - 12 months: Color used for object individuation
 * - 2-4 years: Color constancy maturing
 * - Adolescence: Adult-level saturation sensitivity
 */

import type { ColorVisionDetail } from '../data/model';

/**
 * Attempt to define reasonable sigmoid/linear functions that reflect research
 * timeline. These are APPROXIMATIONS for educational purposes.
 */

// Smooth sigmoid-like transition
function sigmoid(x: number, midpoint: number, steepness: number = 4): number {
  return 1 / (1 + Math.exp(-steepness * (x - midpoint)));
}

// Linear interpolation with clamping
function lerp(value: number, min: number, max: number, outMin: number, outMax: number): number {
  const t = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return outMin + t * (outMax - outMin);
}

/**
 * Calculate detailed color vision parameters for a given month (0-48)
 *
 * Evidence-based timeline:
 * - 0 months: ~20% L-cone, ~10% M-cone, ~5% S-cone (cones immature)
 * - 1 month: L-cone improving, still dichromatic at best
 * - 2 months: Dichromatic confirmed, red-green channel emerging
 * - 3 months: Trichromatic, blue-yellow channel developing
 * - 4 months: Both channels functional, categorization begins
 * - 6 months: Near-adult hue perception, 5 categories
 * - 12 months: Color object individuation
 * - 24-48 months: Color constancy maturing
 */
export function calculateColorVision(month: number): ColorVisionDetail {
  // Clamp month to valid range
  const m = Math.max(0, Math.min(48, month));

  // === Cone Development ===
  // L-cones (red) develop first - functional by ~1-2 months
  // Research: 75% of newborns can orient to red
  const lCone = 0.2 + 0.8 * sigmoid(m, 1.5, 3);

  // M-cones (green) develop alongside L-cones but slightly delayed
  // Research: Red-green channel works by 2 months
  const mCone = 0.1 + 0.9 * sigmoid(m, 2, 3);

  // S-cones (blue) develop later
  // Research: Blue-yellow channel 4-8 weeks behind red-green
  // 80% of newborns fail to orient to blue
  const sCone = 0.05 + 0.95 * sigmoid(m, 3, 2.5);

  // === Opponent Channels ===
  // Red-Green channel: develops first, functional by 2-3 months
  const redGreenChannel = sigmoid(m, 2, 3);

  // Blue-Yellow channel: develops 4-8 weeks after R-G, functional by 3-4 months
  const blueYellowChannel = sigmoid(m, 3.5, 2.5);

  // === Higher-level Color Processing ===

  // Color categorization: begins around 4 months, well-developed by 6 months
  // Research: 4-6 month olds categorize into 5 groups (red, yellow, green, blue, purple)
  const colorCategorization = sigmoid(m, 5, 2);

  // Color constancy: begins at 3 months, continues maturing through 4 years
  // Research: Still maturing at 2-4 years
  const colorConstancy = 0.1 * sigmoid(m, 3, 2) + 0.9 * lerp(m, 3, 48, 0, 1);

  // Saturation sensitivity: slow development, doesn't reach adult levels until adolescence
  // Research: "Saturation thresholds do not reach adult levels until late adolescence"
  // At 48 months, maybe ~60% of adult level
  const saturationSensitivity = lerp(m, 0, 48, 0.1, 0.6);

  // === Stage Description ===
  let stage: string;
  let evidenceRef: string;

  if (m < 1) {
    stage = '錐体細胞未成熟。主に白黒で、高コントラストの赤を一部検出可能';
    evidenceRef = 'PMC9314692: 75%の新生児が赤に反応、80%が青に反応せず';
  } else if (m < 2) {
    stage = 'L錐体（赤）が発達開始。赤が最初に知覚される色';
    evidenceRef = 'AAO: 赤は錐体発達が早いため最初に見える色';
  } else if (m < 3) {
    stage = '二色型（dichromatic）。赤-緑チャネルが機能開始';
    evidenceRef = 'PMC9314692: 2ヶ月児は少なくとも二色型';
  } else if (m < 4) {
    stage = '三色型（trichromatic）へ移行。青-黄チャネルが発達中';
    evidenceRef = 'PMC9314692: 3ヶ月で三色型、青-黄は赤-緑より4-8週遅れ';
  } else if (m < 6) {
    stage = '両方の対向チャネルが機能。色のカテゴリ化開始（5色）';
    evidenceRef = 'PMC9314692: 4ヶ月で色カテゴリ化、赤/黄/緑/青/紫';
  } else if (m < 12) {
    stage = '成人に近い色相知覚。色の恒常性が発達中';
    evidenceRef = 'AAO: 5ヶ月で良好な色覚、9ヶ月で"最終的な色"';
  } else if (m < 24) {
    stage = '色による物体識別が可能。色の恒常性が成熟中';
    evidenceRef = 'PMC9314692: 11.5ヶ月で色による物体個別化';
  } else {
    stage = '色の恒常性が成熟。彩度感度は思春期まで発達継続';
    evidenceRef = 'PMC9314692: 色の恒常性は2-4歳で成熟、彩度は思春期まで';
  }

  return {
    lCone,
    mCone,
    sCone,
    redGreenChannel,
    blueYellowChannel,
    colorCategorization,
    colorConstancy,
    saturationSensitivity,
    stage,
    evidenceRef,
  };
}

/**
 * Apply color vision limitations to RGB values
 * This simulates how an infant might perceive colors
 */
export function applyColorVisionFilter(
  r: number,
  g: number,
  b: number,
  colorVision: ColorVisionDetail
): { r: number; g: number; b: number } {
  // Normalize to 0-1
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  // Simulate cone response
  // L-cone primarily responds to red/yellow
  // M-cone primarily responds to green/yellow
  // S-cone primarily responds to blue
  const lResponse = rn * colorVision.lCone;
  const mResponse = gn * colorVision.mCone;
  const sResponse = bn * colorVision.sCone;

  // Combine based on opponent channels
  // Without full red-green channel, colors blend more toward yellow/gray
  // Without full blue-yellow channel, blues appear more gray
  const rgBlend = colorVision.redGreenChannel;
  const byBlend = colorVision.blueYellowChannel;

  // Calculate output colors
  // When channels are weak, colors shift toward luminance (gray)
  const luminance = 0.299 * rn + 0.587 * gn + 0.114 * bn;

  let outR = luminance + (lResponse - luminance) * rgBlend;
  let outG = luminance + (mResponse - luminance) * rgBlend;
  let outB = luminance + (sResponse - luminance) * byBlend;

  // Apply saturation sensitivity (reduce saturation for underdeveloped vision)
  const avgOut = (outR + outG + outB) / 3;
  const satFactor = colorVision.saturationSensitivity;
  outR = avgOut + (outR - avgOut) * satFactor;
  outG = avgOut + (outG - avgOut) * satFactor;
  outB = avgOut + (outB - avgOut) * satFactor;

  // Convert back to 0-255
  return {
    r: Math.max(0, Math.min(255, Math.round(outR * 255))),
    g: Math.max(0, Math.min(255, Math.round(outG * 255))),
    b: Math.max(0, Math.min(255, Math.round(outB * 255))),
  };
}

/**
 * Get a human-readable summary of color vision at this age
 */
export function getColorVisionSummary(month: number): string[] {
  const cv = calculateColorVision(month);
  const summary: string[] = [];

  if (cv.lCone < 0.5) {
    summary.push('赤の知覚が未発達');
  } else if (cv.lCone < 0.9) {
    summary.push('赤は知覚可能');
  }

  if (cv.sCone < 0.3) {
    summary.push('青はほとんど見えない');
  } else if (cv.sCone < 0.7) {
    summary.push('青の知覚が発達中');
  }

  if (cv.redGreenChannel < 0.5) {
    summary.push('赤-緑の区別が困難');
  }

  if (cv.blueYellowChannel < 0.5) {
    summary.push('青-黄の区別が困難');
  }

  if (cv.colorCategorization < 0.3) {
    summary.push('色のカテゴリ化は未発達');
  } else if (cv.colorCategorization > 0.7) {
    summary.push('5色カテゴリ（赤/黄/緑/青/紫）を識別');
  }

  return summary;
}

// Export evidence sources for UI
export const COLOR_VISION_SOURCES = {
  pmc9314692: {
    title: 'Infant color perception: Insight into perceptual development (Skelton 2022)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9314692/',
    evidenceLevel: 'peer_reviewed' as const,
  },
  aao: {
    title: 'Vision Development: Newborn to 12 Months - AAO',
    url: 'https://www.aao.org/eye-health/tips-prevention/baby-vision-development-first-year',
    evidenceLevel: 'public_guideline' as const,
  },
  wikipedia: {
    title: 'Infant visual development - Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Infant_visual_development',
    evidenceLevel: 'expert_article' as const,
  },
};
