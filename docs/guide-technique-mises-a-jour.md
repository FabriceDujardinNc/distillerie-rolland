# Site distillerie-rolland.com — Guide technique des mises à jour

**Document de passation** — Distillerie Rolland · rédigé par Pacific Pro Web · août 2026

Ce document explique comment le site est construit et ce qu'implique concrètement **toute modification** (changer un texte, une photo, ajouter une page…). Il sert de référence pour vous-même ou pour tout prestataire qui interviendrait sur le site à l'avenir.

> **À retenir en une phrase** : ce site n'est pas un site « à la WordPress » avec un bouton Modifier. C'est un site **compilé** — chaque changement, même une virgule, passe par un environnement de développement, une compilation et un déploiement sur le serveur. Ces opérations relèvent du métier de développeur web.

---

## 1. Comment le site est construit

Le site est développé avec des technologies professionnelles modernes, choisies pour leurs performances (notes Google de 90 à 100/100), leur sécurité et leur référencement :

| Brique | Rôle |
|---|---|
| **Astro 7** | Générateur de site statique : le site est « compilé » en pages HTML pures, ultra-rapides |
| **Tailwind CSS 4** | Système de styles (couleurs, mises en page, responsive mobile/tablette/desktop) |
| **GSAP** | Animations au défilement (apparitions, parallaxe, effets du logo) |
| **TypeScript** | Langage de programmation des interactions (menu, formulaire, compte à rebours) |
| **GitHub** | Coffre-fort du code source, avec l'historique complet de toutes les modifications |
| **Hostinger** | Hébergement du site en ligne (serveur Apache, accès SSH) |
| **Web3Forms + hCaptcha** | Acheminement du formulaire de contact et protection anti-robots |

**Conséquence importante** : il n'existe **aucune interface d'administration**. Les textes et images ne se modifient pas « en ligne » — ils vivent dans le code source, et le site visible n'est que le résultat d'une compilation de ce code.

---

## 2. Ce qu'implique la moindre modification

Changer une phrase ou une photo suit **obligatoirement** ce parcours :

### Étape 1 — Environnement de développement
- Un ordinateur avec **Node.js** (version 24), **npm** et **Git** installés et configurés.
- Le code source récupéré depuis le dépôt GitHub (`FabriceDujardinNc/distillerie-rolland`).
- L'installation des dépendances du projet (`npm install`) — environ 400 paquets logiciels.

