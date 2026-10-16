# Pendientes de &lt;CSS-HTML&gt;

## Contenido
- [x] Mundo HTML (html-01 … html-12)
- [x] Mundo CSS (css-01 … css-14)
- [x] Mundo HTML + CSS (hc-01 … hc-12)
- [x] Mundo JavaScript (js-01 … js-14) — `localStorage` de práctica y `fetch("datos/…")` sin internet en el motor

## Página de inicio (index)
- [x] **Mundos abatibles** (plegables): cada mundo se abre y se cierra pulsando su cabecera; al entrar, todos cerrados.
- [x] **Insignias en una columna a la izquierda** (fija al bajar), aprovechando la pantalla en horizontal.
- [x] **Camino en serpiente**: filas horizontales con curvas en U entre filas y una ola suave dentro de cada fila.

## Errores por revisar
- [ ] **js-05 (Funciones), paso 3 «Presenta a tus mascotas»** — captura del usuario (2026-10-15). El alumno escribió
      ``console.log(`$ Mi mascota se llama ${mascota}`);`` y llamó con `presentar("luna")` / `presentar("Tofu")`.
      La consola muestra `$ Mi mascota se llama luna` y `$ Mi mascota se llama Tofu`, y el revisor solo dice «La línea 1
      de la consola no es la que pide el enunciado: debería decir «Mi mascota se llama Luna»». Revisar:
  - El mensaje no señala **qué** sobra o falta: el `$ ` de más al principio (confusión típica con `${}`) ni la
    mayúscula de «Luna». Debería decir la diferencia concreta (p. ej. «sobra `$ ` al principio», «Luna va con mayúscula»).
  - La línea 2 también lleva el `$ ` de más y no se menciona (solo se informa la primera línea mal).
  - ¿Mayúsculas en la salida de la consola: se exigen o se ignoran como las tildes? Decidirlo y que el mensaje lo diga.

## Antes de la versión final (petición del usuario, 2026-10-15)
- [ ] **Quitar el modo prueba de la versión publicada** (es solo para el equipo; la gente no debe saltar a lecciones al azar).
      Hacerlo como en SQLearning (`js/progreso.js` de SQLearning, constante `SOLO_LOCAL`): disponible **solo en local**
      (`location.hostname` = `localhost`, `127.0.0.1` o `[::1]`), así siguen funcionando el servidor local y los tests.
  - `js/progreso.js`: `modoPrueba` (≈ línea 44) solo puede ser `true` en local; ignorar `CLAVE_PRUEBA` fuera de local;
    `entrarPrueba` no hace nada fuera de local; si hay un «desbloquear todo» guardado en el progreso, ignorarlo también.
    Exponer `PROGRESO.pruebaDisponible()`.
  - `js/ui.js` (≈ líneas 236–252, ventana de opciones de la cabecera): no pintar los botones `data-entrar-prueba` /
    `data-salir-prueba` si `!PROGRESO.pruebaDisponible()`. La franja de modo prueba (≈ línea 201) no saldrá nunca fuera de local.
  - `js/mapa.js` `pintarOpciones()` (≈ líneas 183–203): quitar la tarjeta del modo prueba fuera de local (ver punto siguiente).
- [ ] **Quitar «🔄 Reiniciar curso» del final del mapa**: ya está en la ventana de **Opciones** de la cabecera (`js/ui.js`,
      botón `data-reiniciar-curso`). En `js/mapa.js` `pintarOpciones()` sobra el botón `data-reiniciar`; si tras quitar el
      modo prueba la tarjeta `[data-opciones-curso]` queda vacía, quitarla también de `index.html` (línea ≈ 33) y su CSS.
- [ ] Después: pasar los tests (que corren en local, así que el modo prueba seguirá disponible para ellos).

## Ideas nuevas (petición del usuario, 2026-10-15)
- [ ] **Laboratorio de práctica libre** (al estilo del laboratorio de SQLearning): una página aparte con las **3 pestañas**
      (HTML, CSS, JS) y el **observador** (vista previa en vivo + consola) para trastear sin lección ni revisión. Borrador guardado,
      ejemplos para cargar, botón de borrar con deshacer, enlace desde la página de inicio.
