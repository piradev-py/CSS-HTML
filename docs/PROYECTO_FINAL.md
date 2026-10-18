# Proyecto final del curso CSS-HTML: la web de una clínica veterinaria

> Propuesta cerrada el 16 de octubre de 2026. Original (con el mapa dibujado): https://claude.ai/code/artifact/22933b01-9d3a-4729-b4a9-b8c63b840cdb

## La idea en breve

El alumno construye **una sola web, la de la clínica veterinaria «Huellas»**, a lo largo de los 4 mundos: cada mundo termina con una entrega del mismo proyecto y, al acabar el curso, tiene una web completa, responsive e interactiva que puede descargar y enseñar.

- **Mundo 1 · HTML:** la clínica en HTML puro, con todo su contenido.
- **Mundo 2 · CSS:** la identidad visual (colores, tipografía, tarjetas).
- **Mundo 3 · HTML + CSS:** la maqueta profesional: responsive, estados y animaciones.
- **Mundo 4 · JavaScript:** la web funciona: menú, servicios filtrables y agenda de citas.

Por qué una veterinaria: es un negocio cercano y visual que pide de forma natural lo que enseña el curso (formularios de cita, tarjetas de servicios, equipo, horarios, opiniones, animaciones suaves). Además encaja con lo que ya existe: el proyecto actual de hc-11 y hc-12 es una web de adopción de mascotas. Las dos imágenes de `recursos/` (VidaVet y Patitas) son la inspiración: a partir de ellas diseñamos nosotros la guía de estilo de «Huellas», que el alumno recibe hecha.

## El encargo: el alumno programa, nosotros diseñamos

El alumno es el **programador del equipo**; nosotros hacemos de **jefe de proyecto y diseñador** y le damos un **encargo cerrado**: diseño, textos y materiales. Parece libre (la web es suya y la escribe desde cero), pero el resultado está estipulado, como en un trabajo real, y por eso se puede comprobar con precisión.

**Cómo llega el encargo:** cada etapa empieza con una **ficha de encargo** del jefe de proyecto: qué hay que construir, la captura de cómo debe quedar, la parte de la guía de estilo que toca (colores, fuentes, medidas) y los materiales listos para usar. El alumno no elige ni diseña: traduce el diseño a código.

| Área | Lo fija el encargo | Lo decide el alumno |
| --- | --- | --- |
| Contenido | Las secciones, su orden y todos los textos | Qué etiquetas usa para agruparlo, dentro de lo que pide la ficha |
| Materiales | Imágenes, iconos, banners y fondos, con sus nombres de archivo | Cómo los coloca (etiqueta, fondo CSS, `figure`…) |
| Aspecto | La guía de estilo: paleta con sus códigos, fuentes, tamaños, espaciados, radios, sombras | Cómo organiza la hoja: selectores, clases propias, variables extra, orden |
| Maqueta | La captura de cada pantalla (móvil, tableta y escritorio) | La técnica para lograrla: Flexbox o Grid, cuántas `@media` |
| Movimiento | Qué se anima, cuánto dura y cómo | Cómo escribe las transiciones y los `@keyframes` |
| Comportamiento | Qué pasa al pulsar cada cosa y qué mensaje sale | Nombres de funciones y variables, cómo reparte el código |
| Nombres | Un contrato mínimo de `id`, clases y `name` (abajo) | El resto de nombres |

**Contrato mínimo de nombres**: secciones con `id` `inicio`, `servicios`, `equipo`, `horario`, `cita` y `contacto`; cada tarjeta de servicio con la clase `servicio`; el formulario con `id="form-cita"` y campos con `name` fijo (`nombre`, `telefono`, `email`, `mascota`, `fecha`, `hora`, `motivo`). Es el «contrato» entre el diseñador y el programador: así el menú enlaza a las secciones, el JavaScript encuentra lo que necesita y la revisión sabe dónde mirar.

