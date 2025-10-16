import react from '@vitejs/plugin-react';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { defineConfig } from 'vite';
//import { VitePWA } from 'vite-plugin-pwa';

/**
 * VitePWA({
 *     registerType: 'autoUpdate',
 *     manifest: {
 *       name: 'Super-App',
 *       short_name: 'SuperApp',
 *       description: 'Все в одном',
 *       theme_color: '#282c34',
 *       background_color: '#09090B',
 *       display: 'standalone',
 *       start_url: '/',
 *       icons: [
 *         {
 *           src: '/icons/icon-192x192.png',
 *           sizes: '192x192',
 *           type: 'image/png',
 *         },
 *         {
 *           src: '/icons/icon-512x512.png',
 *           sizes: '512x512',
 *           type: 'image/png',
 *         },
 *       ],
 *     },
 *   })
 */
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: { target: browserslistToEsbuild('Chrome >= 81') },
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/mon/': {
        target: 'https://arasaksa-home.didns.ru/',
        changeOrigin: true,
      },
      '/api': {
        target: 'https://arasaksa-home.didns.ru',
        changeOrigin: true,
      },
    },
  },
  base: './',
});
