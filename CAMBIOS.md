# Cambios de &lt;CSS-HTML&gt;

Cada versión publicada, de la más nueva a la más antigua. La versión que tienes cargada se ve en el pie del mapa
y en ⚙️ Ajustes.

## Cómo se numeran

`MAYOR.MENOR.ARREGLO`, por ejemplo `1.2.3`:

- **ARREGLO** (`1.0.0` → `1.0.1`): se corrige algo que fallaba o se pule un texto.
- **MENOR** (`1.0.1` → `1.1.0`): algo nuevo, como una lección, un paso o una función de la web.
- **MAYOR** (`1.1.0` → `2.0.0`): un cambio grande, como el curso en inglés o un mundo nuevo.

Para publicar una versión:

1. Apunta aquí abajo qué cambia.
2. `node herramientas/version.mjs X.Y.Z` (cambia el número en `js/curso.js` y los `?v=` de las páginas).
3. Commit y push a `main`. GitHub Pages la publica en uno o dos minutos.

Gracias al `?v=`, una recarga normal (F5) ya trae los archivos nuevos.

## 1.0.0 · 2026-10-14

Primera versión numerada.

- Los cuatro mundos completos: HTML (12 lecciones), CSS (14), HTML + CSS (12) y JavaScript (14).
- Al superar un reto, **Enter** lleva a la siguiente lección.
- Al volver al mapa desde una lección, se abre el mundo de esa lección.
- Los enlaces del resultado abren una **página de prueba** con «← Volver al ejemplo».
- Los enlaces con `#` saltan dentro del resultado en vez de cargar el curso.
- Versión visible en el pie del mapa y en ⚙️ Ajustes. Los archivos llevan `?v=` para no usar copias viejas.
