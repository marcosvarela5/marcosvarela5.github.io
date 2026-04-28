// assets/js/lang.js

const defaultLang = "en";

async function setLanguage(lang) {
  try {
    const res = await fetch("/assets/lang/translations.json");
    const translations = await res.json();
    const dict = translations[lang];

    if (!dict) {
      console.warn(`Language '${lang}' not found, falling back to '${defaultLang}'`);
      return setLanguage(defaultLang);
    }

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
        if (text.includes("\n")) {
          el.textContent = "";
          const parts = text.split("\n");
          parts.forEach((part, index) => {
            el.appendChild(document.createTextNode(part));
            if (index < parts.length - 1) {
              el.appendChild(document.createElement("br"));
            }
          });
        } else {
          el.textContent = text;
        }

        el.classList.remove("fade-in");
        void el.offsetWidth;
        el.classList.add("fade-in");
      } else {
        console.warn(`Missing translation for key '${key}' in '${lang}'`);
      }
    });

    localStorage.setItem("lang", lang);

    // Notify other scripts (e.g. typewriter) that translations are ready
    document.dispatchEvent(new CustomEvent("langReady", { detail: { lang } }));

  } catch (error) {
    console.error("Error loading translations:", error);
  }
}

function initLanguage() {
  const savedLang = localStorage.getItem("lang") || defaultLang;
  setLanguage(savedLang);

  document.querySelectorAll("[data-set-lang]").forEach(btn => {
    btn.addEventListener("click", () => {
      const newLang = btn.getAttribute("data-set-lang");
      setLanguage(newLang);
    });
  });
}

document.addEventListener("DOMContentLoaded", initLanguage);