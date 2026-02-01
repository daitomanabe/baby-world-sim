import type { Curve } from "../types";

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
