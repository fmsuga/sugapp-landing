import { businessDashboards, operationMethods, websitePreviews } from "./demo-data.js";

// Comportamiento compartido por todos los grupos de pestañas.
const setupTabs = (container, selector, onSelect) => {
  const tabs = [...container.querySelectorAll(selector)];

  const selectTab = (tab, moveFocus = false) => {
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    if (moveFocus) tab.focus();
    onSelect(tab);
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      selectTab(tabs[nextIndex], true);
    });
  });
};

// Pequeño helper para actualizar textos sin repetir querySelector.
const setText = (root, selector, value) => {
  root.querySelector(selector).textContent = value;
};

// Informa a main.js qué familia y variante está viendo el visitante.
const announceDemoChange = (family, variant) => {
  window.dispatchEvent(new CustomEvent("sugapp:demo-change", { detail: { family, variant } }));
};

// Dibuja el panel usando la configuración del rubro seleccionado.
const renderDashboard = (key) => {
  const data = businessDashboards[key];
  const dashboard = document.querySelector("[data-dashboard]");
  const businessTab = document.querySelector(`[data-business="${key}"]`);

  dashboard.className = `dashboard-window ${data.theme}`;
  dashboard.setAttribute("aria-labelledby", businessTab.id);
  setText(dashboard, "[data-dashboard-name]", data.name);
  setText(dashboard, ".dashboard-logo", data.initials);
  setText(dashboard, "[data-dashboard-greeting]", data.greeting);
  setText(dashboard, "[data-dashboard-title]", data.title);
  setText(dashboard, "[data-nav-label]", data.navLabel);
  setText(dashboard, "[data-dashboard-action]", data.action);
  setText(dashboard, "[data-chart-label]", data.chartLabel);
  setText(dashboard, "[data-chart-total]", data.chartTotal);
  setText(dashboard, "[data-alert-title]", data.alertTitle);
  setText(dashboard, "[data-alert-count]", `${data.alerts.length} avisos`);
  setText(dashboard, "[data-activity-title]", data.activityTitle);

  dashboard.querySelector("[data-metrics]").innerHTML = data.metrics.map((metric) => `
    <article class="metric-card">
      <span>${metric.label}</span>
      <strong>${metric.value}</strong>
      <small class="tone-${metric.tone}">${metric.trend}</small>
    </article>
  `).join("");

  dashboard.querySelector("[data-chart]").innerHTML = data.chart.map((value, index) => `
    <span style="--bar-value:${value}%" aria-label="Punto ${index + 1}: ${value}%"></span>
  `).join("");

  dashboard.querySelector("[data-alerts]").innerHTML = data.alerts.map((alert) => `
    <li><i class="alert-marker tone-${alert.level}"></i><span><strong>${alert.title}</strong><small>${alert.detail}</small></span></li>
  `).join("");

  dashboard.querySelector("[data-activity]").innerHTML = data.activity.map((item) => `
    <li><span><strong>${item.title}</strong><small>${item.detail}</small></span><time>${item.time}</time></li>
  `).join("");

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && dashboard.animate) {
    dashboard.animate(
      [{ opacity: 0.55, transform: "translateY(6px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 260, easing: "ease-out" }
    );
  }
  if (!dashboard.closest("[data-demo-panel]").hidden) {
    announceDemoChange("Paneles", businessTab.textContent.trim());
  }
};

// Actualiza la página simulada sin crear tres demos independientes.
const renderWebsite = (key) => {
  const data = websitePreviews[key];
  const preview = document.querySelector("[data-web-window]");
  const tab = document.querySelector(`[data-web-preview="${key}"]`);
  preview.className = `website-preview ${data.theme}`;
  preview.setAttribute("aria-labelledby", tab.id);
  setText(preview, "[data-web-url]", data.url);
  setText(preview, "[data-web-brand]", data.brand);
  setText(preview, "[data-web-nav]", data.nav);
  setText(preview, "[data-web-eyebrow]", data.eyebrow);
  setText(preview, "[data-web-title]", data.title);
  setText(preview, "[data-web-cta]", data.cta);
  setText(preview, "[data-phone-brand]", data.brand);
  setText(preview, "[data-phone-title]", data.phoneTitle);
  setText(preview, "[data-phone-cta]", data.phoneCta);
  preview.querySelector("[data-web-items]").innerHTML = data.items.map((item, index) => `
    <div><span>0${index + 1}</span><strong>${item}</strong></div>
  `).join("");
  if (!preview.closest("[data-demo-panel]").hidden) {
    announceDemoChange("Páginas", tab.textContent.trim());
  }
};

// Cambia el contenido de la demo de formulario, escaneo, voz o asistente.
const renderMethod = (key) => {
  const data = operationMethods[key];
  const preview = document.querySelector("[data-method-preview]");
  const tab = document.querySelector(`[data-method="${key}"]`);
  preview.setAttribute("aria-labelledby", tab.id);
  setText(preview, ".method-icon", data.icon);
  setText(preview, "[data-method-label]", data.label);
  setText(preview, "[data-method-title]", data.title);
  setText(preview, "[data-method-description]", data.description);
  setText(preview, "[data-method-action]", data.action);
  preview.dataset.activeMethod = key;
  preview.classList.toggle("is-voice", key === "voice");
  if (!preview.closest("[data-demo-panel]").hidden) {
    announceDemoChange("Operaciones", tab.textContent.trim());
  }
};

// Conecta las pestañas principales con cada panel de demostración.
const initializeDemoPanels = () => {
  const tabsRoot = document.querySelector("[data-demo-tabs]");
  setupTabs(tabsRoot, "[data-demo-tab]", (tab) => {
    document.querySelectorAll("[data-demo-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.demoPanel !== tab.dataset.demoTab;
    });
    const activePanel = document.querySelector(`[data-demo-panel="${tab.dataset.demoTab}"]`);
    const variant = activePanel.querySelector("[role='tab'][aria-selected='true']").textContent.trim();
    announceDemoChange(tab.querySelector("strong").textContent.trim(), variant);
  });
};

