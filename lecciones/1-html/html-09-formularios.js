/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-09
   Formularios: campos y etiquetas — <form>, <label for> + id,
   <input type="text">, name, placeholder, <button>.
   Nota: en la web de prácticas el motor intercepta el envío del
   formulario y muestra un aviso. Los demás tipos de campo
   (email, checkbox, select…) son de html-10.
   ============================================================ */
CURSO.registrar({
  id: "html-09",
  titulo: "Formularios: campos y etiquetas",
  xp: 40,
  objetivo: "Sabrás crear un formulario sencillo con campos de texto bien etiquetados y un botón.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "¿Qué es un formulario?",
      texto: "Un **formulario** es la parte de una web donde **tú escribes** y la página recoge lo que pones: buscadores, registros, pedidos… Es como la ficha de papel que rellenas en la biblioteca. 📋\n\n• `<form>` es la caja que envuelve todo el formulario.\n• `<input type=\"text\">` es un **campo de texto**: una cajita donde se escribe. Es una etiqueta vacía, sin cierre.\n• `<button>` es un **botón**. Si está dentro de un `<form>`, al pulsarlo se **envía** el formulario.",
      ejemplo: {
        html: `<form>
  <input type="text">
  <button>Buscar receta</button>
</form>`,
        css: ""
      },
      consejo: "En una web real, al enviar, los datos viajan a un **servidor** (otro ordenador que los recibe y los guarda). Aquí, en las prácticas, no van a ningún sitio: solo verás un aviso. ¡Así que no te cortes y pulsa todos los botones!"
    },
    {
      tipo: "explicacion",
      titulo: "Cada campo con su <label>",
      texto: "Un campo vacío no dice qué hay que escribir. Para eso está `<label>`: la **etiqueta** del campo, como la de un tarro de la despensa. 🫙\n\nPara que el `<label>` y su campo queden **enlazados**:\n\n1. Dale al campo un `id` (un nombre único en la página, como viste en Enlaces).\n2. Pon ese mismo nombre en el atributo `for` del `<label>`.\n\nAsí un lector de pantalla dirá «Nombre de tu planta, campo de texto». Y además, ¡al hacer clic en el texto el cursor salta al campo!",
      ejemplo: {
        html: `<form>
  <label for="planta">Nombre de tu planta</label>
  <input type="text" id="planta">
</form>`,
        css: ""
      },
      consejo: "El truco está en que `for` e `id` sean **exactamente iguales**, letra a letra. Si escribes `for=\"planta\"` e `id=\"Planta\"`, ya no se reconocen: las mayúsculas cuentan."
    },
    {
      tipo: "explicacion",
      titulo: "name y placeholder",
      texto: "Dos atributos más que llevan casi todos los campos:\n\n• `name` es el nombre con el que **viaja el dato** al enviarse. Si el campo tiene `name=\"sabor\"` y escribes «fresa», al servidor le llega `sabor=fresa`. Sin `name`, ese dato no se envía.\n• `placeholder` es un **texto de ejemplo** en gris que aparece dentro del campo vacío y desaparece al escribir.\n\nFíjate en que cada pareja `<label>` + campo va dentro de un `<p>`, para que no queden todos en la misma línea.",
      ejemplo: {
        html: `<form>
  <p>
    <label for="sabor">Sabor del helado</label>
    <input type="text" id="sabor" name="sabor" placeholder="Fresa, chocolate…">
  </p>
  <button>Pedir helado</button>
</form>`,
        css: ""
      },
      consejo: "El `placeholder` **nunca sustituye al `<label>`**: en cuanto empiezas a escribir, desaparece, y ya no sabes qué te pedían. 🍦"
    },
    {
      tipo: "ejercicio",
      enunciado: "Crea el formulario de la **Academia de magos** 🧙. Escribe, en este orden:\n\n1. Un `<form>`. Todo lo demás va **dentro** de él (esta vez sin `<p>`).\n2. Un `<label>` con `for=\"hechizo\"` que diga **Tu hechizo favorito**.\n3. Debajo, un `<input>` con `type=\"text\"`, `id=\"hechizo\"`, `name=\"hechizo\"` y `placeholder=\"Abracadabra\"`.\n4. Un `<button>` que diga **Apuntarme**.\n\nNo añadas ningún otro atributo. Cuando lo tengas, haz clic en el texto del label: ¡el cursor saltará al campo!",
      solucion: {
        html: `<form>
  <label for="hechizo">Tu hechizo favorito</label>
  <input type="text" id="hechizo" name="hechizo" placeholder="Abracadabra">
  <button>Apuntarme</button>
</form>`,
        css: ""
      },
      pistas: [
        "Abre con <form> y cierra con </form> al final, después del botón. El for del <label> y el id del <input> tienen que ser iguales: hechizo. Recuerda que <input> no lleva cierre.",
        "Dentro del form van tres líneas:\n<label for=\"hechizo\">Tu hechizo favorito</label>\n<input type=\"text\" id=\"hechizo\" name=\"hechizo\" placeholder=\"Abracadabra\">\n<button>Apuntarme</button>"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "¿Cómo enlazas un <label> con su campo de texto?",
      opciones: [
        "Escribiendo el mismo texto en el label y en el placeholder",
        "Poniendo en el for del label el mismo valor que el id del campo",
        "Poniendo el label justo encima del campo"
      ],
      correcta: 1,
      explicacion: "El for del <label> debe ser igual al id del campo. Que estén cerca no basta: sin for e id, el navegador no sabe que van juntos."
    },
    {
      tipo: "reto",
      enunciado: "Termina el formulario del **club de fans de los dinosaurios** 🦖:\n\n1. Enlaza el `<label>` «Nombre» con su campo: `for` en el label, `id` en el campo.\n2. Añade un `<label>` «Ciudad» y un campo de texto para la ciudad, también enlazados y con su `name`.\n3. Añade un botón que diga **Unirme**.",
      inicial: {
        html: `<h1>Club de fans de los dinosaurios 🦖</h1>
<form>
  <p>
    <!-- 1. Enlaza este label con su campo (for + id) -->
    <label>Nombre</label>
    <input type="text" name="nombre" placeholder="Rex Pérez">
  </p>

  <!-- 2. Añade aquí un label «Ciudad» y su campo de texto, enlazados y con name -->

  <!-- 3. Añade aquí un botón que diga «Unirme» -->
</form>
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "Dentro del <form> hay al menos dos campos de texto, cada uno con su name",
          prueba: (doc) => Array.from(doc.querySelectorAll("form input"))
            .filter(i => i.type === "text" && (i.getAttribute("name") || "").trim().length > 0).length >= 2
        },
        {
          texto: "Cada campo de texto tiene un <label> enlazado (el for del label es igual al id del campo)",
          prueba: (doc) => {
            const campos = Array.from(doc.querySelectorAll("form input")).filter(i => i.type === "text");
            const labels = Array.from(doc.querySelectorAll("label[for]"));
            return campos.length >= 2 && campos.every(i =>
              i.id.length > 0 &&
              doc.getElementById(i.id) === i &&
              labels.some(l => l.getAttribute("for") === i.id && l.textContent.trim().length > 0));
          }
        },
        {
          texto: "Hay un <label> que dice «Nombre» y otro que dice «Ciudad»",
          prueba: (doc) => {
            const textos = Array.from(doc.querySelectorAll("label")).map(l => l.textContent.toLowerCase());
            return textos.some(t => t.includes("nombre")) && textos.some(t => t.includes("ciudad"));
          }
        },
        {
          texto: "Dentro del <form> hay un <button> que dice «Unirme»",
          prueba: (doc) => Array.from(doc.querySelectorAll("form button"))
            .some(b => b.textContent.toLowerCase().includes("unirme"))
        }
      ],
      pistas: [
        "Elige un nombre para cada campo, por ejemplo «nombre» y «ciudad». Ponlo en el id del <input> y, exactamente igual, en el for de su <label>. El botón va dentro del <form>, antes de </form>.",
        "La parte de la ciudad quedaría así:\n<p>\n  <label for=\"ciudad\">Ciudad</label>\n  <input type=\"text\" id=\"ciudad\" name=\"ciudad\">\n</p>\nY el botón: <button>Unirme</button>"
      ],
      solucion: {
        html: `<h1>Club de fans de los dinosaurios 🦖</h1>
<form>
  <p>
    <label for="nombre">Nombre</label>
    <input type="text" id="nombre" name="nombre" placeholder="Rex Pérez">
  </p>

  <p>
    <label for="ciudad">Ciudad</label>
    <input type="text" id="ciudad" name="ciudad" placeholder="Jurásica del Norte">
  </p>

  <button>Unirme</button>
</form>
`,
        css: ""
      }
    }
  ]
});
