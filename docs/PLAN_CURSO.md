# Plan del curso &lt;CSS-HTML&gt;

Temario completo, de cero absoluto a frontend avanzado. Este documento es para humanos;
el índice que usa la web está en `js/curso.js` → `MUNDOS`. **Ambos deben estar siempre sincronizados**
(mismo id, archivo y título).

- Alumno tipo: hispanohablante que **nunca ha programado**.
- Una idea por lección. Nunca se usa algo que no se haya enseñado antes.
- Cada lección: 2–3 explicaciones → 1 pruébalo → (controles, solo en CSS visual) → 1 quiz → 1 reto final.
- XP base entre 20 y 60 según dificultad (el motor suma +10 por estrella).

Estado: ✅ escrita · 🚧 pendiente

| Mundo | Lecciones | XP base total |
|---|---|---|
| 1 · HTML 🏗️ | 12 | 415 |
| 2 · CSS 🎨 | 14 | 535 |
| 3 · HTML + CSS 🧩 | 12 | 575 |
| 4 · JavaScript ⚡ | 14 | 600 |
| **Total** | **52** | **2125** |

---

## Mundo 1 · HTML 🏗️ — «Los ladrillos de toda página web»

**Objetivo del mundo:** entender qué es una página web y aprender a escribir su contenido con HTML,
bien ordenado y con significado, sin preocuparse todavía por el aspecto.

**Al terminarlo, el alumno sabrá:** escribir una página completa desde cero (esqueleto, títulos, textos,
listas, enlaces, imágenes, tablas y formularios), agruparla en cajas y usar etiquetas semánticas y
accesibles (`alt`, `label`, `header`, `main`…) como lo haría un profesional.

### html-01 · ¿Qué es HTML? · 20 XP ✅
- **Objetivo:** entender qué es una página web, qué es HTML y cómo se escribe una etiqueta.
- **Conceptos nuevos:** página web, navegador, HTML, etiqueta de apertura y de cierre, contenido, elemento.
- **Reto:** convertir una frase suelta en un párrafo rodeándola con `<p>` y `</p>`.

### html-02 · La estructura de una página · 30 XP ✅
- **Objetivo:** escribir el esqueleto que tiene toda página web y saber qué va en la cabeza y qué en el cuerpo.
- **Conceptos nuevos:** `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`, `<meta charset>`, `<title>`, atributo (primer contacto), anidar, sangría, comentarios `<!-- -->`.
- **Reto:** completar el esqueleto de «la web de tu mascota» añadiendo la `meta charset`, un `<title>` con la palabra «mascota» y un `<h1>` con su nombre.

### html-03 · Títulos y párrafos · 30 XP ✅
- **Objetivo:** ordenar un texto con títulos de distintos niveles y párrafos.
- **Conceptos nuevos:** `<h1>`…`<h6>`, jerarquía de títulos, un solo `<h1>` por página, no saltarse niveles, `<p>`, el navegador junta los espacios.
- **Reto:** ficha de tu videojuego favorito: un `<h1>` y dos secciones con `<h2>` + `<p>`.

### html-04 · Negritas, cursivas y énfasis · 30 XP ✅
- **Objetivo:** resaltar palabras dentro de un texto diferenciando «importante» de «con énfasis».
- **Conceptos nuevos:** `<strong>`, `<em>`, `<mark>`, `<br>`, etiquetas vacías, elementos «en línea» (dentro de una frase) frente a «de bloque».
- **Reto:** cartel de aviso de un gato gruñón: marcar la advertencia con `<strong>`, una palabra con `<em>` y otra con `<mark>`.

### html-05 · Listas · 30 XP ✅
- **Objetivo:** crear listas con viñetas, listas numeradas y listas dentro de listas.
- **Conceptos nuevos:** `<ul>`, `<ol>`, `<li>`, listas anidadas.
- **Reto:** receta de batido: ingredientes en una `<ul>` y pasos en una `<ol>`.

### html-06 · Enlaces · 35 XP ✅
- **Objetivo:** enlazar a otras webs y a otras partes de la misma página.
- **Conceptos nuevos:** `<a>`, atributos (en serio), `href`, URL, `target="_blank"` + `rel="noopener"`, atributo `id` y enlaces internos con `#`.
- **Reto:** mini-menú con dos enlaces externos (uno en pestaña nueva) y uno que salta a una sección de la página.

