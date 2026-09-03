export function initializeInteractions() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const menu = document.querySelector('.menu');
  const links = document.querySelector('.links');
  const navWrap = document.querySelector('.nav-wrap');

  // ──────────────────────────────────────────
  //  Mobile menu
  // ──────────────────────────────────────────
  const setMenu = open => {
    links.classList.toggle('mobile-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menu.textContent = open ? 'Close' : 'Menu';
  };
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav') || (event.target.closest('.links a') && !event.target.closest('.nav-dropdown-trigger'))) {
      setMenu(false);
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menu.focus();
    }
  });
  window.matchMedia('(min-width: 1201px)').addEventListener('change', () => setMenu(false));

  // ──────────────────────────────────────────
  //  Products & Services dropdown interaction
  // ──────────────────────────────────────────
  const navDropdown = document.querySelector('.nav-dropdown');
  if (navDropdown) {
    const trigger = navDropdown.querySelector('.nav-dropdown-trigger');
    const toggleDropdown = force => {
      const isOpen = force !== undefined ? force : !navDropdown.classList.contains('open');
      navDropdown.classList.toggle('open', isOpen);
      if (trigger) trigger.setAttribute('aria-expanded', String(isOpen));
    };

    if (trigger) {
      trigger.addEventListener('click', e => {
        if (window.innerWidth <= 900 || ('ontouchstart' in window)) {
          e.preventDefault();
          toggleDropdown();
        }
      });
      trigger.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (!navDropdown.classList.contains('open')) {
            e.preventDefault();
            toggleDropdown(true);
            const first = navDropdown.querySelector('.dropdown-item');
            if (first) first.focus();
          }
        }
      });
    }

    document.addEventListener('click', e => {
      if (!navDropdown.contains(e.target)) {
        toggleDropdown(false);
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navDropdown.classList.contains('open')) {
        toggleDropdown(false);
        if (trigger) trigger.focus();
      }
    });

    navDropdown.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        toggleDropdown(false);
        setMenu(false);
      });
    });
  }

  // ──────────────────────────────────────────
  //  Nav hide-on-scroll-down / show-on-scroll-up
  // ──────────────────────────────────────────
  if (!reduceMotion.matches && navWrap) {
    let lastY = 0;
    let ticking = false;
    const navHeight = 130;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y > navHeight) {
            navWrap.classList.toggle('nav-hidden', y > lastY && y > navHeight * 2);
            navWrap.classList.add('nav-scrolled');
          } else {
            navWrap.classList.remove('nav-hidden', 'nav-scrolled');
          }
          lastY = y;
          ticking = false;
        });
      }
    }, {passive:true});
  }

  // ──────────────────────────────────────────
  //  FAQ accordion
  // ──────────────────────────────────────────
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
      panel.inert = !open;
    });
  });

  // ──────────────────────────────────────────
  //  Misc: service features, workflow icons, filters
  // ──────────────────────────────────────────
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

  // ──────────────────────────────────────────
  //  Forms (mailto-based, no backend)
  // ──────────────────────────────────────────
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

  // ──────────────────────────────────────────
  //  Partner logo carousel
  // ──────────────────────────────────────────
  const partnerTrack = document.querySelector('[data-partner-track]');
  if (partnerTrack) {
    const slides = [...partnerTrack.children];
    const itemCount = slides.length / 2;
    let partnerIndex = 0;
    let partnerTimer;
    const renderPartners = (animate = true) => {
      partnerTrack.style.transition = animate && !reduceMotion.matches ? 'transform .55s cubic-bezier(.19,1,.22,1)' : 'none';
      partnerTrack.style.transform = `translateX(-${slides[partnerIndex].offsetLeft}px)`;
      document.querySelectorAll('[data-partner-dot]').forEach((dot, index) => dot.classList.toggle('active', index === partnerIndex % itemCount));
    };
    const nextPartner = () => { partnerIndex += 1; renderPartners(); };
    const prevPartner = () => {
      if (partnerIndex === 0) { partnerIndex = itemCount; renderPartners(false); partnerTrack.offsetHeight; }
      partnerIndex -= 1; renderPartners();
    };
    partnerTrack.addEventListener('transitionend', () => { if (partnerIndex >= itemCount) { partnerIndex = 0; renderPartners(false); } });
    const resetPartners = () => { clearInterval(partnerTimer); partnerTimer = setInterval(nextPartner, 4200); };
    document.querySelector('[data-partner-prev]')?.addEventListener('click', () => { prevPartner(); resetPartners(); });
    document.querySelector('[data-partner-next]')?.addEventListener('click', () => { nextPartner(); resetPartners(); });
    document.querySelectorAll('[data-partner-dot]').forEach(dot => dot.addEventListener('click', () => { partnerIndex = Number(dot.dataset.partnerDot); renderPartners(); resetPartners(); }));
    const viewport = partnerTrack.parentElement;
    viewport.addEventListener('mouseenter', () => clearInterval(partnerTimer));
    viewport.addEventListener('mouseleave', resetPartners);
    let startX = 0;
    viewport.addEventListener('touchstart', event => { startX = event.changedTouches[0].clientX; }, {passive:true});
    viewport.addEventListener('touchend', event => { const delta = event.changedTouches[0].clientX - startX; if (Math.abs(delta) > 36) delta < 0 ? nextPartner() : prevPartner(); resetPartners(); }, {passive:true});
    window.addEventListener('resize', () => renderPartners(false));
    resetPartners();
  }

  // ──────────────────────────────────────────
  //  Testimonial carousel + auto-play
  // ──────────────────────────────────────────
  const testimonialCard = document.querySelector('[data-test-card]');
  if (testimonialCard) {
    const items = JSON.parse(testimonialCard.dataset.testimonials || '[]');
    let current = 0;
    let autoTimer = null;
    const renderTestimonial = direction => {
      const [quote,name,place,initial] = items[current];
      const update = () => {
        testimonialCard.querySelector('[data-test-quote]').textContent = '“'+quote+'”';
        testimonialCard.querySelector('[data-test-name]').textContent = name;
        testimonialCard.querySelector('[data-test-place]').textContent = place;
        testimonialCard.querySelector('[data-test-initial]').textContent = initial;
        const countEl = document.querySelector('[data-test-count]');
        if (countEl) countEl.textContent = (current+1)+' / '+items.length;
        document.querySelectorAll('[data-test-dot]').forEach((d, idx) => {
          d.classList.toggle('active', idx === current);
        });
      };
      if (reduceMotion.matches) return update();
      testimonialCard.animate([{opacity:1,transform:'translateX(0)'},{opacity:0,transform:`translateX(${direction*18}px)`}],{duration:150,easing:'ease-in'}).finished.then(() => {
        update();
        testimonialCard.animate([{opacity:0,transform:`translateX(${-direction*18}px)`},{opacity:1,transform:'translateX(0)'}],{duration:260,easing:'ease-out'});
      });
    };
    const goNext = () => {current=(current+1)%items.length;renderTestimonial(1);};
    const goPrev = () => {current=(current-1+items.length)%items.length;renderTestimonial(-1);};
    const resetAuto = () => { clearInterval(autoTimer); autoTimer = setInterval(goNext, 6000); };
    const prevBtn = document.querySelector('[data-test-prev]');
    const nextBtn = document.querySelector('[data-test-next]');
    if (prevBtn) prevBtn.addEventListener('click', () => { goPrev(); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goNext(); resetAuto(); });
    document.querySelectorAll('[data-test-dot]').forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.dataset.testDot, 10);
        if (idx === current) return;
        const dir = idx > current ? 1 : -1;
        current = idx;
        renderTestimonial(dir);
        resetAuto();
      });
    });
    // Auto-advance every 6s
    autoTimer = setInterval(goNext, 6000);
    // Pause on hover
    testimonialCard.addEventListener('mouseenter', () => clearInterval(autoTimer));
    testimonialCard.addEventListener('mouseleave', resetAuto);
    // Mobile touch swipe support
    let touchStartX = 0;
    testimonialCard.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive:true});
    testimonialCard.addEventListener('touchend', e => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 40) {
        if (diff < 0) goNext();
        else goPrev();
        resetAuto();
      }
    }, {passive:true});
  }



  // ──────────────────────────────────────────
  //  Case card lightbox
  // ──────────────────────────────────────────
  document.querySelectorAll('.case-card').forEach(card => {
    if (card.matches('a')) return;
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

  // ──────────────────────────────────────────
  //  Magnetic button effect on CTAs
  // ──────────────────────────────────────────
  if (!reduceMotion.matches && window.matchMedia('(hover:hover)').matches) {
    document.querySelectorAll('.hp-pill, .order, .hp-outline, .ep-actions a').forEach(el => {
      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width/2) * 0.15;
        const y = (e.clientY - rect.top - rect.height/2) * 0.15;
        el.style.transform = `translate(${x}px,${y}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  // ──────────────────────────────────────────
  //  Parallax on hero image
  // ──────────────────────────────────────────
  if (!reduceMotion.matches) {
    const heroImg = document.querySelector('.hp-hero > img, .hp-hero > video');
    if (heroImg) {
      let rafId = null;
      window.addEventListener('scroll', () => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y < 1200) {
            heroImg.style.transform = `scale(1.05) translateY(${y * 0.12}px)`;
          }
          rafId = null;
        });
      }, {passive:true});
    }
  }

  // ──────────────────────────────────────────
  //  Tilt effect on gallery/case cards
  // ──────────────────────────────────────────
  if (!reduceMotion.matches && window.matchMedia('(hover:hover)').matches) {
    document.querySelectorAll('.hp-case, .hp-gallery-grid > a, .hp-service-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x*6}deg) rotateX(${-y*6}deg) scale(1.01)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ──────────────────────────────────────────
  //  Scroll-reveal system (expanded for ALL pages)
  // ──────────────────────────────────────────
  if (!reduceMotion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.06,rootMargin:'0px 0px 24px 0px'});

    const revealSelectors = [
      '.service-row', '.workflow', '.section-head', '.split', '.case-panel',
      '.home-page section',
      '.hp-stats', '.hp-foundation', '.hp-tech-grid', '.hp-case-grid',
      '.hp-service-grid', '.hp-workflow-grid', '.hp-benefit-grid',
      '.hp-choose', '.hp-logo-grid', '.hp-gallery-grid', '.hp-testimonials',
      '.hp-two-head', '.hp-section-head', '.hp-workflow-head',
      '.hp-choose-head', '.hp-possible', '.hp-promise',
      '.ap-hero', '.ap-story', '.ap-story-image', '.ap-story-copy',
      '.ap-principles', '.ap-principles-head',
      '.sp-hero', '.sp-row',
      '.tech-hero', '.tech-showcase-row', '.tech-stack', '.tech-process',
      '.tech-qc', '.tech-guidance',
      '.ep-hero', '.ep-steps', '.ep-include', '.ep-guidance',
      '.cases-hero', '.cases-archive',
      '.faq-hero', '.faq-group',
      '.contact-hero', '.contact-locations',
      '.footer-grid', '.case-panel .form',
    ];

    document.querySelectorAll(revealSelectors.join(',')).forEach(element => {
      element.classList.add('reveal');
      observer.observe(element);
    });

    // Stagger children in grids
    const staggerSelectors = [
      '.hp-tech-grid', '.hp-benefit-grid', '.hp-workflow-grid', '.hp-service-grid',
      '.hp-cap-grid', '.hp-logo-grid', '.hp-gallery-grid', '.hp-case-grid',
      '.hp-stats',
      '.ap-card-grid', '.ep-step-grid', '.ep-include-grid', '.ep-guidance-grid',
      '.tech-stack-grid', '.tech-steps', '.tech-qc-grid', '.tech-guidance-grid',
      '.hp-foundation-cards',
    ];

    const staggerObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.children;
          for (let i = 0; i < children.length; i++) {
            children[i].style.transitionDelay = `${i * 90}ms`;
            children[i].classList.add('revealed');
          }
          staggerObserver.unobserve(entry.target);
        }
      });
    }, {threshold:0.05, rootMargin:'0px 0px 24px 0px'});

    document.querySelectorAll(staggerSelectors.join(',')).forEach(grid => {
      const children = grid.children;
      for (let i = 0; i < children.length; i++) {
        children[i].classList.add('reveal-child');
      }
      staggerObserver.observe(grid);
    });

    // Case cards stagger
    const caseCards = document.querySelectorAll('.case-card');
    if (caseCards.length) {
      const cardObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            cardObserver.unobserve(entry.target);
          }
        });
      }, {threshold:0.08, rootMargin:'0px 0px 24px 0px'});
      caseCards.forEach((card, i) => {
        card.classList.add('reveal-child');
        card.style.transitionDelay = `${i * 60}ms`;
        cardObserver.observe(card);
      });
    }

    // Text split reveal for headings
    document.querySelectorAll('.hp-foundation h2, .hp-choose-head h2, .hp-benefits h2, .hp-workflow h2, .hp-partners h2').forEach(h2 => {
      h2.classList.add('reveal-text');
      observer.observe(h2);
    });
  }

  // ──────────────────────────────────────────
  //  Hero entrance animation
  // ──────────────────────────────────────────
  if (!reduceMotion.matches) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.add('page-loaded');
      });
    });
  } else {
    document.body.classList.add('page-loaded');
  }

  // ──────────────────────────────────────────
  //  Count-up animation for homepage stats
  // ──────────────────────────────────────────
  if (!reduceMotion.matches) {
    const statsSection = document.querySelector('.hp-stats');
    if (statsSection) {
      const statStrongs = statsSection.querySelectorAll('strong');
      const originalValues = Array.from(statStrongs).map(el => el.textContent);

      const countObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            countObserver.unobserve(entry.target);
            statStrongs.forEach((el, i) => {
              const raw = originalValues[i];
              const match = raw.match(/^([\d,.]+)(.*)$/);
              if (!match) return;
              const target = parseFloat(match[1].replace(/,/g, ''));
              const suffix = match[2];
              const hasK = raw.includes('K');
              const duration = 1800;
              const start = performance.now();

              const step = now => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                let current = Math.round(eased * target);
                if (hasK) {
                  el.textContent = current + suffix;
                } else {
                  el.textContent = current.toLocaleString() + suffix;
                }
                if (progress < 1) requestAnimationFrame(step);
              };
              requestAnimationFrame(step);
            });
          }
        });
      }, {threshold: 0.3});
      countObserver.observe(statsSection);
    }
  }

  // ──────────────────────────────────────────
  //  Scroll progress bar
  // ──────────────────────────────────────────
  if (!reduceMotion.matches) {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      progressBar.style.width = pct + '%';
    }, {passive:true});
  }

  // ──────────────────────────────────────────
  //  Smooth cursor glow on dark sections
  // ──────────────────────────────────────────
  if (!reduceMotion.matches && window.matchMedia('(hover:hover)').matches) {
    document.querySelectorAll('.hp-choose, .hp-hero').forEach(section => {
      const glow = document.createElement('div');
      glow.className = 'cursor-glow';
      section.style.position = section.style.position || 'relative';
      section.append(glow);
      section.addEventListener('mousemove', e => {
        const rect = section.getBoundingClientRect();
        glow.style.left = (e.clientX - rect.left) + 'px';
        glow.style.top = (e.clientY - rect.top) + 'px';
        glow.style.opacity = '1';
      });
      section.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
      });
    });
  }
}
