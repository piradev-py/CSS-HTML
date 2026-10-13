# Formato de una lección de &lt;CSS-HTML&gt;

Este documento es el **contrato** entre el motor de la web (`js/`) y el contenido (`lecciones/`).
Cualquier lección nueva debe cumplirlo al pie de la letra.

## 1. Dónde vive cada cosa

| Qué | Dónde |
|---|---|
| Índice del curso (mundos y lista de lecciones) | `js/curso.js` → array `MUNDOS` |
| Contenido de cada lección | `lecciones/<carpeta-del-mundo>/<archivo>.js` |
| Temario detallado (para humanos) | `docs/PLAN_CURSO.md` |

Carpetas de los mundos: `1-html`, `2-css`, `3-html-css`, `4-js`.

## 2. Índice en `js/curso.js`

Cada mundo tiene una lista `lecciones` con entradas así:

```js
{ id: "html-03", archivo: "html-03-titulos-y-parrafos.js", titulo: "Títulos y párrafos", listo: true }
```

- `id`: prefijo del mundo (`html`, `css`, `hc`, `js`) + número de dos cifras. Correlativo, sin huecos.
- `listo: false` → el mapa la muestra como "🚧 Próximamente". Ponlo a `true` solo cuando el archivo exista.
- El `titulo` del índice y el de la lección deben coincidir.

## 3. Archivo de lección

Es un **script clásico** (nada de `import`/`export`, porque la web debe funcionar abriendo el archivo con doble clic).

```js
CURSO.registrar({
  id: "html-03",
  titulo: "Títulos y párrafos",
  xp: 30,                                   // 20–60 según dificultad
  objetivo: "Sabrás usar <h1>…<h6> y <p> para ordenar un texto.",
  pestanas: ["html"],                       // opcional; por defecto según el mundo (ver §5)
  pasos: [ /* ver §4 */ ]
});
```

## 4. Tipos de paso

Todos los textos admiten un **mini-markdown**: `**negrita**`, `` `código` `` y saltos de línea con `\n`.
Escribe `<` y `>` tal cual: el motor los escapa (no se interpretan como HTML).

### `explicacion` — una idea, un ejemplo
```js
{ tipo: "explicacion",
  titulo: "Las etiquetas son como cajas",          // opcional
  texto: "Una **etiqueta** marca el inicio y el final…",
  ejemplo: { html: "<p>Hola</p>", css: "" },       // opcional: se muestra el código y su resultado
  consejo: "Las etiquetas siempre van en pareja." } // opcional: lo dice la mascota Tagui
```

