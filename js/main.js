import { CONTACT } from "./config.js";

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

function revealHero() {
  requestAnimationFrame(() => document.documentElement.classList.add("hero-sequence"));
}

function initIntro() {
  const intro = document.querySelector("[data-intro]");
  if (!intro) {
    revealHero();
    return;
  }
  if (reducedMotion || sessionStorage.getItem("sugapp-intro")) {
    intro.remove();
    revealHero();
    return;
  }
  sessionStorage.setItem("sugapp-intro", "seen");
  setTimeout(() => intro.classList.add("is-done"), 900);
  setTimeout(revealHero, 920);
  setTimeout(() => intro.remove(), 1500);
}

function initHeader() {
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-menu-toggle]");
  if (!header || !nav || !toggle) return;

  const close = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.querySelector(".sr-only").textContent = "Abrir menú";
  };

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".sr-only").textContent = open ? "Cerrar menú" : "Abrir menú";
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      close();
      toggle.focus();
    }
  });
  addEventListener("scroll", () => header.classList.toggle("is-scrolled", scrollY > 24), { passive: true });
}

function initMessageCloud() {
  const section = document.querySelector("[data-message-cloud]");
  const stage = section?.querySelector("[data-cloud-stage]");
  if (!section || !stage) return;

  const nodes = [...stage.querySelectorAll(".query-node")];
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  let centers = [];

  const resetPush = () => nodes.forEach((node) => {
    node.style.setProperty("--push-x", "0px");
    node.style.setProperty("--push-y", "0px");
  });
  const measure = () => {
    centers = nodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    });
  };

  if (!reducedMotion && finePointer) {
    stage.addEventListener("pointerenter", measure);
    stage.addEventListener("pointermove", (event) => {
      const radius = 190;
      nodes.forEach((node, index) => {
        const center = centers[index];
        if (!center) return;
        const dx = center.x - event.clientX;
        const dy = center.y - event.clientY;
        const distance = Math.hypot(dx, dy) || 1;
        const force = distance < radius ? (1 - distance / radius) * 18 : 0;
        node.style.setProperty("--push-x", `${(dx / distance * force).toFixed(2)}px`);
        node.style.setProperty("--push-y", `${(dy / distance * force).toFixed(2)}px`);
      });
    }, { passive: true });
    stage.addEventListener("pointerleave", resetPush);
    addEventListener("resize", resetPush, { passive: true });
  }

  if (!("IntersectionObserver" in window)) return;
  section.classList.add("cloud-ready");
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) section.classList.add("is-visible");
    stage.classList.toggle("is-paused", !entry.isIntersecting);
  }, { rootMargin: "100px 0px", threshold: .12 });
  observer.observe(section);
}

function initProductCards() {
  const section = document.querySelector("[data-products]");
  if (!section || reducedMotion || !("IntersectionObserver" in window)) return;
  const cards = [...section.querySelectorAll(".product-card")];
  section.classList.add("products-ready");
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    section.classList.add("is-visible");
    observer.disconnect();
  }, { rootMargin: "0px 0px -8%", threshold: .08 });
  cards.forEach((card, index) => card.style.setProperty("--card-delay", `${index * 70}ms`));
  observer.observe(section);
}

function initContact() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;
  const status = form.querySelector("[data-form-status]");
  const saved = sessionStorage.getItem("sugapp-contact-type");
  if (saved) {
    const matchesOption = [...form.elements.type.options].some((option) => option.value === saved);
    if (matchesOption) form.elements.type.value = saved;
    form.elements.message.value = `Quiero conversar sobre ${saved}. `;
    sessionStorage.removeItem("sugapp-contact-type");
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const required = [form.elements.name, form.elements.contact, form.elements.message];
    const invalid = required.filter((field) => !field.value.trim());
    required.forEach((field) => {
      const hasError = invalid.includes(field);
      field.classList.toggle("field-error", hasError);
      field.setAttribute("aria-invalid", String(hasError));
    });
    if (invalid.length) {
      status.textContent = "Completá los campos marcados para preparar la consulta.";
      invalid[0].focus();
      return;
    }

    const data = new FormData(form);
    const text = `Consulta para SugApp\nNombre: ${data.get("name")}\nContacto: ${data.get("contact")}\nSolución: ${data.get("type") || "Sin definir"}\nMensaje: ${data.get("message")}`;
    if (CONTACT.whatsapp) {
      location.href = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
      return;
    }
    if (CONTACT.email) {
      location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Consulta para SugApp")}&body=${encodeURIComponent(text)}`;
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      status.textContent = "Consulta copiada. Podés guardarla hasta que publiquemos el canal de contacto.";
    } catch {
      status.textContent = "Consulta preparada. Copiá el contenido del mensaje para conservarlo.";
    }
  });
}

initIntro();
initHeader();
initMessageCloud();
initProductCards();
initContact();

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();
