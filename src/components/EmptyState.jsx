/**
 * EmptyState — poetic empty state with contextual messages.
 */
export default function EmptyState({
  message = "You haven't drawn a moment yet.",
  actionLabel,
  onAction,
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
      {/* Botanical sketch illustration */}
      <svg width="90" height="110" viewBox="0 0 90 110" fill="none" style={{ opacity: 0.35 }}>
        {/* Flower head */}
        <circle cx="45" cy="22" r="10" stroke="var(--charcoal-faint)" strokeWidth="1.2" strokeDasharray="4 3"/>
        {[0,60,120,180,240,300].map((a, i) => {
          const rad = (a * Math.PI) / 180;
          return (
            <ellipse
              key={i}
              cx={45 + Math.cos(rad) * 14}
              cy={22 + Math.sin(rad) * 14}
              rx="5" ry="8"
              stroke="var(--charcoal-faint)"
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
              transform={`rotate(${a + 90} ${45 + Math.cos(rad) * 14} ${22 + Math.sin(rad) * 14})`}
            />
          );
        })}
        {/* Stem */}
        <path d="M45 36 C44 55 43 70 42 88" stroke="var(--charcoal-faint)" strokeWidth="1.2" strokeDasharray="4 3" fill="none" strokeLinecap="round"/>
        {/* Small leaves */}
        <ellipse cx="38" cy="58" rx="8" ry="5" stroke="var(--charcoal-faint)" strokeWidth="1" strokeDasharray="3 3" fill="none" transform="rotate(-30 38 58)"/>
        <ellipse cx="48" cy="72" rx="8" ry="5" stroke="var(--charcoal-faint)" strokeWidth="1" strokeDasharray="3 3" fill="none" transform="rotate(25 48 72)"/>
      </svg>

      <p className="tagline" style={{ maxWidth: '300px', fontSize: '0.95rem' }}>
        {message}
      </p>

      {actionLabel && onAction && (
        <button className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
