import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.(js|jsx)$/,
  },
   server: {
    host: '0.0.0.0',
    port: 5002,
    allowedHosts: [
      'frontend-project-12-chat-jd8m.onrender.com',
      'localhost',
      '.onrender.com',
    ],
    proxy: {
      '/socket.io': {
        target: 'ws://localhost:5001',
        ws: true,
        rewriteWsOrigin: true,
      },
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },   
});
