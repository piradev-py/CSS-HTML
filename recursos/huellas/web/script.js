// =========================================================
// Huellas · Clínica veterinaria — script.js
// =========================================================

// ---------- 1. Menú del móvil ----------
const botonMenu = document.querySelector(".boton-menu");
const menu = document.querySelector("nav");

botonMenu.addEventListener("click", () => {
  menu.classList.toggle("abierto");
  // aria-expanded le dice al lector de pantalla si el menú está abierto
  if (menu.classList.contains("abierto")) {
    botonMenu.setAttribute("aria-expanded", "true");
  } else {
    botonMenu.setAttribute("aria-expanded", "false");
  }
});

// ---------- 2. Enlace activo ----------
const enlaces = document.querySelectorAll("nav a");

enlaces.forEach((enlace) => {
  enlace.addEventListener("click", () => {
    enlaces.forEach((otro) => otro.classList.remove("activo"));
    enlace.classList.add("activo");
    // En el móvil, al elegir una sección el menú se cierra
    menu.classList.remove("abierto");
    botonMenu.setAttribute("aria-expanded", "false");
  });
});

// ---------- 3. Año del pie ----------
document.querySelector("#anio").textContent = new Date().getFullYear();

// ---------- 4. Servicios desde datos ----------
const servicios = [
  { nombre: "Medicina general", descripcion: "Revisiones, diagnóstico y consejos para prevenir antes que curar.", icono: "fonendo", foto: "servicio-medicina.jpg", mascotas: ["perro", "gato", "exotico"] },
  { nombre: "Vacunación", descripcion: "El calendario de vacunas y desparasitación adaptado a su edad.", icono: "jeringa", foto: "servicio-vacunacion.jpg", mascotas: ["perro", "gato", "exotico"] },
  { nombre: "Cirugía", descripcion: "Quirófano propio y anestesia vigilada en todo momento.", icono: "bisturi", foto: "servicio-cirugia.jpg", mascotas: ["perro", "gato"] },
  { nombre: "Salud dental", descripcion: "Limpiezas y revisiones para una boca sana y sin dolor.", icono: "diente", foto: "servicio-dental.jpg", mascotas: ["perro", "gato"] },
  { nombre: "Dermatología", descripcion: "Alergias, picores y cuidado de la piel y el pelo.", icono: "huella", foto: "servicio-dermatologia.jpg", mascotas: ["perro", "gato", "exotico"] },
  { nombre: "Diagnóstico", descripcion: "Análisis, ecografía y rayos X en la propia clínica.", icono: "corazon", foto: "servicio-diagnostico.jpg", mascotas: ["perro", "gato", "exotico"] }
];

const listaServicios = document.querySelector("#lista-servicios");

function pintarServicios(lista) {
  listaServicios.textContent = "";
  for (const servicio of lista) {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("servicio");
    tarjeta.innerHTML = `
      <img src="img/${servicio.foto}" alt="" width="320" height="213" loading="lazy">
      <img src="img/iconos/${servicio.icono}.svg" class="icono" alt="" width="52" height="52">
      <h3>${servicio.nombre}</h3>
      <p>${servicio.descripcion}</p>
      <a href="#cita">Pide cita</a>`;
    listaServicios.append(tarjeta);
  }
}

pintarServicios(servicios);

// ---------- 5. Filtrar los servicios por mascota ----------
function filtrar(mascota) {
  const elegidos = servicios.filter((servicio) => servicio.mascotas.includes(mascota));
  pintarServicios(elegidos);
}

const botonTodos = document.querySelector("#filtro-todos");
const botonPerros = document.querySelector("#filtro-perros");
const botonGatos = document.querySelector("#filtro-gatos");
const botonExoticos = document.querySelector("#filtro-exoticos");
const botonesFiltro = document.querySelectorAll(".filtros button");

// aria-pressed le dice al lector de pantalla qué filtro está pulsado (el color solo se ve)
function marcarFiltro(boton) {
  botonesFiltro.forEach((otro) => {
    otro.classList.remove("activo");
    otro.setAttribute("aria-pressed", "false");
  });
  boton.classList.add("activo");
  boton.setAttribute("aria-pressed", "true");
}

botonTodos.addEventListener("click", () => {
  marcarFiltro(botonTodos);
  pintarServicios(servicios);
});
botonPerros.addEventListener("click", () => {
  marcarFiltro(botonPerros);
  filtrar("perro");
});
botonGatos.addEventListener("click", () => {
  marcarFiltro(botonGatos);
  filtrar("gato");
});
botonExoticos.addEventListener("click", () => {
  marcarFiltro(botonExoticos);
  filtrar("exotico");
});

// ---------- 6. Pedir cita: comprobar el formulario ----------
const formulario = document.querySelector("#form-cita");
const campoMascota = document.querySelector("#mascota");
const campoFecha = document.querySelector("#fecha");
const campoHora = document.querySelector("#hora");
const campoNombre = document.querySelector("#nombre");
const campoTelefono = document.querySelector("#telefono");
const campoEmail = document.querySelector("#email");
const casillaPrivacidad = document.querySelector("#privacidad");
const confirmacion = document.querySelector("#confirmacion");

