import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    host: '192.168.1.99',  // Permite conexiones desde cualquier dispositivo en la red local
    port: 5173,       // O el puerto que prefieras

  },
  plugins: [react()],
})
