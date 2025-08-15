// assets/js/gesture-reveal.js
(function () {
    const isTouch = window.matchMedia('(hover: none)').matches || 'ontouchstart' in window;
    if (!isTouch) return; // Solo móvil/tablet

    const THRESHOLD = 20; // píxeles de gesto vertical para considerar swipe
    const AUTO_HIDE_MS = 4000; // auto-ocultar (opcional)

    const items = document.querySelectorAll('.portfolio-item');
    if (!items.length) return;

    let openTimer = null;

    const closeAll = (except) => {
        document.querySelectorAll('.portfolio-item.revealed').forEach(el => {
            if (el !== except) el.classList.remove('revealed');
        });
    };

    items.forEach((item) => {
        const anchor = item.querySelector(':scope > a');
        if (!anchor) return;

        let startY = 0;
        let startX = 0;
        let moved = false;

        const reveal = () => {
            if (!item.classList.contains('revealed')) {
                closeAll(item);
                item.classList.add('revealed');
                clearTimeout(openTimer);
                openTimer = setTimeout(() => item.classList.remove('revealed'), AUTO_HIDE_MS);
                return true;
            }
            return false;
        };

        // Gesto: swipe up para abrir, swipe down para cerrar
        item.addEventListener('touchstart', (e) => {
            const t = e.touches[0];
            startY = t.clientY;
            startX = t.clientX;
            moved = false;
        }, { passive: true });

        item.addEventListener('touchmove', (e) => {
            const t = e.touches[0];
            const dy = t.clientY - startY;
            const dx = t.clientX - startX;
            if (Math.abs(dy) > 5 || Math.abs(dx) > 5) moved = true;

            // swipe up abre; swipe down cierra
            if (dy < -THRESHOLD) {
                reveal();
            } else if (dy > THRESHOLD) {
                item.classList.remove('revealed');
            }
        }, { passive: true });

        // Toque sin movimiento: primer toque revela, segundo abre
        anchor.addEventListener('click', (e) => {
            // Si no ha habido desplazamiento (tap) y aún no está abierto, revelamos y cancelamos la navegación
            if (!moved && reveal()) {
                e.preventDefault();
                e.stopPropagation();
            }
            // Si ya estaba revelado o se ha deslizado, dejamos navegar
        }, { passive: false });

        // Tocar fuera cierra
        document.addEventListener('touchstart', (e) => {
            if (!item.contains(e.target)) {
                item.classList.remove('revealed');
            }
        }, { passive: true });

        // Accesibilidad: al perder foco cierra
        anchor.addEventListener('blur', () => {
            setTimeout(() => item.classList.remove('revealed'), 150);
        });
    });
})();
