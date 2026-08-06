const { test, expect } = require("@playwright/test");

const baseURL = "http://127.0.0.1:8123";
const productRoutes = [
  "/soluciones/paginas-web.html",
  "/soluciones/stock-ventas-gestion.html",
  "/soluciones/pedidos-gastronomia.html",
  "/soluciones/turnos-reservas.html",
  "/soluciones/desarrollo-a-medida.html",
];

for (const width of [390, 768, 1440]) {
  test(`home beta a ${width}px`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    await page.goto(`${baseURL}/`);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("#hero-title")).toHaveText("Soluciones modernas para problemas cotidianos.");
    await expect(page.locator(".product-card")).toHaveCount(5);
    await expect(page.locator(".product-preview")).toHaveCount(5);
    await expect(page.locator(".product-card-link")).toHaveCount(5);
    await expect(page.locator(".query-bubble")).toHaveCount(16);
    await expect(page.locator(".query-cloud a, .query-cloud button")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    expect(errors).toEqual([]);
  });
}

test("arquitectura, anclas y oferta pública", async ({ page }) => {
  await page.goto(`${baseURL}/`);
  await expect(page.locator("#inicio + #consultas")).toHaveCount(1);
  await expect(page.locator("#consultas + #productos")).toHaveCount(1);
  await expect(page.locator("#productos + #contacto")).toHaveCount(1);
  await expect(page.locator(".product-card h3")).toHaveText([
    "Páginas web",
    "Stock, ventas y gestión",
    "Pedidos para gastronomía",
    "Turnos y reservas",
    "Desarrollo a medida",
  ]);
  expect(await page.locator(".product-card-link").evaluateAll((links) => links.map((link) => link.getAttribute("href")))).toEqual([
    "soluciones/paginas-web.html",
    "soluciones/stock-ventas-gestion.html",
    "soluciones/pedidos-gastronomia.html",
    "soluciones/turnos-reservas.html",
    "soluciones/desarrollo-a-medida.html",
  ]);
  await expect(page.locator(".swiper, #experiencias, #proyectos")).toHaveCount(0);
  expect(await page.locator("#productos").innerText()).not.toMatch(/precio|pricing|\$\s*\d/i);
});

test("cinco rutas públicas sin 404 y con metadata", async ({ page }) => {
  for (const path of productRoutes) {
    const response = await page.goto(`${baseURL}${path}`);
    expect(response.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://fmsuga.github.io/sugapp-landing${path}`);
    await expect(page.locator('[aria-current="page"]')).toHaveCount(1);
    await expect(page.locator(".beta-note")).toContainText("En desarrollo");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  }
});

test("menú mobile, Escape, clic exterior y reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseURL}/`);
  await expect(page.locator("[data-intro]")).toHaveCount(0);
  await expect(page.locator(".query-node:visible")).toHaveCount(6);
  await expect(page.locator(".query-bubble").first()).toHaveCSS("animation-name", "none");
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await expect(page.locator("#main-nav")).toBeVisible();
  await expect(page.locator("body")).toHaveClass(/menu-open/);
  await page.keyboard.press("Escape");
  await expect(page.locator("#main-nav")).toBeHidden();
  await expect(page.getByRole("button", { name: "Abrir menú" })).toBeFocused();
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await page.mouse.click(20, 500);
  await expect(page.locator("#main-nav")).toBeHidden();
});

test("formulario breve, errores inline y contexto interno", async ({ page }) => {
  await page.goto(`${baseURL}/#contacto`);
  await page.locator('[data-contact-form] button[type="submit"]').click();
  await expect(page.locator("[data-form-status]")).toContainText("Completá");
  await expect(page.locator("#contact-name")).toBeFocused();
  await expect(page.locator("#contact-name")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator(".field-message:visible")).toHaveCount(4);
  await page.locator("#contact-name").fill("Agus");
  await expect(page.locator("#contact-name")).toHaveAttribute("aria-invalid", "false");

  await page.goto(`${baseURL}/soluciones/pedidos-gastronomia.html`);
  await page.locator('[data-contact-link="Pedidos para gastronomía"]').first().click();
  await expect(page).toHaveURL(/#contacto$/);
  await expect(page.locator("#contact-message")).toHaveValue(/Pedidos para gastronomía/);
});

test("navegación esencial disponible sin JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${baseURL}/`);
  await expect(page.locator("#main-nav")).toBeVisible();
  await expect(page.locator(".menu-toggle")).toBeHidden();
  await expect(page.locator("#hero-title")).toContainText("Soluciones modernas");
  await expect(page.locator(".product-card-link")).toHaveCount(5);
  await context.close();
});
