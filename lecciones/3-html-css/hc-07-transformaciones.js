/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-07
   Transformaciones — transform con translate() (y translateX/Y),
   rotate(), scale(), varias funciones a la vez, transform-origin y
   las propiedades sueltas rotate / scale / translate (que usan los
   controles, porque cada deslizador necesita su propia propiedad).
   Notas:
   - transform calculado sale como matrix(a, b, c, d, e, f) o "none".
     El reto saca el ángulo con atan2(b, a) y la escala con
     √(a² + b²), y suma lo que pongan las propiedades sueltas
     rotate / scale por si el alumno las usa.
   - El :hover del reto se mira en una copia con PRUEBA.clonar.
   - Sin transiciones todavía: el cambio con :hover es instantáneo
     (se suaviza en hc-08).
   ============================================================ */
CURSO.registrar({
  id: "hc-07",
  titulo: "Transformaciones",
  xp: 40,
  objetivo: "Sabrás mover, girar y escalar elementos con transform sin descolocar el resto de la página.",
  glosario: [
    { termino: "transform: translate()", tema: "Transformaciones", para: "Mueve el elemento sin empujar a los demás.", ejemplo: ".servicio:hover {\n  transform: translateY(-4px);\n}", buscar: "mover desplazar subir" },
    { termino: "rotate() y scale()", tema: "Transformaciones", para: "Gira (en `deg`) o agranda y encoge (1 es su tamaño).", ejemplo: ".carta:hover {\n  transform: rotate(5deg) scale(1.1);\n}", buscar: "girar rotar escalar agrandar" },
    { termino: "transform-origin", tema: "Transformaciones", para: "El punto sobre el que gira o crece.", ejemplo: ".carta {\n  transform-origin: bottom center;\n}", buscar: "punto de giro origen" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Mover sin empujar: translate()",
      texto: "Si mueves una caja con `margin`, a veces empujas a las vecinas. La propiedad `transform` (transformar) cambia cómo **se ve** un elemento sin cambiar su sitio en la página: las demás cajas ni se enteran. Es como un holograma 👻: la caja sigue en su hueco, pero la ves en otro lado.\n\nLa primera función es `translate(x, y)` (trasladar): `transform: translate(30px, 10px)` la lleva 30 px a la derecha y 10 px hacia abajo. Con números negativos, a la izquierda y hacia arriba.\n\nPara un solo eje: `translateX(30px)` o `translateY(-10px)`. ¡Ojo! En la web, la Y negativa va **hacia arriba**.",
      ejemplo: {
        html: `<div class="fila">
  <div class="caja">1</div>
  <div class="caja movida">2</div>
  <div class="caja">3</div>
</div>`,
        css: `.fila {
  display: flex;
  gap: 10px;
}
.caja {
  width: 60px;
  padding: 16px 0;
  background-color: tomato;
  color: white;
  text-align: center;
}
.movida {
  transform: translate(20px, 30px);
  background-color: royalblue;
}`
      },
      consejo: "`transform` no funciona en elementos **en línea** como `<span>` o `<a>`. Si no ves ningún efecto, ponles `display: inline-block`."
    },
    {
      tipo: "explicacion",
      titulo: "Girar y escalar: rotate() y scale()",
      texto: "• `rotate(15deg)` **gira** el elemento. `deg` son grados: `360deg` es una vuelta entera. En positivo gira como las agujas del reloj 🕐; en negativo, al revés.\n• `scale(1.5)` lo **agranda o encoge**, sin unidad: `1` es su tamaño normal, `2` el doble y `0.5` la mitad.\n\n¿Quieres varias a la vez? Escríbelas **en el mismo** `transform`, separadas por espacios: `transform: rotate(-10deg) scale(1.2);`. Si escribes dos `transform` en la misma regla, el segundo pisa al primero (¡la cascada otra vez!).",
      ejemplo: {
        html: `<div class="fila">
  <div class="caja girada">🐱</div>
  <div class="caja grande">🐶</div>
  <div class="caja las-dos">🐰</div>
</div>`,
        css: `.fila {
  display: flex;
  gap: 30px;
  padding: 20px;
}
.caja {
  width: 60px;
  height: 60px;
  font-size: 36px;
  text-align: center;
  background-color: lightyellow;
  border: 2px solid orange;
  border-radius: 8px;
}
.girada {
  transform: rotate(20deg);
}
.grande {
  transform: scale(1.3);
}
.las-dos {
  transform: rotate(-15deg) scale(0.8);
}`
      },
      consejo: "Truco moderno: también existen las propiedades **sueltas** `translate`, `rotate` y `scale` (por ejemplo `rotate: 20deg;` o `scale: 1.3;`). Hacen lo mismo y no se pisan entre ellas. Las usarás enseguida en los controles."
    },
    {
      tipo: "ejercicio",
      enunciado: "Ponle al examen de Tagui un sello de **¡APROBADO!** torcido y un poco más grande, como los de verdad 📝.\n\n• Al selector `.sello` ponle `transform` con el valor `rotate(-15deg) scale(1.2)`.\n\nEl HTML ya está escrito: tú solo escribes el CSS.",
      cssBase: `body { font-family: sans-serif; }
.examen { background-color: white; border: 1px solid #ccc; border-radius: 8px; padding: 16px 24px 30px; max-width: 320px; }
.sello { display: inline-block; margin: 10px 0 0 20px; padding: 6px 14px; border: 4px solid crimson; border-radius: 8px; color: crimson; font-size: 22px; font-weight: bold; }`,
      inicial: {
        html: `<div class="examen">
  <h2>Examen de Tagui</h2>
  <p>Nota: 10</p>
  <p class="sello">¡APROBADO!</p>
</div>
`,
        css: ""
      },
      solucion: {
        html: `<div class="examen">
  <h2>Examen de Tagui</h2>
  <p>Nota: 10</p>
  <p class="sello">¡APROBADO!</p>
</div>
`,
        css: `.sello {
  transform: rotate(-15deg) scale(1.2);
}
`
      },
      pistas: [
        "Una sola regla para .sello con una sola propiedad, transform. Dentro van las dos funciones, una detrás de otra y separadas por un espacio.",
        "Debe quedarte así:\n.sello {\n  transform: rotate(-15deg) scale(1.2);\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "El punto de giro: transform-origin",
      texto: "Un elemento gira y crece desde su **centro**. Pero puedes cambiar ese punto con `transform-origin` (origen de la transformación), como cuando clavas una nota con una chincheta 📌: gira alrededor de la chincheta.\n\nSus valores son posiciones: `top` (arriba), `bottom` (abajo), `left` (izquierda), `right` (derecha) y `center`, combinadas: `transform-origin: bottom left` es la esquina de abajo a la izquierda.\n\nEn el ejemplo, las dos cartas giran lo mismo, pero la azul gira desde abajo, como una puerta abatible.",
      ejemplo: {
        html: `<div class="mesa">
  <div class="carta">🃏</div>
  <div class="carta desde-abajo">🃏</div>
</div>`,
        css: `.mesa {
  display: flex;
  gap: 60px;
  padding: 30px 40px;
}
.carta {
  width: 70px;
  height: 100px;
  font-size: 40px;
  text-align: center;
  line-height: 100px;
  background-color: white;
  border: 2px solid #333;
  border-radius: 8px;
  transform: rotate(25deg);
}
.desde-abajo {
  transform-origin: bottom left;
  background-color: lightblue;
}`
      },
      consejo: "¿Te acuerdas de `:hover`? Con `.carta:hover { transform: scale(1.1); }` la carta crece al pasar el ratón. De momento cambia de golpe; en la próxima lección aprenderás a suavizarlo."
    },
    {
      tipo: "controles",
      instruccion: "Aquí usamos las propiedades sueltas `rotate`, `scale` y `translate`, una por deslizador. Gira, agranda y mueve la carta, y cambia el punto de giro con `transform-origin` para ver la diferencia.",
      html: `<div class="mesa">
  <div class="carta">🃏</div>
</div>`,
      cssBase: `body { font-family: sans-serif; }
.mesa { display: flex; justify-content: center; padding: 70px 0; }
.carta { width: 80px; height: 115px; font-size: 48px; text-align: center; line-height: 115px; background-color: white; border: 2px solid #333; border-radius: 10px; box-shadow: 0 2px 6px rgb(0 0 0 / 0.3); }`,
      controles: [
        { selector: ".carta", propiedad: "rotate", tipo: "rango", min: -180, max: 180, valor: 0, unidad: "deg" },
        { selector: ".carta", propiedad: "scale", tipo: "rango", min: 0.5, max: 2, paso: 0.1, valor: 1 },
        { selector: ".carta", propiedad: "translate", tipo: "rango", min: -80, max: 80, valor: 0, unidad: "px" },
        { selector: ".carta", propiedad: "transform-origin", tipo: "opciones", opciones: ["center", "top left", "bottom center", "bottom right"], valor: "center" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Mueves una caja con transform: translate(50px, 0). ¿Qué les pasa a las cajas que tiene al lado?",
      opciones: [
        "Nada: se quedan en su sitio, como si la caja no se hubiera movido",
        "Se apartan 50 px para dejarle sitio",
        "Se mueven 50 px con ella"
      ],
      correcta: 0,
      explicacion: "transform solo cambia cómo se ve el elemento. Su hueco en la página sigue en el mismo sitio, así que las vecinas no se enteran (a diferencia de margin, que sí las empuja)."
    },
    {
      tipo: "reto",
      enunciado: "Abre tu mano de cartas en **abanico** 🃏 y haz que la carta del centro destaque:\n\n1. Haz que todas las `.carta` giren **desde abajo, en el centro** (`transform-origin`).\n2. Gira la carta `.izquierda` **15 grados hacia la izquierda**.\n3. Gira la carta `.derecha` **15 grados hacia la derecha**.\n4. Haz que la carta `.centro` **crezca** al pasar el ratón por encima (por ejemplo, a `1.2`).",
      cssBase: `body { font-family: sans-serif; }
h2 { text-align: center; }
.baraja { display: flex; justify-content: center; padding: 30px 0 50px; }
.carta { width: 90px; height: 130px; margin: 0 -6px; display: flex; align-items: center; justify-content: center; background-color: white; border: 2px solid #333; border-radius: 10px; font-size: 30px; font-weight: bold; box-shadow: 0 2px 6px rgb(0 0 0 / 0.3); }
.izquierda, .derecha { color: crimson; }
.centro { position: relative; z-index: 1; }`,
      inicial: {
        html: `<h2>Mi mano de cartas</h2>
<div class="baraja">
  <div class="carta izquierda">A♥</div>
  <div class="carta centro">K♠</div>
  <div class="carta derecha">Q♦</div>
</div>
`,
        css: `/* 1. Todas giran desde abajo, en el centro */
.carta {

}

/* 2. 15 grados hacia la izquierda */
.izquierda {

}

/* 3. 15 grados hacia la derecha */
.derecha {

}

/* 4. Crece al pasar el ratón */
.centro:hover {

}
`
      },
      comprobaciones: [
        {
          texto: "La carta `.izquierda` está girada hacia la izquierda (grados en negativo)",
          prueba: (doc, win) => {
            const el = doc.querySelector(".izquierda");
            if (!el) return false;
            const cs = win.getComputedStyle(el);
            let grados = 0;
            const m = (cs.transform || "none").match(/\(([^)]*)\)/);
            if (m) {
              const n = m[1].split(",").map(parseFloat);
              grados += Math.atan2(n[1] || 0, n[0] || 0) * 180 / Math.PI;
            }
            const r = (cs.rotate || "").match(/(-?[\d.]+)deg/);
            if (r) grados += parseFloat(r[1]);
            return grados < -1;
          }
        },
        {
          texto: "La carta `.derecha` está girada hacia la derecha (grados en positivo)",
          prueba: (doc, win) => {
            const el = doc.querySelector(".derecha");
            if (!el) return false;
            const cs = win.getComputedStyle(el);
            let grados = 0;
            const m = (cs.transform || "none").match(/\(([^)]*)\)/);
            if (m) {
              const n = m[1].split(",").map(parseFloat);
              grados += Math.atan2(n[1] || 0, n[0] || 0) * 180 / Math.PI;
            }
            const r = (cs.rotate || "").match(/(-?[\d.]+)deg/);
            if (r) grados += parseFloat(r[1]);
            return grados > 1;
          }
        },
        {
          texto: "Las cartas giran desde abajo (`transform-origin` en la parte de abajo)",
          prueba: (doc, win) => {
            const cartas = [...doc.querySelectorAll(".izquierda, .derecha")];
            if (cartas.length < 2) return false;
            return cartas.every(el => {
              const y = parseFloat((win.getComputedStyle(el).transformOrigin || "").split(" ")[1]);
              return !isNaN(y) && y >= el.offsetHeight - 1;
            });
          }
        },
        {
          texto: "Al pasar el ratón, la carta `.centro` crece (y sin el ratón tiene su tamaño normal)",
          prueba: async (doc, win) => {
            const escala = (w, el) => {
              const cs = w.getComputedStyle(el);
              let e = 1;
              const m = (cs.transform || "none").match(/\(([^)]*)\)/);
              if (m) {
                const n = m[1].split(",").map(parseFloat);
                e *= Math.hypot(n[0] || 0, n[1] || 0);
              }
              const s = parseFloat(cs.scale);
              if (!isNaN(s)) e *= s;
              return e;
            };
            const normal = doc.querySelector(".centro");
            if (!normal) return false;
            const v = await PRUEBA.clonar(doc, { estado: "hover" });
            const encima = v.doc.querySelector(".centro");
            if (!encima) return false;
            return escala(win, normal) <= 1.01 && escala(v.win, encima) > 1.05;
          }
        }
      ],
      pistas: [
        "En .carta usa transform-origin con dos palabras (abajo y centro). En .izquierda y .derecha, transform con rotate y los grados (negativos hacia la izquierda). En .centro:hover, transform con scale.",
        "Debe quedarte así:\n.carta { transform-origin: bottom center; }\n.izquierda { transform: rotate(-15deg); }\n.derecha { transform: rotate(15deg); }\n.centro:hover { transform: scale(1.2); }"
      ],
      solucion: {
        html: `<h2>Mi mano de cartas</h2>
<div class="baraja">
  <div class="carta izquierda">A♥</div>
  <div class="carta centro">K♠</div>
  <div class="carta derecha">Q♦</div>
</div>
`,
        css: `/* 1. Todas giran desde abajo, en el centro */
.carta {
  transform-origin: bottom center;
}

/* 2. 15 grados hacia la izquierda */
.izquierda {
  transform: rotate(-15deg);
}

/* 3. 15 grados hacia la derecha */
.derecha {
  transform: rotate(15deg);
}

/* 4. Crece al pasar el ratón */
.centro:hover {
  transform: scale(1.2);
}
`
      }
    }
  ]
});
