# Pruebas en el navegador

Scripts que controlan **Microsoft Edge sin ventana** (por DevTools) para recorrer la web como un alumno.
Necesitan Node 22 o superior (usa el `WebSocket` integrado) y Edge instalado en la ruta por defecto.

```bash
# Verificación automática de todas las lecciones listas (tests/verificar-lecciones.html)
node tests/navegador/cdp.mjs esc-tests.mjs

# Pruebas del motor de revisión (hover, media queries, pseudo-elementos, animaciones)
node tests/navegador/cdp.mjs esc-motor.mjs

# Pruebas del motor del Mundo JavaScript (consola, errores, localStorage, fetch, acciones)
node tests/navegador/cdp.mjs esc-motor-js.mjs

# Motor de los pasos de proyecto: las versiones oficiales de «Huellas» aprueban y las variantes rotas suspenden
# (estructura, estilo calculado, anchos, comportamiento con el reloj fijo; tests/proyecto.html)
node tests/navegador/cdp.mjs esc-proyecto.mjs

# Interfaz del paso proyecto con una lección de demostración (tests/demo/demo-proyecto.js)
node tests/navegador/cdp.mjs esc-proyecto-ui.mjs

# Proyecto web del Mundo 1 (html-14) recorrido como un alumno, encargo a encargo, hasta la victoria
node tests/navegador/cdp.mjs esc-proyecto-m1.mjs

# Proyecto web del Mundo 2 (css-15): el HTML oficial y cada hoja oficial, encargo a encargo, hasta la victoria
node tests/navegador/cdp.mjs esc-proyecto-m2.mjs

# Capturas de las fichas de encargo (recursos/huellas/capturas/), a partir de las versiones oficiales (MUNDO=1 o 2)
MUNDO=1 node tests/navegador/cdp.mjs esc-capturas-huellas.mjs

# Capturas de la lección html-13 con la tarjeta de vista previa
node tests/navegador/cdp.mjs esc-fotos-cabeza.mjs

# Capturas de varios pasos del Mundo JavaScript (consola, localStorage, proyecto final)
node tests/navegador/cdp.mjs esc-fotos-js.mjs

# Capturas de la página de inicio (mundos plegados, camino en serpiente, ventana estrecha)
node tests/navegador/cdp.mjs esc-fotos-inicio.mjs

# Recorrer un mundo entero: ejercicio, controles, quiz, reto y victoria de cada lección
MUNDO=2 node tests/navegador/cdp.mjs esc-mundo.mjs        # bash
set MUNDO=2&& node tests\navegador\cdp.mjs esc-mundo.mjs  # cmd de Windows
```

- `cdp.mjs` arranca Edge con un perfil temporal (progreso vacío), ejecuta el escenario y al final informa de
  **cualquier error de JavaScript** de la página.
- Los escenarios reciben una API sencilla: `ir(url)`, `eval(expr)`, `tam(ancho, alto)`, `foto(nombre)`,
  `oscuro(bool)`, `movimiento()` (desactiva «reducir movimiento»), `reducido()` y `cdp(método, params)`.
- Edge sin ventana activa «reducir movimiento» por defecto; llama a `movimiento()` para medir animaciones.
- Las capturas (`*.png`) y los perfiles temporales se guardan aquí y git los ignora.
