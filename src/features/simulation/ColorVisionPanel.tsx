/**
 * Color Vision Development Panel
 *
 * Displays detailed color vision development based on scientific research:
 * - Skelton (2022) PMC9314692
 * - AAO Vision Development
 *
 * Features:
 * - Text descriptions of development stages
 * - Progress bars for current values
 * - Development graphs over time
 * - Color perception preview
 */

import React, { useMemo } from 'react';
import {
  calculateColorVision,
  getColorVisionSummary,
  COLOR_VISION_SOURCES,
} from '../../lib/colorVision';
import { EvidenceBadge } from '../../components/Evidence';
import { DevelopmentChart } from '../../components/Charts';

type Props = {
  /** Current month (0-48) */
  month: number;
};

// Generate data series for charts (precomputed for 0-48 months)
function generateChartData() {
  const months = Array.from({ length: 49 }, (_, i) => i);
  const data = months.map((m) => calculateColorVision(m));

  return {
    cones: [
      {
        key: 'lCone',
        label: 'L錐体（赤）',
        color: '#ef4444',
        values: data.map((d) => d.lCone),
      },
      {
        key: 'mCone',
        label: 'M錐体（緑）',
        color: '#22c55e',
        values: data.map((d) => d.mCone),
      },
      {
        key: 'sCone',
        label: 'S錐体（青）',
        color: '#3b82f6',
        values: data.map((d) => d.sCone),
      },
    ],
    channels: [
      {
        key: 'redGreen',
        label: '赤-緑チャネル',
        color: '#f97316',
        values: data.map((d) => d.redGreenChannel),
      },
      {
        key: 'blueYellow',
        label: '青-黄チャネル',
        color: '#8b5cf6',
        values: data.map((d) => d.blueYellowChannel),
      },
    ],
    higherLevel: [
      {
        key: 'categorization',
        label: '色カテゴリ化',
        color: '#06b6d4',
        values: data.map((d) => d.colorCategorization),
      },
      {
        key: 'constancy',
        label: '色の恒常性',
        color: '#14b8a6',
        values: data.map((d) => d.colorConstancy),
      },
      {
        key: 'saturation',
        label: '彩度感度',
        color: '#ec4899',
        values: data.map((d) => d.saturationSensitivity),
      },
    ],
  };
}

// Precompute chart data
const chartData = generateChartData();

// Development timeline milestones for text display
const DEVELOPMENT_TIMELINE = [
  { month: 0, label: '誕生時', description: '錐体細胞未成熟。主に明暗のコントラストを知覚。高コントラストの赤のみ一部検出可能。' },
  { month: 1, label: '1ヶ月', description: 'L錐体（赤感受性）が発達開始。赤が最初に見える色となる。' },
  { month: 2, label: '2ヶ月', description: '二色型（dichromatic）色覚へ。赤-緑対向チャネルが機能開始。' },
  { month: 3, label: '3ヶ月', description: '三色型（trichromatic）へ移行。青-黄チャネルが発達（赤-緑より4-8週遅れ）。' },
  { month: 4, label: '4ヶ月', description: '両方の対向チャネルが機能。色のカテゴリ化開始。' },
  { month: 6, label: '6ヶ月', description: '5色カテゴリ（赤/黄/緑/青/紫）を識別。成人に近い色相知覚。' },
  { month: 12, label: '12ヶ月', description: '色による物体識別が可能。「赤いボール」と「青いボール」を別物として認識。' },
  { month: 24, label: '2歳', description: '色の恒常性が発達中。照明が変わっても同じ色として認識し始める。' },
  { month: 48, label: '4歳', description: '色の恒常性がほぼ成熟。ただし彩度感度は思春期まで発達継続。' },
];

