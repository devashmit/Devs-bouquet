import React, { useState } from 'react';
import './ReactionBar.css';

const REACTIONS = ['💛', '😍', '🥹', '✨', '🌸', '💐', '😭', '🫶'];

/**
 * ReactionBar — emoji selector for bouquet reactions.
 * No login required.
 */
export default function ReactionBar({ currentReaction, onReact }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(currentReaction);

  const handleReact = (emoji) => {
    setSelected(emoji);
    setIsOpen(false);
    onReact?.(emoji);
  };

  return (
    <div className="reaction-bar" id="reaction-bar">
      {selected ? (
        <div className="reaction-display">
          <span className="reaction-emoji">{selected}</span>
          <button 
            className="reaction-change"
            onClick={() => setIsOpen(!isOpen)}
          >
            change
          </button>
        </div>
      ) : (
        <button 
          className="btn btn-soft btn-sm reaction-trigger"
          onClick={() => setIsOpen(!isOpen)}
          id="react-button"
        >
          React to this bouquet ✨
        </button>
      )}

      {isOpen && (
        <div className="reaction-picker">
          {REACTIONS.map((emoji) => (
            <button
              key={emoji}
              className={`reaction-option ${selected === emoji ? 'selected' : ''}`}
              onClick={() => handleReact(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
