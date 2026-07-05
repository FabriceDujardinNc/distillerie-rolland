/**
 * Source de vérité unique du site : coordonnées, SEO, produits.
 * Toute mise à jour de contenu se fait ici, jamais en dur dans les composants.
 */

export const site = {
  name: 'Distillerie Rolland',
  founder: 'S. Rolland',
  foundingYear: 2020,
  firstCollectionYear: 2026,
  domain: 'https://www.distillerie-rolland.com',
  tagline: "L'art de distiller, l'excellence à chaque goutte",
  motto: 'Tradition, Passion, Authenticité',
  description:
    'Distillerie artisanale à Moindou, Nouvelle-Calédonie. Rhum blanc traditionnel La Métisse, rhum brun au cœur de gaïac torréfié unique au monde, rhums arrangés. Par un maître distillateur passionné.',
  phone: '+687 92 07 61',
  phoneHref: '+687920761',
  email: 'contact@distillerie-rolland.com',
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
    // À compléter dès que les pages existent — chaque icône du footer (et le
    // sameAs Schema.org) ne s'affiche que si l'URL correspondante est remplie
    facebook: '',
    instagram: '',
    linkedin: '',
  },
  /**
   * Date d'ouverture affichée par le compte à rebours de la page
   * « en préparation » (fuseau Nouvelle-Calédonie, UTC+11).
   */
  launchDate: '2026-07-10T18:00:00+11:00',
} as const;

export type Product = {
  name: string;
  category: string;
  description: string;
  notes?: string;
  available: boolean;
  signature?: boolean;
  /** Slug de la page produit (/rhums/<slug>/) — absent = pas de page dédiée */
  slug?: string;
  /** Paragraphes factuels de la page produit (ton informatif, conforme loi Évin) */
  longText?: string[];
  /** Fiche technique affichée sur la page produit */
  facts?: Record<string, string>;
};

export const products: Product[] = [
  {
    name: 'La Métisse — Rhum blanc traditionnel',
    category: 'Rhum blanc',
    slug: 'la-metisse-rhum-blanc',
    description:
      'Un rhum blanc traditionnel élaboré à partir de mélasse et affiné par une double distillation, pour un profil franc et aromatique — la base des ti-punch, mojito et daïquiri.',
    available: true,
    longText: [
      "La Métisse Rhum blanc est élaborée selon la méthode traditionnelle, à partir de mélasse fermentée à l'Habitation La Métisse, à Moindou. Elle subit une double distillation : cette seconde passe dans l'alambic affine l'eau-de-vie, resserre son profil aromatique et lui donne une pureté et une rondeur supérieures à celles d'une distillation simple.",
      "Embouteillée à 45 % vol. en Nouvelle-Calédonie, chaque bouteille est cachetée à la main à la cire bleue — la signature visuelle de la maison, réalisée bouteille par bouteille dans une casserole de cuivre.",
      "Son profil franc et aromatique en fait une base de choix pour les cocktails classiques — ti-punch, mojito, daïquiri — comme pour les créations des professionnels du bar.",
    ],
    facts: {
      Base: 'Mélasse — méthode traditionnelle',
      Distillation: 'Double distillation',
      'Degré': '45 % vol.',
      Contenance: '70 cl',
      Origine: 'Distillé et embouteillé en Nouvelle-Calédonie',
      Signature: 'Cacheté à la main à la cire bleue',
    },
  },
  {
    name: 'La Métisse — Rhum brun au cœur de gaïac torréfié',
    category: 'Rhum brun',
    slug: 'la-metisse-rhum-brun-gaiac',
    description:
      "Une exclusivité mondiale : le premier alcool vieilli au contact du cœur de gaïac torréfié, bois emblématique de Nouvelle-Calédonie. Issu d'une double distillation.",
    notes: 'Robe dorée aux reflets rouge acajou, notes boisées profondes.',
    available: true,
    signature: true,
    longText: [
      "Le rhum brun La Métisse est une première mondiale : c'est le premier alcool distillé vieilli au contact du cœur de gaïac torréfié. Le gaïac, bois précieux et dense emblématique de la Nouvelle-Calédonie, est torréfié puis mis au contact de l'eau-de-vie, à laquelle il transmet sa couleur et ses arômes.",
      "Comme le rhum blanc de la maison, il est issu d'une double distillation de mélasse selon la méthode traditionnelle — un affinage supplémentaire qui garantit une eau-de-vie d'une grande netteté avant sa rencontre avec le gaïac.",
      "Il en résulte une robe dorée aux reflets rouge acajou et des notes boisées profondes, qui se découvrent aussi bien sec, pour en apprécier la singularité, qu'en cocktail.",
    ],
    facts: {
      Base: 'Mélasse — méthode traditionnelle',
      Distillation: 'Double distillation',
      'Élevage': 'Cœur de gaïac torréfié de Nouvelle-Calédonie',
      Robe: 'Dorée, reflets rouge acajou',
      Origine: 'Distillé et embouteillé en Nouvelle-Calédonie',
      Particularité: 'Premier alcool au monde élevé au gaïac torréfié',
    },
  },
  {
    name: 'Rhums arrangés',
    category: 'Letchi · Passion · Banane · Épices',
    slug: 'rhums-arranges',
    description:
      'Des fruits et des épices macérés patiemment durant six mois dans notre rhum traditionnel double distillation, pour des arrangés intenses et gourmands.',
    available: true,
    longText: [
      "Les rhums arrangés de la Distillerie Rolland naissent de la rencontre entre notre rhum blanc traditionnel — mélasse, double distillation — et des fruits et épices choisis : letchi, fruit de la passion, banane, épices.",
      "La macération dure six mois : le temps nécessaire pour que les fruits livrent pleinement leurs arômes et que l'ensemble trouve son équilibre, sans arômes ajoutés ni raccourcis.",
      'Chaque parfum exprime une facette du terroir calédonien et se déguste tel quel, bien frais, ou allongé selon les préférences.',
    ],
    facts: {
      Base: 'Rhum blanc La Métisse (double distillation)',
      'Parfums': 'Letchi · Passion · Banane · Épices',
      'Macération': '6 mois',
      Origine: 'Élaboré et embouteillé en Nouvelle-Calédonie',
    },
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
