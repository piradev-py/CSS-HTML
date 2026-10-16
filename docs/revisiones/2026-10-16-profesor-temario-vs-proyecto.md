# Revisión del profesor: temario frente al proyecto «Huellas»

> 16 de octubre de 2026 · Fase 0 de `docs/PROYECTO_FINAL.md`. Solo informe: no se ha tocado ninguna lección.
> Método: grep sobre `lecciones/` (texto de explicaciones, ejercicios y retos; no cuentan los usos que solo están en las comprobaciones).

Leyenda: ✅ cubierto · 🟡 se ve de pasada (mención, consejo o solo en un ejemplo) · ❌ no se enseña.
Columna «¿Antes?»: si llega antes de la lección de proyecto de ese mundo.

## 1. Cobertura por mundo

### Mundo 1 · HTML (proyecto tras html-12)

| Requisito | Lección | Estado | ¿Antes? |
|---|---|---|---|
| `lang`, `charset`, `title` | html-02 | ✅ | Sí |
| `meta viewport` | hc-05 | 🟡 | **No** (llega en el Mundo 3) |
| `meta name="description"` | — | ❌ | — |
| Open Graph (`og:title`, `og:image`…) | — | ❌ | — |
| Favicon (`link rel="icon"`) | — | ❌ | — |
| `header`, `nav`, `main`, `footer`, `section`, `article` | html-12 | ✅ | Sí |
| Un solo `h1`, un `h2` por sección | html-03, html-12 | ✅ | Sí |
| Menú de enlaces internos con `id` + `#` | html-06 | ✅ | Sí |
| Botón-enlace a `#cita` | html-06 | ✅ | Sí |
| `img` con `alt` | html-07 | ✅ | Sí |
| `img` con `width` **y** `height` | html-07 (enseña solo `width`: «el alto se ajusta solo») | 🟡 | Sí |
| `loading="lazy"` | — | ❌ | — |
| `figure` / `figcaption` (equipo) | html-07 | ✅ | Sí |
| Tabla con `thead` y 7 días | html-08 | ✅ | Sí |
| `form`, `label for`, `name`, `button` | html-09 | ✅ | Sí |
| `fieldset`/`legend`, `select`, `textarea`, `radio`, `checkbox`, `required`, `email` | html-10 | ✅ | Sí |
| `type="tel"`, `type="date"`, `type="time"` | — | ❌ | — |
| Enlaces `tel:` y `mailto:` | — | ❌ | — |
| Mapa en otra pestaña (`target="_blank"` + `rel`) | html-06 | ✅ | Sí |
| `privacidad.html`: enlace a otra página propia (ruta relativa) | html-06 enseña URL externas e internas `#` | 🟡 | Sí |
| Enlace dentro del `label` de la casilla de privacidad | html-06 + html-09 (nunca juntos) | 🟡 | Sí |
| Clases propias (`class="servicio"`) | html-11 | ✅ | Sí |

**Mundo 1: 5 ❌ · 5 🟡** (el `viewport` cuenta como 🟡 pero llega tarde).

### Mundo 2 · CSS (proyecto tras css-14)

| Requisito | Lección | Estado | ¿Antes? |
|---|---|---|---|
| Hoja aparte `estilos.css` con `<link>` | css-01 (explicación) | ✅ | Sí |
| Variables en `:root` y `var()` | css-14 | ✅ | Sí |
| Colores en hex / `rgb()` | css-03 | ✅ | Sí |
| Dos fuentes con pesos y tamaños | css-04 (`font-family`, `font-weight`, `font-size`) | ✅ | Sí |
| Cargar una fuente web (Google Fonts con `<link>`) | — | 🟡 (si el material la da hecha) / ❌ si la escribe el alumno | — |
| Contraste AA | hc-11/hc-12 lo mencionan («que se lea»); nunca la cifra 4,5:1 | 🟡 → ❌ al quitar hc-11/hc-12 | No |
| Selectores agrupados para títulos | css-02 | ✅ | Sí |
| Modelo de caja, `padding`, `margin` | css-07 | ✅ | Sí |
| `border-radius`, `box-shadow` | css-08 | ✅ | Sí |
| Botón CTA con estilo | css-08 (botón «¡Jugar!») | ✅ | Sí |
| Contenedor centrado (`max-width` + `margin: 0 auto`) | `margin auto` en css-07; `max-width` en hc-01; el patrón en hc-11 | 🟡 | No (en parte) |
| `position: sticky` (cabecera) | css-10 (solo se menciona: «los usarás más adelante») | 🟡 | Sí |
| Menú en fila con Flexbox | css-11 | ✅ | Sí |
| Portada en dos columnas | css-11/css-13 | ✅ | Sí |
| Servicios/equipo en Grid, 3 columnas | css-13 | ✅ | Sí |
| Quitar viñetas del menú (`list-style`) | hc-04 | 🟡 | **No** |

