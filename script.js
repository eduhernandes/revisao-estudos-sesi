document.addEventListener("DOMContentLoaded", () => {
  const currentYear = document.querySelector("[data-current-year]");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});
