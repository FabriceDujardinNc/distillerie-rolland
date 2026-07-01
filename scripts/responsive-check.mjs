/**
 * QA responsive : captures d'écran multi-viewports (largeur ET hauteur) +
 * détection de débordement horizontal et de chevauchements dans le hero.
 * Usage : npx astro preview & node scripts/responsive-check.mjs
 */
import { chromium } from 'playwright';

const OUT = process.env.SHOTS_DIR ?? './responsive-shots';
import { mkdirSync } from 'fs';
mkdirSync(OUT, { recursive: true });

const viewports = [
  { name: 'mobile-360x640', width: 360, height: 640 }, // petit Android
  { name: 'mobile-360x800', width: 360, height: 800 },
  { name: 'mobile-390x844', width: 390, height: 844 }, // iPhone
  { name: 'landscape-740x360', width: 740, height: 360 }, // téléphone paysage
  { name: 'tablet-768x1024', width: 768, height: 1024 },
  { name: 'laptop-1366x625', width: 1366, height: 625 }, // laptop avec barres
  { name: 'desktop-1440x900', width: 1440, height: 900 },
];

const browser = await chromium.launch();
for (const vp of viewports) {
  // reducedMotion : les reveals GSAP sont désactivés → tout le contenu est
  // visible sur la capture pleine page (et on valide le fallback accessibilité)
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
    reducedMotion: 'reduce',
  });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const audit = await page.evaluate(() => {
    const issues = [];

    // 1) Débordement horizontal
    const w = document.scrollingElement.scrollWidth;
    if (w > window.innerWidth) {
      document.querySelectorAll('body *').forEach((el) => {
        const r = el.getBoundingClientRect();
        if ((r.right > window.innerWidth + 1 || r.left < -1) && issues.length < 8) {
          issues.push(
            `overflow-x: ${el.tagName}.${[...el.classList].slice(0, 3).join('.')} right=${Math.round(r.right)}`
          );
        }
      });
    }

    // 2) Hauteur : le contenu du hero dépasse-t-il de la section plein écran ?
    const hero = document.getElementById('accueil');
    if (hero) {
      const hr = hero.getBoundingClientRect();
      hero.querySelectorAll(':scope > div, :scope > a').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom > hr.bottom + 1 || r.top < hr.top - 1) {
          issues.push(
            `hero-y: ${el.className.toString().slice(0, 40)} top=${Math.round(r.top)} bottom=${Math.round(r.bottom)} (hero=${Math.round(hr.height)})`
          );
        }
      });
      // L'indicateur de scroll chevauche-t-il les CTA ?
      const cue = hero.querySelector('.hero-scroll');
      const ctas = hero.querySelector('.hero-ctas');
      if (cue && ctas) {
        const c = cue.getBoundingClientRect();
        const b = ctas.getBoundingClientRect();
        if (c.top < b.bottom && c.bottom > b.top) issues.push('hero-y: scroll-cue chevauche les CTA');
      }
    }

    return { scrollWidth: w, innerWidth: window.innerWidth, issues };
  });

  const flag = audit.issues.length ? '⚠️' : 'OK';
  console.log(`${vp.name}: ${flag} (scrollWidth=${audit.scrollWidth}/${audit.innerWidth})`);
  audit.issues.forEach((i) => console.log('   →', i));

  await page.screenshot({ path: `${OUT}/${vp.name}-full.png`, fullPage: true });
  await page.screenshot({ path: `${OUT}/${vp.name}-hero.png` });
  await page.close();
}
await browser.close();
console.log(`done — captures dans ${OUT}`);
