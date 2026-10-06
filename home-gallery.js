import { caseStudies } from './case-data.js';

export function initializeHomeGallery() {
  const featured = document.querySelector('.page-index .hp-gallery');
  if (!featured || document.querySelector('[data-home-gallery]')) return;
  const cards = caseStudies.map(item => `<a class="home-gallery-card" href="/case-study.html?case=${item.slug}">
    <img src="/assets/cases-page/${item.image}" alt="${item.title}" loading="lazy" width="640" height="480">
    <span>${item.title}</span></a>`).join('');
  featured.classList.add('home-gallery');
  featured.setAttribute('data-home-gallery', '');
  featured.querySelector('.hp-gallery-grid').outerHTML = `
    <div class="home-gallery-window"><div class="home-gallery-track">
      <div class="home-gallery-group">${cards}</div>
      <div class="home-gallery-group" aria-hidden="true">${cards.replaceAll('class="home-gallery-card"', 'class="home-gallery-card" tabindex="-1"')}</div>
    </div></div>`;
  const track = document.querySelector('[data-home-gallery] .home-gallery-track');
  track.addEventListener('mouseover', event => {
    track.classList.toggle('card-hovered', Boolean(event.target.closest('.home-gallery-card')));
  });
  track.addEventListener('mouseout', event => {
    track.classList.toggle('card-hovered', Boolean(event.relatedTarget?.closest?.('.home-gallery-card')));
  });
}
