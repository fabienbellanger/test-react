import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['img/**/*'],
            manifest: {
                name: 'Test React',
                short_name: 'TestReact',
                start_url: '/',
                display: 'standalone',
                background_color: '#ffffff',
                theme_color: '#0d9488',
                icons: [
                    {
                        src: '/icons/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/icons/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern:
                            /^https:\/\/.*\/.*\.(png|jpg|jpeg|webp|svg|gif)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'external-images',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                ],
            },
        }),
    ],
    publicDir: 'public',
    server: {
        port: 5173,
        open: false,
    },
});
