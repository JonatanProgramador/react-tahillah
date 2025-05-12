import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'



export default defineConfig(({ mode }) => {
  // Cargar variables desde .env.* según el modo (development, production, etc.)
  const env = loadEnv(mode, process.cwd());
  return {
    server: {
      host: env.VITE_HOST_CLIENT,
      port: parseInt(env.VITE_PORT_CLIENT || '5173'),
    },
    plugins: [react()],
  };
});