export default function ColorVisionPanel({ month }: Props) {
  const colorVision = useMemo(() => calculateColorVision(month), [month]);
  const summary = useMemo(() => getColorVisionSummary(month), [month]);

  // Find current and next milestone
  const currentMilestone = useMemo(() => {
    for (let i = DEVELOPMENT_TIMELINE.length - 1; i >= 0; i--) {
      if (month >= DEVELOPMENT_TIMELINE[i].month) {
        return DEVELOPMENT_TIMELINE[i];
      }
    }
    return DEVELOPMENT_TIMELINE[0];
  }, [month]);

  const nextMilestone = useMemo(() => {
    for (const m of DEVELOPMENT_TIMELINE) {
      if (m.month > month) {
        return m;
      }
    }
    return null;
  }, [month]);

  // Progress bar component
  const ProgressBar = ({
    value,
    label,
    color,
    showPercent = true,
  }: {
    value: number;
    label: string;
    color: string;
    showPercent?: boolean;
  }) => (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <span style={{ fontSize: 10 }}>{label}</span>
        {showPercent && <span style={{ fontSize: 10 }}>{(value * 100).toFixed(0)}%</span>}
      </div>
      <div
        style={{
          height: 6,
          backgroundColor: '#e5e7eb',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${value * 100}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: 3,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );

  // Color swatch showing what infant can perceive
  const ColorSwatch = ({
    label,
    originalColor,
    infantColor,
  }: {
    label: string;
    originalColor: string;
    infantColor: string;
  }) => (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 9, marginBottom: 3 }}>{label}</div>
      <div style={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <div
          style={{
            width: 20,
            height: 20,
            backgroundColor: originalColor,
            borderRadius: 3,
            border: '1px solid #ccc',
          }}
          title="元の色"
        />
        <div
          style={{
            width: 20,
            height: 20,
            backgroundColor: infantColor,
            borderRadius: 3,
            border: '1px solid #ccc',
          }}
          title="乳児の知覚（推定）"
        />
      </div>
    </div>
  );

  // Calculate perceived colors based on color vision model
  const getPerceivedColor = (r: number, g: number, b: number): string => {
    const { lCone, mCone, sCone, redGreenChannel, blueYellowChannel, saturationSensitivity } =
      colorVision;

    const rn = r / 255;
    const gn = g / 255;
    const bn = b / 255;

    const lResponse = rn * lCone;
    const mResponse = gn * mCone;
    const sResponse = bn * sCone;

    const luminance = 0.299 * rn + 0.587 * gn + 0.114 * bn;

    let outR = luminance + (lResponse - luminance) * redGreenChannel;
    let outG = luminance + (mResponse - luminance) * redGreenChannel;
    let outB = luminance + (sResponse - luminance) * blueYellowChannel;

    const avgOut = (outR + outG + outB) / 3;
    outR = avgOut + (outR - avgOut) * saturationSensitivity;
    outG = avgOut + (outG - avgOut) * saturationSensitivity;
    outB = avgOut + (outB - avgOut) * saturationSensitivity;

    const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v * 255)));
    return `rgb(${clamp(outR)}, ${clamp(outG)}, ${clamp(outB)})`;
  };

  return (
    <div className="card">
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 12,
          alignItems: 'baseline',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 700 }}>色覚発達（詳細モデル）</div>
        <EvidenceBadge
          evidenceLevel={COLOR_VISION_SOURCES.pmc9314692.evidenceLevel}
          sourceUrl={COLOR_VISION_SOURCES.pmc9314692.url}
          sourceTitle={COLOR_VISION_SOURCES.pmc9314692.title}
          compact
        />
      </div>

      <div className="small" style={{ marginTop: 4, color: '#666' }}>
        {month.toFixed(1)}ヶ月 - {colorVision.stage}
      </div>

      {/* ===== TEXT SECTION: Development Stage Description ===== */}
      <div
        style={{
          marginTop: 16,
          padding: 12,
          backgroundColor: '#f8fafc',
          borderRadius: 8,
          borderLeft: '4px solid #3b82f6',
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
          現在の発達段階: {currentMilestone.label}
        </div>
        <div style={{ fontSize: 11, lineHeight: 1.5, color: '#374151' }}>
          {currentMilestone.description}
        </div>
        {nextMilestone && (
          <div style={{ fontSize: 10, marginTop: 8, color: '#6b7280' }}>
            <strong>次のマイルストーン:</strong> {nextMilestone.label} - {nextMilestone.description.slice(0, 50)}...
          </div>
        )}
      </div>

      {/* ===== TEXT SECTION: Current Summary ===== */}
      {summary.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4 }}>現在の状態</div>
          <ul
            style={{
              margin: 0,
              paddingLeft: 16,
              fontSize: 10,
              color: '#666',
              lineHeight: 1.6,
            }}
          >
            {summary.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ===== GRAPH SECTION: Cone Development ===== */}
      <DevelopmentChart
        series={chartData.cones}
        currentMonth={month}
        title="錐体細胞の発達曲線"
        height={140}
      />

      {/* ===== GRAPH SECTION: Opponent Channels ===== */}
      <DevelopmentChart
        series={chartData.channels}
        currentMonth={month}
        title="色対向チャネルの発達曲線"
        height={140}
      />

      {/* ===== GRAPH SECTION: Higher-level Processing ===== */}
      <DevelopmentChart
        series={chartData.higherLevel}
        currentMonth={month}
        title="高次色覚処理の発達曲線"
        height={140}
      />

      {/* ===== PROGRESS BARS: Current Values ===== */}
      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 8 }}>
          現在の数値（{month.toFixed(1)}ヶ月時点）
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          <ProgressBar value={colorVision.lCone} label="L錐体（赤）" color="#ef4444" />
          <ProgressBar value={colorVision.mCone} label="M錐体（緑）" color="#22c55e" />
          <ProgressBar value={colorVision.sCone} label="S錐体（青）" color="#3b82f6" />
          <ProgressBar value={colorVision.redGreenChannel} label="赤-緑チャネル" color="#f97316" />
          <ProgressBar value={colorVision.blueYellowChannel} label="青-黄チャネル" color="#8b5cf6" />
          <ProgressBar value={colorVision.saturationSensitivity} label="彩度感度" color="#ec4899" />
        </div>
      </div>

      {/* ===== COLOR SWATCHES: Perception Preview ===== */}
      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 8 }}>
          色の見え方（推定）
          <span style={{ fontWeight: 400, marginLeft: 8, fontSize: 9 }}>左:元 / 右:乳児知覚</span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 6,
          }}
        >
          <ColorSwatch
            label="赤"
            originalColor="rgb(255, 0, 0)"
            infantColor={getPerceivedColor(255, 0, 0)}
          />
          <ColorSwatch
            label="緑"
            originalColor="rgb(0, 255, 0)"
            infantColor={getPerceivedColor(0, 255, 0)}
          />
          <ColorSwatch
            label="青"
            originalColor="rgb(0, 0, 255)"
            infantColor={getPerceivedColor(0, 0, 255)}
          />
          <ColorSwatch
            label="黄"
            originalColor="rgb(255, 255, 0)"
            infantColor={getPerceivedColor(255, 255, 0)}
          />
          <ColorSwatch
            label="紫"
            originalColor="rgb(128, 0, 128)"
            infantColor={getPerceivedColor(128, 0, 128)}
          />
          <ColorSwatch
            label="橙"
            originalColor="rgb(255, 165, 0)"
            infantColor={getPerceivedColor(255, 165, 0)}
          />
        </div>
      </div>

      {/* ===== TEXT SECTION: Development Timeline ===== */}
      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 8 }}>発達タイムライン</div>
        <div style={{ fontSize: 9, lineHeight: 1.8 }}>
          {DEVELOPMENT_TIMELINE.map((m, i) => {
            const isPast = month >= m.month;
            const isCurrent = currentMilestone.month === m.month;
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 8,
                  padding: '4px 6px',
                  borderRadius: 4,
                  backgroundColor: isCurrent ? '#dbeafe' : isPast ? '#f0fdf4' : '#f9fafb',
                  marginBottom: 2,
                  opacity: isPast ? 1 : 0.6,
                }}
              >
                <div
                  style={{
                    minWidth: 48,
                    fontWeight: isCurrent ? 700 : 500,
                    color: isCurrent ? '#2563eb' : isPast ? '#16a34a' : '#888',
                  }}
                >
                  {m.label}
                </div>
                <div style={{ color: '#374151' }}>
                  {m.description.length > 60 && !isCurrent
                    ? m.description.slice(0, 60) + '...'
                    : m.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Evidence note */}
      <div
        className="small"
        style={{
          marginTop: 12,
          padding: '8px',
          backgroundColor: '#f0fdf4',
          borderRadius: 6,
          fontSize: 10,
        }}
      >
        <strong>根拠:</strong> {colorVision.evidenceRef}
      </div>

      <div
        className="small"
        style={{
          marginTop: 8,
          padding: '8px',
          backgroundColor: '#f8f9fa',
          borderRadius: 6,
        }}
      >
        ※ これは研究に基づく近似モデルです。実際の色覚は個人差が大きく、
        この表示は教育目的の推定値です。
      </div>
    </div>
  );
}
