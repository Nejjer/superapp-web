//import { VitePWA } from 'vite-plugin-pwa';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

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
  plugins: [
    react(),
    legacy({
      targets: ['chrome >= 80'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // на всякий случай
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/mon': {
        target: 'https://arasaka-home.didns.ru',
        changeOrigin: true,
      },
      '/api': {
        //target: 'https://arasaksa-home.didns.ru',
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
  base: './',
});
