




import { publicNeeds, operationalNeeds } from "./client-messages.js";
import {
  homeSolutions,
  industries,
  advisorSteps,
  getRecommendation,
} from "./site-data.js";
import { CONTACT } from "./config.js";
import Swiper from "https://cdn.jsdelivr.net/npm/swiper@14.0.6/swiper-bundle.min.mjs";

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[char],
  );
const focusable = (root) => [
  ...root.querySelectorAll(
    'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',
  ),
];

function initIntro() {
  const intro = document.querySelector("[data-intro]");
  const reveal = () => document.documentElement.classList.add("hero-ready");
  if (!intro || reduced || sessionStorage.getItem("sugapp-intro")) {
    intro?.remove();
    reveal();
    return;
  }
  sessionStorage.setItem("sugapp-intro", "seen");
  setTimeout(() => {
    intro.classList.add("is-done");
    reveal();
  }, 900);
  setTimeout(() => intro.remove(), 1500);
}

function initHeroCta() {
  const cta = document.querySelector(".hero-action");
  if (!cta) return;
  if (reduced) {
    cta.classList.add("is-ready");
    return;
  }
  const reveal = () =>
    setTimeout(() => {
      cta.classList.add("is-entering");
      cta.addEventListener(
        "animationend",
        () => {
          cta.classList.remove("is-entering");
          cta.classList.add("is-ready");
        },
        { once: true },
      );
    }, 600);
  if (!("IntersectionObserver" in window)) {
    reveal();
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      reveal();
    },
    { threshold: 0.1 },
  );
  observer.observe(cta);
}

function initHeader() {
  const header = document.querySelector("[data-header]"),
    nav = document.querySelector("[data-nav]"),
    toggle = document.querySelector("[data-menu-toggle]"),
    menus = [...document.querySelectorAll("[data-mega-menu]")],
    buttons = [...document.querySelectorAll("[data-menu-button]")];
  const closeMenus = () => {
    menus.forEach((m) => (m.hidden = true));
    buttons.forEach((b) => b.setAttribute("aria-expanded", "false"));
  };
  buttons.forEach((button) =>
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const menu = document.getElementById(button.dataset.menuButton),
        open = menu.hidden;
      closeMenus();
      menu.hidden = !open;
      button.setAttribute("aria-expanded", String(open));
      if (open) requestAnimationFrame(() => focusable(menu)[0]?.focus());
    }),
  );
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".sr-only").textContent = open
      ? "Cerrar menú"
      : "Abrir menú";
    if (open) focusable(nav)[0]?.focus();
  });
  nav.addEventListener("click", (event) => {
    if (event.target.matches('a[href^="#"]')) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      closeMenus();
    }
  });
  addEventListener("click", (event) => {
    if (!event.target.closest(".nav-group")) closeMenus();
  });
  addEventListener(
    "scroll",
    () => header.classList.toggle("is-scrolled", scrollY > 24),
    { passive: true },
  );
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const opener = buttons.find(
        (b) => b.getAttribute("aria-expanded") === "true",
      );
      closeMenus();
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      opener?.focus();
    }
  });
}

