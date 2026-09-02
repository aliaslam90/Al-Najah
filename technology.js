const workflowRows = [
  {
    image: '/assets/technology-page/scanning.png',
    icon: '/assets/technology-page/scan.svg',
    eyebrow: 'Intraoral Scanning',
    title: 'Digital impressions, sub-micron accurate',
    copy: 'We accept open STL/PLY from any major scanner and run 3Shape E4 and Medit lab scanners in-house, eliminating impression distortion and remakes.'
  },
  {
    image: '/assets/technology-page/design.png',
    icon: '/assets/technology-page/design.svg',
    eyebrow: 'Digital Design',
    title: 'Cad/Cam',
    copy: 'Every case is drafted with Smile Composer. You receive a 3D preview to approve before a single block is milled.'
  },
  {
    image: '/assets/technology-page/manufacturing.png',
    icon: '/assets/technology-page/manufacturing.svg',
    eyebrow: 'Manufacturing',
    title: 'Manufacturing',
    copy: 'Roland DWX-52DCi and VHF K5+ six-axis mills handle zirconia, titanium, and PMMA, wet and dry, with weekly calibration.'
  },
  {
    image: '/assets/technology-page/post-processing.png',
    icon: '/assets/technology-page/printing.svg',
    eyebrow: '3D Printing',
    title: 'Post-processing',
    copy: 'Formlabs Form 4B and Asiga MAX UV printers produce surgical guides, working models, and aesthetic try-ins in-house, keeping turnaround fast.'
  }
];

const stack = [
  ['scan.svg','Scanning','Lab & Intraoral Scanners','3Shape E4 and Medit i700 systems. Sub-micron accuracy with full impression and model digitization.',['3Shape E4','Medit i700 chairside link','Open STL import']],
  ['manufacturing.svg','Design','Softwares','3Shape Dental System. Multi-designer collaboration with version control on every case.',['Smile Composer']],
  ['mill.svg','Milling','CAM & Milling','Roland DWX-52DCi and VHF K5+ six-axis mills. Wet and dry milling across zirconia, titanium, and PMMA.',['Roland DWX-52DCi','VHF K5+ 5-axis','imes-icore 250i']],
  ['printing.svg','Printing','3D Printing','Formlabs Form 4B and Asiga MAX UV systems. Surgical guides, models, and try-ins printed in-house overnight.',['Formlabs Form 4B','Asiga MAX UV','Ackuretta SOL']],
  ['materials.svg','Materials','Premium Material Stock','Only original-source materials. Full traceability and shade verification on every block, disc, and ingot.',['Ivoclar e.max','KATANA Zirconia','3M Lava Plus','Vita YZ']],
  ['quality.svg','Quality','QC & Calibration','Three documented quality checkpoints per case. Weekly calibration of all scanners and mills.',['ATOS metrology scan','Shade verification under D65','Marginal fit check']]
];

const steps = [
  ['step-scan.svg','Scan','Upload an intraoral scan or send an impression. Open STL from any major scanner.'],
  ['step-design.svg','Design','A senior designer drafts the restoration in Exocad. You receive a 3D preview.'],
  ['step-approval.svg','Approval','Review the design and sign off or request adjustments before we manufacture.'],
  ['step-manufacturing.svg','Manufacturing','Six-axis milling, 3D printing, layering, and three documented QC checkpoints.'],
  ['step-delivery.svg','Delivery','Sterile-packed delivery to your clinic, with follow-up after seating.']
];

const guidance = [
  ['scan.svg','Scanning best practice','Keep the field dry, capture margins last, and avoid scan jumps. We accept TRIOS, Medit, iTero, Primescan, and Carestream exports.'],
  ['file.svg','File formats we accept','Open STL and PLY from any scanner, plus a completed Rx. No proprietary lock-in—send what your system exports.'],
  ['shade.svg','Communicating shade','Send shade photos under D65 daylight with a tab in frame. Free try-in available for high-stakes aesthetic cases.'],
  ['support.svg','Direct technician support','Talk to the technician handling your case—not a call centre. Reach us by phone, email, or the portal chat.']
];

