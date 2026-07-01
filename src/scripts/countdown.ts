/**
 * Compte à rebours de la page « en préparation ».
 * La date cible est lue sur l'attribut data-launch du conteneur #countdown.
 * Sans JavaScript, la date d'ouverture reste affichée en toutes lettres.
 */

const root = document.getElementById('countdown');

if (root) {
  const target = new Date(root.dataset.launch ?? '').getTime();
  const fields = {
    jours: root.querySelector<HTMLElement>('[data-unit="jours"]'),
    heures: root.querySelector<HTMLElement>('[data-unit="heures"]'),
    minutes: root.querySelector<HTMLElement>('[data-unit="minutes"]'),
    secondes: root.querySelector<HTMLElement>('[data-unit="secondes"]'),
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  const tick = () => {
    const diff = target - Date.now();

    if (Number.isNaN(target) || diff <= 0) {
      // Date passée (ou invalide) : le lancement est imminent
      root.innerHTML =
        '<p class="font-script text-2xl text-or-light md:text-3xl">Ouverture imminente…</p>';
      clearInterval(timer);
      return;
    }

    fields.jours!.textContent = String(Math.floor(diff / 86_400_000));
    fields.heures!.textContent = pad(Math.floor(diff / 3_600_000) % 24);
    fields.minutes!.textContent = pad(Math.floor(diff / 60_000) % 60);
    fields.secondes!.textContent = pad(Math.floor(diff / 1_000) % 60);
    root.classList.remove('opacity-0');
  };

  const timer = setInterval(tick, 1_000);
  tick();
}
