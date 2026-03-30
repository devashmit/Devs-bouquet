import React from 'react';

/**
 * EmptyState — poetic empty state with contextual messages.
 */
export default function EmptyState({ 
  message = "You haven't drawn a moment yet.",
  actionLabel,
  onAction 
}) {
  return (
    <div className="empty-state" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-4xl) var(--space-xl)',
      textAlign: 'center',
      gap: 'var(--space-lg)',
    }}>
      <svg width="80" height="80" viewBox="0 0 80 80" style={{ opacity: 0.4 }}>
        <path
          d="M40 15 C25 5, 10 20, 20 35 C25 42, 35 48, 40 55 C45 48, 55 42, 60 35 C70 20, 55 5, 40 15 Z"
          fill="none"
          stroke="var(--charcoal-faint)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <line x1="40" y1="55" x2="40" y2="75" stroke="var(--charcoal-faint)" strokeWidth="1.5" strokeDasharray="4 3" />
      </svg>
      <p className="tagline" style={{ maxWidth: '300px' }}>{message}</p>
      {actionLabel && onAction && (
        <button className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
