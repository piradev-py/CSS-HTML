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

## Al terminar
Ejecuta `node tests/navegador/cdp.mjs esc-tests.mjs` (Node 22 + Edge) y pega la salida de la lección que tocaste.
Termina con un resumen de 3–5 líneas: qué archivos cambiaste y qué no pudiste comprobar.
