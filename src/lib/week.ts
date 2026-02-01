export const WEEKS_TOTAL = 208;

export function clampWeek(week: number): number {
  if (Number.isNaN(week)) return 0;
  return Math.min(WEEKS_TOTAL, Math.max(0, Math.round(week)));
}

export function weekToMonthsApprox(week: number): number {
  // 1 month ≈ 4.345 weeks (52.14/12). This is a convenience function.
  return Math.round((week / 4.345) * 10) / 10;
}

export function weekToAgeLabel(week: number): string {
  const months = weekToMonthsApprox(week);
  const years = Math.floor(months / 12);
  const remMonths = Math.round((months - years * 12) * 10) / 10;

  if (years <= 0) return `${months}ヶ月（目安）`;
  if (remMonths === 0) return `${years}歳`;
  return `${years}歳${remMonths}ヶ月（目安）`;
}
