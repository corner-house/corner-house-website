import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode, isSsrBuild}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      sourcemap: false,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          // Client build: pre-chunk heavy shared deps so the main bundle shrinks.
          // SSR build: Rollup externalizes react/react-dom, so manualChunks must be skipped.
          manualChunks: isSsrBuild
            ? undefined
            : {
                react: ['react', 'react-dom', 'react-router-dom'],
                motion: ['motion'],
                helmet: ['react-helmet-async'],
              },
        },
      },
    },
    ssgOptions: {
      // Flat output: /foo → dist/foo.html (matches existing Cloudflare Pages routing).
      dirStyle: 'flat',
      // Mock browser globals at SSG time for any code that accesses window/document
      // outside useEffect/event handlers.
      mock: true,
      // Async-load the JS bundle so first paint doesn't wait on 400+ KB of JS.
      script: 'async',
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
