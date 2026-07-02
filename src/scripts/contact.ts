/**
 * Soumission du formulaire de contact vers Web3Forms en fetch,
 * avec retour utilisateur inline (pas de rechargement de page).
 */

const form = document.getElementById('contact-form') as HTMLFormElement | null;
const status = document.getElementById('form-status');

/**
 * Anti-spam « time gate » : un humain met toujours plusieurs secondes à
 * remplir le formulaire, un bot soumet instantanément. Complète le honeypot
 * (champ botcheck) et le filtrage côté Web3Forms.
 */
const pageLoadedAt = Date.now();
const MIN_FILL_TIME_MS = 4000;

/**
 * Chargement différé du widget hCaptcha (via le script Web3Forms) : son
 * proof-of-work est très coûteux en CPU, on ne le charge que lorsque le
 * visiteur approche de la section contact (600px d'avance — prêt à temps).
 */
function initLazyCaptcha() {
  const section = document.getElementById('contact');
  if (!section) return;

  let loaded = false;
  const load = () => {
    if (loaded) return;
    loaded = true;
    const script = document.createElement('script');
    script.src = 'https://web3forms.com/client/script.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: '600px' }
    );
    io.observe(section);
  } else {
    load();
  }
}

initLazyCaptcha();

function setStatus(message: string, ok: boolean) {
  if (!status) return;
  status.textContent = message;
  status.classList.toggle('text-or-light', ok);
  status.classList.toggle('text-red-400', !ok);
}

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (Date.now() - pageLoadedAt < MIN_FILL_TIME_MS) {
    setStatus('Vérification anti-spam : patientez un instant puis réessayez.', false);
    return;
  }

  // Le jeton hCaptcha doit être présent (case cochée) avant l'envoi
  const captcha = form.querySelector<HTMLTextAreaElement>('[name="h-captcha-response"]');
  if (captcha && !captcha.value) {
    setStatus('Merci de cocher la case « Je suis humain ».', false);
    return;
  }

  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (button) button.disabled = true;
  setStatus('Envoi en cours…', true);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    });
    const result = await response.json();

    if (response.ok && result.success) {
      form.reset();
      (window as { hcaptcha?: { reset: () => void } }).hcaptcha?.reset();
      setStatus('Merci ! Votre message a bien été envoyé.', true);
    } else {
      setStatus("L'envoi a échoué. Écrivez-nous directement par email.", false);
    }
  } catch {
    setStatus('Connexion impossible. Réessayez ou contactez-nous par téléphone.', false);
  } finally {
    if (button) button.disabled = false;
  }
});
