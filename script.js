// Pixcel Studio — content renderer
// Everything on this page (services, work, testimonials, stats, contact info)
// is pulled from content/content.json. Edit that file (or use the CMS at /admin)
// and the site updates automatically — no HTML/CSS editing required.

async function loadContent() {
  try {
    const res = await fetch('content/content.json', { cache: 'no-store' });
    const data = await res.json();
    render(data);
  } catch (err) {
    console.error('Could not load content.json', err);
  }
}

function render(data) {
  // Hero text
  setText('.hero-title', data.site.tagline);
  setText('.hero-sub', data.site.subheading);

  // Stats
  const statsRow = document.getElementById('statsRow');
  statsRow.innerHTML = data.stats.map(s => `
    <div class="stat">
      <div class="stat-num">${escapeHtml(s.number)}</div>
      <div class="stat-label">${escapeHtml(s.label)}</div>
    </div>
  `).join('');

  // Services
  const swatchClass = { coral: 'swatch-coral', cobalt: 'swatch-cobalt', sunbeam: 'swatch-sunbeam' };
  const servicesGrid = document.getElementById('servicesGrid');
  servicesGrid.innerHTML = data.services.map(s => `
    <div class="service-card">
      <div class="service-swatch ${swatchClass[s.swatch] || 'swatch-coral'}"></div>
      <h3>${escapeHtml(s.title)}</h3>
      <p>${escapeHtml(s.description)}</p>
      <ul class="service-list">
        ${s.deliverables.map(d => `<li>${escapeHtml(d)}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  // Work
  const toneClass = { Branding: 'tone-coral', Packaging: 'tone-cobalt', 'Social Media Creatives': 'tone-sunbeam' };
  const workGrid = document.getElementById('workGrid');
  workGrid.innerHTML = data.works.map(w => `
    <div class="work-card size-${w.size} ${toneClass[w.category] || ''}" data-cat="${escapeHtml(w.category)}">
      <div class="wc-client">${escapeHtml(w.client)}</div>
      <div class="wc-desc">${escapeHtml(w.description)}</div>
    </div>
  `).join('');

  // Testimonials
  const board = document.getElementById('testimonialsBoard');
  board.innerHTML = data.testimonials.map(t => `
    <div class="testimonial-card">
      <p class="testimonial-quote">“${escapeHtml(t.quote)}”</p>
      <div class="testimonial-name">${escapeHtml(t.name)}</div>
      <div class="testimonial-role">${escapeHtml(t.role)}</div>
    </div>
  `).join('');

  // Contact
  const emailEl = document.getElementById('contactEmail');
  emailEl.textContent = data.site.email;
  emailEl.href = `mailto:${data.site.email}`;
  document.getElementById('contactLocation').textContent = data.site.location;
  document.getElementById('contactPhone').textContent = data.site.phone;

  // Footer
  document.getElementById('year').textContent = new Date().getFullYear();
  const footerSocial = document.getElementById('footerSocial');
  const links = [
    ['Instagram', data.site.instagram],
    ['LinkedIn', data.site.linkedin],
    ['Behance', data.site.behance]
  ].filter(([, url]) => !!url);
  footerSocial.innerHTML = links.map(([label, url]) =>
    `<a href="${escapeAttr(url)}" target="_blank" rel="noopener">${escapeHtml(label)}</a>`
  ).join('');
}

function setText(selector, text) {
  const el = document.querySelector(selector);
  if (el && text) el.textContent = text;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}
function escapeAttr(str) {
  return (str ?? '').replace(/"/g, '&quot;');
}

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  loadContent();
  const toggle = document.getElementById('navToggle');
  const links = document.querySelector('.nav-links');
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
});