const nombresMascota = { perro: "Perro", gato: "Gato", conejo: "Conejo", exotico: "Otro exótico" };

// La fecha de hoy como texto "AAAA-MM-DD", para compararla con la del campo
function hoy() {
  return new Date().toLocaleDateString("sv-SE");
}

// Escribe (o borra) el mensaje junto al campo y dice si el campo está bien
function comprobar(campo, estaBien, mensaje) {
  const error = document.querySelector("#error-" + campo.name);
  if (estaBien) {
    error.textContent = "";
    campo.classList.remove("con-error");
  } else {
    error.textContent = mensaje;
    campo.classList.add("con-error");
  }
  return estaBien;
}

function resumen(cita) {
  return `${cita.mascota} · ${cita.fecha} a las ${cita.hora} · a nombre de ${cita.nombre}`;
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const telefono = campoTelefono.value.trim();
  const email = campoEmail.value.trim();
  let todoBien = true;

  todoBien = comprobar(campoMascota, campoMascota.value !== "", "Elige qué mascota viene a la consulta.") && todoBien;
  todoBien = comprobar(campoFecha, campoFecha.value !== "" && campoFecha.value >= hoy(), "Elige un día a partir de hoy.") && todoBien;
  todoBien = comprobar(campoHora, campoHora.value >= "09:00" && campoHora.value <= "20:30", "Elige una hora dentro del horario de consulta.") && todoBien;
  todoBien = comprobar(campoNombre, campoNombre.value.trim() !== "", "Escribe tu nombre.") && todoBien;
  todoBien = comprobar(campoTelefono, telefono.length === 9 && !Number.isNaN(Number(telefono)), "El teléfono debe tener 9 cifras, sin espacios.") && todoBien;
  todoBien = comprobar(campoEmail, email.includes("@") && email.includes("."), "Escribe un email válido, por ejemplo nombre@correo.es.") && todoBien;
  todoBien = comprobar(casillaPrivacidad, casillaPrivacidad.checked, "Necesitamos que aceptes la política de privacidad.") && todoBien;

  if (!todoBien) {
    confirmacion.textContent = "";
    return;
  }

  const cita = {
    mascota: nombresMascota[campoMascota.value],
    fecha: campoFecha.value,
    hora: campoHora.value,
    nombre: campoNombre.value.trim()
  };
  citas.push(cita);
  guardarCitas();
  pintarCitas();
  confirmacion.textContent = "¡Cita reservada! " + resumen(cita);
});

// ---------- 7. Mis citas: guardadas en el navegador ----------
const listaCitas = document.querySelector("#lista-citas");
const sinCitas = document.querySelector("#sin-citas");

// Si no hay nada guardado, getItem da null y empezamos con una lista vacía
let citas = JSON.parse(localStorage.getItem("huellas-citas")) || [];

function guardarCitas() {
  localStorage.setItem("huellas-citas", JSON.stringify(citas));
}

function pintarCitas() {
  listaCitas.textContent = "";
  for (const cita of citas) {
    const elemento = document.createElement("li");
    elemento.textContent = resumen(cita) + " ";

    const botonCancelar = document.createElement("button");
    botonCancelar.type = "button";
    botonCancelar.textContent = "Cancelar";
    botonCancelar.addEventListener("click", () => {
      citas = citas.filter((otra) => otra !== cita);
      guardarCitas();
      pintarCitas();
      confirmacion.textContent = "Cita cancelada.";
    });

    elemento.append(botonCancelar);
    listaCitas.append(elemento);
  }

  if (citas.length === 0) {
    sinCitas.textContent = "Todavía no tienes citas. ¡Pide la primera!";
  } else {
    sinCitas.textContent = "";
  }
}

pintarCitas();

// ---------- 8. Opiniones desde un archivo de datos ----------
const listaOpiniones = document.querySelector("#lista-opiniones");

async function cargarOpiniones() {
  try {
    const respuesta = await fetch("datos/opiniones.json");
    const opiniones = await respuesta.json();
    listaOpiniones.textContent = "";
    for (const opinion of opiniones) {
      const tarjeta = document.createElement("article");
      tarjeta.classList.add("opinion");
      tarjeta.innerHTML = `
        <img src="img/${opinion.foto}" alt="${opinion.alt}" width="120" height="120" loading="lazy">
        <p>${opinion.texto}</p>
        <p><strong>${opinion.autor}</strong> · ${opinion.mascota} · ${opinion.estrellas}</p>`;
      listaOpiniones.append(tarjeta);
    }
  } catch (error) {
    // Si la web se abre desde el disco, el navegador no deja leer el archivo:
    // se quedan las opiniones que ya están escritas en el HTML.
  }
}

cargarOpiniones();
