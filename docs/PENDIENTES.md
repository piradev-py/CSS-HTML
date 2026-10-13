# Pendientes de &lt;CSS-HTML&gt;

## Contenido
- [x] Mundo HTML (html-01 … html-12)
- [x] Mundo CSS (css-01 … css-14)
- [x] Mundo HTML + CSS (hc-01 … hc-12)
- [x] Mundo JavaScript (js-01 … js-14) — `localStorage` de práctica y `fetch("datos/…")` sin internet en el motor

## Para el final
- [ ] **Selector de idioma Español / English** para hacer el curso en cualquiera de los dos idiomas
      (textos de la interfaz, lecciones, enunciados, pistas, mensajes del revisor y de Tagui).
- [ ] Publicar la web con GitHub Pages.

## Decisiones por tomar
- [ ] Mapa de inicio: ¿4 mundos en columnas (sin scroll) o dejarlo como está?
- [ ] Fuente Concert One: ¿solo en el logo o también en los títulos grandes?
- [ ] Ejercicios: ¿las tildes cuentan («página» ≠ «pagina») o se ignoran?
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
- [ ] Ejercicios «a mano»: los ejercicios comparan el **resultado** (página + consola), no el código, así que
      `console.log("60")` aprueba sin variables, y los de arrays/objetos (js-08, js-09) sin bucle. Los retos sí
      miran el código cuando hace falta (`PRUEBA.codigo`). ¿Basta así o exigimos también el código en los ejercicios?
- [ ] js-01: el ejercicio de la piña no empieza vacío (trae código para practicar `//`). ¿Vale esta excepción?
- [ ] js-02: las comillas invertidas se describen como «la tecla a la derecha de la P» (teclado de España).
      ¿Añadimos una nota para teclados latinoamericanos?
- [ ] js-13: el reto es «siguiente chiste» (determinista) en vez de «chiste al azar» (necesitaría enseñar
      `Math.random`/`Math.floor`). ¿Bien así?
- [ ] js-14: 10 pasos con 3 ejercicios por etapas antes del jefe final. ¿Demasiado larga?
- [ ] js-12: los ejercicios no pueden comprobar que se use `localStorage` de verdad (solo el reto, que recarga). ¿Vale?
- [ ] js-10: «crear al pulsar un botón» es solo explicación + reto, sin ejercicio propio. ¿Añadimos uno?
- [ ] Motor: no hay protección contra bucles infinitos (no se enseña `while`). ¿Merece la pena añadirla?
