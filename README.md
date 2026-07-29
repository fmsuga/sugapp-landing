# SugApp

Landing pública e interactiva de SugApp.

Presenta soluciones digitales para negocios y profesionales mediante un catálogo extensible. Cada producto abre una experiencia propia con beneficios, aplicaciones, alcance, evolución y contacto.

## Ejecución local

El proyecto usa HTML, CSS y JavaScript nativos. Para servir los módulos ES:

```bash
python -m http.server 4173
```

Luego abrí `http://localhost:4173`.

## Estructura

- `index.html`: estructura general de la landing y contenedor del catálogo.
- `css/product-catalog.css`: grilla y representaciones de productos.
- `css/product-detail.css`: experiencia fullscreen de cada producto.
- `js/product-data.js`: contenido estructurado y extensible.
- `js/product-catalog.js`: componentes visuales y renderizado.
- `js/product-navigation.js`: hash, historial, foco y apertura/cierre.
