// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // URL canonique du site — indispensable pour le sitemap, les canonical et l'Open Graph
  site: 'https://www.distillerie-rolland.com',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      // Le site est en français, ciblé Nouvelle-Calédonie / France
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr-FR' },
      },
      // La page teaser de pré-lancement ne doit jamais être indexée
      filter: (page) => !page.includes('en-preparation'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    // Inline les petits assets CSS pour réduire les requêtes bloquantes
    inlineStylesheets: 'auto',
  },
});
