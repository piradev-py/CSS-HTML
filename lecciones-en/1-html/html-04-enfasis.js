/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-04
   Negritas, cursivas y énfasis — <strong>, <em>, <mark>, <br>,
   etiquetas vacías y elementos en línea frente a de bloque.
   ============================================================ */
CURSO.registrar({
  id: "html-04",
  titulo: "Bold, italics and emphasis",
  xp: 30,
  objetivo: "You'll learn to highlight words inside a text, telling “important” apart from “emphasized”.",
  // Lo que enseña esta lección, para el glosario de las lecciones de proyecto (js/glosario.js)
  glosario: [
    { termino: "<strong>", tema: "Text", para: "Something important (shown in bold).", ejemplo: "<p>Open <strong>24 hours</strong></p>", buscar: "important bold" },
    { termino: "<em>", tema: "Text", para: "Emphasis, like when you'd say a word in a different tone (shown in italics).", ejemplo: "<p>For <em>her whole</em> life</p>", buscar: "italics emphasis" },
    { termino: "<mark>", tema: "Text", para: "Highlights a piece of text, like a highlighter pen.", ejemplo: "<p>Bring your <mark>booklet</mark></p>", buscar: "highlight mark" },
    { termino: "<br>", tema: "Text", para: "A line break inside the same paragraph. Empty tag: it doesn't close.", ejemplo: "<p>12 Main Street<br>Madrid</p>", buscar: "line break address" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Important or with emphasis",
      texto: "When you speak, sometimes you raise your voice to warn about something serious, and other times you change the tone so a word sounds different. HTML has a tag for each:\n\n• `<strong>` marks something **important**: a warning, a danger. The browser paints it in bold.\n• `<em>` marks **emphasis**: the word you'd say in a different tone. It shows in italics.\n\nLook at the example: depending on which word carries the `<em>`, the sentence tells a different story! 🍰",
      ejemplo: {
        html: `<p><strong>Danger:</strong> the floor has just been mopped.</p>
<p>I didn't eat <em>the cake</em>… I ate the cookies.</p>
<p><em>I</em> didn't eat the cake… it was the dog.</p>`,
        css: ""
      },
      consejo: "You might see `<b>` and `<i>` around, which also make text bold and italic. But `<strong>` and `<em>` also say **what those words mean**, not just how they look. Use these!"
    },
    {
      tipo: "explicacion",
      titulo: "Highlighter and line break",
      texto: "`<mark>` is like running a **highlighter pen** 🖍️ over the page: it highlights a piece so it catches the eye.\n\nRemember how HTML ignores the line breaks you make with Enter? To ask for a real one, inside the same paragraph, you use `<br>`. It's great for addresses or poems.\n\nCareful: `<br>` **takes no closing tag**, because there's nothing inside it. Tags like this are called **empty tags**. You already know another one: `<meta>`!",
      ejemplo: {
        html: `<p>Remember: the trip is on <mark>Thursday</mark>, not Friday.</p>
<p>Tagui<br>
7 Tag Street<br>
Codeville</p>`,
        css: ""
      },
      consejo: "Don't use `<br>` to separate paragraphs or to leave big gaps: another `<p>` is for that. `<br>` is only to break lines **within** the same text."
    },
    {
      tipo: "explicacion",
      titulo: "Inline and block",
      texto: "Tags come in two big families:\n\n• **Block**: they take up a whole line, like `<h1>` or `<p>`. Each one starts on a new line, like stacked boxes 📦.\n• **Inline**: they live **inside** a sentence without breaking it, like `<strong>`, `<em>` and `<mark>`.\n\nThe usual way is for block tags to contain the inline ones: first the paragraph and, inside it, the highlighted words.",
      ejemplo: {
        html: `<p>This sentence has <strong>an important part</strong> and keeps going on the same line.</p>
<p>This other paragraph starts on a new line.</p>`,
        css: ""
      },
      consejo: "Use highlighting in moderation. If you mark **everything** as important… nothing looks important anymore! 😅"
    },
    {
      tipo: "ejercicio",
      enunciado: "Write the address of the pirate parrot 🦜 in **one single** `<p>` paragraph, split into three lines with `<br>`:\n\n• First line: **Captain Feathers**\n• Second line: **Pier 3**\n• Third line: **Cookie Harbor**\n\nPut a `<br>` at the end of the first line and another at the end of the second (not at the end of the third).",
      pistas: [
        "Everything goes inside one single <p>…</p>. Remember that <br> is an empty tag: it takes no closing tag.",
        "Open with <p>, write “Captain Feathers” and put <br>; write “Pier 3” and put another <br>; write “Cookie Harbor” and close with </p>."
      ],
      solucion: {
        html: `<p>Captain Feathers<br>
Pier 3<br>
Cookie Harbor</p>
`,
        css: ""
      }
    },
    {
      tipo: "quiz",
      pregunta: "You want to warn about something serious: “Don't feed the dragon after midnight”. Which tag would you use?",
      opciones: ["<em>", "<strong>", "<mark>"],
      correcta: 1,
      explicacion: "<strong> marks what's important, like a warning. <em> changes the tone of a word and <mark> highlights it like a highlighter pen."
    },
    {
      tipo: "reto",
      enunciado: "Finish the warning sign of Mr. Claws, a **very** grumpy cat 😾:\n\n• Wrap the warning “Don't touch his belly” with `<strong>`.\n• Put emphasis with `<em>` on a word (for example, “never”).\n• Highlight with `<mark>` another word (for example, “tuna”).\n\nAll of it inside the paragraphs that are already there.",
      inicial: {
        html: `<h1>Beware of the cat</h1>
<p>This is where Mr. Claws lives, the grumpiest cat in the neighborhood.</p>
<p>Don't touch his belly.</p>
<p>He never wakes up before noon.</p>
<p>He can only be bribed with tuna.</p>
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "There is a <strong> with text",
          prueba: (doc) => Array.from(doc.querySelectorAll("strong"))
            .some(el => el.textContent.trim().length > 0)
        },
        {
          texto: "There is an <em> with text",
          prueba: (doc) => Array.from(doc.querySelectorAll("em"))
            .some(el => el.textContent.trim().length > 0)
        },
        {
          texto: "There is a <mark> with text",
          prueba: (doc) => Array.from(doc.querySelectorAll("mark"))
            .some(el => el.textContent.trim().length > 0)
        },
        {
          texto: "All three tags are inside a <p> paragraph",
          prueba: (doc) => ["strong", "em", "mark"]
            .every(t => Array.from(doc.querySelectorAll(t)).some(el => !!el.closest("p")))
        }
      ],
      pistas: [
        "The tags go inside the paragraphs and wrap only the words you want to mark, with their opening before and their closing after.",
        "For example:\n<p><strong>Don't touch his belly.</strong></p>\n<p>He <em>never</em> wakes up before noon.</p>\n<p>He can only be bribed with <mark>tuna</mark>.</p>"
      ],
      solucion: {
        html: `<h1>Beware of the cat</h1>
<p>This is where Mr. Claws lives, the grumpiest cat in the neighborhood.</p>
<p><strong>Don't touch his belly.</strong></p>
<p>He <em>never</em> wakes up before noon.</p>
<p>He can only be bribed with <mark>tuna</mark>.</p>
`,
        css: ""
      }
    }
  ]
});
