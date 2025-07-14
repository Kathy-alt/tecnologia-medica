// Datos de ramos con sus requisitos y semestre
const ramos = [
  // Semestre 1
  { id: "anatomia", nombre: "Anatomía Humana", semestre: 1 },
  { id: "biologia_celular", nombre: "Biología Celular", semestre: 1 },
  { id: "lab_biologia_celular", nombre: "Laboratorio de Biología Celular", semestre: 1 },
  { id: "quimica_celular", nombre: "Química Celular", semestre: 1 },
  { id: "quimica_general", nombre: "Química General", semestre: 1 },
  { id: "intro_tec_medica", nombre: "Introducción a la Tecnología Médica", semestre: 1 },
  { id: "algebra_calculo", nombre: "Elemento de Álgebra y Cálculo", semestre: 1 },

  // Semestre 2
  { id: "hisoembriologia", nombre: "Hisoembriología", semestre: 2 },
  { id: "fisica_general", nombre: "Física General", semestre: 2 },
  { id: "quimica_organica", nombre: "Química Orgánica", semestre: 2 },
  { id: "ingles_1", nombre: "Inglés I", semestre: 2 },
  { id: "habilidades_comunicativas", nombre: "Habilidades Comunicativas", semestre: 2 },

  // Semestre 3
  { id: "fisiologia_humana", nombre: "Fisiología Humana", semestre: 3 },
  { id: "bioetica", nombre: "Bioética", semestre: 3 },
  { id: "bioquimica", nombre: "Bioquímica", semestre: 3 },
  { id: "infectologia", nombre: "Infectología", semestre: 3 },
  { id: "ingles_2", nombre: "Inglés II", semestre: 3, requisitos: ["ingles_1"] },
  { id: "razonamiento_cientifico_tics", nombre: "Razonamiento Científico y TICS", semestre: 3 },

  // Semestre 4
  { id: "fisiopatologia", nombre: "Fisiopatología", semestre: 4 },
  { id: "farmacologia_general", nombre: "Farmacología General", semestre: 4 },
  { id: "parasitologia", nombre: "Parasitología", semestre: 4 },
  { id: "inmunologia_diagnostica", nombre: "Inmunología Diagnóstica", semestre: 4 },
  { id: "ingles_3", nombre: "Inglés III", semestre: 4, requisitos: ["ingles_2"] },

  // Semestre 5
  { id: "procedimientos_tec_medica", nombre: "Procedimientos de Tecnología Médica y Bioseguridad", semestre: 5, requisitos: ["farmacologia_general"] },
  { id: "salud_publica_1", nombre: "Salud Pública 1", semestre: 5, requisitos: ["fisiopatologia"] },
  { id: "microbiologia_1", nombre: "Microbiología 1", semestre: 5, requisitos: ["parasitologia", "farmacologia_general"] },
  { id: "hematologia_1", nombre: "Hematología 1", semestre: 5, requisitos: ["fisiopatologia", "inmunologia_diagnostica"] },
  { id: "ingles_4", nombre: "Inglés IV", semestre: 5, requisitos: ["ingles_3"] },

  // Semestre 6
  { id: "salud_publica_2", nombre: "Salud Pública 2", semestre: 6, requisitos: ["salud_publica_1", "procedimientos_tec_medica"] },
  { id: "microbiologia_2", nombre: "Microbiología 2", semestre: 6, requisitos: ["microbiologia_1"] },
  { id: "hematologia_2", nombre: "Hematología 2", semestre: 6, requisitos: ["hematologia_1"] },
  { id: "bioquimica_clinica_1", nombre: "Bioquímica Clínica 1", semestre: 6, requisitos: ["inmunologia_diagnostica", "hematologia_1"] },

  // Semestre 7
  { id: "educacion_en_salud", nombre: "Educación en Salud", semestre: 7, requisitos: ["salud_publica_2"] },
  { id: "administracion_gestion_salud", nombre: "Administración y Gestión en Salud", semestre: 7, requisitos: ["salud_publica_2", "bioquimica_clinica_1"] },
  { id: "biologia_molecular", nombre: "Biología Molecular", semestre: 7, requisitos: ["bioquimica_clinica_1"] },
  { id: "inmunohematologia", nombre: "Inmunohematología", semestre: 7, requisitos: ["hematologia_1"] },
  { id: "bioquimica_clinica_2", nombre: "Bioquímica Clínica 2", semestre: 7, requisitos: ["bioquimica_clinica_1"] },
  { id: "integrador_1", nombre: "Integrador 1: Caso Clínico BACIMET", semestre: 7, requisitos: [] }, // requiere todos previos (control en código)

  // Semestre 8
  { id: "metodologia_investigacion", nombre: "Metodología de la Investigación", semestre: 8, requisitos: ["salud_publica_2", "integrador_1"] },
  { id: "gestion_aseguramiento_calidad", nombre: "Gestión y Aseguramiento de la Calidad", semestre: 8, requisitos: ["administracion_gestion_salud", "integrador_1"] },
  { id: "medicina_transfusional", nombre: "Medicina Transfusional", semestre: 8, requisitos: ["integrador_1", "inmunohematologia"] },
  { id: "diagnostico_molecular_clinico", nombre: "Diagnóstico Molecular Clínico", semestre: 8, requisitos: ["integrador_1"] },
  { id: "pensamiento_critico", nombre: "Pensamiento Crítico", semestre: 8 },

  // Semestre 9
  { id: "responsabilidad_social", nombre: "Responsabilidad Social", semestre: 9, requisitos: [] }, // requiere 8 semestres y integrador 2 (control en código)
  { id: "seminario_investigacion", nombre: "Seminario de Investigación BACIMET", semestre: 9, requisitos: [] },

  // Semestre 10
  { id: "integrador_2", nombre: "Integrador 2: Internado Clínico BACIMET", semestre: 10, requisitos: [] } // requiere todo anterior (control en código)
];

