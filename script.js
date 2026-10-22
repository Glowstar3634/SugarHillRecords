/* Sugar Hill / V1 — shared interactions and data-driven previews */
(() => {
  'use strict';
  document.documentElement.classList.add('js-enabled');
  const data = window.SUGAR_HILL_DATA;
  if (!data) return;
  const $ = (sel, scope = document) => scope.querySelector(sel);
  const escape = (text) => String(text).replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
  const root = document.body.dataset.root || './';
  const activePage = document.body.dataset.page || 'home';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Routing: directory-based URLs remain functional on GitHub Pages and
     local HTTP servers, even when the site is hosted under a repo subpath. */
  const menuItems = data.navigation.map(({ label, path }) => {
    const isCurrent = (path === '' && activePage === 'home') || path.replace('/', '') === activePage;
    return `<a href="${root + path}"${isCurrent ? ' aria-current="page"' : ''}>${escape(label)}</a>`;
  }).join('');
  if ($('#desktop-nav')) $('#desktop-nav').innerHTML = menuItems;
  if ($('#mobile-nav')) $('#mobile-nav').innerHTML = menuItems;
  if ($('#footer-nav')) $('#footer-nav').innerHTML = menuItems;
  if ($('#current-year')) $('#current-year').textContent = String(new Date().getFullYear());

  const menuButton = $('#menu-toggle');
  const menu = $('#mobile-menu');
  let previousFocus = null;
  function closeMenu(returnFocus = false) {
    if (!menuButton || !menu) return;
    menu.classList.remove('is-open');
    menuButton.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    menu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    if (returnFocus) (previousFocus || menuButton).focus();
  }
  function openMenu() {
    previousFocus = document.activeElement;
    menu.classList.add('is-open');
    menuButton.classList.add('is-open');
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Close navigation');
    menu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    const firstLink = $('a', menu); if (firstLink) firstLink.focus();
  }
  if (menuButton && menu) {
    menuButton.addEventListener('click', () => menu.classList.contains('is-open') ? closeMenu(true) : openMenu());
    menu.addEventListener('click', ev => { if (ev.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', ev => {
      if (ev.key === 'Escape' && menu.classList.contains('is-open')) closeMenu(true);
      if (ev.key !== 'Tab' || !menu.classList.contains('is-open')) return;
      const tabs = [menuButton, ...menu.querySelectorAll('a')];
      const first = tabs[0], last = tabs[tabs.length - 1];
      if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
      else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
    });
    window.addEventListener('resize', () => { if (window.innerWidth > 850 && menu.classList.contains('is-open')) closeMenu(); });
  }
  const header = $('#site-header');
  const updateHeader = () => header && header.classList.toggle('is-scrolled', window.scrollY > 40);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* Reveals: default-visible HTML, progressive enhancement. */
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('is-visible'); observer.unobserve(entry.target);
      }
    }, { threshold: .08, rootMargin: '0px 0px -25px 0px' });
    reveals.forEach(el => observer.observe(el));
  }

  /* Home: data-driven release cards and physical-record interaction. */
  const releaseGrid = $('#release-grid');
  if (releaseGrid) {
    releaseGrid.innerHTML = data.releases.map((r, i) => `
      <button class="release-card ${i === 0 ? 'is-selected' : ''}" type="button"
          data-release-id="${escape(r.id)}" aria-pressed="${i === 0 ? 'true' : 'false'}"
          aria-label="Select ${escape(r.title)}, ${escape(r.artist)}">
        <span class="release-card-top"><span>SUGAR HILL RECORDS</span><span>${escape(r.number)} / 04</span></span>
        <span class="sleeve ${escape(r.palette)}" aria-hidden="true">
          <span class="sleeve-ornament"></span><span class="sleeve-content"><span class="sleeve-top">SUGAR HILL</span>
          <span class="sleeve-monogram">${escape(r.monogram)}</span><span class="sleeve-name">${escape(r.title)}</span><span class="sleeve-year">${escape(r.year)}</span></span>
        </span>
        <span class="release-card-bottom"><span><b>${escape(r.title)}</b><small>${escape(r.artist)}</small></span><span class="release-card-arrow" aria-hidden="true">↗</span></span>
      </button>`).join('');
    const chooseRelease = (id) => {
      const release = data.releases.find(r => r.id === id);
      if (!release) return;
      releaseGrid.querySelectorAll('button').forEach(btn => {
        const selected = btn.dataset.releaseId === id;
        btn.classList.toggle('is-selected', selected);
        btn.setAttribute('aria-pressed', String(selected));
      });
      const set = (selector, value) => { const node = $(selector); if (node) node.textContent = value; };
      set('#feature-count', `${release.number} / 04`);
      set('#feature-year', release.year);
      set('#feature-artist', release.artist);
      set('#feature-title', release.title);
      set('#feature-description', release.description);
      const label = $('#feature-record .feature-record-label');
      if (label) {
        const hue = { sky: '#79bdd8', rust: '#cd6547', gold: '#ddae4e', rose: '#dca2a8' };
        label.style.background = hue[release.palette] || hue.sky;
      }
    };
    releaseGrid.addEventListener('click', event => {
      const card = event.target.closest('[data-release-id]');
      if (card) chooseRelease(card.dataset.releaseId);
    });
  }

  /* Home: artist cards. External Commons photographs are credited in README.
     Artwork remains designed even when blocked / offline. */
  const artistsGrid = $('#artists-grid');
  if (artistsGrid) artistsGrid.innerHTML = data.artists.map(artist => `
    <a class="artist-card ${escape(artist.className)}" href="${root}artists/" aria-label="Explore ${escape(artist.name)} in Artists">
      <div class="artist-photo-fallback"></div>
      <img class="artist-photo" src="${escape(artist.image)}" loading="lazy" alt="${escape(artist.imageAlt)}" style="object-position:${escape(artist.position)}" onerror="this.style.display='none'" />
      <div class="artist-card-head"><span>${escape(artist.number)} / 03</span><span>SUGAR HILL FAMILY</span></div>
      <div class="artist-card-bottom"><span class="artist-category">${escape(artist.category)}</span><h3 class="artist-name">${escape(artist.name)}</h3><div class="artist-bottom-line"><span>${escape(artist.years)}</span><span aria-hidden="true">↗</span></div></div>
    </a>`).join('');

  /* Home: dynamic archive tile construction. Concept sleeve and paper prints
     are deliberately graphical, not presented as original historical artifacts. */
  const archiveGallery = $('#archive-gallery');
  if (archiveGallery) archiveGallery.innerHTML = data.archives.map(item => {
    let backdrop = '';
    if (item.kind === 'portrait') backdrop = `<img src="${escape(item.image)}" loading="lazy" alt="Sylvia Robinson at her Sugar Hill office in 1982" onerror="this.style.display='none'" />`;
    if (item.kind === 'records') backdrop = '<div class="archive-record-graphic" aria-hidden="true"></div>';
    if (item.kind === 'press') backdrop = '<div class="archive-print-graphic" aria-hidden="true"><span class="newspaper-mast">THE ARCHIVE / PRINT EDITION</span><span class="newspaper-title">A NEW SOUND ARRIVES</span><span class="newspaper-small">A CONCEPTUAL EDITORIAL STUDY · NOT A HISTORICAL ARTICLE</span><span class="newspaper-lines"></span></div>';
    return `<a class="archive-card archive-${escape(item.kind)}" href="${root}archives/" aria-label="Explore archive category ${escape(item.title)}">
      <div class="archive-card-bg">${backdrop}</div><div class="archive-card-top"><span>ARCHIVE / ${escape(item.number)}</span><span>↗</span></div>
      <div class="archive-card-content"><span>${escape(item.eyebrow)}</span><h3>${escape(item.title)}</h3><p>${escape(item.description)}</p><div class="archive-card-bottom"><span>EXPLORE CATEGORY</span><b aria-hidden="true">↗</b></div></div>
    </a>`;
  }).join('');
})();