### html-07 · Imágenes · 35 XP ✅
- **Objetivo:** insertar imágenes accesibles con su texto alternativo y su pie de foto.
- **Conceptos nuevos:** `<img>`, `src`, `alt` (y por qué es obligatorio), `width`/`height`, `<figure>`, `<figcaption>`.
- **Reto:** galería de dos mascotas, cada una en un `<figure>` con `alt` descriptivo y `<figcaption>`.

### html-08 · Tablas · 40 XP ✅
- **Objetivo:** presentar datos en filas y columnas con una tabla bien construida.
- **Conceptos nuevos:** `<table>`, `<tr>`, `<td>`, `<th>`, `<thead>`, `<tbody>`, `<caption>`.
- **Reto:** tabla de récords de un torneo de videojuegos con cabecera, 3 filas de datos y título.

### html-09 · Formularios: campos y etiquetas · 40 XP ✅
- **Objetivo:** crear un formulario sencillo con campos de texto bien etiquetados y un botón.
- **Conceptos nuevos:** `<form>`, `<label>` con `for` + `id`, `<input type="text">`, `name`, `placeholder`, `<button>`.
- **Reto:** formulario para apuntarse al club de fans de los dinosaurios: nombre, ciudad y botón «Unirme».

### html-10 · Formularios: más tipos de campo · 45 XP ✅
- **Objetivo:** elegir el campo adecuado para cada dato que se pide.
- **Conceptos nuevos:** `type="email"`, `number`, `password`, `checkbox`, `radio` (con `name` compartido), `<fieldset>`/`<legend>` (agrupar opciones con su título, para lectores de pantalla), `<select>`/`<option>`, `<textarea>`, `required`.
- **Reto:** encuesta de pizza: email, tamaño (radio), ingredientes (checkbox), masa (select) y comentarios (textarea).

### html-11 · Cajas genéricas: div y span · 30 XP ✅
- **Objetivo:** agrupar contenido en cajas sin significado especial para poder darles estilo más adelante.
- **Conceptos nuevos:** `<div>` (bloque), `<span>` (en línea), atributo `class` (un «apodo» que usará el CSS), cuándo NO usar `div`.
- **Reto:** ficha de un personaje de videojuego agrupada en un `<div class="ficha">` con su nivel dentro de un `<span>`.

### html-12 · HTML semántico y accesible · 50 XP ✅
- **Objetivo:** usar etiquetas que dicen lo que son para que buscadores y lectores de pantalla entiendan la página.
- **Conceptos nuevos:** semántica, `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, repaso de accesibilidad (`alt`, `label`, orden de títulos).
- **Reto (jefe final del mundo):** transformar una página hecha solo de `div` en una página semántica con `header`, `nav`, `main` y `footer`.

### html-13 · La cabeza de la página · 40 XP ✅
- **Objetivo:** escribir en el `<head>` lo que leen el navegador, los buscadores y las redes, aunque no se vea.
- **Conceptos nuevos:** `<meta name="description">`, `<meta name="viewport">` (se adelanta; hc-05 la repasa), favicon con `<link rel="icon">`, Open Graph (`og:title`, `og:description`, `og:image`, `og:type`, con `property`).
- **Reto:** completar la cabeza de la web de una pizzería; la tarjeta de vista previa (`vistaPrevia`) enseña cómo la ven un buscador y una red social.

---

## Mundo 2 · CSS 🎨 — «Dale color y estilo a tus páginas»

**Objetivo del mundo:** aprender a cambiar el aspecto de cualquier elemento HTML con CSS y entender
cómo el navegador decide el tamaño, la posición y el estilo de cada caja.

**Al terminarlo, el alumno sabrá:** escribir reglas CSS con los selectores adecuados, entender por qué
una regla «gana» a otra, controlar colores, textos, medidas, el modelo de caja, bordes y sombras,
y colocar elementos con `position`, Flexbox y Grid, organizando todo con variables CSS.

### css-01 · ¿Qué es CSS? · 25 XP ✅
- **Objetivo:** entender qué es CSS y escribir tus primeras reglas.
- **Conceptos nuevos:** CSS («el maquillaje de la web»), regla, selector, propiedad, valor, `;` y `{ }`, dónde se escribe (`<style>`, archivo `.css` + `<link>`), nombres de colores.
- **Reto:** pintar de color el `<h1>` y poner un color de fondo al `body`.

### css-02 · Selectores · 35 XP ✅
- **Objetivo:** apuntar exactamente a los elementos que quieres decorar.
- **Conceptos nuevos:** selector de etiqueta, `.clase`, `#id`, agrupar con coma, selector descendiente (espacio).
- **Reto:** en una lista de frutas, colorear todas las frutas, solo las de `class="tropical"` y solo la de `id="favorita"`.

