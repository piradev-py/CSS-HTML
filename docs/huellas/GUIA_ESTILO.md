# Guía de estilo de «Huellas»

> Elegida el 18 de octubre de 2026 con `docs/huellas/muestrario.html` (fase 1 de `docs/PROYECTO_FINAL.md`).
> Es la parte «Aspecto» del encargo: el alumno la recibe hecha y la traduce a CSS.

## Colores (paleta A · verde azulado)

| Variable | Color | Uso |
|---|---|---|
| `--principal` | `#1f7a6b` | Botones, enlaces, antetítulos, palabra destacada del titular, iconos de formulario |
| `--principal-osc` | `#155e53` | Botón al pasar el ratón |
| `--oscuro` | `#12332f` | Títulos y logo |
| `--texto` | `#2b3b39` | Texto normal |
| `--suave` | `#5f706d` | Texto secundario (descripciones, subtítulos) |
| `--fondo` | `#ffffff` | Fondo de la página y de las tarjetas |
| `--crema` | `#f7faf8` | Fondo de la portada y de las secciones alternas |
| `--menta` | `#dff1ea` | Formas suaves de la portada, círculo de icono principal |

Pastel de los iconos (fondo del círculo / color del dibujo): melocotón `#fde3d3` / `#c25a2c`,
cielo `#dcecf8` / `#2f6fa8`, lavanda `#e8e4fb` / `#5b4bc4`, rosa `#fde2e6` / `#c23a52`.

Contraste (AA): texto 11,7 · texto suave 5,2 · títulos sobre crema 13,0 · botón 5,2 · enlace 5,2. Todo ≥ 4,5.

## Tipografía

- **Títulos y logo:** Outfit (Google Fonts), pesos 700 y 800.
- **Texto:** Inter (Google Fonts), pesos 400, 500 y 600.
- Tamaños de escritorio: titular de portada 3.1rem · `h2` 2rem · `h3` 1.2rem · texto 1rem (portada 1.1rem) ·
  antetítulo 0.78rem en mayúsculas con `letter-spacing: .2em`.
- La nota manuscrita de la portada («Salud · Vida · Compañía ♡») es una **imagen SVG** de los materiales, no texto:
  así el alumno carga solo dos fuentes.

## Forma

- Radio de tarjetas: **20px**. Campos del formulario: 10px.
- Botones: **píldora** (`border-radius: 999px`), relleno `14px 26px`, texto blanco 600.
- Sombra: **muy suave**, `0 10px 30px rgb(18 51 47 / .08)`.
- Movimiento: botones y tarjetas suben 2–4 px al pasar el ratón, `transition` de 0.2s.

## Iconos

13 iconos SVG propios (trazo de 1.8, 24×24): fonendo, jeringa, bisturí, diente, huella, corazón, escudo,
calendario, reloj, teléfono, lupa, flecha y equipo. Van **dentro de un círculo pastel de 52px** (dibujo de 26px),
cada uno con su color; en el formulario y los botones van solos, en el color del texto.

## Fotos (estilo B)

Elegidas el 18 de octubre de 2026, en `recursos/huellas/web/img/`; autores y licencias en `docs/LICENCIAS.md`
(Pexels, StockSnap y Rawpixel).

- **Portada** (`portada.jpg`, 1200 px): perro y gato tumbados al sol, **rectangular** con las esquinas de la guía (20px).
  En el Mundo 3 (`::after` + `linear-gradient`, hc-03) la foto se ensancha y su lado izquierdo **se funde
  con el color de fondo** de la portada.
- **Servicios** (`servicio-*.jpg`, 640×427): cada tarjeta lleva **foto arriba** e icono en su círculo.
- **Equipo** (`equipo-1…4.jpg`, 480×600, para mostrar a 240×300): cuatro veterinarios mirando a cámara, con el mismo
  encuadre (la cara ocupa un tercio del ancho).
- **Opiniones** (`opinion-perro|gato|conejo.jpg`, 400×400): para mostrar en círculo.
