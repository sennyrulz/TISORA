import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: '/admin/',
    plugins: [react()],
    build: { outDir: 'dist' },
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:5001',
  //   }
  // }
});