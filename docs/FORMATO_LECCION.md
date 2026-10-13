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

### `pruebalo` — editor libre, sin nota
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
