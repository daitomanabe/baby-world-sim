/**
 * SVG-based Development Chart Component
 *
 * Displays developmental curves with current position indicator
 */

import React, { useMemo } from 'react';

type DataSeries = {
  key: string;
  label: string;
  color: string;
  values: number[]; // 0-1 values for each month (0-48)
};

type Props = {
  series: DataSeries[];
  currentMonth: number;
  title?: string;
  height?: number;
  showLegend?: boolean;
};

export default function DevelopmentChart({
  series,
  currentMonth,
  title,
  height = 150,
  showLegend = true,
}: Props) {
  const width = 320;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Generate path for each series
  const paths = useMemo(() => {
    return series.map((s) => {
      const points = s.values.map((v, i) => {
        const x = padding.left + (i / 48) * chartWidth;
        const y = padding.top + (1 - v) * chartHeight;
        return `${x},${y}`;
      });
      return {
        ...s,
        d: `M ${points.join(' L ')}`,
      };
    });
  }, [series, chartWidth, chartHeight]);

  // Current position X
  const currentX = padding.left + (Math.min(48, Math.max(0, currentMonth)) / 48) * chartWidth;

  // Y-axis ticks
  const yTicks = [0, 0.25, 0.5, 0.75, 1];

  // X-axis ticks (months)
  const xTicks = [0, 12, 24, 36, 48];

  return (
    <div style={{ marginTop: 12 }}>
      {title && (
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{title}</div>
      )}
      <svg width={width} height={height} style={{ display: 'block', maxWidth: '100%' }}>
        {/* Grid lines */}
        {yTicks.map((t) => {
          const y = padding.top + (1 - t) * chartHeight;
          return (
            <g key={`y-${t}`}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
              <text
                x={padding.left - 5}
                y={y + 4}
                textAnchor="end"
                fontSize={9}
                fill="#888"
              >
                {(t * 100).toFixed(0)}%
              </text>
            </g>
          );
        })}

        {/* X-axis labels */}
        {xTicks.map((m) => {
          const x = padding.left + (m / 48) * chartWidth;
          return (
            <text
              key={`x-${m}`}
              x={x}
              y={height - 8}
              textAnchor="middle"
              fontSize={9}
              fill="#888"
            >
              {m}M
            </text>
          );
        })}

        {/* Data lines */}
        {paths.map((p) => (
          <path
            key={p.key}
            d={p.d}
            fill="none"
            stroke={p.color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {/* Current position indicator */}
        <line
          x1={currentX}
          y1={padding.top}
          x2={currentX}
          y2={padding.top + chartHeight}
          stroke="#333"
          strokeWidth={2}
          strokeDasharray="4,2"
        />

        {/* Current value dots */}
        {series.map((s) => {
          const monthIndex = Math.min(48, Math.max(0, Math.floor(currentMonth)));
          const nextIndex = Math.min(48, monthIndex + 1);
          const t = currentMonth - monthIndex;
          const value = s.values[monthIndex] * (1 - t) + (s.values[nextIndex] || s.values[monthIndex]) * t;
          const y = padding.top + (1 - value) * chartHeight;
          return (
            <circle
              key={`dot-${s.key}`}
              cx={currentX}
              cy={y}
              r={5}
              fill={s.color}
              stroke="#fff"
              strokeWidth={2}
            />
          );
        })}
      </svg>

      {/* Legend */}
      {showLegend && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px 16px',
            marginTop: 8,
            fontSize: 10,
          }}
        >
          {series.map((s) => (
            <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div
                style={{
                  width: 12,
                  height: 3,
                  backgroundColor: s.color,
                  borderRadius: 2,
                }}
              />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
