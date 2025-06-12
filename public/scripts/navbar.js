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
  
          // Optional: close menu on outside click
          document.addEventListener("click", function (event) {
            if (!menu.contains(event.target) && !toggleButton.contains(event.target)) {
              menu.classList.remove("show");
            }
          });
        }
      });
  });
  