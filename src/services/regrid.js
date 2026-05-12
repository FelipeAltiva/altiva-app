const TOKEN = import.meta.env.VITE_REGRID_TOKEN;

export function isRegridConfigured() {
  return Boolean(TOKEN && TOKEN.trim().length > 0);
}

export async function fetchParcelData(address) {
  if (!isRegridConfigured()) {
    throw new Error('REGRID_TOKEN_MISSING');
  }

  const params = new URLSearchParams({
    path: address,
    token: TOKEN,
    limit: '1',
    fields: 'headline,fields',
  });

  let data;
  try {
    const res = await fetch(`/proxy/regrid/api/v2/parcels/address.json?${params}`);
    if (res.status === 401 || res.status === 403) {
      throw new Error('Invalid Regrid API token. Check your VITE_REGRID_TOKEN in .env');
    }
    if (!res.ok) throw new Error(`Regrid HTTP ${res.status}`);
    data = await res.json();
  } catch (err) {
    throw new Error(`[Regrid] ${err.message}`);
  }

  const features = data?.parcels?.features ?? data?.results ?? [];
  if (!features.length) {
    throw new Error('No parcel found for this address. Verify the address is correct.');
  }

  const fields = features[0]?.properties?.fields ?? features[0]?.fields ?? {};

  // Lot area: prefer GIS square footage, fall back to acres conversion
  const sqFt = fields.ll_gissqft
    ? Math.round(Number(fields.ll_gissqft))
    : fields.ll_gisacre
    ? Math.round(Number(fields.ll_gisacre) * 43560)
    : 0;

  return {
    owner: titleCase(fields.owner ?? fields.mailadd ?? '') || 'Not available',
    siteAddress: fields.address ?? '',
    city: titleCase(fields.scity ?? fields.city ?? ''),
    state: fields.state2 ?? 'MA',
    zip: fields.szip ?? '',
    useCode: fields.usecode ?? fields.landuse ?? '',
    yearBuilt: fields.yearbuilt ? String(fields.yearbuilt) : 'Not available',
    buildingArea: Number(fields.sqft ?? fields.ll_bldg_gross_sq_ft ?? 0),
    units: Number(fields.resnbr ?? 1) || 1,
    zoning: fields.zoning ?? fields.zoning_code ?? 'Not available',
    lotAreaSqFt: sqFt,
    lotAreaAcres: (sqFt / 43560).toFixed(2),
  };
}

function titleCase(str) {
  if (!str) return '';
  return str.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
