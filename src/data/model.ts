/**
 * Type definitions for baby_world_monthly_model.v0.3.detailed.json
 *
 * This file defines the complete TypeScript interface for the v0.3 monthly model,
 * including all sensory, cognitive, and rendering parameters.
 */

import type { EvidenceLevel } from "../types";

// ============================================================================
// Meta & Top-level
// ============================================================================

export interface ModelV3 {
  meta: ModelMeta;
  sources: Record<string, SourceDefinition>;
  curves: CurveV3[];
  milestones: MilestoneV3[];
  taskLibrary: TaskDefinition[];
  months: MonthlyData[];
}

export interface ModelMeta {
  modelVersion: string;
  generatedAt: string;
  granularity: string;
  monthsTotal: number;
  disclaimer: string[];
  howToUse: string[];
}

export interface SourceDefinition {
  title: string;
  url: string;
  evidenceLevel: EvidenceLevel;
  notes: string;
}

// ============================================================================
// Curves (monthly progression data)
// ============================================================================

export interface CurveV3 {
  key: string;
  unit: string;
  monthMin: number;
  monthMax: number;
  description: string;
  points: CurvePoint[];
  isInterpolated: boolean;
  evidence: {
    sourceRef: string;
    notes: string;
  };
}

export interface CurvePoint {
  month: number;
  value: number;
}

// ============================================================================
// Milestones
// ============================================================================

export interface MilestoneV3 {
  id: string;
  monthStart: number;
  monthEnd: number;
  domain: string;
  title: string;
  summary: string;
  sourceRef: string;
  evidenceLevel: EvidenceLevel;
  tags: string[];
}

// ============================================================================
// Task Library
// ============================================================================

export interface TaskDefinition {
  id: string;
  domain: string;
  title: string;
  goal: string;
  requiresModules: string[];
  params: Record<string, any>;
  evidence: Array<{
    sourceRef: string;
  }>;
  notes: string;
}

// ============================================================================
// Monthly Data (the core of the model)
// ============================================================================

export interface MonthlyData {
  month: number;
  ageLabel: string;
  senses: Senses;
  visionRepresentation: VisionRepresentation;
  cognition: Cognition;
  language: Language;
  motor: Motor;
  narrative: Narrative;
  tasksRecommended: TaskRecommendation[];
  renderParams: RenderParams;
  appFlags: AppFlags;
  uncertainty: Uncertainty;
  summary: string;
}

export interface Narrative {
  sensory: string[];
  action: string[];
  language: string[];
  concept: string[];
  monthSpecific: string[];
  caveats: string[];
}

export interface TaskRecommendation {
  id: string;
  why: string;
}

// ============================================================================
// Senses
// ============================================================================

export interface Senses {
  vision: VisionSense;
  hearing: HearingSense;
  touch: TouchSense;
  smell: SmellSense;
  taste: TasteSense;
}

export interface VisionSense {
  clarity: number;
  color: number;
  depth: number;
  motion: number;
  objects: number;
  semantics: number;
  stage: string;
  isInterpolated: boolean;
}

/**
 * Detailed color vision development model based on research:
 * - PMC9314692 (Skelton 2022): Infant color perception timeline
 * - AAO: Vision development first year
 *
 * Key findings:
 * - Red-green channel develops first (by 2 months)
 * - Blue-yellow channel follows 4-8 weeks later (by 3-4 months)
 * - Trichromatic vision by 3 months
 * - Color categorization by 4-6 months
 * - Color constancy develops 3+ months, matures through 4 years
 */
