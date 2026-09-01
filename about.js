const cards=[
  ['precision.svg','Precision First','Every restoration measured, modeled, and verified, never approximated.'],
  ['science.svg','Scientific Rigor','Materials, workflows, & outcomes informed by current literature & clinical evidence.'],
  ['partnership.svg','Clinical Partnership','Direct collaboration with clinicians, case planning, not order taking.'],
  ['craft.svg','Master Craftsmanship','Senior technicians with 15+ years on every aesthetic case.']
];

export function renderAbout(){return `
  <div class="about-page">
    <section class="ap-hero">
      <p class="ap-kicker">About Al Najah</p>
      <h1>A quarter century <i>of dental craft.</i></h1>
      <p>From a small lab in Abu Dhabi to the GCC's most trusted prosthetic partner, built one restoration at a time.</p>
    </section>
    <section class="ap-story">
      <div class="ap-story-image"><img src="/assets/about-page/lab-interior.png" alt="Al Najah dental technician hand-finishing a restoration"></div>
      <div class="ap-story-copy">
        <p class="ap-kicker">Our Story</p>
        <h2>The lab behind <i>the smiles clinicians trust.</i></h2>
        <div>
          <p>Al Najah was founded in 2000 by Khaled Al Najah, a master ceramist trained in Munich and Tokyo. The mission was simple: bring uncompromising European prosthetic standards to a region that deserved them.</p>
          <p>Twenty-five years later, the lab has grown to three facilities, 80+ technicians, and 1,200 partner clinics, but the standard has not changed. Every case is handled by a named designer and a named ceramist. Every box leaves the lab with a signed QC card.</p>
          <p>We're proud to be a family business, still independently owned, and still obsessive about the things that matter: margins, contacts, occlusion, and shade.</p>
        </div>
      </div>
    </section>
    <section class="ap-principles">
      <div class="ap-principles-head"><p class="ap-kicker">What We Stand For</p><h2>Four principles <i>that shape<br>every case.</i></h2></div>
      <div class="ap-card-grid">${cards.map(([icon,title,text])=>`<article><span><img src="/assets/about-page/${icon}" alt=""></span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div>
    </section>
  </div>`}
