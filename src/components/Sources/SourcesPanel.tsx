/**
 * Sources Panel
 *
 * Consolidated list of all research sources used in the simulator.
 * Organized by domain with evidence level indicators.
 */

import React, { useState } from 'react';
import { SOURCES } from '../../data';
import { COLOR_VISION_SOURCES } from '../../lib/colorVision';
import { DEPTH_VISION_SOURCES } from '../../lib/depthVision';
import type { EvidenceLevel } from '../../types';

// Evidence level styling (matching EvidenceLevel type)
const EVIDENCE_STYLES: Record<EvidenceLevel, { label: string; color: string; bg: string }> = {
  peer_reviewed: { label: '査読論文', color: '#166534', bg: '#dcfce7' },
  public_guideline: { label: '公的ガイドライン', color: '#1e40af', bg: '#dbeafe' },
  expert_article: { label: '専門家記事', color: '#6b21a8', bg: '#f3e8ff' },
  hospital_handout: { label: '医療機関資料', color: '#0f766e', bg: '#ccfbf1' },
  book: { label: '書籍', color: '#92400e', bg: '#fef3c7' },
  placeholder: { label: '仮値', color: '#6b7280', bg: '#f3f4f6' },
};

// Organize all sources by category
interface SourceItem {
  key: string;
  title: string;
  url: string;
  evidenceLevel: EvidenceLevel;
  category: string;
}

function getAllSources(): SourceItem[] {
  const sources: SourceItem[] = [];

  // From v0.3 model SOURCES
  Object.entries(SOURCES).forEach(([key, src]) => {
    sources.push({
      key,
      title: src.title,
      url: src.url,
      evidenceLevel: src.evidenceLevel,
      category: 'モデルデータ',
    });
  });

  // From color vision
  Object.entries(COLOR_VISION_SOURCES).forEach(([key, src]) => {
    // Avoid duplicates
    if (!sources.find((s) => s.url === src.url)) {
      sources.push({
        key: `color_${key}`,
        title: src.title,
        url: src.url,
        evidenceLevel: src.evidenceLevel,
        category: '色覚発達',
      });
    }
  });

  // From depth vision
  Object.entries(DEPTH_VISION_SOURCES).forEach(([key, src]) => {
    // Avoid duplicates
    if (!sources.find((s) => s.url === src.url)) {
      sources.push({
        key: `depth_${key}`,
        title: src.title,
        url: src.url,
        evidenceLevel: src.evidenceLevel,
        category: '奥行き知覚',
      });
    }
  });

  return sources;
}

// Group sources by category
function groupByCategory(sources: SourceItem[]): Record<string, SourceItem[]> {
  return sources.reduce(
    (acc, src) => {
      if (!acc[src.category]) {
        acc[src.category] = [];
      }
      acc[src.category].push(src);
      return acc;
    },
    {} as Record<string, SourceItem[]>
  );
}

// Group sources by evidence level
function groupByEvidenceLevel(sources: SourceItem[]): Record<EvidenceLevel, SourceItem[]> {
  return sources.reduce(
    (acc, src) => {
      if (!acc[src.evidenceLevel]) {
        acc[src.evidenceLevel] = [];
      }
      acc[src.evidenceLevel].push(src);
      return acc;
    },
    {} as Record<EvidenceLevel, SourceItem[]>
  );
}

type Props = {
  /** Show expanded by default */
  defaultExpanded?: boolean;
};

