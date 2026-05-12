import { useState } from 'react';

const ASSESSOR_LINKS = {
  brockton: { label: 'Brockton Assessor', url: 'https://gis.vgsi.com/brocktonma/' },
  boston_hydePark: { label: 'Boston Assessing', url: 'https://www.cityofboston.gov/assessing/search/' },
  revere: { label: 'Revere Assessor', url: 'https://gis.vgsi.com/rma/' },
  somerville: { label: 'Somerville Assessor', url: 'https://gis.vgsi.com/somervillema/' },
  woburn: { label: 'Woburn Assessor', url: 'https://gis.vgsi.com/woburnma/' },
  milton: { label: 'Milton Assessor', url: 'https://gis.vgsi.com/miltonma/' },
  shrewsbury: { label: 'Shrewsbury Assessor', url: 'https://gis.vgsi.com/shrewsburyma/' },
};

export default function ManualParcelForm({ address, cityKey, onSubmit }) {
  const [form, setForm] = useState({
    owner: '',
    lotAreaSqFt: '',
    yearBuilt: '',
    zoning: '',
    useCode: '101',
  });

  const assessor = ASSESSOR_LINKS[cityKey];

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const sqFt = parseInt(form.lotAreaSqFt.replace(/,/g, ''), 10) || 0;
    onSubmit({
      owner: form.owner || 'Not available',
      siteAddress: address,
      city: '',
      state: 'MA',
      zip: '',
      useCode: form.useCode,
      yearBuilt: form.yearBuilt || 'Not available',
      buildingArea: 0,
      units: 1,
      zoning: form.zoning || 'Not available',
      lotAreaSqFt: sqFt,
      lotAreaAcres: (sqFt / 43560).toFixed(2),
    });
  }

  const isReady = form.lotAreaSqFt && form.zoning;

  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--gray-200)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        background: 'var(--terra-light)',
        borderBottom: '1px solid #E8C9A8',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <span style={{ fontSize: '1.3rem' }}>📋</span>
        <div>
          <p style={{ fontWeight: 800, color: 'var(--terra)', fontSize: '0.9rem' }}>
            Enter Parcel Data Manually
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--gray-600)', marginTop: 2 }}>
            The MassGIS API requires authentication. Enter the 4 fields below from the city assessor website — takes about 30 seconds.
          </p>
        </div>
      </div>

      {/* Assessor link */}
      {assessor && (
        <div style={{ padding: '12px 24px', background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)', fontSize: '0.83rem' }}>
          🔗 Look up this property on the{' '}
          <a
            href={assessor.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--green)', fontWeight: 700 }}
          >
            {assessor.label} →
          </a>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ padding: '20px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 20px' }}>
          <Field
            label="Owner Name"
            placeholder="John Smith"
            value={form.owner}
            onChange={v => set('owner', v)}
            hint="Optional"
          />
          <Field
            label="Zoning District *"
            placeholder="R-1C"
            value={form.zoning}
            onChange={v => set('zoning', v)}
            hint="e.g. R-1C, SR, 1F-6000"
            required
          />
          <Field
            label="Lot Area (sq ft) *"
            placeholder="15,246"
            value={form.lotAreaSqFt}
            onChange={v => set('lotAreaSqFt', v)}
            hint="From assessor card"
            required
          />
          <Field
            label="Year Built"
            placeholder="1964"
            value={form.yearBuilt}
            onChange={v => set('yearBuilt', v)}
            hint="Optional"
          />
        </div>

        <div style={{ marginTop: 20 }}>
          <button
            type="submit"
            disabled={!isReady}
            style={{
              background: isReady ? 'var(--green)' : 'var(--gray-200)',
              color: isReady ? '#fff' : 'var(--gray-400)',
              padding: '12px 28px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: '0.93rem',
              cursor: isReady ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s',
            }}
          >
            Generate Study →
          </button>
          <span style={{ marginLeft: 12, fontSize: '0.78rem', color: 'var(--gray-400)' }}>
            * Required fields
          </span>
        </div>
      </form>
    </div>
  );
}

function Field({ label, placeholder, value, onChange, hint, required }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--green)', letterSpacing: '0.05em', marginBottom: 5 }}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: '1.5px solid var(--gray-200)',
          borderRadius: 6,
          fontSize: '0.9rem',
          color: 'var(--text)',
          background: '#fff',
          transition: 'border-color 0.15s',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--green)'}
        onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
      />
      {hint && <p style={{ fontSize: '0.72rem', color: 'var(--gray-400)', marginTop: 3 }}>{hint}</p>}
    </div>
  );
}
