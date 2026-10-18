# Textos de «Huellas»

> Textos definitivos del encargo (fase 1 de `docs/PROYECTO_FINAL.md`). El alumno los **copia tal cual**: las comprobaciones
> los buscan con las reglas de siempre (las tildes y las mayúsculas no cuentan). Los datos de contacto son inventados:
> el teléfono no es de nadie y el dominio `.example` está reservado para ejemplos.
> Los `id`, clases y `name` del contrato van entre `código`.

## Datos de la clínica

| Dato | Texto |
|---|---|
| Nombre | Huellas · Clínica veterinaria |
| Dirección | Calle de los Almendros, 12 · 28013 Madrid |
| Teléfono | 912 345 678 (enlace `tel:+34912345678`) |
| Urgencias | 600 123 456 (enlace `tel:+34600123456`) |
| Email | hola@huellas.example (enlace `mailto:hola@huellas.example`) |
| Mapa | «Cómo llegar» → `https://www.openstreetmap.org/search?query=Madrid` (otra pestaña) |
| Redes | Instagram → `https://www.instagram.com/` · Facebook → `https://www.facebook.com/` (otra pestaña) |

## Cabeza de la página (`head`)

- `title`: **Huellas · Clínica veterinaria en Madrid**
- `description`: **Clínica veterinaria cercana para perros, gatos y exóticos. Medicina general, vacunas, cirugía y urgencias 24 horas. Pide tu cita en línea.**
- Open Graph: `og:title` = el `title`; `og:description` = la descripción; `og:image` = `img/portada.jpg`; `og:type` = `website`.
- Favicon: `img/favicon.svg` (la huella del logo).

## Cabecera

- Logo: icono de huella + **Huellas** + *Clínica veterinaria* (`alt` del logo: «Huellas, clínica veterinaria»).
- Menú (5 enlaces): **Inicio** `#inicio` · **Servicios** `#servicios` · **Equipo** `#equipo` · **Horario** `#horario` · **Contacto** `#contacto`.
- Botón: **Pide tu cita** → `#cita`.
- Botón del menú en móvil (Mundos 3 y 4): texto oculto «Abrir el menú» / «Cerrar el menú».

## Portada (`#inicio`)

- Antetítulo: **Cuidamos lo que más quieres**
- Titular (`h1`): **Salud y cariño para toda su vida** («toda su vida» destacado en color).
- Texto: **Medicina veterinaria cercana y profesional, para que tu compañero esté siempre en las mejores manos.**
- Botón: **Pide tu cita** → `#cita`.
- Foto: `img/portada.jpg` · `alt`: «Un perro y un gato tumbados juntos al sol».
- Nota manuscrita (imagen decorativa, `alt=""`): «Salud · Vida · Compañía ♡».
- Tarjeta «Pide tu cita»: título **Pide tu cita**, subtítulo **En pocos pasos**, botón **Reservar cita** → `#cita`.

## Franja de confianza

| Icono | Título | Línea |
|---|---|---|
| corazón | Atención cercana | Te escuchamos y te explicamos cada paso. |
| escudo | Instalaciones modernas | Quirófano, rayos X y laboratorio propios. |
| equipo | Equipo especializado | Veterinarios con formación en cada área. |
| huella | Todas las etapas de su vida | Desde cachorro hasta la edad senior. |

## Servicios (`#servicios`)

- Antetítulo: **Nuestros servicios** · Título (`h2`): **Todo lo que necesitan, en un solo lugar**
- Cada tarjeta: `article class="servicio"` con foto, icono, `h3`, descripción y enlace **Pide cita** → `#cita`.
- `mascotas` es el dato del Mundo 4 para los filtros (**Todos · Perros · Gatos · Exóticos**).

