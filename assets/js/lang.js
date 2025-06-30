// Idioma por defecto
const defaultLang = "en";

// Carga dinámica de data.json
async function loadDynamicContent() {
  try {
    const res = await fetch("/assets/data/data.json");
    const data = await res.json();
    const lang = localStorage.getItem("lang") || defaultLang;
    const content = data[lang];

    // Ejemplo Index
    if (document.getElementById("hello")) {
      document.getElementById("hello").textContent = content.index.hello;
    }
    if (document.getElementById("role")) {
      document.getElementById("role").textContent = content.index.role;
    }
    if (document.getElementById("about-title")) {
      document.getElementById("about-title").textContent = content.index.aboutTitle;
    }
    if (document.getElementById("about-paragraphs")) {
      const container = document.getElementById("about-paragraphs");
      container.innerHTML = "";
      content.index.aboutParagraphs.forEach(p => {
        const para = document.createElement("p");
        para.textContent = p;
        container.appendChild(para);
      });
    }

    // Ejemplo About
    if (document.getElementById("cv-title")) {
      document.getElementById("cv-title").textContent = content.about.cvTitle;
    }
    if (document.getElementById("intro")) {
      document.getElementById("intro").textContent = content.about.intro;
    }

    if (document.getElementById("skills-list")) {
      const ul = document.getElementById("skills-list");
      ul.innerHTML = "";
      content.about.skillsList.forEach(skill => {
        const li = document.createElement("li");
        li.textContent = skill;
        ul.appendChild(li);
      });
    }

    if (document.getElementById("soft-skills-list")) {
      const ul = document.getElementById("soft-skills-list");
      ul.innerHTML = "";
      content.about.softSkills.forEach(skill => {
        const li = document.createElement("li");
        li.textContent = skill;
        ul.appendChild(li);
      });
    }

    if (document.getElementById("languages-list")) {
      const ul = document.getElementById("languages-list");
      ul.innerHTML = "";
      content.about.languages.forEach(langItem => {
        const li = document.createElement("li");
        li.textContent = langItem;
        ul.appendChild(li);
      });
    }

    if (document.getElementById("certifications-list")) {
      const ul = document.getElementById("certifications-list");
      ul.innerHTML = "";
      content.about.certifications.forEach(cert => {
        const li = document.createElement("li");
        li.textContent = cert;
        ul.appendChild(li);
      });
    }

    if (document.getElementById("interests-list")) {
      const ul = document.getElementById("interests-list");
      ul.innerHTML = "";
      content.about.interests.forEach(interest => {
        const li = document.createElement("li");
        li.textContent = interest;
        ul.appendChild(li);
      });
    }

    // Ejemplo Contact
    if (document.getElementById("contact-me")) {
      document.getElementById("contact-me").textContent = content.contact.contactMe;
    }
    if (document.getElementById("contact-text")) {
      document.getElementById("contact-text").textContent = content.contact.contactText;
    }

    // Ejemplo 404
    if (document.getElementById("oops")) {
      document.getElementById("oops").textContent = content["404"].oops;
    }
    if (document.getElementById("back-home")) {
      document.getElementById("back-home").textContent = content["404"].backHome;
    }

    // Ejemplo Portfolio
    if (document.getElementById("some-projects")) {
      document.getElementById("some-projects").textContent = content.portfolio.someProjects;
    }
    if (document.getElementById("ongoing")) {
      document.getElementById("ongoing").textContent = content.portfolio.ongoing;
    }

    if (document.getElementById("projects-list")) {
      const container = document.getElementById("projects-list");
      container.innerHTML = "";
      content.portfolio.projects.forEach(project => {
        const div = document.createElement("div");
        const title = document.createElement("h3");
        const desc = document.createElement("p");
        title.textContent = project.title;
        desc.textContent = project.description;
        div.appendChild(title);
        div.appendChild(desc);
        container.appendChild(div);
      });
    }

  } catch (error) {
    console.error("Error loading data.json:", error);
  }
}

// Traducción de data-i18n
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

    // Cargar dinámicamente el contenido traducido
    if (typeof loadDynamicContent === "function") {
      loadDynamicContent();
    }

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

  // Cargar dinámicamente en el inicio
  if (typeof loadDynamicContent === "function") {
    loadDynamicContent();
  }
}

document.addEventListener("DOMContentLoaded", initLanguage);
