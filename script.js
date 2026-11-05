// Cinematic opening: show once per page load, then reveal the website.
const introScreen = document.getElementById("introScreen");
const skipIntro = document.getElementById("skipIntro");

function closeIntro() {
  if (!introScreen) return;
  introScreen.classList.add("is-done");
  document.body.classList.remove("intro-active");
  window.setTimeout(() => introScreen.remove(), 1000);
}

document.body.classList.add("intro-active");
window.setTimeout(closeIntro, 2600);
skipIntro?.addEventListener("click", closeIntro);

// Reveal sections as the visitor scrolls.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// Mobile navigation.
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.querySelector(".main-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});
