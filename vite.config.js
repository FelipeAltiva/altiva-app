import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/proxy/census': {
        target: 'https://geocoding.geo.census.gov',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/proxy\/census/, ''),
      },
      '/proxy/massgis': {
        target: 'https://services1.arcgis.com/hGdibHYSPO59RG1h',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/proxy\/massgis/, ''),
      },
      '/proxy/fema': {
        target: 'https://hazards.fema.gov',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/proxy\/fema/, ''),
      },
    },
  },
})
