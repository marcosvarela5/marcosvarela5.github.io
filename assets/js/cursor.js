// assets/js/cursor.js
// Custom amber cursor — small dot that follows the mouse with a subtle lag.
// Falls back gracefully on touch devices (does nothing).

(function () {
  if (window.matchMedia('(hover: none)').matches) return; // skip touch

  const style = document.createElement('style');
  style.textContent = `
    * { cursor: none !important; }

    .cur-dot, .cur-ring {
      position: fixed;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s ease;
    }

    .cur-dot {
      width: 6px;
      height: 6px;
      background: #d97706;
    }

    .cur-ring {
      width: 28px;
      height: 28px;
      border: 1.5px solid #d97706;
      opacity: 0.45;
      transition: width 0.2s ease, height 0.2s ease,
                  opacity 0.2s ease, border-color 0.2s ease;
    }

    body[data-theme="dark"] .cur-dot,
    body[data-theme="dark"] .cur-ring { }

    .cur-ring.hovering {
      width: 44px;
      height: 44px;
      opacity: 0.25;
    }

    .cur-ring.clicking {
      width: 18px;
      height: 18px;
      opacity: 0.7;
    }

    .cur-dot.hidden, .cur-ring.hidden { opacity: 0; }
  `;
  document.head.appendChild(style);

  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.className  = 'cur-dot';
  ring.className = 'cur-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = -100, my = -100; // start off-screen
  let rx = -100, ry = -100;
  let raf;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Ring follows with lag via lerp
  function lerp(a, b, t) { return a + (b - a) * t; }

  function loop() {
    rx = lerp(rx, mx, 0.12);
    ry = lerp(ry, my, 0.12);
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    raf = requestAnimationFrame(loop);
  }
  loop();

  // Expand ring on interactive elements
  const HOVER_SEL = 'a, button, [role="button"], input, textarea, select, label, .portfolio-image, .card';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(HOVER_SEL)) ring.classList.add('hovering');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(HOVER_SEL)) ring.classList.remove('hovering');
  });

  // Shrink on click
  document.addEventListener('mousedown', () => ring.classList.add('clicking'));
  document.addEventListener('mouseup',   () => ring.classList.remove('clicking'));

  // Hide when leaving window
  document.addEventListener('mouseleave', () => {
    dot.classList.add('hidden');
    ring.classList.add('hidden');
  });
  document.addEventListener('mouseenter', () => {
    dot.classList.remove('hidden');
    ring.classList.remove('hidden');
  });
})();