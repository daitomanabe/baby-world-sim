import React, { useMemo } from "react";
import { MILESTONES, getCurve } from "../../data";
import { evalCurve } from "../../lib/interp";

type Props = { week: number };

export default function LanguageConceptPanel({ week }: Props) {
  const vocabCurve = getCurve("language.vocabularyEstimate");
  const vocab = useMemo(() => (vocabCurve ? evalCurve(vocabCurve, week) : 0.1), [vocabCurve, week]);

  const items = useMemo(() => {
    // Pick milestones within +-8 weeks as an example UI behavior
    const window = 8;
    return MILESTONES.filter((m) => m.domain === "language" || m.domain === "cognition")
      .filter((m) => week >= m.weekStart - window && week <= (m.weekEnd ?? m.weekStart) + window);
  }, [week]);

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>言語・概念（再現不可 → 表示）</div>
        <div className="small">語彙推定（正規化）: {vocab.toFixed(2)}（仮）</div>
      </div>

      <div className="small" style={{ marginTop: 8 }}>
        ※ 言語/概念は画面で“体験として再現”するのが難しいため、マイルストーンと注釈で可視化します。
      </div>

      <div style={{ marginTop: 12 }}>
        <div className="small" style={{ fontWeight: 700 }}>近傍のマイルストーン</div>
        {items.length === 0 ? (
          <div className="small" style={{ marginTop: 8, opacity: 0.8 }}>
            （この週付近のデータはまだ少ない。`src/data/milestones.sample.json` を拡充してください）
          </div>
        ) : (
          <ul style={{ marginTop: 8 }}>
            {items.map((m) => (
              <li key={m.id} style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 700 }}>{m.title}</div>
                <div className="small">{m.summary}</div>
                <div className="small">
                  出典: <a href={m.sourceUrl} target="_blank" rel="noreferrer">{m.sourceTitle}</a>（{m.evidenceLevel}）
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