**Estética: moderna, minimalista y, sobre todo, funcional.** Mucho blanco, una paleta corta, tipografía grande y clara, esquinas redondeadas, sombras suaves y animaciones discretas, como las dos referencias. Cada elemento está porque sirve para algo: nada decorativo que estorbe a pedir una cita.

**Una web de verdad, lista para publicar.** Al terminar, la web de «Huellas» funcionaría si se subiera a internet tal cual:

- **Se encuentra y se comparte:** `title`, descripción, `viewport`, favicon y vista previa para redes (Open Graph).
- **Se usa con cualquier cosa:** móvil, tableta y escritorio; teclado y lector de pantalla; contraste AA.
- **Carga rápido:** imágenes ligeras con `width`, `height` y carga diferida (`loading="lazy"`), sin librerías innecesarias.
- **Hace lo que promete:** todos los enlaces llevan a algo real (secciones, teléfono, email, mapa), el formulario valida y confirma, y las citas se guardan.
- **Cumple lo básico legal:** página de privacidad enlazada desde el pie y desde la casilla del formulario.

Lo único que una clínica real añadiría es un servidor que reciba las citas; el curso lo explica al final como siguiente paso, sin construirlo.

## La clínica «Huellas» y los materiales del encargo

La web tiene **9 secciones, todas obligatorias**, tomadas de lo que comparten las dos referencias. La clínica es **«Huellas»** para todos. Nosotros construimos antes la versión completa: de ella salen las capturas de cada ficha de encargo, es la solución de cada paso y la base de la que parte cada mundo.

| Sección | Qué lleva |
| --- | --- |
| Cabecera | Logo, nombre, menú de 5 enlaces y botón «Pide tu cita» |
| Portada (*hero*) | Antetítulo, titular grande, texto, botón de llamada a la acción, imagen de perro y gato y tarjeta «Pide tu cita» |
| Franja de confianza | 4 ventajas con icono: atención cercana, instalaciones modernas, equipo especializado, todas las etapas de la vida |
| Servicios | 6 tarjetas con icono, nombre, descripción corta y enlace: medicina general, vacunación, cirugía, salud dental, dermatología, diagnóstico |
| Equipo | 4 veterinarios con foto, nombre y especialidad |
| Horario | Tabla de los 7 días, con urgencias |
| Pide tu cita | Formulario: tipo de mascota, fecha, hora, datos de contacto y motivo |
| Opiniones | 3 reseñas de clientes con la foto de su mascota |
| Pie | Dirección, teléfono (`tel:`), email (`mailto:`), mapa, redes y enlace a la página de privacidad |

*(Mapa de la página: ver el dibujo en el documento original; las 9 secciones van en el orden de la tabla.)*

Los tres elementos resaltados llevan al mismo formulario de cita: es el hilo que une los cuatro mundos, de un formulario HTML a una agenda que funciona.

**Materiales del encargo** (carpeta del proyecto, todo con licencia libre y atribución en `docs/LICENCIAS.md`):

- **Imágenes:** una de portada (perro y gato), una por servicio, 4 retratos de equipo y 3 de mascotas para las opiniones, en dos tamaños (móvil y escritorio).
- **Iconos SVG:** fonendo, jeringa, bisturí, diente, huella, corazón, escudo, calendario, reloj, teléfono, lupa y flecha.
- **Textos definitivos:** servicios con descripción, horario, 3 opiniones, ya redactados: el alumno los copia en su sitio.
- **Guía de estilo cerrada:** paleta verde azulado con crema y acentos pastel (cada color con su código y su uso), dos fuentes con sus pesos y tamaños, escala de espaciados, radios, sombras, botones y los fondos de formas suaves de la portada. Banners e imágenes de fondo incluidos.

## Mundo 1 · HTML: la clínica en HTML puro

**Entrega:** un `index.html` con todo el contenido de la clínica, semántico y accesible, todavía sin CSS. Es fea a propósito: el mensaje es que el contenido y la estructura van primero.

Es **una lección de proyecto nueva al final del mundo** (tras html-13), en **5 pasos**, aquí agrupados en 3 bloques:

1. **Esqueleto y portada** (repasa html-02 a html-07): estructura del documento, cabecera con logo (`img` con `alt`) y menú de enlaces internos (`#servicios`, `#equipo`…), portada con `h1`, texto y botón-enlace a `#cita`.
2. **Contenido** (repasa html-08 y html-11): servicios, equipo con `figure` y `figcaption`, franja de confianza y **tabla de horarios** con `thead`, días y horas.
3. **Formulario y pie** (repasa html-09, html-10 y html-12): formulario de cita y pie con contacto; repaso semántico de toda la página.

**Mínimos que se comprueban:**

- `head` completo: `lang`, `charset`, `viewport`, `title`, descripción, favicon y etiquetas Open Graph del encargo.
- `header`, `nav`, `main` y `footer`; un solo `h1`; cada sección con su `h2` y su `id` del contrato.
- El menú del encargo (5 enlaces internos), y cada uno apunta a una sección que existe.
- Los **6 servicios** del encargo (`article class="servicio"` con `h3`, texto e icono con `alt`), los **4 miembros del equipo** y las **3 opiniones**, con los textos de la ficha.
- Todas las imágenes con `alt`, `width` y `height`, y `loading="lazy"` las que no están en la portada.
- La tabla de horarios del encargo, con cabecera y los 7 días.
- Formulario `#form-cita` con `fieldset` y `legend`, cada campo con su `label`: nombre, teléfono (`tel`), email (`email`), tipo de mascota (`select` con las opciones del encargo), fecha (`date`), hora (`time`), motivo (`textarea`), ¿primera visita? (`radio`), aceptar la privacidad (`checkbox`, obligatorio, con enlace a la página de privacidad) y botón de enviar.
- Pie con los datos de contacto del encargo: enlaces `tel:` y `mailto:`, el enlace al mapa en otra pestaña y el enlace a `privacidad.html`, una segunda página con el texto legal que va hecha en los materiales.

**Lo que decide el alumno:** cómo escribe el HTML dentro de lo que pide la ficha: etiquetas de agrupación (`div`, `section`, `article`…), clases propias, el orden interno de cada sección y cómo coloca las imágenes.

## Mundo 2 · CSS: la identidad de la clínica

**Entrega:** un `estilos.css` aparte, enlazado desde el HTML del Mundo 1, que da a la clínica su identidad en pantalla de escritorio. El HTML apenas cambia (como mucho, alguna clase nueva).

Es **una lección de proyecto nueva al final del mundo** (tras css-14), en **4 pasos**, aquí agrupados en 3 bloques:

1. **Identidad** (repasa css-01 a css-06 y css-14): paleta en variables de `:root`, fuentes, tamaños de texto y colores de enlaces y botones.
2. **Cajas y tarjetas** (repasa css-07 a css-09): espaciado con el modelo de caja, tarjetas de servicio y equipo con bordes redondeados y sombra, botón de llamada a la acción.
3. **Colocación** (repasa css-10 a css-13): cabecera fija arriba (`position: sticky`), menú en fila con Flexbox, portada en dos columnas, servicios y equipo en Grid, tarjeta «Pide tu cita» destacada.

**Mínimos que se comprueban** (sobre el estilo calculado, no sobre el código):

- Las variables de la guía de estilo en `:root` (principal, secundario, fondo, texto, acento) y usadas en el resto de la hoja.
- Los colores calculados de fondo, texto, botones y enlaces coinciden con la paleta del encargo.
- Las dos fuentes del encargo: una en `body` y otra en los títulos, con los tamaños de la guía (con tolerancia).
- Las tarjetas `.servicio` con el radio, el relleno y la sombra de la guía.
- Menú con `display: flex`; servicios con `display: grid` y 3 columnas a 1200 px, como la captura.
- Cabecera con `position: sticky` (sigue visible al bajar).

**Lo que decide el alumno:** cómo organiza la hoja (selectores, clases propias, variables extra, el orden de las reglas) y con qué propiedades llega al resultado. La responsividad todavía no se pide: llega en el Mundo 3.