### css-03 · Colores · 30 XP ✅
- **Objetivo:** escribir colores de varias formas y usarlos en texto y fondos.
- **Conceptos nuevos:** `color`, `background-color`, hexadecimal `#rrggbb`, `rgb()`, transparencia con `rgb(… / 0.5)`, `opacity`.
- **Reto:** pintar la carta de una heladería con un color de fondo, otro de texto y un sabor semitransparente.

### css-04 · Texto y fuentes · 30 XP ✅
- **Objetivo:** dar personalidad a los textos con tipografía.
- **Conceptos nuevos:** `font-family` (con fuentes de reserva), `font-size`, `font-weight`, `font-style`, `text-align`, `line-height`, `text-decoration`, `text-transform`.
- **Reto:** cartel de un concierto: título centrado y en negrita, subtítulo en mayúsculas y texto con interlineado cómodo.

### css-05 · La cascada: ¿quién gana? · 40 XP ✅
- **Objetivo:** entender por qué a veces un estilo «no se aplica» y saber arreglarlo.
- **Conceptos nuevos:** cascada (la última regla gana), especificidad (etiqueta < clase < id), herencia, por qué evitar `!important`.
- **Reto:** detective del CSS: arreglar una página donde un botón no cambia de color porque otra regla le gana.

### css-06 · Unidades de medida · 35 XP ✅
- **Objetivo:** elegir la unidad adecuada para cada medida.
- **Conceptos nuevos:** `px`, `%`, `em`, `rem`, `vw`/`vh`, cuándo usar cada una.
- **Reto:** una portada que ocupa toda la altura de la pantalla (`100vh`) con un título en `rem` y una caja al `50%` de ancho.

### css-07 · El modelo de caja · 45 XP ✅
- **Objetivo:** entender que todo es una caja y controlar su contenido, relleno, borde y margen.
- **Conceptos nuevos:** contenido, `padding`, `border`, `margin`, `width`/`height`, `box-sizing: border-box`, centrar con `margin: 0 auto`.
- **Reto:** una caja de regalo de 300 px de ancho total, con relleno, borde y centrada en la página.

### css-08 · Bordes y sombras · 35 XP ✅
- **Objetivo:** decorar cajas con bordes, esquinas redondeadas y sombras.
- **Conceptos nuevos:** `border` abreviado, `border-radius` (y círculos con `50%`), `box-shadow`, `text-shadow`.
- **Reto:** botón de «¡Jugar!» de videojuego con esquinas redondeadas y sombra, y un avatar redondo.

### css-09 · Display: bloque y en línea · 35 XP ✅
- **Objetivo:** entender cómo se colocan los elementos por defecto y cambiarlo.
- **Conceptos nuevos:** `display: block`, `inline`, `inline-block`, `none`.
- **Reto:** convertir una lista de enlaces vertical en botones en fila con `inline-block` y esconder un elemento.

### css-10 · Posicionamiento · 45 XP ✅
- **Objetivo:** sacar elementos del flujo normal y colocarlos donde quieras.
- **Conceptos nuevos:** `position` (`static`, `relative`, `absolute`, `fixed`, `sticky`), `top`/`right`/`bottom`/`left`, padre con `relative`, `z-index`.
- **Reto:** poner una pegatina de «¡NUEVO!» en la esquina superior derecha de una tarjeta de producto.

### css-11 · Flexbox (I): en fila y alineados · 45 XP ✅
- **Objetivo:** colocar elementos en fila o columna y alinearlos con Flexbox.
- **Conceptos nuevos:** contenedor y elementos flex, `display: flex`, `flex-direction`, `justify-content`, `align-items`, `gap`, centrar algo en ambos ejes.
- **Reto:** barra de iconos de un reproductor de música repartida a lo ancho y centrada verticalmente.

### css-12 · Flexbox (II): repartir el espacio · 45 XP ✅
- **Objetivo:** controlar cómo crecen, encogen y saltan de línea los elementos flex.
- **Conceptos nuevos:** `flex-wrap`, `flex-grow`, `flex-shrink`, `flex-basis`, abreviatura `flex: 1`, `align-self`.
- **Reto:** colección de cartas que saltan de línea cuando no caben y una barra de búsqueda que ocupa el espacio sobrante.

