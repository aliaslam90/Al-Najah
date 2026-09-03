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
      <h1>Get in touch</h1>
      <p>Reach out for a partnership conversation, a price list, or just to talk <br>through a tricky case. We respond fast.</p>
    </header>
    <section class="contact-locations" aria-label="Abu Dhabi location">
      <div class="contact-address-card">
        <div class="contact-address-list">
          ${details.map(([icon, text, href]) => `<div class="contact-address-row">${contactIcon(icon)}${href ? `<a href="${href}">${text}</a>` : `<span>${text}</span>`}</div>`).join('')}
        </div>
      </div>
      <div class="contact-map-card">
        <iframe
          class="contact-map-iframe"
          title="Al Najah Technology Dental Lab Location Map"
          src="https://maps.google.com/maps?q=Al%20Danah%20Zone%201%20Abu%20Dhabi%20UAE&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          loading="lazy"
          allowfullscreen=""
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
        <div class="contact-map-note">
          <span>Find Us</span>
          <p>Al Najah Technology Dental Lab<br>Al Danah, Zone 1 – Abu Dhabi, UAE</p>
          <a href="https://maps.google.com/?q=Al+Danah+Zone+1+Abu+Dhabi+UAE" target="_blank" rel="noopener noreferrer" class="contact-map-link">Get Directions ↗</a>
        </div>
      </div>
    </section>`;
}