**Mundo 2: 0 ❌ firmes · 5 🟡** (contraste pasa a ❌ si desaparecen hc-11/hc-12).

### Mundo 3 · HTML + CSS (proyecto en lugar de hc-11 y hc-12)

| Requisito | Lección | Estado | ¿Antes? |
|---|---|---|---|
| `:hover` | hc-02 | ✅ | Sí |
| `:focus-visible` | hc-04 (en enlaces; botones y tarjetas no) | ✅ | Sí |
| `::before` / `::after` | hc-03 | ✅ | Sí |
| Barra de navegación completa, enlace activo | hc-04 | ✅ | Sí |
| `@media (min-width)`, móvil primero | hc-05, hc-06 | ✅ | Sí |
| Sin scroll horizontal, imágenes fluidas | hc-05 | ✅ | Sí |
| Menú compactado en móvil (botón visible, enlaces ocultos) | — | ❌ | — |
| `transform` + `transition` | hc-07, hc-08 | ✅ | Sí |
| `@keyframes` | hc-09 | ✅ | Sí |
| `prefers-reduced-motion` | hc-09 (solo para `animation`, no para `transition`) | ✅ | Sí |
| Formulario: foco, `:invalid` | hc-10 | ✅ | Sí |
| Estado de éxito (`:valid`) | hc-10 | ✅ | Sí |
| Contraste AA + lista de revisión final | hc-12 (se elimina) | ❌ tras el cambio | — |
| Hero, contenedor central, CTA | hc-11 (se elimina) | 🟡 (lo usa el Mundo 2 antes) | — |

**Mundo 3: 2 ❌ · 1 🟡.**

### Mundo 4 · JavaScript (proyecto en lugar de js-14)

| Requisito | Lección | Estado | ¿Antes? |
|---|---|---|---|
| Abrir/cerrar menú con `classList.toggle` | js-04, js-06 | ✅ | Sí |
| `aria-expanded` / `setAttribute` | — | ❌ | — |
| Marcar enlace activo (`querySelectorAll` + `forEach`) | js-08 | ✅ | Sí |
| Año del pie (`new Date().getFullYear()`) | — | ❌ | — |
| Array de objetos y pintarlo | js-09, js-10 | ✅ | Sí |
| Vaciar el contenedor antes de repintar | js-14 (se elimina) | 🟡 | — |
| Filtrar por mascota: `array.includes()` dentro del objeto | `includes` solo en textos (js-11) | 🟡 | Sí |
| Filtrar el array (`filter` o `for…of` + `push`) | js-14 (se elimina; `filter` solo en un consejo) | ❌ tras el cambio | — |
| Saber qué mascota pide cada botón de filtro | (4 escuchadores con `filtrar("perro")`; `data-*` no se enseña) | 🟡 | Sí |
| `submit` + `preventDefault` | js-11 | ✅ | Sí |
| Mensaje junto a cada campo (`aria-describedby`, `role="alert"`) | js-11 (explicación con un campo; el reto usa un `#error` común) | 🟡 | Sí |
| Teléfono de 9 cifras (longitud + solo dígitos) | `length` sí (js-07); «solo dígitos» no | ❌ | — |
| Email válido | js-11 (`includes("@")`) | ✅ | Sí |
| Fecha no pasada (saber la fecha de hoy) | — | ❌ | — |
| Hora dentro del horario (comparar `"09:30"` como texto) | js-07 compara números, no textos | 🟡 | Sí |
| Privacidad aceptada (`casilla.checked`) | — | ❌ | — |
| Leer el `radio` marcado (resumen de la cita) | — | ❌ | — |
| Resumen con plantilla de texto | js-02 | ✅ | Sí |
| `localStorage` con **array de objetos** + `JSON` | js-12 (array de textos y un objeto); el array de objetos solo en js-14 | 🟡 | Sí |
| Si no hay nada guardado, empezar con `[]` | js-12 (`getItem` da `null`), js-14 | 🟡 | Sí |
| Botón «Cancelar» en cada elemento pintado (escuchador por elemento) | js-14 (se elimina) | ❌ tras el cambio | — |
| `fetch` de un JSON del curso + `try/catch` | js-13 | ✅ | Sí |

