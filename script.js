const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const filters = document.querySelectorAll("[data-filter]");
const projects = document.querySelectorAll(".project-tile");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImg = document.querySelector("[data-lightbox-img]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const lightboxClose = document.querySelector("[data-lightbox-close]");

const syncHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const activeFilter = filter.dataset.filter;

    filters.forEach((item) => item.classList.toggle("is-active", item === filter));
    projects.forEach((project) => {
      const shouldShow = activeFilter === "all" || project.dataset.category === activeFilter;
      project.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

projects.forEach((project) => {
  project.addEventListener("click", () => {
    if (!lightbox || typeof lightbox.showModal !== "function") return;
    lightboxImg.src = project.dataset.full;
    lightboxImg.alt = project.querySelector("img").alt;
    lightboxTitle.textContent = project.dataset.title;
    lightbox.showModal();
  });
});

lightboxClose.addEventListener("click", () => lightbox.close());

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});
