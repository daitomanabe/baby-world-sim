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

export default function LiteracyPanel({ week }: Props) {
  // Convert week to month
  const month = useMemo(() => week / 4.345, [week]);

  // Get comprehensive growth data
  const growthData = useMemo(() => getGrowthDataInterpolated(month), [month]);
  const { literacy } = growthData;
  const ageLabel = formatMonth(month);

  // Generate chart data for 0-48 months
  const chartData = useMemo(() => {
    const data = Array.from({ length: 49 }, (_, i) => getGrowthDataInterpolated(i).literacy);
    return [
      { label: "本への興味", values: data.map(d => d.bookInterest) },
      { label: "印刷概念", values: data.map(d => d.printConcept) },
      { label: "文字知識", values: data.map(d => d.letterKnowledge) },
      { label: "音韻意識", values: data.map(d => d.phonologicalAwareness) },
      { label: "名前書き", values: data.map(d => d.nameWriting) },
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
    "本=モノ（探索）": "本を物として探索。触る、舐める、めくる動作が中心",
    "絵本のやりとり（指差し）": "絵を指差し、大人と一緒に絵本を楽しむ。読み聞かせの基盤",
    "環境の文字に気づく": "看板やロゴなど、環境中の文字に気づき始める",
    "文字っぽい記号/なぞり": "文字のような形を描く。なぞり書きを楽しむ",
    "文字を\"書く/読む\"の芽": "自分の名前の文字を認識・書き始める。音と文字の対応",
  };

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>リテラシー発達</div>
        <EvidenceBadge
          evidenceLevel="public_guideline"
          sourceUrl="https://www.healthychildren.org/English/ages-stages/baby/Pages/Developmental-Milestones-of-Early-Literacy.aspx"
          sourceTitle="HealthyChildren: Early Literacy"
          compact
        />
      </div>

      <div className="small" style={{ marginTop: 4, color: "#666" }}>
        {ageLabel} - {literacy.stage}
      </div>

      {stageDescriptions[literacy.stage] && (
        <div className="small" style={{ marginTop: 8, padding: "8px", backgroundColor: "#fdf4ff", borderRadius: 6, color: "#86198f" }}>
          {stageDescriptions[literacy.stage]}
        </div>
      )}

      {/* Progress bars */}
      <div style={{ marginTop: 16 }}>
        <ProgressBar value={literacy.bookInterest} label="本への興味" color="#ec4899" />
        <ProgressBar value={literacy.printConcept} label="印刷物の概念" color="#8b5cf6" />
        <ProgressBar value={literacy.letterKnowledge} label="文字の知識" color="#3b82f6" />
        <ProgressBar value={literacy.phonologicalAwareness} label="音韻意識" color="#10b981" />
        <ProgressBar value={literacy.nameWriting} label="名前書き" color="#f59e0b" />
      </div>

      {/* Development chart */}
      <div style={{ marginTop: 16 }}>
        <div className="small" style={{ fontWeight: 600, marginBottom: 4 }}>発達曲線</div>
        <DevelopmentChart
          data={chartData}
          currentMonth={month}
          colors={["#ec4899", "#8b5cf6", "#3b82f6", "#10b981", "#f59e0b"]}
        />
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          {["本", "印刷", "文字", "音韻", "書き"].map((label, i) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <div style={{ width: 10, height: 3, backgroundColor: ["#ec4899", "#8b5cf6", "#3b82f6", "#10b981", "#f59e0b"][i], borderRadius: 2 }} />
              <span style={{ fontSize: 8, color: "#666" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="small" style={{ marginTop: 12, padding: "8px", backgroundColor: "#f8f9fa", borderRadius: 6 }}>
        ※ リテラシーの発達は読み聞かせ経験や言語環境により大きく異なります。これらは平均的な傾向です。
      </div>
    </div>
  );
}
