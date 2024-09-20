// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react', 'react-dom', 'chart.js', 'react-chartjs-2', '@react-google-maps/api'],
    },
  },
  // Define base path for proper routing in SPA
  base: '/'
});
