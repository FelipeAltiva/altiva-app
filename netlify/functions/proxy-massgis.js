const TARGET =
  'https://services1.arcgis.com/hGdibHYSPO59RG1h/arcgis/rest/services/L3_TAXPAR_POLY_ASSESS_gdb/FeatureServer/0/query';

export const handler = async (event) => {
  const url = event.rawQuery ? `${TARGET}?${event.rawQuery}` : TARGET;
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    const body = await res.text();
    return {
      statusCode: res.status,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body,
    };
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: err.message }) };
  }
};
