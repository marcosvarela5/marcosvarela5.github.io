// assets/js/components.js
// Injects shared nav and footer into every page.
// Add <script src="assets/js/components.js"></script> (before other scripts) in every HTML.

(function () {
  // ── Detecto pagina para link activo ──────────────────────────────────
  const currentPage = location.pathname.split('/').pop() || 'index.html';

  const pages = [
    { href: 'index.html',     key: 'menu.home' },
    { href: 'about.html',     key: 'menu.cv' },
    { href: 'portfolio.html', key: 'menu.portfolio' },
    { href: 'contact.html',   key: 'menu.contact' },
    { href: 'map.html',       key: 'menu.map' },
  ];

  const navLinks = pages
    .map(p => `<li>
        <a href="${p.href}"${currentPage === p.href ? ' class="active"' : ''}>
          <span data-i18n="${p.key}"></span>
        </a>
      </li>`)
    .join('\n');

  const flags = [
    { lang: 'en', src: 'assets/img/flags/gb.png',  label: 'English' },
    { lang: 'es', src: 'assets/img/flags/es.png',  label: 'Español' },
    { lang: 'de', src: 'assets/img/flags/de.png',  label: 'Deutsch' },
  ];

  const langButtons = flags
    .map(f => `<button data-set-lang="${f.lang}" aria-label="${f.label}">
        <img src="${f.src}" alt="${f.label}" class="flag-icon">
      </button>`)
    .join('\n');

  // ── Inyeccion del header ───────────────────────────────────────────────────────
  const header = document.querySelector('header');
  if (header) {
    header.innerHTML = `
      <nav>
        <a href="index.html" class="nav-monogram" aria-label="Home">MV</a>
        <button class="menu-toggle" aria-label="Open menu">
          <i class="fas fa-bars"></i>
        </button>
        <ul id="main-menu" class="menu">
          ${navLinks}
        </ul>
        <div class="nav-controls">
          <div class="lang-selector">
            ${langButtons}
          </div>
          <div class="theme-toggle">
            <button id="themeButton" aria-label="Toggle dark mode">
              <i class="fas fa-moon"></i>
            </button>
          </div>
        </div>
      </nav>`;
  }

  // ── Inyeccion del footer ───────────────────────────────────────────────────────
  const footer = document.querySelector('footer');
  if (footer) {
    footer.innerHTML = `
      <p>&copy; ${new Date().getFullYear()} Marcos Varela</p>
      <div class="footer-icons">
        <a href="mailto:marcosf.varelam@gmail.com" aria-label="Email">
          <i class="fas fa-envelope"></i>
        </a>
        <a href="https://github.com/marcosvarela5" target="_blank" rel="noopener" aria-label="GitHub">
          <i class="fab fa-github"></i>
        </a>
        <a href="https://linkedin.com/in/marcosvarela5" target="_blank" rel="noopener" aria-label="LinkedIn">
          <i class="fab fa-linkedin"></i>
        </a>
      </div>
      <p><span data-i18n="footer.contactMe"></span> marcosf.varelam@gmail.com</p>`;
  }
})();