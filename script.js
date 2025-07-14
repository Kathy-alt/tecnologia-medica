const ramos = [
  { id: "anatomia", nombre: "Anatomía Humana", semestre: 1 },
  { id: "biologia_celular", nombre: "Biología Celular", semestre: 1 },
  { id: "lab_biologia_celular", nombre: "Laboratorio de Biología Celular", semestre: 1 },
  { id: "quimica_celular", nombre: "Química Celular", semestre: 1 },
  { id: "quimica_general", nombre: "Química General", semestre: 1 },
  { id: "intro_tecnologia_medica", nombre: "Introducción a la Tecnología Médica", semestre: 1 },
  { id: "algebra_calculo", nombre: "Elemento de Álgebra y Cálculo", semestre: 1 },

  { id: "histoembriologia", nombre: "Histoembriología", semestre: 2 },
  { id: "fisica_general", nombre: "Física General", semestre: 2 },
  { id: "quimica_organica", nombre: "Química Orgánica", semestre: 2 },
  { id: "ingles1", nombre: "Inglés 1", semestre: 2 },
  { id: "habilidades_comunicativas", nombre: "Habilidades Comunicativas", semestre: 2 },

  { id: "fisiologia_humana", nombre: "Fisiología Humana", semestre: 3 },
  { id: "bioetica", nombre: "Bioética", semestre: 3 },
  { id: "bioquimica", nombre: "Bioquímica", semestre: 3 },
  { id: "infectologia", nombre: "Infectología", semestre: 3 },
  { id: "ingles2", nombre: "Inglés 2", semestre: 3 },
  { id: "razonamiento_cientifico_tics", nombre: "Razonamiento Científico y TICs", semestre: 3 },

  { id: "fisiopatologia", nombre: "Fisiopatología", semestre: 4, requisitos: ["hematologia1", "salud_publica1"] },
  { id: "farmacologia_general", nombre: "Farmacología General", semestre: 4, requisitos: ["microbiologia1"] },
  { id: "parasitologia", nombre: "Parasitología", semestre: 4, requisitos: ["microbiologia1"] },
  { id: "inmunologia_diagnostica", nombre: "Inmunología Diagnóstica", semestre: 4, requisitos: ["hematologia1"] },
  { id: "ingles3", nombre: "Inglés 3", semestre: 4 },

  { id: "procedimientos_tecnologia_medica_bioseguridad", nombre: "Procedimientos de Tecnología Médica y Bioseguridad", semestre: 5, requisitos: ["farmacologia_general"] },
  { id: "salud_publica1", nombre: "Salud Pública 1", semestre: 5 },
  { id: "microbiologia1", nombre: "Microbiología 1", semestre: 5, requisitos: ["farmacologia_general", "parasitologia"] },
  { id: "hematologia1", nombre: "Hematología 1", semestre: 5, requisitos: ["fisiopatologia", "inmunologia_diagnostica"] },
  { id: "ingles4", nombre: "Inglés 4", semestre: 5 },

  { id: "salud_publica2", nombre: "Salud Pública 2", semestre: 6 },
  { id: "microbiologia2", nombre: "Microbiología 2", semestre: 6 },
  { id: "hematologia2", nombre: "Hematología 2", semestre: 6 },
  { id: "bioquimica_clinica1", nombre: "Bioquímica Clínica 1", semestre: 6 },

  { id: "educacion_salud", nombre: "Educación en Salud", semestre: 7 },
  { id: "administracion_gestion_salud", nombre: "Administración y Gestión en Salud", semestre: 7 },
  { id: "biologia_molecular", nombre: "Biología Molecular", semestre: 7 },
  { id: "inmunohematologia", nombre: "Inmunohematología", semestre: 7 },
  { id: "bioquimica_clinica2", nombre: "Bioquímica Clínica 2", semestre: 7 },
  { id: "integrador1_bacimet", nombre: "Integrador 1: Caso Clínico BACIMET", semestre: 7 },

  { id: "metodologia_investigacion", nombre: "Metodología de la Investigación", semestre: 8 },
  { id: "gestion_aseguramiento_calidad", nombre: "Gestión y Aseguramiento de la Calidad", semestre: 8 },
  { id: "medicina_transfusional", nombre: "Medicina Transfusional", semestre: 8 },
  { id: "diagnostico_molecular_clinico", nombre: "Diagnóstico Molecular Clínico", semestre: 8 },
  { id: "procesamiento_critico", nombre: "Procesamiento Crítico", semestre: 8 },

  { id: "responsabilidad_social", nombre: "Responsabilidad Social", semestre: 9 },
  { id: "seminario_investigacion_bacimet", nombre: "Seminario de Investigación BACIMET", semestre: 9 },

  { id: "integrador2_internado_clinico_bacimet", nombre: "Integrador 2: Internado Clínico BACIMET", semestre: 10 }
];

