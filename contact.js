const contactIcon = name => `<img src="/assets/contact-page/${name}.svg" alt="" aria-hidden="true" width="16" height="16">`;

export function renderContact() {
  const details = [
    ['pin', 'Al Danah - Zone 1 - Abu Dhabi', ''],
    ['phone', '052 777 0075', 'tel:0527770075'],
    ['email', 'Abu-Dhabi@alnajah.com', 'mailto:Abu-Dhabi@alnajah.com'],
    ['clock', 'Sunday to Friday - 09:00 – 20:00', ''],
  ];

  return `
    <header class="contact-hero">
      <div class="contact-eyebrow">Contact Us</div>
      <h1>Three cities</h1>
      <p>Reach out for a partnership conversation, a price list, or just to talk <br>through a tricky case. We respond fast.</p>
    </header>
    <section class="contact-locations" aria-label="Abu Dhabi location">
      <div class="contact-address-card">
        <div class="contact-address-list">
          ${details.map(([icon, text, href]) => `<div class="contact-address-row">${contactIcon(icon)}${href ? `<a href="${href}">${text}</a>` : `<span>${text}</span>`}</div>`).join('')}
        </div>
      </div>
      <div class="contact-map-card">
        <img src="/assets/contact-page/map.png" alt="Map showing Abu Dhabi and the Gulf region">
        <div class="contact-map-note">
          <span>Find Us</span>
          <p>Al Najah Technology Dental Lab<br>Al Danah, Zone 1 – Abu Dhabi, UAE</p>
        </div>
      </div>
    </section>`;
}
