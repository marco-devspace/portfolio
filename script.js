document.querySelectorAll("nav a[href^='#']").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    if (targetId === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const section = document.querySelector(targetId);
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth" });

    section.classList.add("highlight");
    setTimeout(() => section.classList.remove("highlight"), 500);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  updateYears("years");
  updateYears("yearsPlus");
});

function updateYears(elementId, baseYear = 2021) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const effectiveYear = month >= 8 ? year : year - 1;
  const diff = effectiveYear - baseYear;

  const el = document.getElementById(elementId);
  if (el) el.textContent = diff;
}

const now = Date.now();
const lastVisit = localStorage.getItem("lastVisited");
if (!lastVisit || now - lastVisit > 60 * 60 * 1000) {
  fetch(
    "https://api.counterapi.dev/v1/marco-devspace-portfolio/visits/up",
  ).catch(() => {});
  localStorage.setItem("lastVisited", now);
}
