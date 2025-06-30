document.addEventListener("DOMContentLoaded", function () {
  fetch("navbar.html")
    .then(response => response.text())
    .then(html => {
      const placeholder = document.getElementById("navbar-placeholder");
      placeholder.innerHTML = html;

      const toggleButton = document.getElementById("menu-toggle");
      const menu = document.getElementById("menu");

      if (toggleButton && menu) {
        toggleButton.addEventListener("click", () => {
          menu.classList.toggle("show");
        });

        document.addEventListener("click", function (e) {
          if (!menu.contains(e.target) && !toggleButton.contains(e.target)) {
            menu.classList.remove("show");
          }
        });
      }

      // ✅ Language switching logic
      const langLinks = document.querySelectorAll(".language-switch");
      langLinks.forEach(link => {
        link.addEventListener("click", () => {
          const targetLang = link.getAttribute("data-lang");

          // Update navbar
          if (typeof updateNavbarLanguage === "function") {
            updateNavbarLanguage(targetLang);
          }

          // Update index content if on index page
          if (typeof updateIndexLanguage === "function") {
            updateIndexLanguage(targetLang);
          }
        });
      });
    });
});