const icon = name => `<img src="/assets/technology-page/${name}" alt="" aria-hidden="true">`;

export const renderTechnology = () => `
  <header class="tech-hero">
    <div class="eyebrow">Technology</div>
    <h1>Digital workflow, human judgment.</h1>
    <p>The hardware, software, and people that turn a scan into a seated restoration <br>with the same precision, every case.</p>
  </header>

  <section class="tech-showcase" aria-label="Technology workflow">
    ${workflowRows.map((row, index) => `
      <article class="tech-showcase-row ${index % 2 ? 'reverse' : ''}">
        <div class="tech-showcase-image"><img src="${row.image}" alt="" loading="lazy"></div>
        <div class="tech-showcase-copy">
          <span class="tech-icon">${icon(row.icon.split('/').pop())}</span>
          <div class="eyebrow">${row.eyebrow}</div>
          <h2>${row.title}</h2>
          <p>${row.copy}</p>
        </div>
      </article>`).join('')}
  </section>

  <section class="tech-stack tech-surface">
    <div class="tech-section-heading">
      <div class="eyebrow">The Full Stack</div>
      <h2>Equipment, software,<br><i>and the people behind it.</i></h2>
    </div>
    <div class="tech-stack-grid">
      ${stack.map(card => `<article class="tech-stack-card">
        <div class="tech-card-top"><span class="tech-icon">${icon(card[0])}</span><span class="eyebrow">${card[1]}</span></div>
        <h3>${card[2]}</h3><p>${card[3]}</p>
        <ul>${card[4].map(item => `<li>· ${item}</li>`).join('')}</ul>
      </article>`).join('')}
    </div>
  </section>

  <section class="tech-process">
    <div class="tech-process-intro">
      <div><div class="eyebrow">Digital Workflow</div><h2>From scan to seat,<br><i>in five clear steps.</i></h2></div>
      <p>Every case follows the same documented path—you always know exactly<br>where your restoration is in the lab.</p>
    </div>
    <div class="tech-steps">
      ${steps.map((step,index) => `<article><div class="tech-step-icon"><span>${icon(step[0])}</span><b>${index+1}</b></div><h3>${step[1]}</h3><p>${step[2]}</p></article>`).join('')}
    </div>
  </section>

  <section class="tech-qc tech-surface">
    <div class="tech-section-heading"><div class="eyebrow">Quality Control</div><h2>Three checkpoints,<br><i>documented on every case.</i></h2></div>
    <div class="tech-qc-grid">
      <article><strong>1</strong><h3>Design QC</h3><p>Senior CAD designer reviews margin definition, occlusal contacts, and contour before milling. 3D preview signed off.</p></article>
      <article><strong>2</strong><h3>Post-mill QC</h3><p>Marginal fit measured under microscope at 10x. Internal adaptation checked against verified model.</p></article>
      <article><strong>3</strong><h3>Pre-dispatch QC</h3><p>Shade verified under D65 daylight. Contact strength, surface polish, and packaging signed by QC lead.</p></article>
    </div>
  </section>

  <section class="tech-guidance tech-surface">
    <div class="tech-section-heading"><div class="eyebrow">Guidance & Support</div><h2>Get the best<br><i>from every case.</i></h2></div>
    <div class="tech-guidance-grid">
      ${guidance.map(item => `<article><span class="tech-icon">${icon(item[0])}</span><div><h3>${item[1]}</h3><p>${item[2]}</p></div></article>`).join('')}
    </div>
    <div class="tech-guidance-actions"><a class="btn" href="contact.html#start">Contact a Technician ↗</a><a class="btn tech-outline-btn" href="faq.html">Read the FAQ</a></div>
  </section>
`;