| Servicio | Descripción | Icono | Foto | `mascotas` |
|---|---|---|---|---|
| Medicina general | Revisiones, diagnóstico y consejos para prevenir antes que curar. | fonendo | `servicio-medicina.jpg` | perro, gato, exótico |
| Vacunación | El calendario de vacunas y desparasitación adaptado a su edad. | jeringa | `servicio-vacunacion.jpg` | perro, gato, exótico |
| Cirugía | Quirófano propio y anestesia vigilada en todo momento. | bisturí | `servicio-cirugia.jpg` | perro, gato |
| Salud dental | Limpiezas y revisiones para una boca sana y sin dolor. | diente | `servicio-dental.jpg` | perro, gato |
| Dermatología | Alergias, picores y cuidado de la piel y el pelo. | huella | `servicio-dermatologia.jpg` | perro, gato, exótico |
| Diagnóstico | Análisis, ecografía y rayos X en la propia clínica. | corazón | `servicio-diagnostico.jpg` | perro, gato, exótico |

`alt` de las fotos de servicio: `alt=""` (decorativas: el texto de la tarjeta ya lo dice todo).

## Equipo (`#equipo`)

- Antetítulo: **Nuestro equipo** · Título (`h2`): **Personas que quieren a los animales tanto como tú**
- Cada miembro: `figure` con la foto y `figcaption` con nombre (en negrita) y especialidad.

| Foto | Nombre | Especialidad | `alt` |
|---|---|---|---|
| `equipo-1.jpg` | Daniel Ortega | Medicina general y urgencias | Daniel Ortega, veterinario, sonriendo en la consulta |
| `equipo-2.jpg` | Pablo Ruiz | Dermatología | Pablo Ruiz, veterinario, con un pomerania en brazos |
| `equipo-3.jpg` | Samir Haddad | Odontología veterinaria | Samir Haddad, veterinario, con pijama azul marino |
| `equipo-4.jpg` | Antonio Lozano | Cirugía · Director clínico | Antonio Lozano, veterinario, con los brazos cruzados |

## Horario (`#horario`)

- Antetítulo: **Horario** · Título (`h2`): **Cuándo puedes venir**
- Tabla con cabecera (`thead`): **Día · Consulta · Urgencias**

| Día | Consulta | Urgencias |
|---|---|---|
| Lunes | 9:00 – 20:30 | 24 horas |
| Martes | 9:00 – 20:30 | 24 horas |
| Miércoles | 9:00 – 20:30 | 24 horas |
| Jueves | 9:00 – 20:30 | 24 horas |
| Viernes | 9:00 – 20:30 | 24 horas |
| Sábado | 10:00 – 14:00 | 24 horas |
| Domingo | Cerrado | 24 horas |

- Nota bajo la tabla: **Urgencias: llámanos al 600 123 456 a cualquier hora.** (enlace `tel:`)

## Pide tu cita (`#cita`)

- Antetítulo: **Pide tu cita** · Título (`h2`): **Reserva en un minuto**
- Texto: **Rellena el formulario y te confirmamos la cita. Si es una urgencia, llámanos.**
- Formulario `id="form-cita"`, con `fieldset` y `legend` **Datos de la cita** y **Tus datos**.

| Campo | `label` | `name` | Tipo | Notas |
|---|---|---|---|---|
| Mascota | Tipo de mascota | `mascota` | `select` | Opciones: Elige una… (vacía) · Perro · Gato · Conejo · Otro exótico |
| Fecha | Fecha | `fecha` | `date` | |
| Hora | Hora | `hora` | `time` | Pista: «De 9:00 a 20:30 (sábados, de 10:00 a 14:00)» |
| Motivo | Motivo de la consulta | `motivo` | `textarea` | Placeholder: «Cuéntanos qué le pasa o qué necesita» |
| Primera visita | ¿Es su primera visita? | `primera` | `radio` | Sí · No |
| Nombre | Tu nombre | `nombre` | `text` | |
| Teléfono | Teléfono | `telefono` | `tel` | Placeholder: «600 000 000» |
| Email | Email | `email` | `email` | |
| Privacidad | He leído y acepto la **política de privacidad** | `privacidad` | `checkbox` | Obligatoria; el texto en negrita enlaza a `privacidad.html` |

