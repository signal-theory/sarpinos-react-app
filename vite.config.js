import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const pkg = require('./package.json')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: '/src/entry-server.jsx' // Path to your server entry point
    }
  },
  ssr: {
    noExternal: Object.keys(pkg.dependencies || {})
  }
})
