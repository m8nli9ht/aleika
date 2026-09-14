/* ==========================================================================
   COMPOSANTS RÉUTILISABLES & AGENDA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Détecter la page courante pour la surbrillance du menu
  let currentPage = window.location.pathname.split('/').pop();
  if (!currentPage || currentPage === '') currentPage = 'index.html';

  // 2. Modèle Header
  const headerHTML = `
    <header class="header">
      <div class="brand">
        <span class="kanji-accent">舞</span> Aleïka <span>— Danse Butō</span>
      </div>
      <button class="menu-toggle" onclick="toggleMobileMenu()" aria-label="Menu principal">☰</button>
      <nav>
        <ul class="nav-menu" id="nav-menu">
          <li><a href="index.html" class="nav-link ${currentPage === 'index.html' ? 'active' : ''}">Accueil</a></li>
          <li><a href="la-danse-buto.html" class="nav-link ${currentPage === 'la-danse-buto.html' ? 'active' : ''}">La Danse Butō</a></li>
          <li><a href="stages-ateliers.html" class="nav-link ${currentPage === 'stages-ateliers.html' ? 'active' : ''}">Programme</a></li>
          <li><a href="parcours.html" class="nav-link ${currentPage === 'parcours.html' ? 'active' : ''}">Parcours</a></li>
          <li><a href="contact.html" class="nav-link ${currentPage === 'contact.html' ? 'active' : ''}">Contact</a></li>
        </ul>
      </nav>
    </header>
  `;

  // 3. Modèle Footer
  const footerHTML = `
    <footer class="footer">
      <div class="footer-content">
        <div>
          <h3 style="color: var(--text-main); margin-bottom: 0.5rem; font-size: 1rem;">Aleïka — Danse Butō</h3>
          <p>Ateliers, cours et stages de danse Butō à Toulouse et en région Occitanie.</p>
        </div>
        <div>
          <h4 style="color: var(--text-main); margin-bottom: 0.5rem; font-size: 0.9rem;">Navigation</h4>
          <ul class="footer-links" style="font-size: 0.8rem; line-height: 2;">
            <li><a href="index.html">Accueil</a></li>
            <li><a href="la-danse-buto.html">La Danse Butō</a></li>
            <li><a href="stages-ateliers.html">Programme</a></li>
            <li><a href="parcours.html">Parcours</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© Aleïka — Tous droits réservés.</p>
        <p><a href="#">Mentions Légales</a> | <a href="#">Politique de Confidentialité</a></p>
      </div>
    </footer>
  `;

  // Injection du Header et Footer
  const headerContainer = document.getElementById('main-header');
  const footerContainer = document.getElementById('main-footer');

  if (headerContainer) headerContainer.innerHTML = headerHTML;
  if (footerContainer) footerContainer.innerHTML = footerHTML;

  // Génération des événements si nous sommes sur la bonne page
  renderEvents();
});

// Gestion du menu mobile
function toggleMobileMenu() {
  const navMenu = document.getElementById('nav-menu');
  if (navMenu) {
    navMenu.classList.toggle('mobile-open');
  }
}

/* ==========================================================================
   DONNÉES ÉVÉNEMENTS & GESTION DES RÉSERVATIONS
   ========================================================================== */
const mockGoogleCalendarEvents = [
  {
    id: "1",
    title: "Atelier Hebdomadaire Butō — Corps & Présence",
    date: "Tous les mardis de 19h00 à 21h00",
    location: "Studio Dance, Toulouse",
    description: "Un temps régulier pour approfondir la conscience corporelle, laisser émerger le mouvement spontané et libérer les tensions.",
    imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "2",
    title: "Stage d'initiation Butō — Le Corps Invisible",
    date: "Samedi 24 & Dimanche 25 Octobre 2026",
    location: "Espace Occitanie, Toulouse",
    description: "Deux jours en immersion pour explorer l'ancrage, l'improvisation et la philosophie de la danse Butō.",
    imageUrl: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "3",
    title: "Stage Intensif Butō — L'Émergence [COMPLET]",
    date: "Samedi 14 Novembre 2026",
    location: "Studio Mouvement, Toulouse",
    description: "Stage d'approfondissement thématique axé sur la mémoire corporelle et la transformation.",
    imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80"
  }
];

function generateMailtoUrl(eventTitle) {
  const recipient = "contact@buto-aleika.fr";
  const subject = encodeURIComponent(`Demande de réservation — ${eventTitle}`);
  const body = encodeURIComponent(
    `Bonjour Aleïka,\n\nJe souhaite m'inscrire à l'événement suivant : ${eventTitle}\n\nMes coordonnées :\n- Nom :\n- Prénom :\n- Téléphone :\n\nMerci de me confirmer la disponibilité ainsi que les modalités pour le règlement des arrhes.\n\n- Présence : (Merci de préciser si vous participez à toutes les dates prévues, si non, précisez les jours)\n`
  );
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}

function createCardElement(evt) {
  const isComplet = evt.title.toUpperCase().includes('COMPLET');
  const buttonHtml = isComplet 
    ? `<button class="btn btn-disabled" disabled>Complet</button>`
    : `<a href="${generateMailtoUrl(evt.title)}" class="btn">Réserver ma place</a>`;

  const article = document.createElement('article');
  article.className = 'event-card';
  article.innerHTML = `
    <img src="${evt.imageUrl}" alt="${evt.title}" class="event-image" loading="lazy">
    <div class="event-content">
      <div>
        <div class="event-meta">📍 ${evt.location} | 🗓️ ${evt.date}</div>
        <h3 class="event-title">${evt.title}</h3>
        <p class="event-desc">${evt.description}</p>
      </div>
      <div class="event-footer">
        ${buttonHtml}
      </div>
    </div>
  `;
  return article;
}

function renderEvents() {
  const fullListContainer = document.getElementById('full-events-list');
  const homePreviewContainer = document.getElementById('home-events-preview');

  if (fullListContainer) {
    fullListContainer.innerHTML = '';
    mockGoogleCalendarEvents.forEach(evt => {
      fullListContainer.appendChild(createCardElement(evt));
    });
  }

  if (homePreviewContainer) {
    homePreviewContainer.innerHTML = '';
    mockGoogleCalendarEvents.slice(0, 2).forEach(evt => {
      homePreviewContainer.appendChild(createCardElement(evt));
    });
  }
}
