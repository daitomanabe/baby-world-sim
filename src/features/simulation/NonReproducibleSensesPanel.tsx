import React, { useMemo } from "react";
import { getMonthDataInterpolated, isMonthInterpolated } from "../../lib/interp";
import { EvidenceBadge } from "../../components/Evidence";

type Props = {
  /** Current week (0-208) */
  week: number;
};

export default function NonReproducibleSensesPanel({ week }: Props) {
  // Convert week to month for v0.3 model
  const month = useMemo(() => week / 4.345, [week]);
  const monthData = useMemo(() => getMonthDataInterpolated(month), [month]);
  const isInterpolated = useMemo(() => isMonthInterpolated(month), [month]);

  const { touch, smell, taste } = monthData.senses;

  // Progress bar component
  const ProgressBar = ({ value, label, color }: { value: number; label: string; color: string }) => (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
        <span className="small">{label}</span>
        <span className="small">{(value * 100).toFixed(0)}%</span>
      </div>
      <div style={{ height: 8, backgroundColor: "#e5e7eb", borderRadius: 4, overflow: "hidden" }}>
        <div
          style={{
            width: `${value * 100}%`,
            height: "100%",
            backgroundColor: color,
            borderRadius: 4,
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>触覚・嗅覚・味覚</div>
        <EvidenceBadge
          evidenceLevel="placeholder"
          sourceTitle="モデル仮定（proxy）"
          isInterpolated={isInterpolated}
          compact
        />
      </div>

      <div className="small" style={{ marginTop: 4, color: "#666" }}>
        {monthData.ageLabel} - これらの感覚はPCで直接再現できないため、発達の傾向を数値で表示
      </div>

      {/* Touch */}
      <div style={{ marginTop: 16 }}>
        <div className="small" style={{ fontWeight: 600, marginBottom: 8 }}>
          触覚探索 - {touch.stage}
        </div>
        <ProgressBar value={touch.mouthExploration} label="口探索" color="#ef4444" />
        <ProgressBar value={touch.handExploration} label="手探索" color="#3b82f6" />
        <ProgressBar value={touch.toolUse} label="道具使用" color="#10b981" />
      </div>

      {/* Smell */}
      <div style={{ marginTop: 16 }}>
        <div className="small" style={{ fontWeight: 600, marginBottom: 8 }}>
          嗅覚 - {smell.stage}
        </div>
        <ProgressBar value={smell.discrimination} label="匂いの識別" color="#8b5cf6" />
      </div>

      {/* Taste */}
      <div style={{ marginTop: 16 }}>
        <div className="small" style={{ fontWeight: 600, marginBottom: 8 }}>
          味覚 - {taste.stage}
        </div>
        <ProgressBar value={taste.saltSensitivity} label="塩味感受性" color="#f59e0b" />
        <ProgressBar value={taste.neophobia} label="食物新奇恐怖" color="#ec4899" />
      </div>

      <div className="small" style={{ marginTop: 12, padding: "8px", backgroundColor: "#f8f9fa", borderRadius: 6 }}>
        ※ これらの値は発達研究に基づく推定モデルです。個人差が大きく、診断目的には使用できません。
      </div>
    </div>
  );
}
