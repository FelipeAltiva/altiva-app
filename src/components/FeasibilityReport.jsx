import ProjectInfo from './sections/ProjectInfo.jsx';
import DimensionalStandards from './sections/DimensionalStandards.jsx';
import TransitParking from './sections/TransitParking.jsx';
import FloodZone from './sections/FloodZone.jsx';
import FeasibilitySummary from './sections/FeasibilitySummary.jsx';
import MapView from './MapView.jsx';

export default function FeasibilityReport({ data, reportRef }) {
  const { address, geo, parcel, standards, transitInfo, floodData, cityLabel } = data;

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div ref={reportRef} style={{
      background: '#fff',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      overflow: 'hidden',
      maxWidth: 800,
      margin: '0 auto',
    }}>
      {/* Report Header */}
      <div style={{
        background: 'var(--green)',
        padding: '28px 36px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: 16,
        flexWrap: 'wrap',
      }}>
        <div>
          <p style={{
            color: 'var(--terra)',
            fontSize: '0.68rem',
            fontWeight: 800,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}>
            Feasibility Study
          </p>
          <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '1.25rem', lineHeight: 1.3 }}>
            {address}
          </h2>
        </div>
        <div style={{ textAlign: 'right' }}>
          <img src="/LOGO%20ALTIVA.png" alt="Altiva Design Studio" style={{ height: 34, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', marginTop: 6 }}>
            Generated {today}
          </p>
        </div>
      </div>

      {/* Property Map */}
      {geo && <MapView lat={geo.lat} lng={geo.lng} address={address} />}

      {/* Report Body */}
      <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: 0 }}>
        <ProjectInfo parcel={parcel} address={address} cityLabel={cityLabel} />
        <div className="divider" />
        <DimensionalStandards standards={standards} zoningCode={parcel.zoning} />
        <div className="divider" />
        <TransitParking transitInfo={transitInfo} />
        <div className="divider" />
        <FloodZone floodData={floodData} />
        <div style={{ marginTop: 28 }}>
          <FeasibilitySummary parcel={parcel} standards={standards} />
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: 'var(--gray-100)',
        borderTop: '1px solid var(--gray-200)',
        padding: '14px 36px',
        fontSize: '0.75rem',
        color: 'var(--gray-400)',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 8,
      }}>
        <span>Altiva Design Studio · felipe@altivadesign.com</span>
        <span>Data sourced from MassGIS, US Census, FEMA. Verify all data with official sources before relying on this study.</span>
      </div>
    </div>
  );
}
