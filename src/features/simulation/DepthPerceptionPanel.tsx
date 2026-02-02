/**
 * Depth Perception Development Panel
 *
 * Visualizes the 2D → 3D transition in infant depth perception.
 * Features:
 * - Layered scene that "pops out" as 3D develops
 * - Progress indicators for different depth cues
 * - Visual representation of how depth is perceived
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  calculateDepthVision,
  getDepthVisionSummary,
  DEPTH_VISION_SOURCES,
} from '../../lib/depthVision';
import { EvidenceBadge } from '../../components/Evidence';
import { DevelopmentChart } from '../../components/Charts';

type Props = {
  /** Current month (0-48) */
  month: number;
};

// Generate chart data for depth perception development
function generateDepthChartData() {
  const months = Array.from({ length: 49 }, (_, i) => i);
  const data = months.map((m) => calculateDepthVision(m));

  return {
    mainCues: [
      {
        key: 'kinetic',
        label: '運動手がかり',
        color: '#f97316',
        values: data.map((d) => d.kineticCues),
      },
      {
        key: 'binocular',
        label: '両眼立体視',
        color: '#3b82f6',
        values: data.map((d) => d.binocularDisparity),
      },
      {
        key: 'stereoacuity',
        label: '立体視精度',
        color: '#8b5cf6',
        values: data.map((d) => d.stereoacuity),
      },
    ],
    pictorialCues: [
      {
        key: 'texture',
        label: 'テクスチャ勾配',
        color: '#22c55e',
        values: data.map((d) => d.textureGradient),
      },
      {
        key: 'perspective',
        label: '線形遠近法',
        color: '#06b6d4',
        values: data.map((d) => d.linearPerspective),
      },
      {
        key: 'occlusion',
        label: '遮蔽',
        color: '#ec4899',
        values: data.map((d) => d.occlusion),
      },
    ],
    overall: [
      {
        key: '3d',
        label: '3D知覚',
        color: '#ef4444',
        values: data.map((d) => d.threeDWeight),
      },
      {
        key: '2d',
        label: '2D知覚',
        color: '#6b7280',
        values: data.map((d) => d.twoDWeight),
      },
    ],
  };
}

const chartData = generateDepthChartData();

// Development milestones
const DEPTH_MILESTONES = [
  { month: 0, label: '誕生', description: '2D世界。運動による奥行きのみ（限定的）' },
  { month: 3.5, label: '3.5ヶ月', description: '立体視の突然の出現！3D世界への扉が開く' },
  { month: 5, label: '5ヶ月', description: '両眼立体視が急速に発達。サイズ恒常性出現' },
  { month: 6, label: '6ヶ月', description: '絵画的手がかり（テクスチャ、遠近法）が出現' },
  { month: 12, label: '12ヶ月', description: '奥行き知覚を行動（掴む、避ける）に活用' },
  { month: 24, label: '24ヶ月', description: '立体視精度が成人レベルに近づく' },
];

