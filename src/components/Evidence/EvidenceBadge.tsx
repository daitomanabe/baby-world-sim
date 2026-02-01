/**
 * Evidence Badge Component
 *
 * Displays evidence level and source information for data transparency.
 * Critical for ethical use - shows users the reliability of displayed information.
 */

import React from 'react';
import type { EvidenceLevel } from '../../types';

export interface EvidenceBadgeProps {
  /** Evidence level classification */
  evidenceLevel: EvidenceLevel;
  /** URL to the source document */
  sourceUrl?: string;
  /** Title of the source */
  sourceTitle?: string;
  /** Whether this data is interpolated/estimated */
  isInterpolated?: boolean;
  /** Compact mode for inline display */
  compact?: boolean;
}

/** Map evidence levels to display labels and colors */
const EVIDENCE_CONFIG: Record<EvidenceLevel, { label: string; color: string; bgColor: string }> = {
  public_guideline: {
    label: '公的ガイドライン',
    color: '#166534',
    bgColor: '#dcfce7',
  },
  hospital_handout: {
    label: '医療機関資料',
    color: '#1e40af',
    bgColor: '#dbeafe',
  },
  peer_reviewed: {
    label: '査読論文',
    color: '#7c2d12',
    bgColor: '#ffedd5',
  },
  book: {
    label: '書籍',
    color: '#6b21a8',
    bgColor: '#f3e8ff',
  },
  expert_article: {
    label: '専門家記事',
    color: '#475569',
    bgColor: '#f1f5f9',
  },
  placeholder: {
    label: 'モデル仮定',
    color: '#991b1b',
    bgColor: '#fee2e2',
  },
};

export const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({
  evidenceLevel,
  sourceUrl,
  sourceTitle,
  isInterpolated = false,
  compact = false,
}) => {
  const config = EVIDENCE_CONFIG[evidenceLevel] || EVIDENCE_CONFIG.placeholder;

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: compact ? '4px' : '6px',
    padding: compact ? '2px 6px' : '4px 8px',
    borderRadius: '4px',
    fontSize: compact ? '10px' : '12px',
    fontWeight: 500,
    backgroundColor: config.bgColor,
    color: config.color,
    border: `1px solid ${config.color}20`,
  };

  const interpolatedStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: compact ? '2px 6px' : '4px 8px',
    borderRadius: '4px',
    fontSize: compact ? '10px' : '12px',
    fontWeight: 500,
    backgroundColor: '#fef3c7',
    color: '#92400e',
    border: '1px solid #92400e20',
    marginLeft: '4px',
  };

  const linkStyle: React.CSSProperties = {
    color: 'inherit',
    textDecoration: 'none',
  };

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap' }}>
      {sourceUrl ? (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...badgeStyle, ...linkStyle }}
          title={sourceTitle || `出典: ${evidenceLevel}`}
        >
          <svg
            width={compact ? 10 : 12}
            height={compact ? 10 : 12}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15,3 21,3 21,9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          {config.label}
        </a>
      ) : (
        <span style={badgeStyle} title={sourceTitle || `根拠: ${evidenceLevel}`}>
          {config.label}
        </span>
      )}

      {isInterpolated && (
        <span style={interpolatedStyle} title="このデータは補間・推定値を含みます">
          <svg
            width={compact ? 10 : 12}
            height={compact ? 10 : 12}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          補間値
        </span>
      )}
    </span>
  );
};

export default EvidenceBadge;
