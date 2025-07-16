import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'components'), // crea un alias para importar fácil
    }
  },
  server: {
    fs: {
      allow: ['.', '..'] // habilita lectura fuera de src
    }
  }
});