export interface ColorVisionDetail {
  /** L-cone (red) sensitivity: 0-1 */
  lCone: number;
  /** M-cone (green) sensitivity: 0-1 */
  mCone: number;
  /** S-cone (blue) sensitivity: 0-1 */
  sCone: number;
  /** Red-green opponent channel: 0-1 (develops first) */
  redGreenChannel: number;
  /** Blue-yellow opponent channel: 0-1 (develops 4-8 weeks after R-G) */
  blueYellowChannel: number;
  /** Color categorization ability: 0-1 (5 categories by 4-6 months) */
  colorCategorization: number;
  /** Color constancy: 0-1 (begins 3 months, matures through 4 years) */
  colorConstancy: number;
  /** Saturation sensitivity: 0-1 (doesn't reach adult levels until adolescence) */
  saturationSensitivity: number;
  /** Development stage description */
  stage: string;
  /** Evidence source reference */
  evidenceRef: string;
}

export interface HearingSense {
  localizationErrorDeg: number;
  speechSalience: number;
  stage: string;
  isInterpolated: boolean;
}

export interface TouchSense {
  mouthExploration: number;
  handExploration: number;
  toolUse: number;
  stage: string;
  isInterpolated: boolean;
}

export interface SmellSense {
  discrimination: number;
  stage: string;
  isInterpolated: boolean;
}

export interface TasteSense {
  saltSensitivity: number;
  neophobia: number;
  stage: string;
  isInterpolated: boolean;
}

// ============================================================================
// Vision Representation (6-level hierarchy)
// ============================================================================

export interface VisionRepresentation {
  levels: VisionLevel[];
  dimensionality: {
    twoDWeight: number;
    threeDWeight: number;
  };
  stage: string;
  evidence: Array<{
    sourceRef: string;
    what: string;
  }>;
}

export interface VisionLevel {
  level: number;
  key: string;
  name: string;
  score: number;
  changeFromPrevMonth: string | null;
  interpretation: string;
}

// ============================================================================
// Cognition
// ============================================================================

export interface Cognition {
  objectPermanence: number;
  jointAttention: number;
  pretendPlay: number;
  causalReasoning: number;
  theoryOfMind: number;
  featureToMeaning: number;
  attentionSelective: number;
  attentionShift: number;
  workingMemory: number;
  inhibition: number;
  imitation: number;
  stage: string;
  isInterpolated: boolean;
  conceptRepresentation: ConceptRepresentation;
}

export interface ConceptRepresentation {
  layers: ConceptLayer[];
  stage: string;
  evidence: Array<{
    sourceRef: string;
    what: string;
  }>;
}

export interface ConceptLayer {
  level: number;
  key: string;
  name: string;
  score: number;
  changeFromPrevMonth: string | null;
  interpretation: string;
}

// ============================================================================
// Language
// ============================================================================

export interface Language {
  receptive: number;
  expressive: number;
  vocabularyNorm: number;
  syntaxComplexity: number;
  pragmatics: number;
  stage: string;
  isInterpolated: boolean;
}

// ============================================================================
// Motor
// ============================================================================

export interface Motor {
  gross: number;
  fine: number;
  stage: string;
  isInterpolated: boolean;
}

// ============================================================================
// Render Parameters (for visual/audio simulation)
// ============================================================================

export interface RenderParams {
  visual: VisualRenderParams;
  audio: AudioRenderParams;
  notes: string[];
}

export interface VisualRenderParams {
  blurPx: number;
  vignetteStrength: number;
  saturation: number;
  contrast: number;
  depthCueStrength: number;
  motionSensitivity: number;
  semanticLabelAlpha: number;
}

export interface AudioRenderParams {
  panningJitter: number;
  speechInNoiseSuggestedSNRdB: number;
}

// ============================================================================
// App Flags (feature toggles)
// ============================================================================

export interface AppFlags {
  enableDepthCues: boolean;
  enableSemanticLabels: boolean;
  enableJointAttentionAgent: boolean;
  enablePretendPlayScenarios: boolean;
  enableTheoryOfMindTask: boolean;
  enableTurnTakingDialogue: boolean;
}

// ============================================================================
// Uncertainty (confidence levels)
// ============================================================================

export interface Uncertainty {
  visionBasic: number;
  visionSemantics: number;
  hearing: number;
  touchSmellTaste: number;
  motor: number;
  language: number;
  cognition: number;
  theoryOfMind: number;
  notes: string[];
}
