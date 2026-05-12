import { useRef, useState } from 'react';
import Header from './components/Header.jsx';
import AddressInput from './components/AddressInput.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import FeasibilityReport from './components/FeasibilityReport.jsx';
import ExportButton from './components/ExportButton.jsx';
import { geocodeAddress } from './services/geocoder.js';
import { fetchParcelData } from './services/massGIS.js';
import { fetchFloodZone } from './services/floodZone.js';
import {
  getCityKey,
  getCityData,
  getZoningStandards,
  getTransitInfo,
} from './data/zoningData.js';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [submittedAddress, setSubmittedAddress] = useState('');
  const reportRef = useRef(null);

  async function handleSubmit(address) {
    setLoading(true);
    setError(null);
    setReportData(null);
    setSubmittedAddress(address);

    try {
      setLoadingMsg('Geocoding address…');
      const geo = await geocodeAddress(address);

      setLoadingMsg('Fetching parcel data…');
      const parcel = await fetchParcelData(geo.lat, geo.lng);

      setLoadingMsg('Checking flood zone…');
      const floodData = await fetchFloodZone(geo.lat, geo.lng);

      const cityKey = getCityKey(address) || getCityKey(parcel.city);
      const cityData = getCityData(cityKey);
      const standards = cityKey ? getZoningStandards(cityKey, parcel.zoning) : null;
      const transitInfo = cityKey ? getTransitInfo(cityKey) : null;

      setReportData({
        address: geo.matchedAddress || address,
        geo: { lat: geo.lat, lng: geo.lng },
        parcel,
        standards,
        floodData,
        transitInfo,
        cityLabel: cityData?.label || parcel.city || address,
      });

      setTimeout(() => {
        reportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
      setLoadingMsg('');
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <AddressInput onSubmit={handleSubmit} loading={loading} />

      <main style={{
        flex: 1,
        padding: '40px 24px 64px',
        maxWidth: 880,
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}>
        {loading && <LoadingSpinner message={loadingMsg} />}

        {error && !loading && (
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: 10,
            padding: '20px 24px',
            display: 'flex',
            gap: 14,
            alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: '1.4rem' }}>⚠️</span>
            <div>
              <p style={{ fontWeight: 700, color: '#991B1B', marginBottom: 4 }}>Could not generate study</p>
              <p style={{ color: '#7F1D1D', fontSize: '0.9rem' }}>{error}</p>
            </div>
          </div>
        )}

        {reportData && !loading && (
          <>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
              gap: 12,
              flexWrap: 'wrap',
            }}>
              <div>
                <h2 style={{ fontSize: '1.1rem', color: 'var(--green)', marginBottom: 2 }}>
                  Feasibility Study Ready
                </h2>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.85rem' }}>
                  {reportData.address}
                </p>
              </div>
              <ExportButton reportRef={reportRef} address={submittedAddress} />
            </div>
            <div ref={reportRef}>
              <FeasibilityReport data={reportData} reportRef={reportRef} />
            </div>
          </>
        )}

        {!loading && !error && !reportData && (
          <div style={{
            textAlign: 'center',
            padding: '56px 24px',
            color: 'var(--gray-400)',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🏘️</div>
            <p style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--gray-600)', marginBottom: 8 }}>
              Enter a property address above to generate a feasibility study
            </p>
            <p style={{ fontSize: '0.85rem' }}>
              Owner, lot area, zoning district, year built, and flood zone are fetched automatically.
            </p>
          </div>
        )}
      </main>

      <footer style={{
        background: 'var(--green)',
        color: 'rgba(255,255,255,0.45)',
        textAlign: 'center',
        padding: '16px 24px',
        fontSize: '0.78rem',
      }}>
        © {new Date().getFullYear()} Altiva Design Studio · Data from MassGIS, FEMA, US Census Bureau
      </footer>
    </div>
  );
}
