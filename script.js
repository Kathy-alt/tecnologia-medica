const ramos = [
  // Semestre 1
  { id: "anatomia", nombre: "Anatomía Humana", semestre: 1 },
  { id: "biocel", nombre: "Biología Celular", semestre: 1 },
  { id: "labbiocel", nombre: "Laboratorio de Biología Celular", semestre: 1 },
  { id: "quimicacelular", nombre: "Química Celular", semestre: 1 },
  { id: "quimicagral", nombre: "Química General", semestre: 1 },
  { id: "introTM", nombre: "Introducción a la Tecnología Médica", semestre: 1 },
  { id: "algebra", nombre: "Elementos de Álgebra y Cálculo", semestre: 1 },

  // Semestre 2
  { id: "histo", nombre: "Hisoembriología", semestre: 2 },
  { id: "fisica", nombre: "Física General", semestre: 2 },
  { id: "quimicaorg", nombre: "Química Orgánica", semestre: 2 },
  { id: "ingles1", nombre: "Inglés I", semestre: 2 },
  { id: "comunicacion", nombre: "Habilidades Comunicativas", semestre: 2 },

  // Semestre 3
  { id: "fisiologia", nombre: "Fisiología Humana", semestre: 3 },
  { id: "bioetica", nombre: "Bioética", semestre: 3 },
  { id: "bioquimica", nombre: "Bioquímica", semestre: 3 },
  { id: "infectologia", nombre: "Infectología", semestre: 3 },
  { id: "ingles2", nombre: "Inglés II", semestre: 3, requisitos: ["ingles1"] },
  { id: "tic", nombre: "Razonamiento Científico y TICs", semestre: 3 },

  // Semestre 4
  { id: "fisiopatologia", nombre: "Fisiopatología", semestre: 4 },
  { id: "farmacologia", nombre: "Farmacología General", semestre: 4 },
  { id: "parasitologia", nombre: "Parasitología", semestre: 4 },
  { id: "inmunodiag", nombre: "Inmunología Diagnóstica", semestre: 4 },
  { id: "ingles3", nombre: "Inglés III", semestre: 4, requisitos: ["ingles2"] },

  // Semestre 5
  { id: "procedimientos", nombre: "Procedimientos TM y Bioseguridad", semestre: 5, requisitos: ["farmacologia"] },
  { id: "saludpub1", nombre: "Salud Pública I", semestre: 5, requisitos: ["fisiopatologia"] },
  { id: "micro1", nombre: "Microbiología I", semestre: 5, requisitos: ["parasitologia", "farmacologia"] },
  { id: "hematologia1", nombre: "Hematología I", semestre: 5, requisitos: ["fisiopatologia", "inmunodiag"] },
  { id: "ingles4", nombre: "Inglés IV", semestre: 5, requisitos: ["ingles3"] },

  // Semestre 6
  { id: "saludpub2", nombre: "Salud Pública II", semestre: 6, requisitos: ["saludpub1", "procedimientos"] },
  { id: "micro2", nombre: "Microbiología II", semestre: 6, requisitos: ["micro1"] },
  { id: "hematologia2", nombre: "Hematología II", semestre: 6, requisitos: ["hematologia1"] },
  { id: "bioqclinica1", nombre: "Bioquímica Clínica I", semestre: 6, requisitos: ["hematologia1", "inmunodiag"] },

  // Semestre 7
  { id: "educacionsalud", nombre: "Educación en Salud", semestre: 7, requisitos: ["saludpub2"] },
  { id: "gestion", nombre: "Administración y Gestión en Salud", semestre: 7, requisitos: ["saludpub2", "bioqclinica1"] },
  { id: "biomol", nombre: "Biología Molecular", semestre: 7, requisitos: ["bioqclinica1"] },
  { id: "inmunohemato", nombre: "Inmunohematología", semestre: 7, requisitos: ["hematologia1"] },
  { id: "bioqclinica2", nombre: "Bioquímica Clínica II", semestre: 7, requisitos: ["bioqclinica1"] },
  { id: "integrador1", nombre: "Integrador I: Caso Clínico", semestre: 7, requisitos: ["saludpub2", "bioqclinica1", "inmunohemato", "biomol", "bioqclinica2", "educacionsalud", "gestion"] },

  // Semestre 8
  { id: "investigacion", nombre: "Metodología de la Investigación", semestre: 8, requisitos: ["saludpub2", "integrador1"] },
  { id: "asegcalidad", nombre: "Gestión y Aseguramiento de la Calidad", semestre: 8, requisitos: ["gestion", "integrador1"] },
  { id: "transfusional", nombre: "Medicina Transfusional", semestre: 8, requisitos: ["inmunohemato", "integrador1"] },
  { id: "diagmol", nombre: "Diagnóstico Molecular Clínico", semestre: 8, requisitos: ["integrador1"] },
  { id: "critico", nombre: "Procesamiento Crítico", semestre: 8 },

  // Semestre 9
  { id: "responsabilidad", nombre: "Responsabilidad Social", semestre: 9, requisitos: ["integrador1", "transfusional", "diagmol", "asegcalidad", "investigacion"] },
  { id: "seminario", nombre: "Seminario de Investigación", semestre: 9, requisitos: ["responsabilidad"] },

  // Semestre 10
  { id: "internado", nombre: "Integrador II: Internado Clínico", semestre: 10, requisitos: ["seminario"] }
];

