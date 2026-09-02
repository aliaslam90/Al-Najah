export function initializeInteractions() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const menu = document.querySelector('.menu');
  const links = document.querySelector('.links');
  const setMenu = open => {
    links.classList.toggle('mobile-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menu.textContent = open ? 'Close' : 'Menu';
  };
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav') || event.target.closest('.links a')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menu.focus();
    }
  });
  window.matchMedia('(min-width: 1201px)').addEventListener('change', () => setMenu(false));

  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        button.click();
      }
    });
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    panel.inert = button.getAttribute('aria-expanded') !== 'true';
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      button.closest('.faq-item').classList.toggle('open', open);
      const symbol = button.querySelector('.faq-symbol');
      if (symbol) symbol.textContent = open ? '−' : '+';
      panel.inert = !open;
    });
  });

  const filters = document.querySelectorAll('[data-filter]');
  document.querySelectorAll('.service-features li').forEach(item => {
    const check = document.createElement('img');
    check.src = '/assets/icons/check.svg';
    check.className = 'icon';
    check.alt = '';
    check.width = check.height = 14;
    item.prepend(check);
  });
  document.querySelectorAll('.workflow .copy').forEach((copy, index) => {
    const name = ['workflow-scan','workflow-cad','workflow-manufacturing','workflow-finish'][index];
    const icon = document.createElement('img');
    icon.src = '/assets/icons/'+name+'.svg';
    icon.className = 'icon workflow-icon';
    icon.alt = '';
    icon.width = icon.height = 20;
    copy.prepend(icon);
  });
  filters.forEach(button => {
    button.setAttribute('aria-pressed', String(button.classList.contains('selected')));
    button.addEventListener('click', () => {
      filters.forEach(other => {
        other.classList.toggle('selected', other === button);
        other.setAttribute('aria-pressed', String(other === button));
      });
      document.querySelectorAll('.case-card').forEach(card => {
        card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
        if (!card.hidden && !reduceMotion.matches) card.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}], {duration:240,easing:'ease-out'});
      });
    });
  });

  // These forms have no backend. Open a draft, never claim a request was sent.
  document.querySelectorAll('[data-case-form], [data-newsletter]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const isCase = form.hasAttribute('data-case-form');
      const subject = isCase ? 'New case enquiry' : 'Newsletter subscription enquiry';
      const body = isCase
        ? ['Name: '+data.get('name'),'Email: '+data.get('email'),'Clinic: '+data.get('clinic'),'Phone: '+data.get('phone'),'Service: '+data.get('service')].join('\n')
        : 'Please send me information about your newsletter.\nEmail: '+data.get('email');
      const status = form.querySelector('.form-status');
      status.textContent = 'Your email app will open a draft. Review and send it to complete your enquiry.';
      window.location.href = 'mailto:cases@alnajah.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    });
  });

  const testimonialCard = document.querySelector('[data-test-card]');
  if (testimonialCard) {
    const items = JSON.parse(testimonialCard.dataset.testimonials || '[]');
    let current = 0;
    const renderTestimonial = direction => {
      const [quote,name,place,initial] = items[current];
      const update = () => {
        testimonialCard.querySelector('[data-test-quote]').textContent = '“'+quote+'”';
        testimonialCard.querySelector('[data-test-name]').textContent = name;
        testimonialCard.querySelector('[data-test-place]').textContent = place;
        testimonialCard.querySelector('[data-test-initial]').textContent = initial;
        document.querySelector('[data-test-count]').textContent = (current+1)+' / '+items.length;
      };
      if (reduceMotion.matches) return update();
      testimonialCard.animate([{opacity:1,transform:'translateX(0)'},{opacity:0,transform:`translateX(${direction*18}px)`}],{duration:150,easing:'ease-in'}).finished.then(() => {
        update();
        testimonialCard.animate([{opacity:0,transform:`translateX(${-direction*18}px)`},{opacity:1,transform:'translateX(0)'}],{duration:260,easing:'ease-out'});
      });
    };
    document.querySelector('[data-test-prev]').addEventListener('click', () => {current=(current-1+items.length)%items.length;renderTestimonial(-1)});
    document.querySelector('[data-test-next]').addEventListener('click', () => {current=(current+1)%items.length;renderTestimonial(1)});
  }

  document.querySelectorAll('.case-card').forEach(card => {
    const button = document.createElement('button');
    button.className = 'case-open';
    button.type = 'button';
    button.setAttribute('aria-label', 'View '+card.querySelector('h3').textContent);
    button.innerHTML = '<img class="icon" src="/assets/icons/arrow.svg" alt="" width="16" height="16">';
    card.append(button);
    button.addEventListener('click', () => {
      const dialog = document.createElement('dialog');
      dialog.className = 'case-dialog';
      const photo = card.querySelector('img').cloneNode(true);
      const heading = document.createElement('h2');
      heading.textContent = card.querySelector('h3').textContent;
      const close = document.createElement('button');
      close.className = 'btn dialog-close';
      close.textContent = 'Close';
      close.addEventListener('click', () => dialog.close());
      dialog.append(close,photo,heading);
      document.body.append(dialog);
      dialog.addEventListener('close', () => {dialog.remove();button.focus();});
      dialog.addEventListener('click', event => {if(event.target === dialog) dialog.close();});
      dialog.showModal();
    });
  });

  if (!reduceMotion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.06,rootMargin:'0px 0px 24px 0px'});
    document.querySelectorAll('.service-row,.workflow,.section-head,.split,.case-panel,.home-page section').forEach(element => {
      element.classList.add('reveal');
      observer.observe(element);
    });
  }
}
