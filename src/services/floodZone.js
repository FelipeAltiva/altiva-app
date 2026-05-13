const NFHL_URL =
  'https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer/28/query';

const ZONE_DESCRIPTIONS = {
  A: 'Special Flood Hazard Area – 1% annual chance flood (Zone A)',
  AE: 'Special Flood Hazard Area – base flood elevations determined (Zone AE)',
  AH: 'Special Flood Hazard Area – shallow flooding (Zone AH)',
  AO: 'Special Flood Hazard Area – sheet flow flooding (Zone AO)',
  AR: 'Special Flood Hazard Area – flood control restoration (Zone AR)',
  'A99': 'Special Flood Hazard Area – protected by federal flood control project (Zone A99)',
  V: 'Coastal High Hazard Area – wave action (Zone V)',
  VE: 'Coastal High Hazard Area – base flood elevations determined (Zone VE)',
  X: 'Minimal flood hazard area (Zone X)',
  B: 'Moderate flood hazard area (Zone B/Shaded X)',
  C: 'Minimal flood hazard area (Zone C/Unshaded X)',
  D: 'Possible flood hazard – no analysis performed (Zone D)',
};

const HIGH_RISK_ZONES = new Set(['A', 'AE', 'AH', 'AO', 'AR', 'A99', 'V', 'VE']);

export async function fetchFloodZone(lat, lng) {
  const geometry = JSON.stringify({
    x: lng,
    y: lat,
    spatialReference: { wkid: 4326 },
  });

  const params = new URLSearchParams({
    geometry,
    geometryType: 'esriGeometryPoint',
    inSR: '4326',
    spatialRel: 'esriSpatialRelIntersects',
    outFields: 'FLD_ZONE,ZONE_SUBTY,SFHA_TF',
    returnGeometry: 'false',
    f: 'json',
  });

  try {
    const res = await fetch(`${NFHL_URL}?${params}`);
    if (!res.ok) return unavailable();

    const data = await res.json();
    if (data.error || !data.features || data.features.length === 0) {
      return { zone: 'X', description: ZONE_DESCRIPTIONS['X'], isHighRisk: false };
    }

    const { FLD_ZONE, SFHA_TF } = data.features[0].attributes;
    const zone = FLD_ZONE || 'X';
    const isHighRisk = SFHA_TF === 'T' || HIGH_RISK_ZONES.has(zone);

    return {
      zone,
      description: ZONE_DESCRIPTIONS[zone] || `Flood Zone ${zone}`,
      isHighRisk,
    };
  } catch {
    return unavailable();
  }
}

function unavailable() {
  return {
    zone: 'N/A',
    description: 'Flood zone data unavailable. Verify via FEMA Flood Map Service Center (msc.fema.gov).',
    isHighRisk: false,
  };
}
