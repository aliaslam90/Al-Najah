import { caseStudies } from './case-data.js';

export function initializeHomeGallery() {
  const featured = document.querySelector('.page-index .hp-gallery');
  if (!featured || document.querySelector('[data-home-gallery]')) return;
  const cards = caseStudies.map(item => `<a class="home-gallery-card" href="/case-study.html?case=${item.slug}">
    <img src="/assets/cases-page/${item.image}" alt="${item.title}" loading="lazy" width="640" height="480">
    <span>${item.title}</span></a>`).join('');
  featured.insertAdjacentHTML('afterend', `<section class="hp-gallery home-gallery" data-home-gallery aria-label="Case study photo gallery">
    <div class="hp-section-head"><div><p class="hp-kicker">Our Gallery</p><h2>Crafted for every<br><i>smile.</i></h2></div>
    <div class="home-gallery-actions">
    <a class="hp-outline" href="/cases.html">View full gallery ↗</a></div></div>
    <div class="home-gallery-window"><div class="home-gallery-track">
      <div class="home-gallery-group">${cards}</div>
      <div class="home-gallery-group" aria-hidden="true" inert>${cards}</div>
    </div></div></section>`);
}
