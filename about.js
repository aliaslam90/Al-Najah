const principles=[
  ['Precision','Accuracy is not a step in our process. It is our language.'],
  ['Craftsmanship','Excellence is built by hands that care and eyes that understand.'],
  ['Partnership','True partnership means reliability without question and support without noise.'],
  ['Responsibility','Responsibility is the foundation of trust and the measure of our professionalism.'],
  ['Authentic Aesthetics','True aesthetics are felt before they are seen.'],
  ['Innovation','Progress strengthens our craft and supports modern clinical care.'],
  ['Dedication','Dedication is what transforms skill into mastery.']
];

const vision=[
  "To become the region's most trusted premium dental laboratory reference, recognized for precision, natural aesthetics, and unwavering reliability.",
  'We envision a future where dentists rely on Al Najah Dental Lab as their preferred laboratory partner for complex and aesthetic cases, confident that every result will meet the highest standards of quality and authenticity.',
  'Our vision is to elevate laboratory craftsmanship and set a benchmark for excellence that inspires clinicians and advances patient care across the region.'
];

const mission=[
  'To support clinicians in delivering exceptional dentistry through precision-crafted dental solutions that combine advanced technology, aesthetic sensitivity, and disciplined craftsmanship.',
  'We work as an extension of the dentist, refining every detail until each restoration feels natural, accurate, and worthy of the patient who will wear it.',
  'Through innovation, continuous education, and unwavering dedication, we transform laboratory work into a trusted partnership that enhances clinical outcomes and professional confidence.'
];

export function renderAbout(){return `
  <div class="about-page">
    <section class="ap-hero">
      <p class="ap-kicker">About Al Najah Dental Lab</p>
      <h1>The Quiet Art Behind <i>Every Confident Smile</i></h1>
      <p>From a small lab in Abu Dhabi to the Middle East's most trusted prosthetic partner, built one restoration at a time.</p>
    </section>
    <section class="ap-story">
      <div class="ap-story-image"><img src="/assets/about-page/lab-interior.png" alt="Al Najah dental technician hand-finishing a restoration"></div>
      <div class="ap-story-copy">
        <p class="ap-kicker">Our Story</p>
        <h2>The partner behind <i>every dentist's best work.</i></h2>
        <div>
          <p>Behind every Al Najah Dental Lab restoration is a skilled dental technician with an eye for detail and a deep respect for the craft. Our technicians combine hands-on expertise with digital precision, carefully refining every contour, contact, and shade for a result that feels natural to the patient.</p>
          <p>Working closely with clinicians, we bring their vision to life with care and consistency. Every case carries their trust and our responsibility to deliver work worthy of it.</p>
        </div>
      </div>
    </section>
    <section class="ap-direction">
      <article><p class="ap-kicker">Our Vision</p>${vision.map(text=>`<p>${text}</p>`).join('')}</article>
      <article><p class="ap-kicker">Our Mission</p>${mission.map(text=>`<p>${text}</p>`).join('')}</article>
    </section>
    <section class="ap-principles">
      <div class="ap-principles-head"><p class="ap-kicker">What We Stand For</p><h2>Seven principles <i>that shape<br>every case.</i></h2></div>
      <div class="ap-card-grid">${principles.map(([title,text],i)=>`<article><span>${i+1}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div>
    </section>
  </div>`}
