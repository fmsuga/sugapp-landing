# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Landing V2

- Reestructurada la home como puerta de entrada comercial compacta sin abandonar el hero fotográfico, la intro, la paleta ni las burbujas interactivas.
- Incorporadas seis familias editoriales de soluciones y siete páginas HTML con contenido, SEO y diseño compartidos.
- Incorporados mega menús accesibles para soluciones e industrias, con ocho paneles sectoriales basados en datos centralizados.
- Incorporado Orientador SugApp local mediante un árbol de decisión, con transferencia de contexto al formulario.
- Incorporadas tres experiencias visuales apiladas con su estado real claramente indicado.
- Incorporado mensaje explícito de alcance adaptable, evidencia compacta y formulario con validación y fallback sin canal inventado.
- Agregados `sitemap.xml`, `robots.txt`, `.nojekyll` y un validador de rutas, assets, IDs y metadatos.
- Retirado el catálogo modal genérico y sus estilos/scripts obsoletos.
- Refinado el hero con el título “Soluciones modernas para problemas cotidianos”, composición alineada a la derecha y CTA animado.
- Unificadas la escena de consultas y la de soluciones en una única sección editorial, sin contenido duplicado.
- Incorporados exactamente dieciséis mensajes de comercios y profesionales, distribuidos en dos carriles inclinados con movimiento continuo, aceleración e inversión por scroll, arrastre manual y texto nítido.
- Vinculada cada consulta con una de ocho soluciones concretas: página web o landing page, sitio institucional, catálogo y pedidos, tienda online, turnos, gestión, automatizaciones y software a medida.
- Reemplazado el panel artesanal por un navegador vertical basado en Swiper `14.0.6`, con transición Push, autoplay de siete segundos y bloqueo definitivo después de una interacción manual.
- Reubicados los controles verticales en la composición `Flechas | Lista | Contenido`, con SVG sólidos, targets accesibles y visibilidad limitada a la escena.
- Conservado en mobile el acordeón editorial de apertura única, sin autoplay ni slider visible.
- Agregados estados de foco, navegación por teclado, pausa por hover/foco/visibilidad, soporte para `prefers-reduced-motion` y fallback comprensible sin JavaScript.
- Ampliada la validación Playwright para cubrir 390, 768 y 1440 px, rutas, overflow, mensajes, Swiper, autoplay, controles, bloqueo manual y movimiento reducido.

### Added

- Added an extensible catalog with eight initial digital product categories.
- Added distinct interface-based visual previews for every catalog product.
- Added fullscreen product presentations with sections for benefits, use cases, scope, adaptation, growth, gallery, and contact.
- Added direct product URLs, browser history support, focus management, focus trapping, and Escape-to-close behavior.
- Added separate product data, rendering, navigation, catalog styling, and detail styling modules.
- Added the photographic hero asset and its responsive presentation.
- Added a delayed animated scroll control linked to the interactive laboratory.
- Added scroll-driven progressive darkening of the hero photograph.
- Added section comments in the HTML and CSS to identify editable layout areas.

### Changed

- Replaced the interactive laboratory navigation with a scrollable, immediately visible product catalog.
- Connected product inquiries to the existing contact form while preserving the selected product as context.
- Updated public project documentation to describe the catalog architecture.
- Reworked the hero into a contained viewport composition with reduced lateral margins.
- Replaced the previous header with centered navigation tabs for demos, solutions, process, and contact.
- Split the hero title into word-level elements for a sequential entrance.
- Updated the hero entrance sequence so the photograph, title, description, and actions appear in stages.
- Changed the hero actions to enter consecutively.
- Adjusted the scroll destination to align the laboratory heading near the top of the viewport.
- Updated responsive sizing and positioning for the hero image, content, navigation, and scroll control.

### Removed

- Removed the separate capability and product evidence section now covered by the solution catalog.
- Removed the previous tabbed laboratory, its simulated demo data, and its dedicated JavaScript and CSS.
- Removed the header wordmark and standalone contact button.
- Removed the previous hero comparison component and its unused styles.
- Removed the secondary hero paragraph.