export default function DepthPerceptionPanel({ month }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const depthVision = useMemo(() => calculateDepthVision(month), [month]);
  const summary = useMemo(() => getDepthVisionSummary(month), [month]);
  const [showComparison, setShowComparison] = useState(true);

  // Find current milestone
  const currentMilestone = useMemo(() => {
    for (let i = DEPTH_MILESTONES.length - 1; i >= 0; i--) {
      if (month >= DEPTH_MILESTONES[i].month) {
        return DEPTH_MILESTONES[i];
      }
    }
    return DEPTH_MILESTONES[0];
  }, [month]);

  // Draw the depth perception visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const halfW = w / 2;

    // Clear
    ctx.clearRect(0, 0, w, h);

    // The 3D weight determines how much depth is perceived
    const depth3D = depthVision.threeDWeight;

    // Helper to draw one side of the comparison
    const drawScene = (offsetX: number, width: number, is3D: boolean) => {
      const centerX = offsetX + width / 2;
      const centerY = h / 2;
      const depthFactor = is3D ? depth3D : 0;

      // Background sky gradient
      const skyGrad = ctx.createLinearGradient(offsetX, 0, offsetX, h * 0.6);
      skyGrad.addColorStop(0, '#87CEEB');
      skyGrad.addColorStop(1, '#E0F4FF');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(offsetX, 0, width, h * 0.6);

      // Ground with texture gradient (shows depth if 3D)
      const groundY = h * 0.6;
      const groundGrad = ctx.createLinearGradient(offsetX, groundY, offsetX, h);
      groundGrad.addColorStop(0, '#8B7355');
      groundGrad.addColorStop(1, '#5D4E37');
      ctx.fillStyle = groundGrad;
      ctx.fillRect(offsetX, groundY, width, h - groundY);

      // Draw texture gradient lines on ground (shows perspective if 3D)
      if (is3D && depthVision.textureGradient > 0.1) {
        ctx.strokeStyle = `rgba(0,0,0,${0.2 * depthVision.textureGradient})`;
        ctx.lineWidth = 1;

        // Converging lines (linear perspective)
        const vanishY = groundY;
        const vanishX = centerX;
        for (let i = -5; i <= 5; i++) {
          ctx.beginPath();
          ctx.moveTo(vanishX, vanishY);
          ctx.lineTo(offsetX + (i + 5) * (width / 10), h);
          ctx.stroke();
        }

        // Horizontal lines getting closer together (texture gradient)
        for (let i = 0; i < 8; i++) {
          const y = groundY + (h - groundY) * (1 - Math.pow(0.7, i));
          ctx.beginPath();
          ctx.moveTo(offsetX, y);
          ctx.lineTo(offsetX + width, y);
          ctx.stroke();
        }
      }

      // === Layer 1: Mountains (far) ===
      const mountainScale = 1 - (is3D ? 0.2 * depthFactor : 0);
      const mountainY = groundY - 30 * mountainScale;

      ctx.fillStyle = is3D ? `rgba(100,120,150,${0.5 + 0.5 * (1 - depthFactor)})` : '#9ca3af';
      ctx.beginPath();
      ctx.moveTo(offsetX, groundY);
      ctx.lineTo(offsetX + width * 0.2, mountainY - 40 * mountainScale);
      ctx.lineTo(offsetX + width * 0.35, groundY - 20);
      ctx.lineTo(offsetX + width * 0.5, mountainY - 60 * mountainScale);
      ctx.lineTo(offsetX + width * 0.65, groundY - 30);
      ctx.lineTo(offsetX + width * 0.8, mountainY - 35 * mountainScale);
      ctx.lineTo(offsetX + width, groundY);
      ctx.closePath();
      ctx.fill();

      // === Layer 2: Trees (middle distance) ===
      const treeBaseY = groundY + 10;
      const treeScale = is3D ? 1 + 0.15 * depthFactor : 1;

      // Tree positions - in 3D they appear at different depths
      const trees = [
        { x: 0.15, size: 0.8 },
        { x: 0.75, size: 0.9 },
        { x: 0.55, size: 0.7 },
      ];

      trees.forEach((tree) => {
        const treeX = offsetX + width * tree.x;
        const size = 25 * tree.size * treeScale;
        const treeY = treeBaseY - (is3D ? 20 * depthFactor * tree.size : 0);

        // Tree shadow (shows occlusion understanding)
        if (is3D && depthVision.occlusion > 0.3) {
          ctx.fillStyle = `rgba(0,0,0,${0.2 * depthVision.occlusion})`;
          ctx.beginPath();
          ctx.ellipse(treeX + 5, treeY + size * 0.8, size * 0.6, size * 0.15, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        // Tree trunk
        ctx.fillStyle = '#4a3728';
        ctx.fillRect(treeX - 4 * treeScale, treeY, 8 * treeScale, size * 0.8);

        // Tree foliage
        ctx.fillStyle = is3D ? '#228B22' : '#4a7c4a';
        ctx.beginPath();
        ctx.arc(treeX, treeY - size * 0.3, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(treeX - size * 0.25, treeY, size * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(treeX + size * 0.25, treeY, size * 0.4, 0, Math.PI * 2);
        ctx.fill();
      });

      // === Layer 3: House (near) ===
      const houseScale = is3D ? 1 + 0.3 * depthFactor : 1;
      const houseX = offsetX + width * 0.35;
      const houseY = groundY - (is3D ? 30 * depthFactor : 0);
      const houseW = 50 * houseScale;
      const houseH = 35 * houseScale;

      // House shadow
      if (is3D && depthVision.occlusion > 0.3) {
        ctx.fillStyle = `rgba(0,0,0,${0.15 * depthVision.occlusion})`;
        ctx.beginPath();
        ctx.ellipse(houseX + houseW / 2 + 10, houseY + houseH, houseW * 0.6, houseH * 0.15, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // House body
      ctx.fillStyle = is3D ? '#D2691E' : '#a08060';
      ctx.fillRect(houseX, houseY, houseW, houseH);

      // House roof
      ctx.fillStyle = is3D ? '#8B0000' : '#704040';
      ctx.beginPath();
      ctx.moveTo(houseX - 5, houseY);
      ctx.lineTo(houseX + houseW / 2, houseY - 25 * houseScale);
      ctx.lineTo(houseX + houseW + 5, houseY);
      ctx.closePath();
      ctx.fill();

      // Door
      ctx.fillStyle = '#4a3728';
      ctx.fillRect(houseX + houseW * 0.35, houseY + houseH * 0.4, houseW * 0.2, houseH * 0.6);

      // Window
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(houseX + houseW * 0.65, houseY + houseH * 0.25, houseW * 0.2, houseH * 0.3);

      // === Layer 4: Ball (closest) ===
      const ballScale = is3D ? 1 + 0.5 * depthFactor : 1;
      const ballX = offsetX + width * 0.8;
      const ballY = groundY + 20 - (is3D ? 40 * depthFactor : 0);
      const ballR = 18 * ballScale;

      // Ball shadow
      if (is3D && depthVision.occlusion > 0.2) {
        ctx.fillStyle = `rgba(0,0,0,${0.3 * depthVision.occlusion})`;
        ctx.beginPath();
        ctx.ellipse(ballX + 3, groundY + 25, ballR * 0.8, ballR * 0.2, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Ball with 3D shading
      const ballGrad = ctx.createRadialGradient(
        ballX - ballR * 0.3, ballY - ballR * 0.3, 0,
        ballX, ballY, ballR
      );
      if (is3D) {
        ballGrad.addColorStop(0, '#FF6B6B');
        ballGrad.addColorStop(0.7, '#EF4444');
        ballGrad.addColorStop(1, '#B91C1C');
      } else {
        ballGrad.addColorStop(0, '#c88080');
        ballGrad.addColorStop(1, '#a06060');
      }
      ctx.fillStyle = ballGrad;
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballR, 0, Math.PI * 2);
      ctx.fill();

      // Ball highlight
      if (is3D) {
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath();
        ctx.arc(ballX - ballR * 0.3, ballY - ballR * 0.3, ballR * 0.25, 0, Math.PI * 2);
        ctx.fill();
      }

      // Label
      ctx.fillStyle = '#333';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(is3D ? '乳児の知覚' : '2D（参照）', offsetX + width / 2, 18);

      // Depth indicator
      if (is3D) {
        ctx.fillStyle = '#666';
        ctx.font = '10px sans-serif';
        ctx.fillText(`3D: ${(depth3D * 100).toFixed(0)}%`, offsetX + width / 2, h - 8);
      }
    };

    if (showComparison) {
      // Draw dividing line
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(halfW, 0);
      ctx.lineTo(halfW, h);
      ctx.stroke();

      // Draw both scenes
      drawScene(0, halfW - 1, false);  // 2D reference
      drawScene(halfW + 1, halfW - 1, true);  // Infant perception
    } else {
      // Just draw infant perception
      drawScene(0, w, true);
    }

  }, [month, depthVision, showComparison]);

  // Progress bar component
  const ProgressBar = ({
    value,
    label,
    color,
  }: {
    value: number;
    label: string;
    color: string;
  }) => (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <span style={{ fontSize: 10 }}>{label}</span>
        <span style={{ fontSize: 10 }}>{(value * 100).toFixed(0)}%</span>
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
        <div style={{ fontSize: 14, fontWeight: 700 }}>奥行き知覚（2D→3D発達）</div>
        <EvidenceBadge
          evidenceLevel={DEPTH_VISION_SOURCES.science1980.evidenceLevel}
          sourceUrl={DEPTH_VISION_SOURCES.science1980.url}
          sourceTitle={DEPTH_VISION_SOURCES.science1980.title}
          compact
        />
      </div>

      <div className="small" style={{ marginTop: 4, color: '#666' }}>
        {month.toFixed(1)}ヶ月 - {depthVision.stage}
      </div>

      {/* 2D/3D transition indicator */}
      <div
        style={{
          marginTop: 12,
          padding: 12,
          borderRadius: 8,
          background: `linear-gradient(90deg, #6b7280 ${depthVision.twoDWeight * 100}%, #3b82f6 ${depthVision.twoDWeight * 100}%)`,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: 12, fontWeight: 600 }}>
          <span>2D世界 {(depthVision.twoDWeight * 100).toFixed(0)}%</span>
          <span>3D世界 {(depthVision.threeDWeight * 100).toFixed(0)}%</span>
        </div>
      </div>

      {/* Visual comparison canvas */}
      <div style={{ marginTop: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600 }}>奥行き知覚シミュレーション</span>
          <label style={{ fontSize: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
            <input
              type="checkbox"
              checked={showComparison}
              onChange={(e) => setShowComparison(e.target.checked)}
            />
            比較表示
          </label>
        </div>
        <canvas
          ref={canvasRef}
          width={640}
          height={280}
          style={{ width: '100%', borderRadius: 8, border: '1px solid #e5e7eb' }}
        />
      </div>

      {/* Stage description */}
      <div
        style={{
          marginTop: 12,
          padding: 10,
          backgroundColor: depthVision.threeDWeight > 0.5 ? '#dbeafe' : '#f3f4f6',
          borderRadius: 6,
          borderLeft: `4px solid ${depthVision.threeDWeight > 0.5 ? '#3b82f6' : '#9ca3af'}`,
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4 }}>
          {currentMilestone.label}: {currentMilestone.description}
        </div>
        {summary.length > 0 && (
          <ul style={{ margin: 0, paddingLeft: 16, fontSize: 10, color: '#666' }}>
            {summary.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Development curves */}
      <DevelopmentChart
        series={chartData.overall}
        currentMonth={month}
        title="2D/3D知覚の推移"
        height={120}
      />

      <DevelopmentChart
        series={chartData.mainCues}
        currentMonth={month}
        title="主要な奥行き手がかり"
        height={130}
      />

      <DevelopmentChart
        series={chartData.pictorialCues}
        currentMonth={month}
        title="絵画的奥行き手がかり"
        height={130}
      />

      {/* Current values */}
      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 8 }}>
          現在の数値（{month.toFixed(1)}ヶ月時点）
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          <ProgressBar value={depthVision.kineticCues} label="運動手がかり" color="#f97316" />
          <ProgressBar value={depthVision.binocularDisparity} label="両眼立体視" color="#3b82f6" />
          <ProgressBar value={depthVision.textureGradient} label="テクスチャ勾配" color="#22c55e" />
          <ProgressBar value={depthVision.linearPerspective} label="線形遠近法" color="#06b6d4" />
          <ProgressBar value={depthVision.occlusion} label="遮蔽理解" color="#ec4899" />
          <ProgressBar value={depthVision.stereoacuity} label="立体視精度" color="#8b5cf6" />
        </div>
      </div>

      {/* Evidence */}
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
        <strong>根拠:</strong> {depthVision.evidenceRef}
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
        ※ 奥行き知覚の発達は個人差が大きく、これは研究に基づく近似モデルです。
      </div>
    </div>
  );
}
