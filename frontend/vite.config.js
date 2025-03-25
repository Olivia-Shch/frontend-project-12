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
    port: process.env.PORT || 5173,
    allowedHosts: [
      'frontend-project-12-chat-jd8m.onrender.com',
      'localhost',
      '.onrender.com',
    ],
    proxy: {
      '/socket.io': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        ws: true,
      },
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },   
});
