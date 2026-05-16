import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import {visualizer} from 'rollup-plugin-visualizer';

export default defineConfig(({mode, isSsrBuild}) => {
  const env = loadEnv(mode, '.', '');
  const analyze = env.ANALYZE === '1';
  return {
    plugins: [
      // MDX must precede @vitejs/plugin-react so the JSX produced by MDX flows through React's
      // JSX transform / Fast Refresh pipeline. providerImportSource lets the BlogPost wrapper
      // inject typed component overrides via <MDXProvider>.
      {
        enforce: 'pre',
        ...mdx({
          providerImportSource: '@mdx-js/react',
          remarkPlugins: [
            remarkFrontmatter,
            [remarkMdxFrontmatter, {name: 'frontmatter'}],
          ],
        }),
      },
      react({include: /\.(mdx|js|jsx|ts|tsx)$/}),
      // Lets *.svg files be imported as React components via:
      //   import { ReactComponent as Logo } from './logo.svg?react'
      // Default behaviour (importing as a URL string) is preserved for non-?react imports.
      svgr(),
      tailwindcss(),
      ...(analyze && !isSsrBuild
        ? [visualizer({filename: 'dist/stats.html', gzipSize: true, brotliSize: true}) as never]
        : []),
    ],
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
