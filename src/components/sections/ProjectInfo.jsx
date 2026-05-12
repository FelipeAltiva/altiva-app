function Row({ label, value }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 16,
      padding: '10px 0',
      borderBottom: '1px solid var(--gray-200)',
      fontSize: '0.9rem',
    }}>
      <span style={{ color: 'var(--gray-600)', fontWeight: 600, minWidth: 160 }}>{label}</span>
      <span style={{ color: 'var(--text)', fontWeight: 400, textAlign: 'right' }}>{value || '—'}</span>
    </div>
  );
}

export default function ProjectInfo({ parcel, address, cityLabel }) {
  const existingUse = parcel.useCode
    ? `${useCodeLabel(parcel.useCode)} (Use Code ${parcel.useCode})`
    : 'Residential';

  return (
    <div>
      <p className="section-title">1. Project Information</p>
      <Row label="Address" value={address} />
      <Row label="Owner" value={parcel.owner} />
      <Row label="Existing Use" value={existingUse} />
      <Row label="Assessor Land Use" value={existingUse} />
      <Row label="Lot Area" value={`${parcel.lotAreaAcres} acres (~${parcel.lotAreaSqFt.toLocaleString()} sf)`} />
      <Row label="Year Built" value={parcel.yearBuilt} />
      <Row label="Zoning District" value={parcel.zoning} />
      <Row label="City / Municipality" value={cityLabel || parcel.city} />
    </div>
  );
}

function useCodeLabel(code) {
  const map = {
    '101': 'Single Family Residential',
    '102': 'Two-Family Residential',
    '103': 'Three-Family Residential',
    '104': 'Multi-Family (4–8 units)',
    '105': 'Multi-Family (9+ units)',
    '111': 'Apartment',
    '130': 'Residential – Developable Land',
    '300': 'Commercial',
    '400': 'Industrial',
    '900': 'Exempt',
  };
  return map[String(code)] || 'Residential';
}
