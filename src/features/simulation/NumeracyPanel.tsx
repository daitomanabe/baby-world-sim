import React, { useMemo } from "react";
import { getGrowthDataInterpolated } from "../../data";
import { EvidenceBadge } from "../../components/Evidence";

type Props = {
  /** Current week (0-208) */
  week: number;
};

// Helper to format month for display
function formatMonth(m: number): string {
  if (m < 1) return `${Math.round(m * 4.345)}週`;
  if (m < 12) return `${m.toFixed(1)}ヶ月`;
  const years = Math.floor(m / 12);
  const months = Math.round(m % 12);
  return months > 0 ? `${years}歳${months}ヶ月` : `${years}歳`;
}

// SVG Line Chart Component
function DevelopmentChart({ data, currentMonth, colors }: {
  data: { label: string; values: number[] }[];
  currentMonth: number;
  colors: string[];
}) {
  const width = 280;
  const height = 100;
  const padding = { top: 10, right: 10, bottom: 20, left: 30 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  return (
    <svg width={width} height={height} style={{ display: "block", margin: "8px auto" }}>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((v) => (
        <g key={v}>
          <line
            x1={padding.left}
            y1={padding.top + chartHeight * (1 - v)}
            x2={padding.left + chartWidth}
            y2={padding.top + chartHeight * (1 - v)}
            stroke="#e5e7eb"
            strokeWidth={1}
          />
          <text
            x={padding.left - 4}
            y={padding.top + chartHeight * (1 - v) + 3}
            fontSize={8}
            fill="#888"
            textAnchor="end"
          >
            {Math.round(v * 100)}
          </text>
        </g>
      ))}

      {/* X axis labels */}
      {[0, 12, 24, 36, 48].map((m) => (
        <text
          key={m}
          x={padding.left + (m / 48) * chartWidth}
          y={height - 4}
          fontSize={8}
          fill="#888"
          textAnchor="middle"
        >
          {m}m
        </text>
      ))}

      {/* Data lines */}
      {data.map((series, idx) => {
        const points = series.values.map((v, i) => {
          const x = padding.left + (i / 48) * chartWidth;
          const y = padding.top + chartHeight * (1 - v);
          return `${x},${y}`;
        }).join(" ");

        return (
          <polyline
            key={series.label}
            points={points}
            fill="none"
            stroke={colors[idx]}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}

      {/* Current position indicator */}
      <line
        x1={padding.left + (currentMonth / 48) * chartWidth}
        y1={padding.top}
        x2={padding.left + (currentMonth / 48) * chartWidth}
        y2={padding.top + chartHeight}
        stroke="#ef4444"
        strokeWidth={1.5}
        strokeDasharray="3,2"
      />
    </svg>
  );
}

export default function NumeracyPanel({ week }: Props) {
  // Convert week to month
  const month = useMemo(() => week / 4.345, [week]);

  // Get comprehensive growth data
  const growthData = useMemo(() => getGrowthDataInterpolated(month), [month]);
  const { numeracy } = growthData;
  const ageLabel = formatMonth(month);

  // Generate chart data for 0-48 months
  const chartData = useMemo(() => {
    const data = Array.from({ length: 49 }, (_, i) => getGrowthDataInterpolated(i).numeracy);
    return [
      { label: "数詞", values: data.map(d => d.numberWords) },
      { label: "数唱", values: data.map(d => d.counting) },
      { label: "量対応", values: data.map(d => d.quantityCorrespondence) },
      { label: "加算", values: data.map(d => d.simpleAddition) },
    ];
  }, []);

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

  // Stage descriptions
  const stageDescriptions: Record<string, string> = {
    "数のリズム/まね": "数詞を音として聞いている段階。歌や遊びのリズムで「いち、に、さん」を楽しむ",
    "数唱が出始める": "順番に数を言えるようになる。まだ数量との対応は弱い",
    "数唱→量の対応が育つ": "「3つ」と言われて3つ取れるようになる。1対1対応の芽生え",
    "数の比較/簡単な計数": "「どっちが多い？」がわかる。5くらいまで正確に数える",
    "簡単な加減の直感": "「1個足すと2個になる」などの直感的な加減算",
  };

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>数概念発達</div>
        <EvidenceBadge
          evidenceLevel="public_guideline"
          sourceUrl="https://www.healthychildren.org/English/ages-stages/preschool/Pages/Developmental-Milestones-4-to-5-Year-Olds.aspx"
          sourceTitle="HealthyChildren: 4-5歳発達"
          compact
        />
      </div>

      <div className="small" style={{ marginTop: 4, color: "#666" }}>
        {ageLabel} - {numeracy.stage}
      </div>

      {stageDescriptions[numeracy.stage] && (
        <div className="small" style={{ marginTop: 8, padding: "8px", backgroundColor: "#eff6ff", borderRadius: 6, color: "#1e40af" }}>
          {stageDescriptions[numeracy.stage]}
        </div>
      )}

      {/* Progress bars */}
      <div style={{ marginTop: 16 }}>
        <ProgressBar value={numeracy.numberWords} label="数詞の理解" color="#3b82f6" />
        <ProgressBar value={numeracy.counting} label="数唱（順番に数える）" color="#10b981" />
        <ProgressBar value={numeracy.quantityCorrespondence} label="量との対応" color="#f59e0b" />
        <ProgressBar value={numeracy.simpleAddition} label="簡単な加減算" color="#8b5cf6" />
      </div>

      {/* Development chart */}
      <div style={{ marginTop: 16 }}>
        <div className="small" style={{ fontWeight: 600, marginBottom: 4 }}>発達曲線</div>
        <DevelopmentChart
          data={chartData}
          currentMonth={month}
          colors={["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"]}
        />
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          {["数詞", "数唱", "量対応", "加算"].map((label, i) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 12, height: 3, backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"][i], borderRadius: 2 }} />
              <span style={{ fontSize: 9, color: "#666" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="small" style={{ marginTop: 12, padding: "8px", backgroundColor: "#f8f9fa", borderRadius: 6 }}>
        ※ 数概念の発達は環境や経験により大きく異なります。これらの値は研究に基づく平均的な傾向です。
      </div>
    </div>
  );
}
