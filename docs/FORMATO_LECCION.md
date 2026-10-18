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

- `id`: prefijo del mundo (`html`, `css`, `hc`, `js`) + número de dos cifras. Un id **no se cambia nunca** (el progreso y los borradores guardados van por id): una lección
  nueva metida entre dos lleva el siguiente número libre de su mundo (`js-15` puede verse como lección 11). El número
  que ve el alumno sale de la posición en la lista.
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
- **Bien escrito antes que nada** (`js/escritura.js`): antes de comparar, el código del alumno tiene que estar
  bien escrito aunque el navegador lo perdone. HTML: cada etiqueta abierta se cierra (menos las vacías como `<br>`,
  `<img>`, `<input>`, `<meta>`), bien anidadas y sin `>` ni comillas sin cerrar. CSS: las `{ }` cuadran y **cada**
  declaración termina en `;` (también la última). JS: `( ) [ ] { }` y comillas cuadran y cada instrucción termina en `;`.
  El mensaje dice qué falta y en qué línea. Por eso **todo el código de la lección** (ejemplos, `inicial`, soluciones)
  debe cumplirlo también: el verificador lo comprueba.
- **Textos**: se ignoran mayúsculas/minúsculas, **tildes** («pagina» = «página»; la ñ sí cuenta: «ano» ≠ «año»),
  signos de puntuación (¡!¿?.,;:«»"'…-) y espacios de más.
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
- Los textos que hay que copiar, cortos y sin paréntesis ni aclaraciones: «Los pulpos en la Wikipedia (se abre en
  otra pestaña)» parece una nota del profesor, y el alumno no la escribe. Si una aclaración es buena costumbre,
  cuéntala en la explicación o en el consejo, no la exijas en el texto.
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
    propiedades `animation*` y el estilo con la animación parada en su primer fotograma y, si hay `@keyframes`,
    también a mitad del primer ciclo (así se detectan erratas en el `to`). El texto de `@keyframes` no se compara.
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

#### Ejercicios en el Mundo JavaScript
- Lo normal: el **HTML ya escrito** en `inicial.html` (y CSS decorativo en `cssBase` si hace falta) y el JS vacío.
  La `solucion` repite exactamente ese HTML y añade el `js`. El editor se abre solo en la pestaña JS.
- Se compara el **efecto** del código, no cómo está escrito: la página final (etiquetas, textos, atributos, clases,
  estilos en línea por su valor calculado, `value`/`checked` de los campos) y **cada línea de la consola**
  (con la misma flexibilidad de texto: sin mayúsculas, signos ni espacios de más). Los nombres de variables dan igual.
  Por eso el enunciado debe dar **los textos exactos** que salen en la consola o en la página.
- Si el código del alumno lanza un error de JS, el revisor lo dice primero, con la línea y en lenguaje de novato.
- **`acciones`** (opcional): si el ejercicio reacciona a lo que hace el usuario, la revisión simula esas acciones en las
  dos páginas, una a una, y compara página y consola **después de cada una**. Sin `acciones`, un ejercicio de eventos
  se aprobaría con el editor vacío (el verificador lo detecta: «el código inicial ya está resuelto»).
  ```js
  acciones: [
    { clic: "#mas" },                         // pulsa el elemento (vale para button, checkbox, li…)
    { escribir: "#nombre", texto: "Ana" },    // escribe en un campo (lanza input y change)
    { elegir: "select", valor: "grande" },    // elige una opción de un <select> (lanza input y change)
    { enviar: "form" }                        // envía el formulario (lanza submit)
  ]
  ```
  Los formularios de los ejercicios llevan `novalidate`: si no, un campo `required` vacío impide el `submit`.
- Lecciones solo de consola (js-01, js-02): pon `pestanas: ["js"]` en la lección; el resultado se convierte en una
  consola grande (el código se sigue ejecutando en un marco invisible). `pestanas` también vale **en un paso**
  (`ejercicio` o `reto`) para un ejercicio solo de consola dentro de una lección con HTML. Un `ejemplo` con `js` y sin `html` también
  se muestra así; con `html` y `js`, el resultado lleva la consola debajo.

### Herramientas del resultado en el Mundo JavaScript (las da el motor, ver `js/editor.js`)
- **Consola** bajo el resultado, con formato legible: `["pan", 2]`, `{ nombre: "Ana", vida: 100 }`,
  `<h1 id="t">Hola</h1>`, `NodeList(3) [<li>, <li>, <li>]`, `Promise { … }`, `Date(18/10/2026, 11:45:21)`. `console.warn` sale en amarillo y
  `console.error` en rojo. Los errores salen traducidos y con la línea: «(línea 3) 🤔 Usas «consola» pero no existe…».
- Botón **🔄 Recargar**: vuelve a ejecutar el código como si se recargara la página.
- `alert()`, `confirm()` y `prompt()` no bloquean: se avisan en la consola (`prompt` devuelve `null`). No se enseñan.
- **`localStorage` de práctica**: funciona como el real, pero vive en el resultado (no toca el progreso del curso).
  Sobrevive a 🔄 Recargar y a cada cambio del código; se vacía al salir del paso o con «↺ Reiniciar».
  La consola muestra «💾 N datos guardados» con un botón para borrarlos. En las revisiones siempre empieza vacío.
- **`fetch("datos/archivo.json")` sin internet**: la lección declara sus archivos y el motor los sirve con un pequeño
  retraso (300 ms), para que se note el «pedir y esperar». Respuesta con `ok`, `status`, `json()` y `text()`;
  un archivo que no existe da `404` (`ok: false`). Cualquier otra URL usa el `fetch` real (necesita internet).
  ```js
  CURSO.registrar({ id: "js-13", …, datos: { "chistes.json": [{ pregunta: "…", respuesta: "…" }] }, pasos: [ … ] });
  ```
  Las revisiones (ejercicios y retos) esperan a que terminen los `fetch` antes de comparar.
- **Bucles infinitos**: el motor mete un vigilante en cada `for`/`while`/`do` del alumno (`EDITOR.protegerBucles`).
  Si un bucle lleva más de 1,5 s dando vueltas sin parar, se corta y la consola dice «🔁 Este bucle no termina nunca…»
  con su línea. Aun así, el temario usa `for…of` y `forEach` y no enseña `while`.

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
- **Ayudantes `PRUEBA` para el Mundo JavaScript.** Las comprobaciones se ejecutan una tras otra sobre **la misma**
  página: si una pulsa un botón, la siguiente ve el resultado. Para que cada una empiece de cero, usa `recargar`:
  - `await PRUEBA.recargar(doc)` → `{ doc, win }` de una copia que vuelve a ejecutar el código **original** (como F5).
    Conserva el `localStorage` de práctica (ideal para «recuerda el nombre al recargar»); con `{ borrarDatos: true }` empieza vacío.
    Con `{ sinDatos: ["chistes.json"] }`, en esa copia `fetch("datos/chistes.json")` da 404 (para comprobar que el alumno trata el error).
  - `PRUEBA.escribir(campo, "texto")` → escribe en un `input`/`textarea`/`select` y lanza `input` y `change`.
  - `await PRUEBA.esperarA(() => condición, 1500)` → espera hasta que se cumpla (p. ej. que lleguen los datos de un `fetch`).
  - `PRUEBA.codigo(doc)` → el JS que escribió el alumno, sin comentarios (con `{ comentarios: true }`, tal cual).
    Para comprobar **cómo** se hizo algo (que use `const`, una plantilla, `*`…). Úsalo con moderación: mejor comprobar el efecto.
  - `win.__logs` → array con cada línea de la consola (ya formateada). `win.__errores` → errores de JS `[{ mensaje, linea }]`.
  - Enviar un formulario: `form.requestSubmit()` (con `novalidate` en el `<form>`). Pulsar: `boton.click()`.
  - Ejemplo: `prueba: async (doc) => { const v = await PRUEBA.recargar(doc); v.doc.querySelector("#mas").click(); v.doc.querySelector("#mas").click(); return v.doc.querySelector("#n").textContent === "2"; }`
- **`dispositivos: true`** (en `ejercicio`, `reto` y `explicacion` con `ejemplo`): añade al resultado los botones
  💻 Libre / 📱 Móvil (375 px) y la medida en px del resultado. Úsalo en las lecciones de responsive.
- **`vistaPrevia: true`** (en los mismos pasos): bajo el resultado, cómo ven la página un buscador (favicon, `<title>`,
  meta description) y una red social al compartir el enlace (`og:title`, `og:description`, `og:image`). Lo lee del `<head>`
  del resultado. Úsalo en html-13.
- Entre 2 y 4 comprobaciones, escritas como frases que un novato entiende. El motor añade siempre una más al final:
  «Tu código está bien escrito: etiquetas cerradas, `{ }` y `;`» (ver «Bien escrito antes que nada»). No la escribas tú.
- La `solucion` debe pasar **todas** las comprobaciones y el `inicial` debe fallar **al menos una**
  (lo verifica `tests/verificar-lecciones.html`).

### `proyecto` — un encargo de la web de «Huellas» (solo en las lecciones de proyecto)
Funciona como un `reto` (lista de comprobaciones que se marcan en verde, pistas, solución), con estas diferencias:
- Una lección de proyecto tiene **varios** pasos `proyecto`, **ningún** `reto`, y acaba con un `proyecto`.
  Cada encargo superado abre el siguiente; el último completa la lección con las estrellas del **peor** encargo.
- El código se **comparte** entre todos los encargos de la lección (un solo borrador): cada uno sigue donde lo dejó
  el anterior. `inicial` solo se usa si no hay borrador y para «↺ Reiniciar»: pon ahí la versión oficial del paso anterior.
- `proyecto: { raiz: "recursos/huellas/web/", html: "index.html", css: "estilos.css", js: "script.js" }`
  (obligatorio): las pestañas llevan esos nombres y el resultado funciona como una web de verdad: **el CSS y el JS solo
  se aplican si el HTML los enlaza** (`<link rel="stylesheet" href="estilos.css">`, `<script src="script.js"></script>`;
  el script se ejecuta siempre al final del `<body>`) y las rutas relativas (`img/…`, `url(img/…)`) salen de `raiz`.
  La hoja enlazada queda en `<style data-archivo="estilos.css">`, para comprobar que se enlazó.
- `captura` (opcional): imagen de cómo debe quedar, bajo el enunciado (se abre en grande al pulsarla).
  Se generan con `MUNDO=1 node tests/navegador/cdp.mjs esc-capturas-huellas.mjs` (en `recursos/huellas/capturas/`).
- `textos` (opcional): los textos del cliente, en texto plano, en una caja «📄 Textos del encargo» con «📋 Copiar».
  Son el contenido; las etiquetas las pone el alumno.
- `alternativas` (opcional): `[{ html, css, js }]`, la misma web escrita de otra forma (otras etiquetas de agrupación,
  otras clases). El verificador exige que **también aprueben**: así se comprueba que se mira el resultado, no el código.
- En cada comprobación, `repaso: "html-09"` (opcional) muestra mientras falla «📚 Repasa «…»» con un enlace a esa
  lección (en otra pestaña). Hasta 12 comprobaciones por encargo.
- La lección lleva `huellas: true` en `MUNDOS` (js/curso.js): así se carga antes `lecciones/huellas/versiones.js`, con
  `HUELLAS["mundo-1"]` … `HUELLAS["mundo-4"]` = `{ html, css, js, privacidad, datos }`, la web oficial al final de cada
  mundo. Se genera con `node herramientas/huellas-versiones.mjs` (sale del historial de git: commits apuntados en el script).
- Comportamiento con fechas: `PRUEBA.recargar(doc, { hoy: "2026-10-20T10:00" })` para el reloj en ese momento.
- `glosario: ["<table>", "<th>"]` (opcional, en el encargo): esos términos salen arriba en «⭐ Para este encargo».
  Cada encargo lleva el botón **📚 Glosario**: un panel sobre la columna de la lección (el código y el resultado siguen
  a la vista) con todo lo que enseñan las lecciones **anteriores**, por mundo y por tema, con buscador y «Copiar».

### `glosario` de cada lección (en `CURSO.registrar`, junto a `objetivo`)
Lo que enseña la lección, para el glosario de las lecciones de proyecto (`js/glosario.js`):
```js
glosario: [
  { termino: "<label for=\"…\">", tema: "Formularios",
    para: "El texto de un campo; `for` lleva el `id` del campo y los une.",
    ejemplo: '<label for="nombre">Tu nombre</label>',
    buscar: "etiqueta texto campo accesibilidad" }   // palabras extra para el buscador (sin tildes)
]
```
- `tema` agrupa dentro del mundo (usa los mismos nombres en todo el mundo). `para`: una línea, en lenguaje de novato.
- `ejemplo`: mínimo y copiable, bien escrito (lo comprueba el verificador). Se resalta como HTML si empieza por `<`,
  como JS en el Mundo JavaScript y si no como CSS; `lenguaje: "html"` lo fuerza.
- Hoy tienen glosario las lecciones del Mundo 1; los demás mundos lo reciben antes de su lección de proyecto.
- Para `fetch("datos/opiniones.json")` sin internet, la lección declara `datos: HUELLAS["mundo-4"].datos`.

## 5. Pestañas del editor por mundo

| Mundo | Pestañas por defecto |
|---|---|
| 1 HTML | `html` |
| 2 CSS y 3 HTML+CSS | `html`, `css` |
| 4 JavaScript | `html`, `css`, `js` |

## 6. Estrellas y XP (lo calcula el motor)
- ⭐⭐⭐ reto superado sin pistas · ⭐⭐ usando pistas · ⭐ viendo la solución.
- XP ganada = `xp` de la lección + 10 por estrella (solo la mejora respecto a intentos anteriores).