- Botón: **Pedir cita**

### Mensajes del formulario (Mundo 4)

| Caso | Mensaje junto al campo |
|---|---|
| Sin mascota | Elige qué mascota viene a la consulta. |
| Fecha vacía o pasada | Elige un día a partir de hoy. |
| Hora fuera del horario | Elige una hora dentro del horario de consulta. |
| Sin nombre | Escribe tu nombre. |
| Teléfono mal | El teléfono debe tener 9 cifras, sin espacios. |
| Email mal | Escribe un email válido, por ejemplo nombre@correo.es. |
| Sin privacidad | Necesitamos que aceptes la política de privacidad. |

- Cita creada: **¡Cita reservada!** + resumen: **{Mascota} · {día} a las {hora} · a nombre de {nombre}**.

### Mis citas (Mundo 4)

- Título (`h3`): **Mis citas**
- Sin citas: **Todavía no tienes citas. ¡Pide la primera!**
- Cada cita: el resumen de arriba + botón **Cancelar**.
- Al cancelar: **Cita cancelada.**

## Opiniones

- Antetítulo: **Opiniones** · Título (`h2`): **Lo que dicen de nosotros**
- En el Mundo 4 llegan con `fetch` desde `datos/opiniones.json` (mismos textos).

| Foto | Autor | Mascota | Opinión | Estrellas |
|---|---|---|---|---|
| `opinion-perro.jpg` | Lucía M. | Copo, bichón maltés | Copo entra en la consulta moviendo la cola. Nos explicaron todo con calma y sin prisas. | 5 |
| `opinion-gato.jpg` | Javier R. | Simba, gato | Simba odia el transportín, pero aquí lo tratan con tanto mimo que vuelve tranquilo a casa. | 5 |
| `opinion-conejo.jpg` | Marta G. | Canela, conejo | Por fin una clínica que sabe de conejos. Le revisaron los dientes y nos dieron muy buenos consejos. | 5 |

`alt` de las fotos: «Copo, el bichón maltés de Lucía» · «Simba, el gato de Javier» · «Canela, el conejo de Marta».

## Pie (`#contacto`)

- Columna 1: logo + **Clínica veterinaria cercana en el centro de Madrid.**
- Columna 2 · **Contacto**: dirección · teléfono · urgencias · email · **Cómo llegar** (mapa).
- Columna 3 · **Horario**: Lunes a viernes, 9:00 – 20:30 · Sábados, 10:00 – 14:00 · Urgencias 24 horas.
- Columna 4 · **Síguenos**: Instagram · Facebook.
- Línea final: **© {año} Huellas · Clínica veterinaria · [Política de privacidad](privacidad.html)** (el año lo escribe el JavaScript del Mundo 4).

## `privacidad.html`

- `title`: **Política de privacidad · Huellas**
- `h1`: **Política de privacidad**
- Enlace arriba: **← Volver a la web** → `index.html`

**Quién guarda tus datos.** Huellas · Clínica veterinaria (Calle de los Almendros, 12, 28013 Madrid ·
hola@huellas.example) es la responsable de los datos que nos das en el formulario de cita.

**Para qué los usamos.** Solo para gestionar tu cita y avisarte si hay algún cambio. No los usamos para publicidad
ni los compartimos con nadie, salvo que la ley nos obligue.

**Cuánto tiempo los guardamos.** Mientras seas cliente de la clínica y, después, el tiempo que exija la ley.

**Tus derechos.** Puedes pedirnos ver, corregir o borrar tus datos, o limitar su uso, escribiendo a
hola@huellas.example. Si crees que no los tratamos bien, puedes reclamar ante la Agencia Española de Protección de
Datos (aepd.es).

**En esta web.** Las citas que reservas se guardan solo en tu navegador (`localStorage`): no se envían a ningún
servidor. Puedes borrarlas cancelándolas o borrando los datos del navegador.

*Texto de ejemplo para el curso: Huellas es una clínica inventada.*
