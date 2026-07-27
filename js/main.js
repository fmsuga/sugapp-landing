import { initializeDemos, resetDemos } from "./demos.js";

// Elementos globales que usa la experiencia interactiva.
const year = document.querySelector("[data-year]");
const lab = document.querySelector("[data-demo-lab]");
const expandButton = document.querySelector("[data-lab-expand]");
const hero = document.querySelector(".hero");
const heroScroll = document.querySelector(".hero-scroll");
const demoHeading = document.querySelector(".demo-heading");
let demoFocusOrigin = null;

// Deja ver primero la imagen y luego habilita la entrada escalonada del hero.
const initializeIntro = () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.setTimeout(() => {
    heroScroll.classList.add("is-ready");
    heroScroll.removeAttribute("tabindex");
  }, 5000);

  if (reducedMotion) {
    document.documentElement.classList.add("hero-ready");
    return;
  }

  window.setTimeout(() => document.documentElement.classList.add("hero-ready"), 520);
};

// Oculta las flechas cuando el hero ya quedó por encima del viewport.
const updateHeroScrollVisibility = () => {
  const isPastHero = hero.getBoundingClientRect().bottom <= 8;
  heroScroll.classList.toggle("is-past-hero", isPastHero);
};

// Oscurece sólo la fotografía de forma progresiva mientras salimos del hero.
const updateHeroImageDarkness = () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrolledInsideHero = Math.max(0, -hero.getBoundingClientRect().top);
  const progress = reducedMotion ? 0 : Math.min(1, scrolledInsideHero / (hero.offsetHeight * .45));
  hero.style.setProperty("--hero-scroll-darkness", (progress * .86).toFixed(3));
};

// Lleva el encabezado del laboratorio cerca del borde superior, no sólo la sección.
const scrollToDemoHeading = (event) => {
  event.preventDefault();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targetTop = window.scrollY + demoHeading.getBoundingClientRect().top - 36;
  window.scrollTo({ top: targetTop, behavior: reducedMotion ? "auto" : "smooth" });
};

const closeDemoLab = ({ restoreFocus = true } = {}) => {
  if (!lab.classList.contains("is-expanded")) return;
  lab.classList.remove("is-expanded");
  document.body.classList.remove("demo-open");
  expandButton.setAttribute("aria-expanded", "false");
  expandButton.querySelector("[data-expand-label]").textContent = "Ampliar";
  resetDemos();
  if (restoreFocus && demoFocusOrigin) demoFocusOrigin.focus();
};

// Amplía el laboratorio y lleva el teclado a la demo seleccionada.
const openDemoLab = () => {
  demoFocusOrigin = document.activeElement;
  lab.classList.add("is-expanded");
  document.body.classList.add("demo-open");
  expandButton.setAttribute("aria-expanded", "true");
  expandButton.querySelector("[data-expand-label]").textContent = "Cerrar";
  window.setTimeout(() => document.querySelector("[data-demo-tab][aria-selected='true']").focus(), 50);
};

// Mantiene el foco dentro del laboratorio mientras está ampliado.
const trapDemoFocus = (event) => {
  if (!lab.classList.contains("is-expanded") || event.key !== "Tab") return;
  const focusable = [...lab.querySelectorAll("button:not([disabled]), a[href], input, select, textarea")].filter((item) => !item.closest("[hidden]"));
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

// Revela las etapas cuando el bloque de proceso entra en pantalla.
const initializeProcessReveal = () => {
  const list = document.querySelector("[data-reveal-list]");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    list.classList.add("is-visible");
    return;
  }
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    list.classList.add("is-visible");
    observer.disconnect();
  }, { threshold: 0.2 });
  observer.observe(list);
};

// Prepara el formulario y conserva el contexto de la demo consultada.
const initializeContact = () => {
  const form = document.querySelector("[data-contact-form]");
  const context = document.querySelector("[data-contact-context]");
  const contextValue = document.querySelector("[data-contact-context-value]");
  const messageField = form.elements.namedItem("message");

  document.querySelectorAll("[data-contact-prompt]").forEach((button) => {
    button.addEventListener("click", () => {
      messageField.value = button.dataset.contactPrompt;
      messageField.focus();
    });
  });

  document.querySelector("[data-demo-consult]").addEventListener("click", () => {
    const family = document.querySelector("[data-demo-tab][aria-selected='true'] strong").textContent.trim();
    const selectedVariant = document.querySelector("[data-demo-panel]:not([hidden]) [role='tab'][aria-selected='true']").textContent.trim();
    contextValue.textContent = `${family} / ${selectedVariant}`;
    context.hidden = false;
    form.elements.namedItem("type").value = family === "Páginas" ? "Página o catálogo" : family === "Paneles" ? "Sistema o panel" : "Automatización";
    closeDemoLab({ restoreFocus: false });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    // Se arma un texto portable hasta contar con email o WhatsApp definitivos.
    const message = [
      `Nombre: ${data.get("name")}`,
      `Contacto: ${data.get("contact")}`,
      `Tipo: ${data.get("type") || "Sin definir"}`,
      `Mensaje: ${data.get("message")}`,
      context.hidden ? "" : `Contexto: ${contextValue.textContent}`
    ].filter(Boolean).join("\n");

    const status = document.querySelector("[data-form-status]");
    try {
      await navigator.clipboard.writeText(message);
      status.textContent = "Consulta copiada. El envío directo se habilitará cuando se confirme el canal público.";
    } catch {
      status.textContent = "Consulta preparada. El envío directo se habilitará cuando se confirme el canal público.";
    }
  });
};

// Inicialización general de la landing.
initializeIntro();
initializeProcessReveal();
initializeDemos();
initializeContact();
updateHeroScrollVisibility();
updateHeroImageDarkness();
year.textContent = new Date().getFullYear();

expandButton.addEventListener("click", () => {
  if (lab.classList.contains("is-expanded")) closeDemoLab();
  else openDemoLab();
});

window.addEventListener("sugapp:demo-change", (event) => {
  document.querySelector("[data-lab-location]").textContent = `${event.detail.family} / ${event.detail.variant}`;
});

window.addEventListener("scroll", updateHeroScrollVisibility, { passive: true });
window.addEventListener("scroll", updateHeroImageDarkness, { passive: true });
heroScroll.addEventListener("click", scrollToDemoHeading);

// Escape cierra primero la experiencia ampliada.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (lab.classList.contains("is-expanded")) closeDemoLab();
  }
  trapDemoFocus(event);
});
