export function initializeForms() {
  document.querySelectorAll('[data-case-form], [data-newsletter]').forEach(form => {
    const trap = document.createElement('input');
    trap.name = 'website'; trap.tabIndex = -1; trap.autocomplete = 'off';
    trap.setAttribute('aria-hidden', 'true'); trap.className = 'form-honeypot';
    form.append(trap);
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!form.reportValidity() || form.dataset.sending) return;
      const status = form.querySelector('.form-status');
      const button = form.querySelector('[type="submit"]');
      const data = Object.fromEntries(new FormData(form));
      data.type = form.hasAttribute('data-case-form') ? 'case' : 'newsletter';
      form.dataset.sending = 'true'; button.disabled = true;
      form.setAttribute('aria-busy', 'true'); status.textContent = 'Sending…';
      try {
        const response = await fetch('/api/send-email.php', {
          method: 'POST', headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data), signal: AbortSignal.timeout(20000)
        });
        const result = await response.json();
        if (!response.ok || result.success !== true) throw new Error('Send failed');
        form.reset();
        status.textContent = 'Your message was sent successfully. Thank you!';
      } catch {
        status.textContent = 'We could not confirm your message was sent. Please try again or email info@alnajahlab.com.';
      } finally {
        delete form.dataset.sending; button.disabled = false;
        form.removeAttribute('aria-busy');
      }
    });
  });
}
