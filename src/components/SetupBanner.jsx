export default function SetupBanner() {
  return (
    <div style={{
      background: '#FFFBEB',
      border: '1px solid #FCD34D',
      borderRadius: 10,
      padding: '20px 24px',
      display: 'flex',
      gap: 16,
      alignItems: 'flex-start',
    }}>
      <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>🔑</span>
      <div>
        <p style={{ fontWeight: 800, color: '#92400E', fontSize: '0.95rem', marginBottom: 6 }}>
          One-time setup required
        </p>
        <p style={{ color: '#78350F', fontSize: '0.87rem', lineHeight: 1.6, marginBottom: 12 }}>
          This app uses <strong>Regrid</strong> to automatically fetch parcel data (owner, lot area, zoning, year built)
          for Massachusetts properties. Regrid is free for up to 50 lookups/day.
        </p>
        <ol style={{ color: '#78350F', fontSize: '0.85rem', lineHeight: 1.8, paddingLeft: 20, marginBottom: 12 }}>
          <li>Go to <strong>regrid.com</strong> → Sign up free → Dashboard → API Keys</li>
          <li>Copy your API token</li>
          <li>Open <code style={{ background: '#FEF3C7', padding: '1px 6px', borderRadius: 4 }}>.env</code> in the project folder</li>
          <li>
            Set <code style={{ background: '#FEF3C7', padding: '1px 6px', borderRadius: 4 }}>VITE_REGRID_TOKEN=your_token_here</code>
          </li>
          <li>Restart the dev server (<code style={{ background: '#FEF3C7', padding: '1px 6px', borderRadius: 4 }}>npm run dev</code>)</li>
        </ol>
        <p style={{ color: '#92400E', fontSize: '0.8rem' }}>
          Once configured, just enter an address — everything pulls automatically.
        </p>
      </div>
    </div>
  );
}
