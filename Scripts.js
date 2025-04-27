// Mobile Navigation
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".mobile-nav-toggle");
  const nav = document.getElementById("main-nav");

  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !isExpanded);
    nav.classList.toggle("active");
  });

  // Current year in footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();
});
