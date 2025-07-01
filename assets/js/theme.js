// assets/js/theme.js


function toggleTheme() {
    const current = document.body.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcon(newTheme);
  }
  
 
  function updateIcon(theme) {
    const icon = document.querySelector("#themeButton i");
    if (theme === "dark") {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  }
  
  function initTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.setAttribute("data-theme", savedTheme);
    updateIcon(savedTheme);
    document
      .getElementById("themeButton")
      .addEventListener("click", toggleTheme);
  }
  
  document.addEventListener("DOMContentLoaded", initTheme);
  