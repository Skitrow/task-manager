import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/v-status/static': {
        target: 'https://us-assets.i.posthog.com/static',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v-status\/static/, '')
      },
      '/v-status': {
        target: 'https://us.i.posthog.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v-status/, '')
      },
      '/sentry-cdn': {
        target: 'https://js-de.sentry-cdn.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sentry-cdn/, '')
      }
    }
  }
});