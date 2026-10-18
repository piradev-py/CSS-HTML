/* ============================================================
   <CSS-HTML> · Progreso del jugador (guardado en localStorage)
   XP, niveles, estrellas, insignias, racha diaria y ajustes.
   Modo prueba: usa un progreso aparte en sessionStorage (dura
   mientras la pestaña esté abierta) y nunca toca el progreso real.
   ============================================================ */
(function () {
  const CLAVE = "csshtml-progreso-v1";
  const CLAVE_PRUEBA = "csshtml-prueba-v1";

  const NIVELES = [
    { min: 0, nombre: "Novato", emoji: "🐣" },
    { min: 150, nombre: "Aprendiz", emoji: "🌱" },
    { min: 450, nombre: "Maquetador", emoji: "🧱" },
    { min: 900, nombre: "Estilista", emoji: "🎨" },
    { min: 1500, nombre: "Artesano web", emoji: "🛠️" },
    { min: 2200, nombre: "Frontend Pro", emoji: "🚀" }
  ];

  const INSIGNIAS = [
    { id: "primer-paso", emoji: "👣", nombre: "Primer paso", desc: "Completa tu primera lección" },
    { id: "sin-pistas", emoji: "🎯", nombre: "¡Sin pistas!", desc: "Consigue 3 estrellas en una lección" },
    { id: "racha-3", emoji: "🔥", nombre: "En racha", desc: "Practica 3 días seguidos" },
    { id: "racha-7", emoji: "☄️", nombre: "Imparable", desc: "Practica 7 días seguidos" },
    { id: "estrellas-30", emoji: "🌟", nombre: "Coleccionista", desc: "Reúne 30 estrellas" },
    { id: "mundo-1", emoji: "🏗️", nombre: "Arquitecto HTML", desc: "Termina el Mundo HTML" },
    { id: "mundo-2", emoji: "🎨", nombre: "Artista CSS", desc: "Termina el Mundo CSS" },
    { id: "mundo-3", emoji: "🧩", nombre: "Maquetador", desc: "Termina el Mundo HTML + CSS" },
    { id: "mundo-4", emoji: "⚡", nombre: "Mago JavaScript", desc: "Termina el Mundo JavaScript" }
  ];

  function vacio() {
    return {
      xp: 0,
      completadas: {},          // id -> { estrellas, fecha }
      insignias: [],            // ids
      racha: { dias: 0, ultimo: null },
      ajustes: { sonido: true, tema: "auto", desbloquearTodo: false },
      borradores: {}            // id -> { html, css, js }
    };
  }

  // Modo prueba y «desbloquear todo» son para el equipo: solo en local (servidor local o file://, que usan los tests)
  const SOLO_LOCAL = location.protocol === "file:" || ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname);

  // Marca en memoria: aunque falle sessionStorage, en modo prueba NUNCA se escribe el progreso real
  let modoPrueba = SOLO_LOCAL && (() => {
    try { return sessionStorage.getItem(CLAVE_PRUEBA) !== null; } catch (e) { return false; }
  })();
  const enPrueba = () => modoPrueba;

  function cargar() {
    try {
      const crudo = enPrueba() ? sessionStorage.getItem(CLAVE_PRUEBA) : localStorage.getItem(CLAVE);
      if (!crudo) return vacio();
      const d = JSON.parse(crudo);
      const base = vacio();
      return Object.assign(base, d, {
        ajustes: Object.assign(base.ajustes, d.ajustes),
        racha: Object.assign(base.racha, d.racha)
      });
    } catch (e) {
      return vacio();
    }
  }

  let datos = cargar();

  function guardar() {
    try {
      if (enPrueba()) sessionStorage.setItem(CLAVE_PRUEBA, JSON.stringify(datos));
      else localStorage.setItem(CLAVE, JSON.stringify(datos));
    } catch (e) { /* sin almacenamiento: seguimos en memoria */ }
  }

  /** Progreso nuevo para el modo prueba: todo desbloqueado, mismos tema y sonido que el real. */
  function datosPrueba() {
    const d = vacio();
    d.ajustes = Object.assign({}, datos.ajustes, { desbloquearTodo: true });
    return d;
  }

  function hoy(desplazamiento = 0) {
    const d = new Date();
    d.setDate(d.getDate() + desplazamiento);
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + dia;
  }

  function nivel() {
    const xp = datos.xp;
    let i = 0;
    while (i < NIVELES.length - 1 && xp >= NIVELES[i + 1].min) i++;
    const actual = NIVELES[i];
    const sig = NIVELES[i + 1] || null;
    const porcentaje = sig ? Math.round(((xp - actual.min) / (sig.min - actual.min)) * 100) : 100;
    return Object.assign({ numero: i + 1, xp, siguiente: sig, porcentaje }, actual);
  }

  function racha() {
    const r = datos.racha;
    const viva = r.ultimo === hoy() || r.ultimo === hoy(-1);
    return { dias: viva ? r.dias : 0, activaHoy: r.ultimo === hoy() };
  }

  function registrarActividad() {
    const r = datos.racha;
    if (r.ultimo === hoy()) return;
    r.dias = r.ultimo === hoy(-1) ? r.dias + 1 : 1;
    r.ultimo = hoy();
  }

  function totalEstrellas() {
    return Object.values(datos.completadas).reduce((s, c) => s + (c.estrellas || 0), 0);
  }

  function mundoCompleto(mundo) {
    return mundo.lecciones.every(l => datos.completadas[l.id]);
  }

  function revisarInsignias() {
    const nuevas = [];
    const dar = id => {
      if (!datos.insignias.includes(id)) {
        datos.insignias.push(id);
        nuevas.push(INSIGNIAS.find(i => i.id === id));
      }
    };
    const completadas = Object.values(datos.completadas);
    if (completadas.length >= 1) dar("primer-paso");
    if (completadas.some(c => c.estrellas === 3)) dar("sin-pistas");
    if (datos.racha.dias >= 3) dar("racha-3");
    if (datos.racha.dias >= 7) dar("racha-7");
    if (totalEstrellas() >= 30) dar("estrellas-30");
    if (window.CURSO) {
      CURSO.MUNDOS.forEach(m => { if (mundoCompleto(m)) dar("mundo-" + m.numero); });
    }
    return nuevas;
  }

  window.PROGRESO = {
    NIVELES,
    INSIGNIAS,
    get datos() { return datos; },
    xp: () => datos.xp,
    nivel,
    racha,
    totalEstrellas,
    mundoCompleto,
    estaCompletada: id => !!datos.completadas[id],
    estrellas: id => (datos.completadas[id] ? datos.completadas[id].estrellas : 0),
    tieneInsignia: id => datos.insignias.includes(id),

    /** Una lección está abierta si es la primera, si ya está completada, si la anterior lo está o si se desbloqueó todo. */
    estaDesbloqueada(id) {
      if (SOLO_LOCAL && datos.ajustes.desbloquearTodo) return true;
      // Una lección nueva metida delante no vuelve a cerrar las que el alumno ya hizo
      if (datos.completadas[id]) return true;
      const anterior = CURSO.anterior(id);
      return !anterior || !!datos.completadas[anterior.id];
    },

    /** La primera lección lista y desbloqueada que aún no está completada. */
    siguientePendiente() {
      return CURSO.listaPlana().find(l => l.listo && !datos.completadas[l.id] && this.estaDesbloqueada(l.id)) || null;
    },

    /**
     * Marca una lección como superada.
     * Devuelve { xpGanada, estrellas, mejora, nuevasInsignias, subioNivel }.
     */
    completar(id, estrellas, xpBase) {
      const nivelAntes = nivel().numero;
      const previo = datos.completadas[id];
      const estrellasPrevias = previo ? previo.estrellas : 0;
      let xpGanada = 0;
      if (!previo) {
        xpGanada = (xpBase || 20) + estrellas * 10;
        datos.completadas[id] = { estrellas, fecha: hoy() };
      } else if (estrellas > previo.estrellas) {
        xpGanada = (estrellas - previo.estrellas) * 10;
        previo.estrellas = estrellas;
      }
      datos.xp += xpGanada;
      registrarActividad();
      const nuevasInsignias = revisarInsignias();
      guardar();
      return {
        xpGanada,
        estrellas,
        mejora: estrellas > estrellasPrevias,
        nuevasInsignias,
        subioNivel: nivel().numero > nivelAntes ? nivel() : null
      };
    },

    ajuste: clave => datos.ajustes[clave],
    cambiarAjuste(clave, valor) { datos.ajustes[clave] = valor; guardar(); },

    borrador: id => datos.borradores[id] || null,
    guardarBorrador(id, codigo) { datos.borradores[id] = codigo; guardar(); },
    borrarBorrador(id) { delete datos.borradores[id]; guardar(); },

    /** Empieza el curso de cero (en modo prueba, reinicia solo la prueba). */
    reiniciar() {
      if (enPrueba()) { datos = datosPrueba(); guardar(); return; }
      const ajustes = datos.ajustes;
      datos = vacio();
      datos.ajustes = Object.assign(ajustes, { desbloquearTodo: false });
      guardar();
    },

    enPrueba,
    pruebaDisponible: () => SOLO_LOCAL,
    entrarPrueba() {
      if (!SOLO_LOCAL || modoPrueba) return;
      datos = datosPrueba();
      modoPrueba = true;
      guardar();
    },
    salirPrueba() {
      try { sessionStorage.removeItem(CLAVE_PRUEBA); } catch (e) { /* nada que borrar */ }
      modoPrueba = false;
      datos = cargar();
    }
  };
})();
