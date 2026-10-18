/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-07
   El modelo de caja — contenido, padding, border, margin,
   width/height, box-sizing: border-box y centrar con margin: 0 auto.
   Nota: border se usa aquí en su forma abreviada sin explicarla a
   fondo (eso es css-08). El reto mide el ancho total con
   getBoundingClientRect() y el centrado comparando los huecos a
   izquierda y derecha respecto al <body>.
   ============================================================ */
CURSO.registrar({
  id: "css-07",
  titulo: "El modelo de caja",
  xp: 45,
  objetivo: "Entenderás que todo es una caja y sabrás controlar su contenido, su relleno, su borde y su margen.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Todo es una caja 📦",
      texto: "Para el navegador, **cada elemento es una caja** rectangular, aunque no la veas. Y toda caja tiene 4 capas, como un regalo:\n\n• **Contenido**: el regalo (texto, imagen…). Su tamaño se controla con `width` y `height`.\n• `padding` (**relleno**): el papel de seda entre el regalo y la caja.\n• `border` (**borde**): el cartón de la caja.\n• `margin` (**margen**): el espacio que dejas con las demás cajas.\n\nEn el ejemplo, el fondo dorado llega hasta el borde (incluye el relleno), pero el margen es transparente.",
      ejemplo: {
        html: `<div class="regalo">🧸 Un osito</div>`,
        css: `.regalo {
  width: 120px;
  padding: 20px;
  border: 6px solid crimson;
  margin: 20px;
  background-color: gold;
}`
      },
      consejo: "Por ahora escribe el borde así: `border: 6px solid crimson` (grosor, estilo y color). En la próxima lección lo verás a fondo."
    },
    {
      tipo: "explicacion",
      titulo: "padding, margin y el truco para centrar",
      texto: "Con **un valor**, `padding: 15px` rellena los cuatro lados por igual. Lo mismo con `margin`.\n\nSi solo quieres un lado, añade su nombre: `-top` (arriba), `-right` (derecha), `-bottom` (abajo) o `-left` (izquierda). Por ejemplo, `margin-bottom: 10px`.\n\nCon **dos valores**, el primero es para arriba y abajo, y el segundo para izquierda y derecha.\n\nY aquí va un truco famoso: `margin: 0 auto` **centra** una caja que tenga `width`. El `auto` le dice al navegador: «reparte el espacio que sobra a partes iguales a los dos lados». 🎯",
      ejemplo: {
        html: `<p class="post-it">Comprar leche. Y galletas. Sobre todo galletas.</p>`,
        css: `.post-it {
  width: 180px;
  padding: 15px;
  margin: 0 auto;
  background-color: khaki;
}`
      },
      consejo: "`margin: 0 auto` solo centra si la caja tiene un `width` más pequeño que su padre. Si ocupa todo el ancho, ¡no sobra espacio que repartir!"
    },
    {
      tipo: "explicacion",
      titulo: "max-width: el contenedor de las webs",
      texto: "Un `width` fijo tiene un problema: si la pantalla es más estrecha que la caja, la caja **se sale**. 😬\n\n`max-width` (ancho máximo) es más listo: la caja ocupa todo el ancho que pueda, **pero nunca más** de lo que le digas. En una pantalla grande se queda en su tamaño; en una pequeña, se encoge.\n\nJunto con `margin: 0 auto` forma el **contenedor centrado** que usan casi todas las webs: el contenido nunca se estira de punta a punta en una pantalla enorme y queda en el centro.\n\nEn el ejemplo, la caja como mucho mide 300px. Estrecha la ventana y verás cómo se encoge.",
      ejemplo: {
        html: `<div class="contenedor">Nunca mido más de 300px y siempre estoy en el centro.</div>`,
        css: `.contenedor {
  max-width: 300px;
  margin: 0 auto;
  padding: 15px;
  background-color: lavender;
}`
      },
      consejo: "Las webs suelen usar un `max-width` de entre 1000px y 1200px para el contenido principal. Así las líneas de texto no se hacen eternas en pantallas grandes."
    },
    {
      tipo: "explicacion",
      titulo: "box-sizing: border-box",
      texto: "Sorpresa: por defecto, `width` mide **solo el contenido**. El relleno y el borde se suman **por fuera**.\n\nUna caja con `width: 200px`, `padding: 20px` y un borde de `5px` mide en realidad 200 + 20 + 20 + 5 + 5 = **250px**. ¡Menudo lío de cuentas! 😵\n\nLa solución es `box-sizing: border-box`. Con ella, `width` mide **la caja entera** (contenido + relleno + borde): si dices 200px, mide 200px, y el contenido se encoge para hacer sitio.\n\nCompara las dos cajas del ejemplo: tienen el mismo CSS, salvo el `box-sizing`.",
      ejemplo: {
        html: `<div class="caja">Sin border-box: 250px</div>
<div class="caja exacta">Con border-box: 200px</div>`,
        css: `.caja {
  width: 200px;
  padding: 20px;
  border: 5px solid teal;
  margin-bottom: 10px;
  background-color: paleturquoise;
}
.exacta {
  box-sizing: border-box;
}`
      },
      consejo: "Muchos profesionales empiezan cada proyecto con `* { box-sizing: border-box; }`. El asterisco `*` significa «todos los elementos». Así las cuentas siempre salen. 😉"
    },
    {
      tipo: "ejercicio",
      enunciado: "Dale aire a esta nota. A la clase `.nota` ponle:\n\n• un `padding` de `20px`,\n• un `margin` de `30px`,\n• y un `background-color` de `lightpink` (así verás hasta dónde llega el relleno).",
      inicial: {
        html: `<p class="nota">No olvides regar a Federico, el cactus. 🌵</p>
`,
        css: ""
      },
      solucion: {
        html: `<p class="nota">No olvides regar a Federico, el cactus. 🌵</p>
`,
        css: `.nota {
  padding: 20px;
  margin: 30px;
  background-color: lightpink;
}
`
      },
      pistas: [
        "Todo va en una sola regla con el selector .nota. Con un solo valor, padding y margin se aplican a los cuatro lados.",
        "Debe quedarte así:\n.nota {\n  padding: 20px;\n  margin: 30px;\n  background-color: lightpink;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "Juega con las capas de la caja. Sube el relleno y el borde, y después cambia `box-sizing` entre `content-box` (lo normal) y `border-box`: ¿qué le pasa al tamaño total? Mira también cómo el margen empuja al vecino de abajo.",
      html: `<div class="caja">📦 Soy una caja</div>
<p>Yo soy el vecino de abajo.</p>`,
      cssBase: "body { font-family: sans-serif; }\n.caja { background-color: #ffd166; border-style: solid; border-color: #e76f51; }",
      controles: [
        { selector: ".caja", propiedad: "width", tipo: "rango", min: 80, max: 300, valor: 180, unidad: "px" },
        { selector: ".caja", propiedad: "padding", tipo: "rango", min: 0, max: 50, valor: 10, unidad: "px" },
        { selector: ".caja", propiedad: "border-width", tipo: "rango", min: 0, max: 20, valor: 5, unidad: "px" },
        { selector: ".caja", propiedad: "margin", tipo: "rango", min: 0, max: 50, valor: 10, unidad: "px" },
        { selector: ".caja", propiedad: "box-sizing", tipo: "opciones", opciones: ["content-box", "border-box"], valor: "content-box" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Una caja tiene width: 200px, padding: 10px y un borde de 5px. Sin box-sizing: border-box, ¿cuánto mide de ancho en total?",
      opciones: ["200px", "215px", "230px"],
      correcta: 2,
      explicacion: "Sin border-box, el relleno y el borde se suman por los dos lados: 200 + 10 + 10 + 5 + 5 = 230px. Con border-box mediría 200px justos."
    },
    {
      tipo: "reto",
      enunciado: "Prepara la caja de regalo de cumpleaños de Lola 🎁. Ya tiene `width: 300px`; ahora:\n\n1. Añádele un relleno (`padding`).\n2. Añádele un borde (`border`).\n3. Haz que el ancho **total** siga siendo 300px, aunque tenga relleno y borde.\n4. Céntrala en la página.",
      pestana: "css",
      inicial: {
        html: `<div class="regalo">🎁 ¡Feliz cumpleaños, Lola! Dentro hay un dinosaurio de peluche.</div>
`,
        css: `.regalo {
  width: 300px;
  background-color: pink;
  /* 1. Añade un relleno (padding) */
  /* 2. Añade un borde, por ejemplo: border: 6px solid crimson; */
  /* 3. Que el ancho TOTAL siga siendo 300px (box-sizing) */
  /* 4. Céntrala en la página (margin) */
}
`
      },
      comprobaciones: [
        {
          texto: "La caja tiene relleno (padding)",
          prueba: (doc, win) => {
            const el = doc.querySelector(".regalo");
            if (!el) return false;
            const cs = win.getComputedStyle(el);
            return (parseFloat(cs.paddingLeft) || 0) > 0 && (parseFloat(cs.paddingTop) || 0) > 0;
          }
        },
        {
          texto: "La caja tiene un borde",
          prueba: (doc, win) => {
            const el = doc.querySelector(".regalo");
            if (!el) return false;
            return (parseFloat(win.getComputedStyle(el).borderLeftWidth) || 0) > 0;
          }
        },
        {
          texto: "La caja mide 300px de ancho en total, contando relleno y borde",
          prueba: (doc) => {
            const ancho = doc.querySelector(".regalo")?.getBoundingClientRect().width || 0;
            return Math.abs(ancho - 300) <= 1;
          }
        },
        {
          texto: "La caja está centrada en la página",
          prueba: (doc) => {
            const el = doc.querySelector(".regalo");
            if (!el || !doc.body) return false;
            const r = el.getBoundingClientRect();
            const b = doc.body.getBoundingClientRect();
            const izquierda = r.left - b.left;
            const derecha = b.right - r.right;
            return izquierda > 5 && Math.abs(izquierda - derecha) <= 2;
          }
        }
      ],
      pistas: [
        "Para el punto 3 usa box-sizing: border-box. Para centrar, recuerda el truco del margen con dos valores: 0 para arriba y abajo, auto para los lados.",
        "Añade estas líneas dentro de .regalo:\npadding: 20px;\nborder: 6px solid crimson;\nbox-sizing: border-box;\nmargin: 0 auto;"
      ],
      solucion: {
        html: `<div class="regalo">🎁 ¡Feliz cumpleaños, Lola! Dentro hay un dinosaurio de peluche.</div>
`,
        css: `.regalo {
  width: 300px;
  background-color: pink;
  padding: 20px;
  border: 6px solid crimson;
  box-sizing: border-box;
  margin: 0 auto;
}
`
      }
    }
  ]
});
