import { defineConfig } from 'vite';

export default defineConfig({
    ssr: {
        external: ['dotenv', 'path', 'url']
    },
    build: {
        rollupOptions: {
            external: ['dotenv', 'path', 'url']
        }
    }
});