### css-13 · Grid · 50 XP ✅
- **Objetivo:** maquetar en filas y columnas a la vez con CSS Grid.
- **Conceptos nuevos:** `display: grid`, `grid-template-columns`, unidad `fr`, `repeat()`, `gap`, `grid-column: span 2`.
- **Reto:** tablero de tres en raya de 3×3 y una galería donde la primera foto ocupa dos columnas.

### css-14 · Variables CSS · 40 XP ✅
- **Objetivo:** guardar valores con nombre para reutilizarlos y cambiar un tema entero de golpe.
- **Conceptos nuevos:** propiedades personalizadas `--nombre`, `var()`, `:root` (presentado como «el selector de toda la página»), valor de reserva.
- **Reto:** web de un equipo de fútbol cuyos colores salen de dos variables; cambiar el tema tocando solo las variables.

---

## Mundo 3 · HTML + CSS 🧩 — «Construye interfaces de verdad»

**Objetivo del mundo:** combinar todo lo aprendido para construir componentes y páginas reales,
interactivas al pasar el ratón, animadas y que se ven bien en cualquier pantalla.

**Al terminarlo, el alumno sabrá:** descomponer un diseño en cajas, maquetar tarjetas, menús y
formularios con estilo, usar pseudo-clases y pseudo-elementos, hacer webs responsive con enfoque
*mobile first*, añadir transformaciones, transiciones y animaciones, y montar una landing page completa.

### hc-01 · Maqueta una tarjeta · 45 XP ✅
- **Objetivo:** convertir un diseño en HTML + CSS pensando primero en cajas.
- **Conceptos nuevos:** descomponer un diseño en cajas, `max-width`, `object-fit: cover`, `overflow: hidden`.
- **Reto:** tarjeta de perfil de mascota con foto recortada, nombre, descripción y botón, centrada y con sombra.

### hc-02 · Pseudo-clases · 45 XP ✅
- **Objetivo:** cambiar el estilo según el estado o la posición de un elemento.
- **Conceptos nuevos:** pseudo-clase, `:hover`, `:focus`, `:active`, `:first-child`, `:last-child`, `:nth-child()`.
- **Reto:** lista de canciones con filas alternas de color (`:nth-child`) que se iluminan al pasar el ratón.

### hc-03 · Pseudo-elementos · 40 XP ✅
- **Objetivo:** añadir decoración con CSS sin tocar el HTML.
- **Conceptos nuevos:** pseudo-elemento, `::before`, `::after`, `content`, `::first-letter`, `::selection`.
- **Reto:** añadir un ✓ con `::before` a cada elemento de una lista de logros y una letra capital al primer párrafo.

### hc-04 · Barra de navegación · 50 XP ✅
- **Objetivo:** construir el menú de navegación típico de cualquier web.
- **Conceptos nuevos:** patrón `nav > ul > li > a`, combinador hijo `>` (con un submenú, frente al selector descendiente), quitar viñetas (`list-style`), Flexbox aplicado, enlace activo con una clase, `:hover` y `:focus-visible` en enlaces.
- **Reto:** menú de una web de recetas con logo a la izquierda, enlaces a la derecha y el enlace actual resaltado.

### hc-05 · Responsive y media queries · 50 XP ✅
- **Objetivo:** hacer que una página se adapte al tamaño de la pantalla.
- **Conceptos nuevos:** responsive, `<meta name="viewport">` (repaso de html-13), `@media`, `max-width`/`min-width`, puntos de corte, imágenes fluidas (`max-width: 100%`).
- **Reto:** galería que pasa de 3 columnas en ordenador a 1 columna en móvil.

### hc-06 · Mobile first · 45 XP ✅
- **Objetivo:** diseñar primero para el móvil y ampliar hacia pantallas grandes.
- **Conceptos nuevos:** estrategia *mobile first*, `@media (min-width: …)` en cascada, reordenar con Flexbox/Grid según el tamaño.
- **Reto:** página de un festival que en móvil es una columna y a partir de 768 px pone la barra lateral al lado.

### hc-07 · Transformaciones · 40 XP ✅
- **Objetivo:** mover, girar y escalar elementos sin romper la maqueta.
- **Conceptos nuevos:** `transform`, `translate()`, `rotate()`, `scale()`, `transform-origin`.
- **Reto:** baraja de cartas en abanico (cada carta girada) y una carta que crece al pasar el ratón.

