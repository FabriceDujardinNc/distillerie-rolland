// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // URL canonique du site — indispensable pour le sitemap, les canonical et l'Open Graph
  site: 'https://www.distillerie-rolland.com',
  output: 'static',
  // « always » : aligné sur Apache, qui sert les dossiers avec slash final
  // (dist/rhums/x/index.html) et 301-redirige les URL sans slash
  trailingSlash: 'always',
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
    build: {
      // Jamais d'inline (scripts <script> ou polices data:) : la CSP du
      // .htaccess est stricte (script-src/font-src 'self') et bloquerait
      // ces ressources. Tout doit être un fichier externe hashé.
      assetsInlineLimit: 0,
    },
  },
  build: {
    // Inline les petits assets CSS pour réduire les requêtes bloquantes
    inlineStylesheets: 'auto',
  },
});
