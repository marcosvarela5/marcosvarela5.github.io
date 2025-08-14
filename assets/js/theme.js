// assets/js/theme.js

function toggleTheme() {
  const current = document.body.getAttribute("data-theme") || getSystemTheme();
  const newTheme = current === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateIcon(newTheme);
}

function updateIcon(theme) {
  const icon = document.querySelector("#themeButton i");
  if (!icon) return;
  if (theme === "dark") {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
}

function getSystemTheme() {
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const initialTheme = savedTheme || getSystemTheme();
  document.body.setAttribute("data-theme", initialTheme);
  updateIcon(initialTheme);

  document
    .getElementById("themeButton")
    ?.addEventListener("click", toggleTheme);

  // Solo seguir el sistema si el usuario no ha elegido manualmente
  if (!savedTheme && window.matchMedia) {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener?.("change", (e) => {
      const systemTheme = e.matches ? "dark" : "light";
      document.body.setAttribute("data-theme", systemTheme);
      updateIcon(systemTheme);
    });
  }
}

document.addEventListener("DOMContentLoaded", initTheme);
