import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'



export default defineConfig(({ mode }) => {
  // Cargar variables desde .env.* según el modo (development, production, etc.)
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      host: env.VITE_DEV_HOST,
      port: parseInt(env.VITE_DEV_PORT || '5173'),
    },
    plugins: [react()],
  };
});