### hc-08 · Transiciones · 40 XP ✅
- **Objetivo:** suavizar los cambios de estilo para que no sean bruscos.
- **Conceptos nuevos:** `transition` (propiedad, duración, curva), `ease`, `ease-in-out`, retardo, qué propiedades conviene animar.
- **Reto:** botón que cambia de color y se eleva suavemente al pasar el ratón.

### hc-09 · Animaciones · 50 XP ✅
- **Objetivo:** crear animaciones que se reproducen solas.
- **Conceptos nuevos:** `@keyframes`, `animation` (nombre, duración, repeticiones, dirección), `animation-iteration-count: infinite`, cuándo usar `normal` y cuándo `alternate` (y `@keyframes` con `0%`/`50%`/`100%`), respetar `prefers-reduced-motion`.
- **Reto:** un fantasma que flota arriba y abajo sin parar y un indicador de «cargando» que gira.

### hc-10 · Formularios con estilo · 50 XP ✅
- **Objetivo:** dar un aspecto moderno, claro y accesible a los formularios.
- **Conceptos nuevos:** heredar fuentes en campos (`font: inherit`), estilos de `input` y `button`, `:focus` visible, `:invalid`/`:valid`, `accent-color`.
- **Reto:** formulario de inscripción a una carrera de karts con campos redondeados, foco bien visible y borde rojo si un email es inválido.

### hc-11 · Proyecto: landing page (I) · 60 XP ✅
- **Objetivo:** maquetar la estructura y la cabecera de una landing page real.
- **Conceptos nuevos:** planificar secciones, contenedor central reutilizable, sección *hero*, botón de llamada a la acción.
- **Reto:** cabecera con navegación y *hero* a pantalla completa de una app ficticia para adoptar mascotas.

### hc-12 · Proyecto: landing page (II) · 60 XP ✅
- **Objetivo:** completar la landing con secciones de contenido y hacerla responsive.
- **Conceptos nuevos:** sección de características en Grid, testimonios, pie de página, repaso responsive y de accesibilidad.
- **Reto:** añadir características, testimonios y footer, y que todo se adapte a móvil.

---

## Mundo 4 · JavaScript ⚡ — «Dale vida e interacción a tu web»

**Objetivo del mundo:** aprender a programar con JavaScript para que las páginas reaccionen a lo
que hace el usuario, guarden información y hablen con otros servidores.

**Al terminarlo, el alumno sabrá:** usar variables, condiciones, funciones, arrays, objetos y bucles;
leer y modificar la página (DOM) en respuesta a eventos; crear elementos desde código; validar
formularios; guardar datos en el navegador; pedir datos con `fetch`; y construir una aplicación
completa de lista de tareas.

### js-01 · ¿Qué es JavaScript? · 25 XP ✅
- **Objetivo:** entender qué hace JavaScript y escribir tus primeras instrucciones.
- **Conceptos nuevos:** JavaScript («el cerebro de la web»), instrucción, `console.log()`, la consola, textos entre comillas, comentarios `//`.
- **Reto:** mostrar en la consola un saludo y tu comida favorita.

### js-02 · Variables y consola · 35 XP ✅
- **Objetivo:** guardar datos en variables y hacer operaciones con ellos.
- **Conceptos nuevos:** variable, `let`, `const`, texto (string), número, operadores `+ - * /`, plantillas de texto `` `Hola ${nombre}` ``.
- **Reto:** calcular la edad de tu perro en «años humanos» y mostrar la frase en la consola.

### js-03 · Seleccionar elementos (DOM) · 35 XP ✅
- **Objetivo:** encontrar desde JavaScript cualquier elemento de la página.
- **Conceptos nuevos:** DOM (el árbol de la página), `document`, `querySelector()`, `querySelectorAll()`, `textContent` (leer).
- **Reto:** leer el texto del título de la página y del primer párrafo y mostrarlos en la consola.

### js-04 · Cambiar texto, estilos y clases · 40 XP ✅
- **Objetivo:** modificar la página desde JavaScript.
- **Conceptos nuevos:** asignar `textContent`, `elemento.style.propiedad`, `classList.add/remove/toggle`, por qué preferir clases a `style`.
- **Reto:** cambiar el texto del título, ponerle color y añadir la clase `modo-noche` al `body`.

