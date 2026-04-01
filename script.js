// Fade-in Animation
const fadeElements = document.querySelectorAll("[data-fade]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
fadeElements.forEach((el) => observer.observe(el));

// Navbar smooth scroll (fixes your issue)
document.querySelectorAll("nav a[href^='#']").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = link.getAttribute("href").substring(1);
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// CTA scrolls
document.getElementById("cta-scroll")?.addEventListener("click", () => {
  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
});

document.getElementById("cta-main")?.addEventListener("click", () => {
  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
});

function updateYearsSinceStart(elementId) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0 = Januar, 8 = September

  // Nur ab September wird das neue Jahr gezählt
  const effectiveYear = month >= 8 ? year : year - 1;

  const diff = effectiveYear - 2021;

  const target = document.getElementById(elementId);
  if (target) {
    target.textContent = diff;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  updateYearsSinceStart("years");
});


document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    // Sonderfall: nach ganz oben
    if (targetId === "#") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const section = document.querySelector(targetId);

    if (section) {
      section.classList.add("highlight");

      setTimeout(() => {
        section.classList.remove("highlight");
      }, 600);
    }
  });
});