**Mundo 4: 8 ❌ · 7 🟡.** Es el mundo con más hueco, y casi todo porque js-14 enseñaba patrones que el proyecto necesita.

## 2. Cambios propuestos al temario (por prioridad)

**P1. Mundo 4: nueva lección «Filtrar listas» (`filter`)** entre js-10 y js-11. Una idea: «quedarte con algunos elementos de un array». Sirve dos veces en el proyecto: filtrar servicios por mascota y cancelar una cita (`citas = citas.filter(c => c !== cita)`, sin necesidad de `id`). Incluye `array.includes()` como condición. Ejemplo: canciones por género; reto: filtrar un catálogo de mascotas con botones.

**P2. Mundo 4: nueva lección «Fechas y horas» (`Date`)** antes de js-11. `new Date()`, `getFullYear()` (año del pie), la fecha de hoy como texto `AAAA-MM-DD` (con `toLocaleDateString("sv-SE")` o montándola con `padStart`, avisando del lío de zonas horarias de `toISOString`) y comparar `"2026-10-20" >= hoy` y `"09:30" >= "09:00"` como textos. Reto: un cartel de «faltan X días / ya pasó».

**P3. Mundo 4: ampliar js-11 (validar formularios)** sin idea nueva, solo «más campos que validar»:
- `casilla.checked` (privacidad) y el radio marcado con `form.querySelector('[name="primera"]:checked')` (o enseñar `form.elements.primera.value`, más simple).
- Teléfono: `tel.length === 9 && !Number.isNaN(Number(tel))`, explicando `Number()` (ya anunciado en js-07).
- Un mensaje **por campo** y una bandera `let todoBien = true`. Cambiar el reto para que tenga 2–3 campos, cada uno con su `<p class="error">`.

**P4. Mundo 4: rescatar de js-14 lo que el proyecto necesita** antes de que desaparezca:
- js-10: añadir un ejercicio con un botón «Quitar» dentro de cada `li`, con su propio escuchador (el patrón de «Cancelar»), y vaciar con `contenedor.textContent = ""` antes de repintar.
- js-12: el reto pasa a guardar un **array de objetos** y a cargar con `JSON.parse(localStorage.getItem("x")) || []` (hoy solo está en js-14).
- js-04: añadir `setAttribute` / `getAttribute` con `aria-expanded` como ejemplo (encaja en «cambiar la página»); el ejemplo de js-06 puede ser ya un menú que se abre.

**P5. Mundo 1: nueva lección «La cabeza de la página»** (html-13, antes del proyecto): `meta description`, `meta viewport` (se adelanta; hc-05 pasa a repasarla), favicon con `link rel="icon"` y Open Graph. Una idea: «lo que el navegador, los buscadores y las redes leen y tú no ves». Reto: completar el `head` de la web de una pastelería y ver la «tarjeta de vista previa» que simula el motor.

