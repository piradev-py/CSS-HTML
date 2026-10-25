---
description: Traduce una lección al inglés (copia en lecciones-en/)
---
Traduce al inglés una lección del curso. Datos de la tarea:

$ARGUMENTS

La primera palabra es la ruta del original (p. ej. `lecciones/2-css/css-04-texto.js`); después vienen el `titulo` inglés,
los renombres de clases/ids y, si los hay, los textos que deben quedar exactos.

1. Lee **solo** el original y la sección «Traducir una lección» de `AGENTS.md`. No abras otras lecciones.
2. Crea la copia con el mismo nombre en `lecciones-en/` (cambia `lecciones/` por `lecciones-en/` en la ruta).
   El original no se toca. `js/curso.js` tampoco.
3. Aplica cada renombre en **todo** el archivo a la vez: explicaciones, ejemplos, enunciados, pistas, `inicial`,
   `solucion`, `cssBase`, el `html` y los `selector` de los pasos `controles`, y los selectores de las comprobaciones.
   Una clase o id que no esté en la lista y esté en español, tradúcela tú y cítala en el resumen.
4. Si una comprobación busca texto (`includes(…)`, `textContent`, mensajes de consola), adáptala al inglés de la solución.
5. Comprueba, y corrige hasta que salga bien:
   - `node --check <archivo nuevo>`
   - `node herramientas/lecciones-en.mjs <id>` → ✅ salvo «falta en:». Revisa a mano cada ⚠️.
   No lances los tests del navegador.
6. Termina con el resumen de 3–5 líneas: archivo creado, renombres que añadiste tú, ⚠️ que dejaste y por qué.
