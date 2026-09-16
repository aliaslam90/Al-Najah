const contactIcon = name => `<img src="${name === 'whatsapp' ? '/assets/icons/whatsapp.png' : `/assets/contact-page/${name}.svg`}" alt="" aria-hidden="true" width="16" height="16">`;

export function renderContact() {
  const details = [
    ['pin', 'Mr. Juma Mubarak Juma Salem Building, 9th floor, Abu Dhabi, United Arab Emirates.', '', 'Visit us'],
    ['phone', '+971527770075', 'tel:+971527770075', 'Call directly'],
    ['phone', '+971252777075', 'tel:+971252777075', 'Landline'],
    ['whatsapp', '+97125587947', 'https://wa.me/97125587947', 'WhatsApp'],
    ['email', 'Info@alnajah-tdl.net', 'mailto:Info@alnajah-tdl.net', 'Email'],
    ['clock', 'Sunday to Friday, 09:00 – 20:00', '', 'Opening hours'],
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
          ${details.map(([icon, text, href, label]) => `<div class="contact-address-row"><span class="icon-disc">${contactIcon(icon)}</span><div class="contact-detail"><small>${label}</small>${href ? `<a href="${href}"${icon === 'whatsapp' ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>` : `<span>${text}</span>`}</div></div>`).join('')}
        </div>
      </div>
      <div class="contact-map-card">
        <iframe
          class="contact-map-iframe"
          title="Al Najah Dental Lab Location Map"
          src="https://maps.google.com/maps?q=Mr.%20Juma%20Mubarak%20Juma%20Salem%20Building%2C%20Abu%20Dhabi%2C%20United%20Arab%20Emirates&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          loading="lazy"
          allowfullscreen=""
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
        <div class="contact-map-note">
          <span>Find Us</span>
          <p>Al Najah Dental Lab<br>Mr. Juma Mubarak Juma Salem Building,<br>9th floor, Abu Dhabi, United Arab Emirates.</p>
          <a href="https://maps.google.com/?q=Mr.+Juma+Mubarak+Juma+Salem+Building,+Abu+Dhabi,+United+Arab+Emirates" target="_blank" rel="noopener noreferrer" class="contact-map-link">Get Directions ↗</a>
        </div>
      </div>
    </section>`;
}
