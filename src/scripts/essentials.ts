/**
 * Interactions essentielles, chargées immédiatement et SANS GSAP :
 * header, menu mobile et correctif sticky du hero doivent répondre dès la
 * première seconde. Les animations GSAP (lourdes) sont importées plus tard
 * par index.astro, après le premier rendu.
 */

function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  // Nav transparente sur le hero, fond noir translucide ensuite
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 80);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
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

  toggle.addEventListener('click', () => setOpen(!header.classList.contains('menu-open')));
  // Fermer le menu quand on choisit une section
  header
    .querySelectorAll('.mobile-link')
    .forEach((link) => link.addEventListener('click', () => setOpen(false)));
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

initHeader();
initMobileMenu();
initHeroStickyTop();