### js-05 · Funciones · 40 XP ✅
- **Objetivo:** agrupar instrucciones en una «receta» reutilizable.
- **Conceptos nuevos:** `function`, llamar a una función, parámetros, `return`, funciones flecha (presentación).
- **Reto:** función `saludar(nombre)` que devuelve un saludo y se usa para rellenar dos párrafos.

### js-06 · Eventos · 45 XP ✅
- **Objetivo:** hacer que la página reaccione a lo que hace el usuario.
- **Conceptos nuevos:** evento, `addEventListener`, `click`, `input`, función como respuesta a un evento, `campo.value` (leer lo escrito), contador con `let` y los atajos `+=`/`++`.
- **Reto:** botón de «me gusta» ❤️ que suma 1 al contador cada vez que se pulsa y se marca como `activo`.

### js-07 · Condiciones · 40 XP ✅
- **Objetivo:** tomar decisiones en el código.
- **Conceptos nuevos:** booleanos (`true`/`false`), comparaciones (`===`, `!==`, `>`, `<`, `>=`, `<=`), `if`, `else`, `else if`, `&&`, `||`, longitud de un texto (`texto.length`).
- **Reto:** semáforo de contraseña: al escribir, mostrar «débil», «media» o «fuerte» según su longitud.

### js-08 · Arrays y bucles · 45 XP ✅
- **Objetivo:** trabajar con listas de datos y repetir acciones.
- **Conceptos nuevos:** array, índice, `length`, `push()`, bucle `for…of`, `forEach()` (también sobre `querySelectorAll`), acumulador. No se enseña `while` ni el `for` con índice.
- **Reto:** sumar las puntuaciones de una partida guardadas en un array y mostrar el total; un botón «Ronda extra» añade una puntuación y recalcula.

### js-09 · Objetos · 40 XP ✅
- **Objetivo:** agrupar datos relacionados con nombre.
- **Conceptos nuevos:** objeto, `{ clave: valor }`, acceso con punto, modificar propiedades, arrays de objetos.
- **Reto:** ficha de un personaje (nombre, vida, nivel) y subirle de nivel al pulsar un botón.

### js-10 · Crear elementos desde JS · 45 XP ✅
- **Objetivo:** generar HTML nuevo a partir de datos.
- **Conceptos nuevos:** `document.createElement()`, `append()`, `remove()`, pintar un array de datos en la página.
- **Reto:** pintar en un `<ul>` la lista de canciones de un array y añadir una canción nueva desde un campo de texto y un botón (sin formulario: llega en js-11).

### js-11 · Validar formularios · 50 XP ✅
- **Objetivo:** comprobar lo que escribe el usuario antes de enviarlo.
- **Conceptos nuevos:** evento `submit`, el parámetro `evento`, `preventDefault()`, `.value` (repaso), `.trim()`, `.includes()`, el «no» `!`, mensajes de error accesibles.
- **Reto:** formulario de registro que muestra un error si el nombre está vacío o el email no tiene `@`, y un mensaje de éxito si todo va bien.

### js-12 · Guardar datos: localStorage · 45 XP ✅
- **Objetivo:** recordar datos aunque se recargue la página.
- **Conceptos nuevos:** `localStorage.setItem/getItem/removeItem`, JSON, `JSON.stringify()`, `JSON.parse()`.
- **Reto:** recordar el nombre del usuario y saludarle al volver.

### js-13 · Pedir datos con fetch · 55 XP ✅
- **Objetivo:** traer datos de un servidor y mostrarlos en la página.
- **Conceptos nuevos:** asincronía («pedir y esperar»), `fetch()`, `async`/`await`, `.json()`, `try`/`catch`.
- **Conceptos nuevos (además):** `respuesta.ok` y `respuesta.status` (404).
- **Reto:** pedir una lista de chistes (JSON) y mostrar el siguiente al pulsar un botón (tras el último vuelve al primero), avisando si no se pueden cargar. «Al azar» se descartó para no meter `Math.random` sin enseñarlo.

### js-14 · Proyecto final: lista de tareas · 60 XP ✅
- **Objetivo:** construir una aplicación completa combinando todo el curso.
- **Conceptos nuevos:** ninguno nuevo: integración (estado en un array de objetos, pintar, eventos, guardar).
- **Reto (jefe final del curso):** lista de tareas que permite añadir, marcar como hecha, borrar y que recuerda las tareas al recargar. Se construye por etapas con tres ejercicios (pintar, añadir, marcar y borrar) y acaba con un cierre del curso.

