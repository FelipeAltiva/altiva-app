import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Simulate Netlify Functions in local dev
      '/.netlify/functions/proxy-census': {
        target: 'https://geocoding.geo.census.gov',
        changeOrigin: true,
        rewrite: () => '/geocoder/locations/onelineaddress',
      },
      '/.netlify/functions/proxy-massgis': {
        target: 'https://services1.arcgis.com',
        changeOrigin: true,
        rewrite: () => '/hGdibHYSPO59RG1h/arcgis/rest/services/L3_TAXPAR_POLY_ASSESS_gdb/FeatureServer/0/query',
      },
      '/.netlify/functions/proxy-fema': {
        target: 'https://hazards.fema.gov',
        changeOrigin: true,
        rewrite: () => '/arcgis/rest/services/public/NFHL/MapServer/28/query',
      },
    },
  },
})
