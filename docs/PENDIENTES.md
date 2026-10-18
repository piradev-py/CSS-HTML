# Pendientes de &lt;CSS-HTML&gt;

## Contenido
- [x] Mundo HTML (html-01 … html-12)
- [x] Mundo CSS (css-01 … css-14)
- [x] Mundo HTML + CSS (hc-01 … hc-10 y hc-13, el Proyecto web; hc-11 y hc-12 se quitaron en la fase 5)
- [x] Mundo JavaScript (js-01 … js-13, js-15, js-16 y js-17, el Proyecto web; js-14 se quitó en la fase 6) — `localStorage` de práctica y `fetch("datos/…")` sin internet en el motor

## Página de inicio (index)
- [x] **Mundos abatibles** (plegables): cada mundo se abre y se cierra pulsando su cabecera; al entrar, todos cerrados.
- [x] **Insignias en una columna a la izquierda** (fija al bajar), aprovechando la pantalla en horizontal.
- [x] **Camino en serpiente**: filas horizontales con curvas en U entre filas y una ola suave dentro de cada fila.

## Errores por revisar
- [x] **js-05 (Funciones), paso 3 «Presenta a tus mascotas»** — el revisor de consola (`js/ejercicios.js`,
      `compararConsola`) ahora dice qué sobra o falta («sobra «$» al principio», «falta «Luna» al final»…), avisa de las
      demás líneas mal y, si sobra un `$`, recuerda que va pegado a la llave de `${…}`.
      Mayúsculas en la consola → **se ignoran**, como las tildes (ya era así: «luna» estaba bien; solo fallaba el `$`).

## Antes de la versión final (petición del usuario, 2026-10-15)
- [x] **Modo prueba y «desbloquear todo» solo en local** (`SOLO_LOCAL` en `js/progreso.js`, como en SQLearning):
      `localhost`, `127.0.0.1`, `[::1]` **y `file://`** (los tests abren la web como archivo; también quien la descarga en
      .zip). Fuera de local no salen los botones en ⚙️ Ajustes, ni la franja, ni la tarjeta del mapa, y se ignora un
      «desbloquear todo» o una prueba guardados. `PROGRESO.pruebaDisponible()`.
- [x] **Quitado «🔄 Reiniciar curso» del final del mapa** (queda en ⚙️ Ajustes). La tarjeta `[data-opciones-curso]` solo
      se pinta en local, con el modo prueba; en la web publicada se quita.
- [x] Tests pasados (`esc-tests`, `esc-motor`, `esc-motor-js`) y comprobado en publicado (`http://127.0.0.2`) y en `file://`.

## Ideas nuevas (petición del usuario, 2026-10-15)
- [ ] **Laboratorio de práctica libre** (al estilo del laboratorio de SQLearning): una página aparte con las **3 pestañas**
      (HTML, CSS, JS) y el **observador** (vista previa en vivo + consola) para trastear sin lección ni revisión. Borrador guardado,
      ejemplos para cargar, botón de borrar con deshacer, enlace desde la página de inicio.