**P6. Mundo 1: ampliar lecciones existentes**
- html-06 (enlaces): `tel:` y `mailto:`, y enlazar a otra página propia (`privacidad.html`, ruta relativa). Cabe: es «a dónde puede llevar un enlace».
- html-07 (imágenes): `width` **y** `height` («así el navegador reserva el hueco y la página no salta») y `loading="lazy"`. Cambiar el ejercicio para pedir los dos tamaños; el reto añade `loading="lazy"` a la segunda foto. Mencionar `alt=""` en iconos decorativos.
- html-10 (más tipos de campo): `tel`, `date` y `time` junto a `email`/`number`. La lección ya va cargada: si se quiere aligerar, `password` puede quedarse en un consejo.

**P7. Mundo 2: reforzar css-10 y css-03**
- css-10: un ejercicio real de `position: sticky; top: 0` en una cabecera (hoy solo «los usarás más adelante»), con fondo para que no se transparente.
- css-03: un paso corto de **contraste AA** (4,5:1 en texto normal, cómo medirlo con las herramientas del navegador) y la regla «el color nunca es la única pista».
- css-07: introducir `max-width` junto a `margin: 0 auto` (contenedor centrado), en vez de esperar a hc-01.
- css-04: un consejo sobre cargar fuentes web con `<link>` (el material lo dará hecho, pero que no sea magia).
- Mover `list-style: none` a css-09 (display), donde ya se convierten listas en filas.

**P8. Mundo 3: rescatar de hc-11/hc-12 y cubrir el menú móvil**
- hc-06 (mobile first): ejemplo del menú compacto: en móvil los enlaces ocultos y el botón visible; desde 768 px al revés. Que use la clase `abierto`, la misma que activará el JS del Mundo 4.
- hc-10: usar `:user-invalid` (o `:not(:placeholder-shown):invalid`) para que el formulario no salga en rojo antes de escribir. Sin esto, el paso 3 del proyecto confunde.
- hc-09: añadir `transition: none` dentro de `prefers-reduced-motion`.
- La «lista de revisión» de hc-12 (móvil, alt, contraste, títulos, teclado, movimiento) y las ideas de hc-11 (planificar secciones, hero, CTA) pasan como pasos `explicacion` dentro de la lección de proyecto del Mundo 3.

## 3. Lecciones afectadas por el proyecto

- **html-12 y css-14:** su reto se anuncia como «🐉 ¡Jefe final del Mundo HTML/CSS!». Se queda el reto tal cual, pero hay que quitar la etiqueta de «jefe final» (enunciado y comentario de cabecera): el jefe final pasa a ser la lección de proyecto. No se pierde nada.
- **hc-11 y hc-12 (landing de adopción):** se sustituyen. Se pierden: planificar secciones, contenedor central, hero, CTA, testimonios, pie y la lista de revisión final. Destino: el contenedor central va a css-07 (P7), la lista de revisión y el contraste, a la lección de proyecto y a css-03, y el resto lo practica el propio proyecto. La landing de adopción desaparece entera, y con ella 1.177 líneas de ejercicios ya probados: se pueden reutilizar como base para escribir los pasos.
- **js-14 (lista de tareas):** se sustituye. Se pierden: estado en un array de objetos, `pintar()`, escuchador por elemento, borrar con un array nuevo, guardar el array de objetos y el paso de cierre del curso («Mira hasta dónde has llegado»). Destino: P1 y P4 (js-10, js-12) y el cierre pasa a la lección de proyecto final.
- **Recuento** (sin y con las propuestas):

| Mundo | Hoy | Con el proyecto | Con P1, P2 y P5 |
|---|---|---|---|
| 1 · HTML | 12 | 13 | 14 |
| 2 · CSS | 14 | 15 | 15 |
| 3 · HTML + CSS | 12 | 11 | 11 |
| 4 · JavaScript | 14 | 14 | 16 |
| **Total** | 52 | 53 | 56 |

