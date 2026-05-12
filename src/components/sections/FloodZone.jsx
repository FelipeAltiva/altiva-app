export default function FloodZone({ floodData }) {
  if (!floodData) return null;

  const isRisk = floodData.isHighRisk;

  return (
    <div>
      <p className="section-title">4. Flood Zone</p>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 14,
        background: isRisk ? '#FEF2F2' : 'var(--green-muted)',
        border: `1px solid ${isRisk ? '#FECACA' : '#B7DFC8'}`,
        borderRadius: 8,
        padding: '16px 18px',
      }}>
        <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{isRisk ? '⚠️' : '✅'}</span>
        <div>
          <p style={{
            fontWeight: 700,
            fontSize: '0.95rem',
            color: isRisk ? '#991B1B' : 'var(--green)',
            marginBottom: 4,
          }}>
            Zone {floodData.zone} — {isRisk ? 'Special Flood Hazard Area' : 'Low/Minimal Flood Risk'}
          </p>
          <p style={{ fontSize: '0.87rem', color: 'var(--gray-600)' }}>
            {floodData.description}
          </p>
          {isRisk && (
            <p style={{ fontSize: '0.83rem', color: '#991B1B', marginTop: 8, fontWeight: 600 }}>
              Flood insurance required for federally-backed mortgages. Verify with FEMA Flood Map Service Center.
            </p>
          )}
          {!isRisk && (
            <p style={{ fontSize: '0.83rem', color: 'var(--gray-600)', marginTop: 6 }}>
              No flood zone identified. Final verification recommended via FEMA Flood Map Service Center (msc.fema.gov).
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
