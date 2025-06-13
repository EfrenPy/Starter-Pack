document.addEventListener("DOMContentLoaded", () => {
    const inject = (id, file) => {
      fetch(file)
        .then(res => res.text())
        .then(html => {
          const el = document.getElementById(id);
          if (el) el.innerHTML = html;
        });
    };
  
    // Determine language from current URL path
    const path = window.location.pathname;
    const lang = path.includes("es") ? "es" : path.includes("en") ? "en" : "";
  

    // Inject correct coffee file
    inject("coffee-placeholder",  `coffee.html`);
  });