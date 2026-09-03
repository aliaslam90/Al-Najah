import { caseStudies } from './case-data.js';

export const renderCases = () => `
  <header class="cases-hero">
    <div class="eyebrow">Case Studies</div>
    <h1>A working archive of clinical detail.</h1>
    <p>Recent restorations from across the lab. Filter by category to explore work <br>relevant to your next case.</p>
  </header>
  <section class="cases-archive">
    <div class="filters" aria-label="Filter case studies">
      ${[['all','All'],['fixed','Fixed'],['implants','Implants'],['aesthetic','Aesthetic'],['removable','Removable'],['orthodontic','Orthodontic']].map(([key,label],index)=>`<button class="${index===0?'selected':''}" type="button" data-filter="${key}">${label}</button>`).join('')}
    </div>
    <div class="gallery">
      ${caseStudies.map(item=>`<a class="case-card" data-category="${item.category}" href="/case-study.html?case=${item.slug}" aria-label="Read case study: ${item.title}">
        <img src="/assets/cases-page/${item.image}" alt="${item.title}" loading="lazy">
        <div class="case-category">${item.categoryLabel}</div>
        <div class="case-copy"><small>${item.units}</small><h3>${item.title}</h3></div>
        <span class="case-open" aria-hidden="true"><img class="icon" src="/assets/icons/arrow.svg" alt="" width="16" height="16"></span>
      </a>`).join('')}
    </div>
  </section>
`;
