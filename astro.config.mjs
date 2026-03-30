import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://clawdrive.dev',
  output: 'static',
  build: {
    assets: '_assets',
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
