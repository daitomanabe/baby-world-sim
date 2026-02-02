/**
 * Depth Perception Development Model
 *
 * Based on scientific research:
 * - Held, Birch & Gwiazda (1980): Stereopsis in Human Infants (Science)
 * - Granrud et al.: Development of Visual Depth Perception
 * - Kavšek (2002): Emergence of sensitivity to pictorial depth cues
 *
 * Key findings:
 * - 0-3 months: Only kinetic (motion) depth cues
 * - 3-4 months: Stereopsis suddenly emerges (10-19 weeks)
 * - 4-5 months: Rapid maturation, binocular vision develops
 * - 5-7 months: Pictorial depth cues emerge (texture, perspective, occlusion)
 * - 12-24 months: Stereoacuity approaches adult levels
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

export interface DepthVisionDetail {
  /** Kinetic/motion depth cues (0-1) - present from birth */
  kineticCues: number;
  /** Binocular disparity / stereopsis (0-1) - emerges 3-4 months */
  binocularDisparity: number;
  /** Stereoacuity level (0-1) - continues developing until 24 months */
  stereoacuity: number;
  /** Pictorial: Texture gradient sensitivity (0-1) - 5-7 months */
  textureGradient: number;
  /** Pictorial: Linear perspective sensitivity (0-1) - 5-7 months */
  linearPerspective: number;
  /** Pictorial: Relative size sensitivity (0-1) - 5-7 months */
  relativeSize: number;
  /** Pictorial: Occlusion/interposition sensitivity (0-1) - 5-7 months */
  occlusion: number;
  /** Pictorial: Height in visual field (0-1) - 5-7 months */
  heightInField: number;
  /** Overall 3D perception ability (0-1) - composite score */
  overall3DPerception: number;
  /** 2D weight for rendering (1 = flat, 0 = full 3D) */
  twoDWeight: number;
  /** 3D weight for rendering (0 = flat, 1 = full 3D) */
  threeDWeight: number;
  /** Development stage description */
  stage: string;
  /** Evidence source reference */
  evidenceRef: string;
}

/**
 * Calculate detailed depth perception parameters for a given month (0-48)
 */
export function calculateDepthVision(month: number): DepthVisionDetail {
  const m = Math.max(0, Math.min(48, month));

  // === Kinetic/Motion Cues ===
  // Research: Some sensitivity may be present at birth
  // Motion parallax sensitivity by 16 weeks (4 months)
  const kineticCues = 0.2 + 0.8 * sigmoid(m, 2, 2);

  // === Binocular Disparity / Stereopsis ===
  // Research: Sudden onset at 3-5 months (10-19 weeks)
  // Followed by rapid maturation to near-adult by 4-6 months
  const binocularDisparity = sigmoid(m, 3.5, 5);

  // === Stereoacuity ===
  // Research: Continues developing, threshold ~300 arc sec at 24 months
  // Approaches adult levels after 24 months
  const stereoacuity = sigmoid(m, 4, 3) * lerp(m, 4, 24, 0.5, 1.0);

  // === Pictorial Depth Cues ===
  // Research: Emerge between 5-7 months (22-28 weeks)

  // Texture gradients: 5-7 months
  const textureGradient = sigmoid(m, 6, 3);

  // Linear perspective: 5-7 months
  const linearPerspective = sigmoid(m, 6, 3);

  // Relative size: 5-7 months, develops alongside perspective
  const relativeSize = sigmoid(m, 5.5, 3);

  // Occlusion/interposition: Some sensitivity early, develops 5-7 months
  const occlusion = 0.1 + 0.9 * sigmoid(m, 5, 3);

  // Height in visual field: 7+ months
  const heightInField = sigmoid(m, 7, 3);

  // === Overall 3D Perception ===
  // Weighted combination of all cues
  const overall3DPerception = Math.min(1,
    kineticCues * 0.15 +
    binocularDisparity * 0.35 +
    stereoacuity * 0.15 +
    textureGradient * 0.1 +
    linearPerspective * 0.1 +
    relativeSize * 0.05 +
    occlusion * 0.05 +
    heightInField * 0.05
  );

  // 2D/3D weights for rendering
  const threeDWeight = overall3DPerception;
  const twoDWeight = 1 - threeDWeight;

  // === Stage Description ===
  let stage: string;
  let evidenceRef: string;

  if (m < 2) {
    stage = '2D世界。運動による奥行き手がかりのみ（限定的）';
    evidenceRef = 'Granrud: 0-3ヶ月は運動手がかりのみで奥行き知覚';
  } else if (m < 3.5) {
    stage = '2D世界。運動視差が発達中、立体視はまだ';
    evidenceRef = 'Held (1980): 立体視は10-19週で突然出現';
  } else if (m < 4.5) {
    stage = '3D世界への移行！立体視が突然出現';
    evidenceRef = 'Science: 3-5ヶ月で立体視が突然開始、急速に成熟';
  } else if (m < 6) {
    stage = '両眼立体視が急速に発達中。絵画的手がかりはまだ';
    evidenceRef = 'AAO: 4-5ヶ月で両眼視発達、サイズ恒常性出現';
  } else if (m < 8) {
    stage = '絵画的奥行き手がかりが出現（テクスチャ、遠近法）';
    evidenceRef = 'Kavšek (2002): 22-28週で絵画的手がかり感度出現';
  } else if (m < 12) {
    stage = '複数の奥行き手がかりを統合。3D知覚が洗練';
    evidenceRef = 'メタ分析: 5-7ヶ月児は絵画的手がかりに反応';
  } else if (m < 24) {
    stage = '立体視精度が向上中。奥行き知覚を行動に活用';
    evidenceRef = '研究: 24ヶ月で立体視閾値が成人レベルに近づく';
  } else {
    stage = '成人に近い奥行き知覚。全ての手がかりを統合';
    evidenceRef = '研究: 2歳で両眼視・奥行き知覚がほぼ発達完了';
  }

  return {
    kineticCues,
    binocularDisparity,
    stereoacuity,
    textureGradient,
    linearPerspective,
    relativeSize,
    occlusion,
    heightInField,
    overall3DPerception,
    twoDWeight,
    threeDWeight,
    stage,
    evidenceRef,
  };
}

