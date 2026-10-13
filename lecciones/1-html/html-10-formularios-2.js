/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-10
   Formularios: más tipos de campo — email, number, password,
   radio, checkbox, select/option, textarea y required.
   Nota: en las prácticas el motor intercepta el envío del
   formulario (no va a ningún sitio). Todos los campos llevan
   su <label for> + id.
   ============================================================ */
CURSO.registrar({
  id: "html-10",
  titulo: "Formularios: más tipos de campo",
  xp: 45,
  objetivo: "Sabrás elegir el campo adecuado para cada dato: email, número, contraseña, opciones, listas y textos largos.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Cada dato, su campo",
      texto: "Hasta ahora usabas `<input type=\"text\">` para todo. Pero si cambias el `type`, el navegador te echa una mano:\n\n• `type=\"email\"`: avisa si falta la @.\n• `type=\"number\"`: solo deja escribir números y añade unas flechitas.\n• `type=\"password\"`: tapa lo que escribes con puntitos, por si alguien mira. 🙈\n\nY un atributo nuevo: `required` (obligatorio). Si el campo está vacío, el formulario **no se envía** y sale un aviso. Es un atributo sin valor: basta con escribir la palabra.",
      ejemplo: {
        html: `<form>
  <p>
    <label for="email">Tu email</label>
    <input type="email" id="email" name="email" required>
  </p>
  <p>
    <label for="edad">Edad de tu robot</label>
    <input type="number" id="edad" name="edad">
  </p>
  <p>
    <label for="clave">Contraseña secreta</label>
    <input type="password" id="clave" name="clave">
  </p>
  <button>Enviar</button>
</form>`,
        css: ""
      },
      consejo: "En el móvil, `type=\"email\"` saca un teclado con la @ a mano y `type=\"number\"` uno de números. ¡Tus usuarios te lo agradecerán!"
    },
    {
      tipo: "explicacion",
      titulo: "Elegir opciones: radio y checkbox",
      texto: "Cuando hay que **elegir**, no hace falta escribir:\n\n• `type=\"radio\"`: circulitos donde solo puedes marcar **uno** del grupo. Al marcar otro, el anterior se desmarca. El grupo se forma dándoles a todos **el mismo `name`**.\n• `type=\"checkbox\"`: casillas donde marcas **todas las que quieras**.\n\nEl atributo `value` es lo que se envía cuando esa opción está marcada. Fíjate también en que aquí el campo va **antes** de su `<label>`: es lo habitual en circulitos y casillas.",
      ejemplo: {
        html: `<form>
  <p>¿Qué superpoder prefieres?</p>
  <input type="radio" id="volar" name="poder" value="volar">
  <label for="volar">Volar</label>
  <input type="radio" id="invisible" name="poder" value="invisible">
  <label for="invisible">Ser invisible</label>

  <p>¿Qué llevas en tu mochila de heroína?</p>
  <input type="checkbox" id="capa" name="mochila" value="capa">
  <label for="capa">Capa</label>
  <input type="checkbox" id="bocata" name="mochila" value="bocata">
  <label for="bocata">Bocata de emergencia</label>
</form>`,
        css: ""
      },
      consejo: "Error típico: si tus radio tienen **name distintos**, el navegador cree que son preguntas diferentes y ¡te deja marcar los dos! Y gracias al `<label>`, puedes pulsar en el texto en vez de atinar al circulito."
    },
    {
      tipo: "explicacion",
      titulo: "Listas desplegables y textos largos",
      texto: "Dos campos más que no son `<input>`:\n\n• `<select>` crea una **lista desplegable**. Cada opción va dentro con `<option>`: el `value` es lo que se envía y el texto es lo que se ve.\n• `<textarea>` es una **caja grande** para escribir varias líneas, como un comentario. A diferencia de `<input>`, **sí tiene etiqueta de cierre**. El atributo `rows` dice cuántas líneas se ven.\n\nCon los dos sigues usando `<label for>` + `id`, igual que siempre.",
      ejemplo: {
        html: `<form>
  <p>
    <label for="planeta">Planeta de vacaciones</label>
    <select id="planeta" name="planeta">
      <option value="marte">Marte</option>
      <option value="saturno">Saturno (con anillos)</option>
      <option value="pluton">Plutón (por los viejos tiempos)</option>
    </select>
  </p>
  <p>
    <label for="postal">Escribe una postal</label>
    <textarea id="postal" name="postal" rows="3"></textarea>
  </p>
</form>`,
        css: ""
      },
      consejo: "¿Radio o select? Con **pocas** opciones (2–4), usa radio: se ven todas de un vistazo. Con **muchas** (países, años…), un select ahorra espacio."
    },
    {
      tipo: "ejercicio",
      enunciado: "Crea el formulario para **adoptar un dragón** 🐉. Escribe, en este orden:\n\n1. Un `<form>`. Todo lo demás va **dentro** de él (sin `<p>`).\n2. Un `<label>` con `for=\"edad\"` que diga **Edad del dragón**.\n3. Debajo, un `<input>` con `type=\"number\"`, `id=\"edad\"`, `name=\"edad\"` y `required`.\n4. Un `<button>` que diga **Adoptar**.\n\nNo añadas ningún otro atributo. Cuando lo tengas, prueba a escribir letras en el campo, o a pulsar **Adoptar** con el campo vacío.",
      solucion: {
        html: `<form>
  <label for="edad">Edad del dragón</label>
  <input type="number" id="edad" name="edad" required>
  <button>Adoptar</button>
</form>`,
        css: ""
      },
      pistas: [
        "Es como el formulario de la lección anterior, pero con type=\"number\" en vez de \"text\". El atributo required se escribe tal cual, sin =\"…\".",
        "Dentro del form van tres líneas:\n<label for=\"edad\">Edad del dragón</label>\n<input type=\"number\" id=\"edad\" name=\"edad\" required>\n<button>Adoptar</button>"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Preguntas la talla de una camiseta y solo se puede elegir UNA. ¿Qué campo usas?",
      opciones: ["Varios checkbox", "Varios radio con el mismo name", "Un textarea"],
      correcta: 1,
      explicacion: "Los radio de un mismo grupo (mismo name) solo dejan marcar una opción. Los checkbox permiten marcar varias, y un textarea es para escribir textos largos."
    },
    {
      tipo: "reto",
      enunciado: "Termina la encuesta de la pizzería 🍕. Cada campo con su `<label for>` y su `id`:\n\n1. Cambia el campo del email a `type=\"email\"` y hazlo obligatorio con `required`.\n2. Tamaño: ya hay un radio «Mediana». Añade otro (por ejemplo «Familiar») con **el mismo `name`**.\n3. Ingredientes: añade al menos dos casillas `checkbox`.\n4. Masa: un `<select>` con al menos dos `<option>`.\n5. Comentarios: un `<textarea>`.",
      inicial: {
        html: `<h1>Encuesta pizzera</h1>
<form>
  <!-- 1. Cambia este campo a tipo email y hazlo obligatorio -->
  <p>
    <label for="correo">Tu email</label>
    <input type="text" id="correo" name="correo">
  </p>

  <!-- 2. Añade otro radio de tamaño con el mismo name -->
  <p>Tamaño:</p>
  <input type="radio" id="mediana" name="tamano" value="mediana">
  <label for="mediana">Mediana</label>

  <!-- 3. Añade al menos dos ingredientes (checkbox) -->
  <p>Ingredientes:</p>

  <!-- 4. Añade la masa: un select con al menos dos opciones -->

  <!-- 5. Añade los comentarios: un textarea -->

  <button>Enviar encuesta</button>
</form>
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "Hay un campo de email obligatorio (type=\"email\" y required)",
          prueba: (doc) => Array.from(doc.querySelectorAll("input"))
            .some(i => i.type === "email" && i.required)
        },
        {
          texto: "Hay al menos dos opciones de tamaño (radio) con el mismo name",
          prueba: (doc) => {
            const cuenta = {};
            Array.from(doc.querySelectorAll("input"))
              .filter(i => i.type === "radio" && i.name)
              .forEach(i => { cuenta[i.name] = (cuenta[i.name] || 0) + 1; });
            return Object.values(cuenta).some(n => n >= 2);
          }
        },
        {
          texto: "Hay al menos dos ingredientes (checkbox)",
          prueba: (doc) => Array.from(doc.querySelectorAll("input"))
            .filter(i => i.type === "checkbox").length >= 2
        },
        {
          texto: "Hay un <select> con al menos dos <option> y un <textarea> para los comentarios",
          prueba: (doc) => (doc.querySelector("select")?.querySelectorAll("option").length || 0) >= 2
            && !!doc.querySelector("textarea")
        }
      ],
      pistas: [
        "Copia la forma de los ejemplos: los radio y checkbox se escriben <input type=\"…\" id=\"…\" name=\"…\" value=\"…\"> seguidos de su <label for=\"…\">. El select lleva sus <option> dentro, y el textarea se abre y se cierra.",
        "Algunas piezas:\n<input type=\"email\" id=\"correo\" name=\"correo\" required>\n<input type=\"radio\" id=\"familiar\" name=\"tamano\" value=\"familiar\">\n<label for=\"familiar\">Familiar</label>\n<input type=\"checkbox\" id=\"setas\" name=\"ingredientes\" value=\"setas\">\n<label for=\"setas\">Setas</label>\n<select id=\"masa\" name=\"masa\"><option value=\"fina\">Fina</option><option value=\"gruesa\">Gruesa</option></select>\n<textarea id=\"comentarios\" name=\"comentarios\"></textarea>"
      ],
      solucion: {
        html: `<h1>Encuesta pizzera</h1>
<form>
  <p>
    <label for="correo">Tu email</label>
    <input type="email" id="correo" name="correo" required>
  </p>

  <p>Tamaño:</p>
  <input type="radio" id="mediana" name="tamano" value="mediana">
  <label for="mediana">Mediana</label>
  <input type="radio" id="familiar" name="tamano" value="familiar">
  <label for="familiar">Familiar</label>

  <p>Ingredientes:</p>
  <input type="checkbox" id="pina" name="ingredientes" value="pina">
  <label for="pina">Piña (que empiece el debate)</label>
  <input type="checkbox" id="setas" name="ingredientes" value="setas">
  <label for="setas">Setas</label>

  <p>
    <label for="masa">Masa</label>
    <select id="masa" name="masa">
      <option value="fina">Fina y crujiente</option>
      <option value="gruesa">Gruesa y esponjosa</option>
    </select>
  </p>

  <p>
    <label for="comentarios">Comentarios</label>
    <textarea id="comentarios" name="comentarios" rows="3"></textarea>
  </p>

  <button>Enviar encuesta</button>
</form>
`,
        css: ""
      }
    }
  ]
});
