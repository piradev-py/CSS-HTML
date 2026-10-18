/* ============================================================
   <CSS-HTML> · Un .zip sin librerías (página «Mi clínica»)
   ZIP.crear([{ nombre: "huellas/index.html", datos: "texto" | Uint8Array }])
   → Uint8Array con el .zip. Los archivos van sin comprimir (método
   «store»): todo programa de .zip los abre, y así no hace falta
   ninguna librería. Nombres en UTF-8 (bit 11).
   shortcut: sin compresión, la web de Huellas ocupa ~700 KB; si algún
   día pesa mucho más, usar CompressionStream("deflate-raw").
   ============================================================ */
(function () {
  const TABLA = new Uint32Array(256).map((_, n) => {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    return c >>> 0;
  });

  function crc32(bytes) {
    let c = 0xffffffff;
    for (const b of bytes) c = TABLA[(c ^ b) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  }

  // Fecha y hora en el formato de MS-DOS que usa el .zip
  function fechaDOS(d) {
    return {
      hora: (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1),
      dia: ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate()
    };
  }

  function crear(archivos, ahora = new Date()) {
    const utf8 = new TextEncoder();
    const { hora, dia } = fechaDOS(ahora);
    const partes = [];
    const central = [];
    let desplazamiento = 0;
    for (const a of archivos) {
      const nombre = utf8.encode(a.nombre);
      const datos = typeof a.datos === "string" ? utf8.encode(a.datos) : a.datos;
      const crc = crc32(datos);
      const local = new DataView(new ArrayBuffer(30));
      local.setUint32(0, 0x04034b50, true);
      local.setUint16(4, 20, true);
      local.setUint16(6, 0x0800, true);
      local.setUint16(8, 0, true);
      local.setUint16(10, hora, true);
      local.setUint16(12, dia, true);
      local.setUint32(14, crc, true);
      local.setUint32(18, datos.length, true);
      local.setUint32(22, datos.length, true);
      local.setUint16(26, nombre.length, true);
      local.setUint16(28, 0, true);
      partes.push(new Uint8Array(local.buffer), nombre, datos);

      const c = new DataView(new ArrayBuffer(46));
      c.setUint32(0, 0x02014b50, true);
      c.setUint16(4, 20, true);
      c.setUint16(6, 20, true);
      c.setUint16(8, 0x0800, true);
      c.setUint16(10, 0, true);
      c.setUint16(12, hora, true);
      c.setUint16(14, dia, true);
      c.setUint32(16, crc, true);
      c.setUint32(20, datos.length, true);
      c.setUint32(24, datos.length, true);
      c.setUint16(28, nombre.length, true);
      c.setUint32(42, desplazamiento, true);
      central.push(new Uint8Array(c.buffer), nombre);
      desplazamiento += 30 + nombre.length + datos.length;
    }
    const tamCentral = central.reduce((s, p) => s + p.length, 0);
    const fin = new DataView(new ArrayBuffer(22));
    fin.setUint32(0, 0x06054b50, true);
    fin.setUint16(8, archivos.length, true);
    fin.setUint16(10, archivos.length, true);
    fin.setUint32(12, tamCentral, true);
    fin.setUint32(16, desplazamiento, true);

    const todo = partes.concat(central, [new Uint8Array(fin.buffer)]);
    const salida = new Uint8Array(todo.reduce((s, p) => s + p.length, 0));
    let i = 0;
    for (const p of todo) { salida.set(p, i); i += p.length; }
    return salida;
  }

  // Comprobación rápida: el CRC-32 de «123456789» es CBF43926 (el valor de referencia del estándar)
  console.assert(crc32(new TextEncoder().encode("123456789")) === 0xcbf43926, "ZIP: el CRC-32 no cuadra");

  window.ZIP = { crear, crc32 };
})();
