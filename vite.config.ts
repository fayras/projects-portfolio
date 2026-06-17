import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/projects-portfolio/',
  plugins: [react()],
  server: {
    hmr: {
      path: '/projects-portfolio/',
    },
  },
});
