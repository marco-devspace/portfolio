const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll("[data-fade]").forEach((el) => observer.observe(el));

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
    setTimeout(() => section.classList.remove("highlight"), 600);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
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

document.addEventListener("DOMContentLoaded", () => {
  updateYears("years");
  updateYears("yearsPlus");
});

const now = Date.now();
const lastVisit = localStorage.getItem("lastVisited");
if (!lastVisit || now - lastVisit > 60 * 60 * 1000) {
  fetch("https://api.countapi.xyz/hit/coster-coding-portfolio/visits").catch(
    () => {},
  );
  localStorage.setItem("lastVisited", now);
}