- [ ] **Un único proyecto web que crece a lo largo de los 4 mundos** en lugar de temas sueltos:
  - Elegir **un** negocio de los ejemplos que ya usa el profesor (la pizzería, la veterinaria…; el que mejor encaje).
    → **Propuesta cerrada (2026-10-16): la clínica veterinaria «Huellas»**, en `docs/PROYECTO_FINAL.md`
    (una lección de proyecto al final de cada mundo, encargo cerrado de diseño, glosario de consulta, descarga en .zip).
    Referencias visuales en `recursos/` (VidaVet y Patitas).
  - [x] Revisión del temario por el profesor frente al proyecto (`docs/revisiones/2026-10-16-profesor-temario-vs-proyecto.md`)
  - [x] **Fase 1 · diseño y materiales** (2026-10-18): guía de estilo, fotos, iconos y textos en `docs/huellas/`;
        web de referencia completa en `recursos/huellas/web/` (Mundo 1 → 4, un commit por mundo). Las instantáneas
        paso a paso salen de ahí en la fase 2.
  - [x] P7 (css-03 contraste, css-04 fuentes web, css-07 max-width, css-09 list-style, css-10 ejercicio sticky) y
        P8 (hc-06 menú móvil con `abierto`, hc-09 transition: none, hc-10 :user-invalid) — 2026-10-18.
  - [x] P6 (html-06 `tel:`/`mailto:`/página propia, html-07 `width`+`height`+`loading="lazy"`, html-10 `tel`/`date`/`time`),
        como pasos de explicación. Falta: que el ejercicio de html-07 pida los dos tamaños y el reto use `lazy`.
  - [x] P4 (js-04 `setAttribute`/`aria-expanded`, js-10 botón «Quitar» en cada elemento con ejercicio, js-12 array de
        objetos con `|| []`). Falta: que el **reto** de js-12 guarde un array de objetos.
  - [x] P3 (js-11: casillas y radios con `.checked`, `Number.isNaN`, bandera `todoBien` con un mensaje por campo).
        Falta: que el **reto** de js-11 tenga 2–3 campos con su mensaje cada uno.
  - [x] P5 (html-13 «La cabeza de la página», con la tarjeta `vistaPrevia` del motor) — 2026-10-18. Sin renumerar: los ids
        no cambian nunca (las lecciones nuevas llevan el siguiente número libre) y una lección completada sigue abierta.
  - [x] P1 (`js-15` «Filtrar listas», entre js-10 y js-11: `filter`, `includes`, quitar con `!==`, repintar con botones) — 2026-10-18.
  - [x] P2 (`js-16` «Fechas y horas», delante de js-11: `new Date()`, `getFullYear()`, `toLocaleDateString("sv-SE")`,
        comparar fechas y horas como texto; reto «ya pasó / es hoy / todavía falta») — 2026-10-18.
  - [x] Antes de las lecciones de proyecto, aplicar los cambios aprobados al temario (P1, P2 y P5 hechas): la web de referencia
        ya usa `list-style`, `max-width` (P7), `:user-invalid` (P8), `filter`, `Date`, `checked` y `setAttribute` (P1–P4).
  - [ ] Consejo de `scroll-margin-top` (hc-04 o hc-06): con la cabecera fija, los enlaces del menú dejan el título
        de la sección tapado.
  - [x] Lección del Mundo 4: explicar `novalidate` → ya lo explica js-11 (el formulario trae `required` del Mundo 1 y el navegador
        taparía los mensajes propios).
  - [ ] La comprobación de la hora es solo 9:00–20:30: no mira sábados (10:00–14:00) ni domingos (cerrado).
        ¿Basta para el curso o se enseña `getDay()`?
  - [ ] Descarga en .zip también en el laboratorio de práctica libre (cuando exista)
  - [~] **Fase 2 · motor del proyecto** (2026-10-18). Hecho: paso `proyecto` (varios archivos enlazados de verdad,
        rutas desde la carpeta de Huellas, borrador compartido, captura del encargo, «📚 Repasa» en lo que falla),
        versiones oficiales por mundo (`herramientas/huellas-versiones.mjs` → `lecciones/huellas/versiones.js`), reloj fijo
        (`PRUEBA.recargar(doc, { hoy })`) y batería `esc-proyecto` (23 de 23) + `esc-proyecto-ui`.
        Glosario: panel con buscador y «Copiar» (`js/glosario.js`) y términos del Mundo 1 (56).
        Términos del Mundo 2 (76, con `letter-spacing` añadido a css-04: la web de referencia lo usa).
        Términos del Mundo 3 (38, hc-01 … hc-10), con `linear-gradient` (nuevo paso en hc-03) y `grid-column: 1 / 3`
        (añadido a css-13): la web de referencia los usa y no se enseñaban.
        Términos del Mundo 4 (54, js-01 … js-13, js-15 y js-16). Glosario completo.
        `privacidad.html` va como material hecho (en la vista previa su enlace abre la página de prueba).
  - [x] **Fase 3 · Proyecto web del Mundo 1** (`html-14`, 2026-10-18): 5 encargos desde el archivo vacío, con captura,
        textos para copiar, comprobaciones con «📚 Repasa» y glosario; aprueba la versión oficial y otra escrita sin clases
        y con `<article>` (`alternativas`). El alumno hace 3 servicios y 2 personas del equipo.
  - [x] **Fase 4 · Proyecto web del Mundo 2** (`css-15`, 2026-10-18): 4 encargos sobre `estilos.css` vacío (identidad ·
        cajas y tarjetas · horario, cita, opiniones y pie · colocación), comprobados por estilo calculado; aprueba la
        versión oficial y otra escrita con otros selectores y valores (`alternativas`). La explicación cuenta que el equipo
        de diseño añadió los 3 servicios y las 2 personas que faltaban. Test: `esc-proyecto-m2`.
        Ojo: la vista previa (unos 450 px) aprieta la maqueta de escritorio; la captura de la ficha muestra cómo queda.
  - [x] **Fase 5 · Proyecto web del Mundo 3** (`hc-13`, 2026-10-18): sustituye a hc-11 y hc-12 (salen del mapa y se
        borran; quien las hizo conserva XP e insignias). 4 encargos sobre la hoja oficial del Mundo 2 (móvil primero ·
        tableta · ratón, teclado y formulario · movimiento), medidos a 375, 768 y 1200 px; aprueba la versión oficial y
        otra con otros puntos de corte y Flexbox en vez de Grid. Test: `esc-proyecto-m3` (con 4 variantes rotas).
  - [x] **Fase 6 · Proyecto web del Mundo 4** (`js-17`, 2026-10-18): sustituye a js-14 (sale del mapa y se borra).
        6 encargos sobre `script.js` vacío (menú · activo y año · servicios desde datos · filtros · cita validada · mis
        citas y opiniones), comprobados simulando clics, escritura y recargas con el reloj fijo; aprueba la versión
        oficial y otra con otros nombres y otra clave de `localStorage`. Test: `esc-proyecto-m4` (con 4 variantes rotas).
        El script de referencia se reordenó (174f321) para que cada encargo sea el script sin las secciones pendientes.
        Sin captura en las fichas: lo que cuenta es el comportamiento. Para la fase 7: el cierre del curso que tenía js-14.
  - [~] **Fase 7 · «Mi clínica» y revisión** (2026-10-19). Hecho: `mi-clinica.html` (`js/mi-clinica.js`): cerrada hasta
        completar js-17; abierta, el cierre del curso (con Tagui, «¿Y ahora qué?» y el servidor como siguiente paso) y la web
        del alumno a pantalla entera, con el mismo motor que la lección. **⬇️ Descargar mi web (.zip)**: `js/zip.js` (sin
        librerías, sin comprimir) y las imágenes en `lecciones/huellas/imagenes.js` (`node herramientas/huellas-imagenes.mjs`),
        así descarga también con `file://`. Se llega desde la victoria de js-17 y desde el mapa. Test: `esc-mi-clinica`
        (descomprime el .zip y abre la web desde el disco). Falta: la descarga del laboratorio (el laboratorio no existe aún)
        y la revisión con QA y alumno novato.
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
- [x] hc-02/hc-03: el CSS decorativo oculto (`cssBase`) usa `list-style: none`, que no se enseña hasta hc-04. → **se deja** (va en el CSS oculto, el alumno no lo ve).
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
- [x] js-01: el ejercicio de la piña no empieza vacío (trae código para practicar `//`). → **se deja** (para practicar `//` hace falta código).
- [x] js-02: las comillas invertidas se describen como «la tecla a la derecha de la P» (teclado de España).
      → **añadida la nota**: en el latinoamericano, Alt Gr + }.
- [x] js-13: el reto es «siguiente chiste» (determinista) en vez de «chiste al azar» (necesitaría enseñar
      `Math.random`/`Math.floor`). → **se deja así** (`Math.random` no se enseña y el reto sería imprevisible).
- [x] js-14: 10 pasos con 3 ejercicios por etapas antes del jefe final. → **sustituida por js-17**, la agenda de citas de Huellas (fase 6).
- [~] js-12: los ejercicios no pueden comprobar que se use `localStorage` de verdad (solo el reto, que recarga). → **se decide con Huellas** (P4: el reto de js-12 pasa a un array de objetos).
- [x] js-10: «crear al pulsar un botón» es solo explicación + reto, sin ejercicio propio. → **resuelto con P4**: ejercicio «Un botón Quitar en cada elemento».
- [x] Motor: protección contra bucles infinitos → **añadida** (un bucle infinito congelaría la pestaña y el borrador
      guardado la volvería a congelar al abrir la lección).
