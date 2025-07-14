const ramos = [
  // Semestre 1
  { id: "anatomia", nombre: "Anatomía Humana", semestre: 1 },
  { id: "biologia_celular", nombre: "Biología Celular", semestre: 1 },
  { id: "lab_biologia_celular", nombre: "Laboratorio de Biología Celular", semestre: 1, requisitos: ["biologia_celular"] },
  { id: "quimica_celular", nombre: "Química Celular", semestre: 1 },
  { id: "quimica_general", nombre: "Química General", semestre: 1 },
  { id: "intro_tecnologia", nombre: "Introducción a la Tecnología Médica", semestre: 1 },
  { id: "algebra_calculo", nombre: "Elemento de Álgebra y Cálculo", semestre: 1 },

  // Semestre 2
  { id: "histoembriologia", nombre: "Histoembriología", semestre: 2 },
  { id: "fisica_general", nombre: "Física General", semestre: 2 },
  { id: "quimica_organica", nombre: "Química Orgánica", semestre: 2 },
  { id: "ingles1", nombre: "Inglés 1", semestre: 2 },
  { id: "habilidades_comunicativas", nombre: "Habilidades Comunicativas", semestre: 2 },

  // Semestre 3
  { id: "fisiologia_humana", nombre: "Fisiología Humana", semestre: 3 },
  { id: "bioetica", nombre: "Bioética", semestre: 3 },
  { id: "bioquimica", nombre: "Bioquímica", semestre: 3 },
  { id: "infectologia", nombre: "Infectología", semestre: 3 },
  { id: "ingles2", nombre: "Inglés 2", semestre: 3 },
  { id: "razonamiento_tics", nombre: "Razonamiento Científico y TICs", semestre: 3 },

  // Semestre 4
  { id: "fisiopatologia", nombre: "Fisiopatología", semestre: 4 },
  { id: "farmacologia_general", nombre: "Farmacología General", semestre: 4 },
  { id: "parasitologia", nombre: "Parasitología", semestre: 4 },
  { id: "inmunologia_diagnostica", nombre: "Inmunología Diagnóstica", semestre: 4 },
  { id: "ingles3", nombre: "Inglés 3", semestre: 4 },

  // Semestre 5
  { id: "procedimientos", nombre: "Procedimientos de Tecnología Médica y Bioseguridad", semestre: 5, requisitos: ["farmacologia_general"] },
  { id: "salud_publica1", nombre: "Salud Pública 1", semestre: 5, requisitos: ["fisiopatologia"] },
  { id: "microbiologia1", nombre: "Microbiología 1", semestre: 5, requisitos: ["parasitologia"] },
  { id: "hematologia1", nombre: "Hematología 1", semestre: 5, requisitos: ["fisiopatologia", "inmunologia_diagnostica"] },
  { id: "ingles4", nombre: "Inglés 4", semestre: 5 },

  // Semestre 6
  { id: "salud_publica2", nombre: "Salud Pública 2", semestre: 6, requisitos: ["salud_publica1"] },
  { id: "microbiologia2", nombre: "Microbiología 2", semestre: 6, requisitos: ["microbiologia1"] },
  { id: "hematologia2", nombre: "Hematología 2", semestre: 6, requisitos: ["hematologia1"] },
  { id: "bioquimica_clinica1", nombre: "Bioquímica Clínica 1", semestre: 6 },

  // Semestre 7
  { id: "educacion_salud", nombre: "Educación en Salud", semestre: 7 },
  { id: "admin_gestion_salud", nombre: "Administración y Gestión en Salud", semestre: 7 },
  { id: "biologia_molecular", nombre: "Biología Molecular", semestre: 7 },
  { id: "inmunohematologia", nombre: "Inmunohematología", semestre: 7 },
  { id: "bioquimica_clinica2", nombre: "Bioquímica Clínica 2", semestre: 7 },
  { id: "integrador1", nombre: "Integrador 1: Caso Clínico BACIMET", semestre: 7 },

  // Semestre 8
  { id: "metodologia_investigacion", nombre: "Metodología de la Investigación", semestre: 8 },
  { id: "gestion_aseguramiento_calidad", nombre: "Gestión y Aseguramiento de la Calidad", semestre: 8 },
  { id: "medicina_transfusional", nombre: "Medicina Transfusional", semestre: 8 },
  { id: "diagnostico_molecular", nombre: "Diagnóstico Molecular Clínico", semestre: 8 },
  { id: "procesamiento_critico", nombre: "Procesamiento Crítico", semestre: 8 },

  // Semestre 9
  { id: "responsabilidad_social", nombre: "Responsabilidad Social", semestre: 9 },
  { id: "seminario_investigacion", nombre: "Seminario de Investigación BACIMET", semestre: 9 },

  // Semestre 10
  { id: "integrador2", nombre: "Integrador 2: Internado Clínico BACIMET", semestre: 10 }
];

