import React from 'react';
import './StyleToggle.css';

const MODES = [
  { key: 'sketch', label: 'Sketch', icon: '✏️' },
  { key: 'mono', label: 'Mono', icon: '🖤' },
  { key: 'pastel', label: 'Pastel', icon: '🎨' },
];

/**
 * StyleToggle — three-state toggle for rendering modes.
 */
export default function StyleToggle({ value = 'sketch', onChange }) {
  return (
    <div className="style-toggle" id="style-toggle">
      <label className="toggle-label">Style</label>
      <div className="toggle-track">
        {MODES.map((mode) => (
          <button
            key={mode.key}
            className={`toggle-option ${value === mode.key ? 'active' : ''}`}
            onClick={() => onChange(mode.key)}
            id={`style-${mode.key}`}
            title={mode.label}
          >
            <span className="toggle-icon">{mode.icon}</span>
            <span className="toggle-text">{mode.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
