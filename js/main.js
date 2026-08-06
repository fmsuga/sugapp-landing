import { CONTACT } from "./config.js";

document.documentElement.classList.add("js");

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

function initHeroTitle() {
  const groups = document.querySelectorAll("[data-hero-words]");
  let timeline = 120;

  groups.forEach((group) => {
    const words = group.textContent.trim().split(/\s+/);
    group.textContent = "";
    group.setAttribute("aria-hidden", "true");

    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "hero-title-word";
      wordSpan.textContent = word;
      wordSpan.style.setProperty("--word-delay", `${timeline}ms`);
      timeline += 110;

      group.append(wordSpan);
      if (wordIndex < words.length - 1) group.append(" ");
    });
  });
}

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
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.querySelector(".sr-only").textContent = "Abrir menú";
  };

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".sr-only").textContent = open ? "Cerrar menú" : "Abrir menú";
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) close();
  });
  document.addEventListener("pointerdown", (event) => {
    if (nav.classList.contains("is-open") && !header.contains(event.target)) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      close();
      toggle.focus();
    }
  });
  addEventListener("scroll", () => header.classList.toggle("is-scrolled", scrollY > 24), { passive: true });
  addEventListener("resize", () => {
    if (innerWidth > 900) close();
  }, { passive: true });
}

