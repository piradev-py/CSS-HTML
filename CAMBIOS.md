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

## 1.4.3 · 2026-10-27

- Cuatro lecciones más del **Mundo CSS** en inglés: Flexbox (I) y (II), Grid y CSS variables (css-11 … css-14).
  Solo falta su Proyecto web.

## 1.4.2 · 2026-10-25

- Cuatro lecciones más del **Mundo CSS** en inglés: The box model, Borders and shadows, Display: block and inline y
  Positioning (css-07 … css-10).

## 1.4.1 · 2026-10-25

- Cuatro lecciones más del **Mundo CSS** en inglés: Colors, Text and fonts, The cascade: who wins? y Units of
  measurement (css-03 … css-06).

## 1.4.0 · 2026-10-24

- **El curso, en inglés.** Se abre en inglés y el botón **ES** de la cabecera lo pasa a español (y **EN** al revés).
  Toda la interfaz está traducida: mapa, lecciones, revisor, editor, laboratorio y Mi clínica.
- El **Mundo HTML** está entero en inglés, incluido su Proyecto web con la clínica Huellas en inglés. Las lecciones de
  los demás mundos salen todavía en español, con un aviso, hasta que se traduzcan.
- La vista previa del buscador de html-13 ya muestra completo el aviso «Sin `<title>`» (antes solo se leía «Sin»).

## 1.3.5 · 2026-10-24

- Preparación del curso en inglés (aún no visible en la web publicada): `js/textos.js` con `T()` para traducir la
  interfaz, botón EN/ES en la cabecera y carpeta `lecciones-en/` para las lecciones traducidas. Se activa con
  `PUBLICADO` en `js/textos.js` cuando la interfaz esté traducida.

## 1.3.4 · 2026-10-24

- js-12: el reto es ahora «Tu cuaderno de avistamientos»: guarda una lista de objetos (`{ especie, cantidad }`) con
  `JSON.stringify`, la carga con `JSON.parse(…) || []` al empezar y la pinta con `createElement`; se puede borrar
  entera. Las comprobaciones recargan la página para ver que se acuerda.
- html-07: la nota de la cabecera nombra los atributos que comprueba ahora (`height` y `loading`).

## 1.3.3 · 2026-10-24

- js-11: el reto del club de exploradores tiene tres campos (nombre, email y una casilla), cada uno con su mensaje
  en su párrafo, y se resuelve con la bandera `todoBien`: si los tres van mal, salen los tres mensajes a la vez.

## 1.3.2 · 2026-10-24

- html-07: el ejercicio de Tagui pide `width` **y** `height`, y el reto de la galería pide los dos tamaños en la
  proporción de la imagen y `loading="lazy"` en la foto de más abajo (la explicación ya los enseñaba).

## 1.3.1 · 2026-10-19

- css-10: con la cabecera `sticky`, `scroll-margin-top` evita que el título de una sección quede tapado al saltar a
  ella desde el menú. El Proyecto web del Mundo HTML + CSS (hc-13) lo pide y lo comprueba, y la web de Huellas lo usa.
- js-16: un consejo sobre `getDay()` (el día de la semana) y la trampa de la fecha sin hora; los dos con su ficha en
  el glosario.

## 1.3.0 · 2026-10-19

- **Proyecto web «Huellas»**: al final de cada mundo construyes una parte de la misma web, la de la clínica
  veterinaria Huellas, a partir de un encargo del cliente (captura, textos para copiar, guía de estilo):
  - Mundo HTML: **html-14**, la clínica en HTML desde la hoja en blanco (5 encargos).
  - Mundo CSS: **css-15**, su identidad en `estilos.css` (4 encargos).
  - Mundo HTML + CSS: **hc-13**, la maqueta para móvil, tableta y ordenador, con estados y movimiento (5 encargos).
    Sustituye a la landing de adopción (hc-11 y hc-12).
  - Mundo JavaScript: **js-17**, la web funciona: menú, filtros, cita validada y «Mis citas» (6 encargos).
    Sustituye a la lista de tareas (js-14).
  - Se comprueba el resultado, no cómo lo escribes; cada comprobación en rojo enlaza a la lección que repasar.
  - Quien ya hizo hc-11, hc-12 o js-14 conserva su XP y sus insignias; sus enlaces llevan a la lección nueva.