const mallaContainer = document.getElementById("malla-container");
const estado = document.getElementById("estado");

function crearRamo(ramo) {
  const div = document.createElement("div");
  div.classList.add("ramo");
  div.textContent = ramo.nombre;
  div.dataset.id = ramo.id;
  div.dataset.semestre = ramo.semestre;
  if (ramo.requisitos) div.dataset.requisitos = JSON.stringify(ramo.requisitos);
  if (ramo.requisitos) div.classList.add("locked");
  div.addEventListener("click", () => toggleEstado(ramo.id));
  return div;
}

function renderMalla() {
  mallaContainer.innerHTML = "";
  for (let semestre = 1; semestre <= 10; semestre++) {
    const titulo = document.createElement("div");
    titulo.textContent = `Semestre ${semestre}`;
    titulo.classList.add("semestre-title");
    mallaContainer.appendChild(titulo);

    const semestreRamos = ramos.filter(r => r.semestre === semestre);
    semestreRamos.forEach(ramo => {
      const div = crearRamo(ramo);
      mallaContainer.appendChild(div);
    });
  }
}

function toggleEstado(id) {
  const el = document.querySelector(`.ramo[data-id="${id}"]`);
  if (el.classList.contains("locked")) return;

  // Toggle between none -> approved -> failed -> none
  if (!el.classList.contains("approved") && !el.classList.contains("failed")) {
    el.classList.add("approved");
  } else if (el.classList.contains("approved")) {
    el.classList.remove("approved");
    el.classList.add("failed");
  } else {
    el.classList.remove("failed");
  }
  actualizarBloqueos();
  actualizarEstado();
}

function actualizarBloqueos() {
  ramos.forEach(ramo => {
    const el = document.querySelector(`.ramo[data-id="${ramo.id}"]`);
    if (!ramo.requisitos) {
      el.classList.remove("locked");
      return;
    }
    const requisitosAprobados = ramo.requisitos.every(reqId => {
      const reqEl = document.querySelector(`.ramo[data-id="${reqId}"]`);
      return reqEl && reqEl.classList.contains("approved");
    });
    if (requisitosAprobados) {
      el.classList.remove("locked");
    } else {
      el.classList.add("locked");
      // Also remove approved/failed if locked
      el.classList.remove("approved");
      el.classList.remove("failed");
    }
  });
}

function actualizarEstado() {
  // Calculamos cuántos semestres se atrasó, basado en el semestre más alto desaprobado o bloqueado
  let maxSemestreAtraso = 0;

  // Si hay ramos desaprobados o bloqueados en un semestre menor al máximo aprobado, eso indica atraso
  for (let semestre = 1; semestre <= 10; semestre++) {
    const ramosSemestre = ramos.filter(r => r.semestre === semestre);
    const algunoFallado = ramosSemestre.some(r => {
      const el = document.querySelector(`.ramo[data-id="${r.id}"]`);
      return el.classList.contains("failed") || el.classList.contains("locked");
    });
    if (algunoFallado) {
      maxSemestreAtraso = semestre;
    }
  }

  estado.textContent = maxSemestreAtraso > 0
    ? `Actualmente estás atrasado hasta el semestre ${maxSemestreAtraso}`
    : "Estás al día con los semestres";
}

// Inicializar la malla y estados
renderMalla();
actualizarBloqueos();
actualizarEstado();

