const https = require('https');

const TARGET =
  'https://services1.arcgis.com/hGdibHYSPO59RG1h/arcgis/rest/services/L3_TAXPAR_POLY_ASSESS_gdb/FeatureServer/0/query';

exports.handler = async (event) => {
  const query =
    event.rawQuery ||
    new URLSearchParams(event.queryStringParameters || {}).toString();
  const url = query ? `${TARGET}?${query}` : TARGET;

  return new Promise((resolve) => {
    https
      .get(url, { headers: { Accept: 'application/json' } }, (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () =>
          resolve({
            statusCode: res.statusCode,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: Buffer.concat(chunks).toString('utf8'),
          })
        );
      })
      .on('error', (err) =>
        resolve({
          statusCode: 502,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: err.message }),
        })
      );
  });
};
