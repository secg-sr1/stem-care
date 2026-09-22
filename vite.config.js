import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/agents': 'http://127.0.0.1:5174',
      '/api/consultation': 'http://127.0.0.1:5174',
      '/api/session': 'http://127.0.0.1:5174',
    },
  },
})