const mallaContainer = document.getElementById("malla-container");

// Para guardar el estado de cada ramo: "none" | "approved" | "failed"
const estados = {};

// Crear el div de ramo
function crearRamo(ramo) {
  const div = document.createElement("div");
  div.classList.add("ramo");
  div.innerText = ramo.nombre;
  div.dataset.id = ramo.id;
  div.dataset.semestre = ramo.semestre;
  if (ramo.requisitos) div.dataset.requisitos = JSON.stringify(ramo.requisitos);
  actualizarEstadoClase(div, estados[ramo.id] || "none");

  div.addEventListener("click", () => toggleEstado(ramo.id));

  return div;
}

// Cambiar el estado del ramo con cada click: none -> approved -> failed -> none
function toggleEstado(id) {
  if (isLocked(id)) return; // No se puede cambiar estado si está bloqueado

  const actual = estados[id] || "none";
  let siguiente;
  if (actual === "none") siguiente = "approved";
  else if (actual === "approved") siguiente = "failed";
  else siguiente = "none";

  estados[id] = siguiente;
  actualizarMalla();
}

// Ver si un ramo está bloqueado (no puede aprobarse ni reprobarse)
function isLocked(id) {
  const ramo = ramos.find(r => r.id === id);
  if (!ramo.requisitos) return false; // Si no tiene requisitos, no está bloqueado

  // Todos los requisitos deben estar aprobados para desbloquear
  return !ramo.requisitos.every(reqId => estados[reqId] === "approved");
}

// Actualizar clases visuales y bloqueos
function actualizarMalla() {
  ramos.forEach(ramo => {
    const div = document.querySelector(`.ramo[data-id="${ramo.id}"]`);
    const estado = estados[ramo.id] || "none";

    // Bloqueo
    if (isLocked(ramo.id)) div.classList.add("locked");
    else div.classList.remove("locked");

    // Estado
    actualizarEstadoClase(div, estado);
  });

  actualizarRetraso();
}

// Actualizar clases CSS según estado
function actualizarEstadoClase(div, estado) {
  div.classList.remove("approved", "failed");
  if (estado === "approved") div.classList.add("approved");
  else if (estado === "failed") div.classList.add("failed");
}

// Calcular y mostrar retraso en semestres según ramos reprobados
function actualizarRetraso() {
  // Para cada semestre, si algún ramo está failed, ese semestre cuenta como retraso
  const semestresAtrasados = new Set();

  ramos.forEach(ramo => {
    if (estados[ramo.id] === "failed") {
      semestresAtrasados.add(ramo.semestre);
    }
  });

  // Retraso es el mayor semestre atrasado menos 1 (si no hay atraso es 0)
  let atraso = 0;
  if (semestresAtrasados.size > 0) {
    atraso = Math.max(...semestresAtrasados) - 1;
    if (atraso < 0) atraso = 0;
  }

  const estadoDiv = document.getElementById("estado");
  estadoDiv.innerText = `Semestres de atraso: ${atraso}`;
}

// Renderizar toda la malla con semestres y ramos
function renderMalla() {
  mallaContainer.innerHTML = "";
  for (let s = 1; s <= 10; s++) {
    // Título semestre
    const titulo = document.createElement("div");
    titulo.className = "semestre-title";
    titulo.innerText = `Semestre ${s}`;
    mallaContainer.appendChild(titulo);

    // Ramos semestre
    const ramosSem = ramos.filter(r => r.semestre === s);
    ramosSem.forEach(ramo => {
      const div = crearRamo(ramo);
      mallaContainer.appendChild(div);
    });
  }
  // Agregar div estado al final
  const estadoDiv = document.createElement("div");
  estadoDiv.id = "estado";
  mallaContainer.appendChild(estadoDiv);

  actualizarMalla();
}

renderMalla();
