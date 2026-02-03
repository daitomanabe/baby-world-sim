import type { Curve, Milestone } from "../types";
import type { ModelV3, MonthlyData, SourceDefinition, CurveV3, MilestoneV3, TaskDefinition } from "./model";
import milestones from "./milestones.sample.json";
import curves from "./curves.sample.json";
import modelDataV3 from "./baby_world_monthly_model.v0.3.detailed.json";

// Re-export comprehensive growth data (from documentation)
export {
  getGrowthData,
  getGrowthDataInterpolated,
  GROWTH_SOURCES,
  type MonthlyGrowthData,
  type VisionData,
  type HearingData,
  type TouchData,
  type TasteData,
  type SmellData,
  type CognitionData,
  type LanguageData,
  type ConversationData,
  type NumeracyData,
  type LiteracyData,
} from "./growthData";

// ============================================================================
// v0.3 Model Data
// ============================================================================

/**
 * Complete v0.3 model with monthly data, sources, curves, milestones, and task library
 */
export const MODEL_V3: ModelV3 = modelDataV3 as ModelV3;

/**
 * Monthly development data (months 0-48)
 */
export const MONTHS: MonthlyData[] = MODEL_V3.months;

/**
 * Research sources with evidence levels
 */
export const SOURCES: Record<string, SourceDefinition> = MODEL_V3.sources;

/**
 * Development curves (raw progression data)
 */
export const CURVES_V3: CurveV3[] = MODEL_V3.curves;

/**
 * Development milestones
 */
export const MILESTONES_V3: MilestoneV3[] = MODEL_V3.milestones;

/**
 * Task library for interactive demonstrations
 */
export const TASK_LIBRARY: TaskDefinition[] = MODEL_V3.taskLibrary;

/**
 * Model metadata (version, disclaimer, etc.)
 */
export const MODEL_META = MODEL_V3.meta;

// ============================================================================
// Legacy v0.2 Sample Data (backwards compatibility)
// ============================================================================

export const MILESTONES: Milestone[] = milestones as Milestone[];
export const CURVES: Curve[] = curves as Curve[];

export function getCurve(key: string): Curve | undefined {
  return CURVES.find((c) => c.key === key);
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get monthly data for a specific month (0-48)
 */
export function getMonthData(month: number): MonthlyData | undefined {
  return MONTHS.find((m) => m.month === month);
}

/**
 * Get source definition by key
 */
export function getSource(sourceRef: string): SourceDefinition | undefined {
  return SOURCES[sourceRef];
}

/**
 * Get curve by key
 */
export function getCurveV3(key: string): CurveV3 | undefined {
  return CURVES_V3.find((c) => c.key === key);
}

/**
 * Get milestone by ID
 */
export function getMilestone(id: string): MilestoneV3 | undefined {
  return MILESTONES_V3.find((m) => m.id === id);
}

/**
 * Get task definition by ID
 */
export function getTask(id: string): TaskDefinition | undefined {
  return TASK_LIBRARY.find((t) => t.id === id);
}