## Mundo 3 · HTML + CSS: la maqueta profesional

**Entrega:** la misma web convertida en una maqueta de nivel profesional, como las dos referencias: se ve bien en móvil, tableta y escritorio, responde al ratón y al teclado, y tiene movimiento suave. **Sustituye al proyecto actual de hc-11 y hc-12** (la web de adopción de mascotas).

Es **la lección de proyecto del final del mundo** (`hc-13`, en lugar de hc-11 y hc-12), en **4 pasos** (eran 3; el responsive se partió en móvil y tableta para que el salto no fuera tan grande, 18 de octubre de 2026):

1. **Móvil primero** (repasa hc-05, hc-06 y hc-03): la base pasa a ser el móvil (una columna, el menú plegado tras el botón «☰ Menú», que funcionará en el Mundo 4) y el bloque de colocación del Mundo 2 va a `@media (min-width: 1100px)`, con la portada que se funde con el fondo (`::after` + `linear-gradient`).
2. **Tableta** (repasa hc-06 y css-13): dos columnas desde 768 px, con la tarjeta de cita a lo ancho.
3. **Ratón, teclado y formulario** (repasa hc-02 a hc-04, hc-07, hc-08 y hc-10): `:hover` y `:focus-visible` en enlaces, botones y tarjetas, los adornos con `::after` (la línea bajo el antetítulo, el subrayado del menú activo), `transition`, y los campos con foco, error y éxito.
4. **Movimiento** (repasa hc-09): la portada entra con `@keyframes` y `prefers-reduced-motion` la calma.

**Mínimos que se comprueban** (la página se mide a 375, 768 y 1200 px):

- A 375 px nada se sale de la pantalla (sin scroll horizontal) y los servicios van en una columna; a 1200 px, en tres o más.
- Al menos una `@media` con `min-width` (móvil primero).
- Botones y tarjetas cambian al pasar el ratón y tienen foco visible con el teclado.
- Al menos una `transition` y una animación con `@keyframes`, y una regla `prefers-reduced-motion` que las calma.
- Los campos del formulario se ven distintos al tener el foco y cuando son `:invalid`.

**Lo que decide el alumno:** la técnica (Flexbox o Grid, cuántas `@media` y dónde exactamente) y cómo escribe las transiciones y animaciones. Qué se anima, cuánto dura y cómo debe verse en cada ancho lo marca la ficha.

## Mundo 4 · JavaScript: la web funciona

**Entrega:** un `script.js` que da vida a la clínica. La pieza central es la **agenda de citas**, que **sustituye a la lista de tareas de js-14**: enseña lo mismo (añadir, mostrar, cancelar y recordar al recargar), pero con un sentido real dentro de la web.

Es **la lección de proyecto del final del curso** (`js-17`, en lugar de js-14), en **6 pasos**, aquí agrupados en 4 bloques (el HTML y el CSS de lo nuevo, como los filtros, los huecos de los mensajes y «Mis citas», los trae hechos el equipo de diseño; el alumno escribe `script.js` desde cero):

1. **Menú y detalles** (repasa js-01 a js-06): el botón del menú móvil abre y cierra la navegación (cambiando una clase y `aria-expanded`), el enlace activo se marca al pulsarlo y el año del pie se escribe solo.
2. **Servicios desde datos** (repasa js-07 a js-10): los servicios salen de un array de objetos (`nombre`, `descripcion`, `icono`, `mascotas`) y se pintan con JavaScript; unos botones los filtran por tipo de mascota (perros, gatos, exóticos, todos).
3. **Cita validada** (repasa js-11): el formulario no se envía con errores; cada campo muestra su mensaje junto a él (teléfono de 9 cifras, email válido, fecha no pasada, hora dentro del horario, privacidad aceptada) y, si todo va bien, sale un resumen de la cita.
4. **Mis citas** (repasa js-12 y js-13): las citas se guardan en `localStorage`, se listan en «Mis citas», se pueden cancelar y siguen ahí al recargar; las opiniones se cargan con `fetch` desde un JSON del curso.

