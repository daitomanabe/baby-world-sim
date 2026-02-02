import React, { useMemo } from "react";
import { MILESTONES_V3, SOURCES } from "../../data";
import { getMonthDataInterpolated, isMonthInterpolated } from "../../lib/interp";
import { EvidenceBadge } from "../../components/Evidence";

type Props = {
  /** Current week (0-208) */
  week: number;
};

export default function LanguageConceptPanel({ week }: Props) {
  // Convert week to month for v0.3 model
  const month = useMemo(() => week / 4.345, [week]);
  const monthData = useMemo(() => getMonthDataInterpolated(month), [month]);
  const isInterpolated = useMemo(() => isMonthInterpolated(month), [month]);

  const { language, cognition } = monthData;

  // Find milestones near current month
  const nearbyMilestones = useMemo(() => {
    const windowMonths = 2;
    return MILESTONES_V3.filter(m =>
      month >= m.monthStart - windowMonths &&
      month <= m.monthEnd + windowMonths
    );
  }, [month]);

  // Progress bar component
  const ProgressBar = ({ value, label, max = 1 }: { value: number; label: string; max?: number }) => (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
        <span style={{ fontSize: 11 }}>{label}</span>
        <span style={{ fontSize: 11 }}>{value.toFixed(2)}</span>
      </div>
      <div style={{ height: 6, backgroundColor: "#e5e7eb", borderRadius: 3, overflow: "hidden" }}>
        <div
          style={{
            width: `${(value / max) * 100}%`,
            height: "100%",
            backgroundColor: "#6366f1",
            borderRadius: 3,
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>言語・概念</div>
        <EvidenceBadge
          evidenceLevel="public_guideline"
          sourceUrl="https://www.cdc.gov/act-early/milestones/key-points.html"
          sourceTitle="CDC: Learn the Signs"
          isInterpolated={isInterpolated}
          compact
        />
      </div>

      <div className="small" style={{ marginTop: 4, color: "#666" }}>
        {monthData.ageLabel} - {language.stage}
      </div>

      {/* Language metrics */}
      <div style={{ marginTop: 12 }}>
        <div className="small" style={{ fontWeight: 600, marginBottom: 8 }}>言語発達</div>
        <ProgressBar value={language.receptive} label="理解語彙" />
        <ProgressBar value={language.expressive} label="表出語彙" />
        <ProgressBar value={language.syntaxComplexity} label="統語複雑性" />
        <ProgressBar value={language.pragmatics} label="語用論" />
      </div>

      {/* Cognition metrics */}
      <div style={{ marginTop: 16 }}>
        <div className="small" style={{ fontWeight: 600, marginBottom: 8 }}>認知発達 - {cognition.stage}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <ProgressBar value={cognition.objectPermanence} label="対象の永続性" />
          <ProgressBar value={cognition.jointAttention} label="共同注意" />
          <ProgressBar value={cognition.pretendPlay} label="ふり遊び" />
          <ProgressBar value={cognition.causalReasoning} label="因果推論" />
          <ProgressBar value={cognition.theoryOfMind} label="心の理論" />
          <ProgressBar value={cognition.imitation} label="模倣" />
        </div>
      </div>

      {/* Milestones */}
      {nearbyMilestones.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div className="small" style={{ fontWeight: 600, marginBottom: 8 }}>近傍のマイルストーン</div>
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            {nearbyMilestones.map(m => {
              const source = SOURCES[m.sourceRef];
              return (
                <li key={m.id} style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 500, fontSize: 12 }}>{m.title}</div>
                  <div className="small" style={{ color: "#666" }}>{m.summary}</div>
                  {source && (
                    <div style={{ marginTop: 2 }}>
                      <EvidenceBadge
                        evidenceLevel={source.evidenceLevel}
                        sourceUrl={source.url}
                        sourceTitle={source.title}
                        compact
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="small" style={{ marginTop: 12, padding: "8px", backgroundColor: "#f8f9fa", borderRadius: 6 }}>
        ※ 言語・認知の発達には大きな個人差があります。これらの値は集団の傾向を示すもので、個別の評価には適しません。
      </div>
    </div>
  );
}
