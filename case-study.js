import { findCaseStudy, caseStudies } from './case-data.js';

const arrow = '<img class="icon" src="/assets/icons/arrow.svg" alt="" width="16" height="16">';

export function renderCaseStudy() {
  const current = findCaseStudy(new URLSearchParams(location.search).get('case'));
  const currentIndex = caseStudies.indexOf(current);
  const next = caseStudies[(currentIndex + 1) % caseStudies.length];
  document.title = `${current.title} — Al Najah Dental Lab`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', `${current.title}: a ${current.categoryLabel.toLowerCase()} dental laboratory case study by Al Najah.`);
  return `<article class="case-detail">
    <header class="cd-hero">
      <div class="cd-hero-media"><img src="/assets/cases-page/${current.image}" alt="${current.title}"></div>
      <div class="cd-hero-shade"></div>
      <div class="cd-hero-copy"><a href="/cases.html">← Back to case studies</a><p>${current.categoryLabel} · ${current.units}</p><h1>${current.title}</h1></div>
    </header>
    <section class="cd-intro">
      <div><p class="eyebrow">Case Overview</p><h2>Precision built around the patient.</h2></div>
      <p>This representative case study demonstrates the collaborative planning, material control, and documented quality checks behind every Al Najah restoration. The clinical details are placeholder content ready for your final case notes.</p>
    </section>
    <section class="cd-facts" aria-label="Case facts">
      ${[['Restoration',current.units],['Material',current.material],['Workflow',current.workflow],['Turnaround',current.turnaround],['Shade',current.shade]].map(([label,value])=>`<div><small>${label}</small><strong>${value}</strong></div>`).join('')}
    </section>
    <section class="cd-story">
      <div class="cd-story-image"><img src="/assets/cases-page/${current.image}" alt="Close view of ${current.title}" loading="lazy"></div>
      <div class="cd-story-copy"><article><span>01</span><div><p class="eyebrow">The Challenge</p><h2>Clinical brief</h2><p>${current.challenge}</p></div></article><article><span>02</span><div><p class="eyebrow">Our Approach</p><h2>Laboratory solution</h2><p>${current.solution}</p></div></article></div>
    </section>
    <section class="cd-process"><div><p class="eyebrow">Documented Workflow</p><h2>From scan to final<br><i>with clarity at every step.</i></h2></div><ol>${['Case intake & clinical review','Digital design & clinician approval','Precision manufacturing','Characterization & finishing','Final quality control'].map((step,i)=>`<li><span>0${i+1}</span><strong>${step}</strong></li>`).join('')}</ol></section>
    <a class="cd-next" href="/case-study.html?case=${next.slug}"><span><small>Next case study</small><strong>${next.title}</strong></span>${arrow}</a>
  </article>`;
}
