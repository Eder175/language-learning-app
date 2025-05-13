import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'src', // Define src como diretório raiz
  plugins: [react()],
  server: {
    port: 5173,
    open: true, // Abre o navegador automaticamente
  },
  css: {
    postcss: '../postcss.config.js', // Caminho relativo ao diretório src
  },
  build: {
    outDir: '../dist', // Saída para builds
  },
});