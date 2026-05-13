// MassGIS Level 3 Parcels – ArcGIS Online, public endpoint with CORS enabled
const PARCELS_URL =
  'https://services1.arcgis.com/hGdibHYSPO59RG1h/arcgis/rest/services/L3_TAXPAR_POLY_ASSESS_gdb/FeatureServer/0/query';

export async function fetchParcelData(lat, lng) {
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
    outFields: 'OWNER1,OWNER2,SITE_ADDR,TOWN,USE_CODE,YEAR_BUILT,BLD_AREA,UNITS,ZONING,LOT_SZ,SHAPE_Area',
    returnGeometry: 'false',
    f: 'json',
  });

  let data;
  try {
    const res = await fetch(`${PARCELS_URL}?${params}`);
    if (!res.ok) throw new Error(`MassGIS HTTP ${res.status}`);
    data = await res.json();
  } catch (err) {
    throw new Error(`[MassGIS] ${err.message}`);
  }

  if (data.error) {
    throw new Error(`[MassGIS] ${data.error.message || JSON.stringify(data.error)}`);
  }

  if (!data.features?.length) {
    throw new Error('No parcel found at this location. Verify the address is in Massachusetts.');
  }

  const a = data.features[0].attributes;

  // LOT_SZ from assessor is in sq ft; SHAPE_Area is in sq meters (MA State Plane EPSG:26986)
  const sqFt = a.LOT_SZ
    ? Math.round(Number(a.LOT_SZ))
    : Math.round((a.SHAPE_Area || 0) * 10.7639);

  return {
    owner: titleCase(a.OWNER1 || a.OWNER2 || '') || 'Not available',
    siteAddress: a.SITE_ADDR || '',
    city: titleCase(a.TOWN || ''),
    state: 'MA',
    zip: '',
    useCode: a.USE_CODE || '',
    yearBuilt: a.YEAR_BUILT ? String(a.YEAR_BUILT) : 'Not available',
    buildingArea: Number(a.BLD_AREA || 0),
    units: Number(a.UNITS || 1) || 1,
    zoning: a.ZONING || 'Not available',
    lotAreaSqFt: sqFt,
    lotAreaAcres: (sqFt / 43560).toFixed(2),
  };
}

function titleCase(str) {
  if (!str) return '';
  return str.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
