const TARGET = 'https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer/28/query';

export const handler = async (event) => {
  const query =
    event.rawQuery ||
    new URLSearchParams(event.queryStringParameters ?? {}).toString();
  const url = query ? `${TARGET}?${query}` : TARGET;

  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    const body = await res.text();
    return {
      statusCode: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body,
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
