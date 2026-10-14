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

## 1.1.2 · 2026-10-14

- Editor: los números de línea van en su propia franja, separada por una raya, y el código empieza después.
  Antes, al desplazar a los lados una línea larga, el código pasaba por debajo de los números y se mezclaban.

## 1.1.1 · 2026-10-14

- Editor: al escribir `}` al principio de una línea, se quita un nivel de sangría y la llave queda a la altura
  de su `{`. Antes se quedaba metida hacia dentro, y en las `@media` (llaves dentro de llaves) costaba ver qué
  cerraba cada una.
- hc-06: el ejercicio y el reto avisan de que la sangría no cuenta, pero las llaves sí: cada `{` necesita su `}`.

## 1.1.0 · 2026-10-14

- **Buzón de sugerencias**: botón 💬 en la cabecera (mapa y lecciones). Abre una ventana para avisar de un error,
  proponer una idea o preguntar una duda, con correo opcional. Se envía sin salir de la web a un Formulario de
  Google del autor, junto con la lección, el paso y la versión. Las respuestas se revisan y se borran en su Hoja
  de cálculo. Los códigos del formulario están en `js/sugerencias.js`.

## 1.0.2 · 2026-10-14

- html-07, paso del `alt`: el ejemplo muestra una imagen que carga (la pizza) junto a la que falla a propósito
  (`dragon.svg`), con una frase que lo explica en el propio resultado. Antes solo salía la imagen rota y parecía
  un fallo de la web.

## 1.0.1 · 2026-10-14

- html-06, ejercicio de los pulpos: el texto del enlace es solo **Los pulpos en la Wikipedia**. Antes pedía
  también «(se abre en otra pestaña)», que parecía una aclaración y no algo que hubiera que escribir.
  El enunciado ya no dice «en este orden»: el orden de los atributos nunca contó.

## 1.0.0 · 2026-10-14

Primera versión numerada.

- Los cuatro mundos completos: HTML (12 lecciones), CSS (14), HTML + CSS (12) y JavaScript (14).
- Al superar un reto, **Enter** lleva a la siguiente lección.
- Al volver al mapa desde una lección, se abre el mundo de esa lección.
- Los enlaces del resultado abren una **página de prueba** con «← Volver al ejemplo».
- Los enlaces con `#` saltan dentro del resultado en vez de cargar el curso.
- Versión visible en el pie del mapa y en ⚙️ Ajustes. Los archivos llevan `?v=` para no usar copias viejas.