const mallaContainer = document.getElementById("malla-container");
const estadoDiv = document.getElementById("estado");

function crearColumna(semestre) {
  const columna = document.createElement("div");
  columna.classList.add("semestre-column");

  const titulo = document.createElement("div");
  titulo.classList.add("semestre-title");
  titulo.innerText = `Semestre ${semestre}`;
  columna.appendChild(titulo);

  ramos
    .filter(r => r.semestre === semestre)
    .forEach(ramo => {
      const div = document.createElement("div");
      div.classList.add("ramo");
      div.innerText = ramo.nombre;
      div.dataset.id = ramo.id;
      div.dataset.semestre = ramo.semestre;
      if (ramo.requisitos) div.dataset.requisitos = JSON.stringify(ramo.requisitos);
      div.addEventListener("click", () => toggleEstado(div));
      columna.appendChild(div);
    });

  return columna;
}

function toggleEstado(el) {
  if (el.classList.contains("locked")) return;
  if (el.classList.contains("approved")) {
    el.classList.remove("approved");
    el.classList.add("failed");
  } else if (el.classList.contains("failed")) {
    el.classList.remove("failed");
  } else {
    el.classList.add("approved");
  }
  actualizarBloqueos();
  calcularAtraso();
}

function renderMalla() {
  for (let semestre = 1; semestre <= 10; semestre++) {
    mallaContainer.appendChild(crearColumna(semestre));
  }
  actualizarBloqueos();
}

function actualizarBloqueos() {
  ramos.forEach(ramo => {
    const el = document.querySelector(`.ramo[data-id="${ramo.id}"]`);
    if (!ramo.requisitos) {
      el.classList.remove("locked");
      return;
    }
    const requisitosAprobados = ramo.requisitos.every(reqId => {
      const elReq = document.querySelector(`.ramo[data-id="${reqId}"]`);
      return elReq && elReq.classList.contains("approved");
    });
    if (requisitosAprobados) {
      el.classList.remove("locked");
    } else {
      el.classList.add("locked");
    }
  });
}

function calcularAtraso() {
  let atraso = 0;
  for (let s = 1; s <= 10; s++) {
    const ramosSemestre = ramos.filter(r => r.semestre === s);
    const aprobados = ramosSemestre.filter(r => {
      const el = document.querySelector(`.ramo[data-id="${r.id}"]`);
      return el && el.classList.contains("approved");
    });
    if (aprobados.length < ramosSemestre.length) atraso++;
  }
  estadoDiv.innerText = `Estado: ${atraso} semestre(s) de atraso`;
}

renderMalla();
