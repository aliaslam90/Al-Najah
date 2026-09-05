import heroVideoUrl from './hero-video/video.mp4?url';

const A='/assets/home/';
const fig=(name,alt='')=>`<img src="${A}${name}" alt="${alt}">`;
const arrow='↗';
const caseHref=slug=>`case-study.html?case=${slug}`;

const technology=[
  ['424-2494-img-svg1.svg','Intraoral Scanning','Open-system digital impressions with sub-micron accuracy from any major scanner.'],
  ['424-2494-img-svg2.svg','Digital Design','Restorations designed by senior technicians in Software with full version control.'],
  ['424-2494-img-svg3.svg','CAD/CAM','End-to-end computer-aided design and manufacturing for consistent, repeatable results.'],
  ['424-2494-img-svg4.svg','Milling Technologies','Six-axis wet and dry milling across zirconia, titanium, and PMMA.'],
  ['424-2494-img-svg5.svg','3D Printing','In-house printing of models, surgical guides, and try-ins often overnight.']
];
const featuredCases=[
  ['424-2585-img-anterior-lithium-disilicate-veneers.png','Aesthetic · 8 units','Anterior Lithium Disilicate Veneers','anterior-veneers'],
  ['424-2585-img-article.png','Implant · 12 units','Single & Full Arch','full-arch-zirconia'],
  ['424-2585-img-article1.png','Restorative · 4 units','Interior & Posterior Crown & Bridge','posterior-crowns'],
  ['424-2585-img-article2.png','Removable','Full dentures and partial, orthodontic appliances','digital-denture']
];
const services=[
  ['Fixed','Prosthetics','Crowns, bridges, and inlays crafted with precision for lasting aesthetics and function.'],
  ['Removable Prosthetics','', 'Complete and partial dentures designed for comfort, fit, and natural appearance.'],
  ['Implant Solutions','', 'Custom abutments, screw-retained crowns, and implant-supported bridges.'],
  ['Aesthetic and Cosmetic','', 'Veneers, smile design, and layered restorations for exceptional cosmetic results.'],
  ['Orthodontic Appliances','', 'Retainers, aligners, and functional appliances fabricated to specification.']
];
const workflow=[
  ['424-2716-img-svg.svg','Scan','Upload an intraoral scan or send an impression. Open STL from any major scanner.'],
  ['424-2716-img-svg1.svg','Design','A senior designer drafts the restoration in Software. You receive a 3D preview.'],
  ['424-2716-img-svg2.svg','Approval','Review the design and sign off or request adjustments before we manufacture.'],
  ['424-2716-img-svg3.svg','Manufacturing','Six-axis milling, 3D printing, layering, and three documented QC checkpoints.'],
  ['424-2716-img-svg4.svg','Delivery','Sterile-packed delivery to your clinic, with follow-up after seating.']
];
const capabilities=['Advanced Digital CAD/CAM Workflow','Expert Implant and Full Arch Solutions','Premium Certified Materials','Multi Stage Quality Assurance','Predictable Turnaround Times','Dedicated Technical Support','Personalized Communication','Trusted by Leading Dental Clinics'];
const benefits=[
  ['424-2862-img-svg.svg','Quality Control','Three documented checkpoints per case — design, post-mill, and pre-dispatch — every restoration signed off.'],
  ['424-2862-img-svg1.svg','Innovation','Continuous investment in scanning, milling, and printing keeps us at the front of digital dentistry.'],
  ['424-2862-img-svg2.svg','Clinician Support','Discussions with Technicaion about your case Directaly'],
  ['424-2862-img-svg3.svg','Fast Turnaround','Average on single units, with rush available across the Middle East.']
];
const testimonials=[
  ['The precision of their zirconia restorations is unmatched. We rarely need chairside adjustments, which saves us significant time and keeps our patients delighted.','Dr. Ahmed','Dubai Premier Dental · Dubai, UAE','A'],
  ['Every case arrives beautifully finished and on schedule. Their technicians communicate clearly and solve complex details before they ever reach the chair.','Dr. Sara','Gulf Smile Clinic · Abu Dhabi, UAE','S'],
  ['Their digital workflow gives our team confidence. Design approvals are fast, predictable, and genuinely collaborative.','Dr. Omar','Pearl Dental Centre · Doha, Qatar','O'],
  ['Al Najah has become a trusted extension of our clinic — precise work, thoughtful support, and remarkable consistency.','Dr. Lina','The Dental Studio · Manama, Bahrain','L']
];
const partnerLogos=[['424-2919-img-datron-logo1.png','Datron'],['424-2919-img-dynamic-abutment-logo1.png','Dynamic Abutment Solutions'],['424-2919-img-ivoclar-logo1.png','Ivoclar'],['424-2919-img-vita-dental-lab-logo1.png','Vita']];

