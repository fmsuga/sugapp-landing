# SugApp Landing V2

Landing comercial estática de SugApp. Presenta seis familias de soluciones, siete páginas de producto, experiencias visuales, orientación guiada e industrias contextualizadas. No requiere build ni dependencias de frontend.

## Ejecutar localmente

Desde la raíz:

```powershell
python -m http.server 8000
```

Abrí `http://localhost:8000/`. No abras los HTML directamente: los módulos JavaScript necesitan un servidor HTTP.

## Validar

```powershell
node --check js/main.js
node --check js/site-data.js
node tools/validate.mjs
git diff --check
```

La revisión visual objetivo cubre 390, 768 y 1440 px, navegación por teclado, modales, `Escape` y movimiento reducido.

## Estructura y edición

- `index.html`: home, mega menús, experiencias, contacto y contenedores de paneles.
- `soluciones/*.html`: páginas comerciales con contenido y SEO propios.
- `css/styles.css` y `css/pages.css`: sistema visual compartido.
- `js/site-data.js`: familias, industrias, preguntas y reglas del orientador.
- `js/client-messages.js`: mensajes de necesidades.
- `js/config.js`: canal público de contacto.
- `tools/validate.mjs`: chequeo local de rutas, assets, IDs y metadatos.

Para agregar una industria, sumá su entrada en `industries` dentro de `js/site-data.js` y un botón `data-industry` en el mega menú. Para agregar una solución, creá su HTML, enlazala desde `solutions` y actualizá `sitemap.xml`. Las reglas del orientador viven en `advisorSteps` y `getRecommendation`.

Las experiencias de la home son composiciones HTML/CSS. Para reemplazarlas por evidencia real, conservá el rótulo de estado, dimensiones explícitas, texto alternativo y enlaces del producto correspondiente.

## Contacto pendiente

No hay email ni WhatsApp público confirmado. Completá `CONTACT.email` o `CONTACT.whatsapp` en `js/config.js`; WhatsApp debe usar código de país y solo dígitos. Mientras ambos estén vacíos, el formulario valida y copia una consulta, sin dejar un botón roto.

## Publicación

El sitio está preparado para GitHub Pages desde la raíz de `main`: incluye `.nojekyll`, rutas relativas, `robots.txt` y `sitemap.xml`. En el repositorio, configurá **Settings → Pages → Deploy from a branch → main / root**. El dominio canónico actual es `https://fmsuga.github.io/sugapp-landing/`.
