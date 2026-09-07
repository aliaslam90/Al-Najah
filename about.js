const cards=[
  ['precision.svg','Precision First','Every restoration measured, modeled, and verified, never approximated.'],
  ['science.svg','Scientific Rigor','Materials, workflows, & outcomes informed by current literature & clinical evidence.'],
  ['partnership.svg','Clinical Partnership','Direct collaboration with clinicians, case planning.'],
  ['craft.svg','Master Craftsmanship','Senior technicians with 15+ years on every aesthetic case.']
];

export function renderAbout(){return `
  <div class="about-page">
    <section class="ap-hero">
      <p class="ap-kicker">About Al Najah</p>
      <h1>A quarter century <i>of dental craft.</i></h1>
      <p>From a small lab in Abu Dhabi to the Middle East's most trusted prosthetic partner, built one restoration at a time.</p>
    </section>
    <section class="ap-story">
      <div class="ap-story-image"><img src="/assets/about-page/lab-interior.png" alt="Al Najah dental technician hand-finishing a restoration"></div>
      <div class="ap-story-copy">
        <p class="ap-kicker">Our Story</p>
        <h2>The lab behind <i>the smiles clinicians trust.</i></h2>
        <div>
          <p>Al Najah was established in 2012 and is fully licensed by the Department of Health, Abu Dhabi. Over the past several years, new leadership brought in corporate governance, disciplined quality systems, and a digital-first strategy, while keeping the hands-on craftsmanship the lab was built on. Today, a team of 43 specialists, including dental technicians, CAD/CAM designers, implant specialists, and quality control staff, works from a single laboratory in Abu Dhabi, serving clinics across the UAE through scheduled pickup and delivery, and across the wider GCC through digital case workflows.</p>
          <p>We're proud to be a family business, still independently owned, and still obsessive about the things that matter: margins, contacts, occlusion, and shade.</p>
        </div>
      </div>
    </section>
    <section class="ap-principles">
      <div class="ap-principles-head"><p class="ap-kicker">What We Stand For</p><h2>Four principles <i>that shape<br>every case.</i></h2></div>
      <div class="ap-card-grid">${cards.map(([icon,title,text])=>`<article><span><img src="/assets/about-page/${icon}" alt=""></span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div>
    </section>
  </div>`}
