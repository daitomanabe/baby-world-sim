import React from "react";

type Props = { week: number };

export default function NonReproducibleSensesPanel({ week }: Props) {
  // Placeholder: this will later use curves + milestones for touch/smell/taste
  const mouthToHand = Math.min(1, Math.max(0, week / 52)); // crude
  const toolUse = Math.min(1, Math.max(0, (week - 78) / 130)); // crude

  return (
    <div className="card">
      <div style={{ fontSize: 14, fontWeight: 700 }}>触覚・嗅覚・味覚（再現不可）</div>
      <div className="small" style={{ marginTop: 8 }}>
        PCでは触/嗅/味を直接再現できないため、探索の主役の移行や出来事を“説明”として可視化します。
      </div>

      <div style={{ marginTop: 12 }}>
        <div className="small">探索の主役（仮モデル）</div>
        <div className="small">口探索 → 手探索：{(mouthToHand * 100).toFixed(0)}%</div>
        <div className="small">道具の使用：{(toolUse * 100).toFixed(0)}%</div>
      </div>

      <div className="small" style={{ marginTop: 12, opacity: 0.8 }}>
        TODO: データ（milestones/curves）に置き換え。断定表現を避け、出典とレベルを表示する。
      </div>
    </div>
  );
}
