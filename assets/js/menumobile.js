document.addEventListener("DOMContentLoaded", function() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('main-menu');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
});
