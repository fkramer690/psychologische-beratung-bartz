import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const AUSGESCHLOSSEN = ['/kontakt/danke/', '/404/'];

export default defineConfig({
  site: 'https://www.psychologische-beratung-bartz.de',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      filter: (page) => !AUSGESCHLOSSEN.some((pfad) => page.endsWith(pfad)),
    }),
  ],
});