**Mínimos que se comprueban** (simulando clics y escritura, como un usuario):

- Pulsar el botón del menú muestra y oculta la navegación, y `aria-expanded` cambia.
- Hay al menos tantas tarjetas `.servicio` como objetos en el array, y el filtro deja solo las de esa mascota.
- Enviar el formulario vacío no crea ninguna cita y muestra mensajes; enviarlo bien crea una.
- Tras recargar, la cita sigue en «Mis citas»; al cancelarla desaparece, también tras recargar.
- Las opiniones aparecen tras el `fetch`.

**Lo que decide el alumno:** los nombres de funciones y variables y cómo reparte el código. Los textos de los mensajes, cómo se muestra el resumen de la cita y las mascotas del filtro vienen en la ficha. No hay tareas extra: todo lo que pide la ficha forma parte del curso.

## El glosario de consulta

En cada lección de proyecto, el alumno tiene a mano un **glosario con todo lo aprendido en ese mundo y en los anteriores**. Construir una web entera de un tirón obliga a recordar muchos términos a la vez, y el objetivo es programar, no memorizar.

**Cómo es:**

- **Un panel junto al editor** que se abre y se cierra sin perder el código ni la vista previa.
- **Cada entrada:** el término (`<label>`, `display: grid`, `addEventListener`…), para qué sirve en una línea, un ejemplo mínimo que se puede copiar y la lección donde se vio, con enlace para repasarla.
- **Ordenado por mundo y por tema** (estructura, formularios, colores, cajas, colocación, responsive, movimiento, DOM, eventos, datos…), con un **buscador** que encuentra también por lo que hace: «centrar» lleva a Flexbox y a `margin: auto`.
- **Destacado lo que pide el paso actual:** si la ficha pide la tabla de horarios, arriba salen `<table>`, `<thead>`, `<th>` y `<td>`.
- **Crece con el alumno:** en el Mundo 1 solo hay HTML; en el Mundo 4 está todo el curso. Nunca muestra algo que todavía no se ha enseñado.

**De dónde sale:** cada lección declara los términos que enseña (con su línea y su ejemplo) en su propio archivo, y el glosario se monta solo a partir de ellas. Así nunca se desincroniza del temario, y el mismo glosario puede abrirse después desde el laboratorio y desde la página final «Mi clínica».

## Cómo se revisa y cómo se guarda

Cada paso de una lección de proyecto es de tipo **proyecto**: editor con las pestañas del mundo, vista previa en vivo y una lista de comprobaciones que se ponen en verde. **Se aprueba cuando la web cumple el encargo**, escrito como el alumno quiera.

**Cómo se comprueba (el resultado, nunca cómo está escrito):**

- **Estructura:** se consulta el documento de la vista previa (¿hay `nav` con 4 enlaces que llevan a secciones existentes?).
- **Estilo:** se lee el estilo calculado, no el texto del CSS: da igual si el alumno escribe `#1f7a6b` o `var(--principal)`.
- **Responsive:** La vista previa se mide a 375, 768 y 1200 px y se compara con la captura de la ficha en lo que importa (colores, tamaños de letra, columnas, posición de las piezas clave), con tolerancia: nunca píxel a píxel.
- **Comportamiento:** se simulan clics y escritura; para «fecha no pasada» la comprobación fija el día de hoy, así el resultado no cambia con el calendario.
- **Mensajes:** cada comprobación que falla dice qué falta y en qué lección se aprendió («falta el `label` del campo `telefono` → html-09»). Tagui da pistas, nunca la solución entera.

**Cada mundo parte de la versión oficial:**

