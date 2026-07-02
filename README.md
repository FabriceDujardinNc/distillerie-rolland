# Distillerie Rolland — Site vitrine

Site one-page de la **Distillerie Rolland** (Moindou, Nouvelle-Calédonie) : rhum blanc
traditionnel **La Métisse**, rhum brun au **cœur de gaïac torréfié** (unique au monde),
rhums arrangés.

**Stack** : [Astro](https://astro.build) (100 % statique) · Tailwind CSS 4 · GSAP + ScrollTrigger · TypeScript

**Domaine** : https://www.distillerie-rolland.com — **Hébergement** : Hostinger mutualisé

---

## Commandes

```bash
npm install          # installer les dépendances
npm run dev          # serveur de dev → http://localhost:4321
npm run build        # build de production → dist/
npm run preview      # prévisualiser le build localement
node scripts/make-og.mjs   # regénérer l'image Open Graph
```

> **WSL** : Node est installé via nvm. Si `node` est introuvable : `source ~/.nvm/nvm.sh`.

## Configuration

1. Copier `.env.example` en `.env`
2. Créer une clé gratuite sur [web3forms.com](https://web3forms.com) avec l'adresse
   `contact@distillerie-rolland.com` et la coller dans `PUBLIC_WEB3FORMS_KEY`
   (sans elle, le formulaire de contact ne délivre pas les messages)

Tout le contenu (coordonnées, produits, textes produits) est centralisé dans
**`src/data/site.ts`**.

## Mode pré-lancement 🔒

Le `.htaccess` sert la page « site en préparation » à tous les visiteurs.
Le vrai site se débloque (cookie 30 jours) avec :

```
https://www.distillerie-rolland.com/?acces=gaiac2026
```

- **Changer le code** : 2 occurrences de `gaiac2026` dans `public/.htaccess`
- **Lancement officiel** : supprimer le bloc `MODE PRÉ-LANCEMENT` du `.htaccess`,
  puis rebuild + redéployer

## Déploiement vers Hostinger

Le serveur mutualisé n'a pas Node : on ne déploie jamais les sources, uniquement
le résultat du build, publié sur la branche **`production`** du dépôt.

### En local — publier une mise à jour

```bash
npm run deploy   # build + push de dist/ sur la branche production
```

### Sur le serveur — récupérer la mise à jour

```bash
ssh -p 65002 u387386676@153.92.8.133
cd ~/domains/distillerie-rolland.com/public_html
git fetch origin production && git reset --hard origin/production
```

> `reset --hard` plutôt que `git pull` : la branche `production` est réécrite
> à chaque `npm run deploy`, le reset s'en accommode sans conflit.
> (Mise en place initiale du dépôt déjà faite : `git init` + `remote add` +
> `checkout -t origin/production` dans `public_html`.)

### Option de secours — FTP manuel

`npm run build` puis envoyer tout le contenu de `dist/` (y compris le
**`.htaccess` caché**) dans `domains/distillerie-rolland.com/public_html/`.

> Ne pas activer le « mode maintenance » de Hostinger dans hPanel : la page
> « en préparation » avec code d'accès est déjà gérée par le `.htaccess`.

### Checklist avant lancement

- [ ] Clé Web3Forms réelle dans `.env` avant le build
- [ ] N° RIDET dans `src/pages/mentions-legales.astro`
- [ ] Vraies photos dans `src/assets/images/` (noms SEO en kebab-case, ex.
      `alambic-distillerie-rolland-moindou.jpg`)
- [ ] Réseaux sociaux dans `src/data/site.ts`
- [ ] Supprimer le bloc pré-lancement du `.htaccess`
- [ ] Déclarer le site dans [Google Search Console](https://search.google.com/search-console)
      et soumettre `sitemap-index.xml`
- [ ] Créer la fiche [Google Business Profile](https://business.google.com) (SEO local)

## Structure

```
src/
├── assets/images/    # photos optimisées par Astro (AVIF/WebP responsive)
├── components/       # Header, Hero, About, Gaiac, Products, Contact, Footer
├── data/site.ts      # ← SOURCE DE VÉRITÉ : coordonnées, produits, SEO
├── layouts/          # BaseLayout (meta SEO, OG, favicons, polices)
├── pages/            # index, mentions-legales, en-preparation
├── scripts/          # animations GSAP, formulaire de contact
└── styles/           # design system Tailwind (@theme noir & or)
public/
├── .htaccess         # HTTPS, sécurité (CSP/HSTS), cache, pré-lancement
├── robots.txt        # + référence sitemap
└── images/           # image Open Graph
docs/reference/       # cartes de visite & inspirations (non publiés)
```

---

*L'abus d'alcool est dangereux pour la santé. À consommer avec modération.*