### Étape 2 — Modification dans le code
- Trouver le bon fichier : les textes des produits sont dans `src/data/site.ts`, les sections de l'accueil dans `src/components/*.astro`, les pages dans `src/pages/`…
- Respecter la **syntaxe** : une apostrophe mal placée ou une balise mal fermée = compilation en échec, site impossible à mettre à jour.
- Respecter les **spécificités du projet**, entre autres :
  - les images doivent être retraitées (compression WebP, dimensions multiples, noms de fichiers optimisés pour le référencement, suppression des données GPS) ;
  - certaines classes de style sont **interdites** sur les éléments animés (elles rendent le contenu invisible — bug subtil et silencieux) ;
  - la mise en page Astro a des pièges d'espacement propres au framework ;
  - tout nouveau texte doit respecter la **réglementation calédonienne sur les boissons alcoolisées** (loi du pays 2018-6 : information factuelle uniquement, pas de prix, pas d'incitation, pas d'allégation santé — amendes jusqu'à ~9 M F CFP).

### Étape 3 — Compilation et vérifications
- Lancer la compilation (`npm run build`) et corriger les éventuelles erreurs.
- Vérifier le rendu en local sur mobile, tablette et desktop (le site a des animations et une mise en page complexes).
- Vérifier que le référencement n'est pas cassé : balises, données structurées Schema.org (LocalBusiness, Product, FAQ, vidéos), sitemap, textes alternatifs des images.

### Étape 4 — Versionnage et déploiement
- Enregistrer la modification dans l'historique Git et la pousser sur GitHub (`git commit` + `git push`).
- Compiler et pousser la version de production (`npm run deploy` — script fourni dans le projet).
- Se connecter au serveur Hostinger **en SSH** (ligne de commande, port 65002) et faire pointer le site sur la nouvelle version (`git fetch` + `git reset`).

### Étape 5 — Contrôles après mise en ligne
- Vérifier le site en production (pages, formulaire, en-têtes de sécurité CSP/HSTS).
- Selon la modification : redemander l'indexation dans Google Search Console, surveiller les rapports (couverture, extraits enrichis, vidéos).

**Durée réaliste pour un développeur qui connaît le projet : 30 min à 2 h selon la modification. Pour un non-développeur : ce parcours n'est pas praticable.**

---

## 3. Les accès nécessaires

Toute intervention exige ces accès (à transmettre uniquement à un prestataire de confiance) :

- **GitHub** : dépôt `FabriceDujardinNc/distillerie-rolland` (code source + historique).
- **Hostinger** : compte d'hébergement + accès SSH au serveur.
- **Google Search Console** : suivi du référencement (propriété distillerie-rolland.com).
- **Web3Forms** : acheminement des emails du formulaire de contact.
- **Boîte email** contact@distillerie-rolland.com (Hostinger).

> ⚠️ Les mots de passe ne figurent volontairement pas dans ce document. Ils doivent être transmis par un canal sécurisé et **changés à chaque changement de prestataire**.

---

## 4. Ce que vous pouvez faire vous-même (sans développeur)

Bonne nouvelle : tout ce qui fait vivre votre visibilité au quotidien est **hors du site** et à votre portée :

- **Fiche Google Business Profile** : publier des actualités (nouveau produit, événement), répondre aux avis, ajouter des photos, mettre à jour horaires et téléphone.
- **Réseaux sociaux** (Facebook, Instagram) : publications régulières — en respectant le cadre légal (informatif, pas d'incitation à la consommation).
- **Collecter des avis Google** : le levier n°1 de votre référencement local.
- **Préparer les contenus** pour le développeur : textes relus et validés, photos en haute résolution — plus le brief est propre, moins l'intervention coûte cher.

Le document séparé **« Plan SEO post-lancement »** (déjà fourni) détaille ces actions.

---

## 5. Maintenance : ce qui est recommandé

Un site, même statique et sécurisé, ne reste pas « tout seul » au niveau de l'état de l'art :

| Fréquence | Tâche |
|---|---|
| Mensuel | Vérifier les rapports Google Search Console (indexation, erreurs) |
| Trimestriel | Mise à jour des dépendances (Astro, GSAP, sécurité npm) + recompilation + tests |
| Trimestriel | Audit performance/sécurité (Lighthouse, en-têtes HTTP, certificat SSL) |
| À la demande | Modifications de contenu (textes, photos, nouveaux produits, nouvelles pages) |
| Annuel | Renouvellement domaine + hébergement (Hostinger), vérification des sauvegardes |

**La création du site (prestation livrée) n'inclut pas cette maintenance.** Pour la suite, deux options :

1. **Contrat de maintenance** avec un développeur/une agence (forfait mensuel ou annuel) : interventions, mises à jour de sécurité, suivi SEO.
2. **Interventions ponctuelles** facturées à la demande — adapté si le site évolue peu.

Dans les deux cas, exigez du prestataire qu'il travaille **via GitHub** (jamais de modification directe sur le serveur) : c'est ce qui garantit l'historique, les sauvegardes et la possibilité de revenir en arrière en cas de problème.

---

## 6. En cas d'urgence (site inaccessible)

1. Vérifier l'état d'Hostinger (statut de l'hébergement, certificat SSL, expiration du domaine).
2. Ne **jamais** modifier de fichiers directement sur le serveur : la version de référence est sur GitHub, tout écart sera écrasé au déploiement suivant.
3. Contacter un développeur avec les accès du chapitre 3 — grâce à Git, le site peut être restauré à l'identique en quelques minutes sur n'importe quel hébergement.

---

*Document remis à titre de passation technique. Le code source du site, propriété de la Distillerie Rolland, est intégralement versionné sur GitHub avec l'historique de sa construction.*
