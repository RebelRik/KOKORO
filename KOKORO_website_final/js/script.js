(() => {
  "use strict";

  const menuButton = document.getElementById("menu");
  const nav = document.getElementById("navlinks");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile navigation: open, close and reset after selecting a section.
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.classList.toggle("is-open", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    nav.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
      });
    });

    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
        nav.classList.remove("open");
        menuButton.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
      }
    });
  }

  // Owl Carousel for the eight learning modules.
  const carouselElement = document.getElementById("serviceCarousel");
  if (carouselElement && window.jQuery && typeof window.jQuery.fn.owlCarousel === "function") {
    window.jQuery(carouselElement).owlCarousel({
      loop: false,
      rewind: true,
      margin: 16,
      nav: true,
      dots: true,
      smartSpeed: 650,
      autoplay: false,
      navText: ["‹", "›"],
      responsive: {
        0: { items: 1, margin: 12 },
        560: { items: 2, margin: 14 },
        900: { items: 3, margin: 16 },
        1180: { items: 4, margin: 18 }
      }
    });
  }

  // Soft reveal animations as sections enter the viewport.
  const revealItems = document.querySelectorAll(".reveal");
  if (!reducedMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  // Highlight the current section in the desktop/mobile navigation.
  const sectionIds = ["home", "about", "services", "age", "why", "contact"];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
  const navLinks = nav ? Array.from(nav.querySelectorAll('a[href^="#"]')) : [];
  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;
          navLinks.forEach((link) => {
            const active = link.getAttribute("href") === `#${currentId}`;
            link.classList.toggle("active", active);
            if (active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // The contact form is intentionally a front-end demo until a form service is connected.
  const enquiryForm = document.getElementById("enquiry");
  const successMessage = document.getElementById("success");
  if (enquiryForm && successMessage) {
    enquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (enquiryForm.reportValidity()) {
        successMessage.style.display = "block";
        enquiryForm.reset();
      }
    });
  }

  // Automatically keep the footer year current.
  const yearElement = document.getElementById("year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();
})();
