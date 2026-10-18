/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-02
   Variables y consola — variable, let, const, textos (strings),
   números, operadores + - * / y plantillas de texto con
   comillas invertidas y ${…}.
   Notas:
   - Lección solo de consola: pestanas: ["js"].
   - ¡OJO! Los ejemplos y soluciones con plantillas llevan las
     comillas invertidas y los ${ escapados (\` y \${) porque viven
     dentro de template literals de este archivo.
   - En los textos (mini-markdown) no se puede mostrar una comilla
     invertida dentro de `código`: se describe con palabras y se
     enseña en el ejemplo.
   - El reto mira win.__logs (busca dos números, el segundo 7 veces
     el primero) y el código del alumno
     (PRUEBA.codigo) para ver que usa variables, * y
     una plantilla.
   ============================================================ */
CURSO.registrar({
  id: "js-02",
  titulo: "Variables y consola",
  xp: 35,
  objetivo: "Sabrás guardar datos en variables con let y const, hacer cuentas y montar frases con plantillas de texto.",
  pestanas: ["js"],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Variables: cajas con etiqueta",
      texto: "Imagina una **caja con una etiqueta** 📦: dentro guardas algo y, gracias a la etiqueta, lo encuentras después. Eso es una **variable**.\n\n`let mascota = \"Luna\";` se lee así:\n\n• `let`: «crea una caja nueva».\n• `mascota`: la etiqueta (el nombre de la variable).\n• `=`: «guarda dentro» (aquí no significa «igual»).\n• `\"Luna\"`: lo que guardas.\n\nDespués, para usar lo que hay dentro, escribe el nombre **sin comillas**: `console.log(mascota)`. Si le pones comillas, sale la palabra «mascota» tal cual. ¡Compáralo en el ejemplo!",
      ejemplo: {
        js: `let mascota = "Luna";
console.log(mascota);
console.log("mascota");`
      },
      consejo: "Nombres de variable: sin espacios y sin tildes. Si son dos palabras, júntalas y pon mayúscula a la segunda: `comidaFavorita`. ¡Y ojo, que `Mascota` y `mascota` son cajas distintas!"
    },
    {
      tipo: "explicacion",
      titulo: "Textos y números",
      texto: "En una variable puedes guardar distintos tipos de datos. Los dos primeros:\n\n• **Texto** (en inglés, «string»): va entre comillas. `\"Luna\"`.\n• **Número**: va **sin** comillas. `5`, `3.5` (los decimales llevan **punto**, no coma).\n\nCon los números puedes hacer cuentas, como en una calculadora 🧮: `+` suma, `-` resta, `*` multiplica y `/` divide.\n\nPero ojo: con textos, el `+` no suma, ¡**pega**! `\"5\" + \"3\"` da `53`. Mira la última línea del ejemplo.",
      ejemplo: {
        js: `let manzanas = 5;
let peras = 3;
console.log(manzanas + peras);
console.log(manzanas - peras);
console.log(manzanas * 2);
console.log(10 / 4);
console.log("5" + "3");`
      },
      consejo: "Si una cuenta te sale rara, mira si tus números tienen comillas: `\"5\"` es un texto que parece un número, no un número."
    },
    {
      tipo: "ejercicio",
      enunciado: "En la tienda de videojuegos 🎮 cada juego cuesta **20** y te llevas **3**.\n\n• Crea con `let` una variable `precio` que guarde el número `20`.\n• Crea con `let` una variable `cantidad` que guarde el número `3`.\n• Muestra en la consola el total multiplicando las dos variables. Debe salir **60**.",
      solucion: {
        js: `let precio = 20;
let cantidad = 3;
console.log(precio * cantidad);
`
      },
      pistas: [
        "Primero crea las dos variables, cada una en su línea: let, el nombre, = y el número (sin comillas). Después, dentro de console.log, multiplica las variables con *.",
        "Debe quedarte así:\nlet precio = 20;\nlet cantidad = 3;\nconsole.log(precio * cantidad);"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "let o const: ¿va a cambiar?",
      texto: "Hay dos formas de crear una variable:\n\n• `let`: una caja que puedes **vaciar y rellenar** después. Para cambiarla, escribe su nombre, `=` y el valor nuevo, **sin** repetir `let`: `vidas = vidas - 1;` («a las vidas que había, réstale 1 y guárdalo»).\n• `const`: una caja **precintada** 🔒. Se llena una vez y ya no se puede cambiar. Si lo intentas, JavaScript se queja (mira la última línea del ejemplo).\n\nRegla de los profesionales: usa `const` siempre que puedas, y `let` solo para lo que vaya a cambiar.",
      ejemplo: {
        js: `const jugador = "Tagui";
let vidas = 3;
console.log(vidas);

vidas = vidas - 1;
console.log(vidas);
console.log(jugador);

jugador = "Otro"; // ¡Esto da error!`
      },
      consejo: "`let` o `const` se escriben **solo una vez**, al crear la caja. Si vuelves a escribir `let vidas`, JavaScript te avisa de que esa caja ya existe."
    },
    {
      tipo: "explicacion",
      titulo: "Plantillas de texto: frases con huecos",
      texto: "Para mezclar texto y variables puedes pegarlo todo con `+`, pero es fácil liarse con las comillas y los espacios.\n\nHay algo más cómodo: las **plantillas de texto**. Son como una ficha con huecos para rellenar:\n\n1. En vez de comillas normales, usa **comillas invertidas**: en el teclado español, la tecla a la derecha de la **P**; en el latinoamericano, **Alt Gr** + la tecla de la **}** (púlsala y luego la barra espaciadora).\n2. Dentro, cada hueco se escribe `${nombreDeLaVariable}` y se rellena solo.\n\nEn un hueco también puedes hacer cuentas: `${edad + 1}`. Compara en el ejemplo la forma con `+` y la de plantilla.",
      ejemplo: {
        js: `const nombre = "Luna";
const edad = 4;
console.log("Hola, " + nombre + "!");
console.log(\`Hola, \${nombre}!\`);
console.log(\`\${nombre} tiene \${edad} años\`);
console.log(\`El año que viene tendrá \${edad + 1}\`);`
      },
      consejo: "Los huecos `${…}` solo funcionan con comillas invertidas. Con comillas normales, sale `${nombre}` escrito tal cual. ¡Es el despiste más típico!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Lleva el marcador de un juego 🕹️:\n\n• Crea con `const` una variable `jugador` con el texto `\"Tagui\"`.\n• Crea con `let` una variable `puntos` con el número `100`.\n• Con una **plantilla de texto**, muestra en la consola **Tagui tiene 100 puntos**.\n• Después súmale 50 a `puntos` (sin volver a escribir `let`) y muestra la misma plantilla otra vez: ahora debe salir **Tagui tiene 150 puntos**.",
      solucion: {
        js: `const jugador = "Tagui";
let puntos = 100;
console.log(\`\${jugador} tiene \${puntos} puntos\`);
puntos = puntos + 50;
console.log(\`\${jugador} tiene \${puntos} puntos\`);
`
      },
      pistas: [
        "La plantilla va entre comillas invertidas (a la derecha de la P; en teclado latinoamericano, Alt Gr + }) y cada variable dentro de ${ }. Para sumar: puntos = puntos + 50;",
        "Son cinco líneas: crea jugador con const y puntos con let; luego console.log con la plantilla (comillas invertidas y dentro: ${jugador} tiene ${puntos} puntos); luego puntos = puntos + 50; y por último el mismo console.log otra vez."
      ]
    },
    {
      tipo: "quiz",
      pregunta: "¿Qué sale en la consola con console.log(\"4\" + \"2\"); ?",
      opciones: [
        "6",
        "42",
        "Un error"
      ],
      correcta: 1,
      explicacion: "Con comillas, \"4\" y \"2\" son textos, no números. Y con textos el + no suma: los pega. Por eso sale 42. Sin comillas, 4 + 2 sí daría 6."
    },
    {
      tipo: "reto",
      enunciado: "Calcula la edad de tu perro en **años humanos** 🐶 (se dice que cada año de perro equivale a **7** años humanos):\n\n1. Guarda en una variable el nombre de tu perro (real o inventado).\n2. Guarda en otra variable su edad en años de perro (un número).\n3. Calcula su edad humana **multiplicando** esa variable por `7` con `*` y guárdala en otra variable.\n4. Muestra en la consola una frase con una **plantilla de texto** que diga primero su edad de perro y después la humana, por ejemplo: **Rex tiene 5 años, que son 35 años humanos**.",
      inicial: {
        js: `// 1. El nombre de tu perro

// 2. Su edad en años de perro

// 3. Su edad en años humanos (multiplica por 7)

// 4. Muestra la frase con una plantilla de texto

`
      },
      comprobaciones: [
        {
          texto: "Guardas los datos en variables (con `const` o `let`)",
          prueba: (doc) => {
            const codigo = PRUEBA.codigo(doc);
            return /\b(const|let)\s+[A-Za-z_$][\w$]*\s*=/.test(codigo);
          }
        },
        {
          texto: "Calculas la edad humana multiplicando con `*`",
          prueba: (doc) => {
            const codigo = PRUEBA.codigo(doc);
            return /\*/.test(codigo);
          }
        },
        {
          texto: "Muestras la frase con una plantilla de texto (comillas invertidas y huecos `${…}`)",
          prueba: (doc) => {
            const codigo = PRUEBA.codigo(doc);
            return /`[^`]*\$\{[^}]+\}[^`]*`/.test(codigo);
          }
        },
        {
          texto: "La consola muestra la edad de perro y, después, la edad humana (7 veces más)",
          prueba: (doc, win) => (win.__logs || []).some(l => {
            const n = (String(l).match(/\d+(\.\d+)?/g) || []).map(Number);
            return n.some((a, i) => a > 0 && n.slice(i + 1).some(b => Math.abs(b - a * 7) < 0.001));
          })
        }
      ],
      pistas: [
        "Usa const para el nombre (un texto entre comillas) y para la edad (un número sin comillas). La edad humana es la edad multiplicada por 7: edad * 7. Al final, un console.log con una plantilla.",
        "Por ejemplo:\nconst nombre = \"Rex\";\nconst edad = 5;\nconst edadHumana = edad * 7;\nY en el console.log, entre comillas invertidas: ${nombre} tiene ${edad} años, que son ${edadHumana} años humanos"
      ],
      solucion: {
        js: `// 1. El nombre de tu perro
const nombre = "Rex";

// 2. Su edad en años de perro
const edad = 5;

// 3. Su edad en años humanos (multiplica por 7)
const edadHumana = edad * 7;

// 4. Muestra la frase con una plantilla de texto
console.log(\`\${nombre} tiene \${edad} años, que son \${edadHumana} años humanos\`);
`
      }
    }
  ]
});
