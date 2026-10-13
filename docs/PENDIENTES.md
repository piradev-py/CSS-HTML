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
- [ ] html-10: ¿enseñar `<fieldset>`/`<legend>` ahí o en «Formularios con estilo» (hc-08)?
- [ ] html-06: ¿hacer obligatorio `rel="noopener"` en el reto?
- [ ] css-03: se enseña `rgb()` moderno con espacios (`rgb(255 0 0 / 0.5)`) y se menciona la forma con comas. ¿Bien así?
- [ ] css-05: el reto «detective» prohíbe `!important` para obligar a subir la especificidad. ¿Demasiado estricto?

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
