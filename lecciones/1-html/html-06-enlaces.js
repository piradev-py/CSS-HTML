/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-06
   Enlaces — <a>, atributos, href, URL, target="_blank" +
   rel="noopener", id y enlaces internos con #.
   Nota: en el resultado, los enlaces externos NO navegan (el motor
   los intercepta y muestra un aviso); los que empiezan por # sí.
   Por eso el reto comprueba atributos, no la navegación.
   ============================================================ */
CURSO.registrar({
  id: "html-06",
  titulo: "Enlaces",
  xp: 35,
  objetivo: "Sabrás enlazar a otras webs y a otras partes de la misma página.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Tu primer enlace",
      texto: "Los **enlaces** son el superpoder de la web: un clic y saltas a otra página. Se crean con `<a>` (de «anchor», ancla ⚓).\n\nPero `<a>` necesita saber **a dónde** ir, y eso se lo dice el atributo `href`. Un **atributo** es un dato extra que va dentro de la etiqueta de apertura, siempre así: `nombre=\"valor\"`.\n\nEl valor de `href` es una **URL**: la dirección de una página, como la dirección de una casa 🏠. Las de otras webs empiezan por `https://`.",
      ejemplo: {
        html: `<p>¿Sabías que el ajolote puede regenerar sus patas?
<a href="https://es.wikipedia.org/wiki/Ambystoma_mexicanum">Descubre más sobre el ajolote</a>.</p>`,
        css: ""
      },
      consejo: "El texto del enlace debe decir **a dónde lleva**. «Haz clic aquí» no ayuda a nadie; «Descubre más sobre el ajolote», sí. Y fíjate: `<a>` es una etiqueta **en línea**, vive dentro de la frase."
    },
    {
      tipo: "explicacion",
      titulo: "Abrir en una pestaña nueva",
      texto: "Una etiqueta puede llevar **varios atributos**, separados por espacios:\n\n• `target=\"_blank\"` abre el enlace en una **pestaña nueva**, y tu página sigue abierta detrás.\n• `rel=\"noopener\"` es un cinturón de seguridad 🔒: impide que la página nueva pueda tocar la tuya. Ponlo siempre junto a `target=\"_blank\"`.\n\nÚsalo con cabeza: abrir pestañas sin avisar despista, así que guárdalo para enlaces a otras webs.",
      ejemplo: {
        html: `<p>
  <a href="https://www.nasa.gov" target="_blank" rel="noopener">Fotos del espacio de la NASA (se abre en otra pestaña)</a>
</p>`,
        css: ""
      },
      consejo: "Un detalle amable: si el enlace se abre en otra pestaña, dilo en el texto, como en el ejemplo. ¡Así nadie se lleva sorpresas!"
    },
    {
      tipo: "explicacion",
      titulo: "Saltar dentro de la misma página",
      texto: "Un enlace también puede llevarte a **otra parte de la misma página**, como el índice de un libro 📖:\n\n1. Ponle un nombre al destino con el atributo `id`: `<h2 id=\"postres\">`.\n2. En el `href`, escribe ese nombre con una almohadilla delante: `href=\"#postres\"`.\n\nEl `id` es como el DNI de una etiqueta: **no puede repetirse** en la página y no lleva espacios (usa guiones: `mis-postres`).",
      ejemplo: {
        html: `<h1>Restaurante El Monstruo Feliz</h1>
<p><a href="#postres">Ir directamente a los postres</a></p>
<h2>Primeros</h2>
<p>Sopa de murciélago (sin murciélago).</p>
<h2>Segundos</h2>
<p>Hamburguesa de lava con patatas volcánicas.</p>
<h2 id="postres">Postres</h2>
<p>Tarta de telarañas con nata.</p>`,
        css: ""
      },
      consejo: "Truco: `href=\"#\"` sin nombre te lleva al principio de la página. ¡Perfecto para un enlace de «Volver arriba»!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Escribe un enlace `<a>` sobre los pulpos 🐙 que se abra en una pestaña nueva. Lleva estos tres atributos, en este orden:\n\n• `href=\"https://es.wikipedia.org/wiki/Octopoda\"`\n• `target=\"_blank\"`\n• `rel=\"noopener\"`\n\nY su texto dice **Los pulpos en la Wikipedia (se abre en otra pestaña)**.\n\nCuando lo tengas, púlsalo: como estás en la web de prácticas, no sales de aquí; verás un aviso con la dirección.",
      pistas: [
        "Los atributos van todos dentro de la etiqueta de apertura <a …>, separados por espacios y siempre así: nombre=\"valor\". El texto va entre <a …> y </a>.",
        "Empieza así:\n<a href=\"https://es.wikipedia.org/wiki/Octopoda\" target=\"_blank\" …>\nFalta el rel, el texto y el cierre </a>."
      ],
      solucion: {
        html: `<a href="https://es.wikipedia.org/wiki/Octopoda" target="_blank" rel="noopener">Los pulpos en la Wikipedia (se abre en otra pestaña)</a>
`,
        css: ""
      }
    },
    {
      tipo: "quiz",
      pregunta: "En tu página tienes <h2 id=\"bonus\">Nivel secreto</h2>. ¿Qué enlace salta hasta él?",
      opciones: [
        "<a href=\"bonus\">Nivel secreto</a>",
        "<a href=\"#bonus\">Nivel secreto</a>",
        "<a id=\"#bonus\">Nivel secreto</a>"
      ],
      correcta: 1,
      explicacion: "El destino se escribe en el href, con una almohadilla # delante del nombre del id: href=\"#bonus\"."
    },
    {
      tipo: "reto",
      enunciado: "Crea el menú del **Club de Fans del Capibara**, con un enlace en cada `<li>`:\n\n1. Uno a la Wikipedia: `https://es.wikipedia.org/wiki/Hydrochoerus_hydrochaeris`\n2. Otro a cualquier web (que empiece por `https://`) que se abra en una **pestaña nueva**.\n3. Uno que salte a la sección «Reuniones». Antes, ponle un `id` a ese `<h2>`.",
      inicial: {
        html: `<h1>Club de Fans del Capibara</h1>

<ul>
  <li><!-- 1. Enlace a la Wikipedia --></li>
  <li><!-- 2. Enlace a otra web, en pestaña nueva --></li>
  <li><!-- 3. Enlace que salta a «Reuniones» --></li>
</ul>

<h2>Quiénes somos</h2>
<p>Gente convencida de que el capibara es el animal más tranquilo del planeta.</p>

<!-- Ponle un id a este h2, por ejemplo id="reuniones" -->
<h2>Reuniones</h2>
<p>Todos los sábados junto al estanque. Trae fruta: ¡les encanta la sandía!</p>
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "Hay al menos dos enlaces con texto a otras webs (su href empieza por https://)",
          prueba: (doc) => Array.from(doc.querySelectorAll("a"))
            .filter(a => /^https?:\/\//i.test((a.getAttribute("href") || "").trim())
              && a.textContent.trim().length > 0).length >= 2
        },
        {
          texto: "Uno de esos enlaces se abre en pestaña nueva (target=\"_blank\")",
          prueba: (doc) => Array.from(doc.querySelectorAll("a"))
            .some(a => /^https?:\/\//i.test((a.getAttribute("href") || "").trim())
              && (a.getAttribute("target") || "").trim().toLowerCase() === "_blank")
        },
        {
          texto: "Hay un enlace con texto cuyo href empieza por # y lleva a un id que existe en la página",
          prueba: (doc) => Array.from(doc.querySelectorAll("a")).some(a => {
            const href = (a.getAttribute("href") || "").trim();
            const nombre = href.slice(1);
            return href.charAt(0) === "#" && nombre.length > 0
              && !!doc.getElementById(nombre) && a.textContent.trim().length > 0;
          })
        }
      ],
      pistas: [
        "Cada enlace es una etiqueta <a> con su atributo href, escrita dentro de un <li> en lugar del comentario. El de la pestaña nueva lleva además target=\"_blank\". Y el del salto necesita que el <h2> tenga un id.",
        "Algo así:\n<li><a href=\"https://es.wikipedia.org/wiki/Hydrochoerus_hydrochaeris\">El capibara en la Wikipedia</a></li>\n<li><a href=\"https://www.youtube.com\" target=\"_blank\" rel=\"noopener\">Vídeos (otra pestaña)</a></li>\n<li><a href=\"#reuniones\">Nuestras reuniones</a></li>\nY abajo: <h2 id=\"reuniones\">Reuniones</h2>"
      ],
      solucion: {
        html: `<h1>Club de Fans del Capibara</h1>

<ul>
  <li><a href="https://es.wikipedia.org/wiki/Hydrochoerus_hydrochaeris">El capibara en la Wikipedia</a></li>
  <li><a href="https://www.youtube.com/results?search_query=capibaras" target="_blank" rel="noopener">Vídeos de capibaras (se abre en otra pestaña)</a></li>
  <li><a href="#reuniones">Nuestras reuniones</a></li>
</ul>

<h2>Quiénes somos</h2>
<p>Gente convencida de que el capibara es el animal más tranquilo del planeta.</p>

<h2 id="reuniones">Reuniones</h2>
<p>Todos los sábados junto al estanque. Trae fruta: ¡les encanta la sandía!</p>
`,
        css: ""
      }
    }
  ]
});
