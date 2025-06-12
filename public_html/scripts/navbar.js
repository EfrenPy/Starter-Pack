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

      // Language switching logic
      const langLinks = document.querySelectorAll(".language-switch");
      langLinks.forEach(link => {
        link.addEventListener("click", () => {
          const targetLang = link.getAttribute("data-lang");
          const currentPath = window.location.pathname;
          const parts = currentPath.split("/");

          // Replace current language segment (e.g. /en/index.html → /es/index.html)
          if (parts.includes("en") || parts.includes("es")) {
            parts[parts.length - 2] = targetLang;
          } else {
            parts.splice(1, 0, targetLang);
          }

          const newPath = parts.join("/");
          window.location.href = newPath;
        });
      });
    });
});
