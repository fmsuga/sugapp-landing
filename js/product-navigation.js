import { findProduct } from "./product-data.js";
import { renderProductDetail } from "./product-catalog.js";

const productHashPrefix = "#solucion/";

export const initializeProductNavigation = () => {
  const grid = document.querySelector("[data-family-explorers]");
  const experience = document.querySelector("[data-product-experience]");
  const content = document.querySelector("[data-product-content]");
  const closeButton = document.querySelector("[data-product-close]");
  const locationLabel = document.querySelector("[data-product-location]");
  const defaultTitle = document.title;
  const backgroundRegions = [...document.body.children].filter((element) => element !== experience && element.tagName !== "SCRIPT");
  let focusOrigin = null;
  let activeSlug = null;
  let openedFromCatalog = false;

  if (!grid || !experience || !content || !closeButton) return;

  const slugFromHash = () => decodeURIComponent(location.hash.slice(productHashPrefix.length));
  const isProductHash = () => location.hash.startsWith(productHashPrefix);

  const openProduct = (product, { moveFocus = true } = {}) => {
    if (!product) return;
    activeSlug = product.slug;
    renderProductDetail(product, content);
    locationLabel.textContent = product.name;
    experience.hidden = false;
    experience.setAttribute("aria-hidden", "false");
    backgroundRegions.forEach((element) => { element.inert = true; });
    document.body.classList.add("product-open");
    document.title = `${product.name} — SugApp`;
    content.scrollTop = 0;
    if (moveFocus) requestAnimationFrame(() => closeButton.focus());
  };

  const hideProduct = ({ restoreFocus = true } = {}) => {
    if (!activeSlug) return;
    activeSlug = null;
    experience.hidden = true;
    experience.setAttribute("aria-hidden", "true");
    backgroundRegions.forEach((element) => { element.inert = false; });
    document.body.classList.remove("product-open");
    document.title = defaultTitle;
    if (restoreFocus && focusOrigin?.isConnected) focusOrigin.focus();
  };

  // Una única función sincroniza enlaces directos, Atrás/Adelante y navegación interna.
  const syncWithLocation = ({ moveFocus = true } = {}) => {
    if (!isProductHash()) {
      hideProduct();
      return;
    }
    const product = findProduct(slugFromHash());
    if (!product) {
      history.replaceState({}, "", "#familias");
      hideProduct();
      return;
    }
    openProduct(product, { moveFocus });
  };

  const selectProduct = (button) => {
    const product = findProduct(button.dataset.productSlug);
    if (!product) return;
    focusOrigin = button;
    openedFromCatalog = true;
    history.pushState({ product: product.slug }, "", `${productHashPrefix}${product.slug}`);
    openProduct(product);
  };

  const requestClose = () => {
    if (isProductHash() && openedFromCatalog) {
      openedFromCatalog = false;
      history.back();
      return;
    }
    history.replaceState({}, "", "#familias");
    hideProduct();
  };

  const goToContact = () => {
    const product = findProduct(activeSlug);
    history.pushState({}, "", "#contacto");
    hideProduct({ restoreFocus: false });
    window.dispatchEvent(new CustomEvent("sugapp:product-contact", { detail: { product } }));
    document.querySelector("#contacto")?.scrollIntoView();
  };

  const trapFocus = (event) => {
    if (experience.hidden || event.key !== "Tab") return;
    const focusable = [...experience.querySelectorAll("button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])")];
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

  grid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-open-product]");
    if (card) {
      event.preventDefault();
      card.dataset.productSlug = card.dataset.openProduct;
      selectProduct(card);
    }
  });
  closeButton.addEventListener("click", requestClose);
  content.addEventListener("click", (event) => {
    if (event.target.closest("[data-product-contact]")) goToContact();
  });
  window.addEventListener("popstate", () => syncWithLocation());
  window.addEventListener("hashchange", () => syncWithLocation());
  document.addEventListener("keydown", (event) => {
    if (experience.hidden) return;
    if (event.key === "Escape") requestClose();
    else trapFocus(event);
  });

  syncWithLocation({ moveFocus: false });
};