function initMarquees() {
  const root = document.querySelector("[data-message-marquees]");
  if (!root) return;
  const markup = (message, interactive) =>
    `<li>${interactive ? `<button class="client-message ${message.tone === "green" ? "green" : ""}" type="button" data-message-solution="${message.solution}" data-message-id="${message.id}" aria-pressed="false">${escape(message.text)}</button>` : `<article class="client-message ${message.tone === "green" ? "green" : ""}">${escape(message.text)}</article>`}</li>`;
  const row = (items, direction, speed) =>
    `<div class="marquee-row" data-marquee data-direction="${direction}" data-base-speed="${speed}" data-scroll-direction="down" tabindex="0" aria-label="Mensajes desplazables"><div class="marquee-viewport"><div class="marquee-track">${[0, 1, 2].map((index) => `<ul class="marquee-set" ${index ? 'aria-hidden="true"' : ""}>${items.map((message) => markup(message, index === 0)).join("")}</ul>`).join("")}</div></div></div>`;
  root.innerHTML = row(publicNeeds, -1, 60) + row(operationalNeeds, 1, 66);
  root.addEventListener("click", (event) => {
    const button = event.target.closest("[data-message-solution]");
    if (!button) return;
    root
      .querySelectorAll("[data-message-solution]")
      .forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
    document.dispatchEvent(
      new CustomEvent("sugapp:message-solution", {
        detail: {
          id: button.dataset.messageSolution,
          messageId: button.dataset.messageId,
        },
      }),
    );
  });
  if (reduced) return;
  const spring = (value, stiffness, damping) => ({
    value,
    target: value,
    velocity: 0,
    stiffness,
    damping,
  });
  const update = (state, dt) => {
    const acceleration =
      state.stiffness * (state.target - state.value) -
      state.damping * state.velocity;
    state.velocity += acceleration * dt;
    state.value += state.velocity * dt;
    return state.value;
  };
  const rows = [...root.querySelectorAll("[data-marquee]")].map(
    (element, index) => ({
      element,
      track: element.querySelector(".marquee-track"),
      set: element.querySelector(".marquee-set"),
      direction: Number(element.dataset.direction),
      base: Number(element.dataset.baseSpeed),
      offset: 0,
      dragging: false,
      lastX: 0,
      dragVelocity: 0,
      paused: false,
      boost: spring(1, 260, 38),
      reverse: spring(1, 210, 32),
      visible: true,
      index,
    }),
  );
  rows.forEach((state) => {
    state.offset = state.index
      ? -state.set.scrollWidth * 0.66
      : -state.set.scrollWidth * 0.2;
    const render = () => {
      state.track.style.transform = `translateX(${Math.round(state.offset)}px)`;
    };
    const element = state.element;
    element.addEventListener("pointerdown", (event) => {
      if (event.target.closest("[data-message-solution]")) return;
      state.dragging = true;
      state.lastX = event.clientX;
      state.dragVelocity = 0;
      element.setPointerCapture(event.pointerId);
      element.classList.add("is-dragging");
    });
    element.addEventListener("pointermove", (event) => {
      if (!state.dragging) return;
      const dx = event.clientX - state.lastX;
      state.offset += dx;
      state.dragVelocity = dx * 34;
      state.lastX = event.clientX;
      render();
    });
    const stop = () => {
      state.dragging = false;
      element.classList.remove("is-dragging");
    };
    element.addEventListener("pointerup", stop);
    element.addEventListener("pointercancel", stop);
    element.addEventListener("mouseenter", () => (state.paused = true));
    element.addEventListener("mouseleave", () => (state.paused = false));
    element.addEventListener("focusin", () => (state.paused = true));
    element.addEventListener("focusout", (event) => {
      if (!element.contains(event.relatedTarget)) state.paused = false;
    });
    element.addEventListener("keydown", (event) => {
      if (
        event.target !== element ||
        !["ArrowLeft", "ArrowRight"].includes(event.key)
      )
        return;
      event.preventDefault();
      state.offset += event.key === "ArrowLeft" ? 48 : -48;
      const width = state.set.scrollWidth || 1;
      if (state.offset <= -width) state.offset += width;
      if (state.offset >= 0) state.offset -= width;
      render();
    });
  });
  let scrollVelocity = 0,
    lastY = scrollY,
    lastScroll = performance.now(),
    lastFrame = performance.now();
  addEventListener(
    "scroll",
    () => {
      const now = performance.now(),
        elapsed = Math.max(16, now - lastScroll);
      scrollVelocity = ((scrollY - lastY) / elapsed) * 1000;
      lastY = scrollY;
      lastScroll = now;
    },
    { passive: true },
  );
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        const state = rows.find(
          (rowState) => rowState.element === entry.target,
        );
        if (state) state.visible = entry.isIntersecting;
      }),
    { rootMargin: "100px" },
  );
  rows.forEach((state) => observer.observe(state.element));
  const animate = (time) => {
    const dt = Math.min(0.02, (time - lastFrame) / 1000);
    lastFrame = time;
    scrollVelocity *= Math.pow(0.055, dt);
    const scrollDirection = scrollVelocity < -35 ? -1 : 1,
      boost = 1 + Math.min(Math.abs(scrollVelocity) / 900, 1) * 5;
    rows.forEach((state) => {
      state.element.dataset.scrollDirection =
        scrollDirection < 0 ? "up" : "down";
      state.boost.target = boost;
      state.reverse.target = scrollDirection;
      if (!state.visible || state.paused || state.dragging) return;
      state.offset += state.dragVelocity * dt;
      state.dragVelocity *= Math.pow(0.065, dt);
      state.offset +=
        state.direction *
        update(state.reverse, dt) *
        state.base *
        update(state.boost, dt) *
        dt;
      const width = state.set.scrollWidth || 1;
      if (state.offset <= -width) state.offset += width;
      if (state.offset >= 0) state.offset -= width;
      state.track.style.transform = `translateX(${Math.round(state.offset)}px)`;
    });
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}