function initMessageCloud() {
  const section = document.querySelector("[data-message-cloud]");
  const stage = section?.querySelector("[data-cloud-stage]");
  const heading = section?.querySelector(".section-heading-simple");
  if (!section || !stage) return;

  const elements = [...stage.querySelectorAll(".query-node")];
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const mobile = matchMedia("(max-width: 600px)").matches;
  if (reducedMotion || mobile || !("IntersectionObserver" in window)) return;

  const anchors = [
    [.02, .06], [.60, .02], [.30, .20], [.70, .35],
    [.01, .44], [.39, .55], [.73, .16], [.14, .72],
    [.48, .76], [.76, .68], [.03, .86], [.48, .04],
    [.24, .42], [.57, .39], [.28, .88], [.78, .88],
  ];
  const nodes = elements.map((element, index) => ({
    element, index, x: 0, y: 0, width: 0, height: 0,
    vx: 0, vy: 0, phase: index * 1.73, active: false, transitioning: false,
    replacement: null, expiresAt: 0,
  }));
  const nodeByElement = new Map(nodes.map((node) => [node.element, node]));
  const pointer = { x: -1000, y: -1000, dx: 0, dy: 0, active: false };
  let frame = 0;
  let visible = false;
  let previousTime = 0;
  let stageWidth = 0;
  let stageHeight = 0;
  let activeSwaps = 0;
  let headingObstacles = [];
  const boundaryPadding = 10;
  const messageLifetime = 7000;

  const measure = () => {
    activeSwaps = 0;
    stageWidth = stage.clientWidth;
    stageHeight = stage.clientHeight;
    if (heading) {
      const stageRect = stage.getBoundingClientRect();
      const padding = 14;
      headingObstacles = [...heading.querySelector("h2").childNodes]
        .filter((child) => child.nodeType === Node.TEXT_NODE && child.textContent.trim())
        .map((child) => {
          const range = document.createRange();
          range.selectNodeContents(child);
          const rect = range.getBoundingClientRect();
          return {
            x: rect.left - stageRect.left - padding,
            y: rect.top - stageRect.top - padding,
            width: rect.width + padding * 2,
            height: rect.height + padding * 2,
          };
        });
    }
    nodes.forEach((node) => {
      node.width = node.element.offsetWidth;
      node.height = node.element.offsetHeight;
      node.x = Math.max(boundaryPadding, Math.min(stageWidth - node.width - boundaryPadding, anchors[node.index][0] * stageWidth));
      node.y = Math.max(boundaryPadding, Math.min(stageHeight - node.height - boundaryPadding, anchors[node.index][1] * stageHeight));
      const angle = .48 + node.index * 1.91;
      const speed = .62 + node.index % 3 * .1;
      node.vx = Math.cos(angle) * speed;
      node.vy = Math.sin(angle) * speed;
      node.active = node.index < (innerWidth <= 900 ? 9 : 11);
      node.transitioning = false;
      node.replacement = null;
      node.expiresAt = 0;
      node.element.classList.remove("is-entering", "is-exiting");
      node.element.classList.toggle("is-inactive", !node.active);
      node.element.style.transform = `translate3d(${node.x.toFixed(2)}px,${node.y.toFixed(2)}px,0)`;
    });
    stage.classList.add("has-physics");
  };

  const stop = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
  };
  const shouldRun = () => visible && !document.hidden;
  const start = () => {
    if (!frame && shouldRun()) frame = requestAnimationFrame(tick);
  };

  function tick(time) {
    frame = 0;
    if (!shouldRun()) return;
    const step = previousTime ? Math.min((time - previousTime) / 16.67, 2) : 1;
    previousTime = time;
    const radius = 220;

    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node.active && !node.expiresAt) {
        node.expiresAt = time + messageLifetime + Math.random() * messageLifetime;
      }
    }
    const availableSwaps = 2 - activeSwaps;
    for (let swap = 0; swap < availableSwaps; swap += 1) {
      let outgoing = null;
      let incoming = null;
      const outgoingStart = Math.floor(Math.random() * nodes.length);
      const incomingStart = Math.floor(Math.random() * nodes.length);
      for (let i = 0; i < nodes.length; i += 1) {
        const candidate = nodes[(outgoingStart + i) % nodes.length];
        if (candidate.active && !candidate.transitioning && candidate.expiresAt <= time) {
          outgoing = candidate;
          break;
        }
      }
      for (let i = 0; i < nodes.length; i += 1) {
        const candidate = nodes[(incomingStart + i) % nodes.length];
        if (!candidate.active && !candidate.transitioning) {
          incoming = candidate;
          break;
        }
      }
      if (outgoing && incoming) {
        outgoing.transitioning = true;
        incoming.transitioning = true;
        outgoing.replacement = incoming;
        outgoing.expiresAt = Infinity;
        outgoing.element.classList.add("is-exiting");
        activeSwaps += 1;
      }
    }

    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (!node.active) continue;
      node.vx += Math.sin(time * .00035 + node.phase) * .0032 * step;
      node.vy += Math.cos(time * .00029 + node.phase * 1.31) * .0032 * step;
      if (pointer.active) {
        const dx = node.x + node.width / 2 - pointer.x;
        const dy = node.y + node.height / 2 - pointer.y;
        const distance = Math.hypot(dx, dy) || 1;
        if (distance < radius) {
          const proximity = 1 - distance / radius;
          const overBubble = pointer.x >= node.x - 18
            && pointer.x <= node.x + node.width + 18
            && pointer.y >= node.y - 18
            && pointer.y <= node.y + node.height + 18;
          const force = Math.max(proximity ** 2 * .48, overBubble ? .72 : 0) * step;
          node.vx += dx / distance * force + pointer.dx * .055 * proximity;
          node.vy += dy / distance * force + pointer.dy * .055 * proximity;
        }
      }
      const speed = Math.hypot(node.vx, node.vy);
      const maxSpeed = pointer.active ? 3.4 : 1.65;
      if (speed > maxSpeed) {
        node.vx = node.vx / speed * maxSpeed;
        node.vy = node.vy / speed * maxSpeed;
      }
      node.x += node.vx * step;
      node.y += node.vy * step;
    }
    pointer.dx *= .32;
    pointer.dy *= .32;

    if (headingObstacles.length) {
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (!node.active) continue;
        for (let obstacleIndex = 0; obstacleIndex < headingObstacles.length; obstacleIndex += 1) {
          const obstacle = headingObstacles[obstacleIndex];
          const dx = node.x + node.width / 2 - (obstacle.x + obstacle.width / 2);
          const dy = node.y + node.height / 2 - (obstacle.y + obstacle.height / 2);
          const overlapX = (node.width + obstacle.width) / 2 - Math.abs(dx);
          const overlapY = (node.height + obstacle.height) / 2 - Math.abs(dy);
          if (overlapX <= 0 || overlapY <= 0) continue;
          if (overlapX < overlapY) {
            node.x += Math.sign(dx || 1) * (overlapX + 1);
            node.vx = Math.sign(dx || 1) * Math.max(Math.abs(node.vx) * .94, .7);
          } else {
            node.y += Math.sign(dy || 1) * (overlapY + 1);
            node.vy = Math.sign(dy || 1) * Math.max(Math.abs(node.vy) * .94, .7);
          }
        }
      }
    }

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        if (!a.active || !b.active) continue;
        const dx = a.x + a.width / 2 - (b.x + b.width / 2);
        const dy = a.y + a.height / 2 - (b.y + b.height / 2);
        const overlapX = (a.width + b.width) / 2 + 8 - Math.abs(dx);
        const overlapY = (a.height + b.height) / 2 + 8 - Math.abs(dy);
        if (overlapX > 0 && overlapY > 0) {
          if (overlapX < overlapY) {
            const direction = Math.sign(dx || 1);
            const correction = overlapX / 2 + .5;
            a.x += direction * correction;
            b.x -= direction * correction;
            const velocity = a.vx;
            a.vx = b.vx * .92;
            b.vx = velocity * .92;
          } else {
            const direction = Math.sign(dy || 1);
            const correction = overlapY / 2 + .5;
            a.y += direction * correction;
            b.y -= direction * correction;
            const velocity = a.vy;
            a.vy = b.vy * .92;
            b.vy = velocity * .92;
          }
        }
      }
    }

    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (!node.active) continue;
      const maxX = stageWidth - node.width - boundaryPadding;
      const maxY = stageHeight - node.height - boundaryPadding;
      if (node.x <= boundaryPadding || node.x >= maxX) {
        node.x = Math.max(boundaryPadding, Math.min(maxX, node.x));
        node.vx *= -.94;
      }
      if (node.y <= boundaryPadding || node.y >= maxY) {
        node.y = Math.max(boundaryPadding, Math.min(maxY, node.y));
        node.vy *= -.94;
      }
      node.element.style.transform = `translate3d(${node.x.toFixed(2)}px,${node.y.toFixed(2)}px,0)`;
    }
    frame = requestAnimationFrame(tick);
  }

  measure();
  document.fonts?.ready.then(() => {
    stop();
    measure();
    start();
  });
  if (finePointer) {
    stage.addEventListener("pointermove", (event) => {
      const rect = stage.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pointer.dx = pointer.active ? Math.max(-30, Math.min(30, x - pointer.x)) : 0;
      pointer.dy = pointer.active ? Math.max(-30, Math.min(30, y - pointer.y)) : 0;
      pointer.x = x;
      pointer.y = y;
      pointer.active = true;
      start();
    }, { passive: true });
    stage.addEventListener("pointerleave", () => {
      pointer.active = false;
      pointer.dx = 0;
      pointer.dy = 0;
    }, { passive: true });
  }

  stage.addEventListener("animationend", (event) => {
    if (!event.target.matches(".query-bubble")) return;
    const element = event.target.closest(".query-node");
    const node = nodeByElement.get(element);
    if (!node) return;
    if (event.animationName === "query-bubble-out") {
      const incoming = node.replacement;
      node.active = false;
      element.classList.remove("is-exiting");
      element.classList.add("is-inactive");
      node.transitioning = false;
      node.replacement = null;
      if (incoming) {
        incoming.x = Math.max(boundaryPadding, Math.min(stageWidth - incoming.width - boundaryPadding, node.x));
        incoming.y = Math.max(boundaryPadding, Math.min(stageHeight - incoming.height - boundaryPadding, node.y));
        incoming.vx = node.vx || .62;
        incoming.vy = node.vy || -.62;
        incoming.active = true;
        incoming.element.style.transform = `translate3d(${incoming.x.toFixed(2)}px,${incoming.y.toFixed(2)}px,0)`;
        incoming.element.classList.remove("is-inactive");
        incoming.element.classList.add("is-entering");
      }
    } else if (event.animationName === "query-bubble-in") {
      element.classList.remove("is-entering");
      node.transitioning = false;
      node.expiresAt = event.timeStamp + messageLifetime;
      activeSwaps = Math.max(0, activeSwaps - 1);
    }
  });

  section.classList.add("cloud-ready");
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) {
      section.classList.add("is-visible");
      start();
    } else stop();
  }, { rootMargin: "100px 0px", threshold: .12 });
  observer.observe(section);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });
  addEventListener("resize", () => {
    stop();
    measure();
    start();
  }, { passive: true });
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
  const submit = form.querySelector("[data-contact-submit]");
  const interest = form.querySelector("[data-contact-interest]");
  const required = [form.elements.name, form.elements.business, form.elements.contact, form.elements.message];
  form.noValidate = true;
  const saved = sessionStorage.getItem("sugapp-contact-type");
  if (saved) {
    interest.value = saved;
    form.elements.message.value = `Quiero conversar sobre ${saved}. `;
    sessionStorage.removeItem("sugapp-contact-type");
  }
  if (CONTACT.whatsapp || CONTACT.email) submit.textContent = "Enviar consulta →";
  const submitLabel = submit.textContent;
  const restoreSubmit = () => {
    submit.disabled = false;
    submit.textContent = submitLabel;
    form.removeAttribute("aria-busy");
  };

  required.forEach((field) => field.addEventListener("input", () => {
    field.classList.remove("field-error");
    field.setAttribute("aria-invalid", "false");
    document.getElementById(`${field.id}-error`).hidden = true;
  }));

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const invalid = required.filter((field) => !field.value.trim());
    required.forEach((field) => {
      const hasError = invalid.includes(field);
      field.classList.toggle("field-error", hasError);
      field.setAttribute("aria-invalid", String(hasError));
      document.getElementById(`${field.id}-error`).hidden = !hasError;
    });
    if (invalid.length) {
      status.textContent = "Completá los campos marcados para preparar la consulta.";
      invalid[0].focus();
      return;
    }

    const data = new FormData(form);
    const text = `Hola, estuve viendo SugApp y quiero consultar por una solución para mi negocio.\n\nNombre: ${data.get("name")}\nNegocio o actividad: ${data.get("business")}\nContacto: ${data.get("contact")}\nInterés: ${data.get("interest") || "A definir"}\nNecesito resolver: ${data.get("message")}`;
    submit.disabled = true;
    form.setAttribute("aria-busy", "true");
    if (CONTACT.whatsapp) {
      submit.textContent = "Abriendo WhatsApp…";
      location.href = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
      setTimeout(restoreSubmit, 800);
      return;
    }
    if (CONTACT.email) {
      submit.textContent = "Abriendo correo…";
      location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Consulta para SugApp")}&body=${encodeURIComponent(text)}`;
      setTimeout(restoreSubmit, 800);
      return;
    }
    submit.textContent = "Copiando…";
    try {
      await navigator.clipboard.writeText(text);
      status.textContent = "Consulta copiada. Ya podés pegarla en el canal por el que contactes a SugApp.";
    } catch {
      status.textContent = "No pudimos copiar la consulta. Revisá los permisos del navegador e intentá nuevamente.";
    } finally {
      restoreSubmit();
    }
  });
}

initHeroTitle();
initIntro();
initHeader();
initMessageCloud();
initProductCards();
initContact();

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();
