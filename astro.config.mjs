import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://claw3drive.com',
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
