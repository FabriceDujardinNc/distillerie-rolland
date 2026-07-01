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

const EASE = 'power3.out';

function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  // Nav transparente sur le hero, fond noir translucide ensuite
  ScrollTrigger.create({
    start: 80,
    onEnter: () => header.classList.add('is-scrolled'),
    onLeaveBack: () => header.classList.remove('is-scrolled'),
  });
}

function initMobileMenu() {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('menu-toggle');
  if (!header || !toggle) return;

  const setOpen = (open: boolean) => {
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  };

  toggle.addEventListener('click', () =>
    setOpen(!header.classList.contains('menu-open'))
  );
  // Fermer le menu quand on choisit une section
  header
    .querySelectorAll('.mobile-link')
    .forEach((link) => link.addEventListener('click', () => setOpen(false)));
}

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
      scrollTrigger: { trigger: el, start: 'top 94%' },
    });
  });

  // Groupes : les enfants directs apparaissent en cascade
  gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
    gsap.from(group.children, {
      y: 26,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: EASE,
      scrollTrigger: { trigger: group, start: 'top 94%' },
    });
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

function initHeroStickyTop() {
  // Le hero est sticky pour l'effet rideau. Si son contenu est plus haut que
  // l'écran (laptops courts, tablette paysage), un top négatif le laisse
  // défiler jusqu'à ses boutons avant de s'épingler — sinon ils seraient
  // recouverts sans jamais avoir été visibles.
  const hero = document.getElementById('accueil');
  if (!hero) return;

  const apply = () => {
    hero.style.top = `${Math.min(0, window.innerHeight - hero.offsetHeight)}px`;
  };
  apply();
  window.addEventListener('resize', apply);
}

// Le header, le menu mobile et le correctif sticky fonctionnent dans tous les cas
initHeader();
initMobileMenu();
initHeroStickyTop();

// Les animations ne s'exécutent que si l'utilisateur les accepte
const mm = gsap.matchMedia();
mm.add('(prefers-reduced-motion: no-preference)', () => {
  initHeroIntro();
  initScrollReveals();
  initParallax();
  initCurtains();
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
