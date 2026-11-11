const menu = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');
const mobile = window.matchMedia('(max-width: 700px)');

function setMenu(open) {
  menu.hidden = !mobile.matches;
  menu.setAttribute('aria-expanded', String(mobile.matches && open));
  navigation.hidden = mobile.matches && !open;
}

setMenu(false);
mobile.addEventListener('change', () => setMenu(false));
menu.addEventListener('click', () => setMenu(navigation.hidden));
navigation.addEventListener('click', (event) => {
  if (mobile.matches && event.target.closest('a')) {
    setMenu(false);
    menu.focus({ preventScroll: true });
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobile.matches && !navigation.hidden) {
    setMenu(false);
    menu.focus();
  }
});

const form = document.querySelector('#tracking-form');
const trackingNumber = document.querySelector('#tracking-number');
const result = document.querySelector('#tracking-result');

trackingNumber.addEventListener('input', () => {
  trackingNumber.setCustomValidity('');
  result.textContent = '';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const number = trackingNumber.value.trim();
  if (!number) {
    trackingNumber.setCustomValidity('Enter a tracking number.');
    trackingNumber.reportValidity();
    return;
  }
  result.textContent = `Tracking preview for ${number}. Live shipment data is unavailable in this demo.`;
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
        entry.target.classList.add('scroll-reveal');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.1 });

  document.querySelectorAll('.section-heading, .card, .about > div, .contact-inner > *')
    .forEach((element) => revealObserver.observe(element));
}