### `ejercicio` — resolución desde cero (sustituye al antiguo `pruebalo`)
El editor empieza **vacío**. El alumno escribe solo lo que pide el enunciado y pulsa **Revisar**.
No puede avanzar hasta resolverlo (tras ver todas las pistas puede ver la solución).
```js
{ tipo: "ejercicio",
  enunciado: "Escribe un título principal `<h1>` que diga **¡Hola, mundo!** y, debajo, un párrafo que diga **Esta es mi primera página web.**",
  solucion: { html: "<h1>¡Hola, mundo!</h1>\n<p>Esta es mi primera página web.</p>", css: "" },
  pistas: ["Un título principal se escribe con <h1>…</h1>.", "Debajo escribe <p>…</p> con la frase."],
  inicial: { html: "" } }   // opcional: en el Mundo CSS puede venir el HTML ya hecho y el CSS vacío
```
Cómo se revisa (la solución es **única**, pero con flexibilidad en lo que no es código):
- **Etiquetas**: mismas etiquetas, en el mismo orden y anidadas igual. No puede sobrar ni faltar ninguna.
- **Textos**: se ignoran mayúsculas/minúsculas, signos de puntuación (¡!¿?.,;:«»"'…-) y espacios de más.
  Las **tildes sí cuentan** («página» ≠ «pagina»).
- **Atributos**: deben estar los mismos. Valores exactos (`id`, `class`, `href`, `src`…), salvo los de texto
  para personas (`alt`, `title`, `placeholder`, `aria-label`), que son flexibles, y `type`, `charset`, `lang`,
  `target`, `rel`, `method`, que no distinguen mayúsculas. En `class` da igual el orden.
- **CSS**: se compara el estilo **calculado** de cada elemento en las propiedades que usa la solución
  (`red`, `#ff0000` y `rgb(255,0,0)` valen igual).
- **JS**: se compara la página final y lo que sale por la consola (con la misma flexibilidad de texto).
- Si la solución es una página completa (`<html>`), también se comparan `lang` y la cabeza (`<title>`, `<meta>`).

Reglas para escribir el enunciado:
- Tiene que decir **exactamente** qué etiquetas, textos y atributos escribir: el alumno no puede adivinar.
  Escribe los textos exactos en **negrita**.
- Pide solo lo que se acaba de explicar. Corto: 1–3 elementos en las primeras lecciones.
- Distinto del reto final: el ejercicio practica **una** idea; el reto combina varias.

#### Ejercicios en el Mundo CSS (y siguientes)
- Lo normal es dar el **HTML ya escrito** en `inicial.html` y dejar el CSS vacío: el alumno solo escribe CSS.
  La `solucion` repite **exactamente** ese HTML y añade el CSS. El editor se abre solo en la pestaña CSS
  (se puede forzar con `pestana: "html" | "css" | "js"`, también en el `reto`).
- El enunciado dice **selector, propiedad y valor**: «Pon a los `h1` el color `tomato` y a los `p` un `font-size` de `20px`».
- Se compara el estilo **calculado**, así que valores equivalentes valen (`#ff0000` = `red`, `1.25rem` = `20px` con la
  fuente por defecto). Pero el **resultado** debe ser el mismo: si el enunciado dice `20px`, `21px` no vale.
- **CSS con estado (Mundo HTML+CSS).** El revisor hace varias pasadas según lo que use la solución:
  - `:hover`, `:focus` (también `:focus-visible`/`:focus-within`) y `:active`: compara además el estilo
    «con el ratón encima / con el foco / pulsado» de **todos** los elementos a la vez.
  - `@media (min-width|max-width …)`: compara además a **375 px** y a **1280 px** de ancho (la pasada normal es a 800 px).
    Elige los puntos de corte entre 400 y 1200 px para que esas dos pasadas los crucen.
  - `::before`, `::after`, `::marker`: compara su `content` y las propiedades de la solución.
    `::first-letter`, `::first-line`, `::placeholder`: compara las propiedades. **No uses `::selection` en ejercicios**
    (no se puede leer de forma fiable); en el reto, compruébalo con `PRUEBA.reglas(doc, "::selection")`.
  - Transiciones: se compara el valor final (y la propiedad `transition` en sí). Animaciones: se comparan las
    propiedades `animation*` y `@keyframes` no se compara por dentro; las animaciones se paran en su primer fotograma.
  - `prefers-reduced-motion` se evalúa siempre como «movimiento normal» (el ordenador del usuario tiene las
    animaciones reducidas y el resultado no debe depender de eso).
- Que el selector con estado dependa de un orden concreto (`li:hover` después de `li:nth-child(even)`) se compara
  como en la realidad: si el alumno lo pone antes y pierde la cascada, suspende. Avísalo en el enunciado o en una pista.
- Fuentes: solo genéricas o del sistema (`serif`, `sans-serif`, `monospace`, `cursive`…), nunca de internet.
  `font-family` se compara como texto exacto, así que el enunciado debe dar el valor completo.
- Variables CSS: el enunciado debe dar el nombre exacto de la variable (`--color-principal`).
  Su valor se compara sin distinguir mayúsculas ni espacios.
- `cssBase` (opcional, en `ejercicio` y `reto`): CSS decorativo que se aplica **sin aparecer en el editor**
  (colores y tamaño de las cajas, tipografía…), para que el resultado se vea bonito aunque el alumno empiece
  con el CSS vacío. Se aplica igual al alumno y a la solución, así que no cuenta en la revisión. No pongas en
  `cssBase` las propiedades que el ejercicio pide escribir.

### `pruebalo` — editor libre, sin nota (ya no se usa en lecciones nuevas)
```js
{ tipo: "pruebalo",
  instruccion: "Cambia el texto del título y mira qué pasa.",
  inicial: { html: "<h1>Hola</h1>", css: "", js: "" } }
```

### `controles` — mueve deslizadores y mira el CSS que se genera
```js
{ tipo: "controles",
  instruccion: "Mueve el deslizador para cambiar el tamaño.",
  html: "<h1>Soy un título</h1>",
  cssBase: "body { font-family: sans-serif; }",     // opcional, no se muestra
  controles: [
    { selector: "h1", propiedad: "font-size", tipo: "rango", min: 10, max: 80, valor: 32, unidad: "px" },
    { selector: "h1", propiedad: "color", tipo: "color", valor: "#e44d26" },
    { selector: "h1", propiedad: "text-align", tipo: "opciones", opciones: ["left", "center", "right"], valor: "left" }
  ] }
```

### `quiz` — una pregunta de opción única
```js
{ tipo: "quiz",
  pregunta: "¿Qué etiqueta crea el título más importante?",
  opciones: ["<p>", "<h1>", "<h6>"],
  correcta: 1,                                      // índice empezando en 0
  explicacion: "<h1> es el título principal; <h6> el menos importante." }
```

### `reto` — el examen de la lección (**obligatorio, siempre el último paso, solo uno**)
```js
{ tipo: "reto",
  enunciado: "Crea un título principal con tu nombre y un párrafo debajo.",
  inicial: { html: "<!-- Escribe aquí -->\n", css: "" },
  comprobaciones: [
    { texto: "Hay un <h1>",                 prueba: (doc) => !!doc.querySelector("h1") },
    { texto: "El <h1> no está vacío",       prueba: (doc) => doc.querySelector("h1")?.textContent.trim().length > 0 },
    { texto: "Hay un <p> después del <h1>", prueba: (doc) => !!doc.querySelector("h1 ~ p") }
  ],
  pistas: [
    "Un título se escribe así: <h1>Texto</h1>",
    "Debajo, escribe <p>…</p> con una frase."
  ],
  solucion: { html: "<h1>Ana</h1>\n<p>Estoy aprendiendo HTML.</p>", css: "" } }
```

Reglas de las comprobaciones:
- `prueba(doc, win)` recibe el `document` y la `window` del resultado. Devuelve `true`/`false` (o una Promesa de booleano, máx. 2 s).
- Para CSS usa `win.getComputedStyle(el)`. Recuerda que devuelve valores calculados: colores en `rgb(…)`, tamaños en `px`.
- Para JS se puede simular la interacción: `doc.querySelector("button").click()` y luego comprobar. Los `console.log`
  del alumno quedan en `win.__logs` (array de strings).
- Usa `?.` para que una prueba nunca lance error si falta un elemento.
- El reto se evalúa en un marco oculto de **800 × 600 px** y con `prefers-reduced-motion` como «movimiento normal».
- **Ayudantes `PRUEBA` (js/pruebas.js)** para lo que no se ve con la página quieta:
  - `await PRUEBA.clonar(doc, { estado, ancho, alto, movimiento })` → `{ doc, win }` de una copia de la página.
    `estado`: `"hover"`, `"focus"` o `"active"` (se aplica a todos los elementos a la vez). `ancho`: px del marco
    (para media queries). `movimiento`: `"normal"` (por defecto) o `"reducido"`. Las transiciones salen ya terminadas
    y las animaciones paradas en su primer fotograma. Ejemplo:
    `prueba: async (doc) => { const v = await PRUEBA.clonar(doc, { estado: "hover" }); return v.win.getComputedStyle(v.doc.querySelector("li")).backgroundColor !== "rgba(0, 0, 0, 0)"; }`
  - `PRUEBA.reglas(doc, ":hover")` → reglas CSS (también dentro de `@media`) cuyo selector contiene ese texto.
  - `PRUEBA.textoCSS(doc)` → todo el CSS de la página sin comentarios (para buscar `@keyframes`, `@media`…).
  - Pseudo-elementos sin ayudante: `win.getComputedStyle(el, "::before").content`.
  - Para comparar «antes / con el ratón encima», compara `getComputedStyle` del `doc` normal con el de la copia.
- **`dispositivos: true`** (en `ejercicio`, `reto` y `explicacion` con `ejemplo`): añade al resultado los botones
  💻 Libre / 📱 Móvil (375 px) y la medida en px del resultado. Úsalo en las lecciones de responsive.
- Entre 2 y 4 comprobaciones, escritas como frases que un novato entiende.
- La `solucion` debe pasar **todas** las comprobaciones y el `inicial` debe fallar **al menos una**
  (lo verifica `tests/verificar-lecciones.html`).

## 5. Pestañas del editor por mundo

| Mundo | Pestañas por defecto |
|---|---|
| 1 HTML | `html` |
| 2 CSS y 3 HTML+CSS | `html`, `css` |
| 4 JavaScript | `html`, `css`, `js` |

## 6. Estrellas y XP (lo calcula el motor)
- ⭐⭐⭐ reto superado sin pistas · ⭐⭐ usando pistas · ⭐ viendo la solución.
- XP ganada = `xp` de la lección + 10 por estrella (solo la mejora respecto a intentos anteriores).
