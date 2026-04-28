// assets/js/scroll-reveal.js
// Reveals elements with class .reveal-below when they scroll into view.
// Cards and above-fold content use CSS animations directly (no JS needed).

(function () {
  const style = document.createElement('style');
  style.textContent = `
    .reveal-below {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.5s cubic-bezier(.4,0,.2,1),
                  transform 0.5s cubic-bezier(.4,0,.2,1);
    }
    .reveal-below.is-visible {
      opacity: 1;
      transform: none;
    }
  `;
  document.head.appendChild(style);

  function observe() {
    const elements = document.querySelectorAll('.reveal-below');
    if (!elements.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    );

    elements.forEach((el) => io.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observe);
  } else {
    observe();
  }
})();