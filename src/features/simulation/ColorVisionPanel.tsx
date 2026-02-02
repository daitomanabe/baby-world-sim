/**
 * Color Vision Development Panel
 *
 * Displays detailed color vision development based on scientific research:
 * - Skelton (2022) PMC9314692
 * - AAO Vision Development
 */

import React, { useMemo } from 'react';
import {
  calculateColorVision,
  getColorVisionSummary,
  COLOR_VISION_SOURCES,
} from '../../lib/colorVision';
import { EvidenceBadge } from '../../components/Evidence';

type Props = {
  /** Current month (0-48) */
  month: number;
};

export default function ColorVisionPanel({ month }: Props) {
  const colorVision = useMemo(() => calculateColorVision(month), [month]);
  const summary = useMemo(() => getColorVisionSummary(month), [month]);

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
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <span style={{ fontSize: 11 }}>{label}</span>
        {showPercent && <span style={{ fontSize: 11 }}>{(value * 100).toFixed(0)}%</span>}
      </div>
      <div
        style={{
          height: 8,
          backgroundColor: '#e5e7eb',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${value * 100}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: 4,
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
      <div style={{ fontSize: 10, marginBottom: 4 }}>{label}</div>
      <div style={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <div
          style={{
            width: 24,
            height: 24,
            backgroundColor: originalColor,
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
          title="元の色"
        />
        <div
          style={{
            width: 24,
            height: 24,
            backgroundColor: infantColor,
            borderRadius: 4,
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

    // Normalize
    const rn = r / 255;
    const gn = g / 255;
    const bn = b / 255;

    // Cone responses
    const lResponse = rn * lCone;
    const mResponse = gn * mCone;
    const sResponse = bn * sCone;

    // Luminance
    const luminance = 0.299 * rn + 0.587 * gn + 0.114 * bn;

    // Apply opponent channel blending
    let outR = luminance + (lResponse - luminance) * redGreenChannel;
    let outG = luminance + (mResponse - luminance) * redGreenChannel;
    let outB = luminance + (sResponse - luminance) * blueYellowChannel;

    // Apply saturation
    const avgOut = (outR + outG + outB) / 3;
    outR = avgOut + (outR - avgOut) * saturationSensitivity;
    outG = avgOut + (outG - avgOut) * saturationSensitivity;
    outB = avgOut + (outB - avgOut) * saturationSensitivity;

    // Convert back
    const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v * 255)));
    return `rgb(${clamp(outR)}, ${clamp(outG)}, ${clamp(outB)})`;
  };

  return (
    <div className="card">
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

      {/* Cone Development */}
      <div style={{ marginTop: 16 }}>
        <div className="small" style={{ fontWeight: 600, marginBottom: 8 }}>
          錐体細胞の発達
        </div>
        <ProgressBar value={colorVision.lCone} label="L錐体（赤）" color="#ef4444" />
        <ProgressBar value={colorVision.mCone} label="M錐体（緑）" color="#22c55e" />
        <ProgressBar value={colorVision.sCone} label="S錐体（青）" color="#3b82f6" />
      </div>

      {/* Opponent Channels */}
      <div style={{ marginTop: 16 }}>
        <div className="small" style={{ fontWeight: 600, marginBottom: 8 }}>
          色対向チャネル
        </div>
        <ProgressBar
          value={colorVision.redGreenChannel}
          label="赤-緑チャネル"
          color="#f97316"
        />
        <ProgressBar
          value={colorVision.blueYellowChannel}
          label="青-黄チャネル"
          color="#8b5cf6"
        />
      </div>

      {/* Higher-level Processing */}
      <div style={{ marginTop: 16 }}>
        <div className="small" style={{ fontWeight: 600, marginBottom: 8 }}>
          高次処理
        </div>
        <ProgressBar
          value={colorVision.colorCategorization}
          label="色カテゴリ化（5色）"
          color="#06b6d4"
        />
        <ProgressBar
          value={colorVision.colorConstancy}
          label="色の恒常性"
          color="#14b8a6"
        />
        <ProgressBar
          value={colorVision.saturationSensitivity}
          label="彩度感度"
          color="#ec4899"
        />
      </div>

      {/* Color Perception Preview */}
      <div style={{ marginTop: 16 }}>
        <div className="small" style={{ fontWeight: 600, marginBottom: 8 }}>
          色の見え方（推定）
          <span style={{ fontWeight: 400, marginLeft: 8 }}>左:元 / 右:乳児知覚</span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 8,
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

      {/* Summary */}
      {summary.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <ul
            style={{
              margin: 0,
              paddingLeft: 16,
              fontSize: 11,
              color: '#666',
            }}
          >
            {summary.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

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
