# Reglas para agentes (opencode)

Eres un agente junior. Cada tarea te dice qué archivos tocar y, a menudo, en qué líneas. Un revisor mira tu diff después.

## No explores el proyecto
- Lee **solo** los archivos que nombra la tarea. No hagas `ls`/`glob` del proyecto ni abras archivos «por si acaso».
- Si la tarea da números de línea, lee ese rango (con unas 30 líneas de margen), no el archivo entero.
- Si necesitas el formato de un paso de lección, lee **solo su sección** de `docs/FORMATO_LECCION.md`:
  `explicacion` L50 · `ejercicio` L59–171 (JS desde L127) · `quiz` L192 · `reto` L201–256 · `proyecto` L257 · `glosario` L287.
- Si te falta algo para terminar, **para y pregunta**. No lo busques por todo el repositorio.

## Qué no hacer
- No hagas commit ni push. No toques `CAMBIOS.md`, `docs/PENDIENTES.md` ni `herramientas/version.mjs`: eso lo hace el revisor.
- No cambies archivos que la tarea no nombre. No cambies nunca el `id` de una lección.
- No reformatees ni reordenes código que no forma parte de la tarea.

## Cómo son las lecciones (lo justo)
- `lecciones/<mundo>/<id>-<nombre>.js` es un script clásico con `CURSO.registrar({ id, titulo, xp, objetivo, terminos, pasos: [...] })`, sin `import`/`export`.
- Textos en español, tuteando y en tono cercano. Mini-markdown: `**negrita**`, `` `código` ``, `\n`.
- Un `reto` es el último paso. Sus `comprobaciones` son `{ texto, prueba: (doc) => booleano }` (async en JS, con `PRUEBA.recargar`, `PRUEBA.escribir`…).
  **La solución tiene que aprobar todas y el código `inicial` no.** Máximo 5 comprobaciones por reto (lo exige el verificador).
- En los `ejercicio` la revisión compara con `solucion`: si cambias el enunciado, cambia también `pistas` y `solucion`.

## Traducir la interfaz (Español → English)
- Lee la cabecera de `js/textos.js`. Cada texto visible del archivo de la tarea se envuelve en `T("…")` **sin cambiar
  el español**, y su inglés va al objeto `EN` de `js/textos.js`: `"texto en español": "English text",`.
- Partes que cambian (números, nombres): `T("Lección {n}", { n: numero })` y en `EN` `"Lección {n}": "Lesson {n}"`.
- No traduzcas: código, nombres de etiquetas/propiedades, clases, ids, claves de `localStorage`, rutas, emojis sueltos.
- En `T()` va **el texto**, nunca la estructura: `'<button class="boton">' + T("Enviar") + "</button>"`. Un `T()` no
  empieza nunca por una etiqueta, ni lleva `name=`, `id=` o `class=` de formularios o cajas.
  Solo el formato dentro de una frase (`<b>`, `<code>`, `<span class="resaltado">`) puede ir dentro, con su frase entera.
- Atributos visibles (`placeholder`, `title`, `aria-label`): solo su valor, `placeholder="' + T("Por ejemplo…") + '"`.
- **En `EN`, siempre comillas dobles** `"…": "…",` (el inglés lleva apóstrofos: `don't`, `you'll`). Dentro, `\"` si hace falta.
- Inglés claro y cercano, para principiantes (tutea: «you»), como el español del curso.
- Al terminar, `node herramientas/traducciones.mjs` debe decir ✅ (cada `T()` con su inglés y los mismos `{marcadores}`).

## Traducir una lección (Español → English)
- La lección inglesa es una **copia** con el mismo nombre en `lecciones-en/` (p. ej. `lecciones-en/1-html/html-01-que-es-html.js`).
  El original en `lecciones/` **no se toca**. **No toques `js/curso.js`**: el `en: "…"` de la lección lo añade el revisor
  (trabajáis a la vez y ese archivo no puede llevar lecciones a medias). Usa como `titulo` el inglés que te da la tarea.
- Igual que el original: `id`, `xp`, número, orden y tipo de pasos, `correcta` de los quiz, selectores, ids, clases,
  nombres de archivo e imágenes. Cambia solo lo que lee el alumno.
- Se traduce: `titulo` (el que da la tarea), `objetivo`, `glosario` (`termino` si es una palabra y no código,
  `tema`, `para`, `buscar` con palabras inglesas), títulos, textos, `consejo`, enunciados, pistas, preguntas, opciones,
  explicaciones, los `texto` de las comprobaciones, y el contenido visible del código de ejemplos, `inicial` y
  `solucion` (textos de la página, comentarios, mensajes de consola): `<p>Mi gato</p>` → `<p>My cat</p>`.
- **Las comprobaciones que buscan texto** (`includes("Ana")`, `includes("de nuevo")`, mensajes de consola…) se adaptan al
  texto inglés de la solución. La regla de oro sigue: la solución aprueba todas y el código `inicial` ninguna.
- Si el enunciado pide escribir un texto exacto («¡Hola, mundo!»), la solución y las pistas usan el mismo texto inglés.
- En el texto inglés, comillas “ ” donde el español usa « ».
- El `tema` del glosario agrupa términos de **todas** las lecciones: usa SIEMPRE esta traducción, exacta:
  Formularios → Forms · Texto → Text · Flexbox → Flexbox · Cajas → Boxes · Variables → Variables ·
  Semántica → Semantics · Responsive → Responsive · Posición → Positioning · DOM → DOM · La cabeza → The head ·
  Grid → Grid · Colores → Colors · Selectores → Selectors · Pseudo-clases → Pseudo-classes · Medidas → Units ·
  Imágenes → Images · Fechas → Dates · Enlaces → Links · Display → Display · Condiciones → Conditions ·
  Bordes y sombras → Borders and shadows · Tablas → Tables · Pseudo-elementos → Pseudo-elements · Menús → Menus ·
  Datos de internet → Data from the internet · Crear elementos → Creating elements · Cascada → Cascade ·
  Arrays → Arrays · Animaciones → Animations · Transiciones → Transitions · Transformaciones → Transforms ·
  Tarjetas → Cards · Reglas → Rules · Objetos → Objects · Guardar datos → Saving data · Funciones → Functions ·
  Filtrar → Filtering · Eventos → Events · Estructura → Structure · Lo básico → The basics · Listas → Lists ·
  Consola → Console
- El comentario de cabecera del archivo puede quedar en español (es para quien mantiene el curso).
- Un `termino` del glosario que sea código se queda igual salvo lo que cambie de verdad (`<html lang="es">` → `lang="en"`;
  `<ul> y <li>` → `<ul> and <li>`). Las lecciones de proyecto los citan por ese nombre exacto.
- Al terminar: `node --check` del archivo nuevo y `node herramientas/lecciones-en.mjs <id> <id>…`
  (compara con el original lo que no debe cambiar): tiene que salir ✅ salvo «falta en:» (eso es del revisor), y mira
  a mano cada ⚠️ (restos de español).
  Los tests del navegador los pasa el revisor.

## Al terminar
- Tareas de traducción de la interfaz: `node --check` de cada archivo que tocaste y `node herramientas/traducciones.mjs`.
  **No lances los tests del navegador** (`tests/navegador/…`): los pasa el revisor (dos Edge a la vez se cuelgan).
- Tareas de lecciones: `node tests/navegador/cdp.mjs esc-tests.mjs` (Node 22 + Edge), solo si la tarea lo pide, y pega
  la salida de la lección que tocaste.
Termina con un resumen de 3–5 líneas: qué archivos cambiaste y qué no pudiste comprobar.
