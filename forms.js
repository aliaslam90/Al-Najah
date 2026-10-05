export function initializeForms() {
  document.querySelectorAll('[data-case-form], [data-newsletter]').forEach(form => {
    if (form.dataset.formReady) return;
    form.dataset.formReady = 'true';
    const trap = document.createElement('input');
    trap.name = 'website'; trap.tabIndex = -1; trap.autocomplete = 'off';
    trap.setAttribute('aria-hidden', 'true'); trap.className = 'form-honeypot';
    form.append(trap);
    const limits = {name: 200, email: 254, clinic: 200, phone: 60};
    Object.entries(limits).forEach(([name, max]) => {
      const input = form.querySelector(`[name="${name}"]`);
      if (input) input.maxLength = max;
    });
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!form.reportValidity() || form.dataset.sending) return;
      const status = form.querySelector('.form-status');
      const button = form.querySelector('[type="submit"]');
      const data = Object.fromEntries(new FormData(form));
      data.type = form.hasAttribute('data-case-form') ? 'case' : 'newsletter';
      form.dataset.sending = 'true'; button.disabled = true;
      form.setAttribute('aria-busy', 'true'); status.textContent = 'Sending…';
      // AbortSignal.timeout is unavailable in some browsers. Use the older API,
      // with a generous timeout so a slow hosting mail transport can respond.
      const controller = typeof AbortController === 'function' ? new AbortController() : null;
      const timer = controller ? setTimeout(() => controller.abort(), 60000) : null;
      try {
        const response = await fetch('/api/send-email.php', {
          method: 'POST', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
          body: JSON.stringify(data), ...(controller ? {signal: controller.signal} : {})
        });
        let result;
        try { result = await response.json(); } catch { result = null; }
        if (response.ok && result?.success === true) {
          form.reset();
          status.textContent = data.type === 'case'
            ? 'Your case request was sent successfully. Thank you!'
            : 'Your newsletter request was sent successfully. Thank you!';
        } else if (response.status === 429) {
          status.textContent = 'Too many requests. Please wait 10 minutes before trying again, or email info@alnajahlab.com.';
        } else if (response.status === 422 || response.status === 400) {
          status.textContent = 'Please check your name, email and phone number, then try again.';
        } else if (response.status === 503) {
          status.textContent = 'Our email service is temporarily unavailable. Please try again later or email info@alnajahlab.com.';
        } else {
          status.textContent = 'The website could not process your request. Please email info@alnajahlab.com.';
        }
      } catch (error) {
        status.textContent = error.name === 'AbortError'
          ? 'Sending took longer than expected. Delivery is unconfirmed; please contact info@alnajahlab.com before resubmitting.'
          : 'Unable to reach the website. Check your connection and try again, or email info@alnajahlab.com.';
      } finally {
        if (timer !== null) clearTimeout(timer);
        delete form.dataset.sending; button.disabled = false;
        form.removeAttribute('aria-busy');
      }
    });
  });
}