function initSolutions() {
  const root = document.querySelector("[data-solutions-list]");
  if (!root) return;
  const scene = root.closest(".solutions-integrated");
  const actions = (item) =>
    `<div class="solution-actions"><a href="${item.href}">${escape(item.cta)} <span aria-hidden="true">&rarr;</span></a>${item.demo ? `<a href="${item.demo}">Ver muestra <span aria-hidden="true">&darr;</span></a>` : ""}</div>`;
  const content = (item) =>
    `<h4>${escape(item.name)}</h4><p>${escape(item.summary)}</p><p class="solution-context-label">Puede servir, por ejemplo, para:</p><ul>${item.contexts.map((context) => `<li>${escape(context)}</li>`).join("")}</ul>${actions(item)}`;
  root.innerHTML = `<nav class="solution-step-controls" aria-label="Recorrer soluciones"><button type="button" data-solution-previous aria-label="Ver solución anterior"><svg viewBox="0 0 18 12" aria-hidden="true"><path d="M2 10 9 2l7 8Z"/></svg></button><button type="button" data-solution-next aria-label="Ver solución siguiente"><svg viewBox="0 0 18 12" aria-hidden="true"><path d="m2 2 7 8 7-8Z"/></svg></button></nav><div class="solutions-tabs" role="tablist" aria-label="Soluciones concretas"><span class="solution-active-line" aria-hidden="true"></span>${homeSolutions.map((item, index) => `<button class="solution-tab" id="solution-tab-${item.id}" style="--intro-index:${index}" type="button" role="tab" aria-selected="${index === 0}" aria-controls="solution-detail" tabindex="${index === 0 ? 0 : -1}" data-solution-tab="${index}">${escape(item.name)}</button>`).join("")}</div><div class="solution-detail swiper" id="solution-detail" role="tabpanel" tabindex="0" aria-live="polite"><div class="swiper-wrapper">${homeSolutions.map((item) => `<article class="swiper-slide" data-solution-slide="${item.id}">${content(item)}</article>`).join("")}</div></div><div class="solutions-accordion">${homeSolutions.map((item, index) => `<article class="solution-mobile-item"><h4><button class="solution-mobile-trigger" type="button" aria-expanded="${index === 0}" aria-controls="solution-mobile-${item.id}" data-solution-mobile="${index}">${escape(item.name)}<svg viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1.5 5 5 5-5"/></svg></button></h4><div class="solution-mobile-panel" id="solution-mobile-${item.id}" ${index ? "hidden" : ""}>${content(item)}</div></article>`).join("")}</div>`;
  const detail = root.querySelector(".solution-detail"),
    tabsRoot = root.querySelector(".solutions-tabs"),
    tabs = [...root.querySelectorAll("[data-solution-tab]")],
    mobileButtons = [...root.querySelectorAll("[data-solution-mobile]")],
    controls = root.querySelector(".solution-step-controls"),
    previousButton = root.querySelector("[data-solution-previous]"),
    nextButton = root.querySelector("[data-solution-next]");
  let isVisible = false,
    hasManualInteraction = false,
    hasFocus = false,
    introduced = reduced,
    startTimer = 0;

  const updateIndicator = (index) => {
    const tab = tabs[index];
    if (!tab) return;
    tabsRoot.style.setProperty("--indicator-y", `${tab.offsetTop}px`);
    tabsRoot.style.setProperty("--indicator-h", `${tab.offsetHeight}px`);
  };
  const sync = (index) => {
    const item = homeSolutions[index];
    if (!item) return;
    tabs.forEach((tab, tabIndex) => {
      tab.setAttribute("aria-selected", String(tabIndex === index));
      tab.tabIndex = tabIndex === index ? 0 : -1;
    });
    detail.setAttribute("aria-labelledby", `solution-tab-${item.id}`);
    updateIndicator(index);
  };
  const stopAutoplay = (manual = false) => {
    clearTimeout(startTimer);
    startTimer = 0;
    if (manual) {
      hasManualInteraction = true;
      root.dataset.autoplay = "stopped";
    } else if (!hasManualInteraction) root.dataset.autoplay = "paused";
    swiper.autoplay.stop();
  };
  const canAutoplay = () =>
    !reduced &&
    innerWidth > 700 &&
    isVisible &&
    !document.hidden &&
    !hasManualInteraction &&
    !hasFocus &&
    introduced;
  const startAutoplay = (delay = 0) => {
    clearTimeout(startTimer);
    if (!canAutoplay()) return;
    const start = () => {
      if (!canAutoplay()) return;
      swiper.autoplay.start();
      root.dataset.autoplay = "running";
    };
    if (delay) startTimer = setTimeout(start, delay);
    else start();
  };
  const revealControls = (visible) => {
    scene.classList.toggle("is-in-view", visible);
    controls.setAttribute("aria-hidden", String(!visible));
    [previousButton, nextButton].forEach(
      (button) => (button.tabIndex = visible ? 0 : -1),
    );
  };
  const swiper = new Swiper(detail, {
    direction: "vertical",
    effect: "slide",
    speed: reduced ? 0 : 650,
    loop: true,
    allowTouchMove: false,
    preventInteractionOnTransition: true,
    autoplay:
      reduced || innerWidth <= 700
        ? false
        : {
            delay: 7000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          },
    navigation: {
      prevEl: previousButton,
      nextEl: nextButton,
    },
    a11y: {
      enabled: true,
      prevSlideMessage: "Ver solución anterior",
      nextSlideMessage: "Ver solución siguiente",
    },
    on: {
      init(instance) {
        sync(instance.realIndex);
      },
      slideChange(instance) {
        sync(instance.realIndex);
      },
      transitionEnd() {
        detail.removeAttribute("data-direction");
      },
    },
  });
  stopAutoplay();

  const select = (
    index,
    { focus = false, scroll = false, linked = false, manual = false } = {},
  ) => {
    if (!homeSolutions[index]) return;
    if (manual) stopAutoplay(true);
    const direction =
      index > swiper.realIndex
        ? "next"
        : index < swiper.realIndex
          ? "previous"
          : null;
    if (direction) detail.dataset.direction = direction;
    swiper.slideToLoop(index, reduced ? 0 : 650);
    sync(index);
    mobileButtons.forEach((button, buttonIndex) => {
      const active = buttonIndex === index;
      button.setAttribute("aria-expanded", String(active));
      document.getElementById(button.getAttribute("aria-controls")).hidden =
        !active;
    });
    const target = innerWidth > 700 ? tabs[index] : mobileButtons[index];
    if (scroll) {
      const box = scene.getBoundingClientRect();
      if (box.top < 80 || box.top > innerHeight * 0.72)
        scene.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });
    }
    if (focus) setTimeout(() => target?.focus(), reduced ? 0 : 500);
    if (linked) {
      detail.classList.add("is-linked");
      setTimeout(() => detail.classList.remove("is-linked"), 900);
    }
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(index, { manual: true }));
    tab.addEventListener("keydown", (event) => {
      const map = {
        ArrowDown: (index + 1) % tabs.length,
        ArrowUp: (index - 1 + tabs.length) % tabs.length,
        Home: 0,
        End: tabs.length - 1,
      };
      if (event.key in map) {
        event.preventDefault();
        tabs[map[event.key]].focus();
        select(map[event.key], { manual: true });
      }
    });
  });
  previousButton.addEventListener(
    "click",
    () => {
      detail.dataset.direction = "previous";
      stopAutoplay(true);
    },
    { capture: true },
  );
  nextButton.addEventListener(
    "click",
    () => {
      detail.dataset.direction = "next";
      stopAutoplay(true);
    },
    { capture: true },
  );
  mobileButtons.forEach((button, index) =>
    button.addEventListener("click", () => {
      stopAutoplay(true);
      const open = button.getAttribute("aria-expanded") !== "true";
      mobileButtons.forEach((other) => {
        other.setAttribute("aria-expanded", "false");
        document.getElementById(other.getAttribute("aria-controls")).hidden =
          true;
      });
      if (open) {
        button.setAttribute("aria-expanded", "true");
        document.getElementById(button.getAttribute("aria-controls")).hidden =
          false;
      }
    }),
  );
  document.addEventListener("sugapp:message-solution", (event) => {
    const index = homeSolutions.findIndex(
      (item) => item.id === event.detail.id,
    );
    select(index, {
      focus: true,
      scroll: true,
      linked: true,
      manual: true,
    });
  });
  root.addEventListener("pointerenter", () => {
    if (!hasManualInteraction) swiper.autoplay.pause();
  });
  root.addEventListener("pointerleave", () => startAutoplay());
  root.addEventListener("focusin", () => {
    hasFocus = true;
    if (!hasManualInteraction) swiper.autoplay.pause();
  });
  root.addEventListener("focusout", () => {
    requestAnimationFrame(() => {
      hasFocus = root.contains(document.activeElement);
      if (!hasFocus) startAutoplay();
    });
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });
  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.18;
      revealControls(isVisible);
      if (isVisible && !introduced) {
        introduced = true;
        scene.classList.add("is-introduced");
        scene.classList.remove("is-preparing");
        startAutoplay(1800);
      } else if (isVisible) startAutoplay();
      else stopAutoplay();
    },
    { threshold: [0, 0.18, 0.4] },
  );
  if (!reduced) {
    scene.classList.add("is-preparing");
    setTimeout(() => {
      if (!introduced) {
        introduced = true;
        scene.classList.add("is-introduced");
        scene.classList.remove("is-preparing");
      }
    }, 1800);
  } else scene.classList.add("is-introduced");
  visibilityObserver.observe(scene);
  revealControls(false);
  requestAnimationFrame(() => updateIndicator(swiper.realIndex));
  addEventListener(
    "resize",
    () => {
      updateIndicator(swiper.realIndex);
      if (innerWidth <= 700) stopAutoplay();
      else startAutoplay();
    },
    { passive: true },
  );
}

