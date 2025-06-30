document.addEventListener("DOMContentLoaded", function() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('main-menu');

  // Toggle del menú al hacer clic en el botón
  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  // Cerrar el menú al hacer clic en cualquier enlace
  const links = menu.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
    });
  });
});