- **Glosario** en las lecciones de proyecto: todo lo aprendido hasta ahí, por mundo y por tema, con buscador y «Copiar».
- **Mi clínica**: al terminar el curso, tu web a pantalla entera y un botón para **descargarla en .zip** y abrirla en
  tu ordenador.
- **Laboratorio**: una página para practicar libremente con HTML, CSS y JavaScript, con ejemplos, deshacer y
  descarga en .zip. Está en la página de inicio.
- **Lecciones nuevas**: html-13 «La cabeza de la página», js-15 «Filtrar listas» y js-16 «Fechas y horas».
- Lecciones ampliadas: `letter-spacing` (css-04), `grid-column: 1 / 3` (css-13) y una capa con `::after` y
  `linear-gradient` (hc-03).
- «Repetir» en una lección de proyecto empieza de cero.

## 1.2.0 · 2026-10-18

- **Lecciones ampliadas** (preparan el proyecto final de la clínica «Huellas»):
  - Mundo HTML: enlaces `tel:`, `mailto:` y a otra página propia (html-06); `width` y `height` juntos y
    `loading="lazy"` (html-07); campos `tel`, `date` y `time` (html-10).
  - Mundo CSS: contraste AA (css-03), fuentes de Google Fonts (css-04), contenedor con `max-width` (css-07),
    listas sin viñetas con ejercicio (css-09) y un ejercicio de cabecera `sticky` (css-10).
  - Mundo HTML + CSS: el menú del móvil con la clase `abierto` (hc-06), `transition: none` para quien pide menos
    movimiento (hc-09) y `:user-invalid` (hc-10).
  - Mundo JavaScript: `setAttribute` y `aria-expanded` (js-04), un botón «Quitar» en cada elemento con ejercicio
    (js-10), validar muchos campos con `.checked` y una bandera (js-11) y guardar una lista de objetos (js-12).
- Revisor de la consola: dice qué sobra o qué falta en la línea («sobra «$» al principio»), avisa de las demás líneas
  mal y recuerda cómo va el `${…}`. Las mayúsculas no cuentan, como las tildes.
- js-02: cómo escribir las comillas invertidas en un teclado latinoamericano.
- El modo prueba solo existe en local (no en la web publicada). «Reiniciar curso» queda solo en ⚙️ Ajustes.

## 1.1.5 · 2026-10-14

- Editor: al escribir o bajar con las flechas, la vista sigue al cursor y deja un pequeño margen (una línea)
  bajo él. Antes, con mucho código, se escribía pegado al borde de abajo, medio escondido.

## 1.1.4 · 2026-10-14

- Revisor de escritura: avisa cuando el navegador no entiende una propiedad o un valor CSS (`space-betwen`,
  `space between`, `traslateY`, `-20` sin `px`…), con la línea, y también de los espacios «raros» que llegan
  al copiar y pegar. Antes el navegador los tiraba sin decir nada y solo salía «no coincide en
  `justify-content`», sin pistas de qué estaba mal.

## 1.1.3 · 2026-10-14

- hc-09, reto del fantasma: nueva comprobación de que el `@keyframes flotar` mueve de verdad. Antes aprobaba
  con `traslateY` o sin `px`, aunque el fantasma no se moviera.
- Ejercicios con `@keyframes`: además del primer fotograma, se compara la animación a la mitad, para detectar
  erratas en el `to`.
- Si el ordenador tiene activado «reducir movimiento» y el código usa `@media (prefers-reduced-motion: reduce)`,
  el resultado muestra «🐢 Tu ordenador reduce el movimiento». El enunciado de hc-09 explica cómo verlo moverse.

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
