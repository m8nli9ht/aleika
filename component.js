/* ==========================================================================
   COMPOSANTS RÉUTILISABLES (HEADER & FOOTER)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Détecter la page actuelle
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // 2. Modèle du Header
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

  // 3. Modèle du Footer
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

  // 4. Injection dans les conteneurs HTML dédiés
  const headerContainer = document.getElementById('main-header');
  const footerContainer = document.getElementById('main-footer');

  if (headerContainer) headerContainer.innerHTML = headerHTML;
  if (footerContainer) footerContainer.innerHTML = footerHTML;
});

/* Gestion du menu mobile */
function toggleMobileMenu() {
  const navMenu = document.getElementById('nav-menu');
  if (navMenu) {
    navMenu.classList.toggle('mobile-open');
  }
}
