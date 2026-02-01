import type { Curve, Milestone } from "../types";
import milestones from "./milestones.sample.json";
import curves from "./curves.sample.json";

export const MILESTONES: Milestone[] = milestones as Milestone[];
export const CURVES: Curve[] = curves as Curve[];

export function getCurve(key: string): Curve | undefined {
  return CURVES.find((c) => c.key === key);
}