- Cada lección de proyecto empieza desde **nuestra versión de «Huellas» del final del mundo anterior**, no desde el código del alumno. En la historia: «Hemos revisado tu entrega y la hemos integrado en la versión oficial; sobre esta base sigues».
- Como el alumno ya construyó esa parte siguiendo la misma ficha, la base le resulta conocida: es su trabajo, con otras sangrías o envoltorios. El objetivo se cumple igual: **escribe la web entera, mientras aprende a hacerlo**.
- **Entre mundos no se guarda nada.** Dentro de una lección, el código se conserva entre pasos y al cerrar y volver, como ya hacen los borradores de los ejercicios.
- Ventajas: nadie arrastra errores de un mundo a otro, quien cambia de navegador o salta un mundo no se atasca, y las comprobaciones son más fiables porque todos parten del mismo HTML.

**Al final del curso:** la página **«Mi clínica»** muestra la web terminada a pantalla entera (la base oficial con el JavaScript del alumno) y un botón para **descargarla** en `.zip` (`index.html`, `privacidad.html`, `estilos.css`, `script.js` y la carpeta de imágenes), para abrirla en su ordenador y enseñarla. El curso es para principiantes: el cierre es un mensaje para seguir practicando, no una guía de publicación.

**El laboratorio también descarga:** la herramienta de práctica libre permite descargar lo que el alumno haga en ella (sus archivos HTML, CSS y JavaScript en un `.zip`), para que pueda seguir practicando por su cuenta con lo que construya, dentro o fuera del curso.

## Revisión del temario

El profesor cruzó el temario con el proyecto (informe en `docs/revisiones/2026-10-16-profesor-temario-vs-proyecto.md`). Los mundos 2 y 3 están casi cubiertos; en los mundos 1 y 4 faltan piezas que el proyecto necesita. **Se aprueban todos sus cambios:** el curso pasa de 52 a **56 lecciones**, más largo pero más real.

| Mundo | Sin enseñar | De pasada | Cambios aprobados |
| --- | --- | --- | --- |
| 1 · HTML | 5 | 5 | Nueva **html-13 «La cabeza de la página»** (descripción, `viewport`, favicon, Open Graph); `tel:`, `mailto:` y enlace a una página propia en html-06; `width`, `height` y `loading="lazy"` en html-07; campos `tel`, `date` y `time` en html-10 |
| 2 · CSS | 0 | 5 | Ejercicio real de `position: sticky` en css-10; contraste AA en css-03; `max-width` en css-07 |
| 3 · HTML + CSS | 2 | 1 | Menú móvil con la clase `abierto` en hc-06; campos con error (`:user-invalid`) en hc-10 |
| 4 · JavaScript | 8 | 7 | Nueva **«Filtrar listas»** (`filter`, `includes`); nueva **«Fechas y horas»** antes de js-11; js-11 ampliada (casillas, radio marcado, teléfono solo cifras, un mensaje por campo); de js-14 se rescatan «quitar un elemento» (a js-10) y el array de objetos guardado (a js-12); `setAttribute` y `aria-expanded` en js-04 |

**Pasos de las lecciones de proyecto:** Mundo 1 en 5, Mundo 2 en 4, Mundo 3 en 4 y Mundo 4 en 6, para que ningún salto sea demasiado grande. La versión oficial del Mundo 2 deja agrupada la colocación de escritorio, así el paso «móvil primero» del Mundo 3 consiste en envolver ese bloque en una `@media`.

**Tres pautas para que la longitud no pese:**

- **Lecciones cortas:** las nuevas miden lo mismo que las actuales; si una crece, se divide en dos.
- **La meta a la vista:** al empezar cada mundo, el alumno ve la captura de cómo quedará su parte de «Huellas».
- **Nadie pierde su progreso:** el curso está publicado, así que las lecciones nuevas llevan ids nuevos (el id de una lección no cambia nunca) y una lección ya completada sigue abierta aunque se meta otra delante, así que no hace falta migrar nada.

Las lecciones nuevas y las ampliaciones se hacen en la fase de cada mundo (3 a 6), antes de su lección de proyecto.

## Plan de trabajo

Ocho fases, en orden; cada una termina con algo comprobable. **Ninguna toca código hasta cerrar la fase 0.**