export function renderHomepage(){return `
  <div class="home-page">
    <section class="hp-hero" aria-label="Engineered Restorations">
      <video class="hp-hero-media" autoplay muted loop playsinline preload="metadata" poster="${A}424-2387-img-photo160681184168923dfddce3e95.png" aria-label="Precision dental laboratory manufacturing in progress"><source src="${heroVideoUrl}" type="video/mp4"></video>
      <div class="hp-hero-shade"></div><div class="hp-hero-copy"><h1>Engineered Restorations</h1><a class="hp-pill dark" href="#start">Start a Case <span>${arrow}</span></a></div>
      <a class="hp-scroll" href="#foundation">Scroll <span>⌄</span></a>
    </section>
    <section class="hp-stats" aria-label="Laboratory statistics">${[['600+','Partner Clinics'],['14+','Years of Experience'],['500K+','Cases Delivered'],['3 days','Average Turnaround']].map(([n,l])=>`<div><strong>${n}</strong><span>${l}</span></div>`).join('')}</section>

    <section class="hp-foundation hp-rounded" id="foundation"><div class="hp-foundation-copy"><p class="hp-kicker">Our Foundation</p><h2>Built on Craft.<br><i>Driven by Care.</i></h2><p>For over 14 years, Al Najah has been the trusted partner for dental clinics across the Middle East. We combine traditional master craftsmanship with cutting-edge digital workflows to deliver restorations that fit, function, and feel exceptional.</p><a class="hp-pill dark" href="about.html">About Our Lab <span>${arrow}</span></a></div><div class="hp-foundation-cards"><article><span>1&nbsp;&nbsp; Vision</span><h3>Leading the Middle East</h3><p>To be the region's most trusted dental laboratory, recognized for uncompromising quality, innovation, and partnership with clinicians who demand excellence.</p></article><article><span>2&nbsp;&nbsp; Mission</span><h3>Precision in every case</h3><p>To deliver premium dental prosthetics through precision craftsmanship, advanced technology, and direct collaboration, ensuring every case restores confidence and function.</p></article></div></section>

    <section class="hp-technology hp-band"><div class="hp-two-head"><div><p class="hp-kicker">Digital Dentistry</p><h2>Technology that earns<br><i>clinical confidence.</i></h2></div><div><p>Every restoration runs through a fully digital pipeline — scanning, design, milling, and printing — operated by technicians who treat the software as a tool, not a shortcut.</p><a href="technology.html">Explore our technology <span>${arrow}</span></a></div></div><div class="hp-tech-grid">${technology.map(([ic,h,p])=>`<article><span class="hp-icon">${fig(ic)}</span><h3>${h}</h3><p>${p}</p></article>`).join('')}</div></section>

    <section class="hp-cases hp-band"><div class="hp-section-head"><div><p class="hp-kicker">Featured Cases</p><h2>Selected work, with the clinical<br><i>detail that matters.</i></h2></div><a href="cases.html">View full case studies <span>${arrow}</span></a></div><div class="hp-case-grid">${featuredCases.map(([im,k,h,slug],i)=>`<a class="hp-case hp-case-${i+1}" href="${caseHref(slug)}">${fig(im,h)}<span class="hp-photo-shade"></span><span class="hp-case-copy"><small>${k}</small><strong>${h}</strong></span></a>`).join('')}</div></section>

    <section class="hp-services"><div class="hp-two-head"><div><p class="hp-kicker">Our Services</p><h2>Comprehensive<br><i>dental solutions.</i></h2></div><p>From fixed prosthetics to digital workflows, every restoration delivered with precision, care, and master craftsmanship.</p></div><div class="hp-service-grid">${services.map(([h,i,p],n)=>`<a class="hp-service-card hp-service-${n+1}" href="services.html"><span class="hp-card-top">[ ${n+1} ] <b>${arrow}</b></span><span class="hp-service-copy"><strong>${h}${i?` <i>${i}</i>`:''}</strong><small>${p}</small>${n===0?'<em>Most Requested</em>':''}</span></a>`).join('')}</div></section>

    <section class="hp-workflow"><div class="hp-workflow-head"><p class="hp-kicker">Digital Workflow</p><h2>From scan to seat,<br><i>in five clear steps.</i></h2><p>Every case follows the same documented path, you always know exactly where your restoration is in the lab.</p></div><div class="hp-workflow-grid">${workflow.map(([ic,h,p],i)=>`<article><span class="hp-step-icon">${fig(ic)}<b>${i+1}</b></span><h3>${h}</h3><p>${p}</p></article>`).join('')}</div></section>

    <section class="hp-choose hp-rounded"><div class="hp-choose-head"><p class="hp-kicker">Why Choose Us</p><h2><i>Where every case is treated like<br>it carries your name.</i></h2></div><div class="hp-promise"><article><span>The Promise</span><h3>A restoration is never just a restoration.</h3><p>It is a patient sitting in your chair, trusting that what you place will feel like it was always theirs. We build for that moment, and we have done so since 2012.</p></article><div><p>We design the entire process so the work fits the first time, from the first scan to the case in your hand. When we give you a date, we mean it. When you call, a real person who knows your case answers. And when a patient smiles at the result, that is the only review we are working for.</p><p>This is what a partnership feels like when precision, honesty, and care are not promises on a page, but the way we work every single day.</p><blockquote>Bring us your most difficult case. That is where we do our best work.</blockquote></div></div><h3 class="hp-possible"><i>What Makes This Possible</i></h3><div class="hp-cap-grid">${capabilities.map((x,i)=>`<article><b>${i+1}</b><span>${x}</span></article>`).join('')}</div></section>

    <section class="hp-benefits"><p class="hp-kicker">Why Choose Us</p><h2>Get the best<br><i>from every case.</i></h2><div class="hp-benefit-grid">${benefits.map(([ic,h,p])=>`<article><span class="hp-icon white">${fig(ic)}</span><h3>${h}</h3><p>${p}</p></article>`).join('')}</div></section>

    <section class="hp-partners hp-band" aria-label="Technology partners"><p class="hp-kicker">Trusted Across the Gulf</p><h2>Partners</h2><div class="hp-logo-viewport"><div class="hp-logo-grid" data-partner-track>${[...partnerLogos,...partnerLogos].map(([im,a],i)=>`<div class="hp-logo-slide" ${i>=partnerLogos.length?'aria-hidden="true"':''}>${fig(im,a)}</div>`).join('')}</div></div></section>

    <section class="hp-gallery"><div class="hp-section-head"><div><p class="hp-kicker">Featured Work</p><h2>FIXED &amp; Removable<br>PROSTHETICS</h2></div><a class="hp-outline" href="cases.html">View Full Gallery <span>${arrow}</span></a></div></section>

    <section class="hp-testimonials"><div class="hp-test-copy"><p class="hp-kicker">Patient Stories</p><h2>Trusted by<br><i>Middle East clinicians.</i></h2><p>Real experiences from our clinic partners — leaders in their fields who depend on Al Najah for exceptional results.</p><div class="hp-test-controls"><button type="button" data-test-prev aria-label="Previous testimonial">←</button><button type="button" data-test-next aria-label="Next testimonial">→</button><span data-test-count>1 / 4</span><div class="hp-test-dots" data-test-dots>${testimonials.map((_,i)=>`<button type="button" class="hp-test-dot ${i===0?'active':''}" data-test-dot="${i}" aria-label="Go to testimonial ${i+1}"></button>`).join('')}</div></div></div><div class="hp-test-card" data-test-card data-testimonials='${JSON.stringify(testimonials)}'><div class="hp-stars">★★★★★</div><blockquote data-test-quote>“${testimonials[0][0]}”</blockquote><div class="hp-person"><span data-test-initial>${testimonials[0][3]}</span><p><b data-test-name>${testimonials[0][1]}</b><small data-test-place>${testimonials[0][2]}</small></p></div></div></section>
  </div>`}