/**
 * Get a human-readable summary of depth perception at this age
 */
export function getDepthVisionSummary(month: number): string[] {
  const dv = calculateDepthVision(month);
  const summary: string[] = [];

  if (dv.binocularDisparity < 0.2) {
    summary.push('立体視なし - 世界は基本的に2D');
  } else if (dv.binocularDisparity < 0.5) {
    summary.push('立体視が出現中 - 3D世界への移行期');
  } else if (dv.binocularDisparity < 0.9) {
    summary.push('立体視が発達中');
  } else {
    summary.push('立体視が十分に発達');
  }

  if (dv.kineticCues > 0.5 && dv.binocularDisparity < 0.3) {
    summary.push('運動による奥行きのみ知覚可能');
  }

  if (dv.textureGradient < 0.3) {
    summary.push('テクスチャ勾配による奥行きは知覚できない');
  } else if (dv.textureGradient > 0.7) {
    summary.push('テクスチャ勾配から奥行きを知覚');
  }

  if (dv.linearPerspective < 0.3) {
    summary.push('遠近法による奥行きは知覚できない');
  } else if (dv.linearPerspective > 0.7) {
    summary.push('線形遠近法から奥行きを知覚');
  }

  if (dv.occlusion < 0.3) {
    summary.push('遮蔽（前後関係）の理解が限定的');
  }

  return summary;
}

// Export evidence sources for UI
export const DEPTH_VISION_SOURCES = {
  science1980: {
    title: 'Stereopsis in Human Infants (Held, Birch & Gwiazda 1980)',
    url: 'https://www.science.org/doi/10.1126/science.7350666',
    evidenceLevel: 'peer_reviewed' as const,
  },
  kavsek2002: {
    title: 'Emergence of sensitivity to pictorial depth cues (Kavšek 2002)',
    url: 'https://www.sciencedirect.com/science/article/abs/pii/S0163638302001479',
    evidenceLevel: 'peer_reviewed' as const,
  },
  aao: {
    title: 'Development of Ocular Alignment and Binocular Vision - AAO',
    url: 'https://www.aao.org/education/disease-review/typical-atypical-development-of-ocular-alignment-b',
    evidenceLevel: 'public_guideline' as const,
  },
  wikipedia: {
    title: 'Infant visual development - Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Infant_visual_development',
    evidenceLevel: 'expert_article' as const,
  },
};
