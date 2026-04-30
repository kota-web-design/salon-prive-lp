document.documentElement.classList.add("js-enabled");

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const navLinks = document.querySelectorAll("[data-nav] a");
const fadeTargets = document.querySelectorAll(".fade-up");

const syncHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const closeMenu = () => {
  if (!menuButton || !nav || !header) return;

  menuButton.classList.remove("is-open");
  nav.classList.remove("is-open");
  header.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "メニューを開く");
};

const openMenu = () => {
  if (!menuButton || !nav || !header) return;

  menuButton.classList.add("is-open");
  nav.classList.add("is-open");
  header.classList.add("is-open");
  document.body.classList.add("menu-open");
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "メニューを閉じる");
};

const toggleMenu = () => {
  if (!menuButton || !nav || !header) return;

  const isOpen = menuButton.classList.contains("is-open");

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
};

if (menuButton) {
  menuButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMenu();
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (event) => {
  if (!header || !menuButton) return;
  if (!header.classList.contains("is-open")) return;

  const isClickInsideHeader = header.contains(event.target);

  if (!isClickInsideHeader) {
    closeMenu();
  }
});

window.addEventListener("scroll", syncHeader, { passive: true });

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    closeMenu();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  fadeTargets.forEach((target) => {
    observer.observe(target);
  });
} else {
  fadeTargets.forEach((target) => {
    target.classList.add("is-visible");
  });
}

syncHeader();