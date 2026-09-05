import './style.css';
import './interactions.css';
import './home.css';
import './about.css';
import './services.css';
import './education.css';
import './technology.css';
import './cases.css';
import './case-study.css';
import './faq.css';
import './contact.css';
import { initializeInteractions } from './ui.js';
import { renderHomepage } from './home.js';
import { renderAbout } from './about.js';
import { renderServices } from './services.js';
import { renderEducation } from './education.js';
import { renderTechnology } from './technology.js';
import { renderCases } from './cases.js';
import { renderCaseStudy } from './case-study.js';
import { renderFaq } from './faq.js';
import { renderContact } from './contact.js';
const icon=(name,extra='')=>`<img class="icon ${extra}" src="/assets/icons/${name}.svg" alt="" aria-hidden="true" width="20" height="20">`;
const brand=()=>'<img class="brand-logo" src="/assets/icons/logo.png" alt="Al Najah Technology Dental Lab" width="273" height="80">';
const page=(location.pathname.split('/').pop()||'index.html').replace('.html','')||'index';
const pages=[['index','Home'],['about','About Us'],['services','Products & Services'],['technology','Technology'],['education','Education'],['cases','Case Studies'],['faq','FAQ'],['contact','Contact Us']];
const serviceItems=[
  ['Fixed Prosthetics','/services.html#fixed'],
  ['Removable Prosthetics','/services.html#removable'],
  ['Implant Solutions','/services.html#implants'],
  ['Aesthetic & Cosmetic','/services.html#aesthetic'],
  ['Orthodontic Appliances','/services.html#orthodontic']
];
const navItem=([p,n])=>{
  if(p==='services'){
    return `<div class="nav-dropdown ${page==='services'?'active':''}">
      <a class="nav-dropdown-trigger ${page==='services'?'active':''}" ${page==='services'?'aria-current="page"':''} href="/services.html" aria-haspopup="true" aria-expanded="false"><span>${n}</span> ${icon('chevron','dropdown-chevron')}</a>
      <div class="nav-dropdown-menu" role="menu" aria-label="Products & Services menu">
        ${serviceItems.map(([title,href])=>`<a href="${href}" class="dropdown-item" role="menuitem">${title}</a>`).join('')}
      </div>
    </div>`;
  }
  return `<a class="${page===p?'active':''}" ${page===p?'aria-current="page"':''} href="/${p==='index'?'':p+'.html'}">${n}</a>`;
};
const nav=()=>`<a class="skip-link" href="#main">Skip to content</a><div class="nav-wrap"><nav class="nav" aria-label="Main navigation"><a class="logo" href="/" aria-label="Al Najah home">${brand()}</a><div class="links" id="site-links">${pages.map(navItem).join('')}</div><a class="order" href="${page==='about'?'contact.html#start':'#start'}">Order Now ${icon('arrow')}</a><button class="menu" type="button" aria-label="Open navigation" aria-controls="site-links" aria-expanded="false">Menu</button></nav></div>`;
const title=(eye,head,sub)=>`<header class="hero-title"><div class="eyebrow">${eye}</div><h1>${head}</h1><p>${sub}</p></header>`;
const casePanel=()=>`<section class="case-panel" id="start"><div><div class="eyebrow">Start a Case</div><h2>Send us your<br>next case.</h2><p>Partner with Al Najah for precision restorations and end-to-end case support. Submit a brief request, our team responds within one business day.</p><a class="btn" style="background:#fff" href="contact.html">Start a Case</a><div class="contact-actions"><a href="tel:+971527770075"><span class="icon-disc">${icon('phone')}</span><span><small>Call directly</small>+971527770075</span></a><a href="tel:252777075"><span class="icon-disc">${icon('phone')}</span><span><small>Landline</small>252 777075</span></a><a href="mailto:Info@alnajah-tdl.net"><span class="icon-disc">${icon('email')}</span><span><small>Email cases</small>Info@alnajah-tdl.net</span></a></div></div><form class="form" data-case-form><div class="eyebrow">[ Case Request ]</div><div class="form-grid"><label class="wide">Your name *<input name="name" autocomplete="name" placeholder="Dr. Full Name" required></label><label>Email *<input name="email" type="email" autocomplete="email" placeholder="you@clinic.com" required></label><label>Clinic<input name="clinic" autocomplete="organization" placeholder="Clinic name"></label><label>Contact number *<input name="phone" type="tel" autocomplete="tel" placeholder="Contact number" required></label><label>Case type<select name="service"><option>Select service</option><option>Fixed Prosthetics</option><option>Implant Solutions</option></select></label></div><button class="btn" type="submit">Submit Case Request ${icon('arrow')}</button><p style="font-size:11px">Opens an email draft for your review.</p><p class="form-status" role="status"></p></form></section>`;
const footer=()=>`<footer class="footer"><div class="footer-box"><div class="footer-grid"><div><a class="logo" href="/" aria-label="Al Najah home">${brand()}</a><p>Precision dental laboratory services for the Middle East region. Crafted with care, delivered with trust, since 2014.</p><div class="socials">${['instagram','linkedin','facebook'].map(name=>`<span class="social-icon" role="img" aria-label="${name}">${icon(name)}</span>`).join('')}</div></div><div><h4>Company</h4><a href="about.html">About Us</a><a href="cases.html">Gallery</a><a href="technology.html">Digital Workflow</a><a href="contact.html">Contact</a></div><div><h4>Services</h4><a href="services.html">Fixed Prosthetics</a><a href="services.html">Implant Solutions</a><a href="services.html">Aesthetics</a><a href="technology.html">Digital Dentistry</a></div><div><h4>Stay informed</h4><p>Updates on digital dentistry, new capabilities, and clinical insights.</p><form class="newsletter" data-newsletter><label class="sr-only" for="newsletter-email">Email address</label><input id="newsletter-email" name="email" type="email" required placeholder="Email address" autocomplete="email"><button type="submit">Join</button><p class="form-status" role="status"></p></form></div></div><div class="copyright"><span>© 2026 Al Najah Technology Dental Lab. All rights reserved.</span><span>Privacy　 Terms　 <a href="#top" class="back-top">Back to top ${icon('up')}</a></span></div></div></footer>`;
const img=(folder,n)=>`/assets/${folder}/${n}`;
const home=()=>`${renderHomepage()}${casePanel()}`;
const about=()=>renderAbout();
const serviceData=[['Fixed Prosthetics','Crowns, Bridges & Inlays','1.png'],['Removable Prosthetics','Complete & Partial Dentures','7.png'],['Guided Surgery & Restoration','Implant Solutions','11.png'],['Aesthetic & Cosmetic','Veneers & Smile Design','6.png'],['Orthodontic Appliances','Aligners, Retainers & Functional','14.png']];
const services=()=>`${renderServices()}${casePanel()}`;
const technology=()=>`${renderTechnology()}${casePanel()}`;
const education=()=>`${renderEducation()}${casePanel()}`;
const cases=()=>`${renderCases()}${casePanel()}`;
const faq=()=>`${renderFaq()}${casePanel()}`;
const contact=()=>`${renderContact()}${casePanel()}`;
const caseStudy=()=>`${renderCaseStudy()}${casePanel()}`;
const content={index:home,about,services,technology,education,cases,faq,contact,'case-study':caseStudy};
document.title=`${pages.find(x=>x[0]===page)?.[1]||'Al Najah'} — Al Najah Dental Lab`;
document.querySelector('#app').innerHTML=`<div class="shell page-${page}" id="top">${nav()}<main id="main">${(content[page]||home)()}</main>${footer()}</div>`;

initializeInteractions();
