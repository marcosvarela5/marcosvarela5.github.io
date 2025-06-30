// assets/js/lang.js

// Idioma por defecto
const defaultLang = "en";

// Función principal
async function setLanguage(lang) {
  try {
    const res = await fetch("/assets/lang/translations.json");
    const translations = await res.json();
    const dict = translations[lang];

    if (!dict) {
      console.warn(`Language '${lang}' not found, falling back to '${defaultLang}'`);
      return setLanguage(defaultLang);
    }

    // Seleccionar elementos dinámicamente cada vez
    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach(el => {
      const key = el.getAttribute("data-i18n");
      const keys = key.split(".");
      let text = dict;

      keys.forEach(k => {
        if (text && k in text) {
          text = text[k];
        } else {
          text = null;
        }
      });

      if (text) {
        // Si contiene \n, dividimos en nodos de texto + <br>
        if (text.includes("\n")) {
          // Vaciar el elemento
          el.textContent = "";
          const parts = text.split("\n");
          parts.forEach((part, index) => {
            el.appendChild(document.createTextNode(part));
            if (index < parts.length - 1) {
              el.appendChild(document.createElement("br"));
            }
          });
        } else {
          // Solo texto simple
          el.textContent = text;
        }

        // Añade animación al cambiar
        el.classList.remove("fade-in");
        void el.offsetWidth;
        el.classList.add("fade-in");

      } else {
        console.warn(`Missing translation for key '${key}' in '${lang}'`);
      }
    });

    // Guarda elección
    localStorage.setItem("lang", lang);

  } catch (error) {
    console.error("Error loading translations:", error);
  }
}

// Inicializa el idioma al cargar
function initLanguage() {
  const savedLang = localStorage.getItem("lang") || defaultLang;
  setLanguage(savedLang);

  // Añade eventos de cambio
  document.querySelectorAll("[data-set-lang]").forEach(btn => {
    btn.addEventListener("click", () => {
      const newLang = btn.getAttribute("data-set-lang");
      setLanguage(newLang);
    });
  });
}

// Lanzar al cargar
document.addEventListener("DOMContentLoaded", initLanguage);