---

## Decisiones del profesor

He pasado de **42 a 52 lecciones**. Todos los cambios ya están aplicados también en `MUNDOS` (`js/curso.js`).
El motivo de casi todos es la regla de oro del curso: **una idea por lección y ninguna sin enseñar antes**.

### Mundo HTML (10 → 12)
- **Formularios se divide en dos** (html-09 «campos y etiquetas» y html-10 «más tipos de campo»).
  Un formulario completo mete de golpe `form`, `label`, `input`, `name`, `button` y media docena de tipos
  de campo: demasiado para un novato en una sola lección.
- **Nueva html-11 «Cajas genéricas: div y span».** El Mundo CSS necesita cajas y el atributo `class`
  desde la primera lección de selectores; si no se enseñan aquí, aparecerían «por arte de magia».
  Va justo antes de semántica para que la lección final del mundo pueda decir «no lo hagas todo con `div`».
- **Los comentarios `<!-- -->` se enseñan en html-02**, porque los retos los usan para dar instrucciones
  dentro del código inicial.
- **html-01 usa `<h1>` y `<p>` de forma ligera** (solo para ver qué es una etiqueta); html-03 los explica a fondo.

### Mundo CSS (12 → 14)
- **Nueva css-05 «La cascada: ¿quién gana?».** Es la causa número uno de frustración del principiante
  («¡he puesto el color y no sale!»). Va tras selectores, colores y texto, cuando ya hay reglas que puedan chocar.
- **Flexbox se divide en dos** (css-11 alinear, css-12 repartir espacio). Son dos ideas distintas y Flexbox es
  la herramienta de maquetación más usada: merece ir con calma.
- Por la nueva css-05, *Unidades* pasa de css-05 a css-06 y todas las siguientes se desplazan un número.

### Mundo HTML + CSS (10 → 12)
- **Pseudo-clases y pseudo-elementos se separan** (hc-02 y hc-03): suenan parecido pero son ideas distintas,
  y mezclarlas es una confusión clásica.
- **La barra de navegación se mueve detrás de pseudo-clases** (ahora hc-04): un menú sin `:hover` ni
  `:focus` no se puede hacer bien, y no quería usar algo sin haberlo enseñado.
- **Nueva hc-07 «Transformaciones»** antes de transiciones y animaciones: casi todas las transiciones y
  animaciones interesantes animan un `transform`, así que debe conocerse antes.

### Mundo JavaScript (10 → 14)
- **Nueva js-05 «Funciones»**, antes de Eventos. Era el hueco más grave: `addEventListener` necesita una
  función, y sin explicarlas el alumno solo copiaría código mágico.
- **«Condiciones y bucles» se divide:** las condiciones tienen su lección (js-07) y los bucles van con los
  arrays (js-08 «Arrays y bucles»), que es donde de verdad se usan.
- **Nueva js-09 «Objetos»**: el proyecto final guarda cada tarea como `{ texto, hecha }` y `fetch` devuelve objetos.
- **Nueva js-10 «Crear elementos desde JS»**: imprescindible para pintar listas a partir de datos (proyecto y fetch).
- **Nueva js-12 «Guardar datos: localStorage»**: la lista de tareas final debe recordar las tareas; además
  introduce JSON, que luego reutiliza `fetch`.
- **El DOM se queda pronto (js-03 y js-04)** a propósito: ver la página cambiar en la lección 3 motiva mucho
  más que diez lecciones de teoría con la consola.

### Dudas técnicas para el motor (resueltas)
- **js-12 (localStorage):** el resultado usa un `localStorage` «de práctica» que vive en su `iframe`: funciona como
  el real, sobrevive a 🔄 Recargar y nunca toca el progreso del curso (ver `docs/FORMATO_LECCION.md`).
- **js-13 (fetch):** `fetch("datos/archivo.json")` lo sirve el motor sin internet con los `datos` que declara la
  lección; cualquier otra URL usa el `fetch` real.
- **html-02:** como el navegador siempre crea `<html>`, `<head>` y `<body>`, el reto comprueba cosas que no se
  autogeneran (`<meta charset>` y un `<title>` con la palabra «mascota»). Si el motor inyecta su propia
  `<meta charset>`, esa comprobación saldría verde sola; el reto sigue siendo válido porque el `<title>` y el `<h1>` no.
