export default function DimensionalStandards({ standards, zoningCode }) {
  if (!standards) {
    return (
      <div>
        <p className="section-title">2. Dimensional Standards</p>
        <div style={{
          background: 'var(--terra-light)',
          border: '1px solid var(--terra)',
          borderRadius: 8,
          padding: '16px 20px',
          color: 'var(--terra)',
          fontSize: '0.88rem',
          fontWeight: 600,
        }}>
          Dimensional standards for zone <strong>{zoningCode}</strong> are not yet in our database.
          Contact Altiva Design Studio to add this zoning district.
        </div>
      </div>
    );
  }

  const rows = [
    ['Minimum Lot Area', standards.minLotArea],
    ['Minimum Lot Frontage', standards.minLotFrontage],
    ['Front Setback', standards.frontSetback],
    ['Side Setback', standards.sideSetback],
    ['Rear Setback', standards.rearSetback],
    ['Maximum Building Coverage', standards.maxBuildingCoverage],
    ['Maximum Building Height', standards.maxBuildingHeight],
    ['Off-Street Parking', standards.parking],
  ];

  const accessory = standards.accessory;

  return (
    <div>
      <p className="section-title">2. Dimensional Standards ({zoningCode})</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label} style={{ borderBottom: '1px solid var(--gray-200)' }}>
              <td style={{ padding: '10px 0', color: 'var(--gray-600)', fontWeight: 600, width: '55%' }}>
                {label}
              </td>
              <td style={{ padding: '10px 0', color: 'var(--text)' }}>{value || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {accessory && (
        <div style={{ marginTop: 16 }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--gray-600)', marginBottom: 8 }}>
            ACCESSORY STRUCTURES
          </p>
          <div style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
          }}>
            {[
              ['Max Height', accessory.maxHeight],
              ['Side Setback', accessory.side],
              ['Rear Setback', accessory.rear],
            ].map(([label, val]) => (
              <div key={label} style={{
                background: 'var(--green-muted)',
                borderRadius: 6,
                padding: '8px 14px',
                fontSize: '0.82rem',
              }}>
                <span style={{ color: 'var(--gray-600)', fontWeight: 600 }}>{label}: </span>
                <span style={{ color: 'var(--green)', fontWeight: 700 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
