/**
 * Animations GSAP + ScrollTrigger.
 *
 * Règles de performance / accessibilité :
 * - Tout le contenu est visible sans JavaScript (SEO, no-JS, CLS = 0) :
 *   les états initiaux sont posés par gsap.set() uniquement si la motion
 *   est autorisée, jamais en CSS.
 * - On n'anime que `transform` et `opacity` (compositor only, pas de reflow).
 * - `prefers-reduced-motion: reduce` → aucune animation (gsap.matchMedia).
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Accès console en dev uniquement (debug des triggers)
if (import.meta.env.DEV) {
  (window as unknown as Record<string, unknown>).__ST = ScrollTrigger;
}

const EASE = 'power3.out';

// Header, menu mobile et correctif sticky du hero : voir essentials.ts
// (chargé immédiatement, sans GSAP — ce module-ci est importé après le
// premier rendu pour ne pas peser sur le chargement initial)

function initHeroIntro() {
  const tl = gsap.timeline({ defaults: { ease: EASE } });

  // Lent zoom cinématique de l'image plein écran
  tl.fromTo(
    '[data-hero-zoom]',
    { scale: 1.22 },
    { scale: 1.1, duration: 3.2, ease: 'power2.out' },
    0
  );

  tl.from('.hero-logo', { scale: 0.9, opacity: 0, duration: 1.4 }, 0.1)
    .from('.hero-kicker', { y: 24, opacity: 0, duration: 1 }, 0.35)
    .from(
      '.hero-title',
      { y: 40, opacity: 0, duration: 1.4, ease: 'power4.out' },
      0.3
    )
    .from('.hero-rule', { scaleX: 0, opacity: 0, duration: 1.1 }, 0.9)
    .from('.hero-tagline', { y: 20, opacity: 0, duration: 1 }, 1.05)
    .from('.hero-motto', { y: 20, opacity: 0, duration: 1 }, 1.2)
    .from('.hero-ctas', { y: 20, opacity: 0, duration: 1 }, 1.35)
    .from('.hero-scroll', { opacity: 0, duration: 1.2 }, 1.7);
}

function initScrollReveals() {
  // Déclenchement dès l'entrée dans l'écran + fondus courts : le contenu est
  // visible dès qu'on arrive sur une section, même en scrollant vite —
  // l'animation est une nuance, jamais un délai d'affichage.
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 32,
      opacity: 0,
      duration: 0.9,
      ease: EASE,
      scrollTrigger: { trigger: el, start: 'top 94%', toggleActions: 'play none none reverse' },
    });
  });

  // Groupes : les enfants directs apparaissent en cascade — sauf les titres
  // [data-split], qui ont leur propre révélation mot à mot
  gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = [...group.children].filter((el) => !el.hasAttribute('data-split'));
    if (!items.length) return;
    gsap.from(items, {
      y: 26,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: EASE,
      scrollTrigger: { trigger: group, start: 'top 94%', toggleActions: 'play none none reverse' },
    });
  });
}

function initSplitTitles() {
  // Révélation typographique : chaque mot des grands titres monte derrière
  // un masque invisible (overflow hidden), en cascade. Découpage maison —
  // pas de plugin, et le texte reste intact sans JavaScript.
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((title) => {
    const words: HTMLElement[] = [];

    // Découpe chaque nœud texte en mots masqués, en préservant les <span>
    // de mise en couleur et les <br>
    const splitNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        (node.textContent ?? '').split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(' '));
            return;
          }
          const mask = document.createElement('span');
          mask.className = 'inline-block overflow-hidden align-bottom';
          const word = document.createElement('span');
          word.className = 'inline-block';
          word.textContent = part;
          mask.appendChild(word);
          frag.appendChild(mask);
          words.push(word);
        });
        node.parentNode?.replaceChild(frag, node);
      } else if (node instanceof HTMLElement && node.tagName !== 'BR') {
        [...node.childNodes].forEach(splitNode);
      }
    };
    [...title.childNodes].forEach(splitNode);

    gsap.from(words, {
      yPercent: 112,
      duration: 0.9,
      stagger: 0.06,
      ease: 'power4.out',
      scrollTrigger: { trigger: title, start: 'top 90%', toggleActions: 'play none none reverse' },
    });
  });
}

function initCounters() {
  // Chiffres clés qui s'égrènent jusqu'à leur valeur (2020, 2026…)
  gsap.utils.toArray<HTMLElement>('[data-counter]').forEach((el) => {
    const target = Number(el.dataset.counter);
    if (Number.isNaN(target)) return;
    const proxy = { v: 0 };
    gsap.to(proxy, {
      v: target,
      duration: 2,
      ease: 'power3.out',
      onUpdate: () => {
        el.textContent = String(Math.round(proxy.v));
      },
      scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none reverse' },
    });
  });
}

function initMaskReveals() {
  // Les images se dévoilent par un volet qui s'ouvre (clip-path), plus
  // cinématique que le simple fondu
  gsap.utils.toArray<HTMLElement>('[data-mask-reveal]').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: 'inset(0% 0% 100% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.3,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
      }
    );
  });
}

function initCurtains() {
  // Le hero est sticky (CSS) : « La distillerie » glisse par-dessus comme un
  // rideau. Pendant le recouvrement, le contenu du hero se fond et l'image
  // dérive pour accentuer la profondeur.
  gsap.to('.hero-content', {
    yPercent: -14,
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: '#distillerie', start: 'top bottom', end: 'top 15%', scrub: true },
  });
  gsap.to('[data-hero-zoom]', {
    yPercent: 8,
    ease: 'none',
    scrollTrigger: { trigger: '#distillerie', start: 'top bottom', end: 'top top', scrub: 1.2 },
  });
}

function initGaiacPin() {
  // Desktop : « Le gaïac » reste épinglé pendant que « Nos créations »
  // glisse par-dessus (z-20 > z-10, fond opaque).
  ScrollTrigger.create({
    trigger: '#gaiac',
    start: 'bottom bottom',
    end: '+=70%',
    pin: true,
    pinSpacing: false,
  });
}

function initParallax() {
  // Éléments décoratifs : déplacement vertical lié au scroll
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = Number(el.dataset.parallax ?? 10);
    gsap.to(el, {
      yPercent: amount,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('section') ?? el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    });
  });

  // Images de sections : léger sur-cadrage + glissement parallax
  gsap.utils.toArray<HTMLElement>('[data-parallax-img]').forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -6, scale: 1.12 },
      {
        yPercent: 6,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('section') ?? img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      }
    );
  });
}

// Les animations ne s'exécutent que si l'utilisateur les accepte
const mm = gsap.matchMedia();
mm.add('(prefers-reduced-motion: no-preference)', (ctx) => {
  // Visible immédiatement : l'intro du hero part tout de suite
  initHeroIntro();
  initCurtains();

  // Le reste est étalé en micro-tâches (une famille d'animations par tranche)
  // pour ne jamais bloquer le fil principal d'un seul bloc — ctx.add garde
  // chaque ajout tardif dans le contexte matchMedia (revert propre)
  const differes = [initScrollReveals, initSplitTitles, initCounters, initMaskReveals, initParallax];
  const timers = differes.map((fn, i) => setTimeout(() => ctx.add(fn), 80 + i * 90));
  return () => timers.forEach(clearTimeout);
});

function initFloatingLogo() {
  // Le sigle flottant : grand format sur le hero (zone libre à gauche du
  // titre), retour à sa taille normale quand « La distillerie » recouvre le
  // hero, puis descente en parallax jusqu'au pied du footer.
  const logo = document.getElementById('logo-flottant');
  if (!logo) return;

  gsap.set(logo, { scale: 1.8, transformOrigin: 'left top' });

  // Rétrécissement pendant le recouvrement du hero
  gsap.to(logo, {
    scale: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '#distillerie',
      start: 'top bottom',
      end: 'top 20%',
      scrub: 1,
    },
  });

  // Descente sur toute la page : termine à 24px du bas de l'écran, quel que
  // soit le top de départ défini en CSS (offsetTop d'un élément fixed)
  gsap.to(logo, {
    y: () => window.innerHeight - 24 - logo.offsetHeight - logo.offsetTop,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });
}

// Le pin du gaïac et le sigle flottant uniquement sur desktop : sur mobile
// les sections dépassent la hauteur de l'écran et la marge gauche n'existe pas
mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () => {
  initGaiacPin();
  initFloatingLogo();
});
