/**
 * Source de vérité unique du site : coordonnées, SEO, produits.
 * Toute mise à jour de contenu se fait ici, jamais en dur dans les composants.
 */

export const site = {
  name: 'Distillerie Rolland',
  domain: 'https://www.distillerie-rolland.com',
  tagline: "L'art de distiller, l'excellence à chaque goutte",
  motto: 'Tradition, Passion, Authenticité',
  description:
    'Distillerie artisanale à Moindou, Nouvelle-Calédonie. Rhum blanc traditionnel La Métisse, rhum brun au cœur de gaïac torréfié unique au monde, rhums arrangés. Par un maître distillateur passionné.',
  phone: '+687 92 07 61',
  phoneHref: '+687920761',
  email: 'distillerie.rolland@gmail.com',
  address: {
    street: 'Lot 783, Moindou Pâturage',
    locality: 'Moindou',
    region: 'Province Sud',
    postalCode: '98819',
    country: 'Nouvelle-Calédonie',
    countryCode: 'NC',
  },
  /** Coordonnées approximatives de Moindou — à affiner avec le point GPS exact */
  geo: { lat: -21.6925, lng: 165.6779 },
  social: {
    // À compléter dès que les pages existent
    facebook: '',
    instagram: '',
  },
  /**
   * Date d'ouverture affichée par le compte à rebours de la page
   * « en préparation » (fuseau Nouvelle-Calédonie, UTC+11).
   * ⚠️ Date d'exemple — à ajuster avec le client.
   */
  launchDate: '2026-10-06T18:00:00+11:00',
} as const;

export type Product = {
  name: string;
  category: string;
  description: string;
  notes?: string;
  available: boolean;
  signature?: boolean;
};

export const products: Product[] = [
  {
    name: 'La Métisse — Rhum blanc traditionnel',
    category: 'Rhum blanc',
    description:
      'Un rhum blanc traditionnel, franc et aromatique, pensé pour sublimer les cocktails : ti-punch, mojito, daïquiri… la base idéale des plus belles créations.',
    available: true,
  },
  {
    name: 'Rhum brun au cœur de gaïac torréfié',
    category: 'Rhum brun',
    description:
      "Une exclusivité mondiale : le premier alcool vieilli au contact du cœur de gaïac torréfié, bois emblématique de Nouvelle-Calédonie. Excellent sec comme en cocktail.",
    notes: 'Robe dorée aux reflets rouge acajou, notes boisées profondes.',
    available: true,
    signature: true,
  },
  {
    name: 'Rhums arrangés',
    category: 'Letchi · Passion · Banane · Épices',
    description:
      'Des fruits généreux et des épices macérés patiemment durant six mois dans notre rhum traditionnel, pour des arrangés intenses et gourmands.',
    available: true,
  },
  {
    name: 'Whisky au cœur de gaïac torréfié',
    category: 'À venir',
    description:
      'Un whisky unique infusé au cœur de gaïac torréfié, et son frère vieilli trois ans en fût de chêne. Deux expressions inédites en cours d’élevage.',
    available: false,
  },
  {
    name: "Brandy d'hydromel — Cuvée prestige",
    category: 'À venir',
    description:
      "Notre future bouteille de luxe : un brandy d'hydromel vieilli cinq ans en fût de chêne, finition au cœur de gaïac torréfié. Le sommet de la maison.",
    available: false,
  },
];