export default function SourcesPanel({ defaultExpanded = false }: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [groupBy, setGroupBy] = useState<'category' | 'evidence'>('evidence');

  const allSources = getAllSources();
  const groupedByCategory = groupByCategory(allSources);
  const groupedByEvidence = groupByEvidenceLevel(allSources);

  // Count by evidence level
  const evidenceCounts = Object.entries(groupedByEvidence).map(([level, items]) => ({
    level: level as EvidenceLevel,
    count: items.length,
    ...EVIDENCE_STYLES[level as EvidenceLevel],
  }));

  return (
    <div className="card">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <div style={{ fontSize: 14, fontWeight: 700 }}>
          出典一覧 ({allSources.length}件)
        </div>
        <span style={{ fontSize: 12, color: '#666' }}>
          {expanded ? '▼' : '▶'}
        </span>
      </div>

      {/* Evidence level summary (always visible) */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          marginTop: 8,
        }}
      >
        {evidenceCounts
          .sort((a, b) => b.count - a.count)
          .map((item) => (
            <span
              key={item.level}
              style={{
                fontSize: 9,
                padding: '2px 6px',
                borderRadius: 4,
                backgroundColor: item.bg,
                color: item.color,
              }}
            >
              {item.label}: {item.count}
            </span>
          ))}
      </div>

      {expanded && (
        <>
          {/* Group by selector */}
          <div style={{ marginTop: 12, marginBottom: 8 }}>
            <label style={{ fontSize: 10, marginRight: 8 }}>グループ化:</label>
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value as 'category' | 'evidence')}
              style={{ fontSize: 10, padding: '2px 4px' }}
            >
              <option value="evidence">エビデンスレベル別</option>
              <option value="category">カテゴリ別</option>
            </select>
          </div>

          {/* Sources list */}
          {groupBy === 'evidence' ? (
            // Group by evidence level
            Object.entries(groupedByEvidence)
              .sort(([a], [b]) => {
                const order = ['peer_reviewed', 'metaanalysis', 'public_guideline', 'expert_consensus', 'expert_article', 'interpolated'];
                return order.indexOf(a) - order.indexOf(b);
              })
              .map(([level, items]) => (
                <div key={level} style={{ marginTop: 12 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: '4px 8px',
                      borderRadius: 4,
                      backgroundColor: EVIDENCE_STYLES[level as EvidenceLevel]?.bg || '#f3f4f6',
                      color: EVIDENCE_STYLES[level as EvidenceLevel]?.color || '#333',
                      marginBottom: 6,
                    }}
                  >
                    {EVIDENCE_STYLES[level as EvidenceLevel]?.label || level} ({items.length})
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 16 }}>
                    {items.map((src) => (
                      <li key={src.key} style={{ fontSize: 10, marginBottom: 4, lineHeight: 1.4 }}>
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#2563eb', textDecoration: 'none' }}
                        >
                          {src.title}
                        </a>
                        <span style={{ color: '#888', marginLeft: 4 }}>
                          [{src.category}]
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
          ) : (
            // Group by category
            Object.entries(groupedByCategory).map(([category, items]) => (
              <div key={category} style={{ marginTop: 12 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '4px 8px',
                    borderRadius: 4,
                    backgroundColor: '#f3f4f6',
                    marginBottom: 6,
                  }}
                >
                  {category} ({items.length})
                </div>
                <ul style={{ margin: 0, paddingLeft: 16 }}>
                  {items.map((src) => (
                    <li key={src.key} style={{ fontSize: 10, marginBottom: 4, lineHeight: 1.4 }}>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#2563eb', textDecoration: 'none' }}
                      >
                        {src.title}
                      </a>
                      <span
                        style={{
                          fontSize: 8,
                          marginLeft: 6,
                          padding: '1px 4px',
                          borderRadius: 3,
                          backgroundColor: EVIDENCE_STYLES[src.evidenceLevel]?.bg || '#f3f4f6',
                          color: EVIDENCE_STYLES[src.evidenceLevel]?.color || '#333',
                        }}
                      >
                        {EVIDENCE_STYLES[src.evidenceLevel]?.label || src.evidenceLevel}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}

          {/* Disclaimer */}
          <div
            style={{
              marginTop: 16,
              padding: 8,
              backgroundColor: '#f8f9fa',
              borderRadius: 6,
              fontSize: 9,
              color: '#666',
            }}
          >
            <strong>エビデンスレベルについて:</strong>
            <ul style={{ margin: '4px 0 0', paddingLeft: 16 }}>
              <li><strong>査読論文:</strong> 学術誌で査読を受けた研究</li>
              <li><strong>公的ガイドライン:</strong> 医療機関・学会の公式ガイドライン</li>
              <li><strong>医療機関資料:</strong> 病院等の配布資料</li>
              <li><strong>専門家記事:</strong> 専門家による解説記事</li>
              <li><strong>書籍:</strong> 専門書・教科書</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