Hay que renumerar los `id` (son correlativos sin huecos) en el Mundo 4 y sincronizar `PLAN_CURSO.md` y `MUNDOS`. Ojo con el progreso guardado de alumnos existentes que tengan aprobada js-11 a js-14 o hc-11 y hc-12: conviene una migración de ids.

## 4. Glosario

**Viable, sí.** Un campo nuevo en `CURSO.registrar`:

```js
terminos: [
  { termino: "<label>", tema: "formularios", linea: "…", ejemplo: "…", busca: ["etiqueta de campo"] }
]
```

El campo `busca` (sinónimos) permite que «centrar» encuentre Flexbox. La lección y su enlace salen del propio `id`. El trabajo es mecánico: entre 4 y 6 términos por lección, que ya están en la cabecera de cada archivo y en «Conceptos nuevos» del plan.

**Estimación:** Mundo 1 ≈ 60 · Mundo 2 ≈ 70 · Mundo 3 ≈ 45 · Mundo 4 ≈ 70. **Unos 245 en total.** Con más de 6 por lección el panel deja de servir: hay que elegir lo que se escribe, no cada palabra.

**Entradas de ejemplo:**

| Término | Para qué (una línea) | Ejemplo | Lección |
|---|---|---|---|
| `<label>` | El cartelito de un campo: al pulsarlo, el cursor salta al campo y el lector de pantalla lo lee. | `<label for="nombre">Nombre</label> <input id="nombre" name="nombre">` | html-09 |
| `margin: 0 auto` | Centra una caja con ancho dentro de su padre: reparte el sobrante a izquierda y derecha. | `.caja { width: 300px; margin: 0 auto; }` | css-07 |
| `@media (min-width: …)` | «A partir de este ancho, aplica también esto»: la base es el móvil y vas añadiendo. | `@media (min-width: 768px) { .servicios { grid-template-columns: 1fr 1fr; } }` | hc-06 |
| `addEventListener` | Pone a un elemento a escuchar: cuando pase el evento, ejecuta tu función. | `boton.addEventListener("click", () => { … });` | js-06 |

## 5. Riesgos de dificultad en las lecciones de proyecto

1. **Mundo 1, salto de volumen.** Pasar de retos de 10 líneas a unas 250 de HTML desde cero, y además el paso 3 junta formulario completo (10 campos), pie y repaso. **Propuesta:** 5 pasos, no 3: (1) `head` y esqueleto; (2) cabecera y portada; (3) servicios, franja y equipo; (4) horario y pie; (5) formulario. El primer servicio, miembro y opinión puede venir escrito como modelo, y el alumno escribe los demás.
2. **Mundo 2, paso 3 con cuatro técnicas a la vez** (sticky, flex, dos columnas, grid). **Propuesta:** dividirlo en «cabecera y menú» (sticky + flex) y «secciones» (portada + grid).
3. **Mundo 3, rehacer en móvil primero una hoja escrita para escritorio.** hc-06 enseña móvil primero desde cero, no a «darle la vuelta» a una hoja hecha. **Propuesta:** que la versión oficial del Mundo 2 deje toda la colocación de escritorio agrupada en un bloque marcado con un comentario. Así el paso consiste en envolver ese bloque en `@media (min-width: …)` y escribir la versión móvil encima. Además: `:focus-visible` en «tarjetas» solo tiene sentido en su enlace (una tarjeta no recibe foco), y conviene decirlo en la ficha.
4. **Mundo 4, pasos 3 y 4 sobrecargados.** El paso 3 lleva cinco validaciones con dos ideas nuevas (fechas, `checked`), y el paso 4 junta guardar, pintar, cancelar, recargar y `fetch`. **Propuesta:** 6 pasos: (1) menú y año; (2) servicios desde datos; (3) filtro; (4) validación con mensajes; (5) guardar y listar «Mis citas» + cancelar; (6) opiniones con `fetch` y cierre del curso.
5. **Mensajes de error que señalan una lección.** Con las lecciones nuevas y la renumeración, los «→ html-09» de las comprobaciones deben salir del glosario (`terminos`), no escribirse a mano, o se desincronizarán.
