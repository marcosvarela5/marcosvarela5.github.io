// assets/js/typewriter.js
// Types the full h1 after lang.js fires langReady. Re-runs on language change.

(function () {
  const SPEED = 55;
  let timer = null;

  function typewrite(el, fullText) {
    clearTimeout(timer);
    el.textContent = '';
    el.style.visibility = 'visible';
    el.style.borderRight = '2px solid';
    el.style.animationName = 'tw-blink';
    el.style.whiteSpace = 'nowrap'; // prevent wrap mid-animation

    let i = 0;
    function tick() {
      el.textContent = fullText.slice(0, i);
      if (i < fullText.length) {
        i++;
        timer = setTimeout(tick, SPEED);
      } else {
        el.style.borderRight = 'none';
        el.style.animationName = 'none';
        el.style.whiteSpace = 'normal'; // allow wrap once done
      }
    }
    tick();
  }

  function run() {
    const h1 = document.querySelector('.home-text h1');
    if (!h1) return;

    const greetingSpan = h1.querySelector('[data-i18n]');
    const greeting = greetingSpan ? greetingSpan.textContent.trim() : '';
    const fullText  = (greeting ? greeting + ' ' : '') + 'Marcos!';

    // Hide the data-i18n span; typewriter owns the whole h1 display
    if (greetingSpan) greetingSpan.style.display = 'none';

    const target = h1.querySelector('.typewriter-target');
    if (!target) return;

    typewrite(target, fullText);
  }

  // Fires on first load AND on every language switch
  document.addEventListener('langReady', function () {
    setTimeout(run, 80);
  });
})();