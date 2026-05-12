export default function Header() {
  return (
    <header style={{
      background: 'var(--green)',
      padding: '0 32px',
      height: 76,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <img src="/LOGO%20ALTIVA.png" alt="Altiva Design Studio" style={{ height: 54, objectFit: 'contain' }} />
      <span style={{
        color: 'rgba(255,255,255,0.55)',
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}>
        Feasibility Study Tool
      </span>
    </header>
  );
}
