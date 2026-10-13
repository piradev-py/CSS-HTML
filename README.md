# &lt;CSS-HTML&gt;

Curso interactivo para aprender a crear páginas web **desde cero y jugando**:
primero **HTML**, después **CSS**, luego los dos juntos y por último **JavaScript**.

- 🗺️ Mapa de 4 mundos con lecciones que se desbloquean en orden
- ✍️ Editor en vivo con colores: escribes y ves el resultado al instante
- 🎛️ Controles visuales que generan CSS
- 🏆 Un reto al final de cada lección, con comprobación automática y pistas
- ⭐ Estrellas, XP, niveles, insignias y racha diaria (se guardan en tu navegador)
- 🌙 Modo claro y oscuro, y diseño adaptado al móvil
- 🧪 Modo prueba para recorrer todo el curso sin tocar tu progreso, y botón para reiniciar el curso
  (ambos al final del mapa y en ⚙️ Ajustes)

## Cómo abrirla

No hay que instalar nada: haz **doble clic en `index.html`** y se abre en el navegador.
(Con internet carga las fuentes bonitas; sin internet funciona igual con las del sistema.)

## Estructura

| Carpeta / archivo | Qué contiene |
|---|---|
| `index.html` | Inicio y mapa de niveles |
| `leccion.html?id=…` | Vista de una lección |
| `css/` | Estilos (tema, componentes, mapa, lección) |
| `js/curso.js` | **Índice del curso**: mundos y lista de lecciones |
| `js/` (resto) | Motor: progreso, editor, controles, retos, celebraciones, mascota |
| `lecciones/` | Contenido de cada lección (un archivo `.js` por lección) |
| `docs/PLAN_CURSO.md` | Temario completo |
| `docs/FORMATO_LECCION.md` | Cómo se escribe una lección (contrato con el motor) |
| `tests/verificar-lecciones.html` | Comprueba que cada reto es resoluble y no viene resuelto |
| `.claude/agents/profesor-frontend.md` | Agente de Claude Code que diseña y redacta las lecciones |

## Añadir lecciones

1. Pídeselo al agente **profesor-frontend** en Claude Code (por ejemplo: "escribe las lecciones html-04 a html-06").
2. Abre `tests/verificar-lecciones.html`: todas las filas deben salir en ✓.
3. Abre la lección en el navegador y hazla como si fueras un alumno.
