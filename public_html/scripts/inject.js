document.addEventListener("DOMContentLoaded", () => {
  const inject = (id, file) => {
    fetch(file)
      .then(res => res.text())
      .then(html => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
      });
  };

  // Inject coffee section without worrying about language
  inject("coffee-placeholder", "./coffee.html");
});