function initReducedMarquees() {
  if (!reduced) return;
  document.querySelectorAll("[data-marquee]").forEach((row) => {
    const viewport = row.querySelector(".marquee-viewport");
    row.setAttribute("aria-label", "Mensajes desplazables manualmente");
    row.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      viewport.scrollBy({
        left: event.key === "ArrowLeft" ? -180 : 180,
        behavior: "auto",
      });
    });
  });
}

function modalController(layer, closeSelector) {
  let origin = null;
  const panel = layer.querySelector('[role="dialog"]');
  const close = () => {
    layer.hidden = true;
    document.body.classList.remove("modal-open");
    origin?.focus();
  };
  const open = (trigger) => {
    origin = trigger;
    layer.hidden = false;
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => focusable(panel)[0]?.focus());
  };
  layer
    .querySelectorAll(closeSelector)
    .forEach((el) => el.addEventListener("click", close));
  document.addEventListener("keydown", (event) => {
    if (layer.hidden) return;
    if (event.key === "Escape") close();
    if (event.key === "Tab") {
      const items = focusable(panel),
        first = items[0],
        last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  return { open, close };
}

function initIndustries() {
  const layer = document.querySelector("[data-industry-dialog]"),
    content = layer.querySelector("[data-industry-content]"),
    modal = modalController(layer, "[data-close-industry]");
  document.querySelectorAll("[data-industry]").forEach((button) =>
    button.addEventListener("click", () => {
      const item = industries[button.dataset.industry];
      if (!item) return;
      content.innerHTML = `<p class="section-label">Soluciones por industria</p><h2 id="industry-title">${escape(item.title)}</h2><p>${escape(item.summary)}</p><h3>Qué se podría mejorar</h3><ul>${item.problems.map((x) => `<li>${escape(x)}</li>`).join("")}</ul><h3>Soluciones relacionadas</h3><div class="drawer-actions">${item.solutions.map((x) => `<a href="${x[1]}">${escape(x[0])}</a>`).join("")}</div><h3>Formas de comenzar</h3><ul>${item.starts.map((x) => `<li>${escape(x)}</li>`).join("")}</ul><div class="drawer-actions"><button class="primary" type="button" data-industry-advisor>Usar el orientador</button><a href="#contacto" data-industry-contact>Contar mi caso</a></div>`;
      modal.open(button);
      history.replaceState(null, "", `#industria-${button.dataset.industry}`);
      content
        .querySelector("[data-industry-advisor]")
        .addEventListener("click", () => {
          modal.close();
          document.querySelector("[data-open-advisor]").click();
        });
      content
        .querySelector("[data-industry-contact]")
        .addEventListener("click", () => {
          modal.close();
          document.querySelector('[name="message"]').value =
            `Tengo un negocio del rubro ${item.title} y quiero mejorar: `;
        });
    }),
  );
  const hash = location.hash.match(/^#industria-(.+)$/);
  if (hash)
    document.querySelector(`[data-industry="${CSS.escape(hash[1])}"]`)?.click();
}

function initAdvisor() {
  const layer = document.querySelector("[data-advisor-dialog]"),
    content = layer.querySelector("[data-advisor-content]"),
    modal = modalController(layer, "[data-close-advisor]");
  let step = 0,
    answers = {},
    recommendation = null;
  const render = () => {
    if (step < advisorSteps.length) {
      const current = advisorSteps[step];
      content.innerHTML = `<p class="advisor-progress">Paso ${step + 1} de ${advisorSteps.length}</p><p class="advisor-question">${escape(current.question)}</p><div class="advisor-options">${current.options.map((x) => `<button type="button" data-answer="${x[0]}">${escape(x[1])}</button>`).join("")}</div>${step ? '<button type="button" data-advisor-back>← Volver</button>' : ""}`;
      content.querySelectorAll("[data-answer]").forEach((b) =>
        b.addEventListener("click", () => {
          answers[current.key] = b.dataset.answer;
          step++;
          render();
        }),
      );
      content
        .querySelector("[data-advisor-back]")
        ?.addEventListener("click", () => {
          step--;
          render();
        });
    } else {
      recommendation = getRecommendation(answers);
      content.innerHTML = `<div class="advisor-result"><p class="section-label">Un camino posible</p><h3>${escape(recommendation.title)}</h3><p>${escape(recommendation.text)}</p><div class="drawer-actions"><a class="primary" href="${recommendation.href}">${escape(recommendation.label)}</a><button type="button" data-advisor-contact>Contar mi caso</button><button type="button" data-advisor-reset>Volver a empezar</button></div></div>`;
      content
        .querySelector("[data-advisor-reset]")
        .addEventListener("click", () => {
          step = 0;
          answers = {};
          render();
        });
      content
        .querySelector("[data-advisor-contact]")
        .addEventListener("click", () => {
          document.querySelector("[data-recommendation]").value =
            recommendation.title;
          document.querySelector('[name="type"]').value = [
            ...document.querySelector('[name="type"]').options,
          ].some((o) => o.value === recommendation.title)
            ? recommendation.title
            : "";
          document.querySelector('[name="message"]').value =
            `El orientador me recomendó ${recommendation.title}. Quiero contarles mi caso: `;
          modal.close();
          location.hash = "contacto";
          document.querySelector('[name="message"]').focus();
        });
    }
  };
  document.querySelectorAll("[data-open-advisor]").forEach((button) =>
    button.addEventListener("click", () => {
      render();
      modal.open(button);
    }),
  );
}

function initContact() {
  const form = document.querySelector("[data-contact-form]"),
    status = form.querySelector("[data-form-status]");
  const saved = sessionStorage.getItem("sugapp-contact-type");
  if (saved) {
    form.elements.type.value = saved;
    form.elements.message.value = `Quiero conversar sobre ${saved}. `;
    sessionStorage.removeItem("sugapp-contact-type");
  }
  document.querySelectorAll("[data-contact-prompt]").forEach((button) =>
    button.addEventListener("click", () => {
      form.elements.message.value = button.dataset.contactPrompt;
      form.elements.message.focus();
    }),
  );
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const required = [
        form.elements.name,
        form.elements.contact,
        form.elements.message,
      ],
      invalid = required.filter((x) => !x.value.trim());
    required.forEach((x) =>
      x.classList.toggle("field-error", invalid.includes(x)),
    );
    if (invalid.length) {
      status.textContent =
        "Completá los campos marcados para preparar la consulta.";
      invalid[0].focus();
      return;
    }
    const data = new FormData(form),
      text = `Consulta para SugApp\nNombre: ${data.get("name")}\nContacto: ${data.get("contact")}\nSolución: ${data.get("type") || data.get("recommendation") || "Sin definir"}\nMensaje: ${data.get("message")}`;
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
      status.textContent =
        "Consulta copiada. Podés guardarla hasta que publiquemos el canal de contacto.";
    } catch {
      status.textContent =
        "Consulta preparada. Seleccioná el texto del mensaje para conservarlo hasta que publiquemos el canal.";
    }
  });
}

initIntro();
initHeroCta();
initHeader();
initMarquees();
initReducedMarquees();
initSolutions();
initIndustries();
initAdvisor();
initContact();
document.querySelector("[data-year]").textContent = new Date().getFullYear();
const scrollHint = document.querySelector(".hero-scroll");
addEventListener(
  "scroll",
  () => scrollHint?.classList.toggle("is-hidden", scrollY > 120),
  { passive: true },
);
