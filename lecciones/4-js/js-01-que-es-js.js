/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-01 (primera del mundo)
   ¿Qué es JavaScript? — JavaScript como «el cerebro de la web»,
   instrucción, console.log(), la consola, textos entre comillas
   y comentarios //.
   Notas:
   - Lección solo de consola: pestanas: ["js"] (el resultado es una
     consola grande).
   - Los ejercicios comparan las líneas de la consola: el enunciado
     da el texto exacto de cada console.log en negrita.
   - El segundo ejercicio trae código escrito: el alumno «apaga» una
     línea con //. El inicial muestra 4 líneas y la solución 3.
   - El reto mira win.__logs (líneas ya formateadas) y
     win.__errores.
   ============================================================ */
CURSO.registrar({
  id: "js-01",
  titulo: "¿Qué es JavaScript?",
  xp: 25,
  objetivo: "Sabrás qué hace JavaScript en una web y escribirás tus primeras instrucciones con console.log.",
  pestanas: ["js"],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "El cerebro de la web",
      texto: "Ya sabes construir páginas: el **HTML** es el esqueleto y el **CSS**, la ropa y el maquillaje. Pero tu página todavía no **piensa**: no responde si pulsas un botón, no cuenta puntos, no recuerda tu nombre…\n\nPara eso está **JavaScript** (JS, para los amigos): el **cerebro** de la web. 🧠\n\nCon JavaScript le das **instrucciones** al navegador. Una instrucción es una orden, como un paso de una receta. El navegador las lee **de arriba abajo**, una a una. Cada instrucción suele terminar con un punto y coma `;`.\n\nEn el ejemplo hay tu primera instrucción. A la derecha ves lo que hace.",
      ejemplo: {
        js: `console.log("¡Hola, mundo!");`
      },
      consejo: "En este mundo escribirás en la pestaña **JS** ⚡. ¡Tranquilidad! Iremos paso a paso, como cuando empezaste con HTML."
    },
    {
      tipo: "explicacion",
      titulo: "La consola: tu libreta de notas",
      texto: "Lo que ves en el resultado es la **consola**: una libreta donde tu programa te escribe mensajes a ti, el programador. Las personas que visitan la web no la ven.\n\n`console.log(…)` significa «escribe esto en la consola». Fíjate en sus piezas:\n\n• `console`: la consola.\n• `.log`: «apunta».\n• Entre los paréntesis `( )`, lo que quieres que apunte.\n\nCada `console.log` escribe **una línea**, y salen en el mismo orden en que las escribes.",
      ejemplo: {
        js: `console.log("Hola, soy Tagui");
console.log("Tengo dos ojos y muchas ganas de programar");
console.log("¡Vamos a aprender JavaScript!");`
      },
      consejo: "Mayúsculas y minúsculas cuentan: `console.log` va todo en minúscula. Si escribes `Console.log`, JavaScript no sabe qué es."
    },
    {
      tipo: "ejercicio",
      enunciado: "Escribe tu primera instrucción: usa `console.log` para que en la consola salga **¡Hola, JavaScript!**",
      solucion: {
        js: `console.log("¡Hola, JavaScript!");
`
      },
      pistas: [
        "Escribe console.log, abre un paréntesis, pon el texto entre comillas y cierra el paréntesis. Termina con punto y coma.",
        "Debe quedarte así:\nconsole.log(\"¡Hola, JavaScript!\");"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Los textos van entre comillas",
      texto: "¿Te has fijado en que los textos van entre **comillas**? Así JavaScript sabe que es un texto y no una orden suya.\n\nPuedes usar comillas dobles `\"Hola\"` o simples `'Hola'`: las dos valen, pero abre y cierra con las mismas.\n\nSi olvidas las comillas, JavaScript cree que `Pizza` es el nombre de algo que ya existe, no lo encuentra… y se queja. Mira la última línea del ejemplo: tiene ese fallo **a propósito**. La consola te dice en qué línea está y qué pasa. ¡Los errores son pistas, no castigos! 🕵️",
      ejemplo: {
        js: `console.log("Con comillas dobles");
console.log('Con comillas simples');
console.log(Pizza);`
      },
      consejo: "Cuando veas un error, lee la línea que te indica la consola. Casi siempre es una comilla, un paréntesis o una mayúscula que se ha escapado."
    },
    {
      tipo: "explicacion",
      titulo: "Comentarios: notas para humanos",
      texto: "A veces quieres dejar una nota en tu código para acordarte de qué hace. Para eso están los **comentarios**: todo lo que va detrás de `//`, hasta el final de esa línea, JavaScript lo **ignora**.\n\nSirven para dos cosas:\n\n• Explicar tu código (a otras personas o a tu yo del futuro).\n• «Apagar» una instrucción sin borrarla: pon `//` delante y deja de ejecutarse.\n\nEn HTML los comentarios eran `<!-- -->` y en CSS, `/* */`. En JavaScript, `//`.",
      ejemplo: {
        js: `// Mi primer programa
console.log("Esta línea sí sale");
// console.log("Esta línea no sale");
console.log("Esta también sale"); // una nota al final`
      }
    },
    {
      tipo: "ejercicio",
      enunciado: "Tagui ha escrito los ingredientes de su pizza, pero a Tagui **no le gusta la piña** 🍍.\n\nConvierte la línea de la piña en un **comentario** poniendo `//` delante (sin borrarla), para que en la consola solo salgan: **Ingredientes de la pizza:**, **Tomate** y **Queso**.",
      inicial: {
        js: `console.log("Ingredientes de la pizza:");
console.log("Tomate");
console.log("Queso");
console.log("Piña");
`
      },
      solucion: {
        js: `console.log("Ingredientes de la pizza:");
console.log("Tomate");
console.log("Queso");
// console.log("Piña");
`
      },
      pistas: [
        "Busca la cuarta línea, la de la piña, y escribe dos barras // justo al principio.",
        "La última línea debe quedarte así:\n// console.log(\"Piña\");"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "¿Cuál de estas instrucciones escribe Hola en la consola?",
      opciones: [
        "console.log(\"Hola\");",
        "Console.log(\"Hola\");",
        "console.log(Hola);"
      ],
      correcta: 0,
      explicacion: "console.log va en minúsculas y el texto, entre comillas. Con Console en mayúscula JavaScript no encuentra la consola, y sin comillas cree que Hola es el nombre de algo que no existe."
    },
    {
      tipo: "reto",
      enunciado: "Preséntate en la consola 👋:\n\n1. Muestra un **saludo** que tenga la palabra **Hola** (por ejemplo, «¡Hola! Soy Ana y estoy aprendiendo JavaScript»).\n2. Debajo, muestra tu comida favorita con una frase que diga **comida favorita** (por ejemplo, «Mi comida favorita es la pizza»).\n3. Que no haya errores: todos los textos, entre comillas.\n\nLos comentarios del código te dicen dónde va cada cosa.",
      inicial: {
        js: `// 1. Muestra un saludo con la palabra «Hola»

// 2. Muestra tu comida favorita

`
      },
      comprobaciones: [
        {
          texto: "La consola muestra al menos dos mensajes",
          prueba: (doc, win) => (win.__logs || []).length >= 2
        },
        {
          texto: "Uno de los mensajes es un saludo con la palabra «Hola»",
          prueba: (doc, win) => (win.__logs || []).some(l => /hola/i.test(l))
        },
        {
          texto: "Otro mensaje habla de tu «comida favorita»",
          prueba: (doc, win) => (win.__logs || []).some(l => /comida favorita/i.test(l))
        },
        {
          texto: "Tu código no tiene errores (todos los textos van entre comillas)",
          prueba: (doc, win) => (win.__logs || []).length > 0 && !(win.__errores || []).length
        }
      ],
      pistas: [
        "Necesitas dos instrucciones console.log, una debajo de cada comentario. Cada texto va entre comillas dentro de los paréntesis.",
        "Por ejemplo:\nconsole.log(\"¡Hola! Soy Ana\");\nconsole.log(\"Mi comida favorita es la pizza\");"
      ],
      solucion: {
        js: `// 1. Muestra un saludo con la palabra «Hola»
console.log("¡Hola! Soy Ana y estoy aprendiendo JavaScript");

// 2. Muestra tu comida favorita
console.log("Mi comida favorita es la pizza 🍕");
`
      }
    }
  ]
});
