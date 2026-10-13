/* ============================================================
   <CSS-HTML> · Celebraciones: toasts, confeti, sonidos y modales
   ============================================================ */
(function () {
  /* ---------- Sonidos con WebAudio (sin archivos) ---------- */
  let audio = null;

  function tono(frecuencias, duracion = 0.12, tipo = "sine", volumen = 0.15) {
    if (!window.PROGRESO || !PROGRESO.ajuste("sonido")) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      const t0 = audio.currentTime;
      frecuencias.forEach((f, i) => {
        const osc = audio.createOscillator();
        const gan = audio.createGain();
        osc.type = tipo;
        osc.frequency.value = f;
        const ini = t0 + i * duracion;
        gan.gain.setValueAtTime(0, ini);
        gan.gain.linearRampToValueAtTime(volumen, ini + 0.01);
        gan.gain.exponentialRampToValueAtTime(0.001, ini + duracion * 1.8);
        osc.connect(gan).connect(audio.destination);
        osc.start(ini);
        osc.stop(ini + duracion * 2);
      });
    } catch (e) { /* sin audio, no pasa nada */ }
  }

  const SONIDOS = {
    acierto: () => tono([660, 880], 0.09, "triangle"),
    error: () => tono([300, 220], 0.12, "sawtooth", 0.06),
    victoria: () => tono([523, 659, 784, 1047], 0.11, "triangle", 0.18),
    nivel: () => tono([392, 523, 659, 784, 1047, 1319], 0.09, "square", 0.08),
    click: () => tono([520], 0.04, "sine", 0.06)
  };

  /* ---------- Toasts ---------- */
  function contenedorToasts() {
    let c = document.querySelector(".toasts");
    if (!c) {
      c = document.createElement("div");
      c.className = "toasts";
      c.setAttribute("aria-live", "polite");
      document.body.appendChild(c);
    }
    return c;
  }

  function toast(texto, clase = "") {
    const t = document.createElement("div");
    t.className = "toast " + clase;
    t.textContent = texto;
    contenedorToasts().appendChild(t);
    setTimeout(() => {
      t.classList.add("saliendo");
      setTimeout(() => t.remove(), 300);
    }, 2600);
  }

  /* ---------- Confeti en canvas ---------- */
  function confeti(cantidad = 140) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = document.createElement("canvas");
    canvas.className = "confeti";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const ancho = (canvas.width = window.innerWidth);
    const alto = (canvas.height = window.innerHeight);
    const colores = ["#f26b38", "#3b82f6", "#8b5cf6", "#f2b100", "#22b35e", "#ff5fa2"];
    const piezas = Array.from({ length: cantidad }, () => ({
      x: ancho / 2 + (Math.random() - 0.5) * 120,
      y: alto * 0.45,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 16 - 6,
      giro: Math.random() * Math.PI,
      vgiro: (Math.random() - 0.5) * 0.3,
      tam: 6 + Math.random() * 7,
      color: colores[Math.floor(Math.random() * colores.length)]
    }));
    let cuadros = 0;
    (function animar() {
      ctx.clearRect(0, 0, ancho, alto);
      piezas.forEach(p => {
        p.vy += 0.38;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.giro += p.vgiro;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.giro);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.tam / 2, -p.tam / 4, p.tam, p.tam / 2);
        ctx.restore();
      });
      if (++cuadros < 180) requestAnimationFrame(animar);
      else canvas.remove();
    })();
  }

  /* ---------- Modal genérico ---------- */
  function modal(htmlInterior, { alCerrar } = {}) {
    const fondo = document.createElement("div");
    fondo.className = "modal-fondo";
    fondo.innerHTML = '<div class="modal" role="dialog" aria-modal="true">' + htmlInterior + "</div>";
    document.body.appendChild(fondo);
    const cerrar = () => {
      fondo.remove();
      document.removeEventListener("keydown", tecla);
      if (alCerrar) alCerrar();
    };
    const tecla = e => { if (e.key === "Escape") cerrar(); };
    document.addEventListener("keydown", tecla);
    fondo.addEventListener("click", e => { if (e.target === fondo) cerrar(); });
    fondo.querySelectorAll("[data-cerrar]").forEach(b => b.addEventListener("click", cerrar));
    const primero = fondo.querySelector("button, a, input");
    if (primero) primero.focus();
    return { elemento: fondo, cerrar };
  }

  window.CELEBRAR = { sonido: SONIDOS, toast, confeti, modal };
})();