- [ ] **Un único proyecto web que crece a lo largo de los 4 mundos** en lugar de temas sueltos:
  - Elegir **un** negocio de los ejemplos que ya usa el profesor (la pizzería, la veterinaria…; el que mejor encaje).
    → **Propuesta cerrada (2026-10-16): la clínica veterinaria «Huellas»**, en `docs/PROYECTO_FINAL.md`
    (una lección de proyecto al final de cada mundo, encargo cerrado de diseño, glosario de consulta, descarga en .zip).
    Referencias visuales en `recursos/` (VidaVet y Patitas).
  - [ ] Revisión del temario por el profesor frente al proyecto (`docs/revisiones/2026-10-16-profesor-temario-vs-proyecto.md`)
  - [ ] Descarga en .zip también en el laboratorio de práctica libre (cuando exista)
  - Los **proyectos finales de cada mundo** y parte de los ejercicios de cada lección van construyendo esa misma web:
    Mundo HTML → su estructura y contenido; Mundo CSS → su aspecto; HTML + CSS → maquetación completa y responsive;
    JavaScript → interactividad (menú, formulario, carrito o reservas…).
  - Al terminar el Mundo 4, el alumno tiene **la web entera hecha por él**: guardar su versión de cada paso para poder
    verla completa al final (y descargarla).
  - Implica: decidir el negocio, rediseñar retos finales y algunos ejercicios de los 4 mundos, y que cada reto parta del
    código que el alumno dejó en el anterior (o de una versión de referencia si no lo tiene).

## Para el final
- [ ] **Selector de idioma Español / English** para hacer el curso en cualquiera de los dos idiomas
      (textos de la interfaz, lecciones, enunciados, pistas, mensajes del revisor y de Tagui).
- [x] Publicar la web con GitHub Pages → **https://piradev-py.github.io/CSS-HTML/** (rama `main`, carpeta raíz, con `.nojekyll`).

## Decisiones por tomar
- [x] Mapa de inicio: ¿4 mundos en columnas (sin scroll) o dejarlo como está? → **mundos abatibles e insignias a
      la izquierda** (ver «Página de inicio»).
- [x] Fuente Concert One: ¿solo en el logo o también en los títulos grandes? → **solo en el logo**, más grande y con
      el logo de Tagui (`recursos/marca/`) delante; el `.ico` del usuario es el icono de la pestaña.
- [x] Ejercicios: ¿las tildes cuentan («página» ≠ «pagina») o se ignoran? → **se ignoran** (la ñ sí cuenta).
- [x] html-10: `<fieldset>`/`<legend>` → **se enseña en html-10** (explicación + ejercicio, y la encuesta del reto los usa);
      hc-10 enseña a decorarlos.
- [x] html-06: `rel="noopener"` → **no obligatorio en el reto**; se enseña como buena costumbre y se explica que los
      navegadores modernos ya lo aplican solos.
- [x] css-03: `rgb()` moderno con espacios y mención de la forma con comas → **bien así**.
- [x] css-05: el reto «detective» prohíbe `!important` → **se mantiene** (es la gracia del reto).

### Mundo HTML + CSS (dudas que dejaron las lecciones)
- [ ] hc-02/hc-03: el CSS decorativo oculto (`cssBase`) usa `list-style: none`, que no se enseña hasta hc-04. ¿Vale así?
- [x] hc-04: combinador hijo `>` → **se enseña en hc-04** con un submenú (explicación + ejercicio).
- [x] hc-06: `order` se presenta sin exigirlo → **se deja** (al usuario le gustan esas herramientas).
- [x] hc-07: propiedades sueltas `rotate`/`scale`/`translate` en los controles → **se dejan**.
- [x] hc-09: `animation-direction: normal` en los controles → **se deja**, y se añade un paso con la regla real (`normal` si acaba donde empieza, `alternate` si va de un sitio a otro, `0%`/`50%`/`100%`).
- [x] hc-11: 10 pasos → **se deja así** (el repaso de la cabecera es bueno).
- [x] hc-12: cabecera apretada a 375 px → **no se toca**: la web se piensa para PC/tablet en horizontal.

### Mundo JavaScript (dudas que dejaron las lecciones)
- [x] Ejercicios «a mano»: se compara solo lo **estrictamente necesario** (el resultado). Lo que sí se exige ahora es
      que el código esté **bien escrito** (etiquetas cerradas, `{ }` y `;` en CSS y JS): `js/escritura.js`, en ejercicios
      y como comprobación automática de cada reto.
- [ ] js-01: el ejercicio de la piña no empieza vacío (trae código para practicar `//`). ¿Vale esta excepción?
- [ ] js-02: las comillas invertidas se describen como «la tecla a la derecha de la P» (teclado de España).
      ¿Añadimos una nota para teclados latinoamericanos?
- [ ] js-13: el reto es «siguiente chiste» (determinista) en vez de «chiste al azar» (necesitaría enseñar
      `Math.random`/`Math.floor`). ¿Bien así?
- [ ] js-14: 10 pasos con 3 ejercicios por etapas antes del jefe final. ¿Demasiado larga?
- [ ] js-12: los ejercicios no pueden comprobar que se use `localStorage` de verdad (solo el reto, que recarga). ¿Vale?
- [ ] js-10: «crear al pulsar un botón» es solo explicación + reto, sin ejercicio propio. ¿Añadimos uno?
- [x] Motor: protección contra bucles infinitos → **añadida** (un bucle infinito congelaría la pestaña y el borrador
      guardado la volvería a congelar al abrir la lección).
