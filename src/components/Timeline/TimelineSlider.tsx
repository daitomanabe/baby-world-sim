import React from "react";
import { clampWeek, WEEKS_TOTAL, weekToAgeLabel } from "../../lib/week";

type Props = {
  week: number;
  onChange: (week: number) => void;
};

export default function TimelineSlider({ week, onChange }: Props) {
  const w = clampWeek(week);

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>タイムライン</div>
          <div className="small">週: {w} / {WEEKS_TOTAL} — {weekToAgeLabel(w)}</div>
        </div>
        <div className="small">※週単位の細かな変化は補間（モデル）を含む</div>
      </div>

      <input
        type="range"
        min={0}
        max={WEEKS_TOTAL}
        step={1}
        value={w}
        onChange={(e) => onChange(clampWeek(Number(e.target.value)))}
        style={{ width: "100%", marginTop: 12 }}
        aria-label="週単位タイムライン"
      />
    </div>
  );
}
