/**
 * Disclaimer Component
 *
 * Prominent disclaimer about simulation limitations.
 * Critical for ethical use - warns against diagnostic/assessment use.
 */

import React, { useState } from 'react';

export interface DisclaimerProps {
  /** Array of disclaimer text lines */
  disclaimerText?: string[];
  /** Whether to show as modal on first load */
  showAsModal?: boolean;
  /** Callback when disclaimer is acknowledged */
  onAcknowledge?: () => void;
}

const defaultDisclaimer = [
  'このアプリは教育・研究・展示用の「近似モデル」です。',
  '月ごとの値は補間（モデル仮定）およびproxy（代理指標）を含み、医学的事実として扱えません。',
  '個別の発達評価・診断には使用しないでください。',
  '発達には大きな個人差があります。',
];

export const Disclaimer: React.FC<DisclaimerProps> = ({
  disclaimerText = defaultDisclaimer,
  showAsModal = false,
  onAcknowledge,
}) => {
  const [isVisible, setIsVisible] = useState(showAsModal);

  const containerStyle: React.CSSProperties = {
    padding: '12px 16px',
    backgroundColor: '#fef3c7',
    border: '1px solid #f59e0b',
    borderRadius: '8px',
    margin: '8px 0',
  };

  const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const modalContentStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    maxWidth: '500px',
    margin: '16px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
    color: '#92400e',
    fontWeight: 600,
    fontSize: '14px',
  };

  const listStyle: React.CSSProperties = {
    margin: 0,
    paddingLeft: '20px',
    color: '#78350f',
    fontSize: '13px',
    lineHeight: 1.6,
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: '16px',
    padding: '10px 20px',
    backgroundColor: '#f59e0b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 600,
    cursor: 'pointer',
    width: '100%',
  };

  const handleAcknowledge = () => {
    setIsVisible(false);
    onAcknowledge?.();
  };

  const content = (
    <>
      <div style={headerStyle}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        ご利用上の注意
      </div>
      <ul style={listStyle}>
        {disclaimerText.map((text, index) => (
          <li key={index} style={{ marginBottom: '4px' }}>
            {text}
          </li>
        ))}
      </ul>
    </>
  );

  if (showAsModal && isVisible) {
    return (
      <div style={modalOverlayStyle}>
        <div style={modalContentStyle}>
          {content}
          <button style={buttonStyle} onClick={handleAcknowledge}>
            理解しました
          </button>
        </div>
      </div>
    );
  }

  return <div style={containerStyle}>{content}</div>;
};

export default Disclaimer;
