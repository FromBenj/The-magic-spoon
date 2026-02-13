import { defineConfig } from 'vite';

export default defineConfig({
    ssr: {
        external: ['dotenv', 'path', 'url']
    },
    build: {
        rollupOptions: {
            external: ['dotenv', 'path', 'url']
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false
            }
        }
    }
});
