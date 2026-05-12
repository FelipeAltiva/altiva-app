export default function LoadingSpinner({ message = 'Fetching parcel data…' }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 16,
      padding: '64px 24px',
    }}>
      <div style={{
        width: 44,
        height: 44,
        border: '4px solid var(--green-muted)',
        borderTop: '4px solid var(--green)',
        borderRadius: '50%',
        animation: 'spin 0.9s linear infinite',
      }} />
      <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem', fontWeight: 600 }}>
        {message}
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
