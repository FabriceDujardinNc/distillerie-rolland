/**
 * Soumission du formulaire de contact vers Web3Forms en fetch,
 * avec retour utilisateur inline (pas de rechargement de page).
 */

const form = document.getElementById('contact-form') as HTMLFormElement | null;
const status = document.getElementById('form-status');

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