const initializeDashboard = () => {
  setupTabs(document.querySelector("[data-business-tabs]"), "[data-business]", (tab) => {
    renderDashboard(tab.dataset.business);
  });

  const action = document.querySelector("[data-dashboard-action]");
  const toast = document.querySelector("[data-demo-toast]");
  action.addEventListener("click", () => {
    const active = document.querySelector("[data-business][aria-selected='true']").dataset.business;
    toast.textContent = businessDashboards[active].toast;
    toast.hidden = false;
    window.clearTimeout(Number(toast.dataset.timer));
    toast.dataset.timer = String(window.setTimeout(() => { toast.hidden = true; }, 4200));
  });
};

const initializeWebPreview = () => {
  const preview = document.querySelector("[data-web-window]");
  setupTabs(document.querySelector("[data-web-tabs]"), "[data-web-preview]", (tab) => {
    renderWebsite(tab.dataset.webPreview);
  });

  document.querySelectorAll("[data-device]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-device]").forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });
      preview.classList.toggle("show-mobile", button.dataset.device === "mobile");
    });
  });

  preview.querySelectorAll("[data-web-cta], [data-phone-cta]").forEach((button) => {
    button.addEventListener("click", () => {
      const feedback = preview.querySelector("[data-web-feedback]");
      feedback.textContent = "Interacción simulada: el siguiente paso abriría el recorrido correspondiente.";
      feedback.hidden = false;
    });
  });
};

const initializeOperationPreview = () => {
  const preview = document.querySelector("[data-method-preview]");
  setupTabs(document.querySelector("[data-method-tabs]"), "[data-method]", (tab) => {
    renderMethod(tab.dataset.method);
  });
  preview.querySelector("[data-method-action]").addEventListener("click", () => {
    setText(preview, "[data-method-description]", operationMethods[preview.dataset.activeMethod].result);
  });
};

// Punto de entrada público que main.js ejecuta al cargar la página.
export const initializeDemos = () => {
  initializeDemoPanels();
  initializeDashboard();
  initializeWebPreview();
  initializeOperationPreview();
  renderDashboard("grocery");
  renderWebsite("appointments");
  renderMethod("form");
};

// Devuelve todas las demos a su estado inicial al cerrar el laboratorio.
export const resetDemos = () => {
  document.querySelector("[data-demo-tab='dashboard']").click();
  document.querySelector("[data-business='grocery']").click();
  document.querySelector("[data-web-preview='appointments']").click();
  document.querySelector("[data-method='form']").click();
  document.querySelector("[data-device='desktop']").click();
  document.querySelector("[data-demo-toast]").hidden = true;
  document.querySelector("[data-web-feedback]").hidden = true;
};