1. **Fase 0 · Decisiones** (este documento): aprobarlo junto con la guía de estilo y el contrato mínimo de nombres; el profesor revisa que el temario de los 4 mundos enseña todo lo que pide el proyecto. *Hecho cuando:* está aprobado y pasado a `docs/PROYECTO_FINAL.md`.
2. **Fase 1 · Diseño y materiales:** la guía de estilo de «Huellas», las imágenes e iconos con licencia, todos los textos y la versión completa de la web, guardando su estado al final de cada paso (13 instantáneas). De ahí salen las capturas de las fichas. *Hecho cuando:* las 13 instantáneas cumplen su propio encargo y la versión final pasa una auditoría de accesibilidad y rendimiento.
3. **Fase 2 · Motor del proyecto:** el nuevo tipo de paso **proyecto** (varios archivos, ficha de encargo, comprobaciones por estructura, estilo calculado, anchos y comportamiento), el arranque de cada lección desde la versión oficial del mundo anterior, el reloj fijo para las fechas el panel del glosario (cada lección existente declara sus términos). *Hecho cuando:* una batería de tests aprueba «Huellas» y suspende variantes rotas con el mensaje correcto.
4. **Fase 3 · Mundo 1:** la lección de proyecto nueva tras html-12. *Hecho cuando:* pasa el verificador y aprueba un HTML escrito de otra forma (otras etiquetas de agrupación, otras clases).
5. **Fase 4 · Mundo 2:** la lección de proyecto nueva tras css-14. *Hecho cuando:* aprueba una hoja organizada de otra forma con el mismo resultado.
6. **Fase 5 · Mundo 3:** la lección de proyecto que sustituye a hc-11 y hc-12. *Hecho cuando:* aprueba a 375, 768 y 1200 px, con Flexbox o con Grid, y respeta el movimiento reducido.
7. **Fase 6 · Mundo 4:** la lección de proyecto que sustituye a js-14, con la agenda de citas. *Hecho cuando:* los recorridos simulados (menú, filtro, cita mala y buena, recargar, cancelar) pasan.
8. **Fase 7 · «Mi clínica» y revisión:** la página final y la descarga del laboratorio, ambas en `.zip`; revisión con los agentes de QA y de alumno novato, y arreglos. *Hecho cuando:* un alumno simulado termina los 4 proyectos y la web descargada funciona fuera del curso, abierta desde el disco; lo que se hace en el laboratorio también se descarga y funciona igual.

## Decisiones tomadas

Todas cerradas (16 de octubre de 2026).

- [x] **¿Dónde va el proyecto?** Una sola lección de proyecto al final de cada mundo (4 en total), con su parte de la web dividida en pasos. Sustituye a hc-11, hc-12 y js-14; en los mundos 1 y 2 es una lección nueva tras html-12 y css-14.
- [x] **¿Los ejercicios normales de las lecciones también construyen la clínica?** No: siguen siendo independientes y solo las lecciones de proyecto tocan la clínica.
- [x] **Nombre de la clínica:** «Huellas».
- [x] **Nombre de las lecciones de proyecto:** «Proyecto web» (el gran final de cada mundo); los retos de html-12 y css-14 dejan de llamarse «jefe final» (18 de octubre de 2026).
- [x] **Servicios y equipo en el Mundo 1:** el alumno hace 3 servicios y 2 personas del equipo; al empezar el Mundo 2 se le cuenta que el equipo de diseño añadió el resto a petición de la clínica. Los textos del encargo se dan para copiar (como haría el cliente) y el primer encargo empieza con el archivo vacío (18 de octubre de 2026).
- [x] **`privacidad.html`:** va hecha como material del encargo; el alumno la enlaza desde el pie y desde la casilla del formulario, pero no la escribe (18 de octubre de 2026).
- [x] **Imágenes:** fotos libres (Unsplash o Pexels) con atribución e iconos SVG propios.
- [x] **Descarga final:** un `.zip`.
- [x] **¿Puntos extra?** No. El proyecto no es un trabajo aparte, es el fruto del curso: todo lo que pide forma parte de él.
- [x] **Vista previa:** con las imágenes reales desde el Mundo 1.
