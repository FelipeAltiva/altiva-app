export async function geocodeAddress(address) {
  const params = new URLSearchParams({
    address,
    benchmark: 'Public_AR_Current',
    format: 'json',
  });

  let data;
  try {
    const res = await fetch(`/proxy/census/geocoder/locations/onelineaddress?${params}`);
    if (!res.ok) throw new Error(`Census geocoder HTTP ${res.status}`);
    data = await res.json();
  } catch (err) {
    throw new Error(`[Geocoder] ${err.message}`);
  }

  const matches = data?.result?.addressMatches;
  if (!matches || matches.length === 0) {
    throw new Error('Address not found. Please verify the address includes city and state (e.g. "518 North Cary St, Brockton, MA 02302").');
  }

  const match = matches[0];
  return {
    lat: match.coordinates.y,
    lng: match.coordinates.x,
    matchedAddress: match.matchedAddress,
  };
}
