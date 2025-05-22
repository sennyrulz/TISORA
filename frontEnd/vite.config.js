import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


fetch("/api/admin") // proxy will forward to localhost:5173 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
