function ScoreBadge({ score }) {
  const styles = {
    High: { bg: '#DCFCE7', color: '#166534' },
    Moderate: { bg: '#FEF9C3', color: '#854D0E' },
    Low: { bg: '#FEE2E2', color: '#991B1B' },
  };
  const s = styles[score] || styles.Low;
  return (
    <span style={{
      background: s.bg,
      color: s.color,
      borderRadius: 100,
      padding: '2px 12px',
      fontSize: '0.78rem',
      fontWeight: 700,
      marginLeft: 10,
    }}>
      {score} Transit
    </span>
  );
}

export default function TransitParking({ transitInfo }) {
  if (!transitInfo) return null;
  return (
    <div>
      <p className="section-title">3. Transit Proximity &amp; Parking</p>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>{transitInfo.label}</span>
        <ScoreBadge score={transitInfo.score} />
      </div>
      <p style={{ color: 'var(--gray-600)', fontSize: '0.88rem', marginBottom: 12 }}>
        {transitInfo.description}
      </p>
      <div style={{
        background: 'var(--green-muted)',
        borderRadius: 8,
        padding: '12px 16px',
        fontSize: '0.87rem',
        color: 'var(--green)',
        fontWeight: 600,
      }}>
        Parking Requirement: {transitInfo.parking}
      </div>
    </div>
  );
}
