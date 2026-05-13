// Nominatim (OpenStreetMap) — free, public, CORS-enabled, no auth required
export async function geocodeAddress(address) {
  const params = new URLSearchParams({
    q: address,
    format: 'json',
    limit: '1',
    addressdetails: '1',
    countrycodes: 'us',
  });

  let data;
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?${params}`,
      { headers: { Accept: 'application/json' } }
    );
    if (!res.ok) throw new Error(`Geocoder HTTP ${res.status}`);
    data = await res.json();
  } catch (err) {
    throw new Error(`[Geocoder] ${err.message}`);
  }

  if (!data || data.length === 0) {
    throw new Error(
      'Address not found. Please verify the address includes city and state (e.g. "518 North Cary St, Brockton, MA 02302").'
    );
  }

  const match = data[0];
  return {
    lat: parseFloat(match.lat),
    lng: parseFloat(match.lon),
    matchedAddress: match.display_name,
  };
}