// Estados por ramo: "approved", "failed", o undefined (no aprobado ni fallado)
const estados = {};

// Función para saber si todos los ramos previos (antes del semestre actual) están aprobados
function previosAprobados(semestre) {
  for (const r of ramos) {
    if (r.semestre < semestre) {
      if (estados[r.id] !== "approved") return false;
    }
  }
  return true;
}

const container = document.getElementById("malla-container");
const estadoDiv = document.getElementById("estado");

// Renderizar la malla en columnas por semestre
function renderMalla() {
  container.innerHTML = "";
  for (let s = 1; s <= 10; s++) {
    const col = document.createElement("div");
    col.className = "semestre-column";
    const title = document.createElement("div");
    title.className = "semestre-title";
    title.textContent = `Semestre ${s}`;
    col.appendChild(title);

    const ramosDelSem = ramos.filter(r => r.semestre === s);
    for (const ramo of ramosDelSem) {
      const div = document.createElement("div");
      div.className = "ramo locked";
      div.textContent = ramo.nombre;
      div.dataset.id = ramo.id;
      div.dataset.semestre = ramo.semestre;
      if (ramo.requisitos) div.dataset.requisitos = JSON.stringify(ramo.requisitos);
      div.addEventListener("click", () => toggleEstado(ramo.id));
      col.appendChild(div);
    }
    container.appendChild(col);
  }
  actualizarEstados();
}

// Cambiar estado del ramo al hacer click: none -> approved -> failed -> none
function toggleEstado(id) {
  const estadoActual = estados[id];
  if (estadoActual === "approved") {
    estados[id] = "failed";
  } else if (estadoActual === "failed") {
    delete estados[id];
  } else {
    // Verificar si el ramo está bloqueado (locked) y si tiene requisitos no aprobados
    const ramo = ramos.find(r => r.id === id);
    if (!puedeAprobar(ramo)) {
      alert("No puedes aprobar este ramo aún, porque no se cumplen los prerrequisitos.");
      return;
    }
    estados[id] = "approved";
  }
  actualizarEstados();
}

// Verificar si un ramo puede aprobarse según sus prerrequisitos
function puedeAprobar(ramo) {
  if (!ramo.requisitos || ramo.requisitos.length === 0) {
    // Para integrador 1, 2 y responsabilidad social, validamos prerrequisitos especiales abajo
    if (ramo.id === "integrador_1") {
      // Requiere todos los ramos antes del semestre 7 aprobados
      return previosAprobados(7);
    }
    if (ramo.id === "responsabilidad_social" || ramo.id === "seminario_investigacion") {
      // Requiere aprobar todos los ramos de semestres 1 a 8 + integrador 1 e integrador 2
      return previosAprobados(9) && estados["integrador_2"] === "approved";
    }
    if (ramo.id === "integrador_2") {
      // Requiere todo aprobado antes del semestre 10
      return previosAprobados(10);
    }
    return true;
  }
  return ramo.requisitos.every(rq => estados[rq] === "approved");
}

// Actualizar clases y estados visuales de los ramos según estados y bloqueos
function actualizarEstados() {
  let atrasos = 0;

  for (const ramo of ramos) {
    const div = container.querySelector(`.ramo[data-id="${ramo.id}"]`);
    const estadoRamo = estados[ramo.id];
    // Primero quitamos clases
    div.classList.remove("approved", "failed", "locked");

    // Bloqueo por requisitos
    if (!puedeAprobar(ramo) && estadoRamo !== "approved") {
      div.classList.add("locked");
    }

    // Estados aprobados o fallidos
    if (estadoRamo === "approved") {
      div.classList.add("approved");
    } else if (estadoRamo === "failed") {
      div.classList.add("failed");
    }

    // Contar atrasos por semestre
  }

  // Calcular atrasos: semestres con algún ramo no aprobado (y sin failed)
  for (let s = 1; s <= 10; s++) {
    const ramosDelSem = ramos.filter(r => r.semestre === s);
    // Si hay al menos 1 ramo que NO esté aprobado y NO esté fallado
    const hayPendientes = ramosDelSem.some(r => {
      const e = estados[r.id];
      return e !== "approved" && e !== "failed";
    });
    if (hayPendientes) atrasos++;
  }
  estadoDiv.textContent = `Estado: ${atrasos} semestre(s) de atraso`;
}

renderMalla();
