/* ─── MAIN.JS — Shared Nav & Footer ─────────────────────────── */

document.addEventListener('DOMContentLoaded', async () => {
  let siteData = {};

  try {
    const res = await fetch('data/site.json');
    siteData = await res.json();
  } catch (e) {
    console.warn('Could not load site.json. Make sure you are running a local server.');
  }

  injectNav(siteData);
  injectFooter(siteData);
});

/* ─── NAV ────────────────────────────────────────────────────── */
function injectNav(data) {
  const navEl = document.getElementById('site-nav');
  if (!navEl) return;

  const brand = data.brand || '[ JALYN ANDERSON ]';
  const links = data.nav || [];
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  const linkItems = links.map(link => {
    const isActive = link.href === currentPath || 
      (currentPath === '' && link.href === 'index.html');
    return `<li><a href="${link.href}" class="${isActive ? 'active' : ''}">${link.label}</a></li>`;
  }).join('');

  const mobileLinks = links.map(link => {
    const isActive = link.href === currentPath ||
      (currentPath === '' && link.href === 'index.html');
    return `<a href="${link.href}" class="${isActive ? 'active' : ''}">${link.label}</a>`;
  }).join('');

  navEl.innerHTML = `
    <a href="index.html" class="nav-brand">${brand}</a>
    <ul class="nav-links">${linkItems}</ul>
    <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
    <div class="nav-mobile-menu" id="nav-mobile-menu">
      ${mobileLinks}
    </div>
  `;

  // Hamburger toggle
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

/* ─── FOOTER ─────────────────────────────────────────────────── */
function injectFooter(data) {
  const footerEl = document.getElementById('site-footer');
  if (!footerEl) return;

  const footer = data.footer || {};
  const social = data.socialLinks || {};

  footerEl.innerHTML = `
    <span class="footer-brand">${footer.brand || '[ JALYN ANDERSON ]'}</span>
    <span class="footer-copy">${footer.copyright || '© 2026 Jalyn Anderson'}</span>
    <span class="footer-social" onclick="toggleSocialMenu(this)">
      ${footer.social || '[ SOCIAL ]'}
      <div class="social-dropdown" id="social-dropdown">
        ${social.instagram ? `<a href="${social.instagram}" target="_blank">Instagram</a>` : ''}
        ${social.vimeo    ? `<a href="${social.vimeo}"     target="_blank">Vimeo</a>`     : ''}
        ${social.linkedin ? `<a href="${social.linkedin}"  target="_blank">LinkedIn</a>`  : ''}
      </div>
    </span>
  `;
}

function toggleSocialMenu(el) {
  const dropdown = el.querySelector('.social-dropdown');
  if (dropdown) dropdown.classList.toggle('open');
}

/* ─── INTERSECTION OBSERVER (fade-up helper) ─────────────────── */
// Call this from any page to activate .fade-up elements
function initFadeUp() {
  const elements = document.querySelectorAll('.fade-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}

// Auto-init fade-up on every page
document.addEventListener('DOMContentLoaded', () => {
  // Small delay so Vue can render its elements first
  setTimeout(initFadeUp, 100);
});

// Also export so Vue apps can call it after mounting
window.initFadeUp = initFadeUp;