import { useState } from 'react';

const SUPPORTED = [
  'Brockton', 'Boston / Hyde Park', 'Revere',
  'Somerville', 'Woburn', 'Milton', 'Shrewsbury',
];

export default function AddressInput({ onSubmit, loading }) {
  const [address, setAddress] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = address.trim();
    if (trimmed) onSubmit(trimmed);
  }

  return (
    <section style={{
      background: 'var(--green)',
      padding: '56px 24px 60px',
      textAlign: 'center',
    }}>
      <p style={{
        color: 'var(--terra)',
        fontSize: '0.72rem',
        fontWeight: 800,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        marginBottom: 12,
      }}>
        Massachusetts Property Analysis
      </p>
      <h1 style={{
        color: '#fff',
        fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
        fontWeight: 800,
        marginBottom: 10,
        lineHeight: 1.15,
      }}>
        Feasibility Study Generator
      </h1>
      <p style={{
        color: 'rgba(255,255,255,0.62)',
        fontSize: '1rem',
        marginBottom: 32,
      }}>
        Enter a Massachusetts property address — we'll pull zoning, parcel, and flood data automatically.
      </p>

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        gap: 0,
        maxWidth: 640,
        margin: '0 auto 20px',
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.22)',
      }}>
        <input
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="518 North Cary St, Brockton, MA 02302"
          disabled={loading}
          style={{
            flex: 1,
            padding: '16px 20px',
            fontSize: '0.97rem',
            border: 'none',
            background: '#fff',
            color: 'var(--text)',
            minWidth: 0,
          }}
        />
        <button
          type="submit"
          disabled={loading || !address.trim()}
          style={{
            background: loading ? 'var(--green-light)' : 'var(--terra)',
            color: '#fff',
            padding: '16px 26px',
            fontSize: '0.9rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
            transition: 'background 0.2s',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Generating…' : 'Generate Study'}
        </button>
      </form>

      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>
        Supported cities: {SUPPORTED.join(' · ')}
      </p>
    </section>
  );
}
