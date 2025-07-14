const ramos = [
  // Semestre 1
  { id: "anatomia", nombre: "Anatomía Humana", semestre: 1 },
  { id: "biocel", nombre: "Biología Celular", semestre: 1 },
  { id: "labbiocel", nombre: "Laboratorio de Biología Celular", semestre: 1 },
  { id: "quimcel", nombre: "Química Celular", semestre: 1 },
  { id: "quimgeneral", nombre: "Química General", semestre: 1 },
  { id: "intro", nombre: "Introducción a la Tecnología Médica", semestre: 1 },
  { id: "algebra", nombre: "Elementos de Álgebra y Cálculo", semestre: 1 },

  // Semestre 2
  { id: "histo", nombre: "Hisoembriología", semestre: 2 },
  { id: "fisica", nombre: "Física General", semestre: 2 },
  { id: "quimorg", nombre: "Química Orgánica", semestre: 2 },
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
  { id: "fisiopato", nombre: "Fisiopatología", semestre: 4 },
  { id: "farmacologia", nombre: "Farmacología General", semestre: 4 },
  { id: "parasito", nombre: "Parasitología", semestre: 4 },
  { id: "inmuno", nombre: "Inmunología Diagnóstica", semestre: 4 },
  { id: "ingles3", nombre: "Inglés III", semestre: 4, requisitos: ["ingles2"] },

  // Semestre 5
  { id: "procedimientos", nombre: "Procedimientos TM y Bioseguridad", semestre: 5, requisitos: ["farmacologia"] },
  { id: "salud1", nombre: "Salud Pública I", semestre: 5, requisitos: ["fisiopato"] },
  { id: "micro1", nombre: "Microbiología I", semestre: 5, requisitos: ["parasito", "farmacologia"] },
  { id: "hemato1", nombre: "Hematología I", semestre: 5, requisitos: ["fisiopato", "inmuno"] },
  { id: "ingles4", nombre: "Inglés IV", semestre: 5, requisitos: ["ingles3"] },

  // Semestre 6
  { id: "salud2", nombre: "Salud Pública II", semestre: 6, requisitos: ["salud1"] },
  { id: "micro2", nombre: "Microbiología II", semestre: 6, requisitos: ["micro1"] },
  { id: "hemato2", nombre: "Hematología II", semestre: 6, requisitos: ["hemato1"] },
  { id: "bioq1", nombre: "Bioquímica Clínica I", semestre: 6 },

  // Semestre 7
  { id: "educacion", nombre: "Educación en Salud", semestre: 7 },
  { id: "gestion", nombre: "Administración y Gestión en Salud", semestre: 7 },
  { id: "mol", nombre: "Biología Molecular", semestre: 7 },
  { id: "inmunohem", nombre: "Inmunohematología", semestre: 7 },
  { id: "bioq2", nombre: "Bioquímica Clínica II", semestre: 7, requisitos: ["bioq1"] },
  { id: "integ1", nombre: "Integrador I: Caso Clínico BACIMET", semestre: 7 },

  // Semestre 8
  { id: "metodologia", nombre: "Metodología de la Investigación", semestre: 8 },
  { id: "calidad", nombre: "Gestión y Aseguramiento de la Calidad", semestre: 8 },
  { id: "transfusion", nombre: "Medicina Transfusional", semestre: 8 },
  { id: "molclinico", nombre: "Diagnóstico Molecular Clínico", semestre: 8 },
  { id: "procesamiento", nombre: "Procesamiento Crítico", semestre: 8 },

  // Semestre 9
  { id: "social", nombre: "Responsabilidad Social", semestre: 9 },
  { id: "seminario", nombre: "Seminario de Investigación BACIMET", semestre: 9 },

  // Semestre 10
  { id: "integ2", nombre: "Integrador II: Internado Clínico BACIMET", semestre: 10 }
];

const mallaContainer = document.getElementById("malla-container");
const atrasoInfo = document.getElementById("atraso-info");

function crearRamo(ramo) {
  const div = document.createElement("div");
  div.classList.add("ramo");
  div.innerText = ramo.nombre;
  div.dataset.id = ramo.id;
  div.dataset.semestre = ramo.semestre;
  if (ramo.requisitos) div.dataset.requisitos = JSON.stringify(ramo.requisitos);
  div.addEventListener("click", () => cambiarEstadoRamo(ramo.id));
  return div;
}

function renderMalla() {
  mallaContainer.innerHTML = "";
  for (let semestre = 1; semestre <= 10; semestre++) {
    const semestreRamos = ramos.filter(r => r.semestre === semestre);
    semestreRamos.forEach(ramo => {
      const div = crearRamo(ramo);
      mallaContainer.appendChild(div);
    });
  }
  actualizarBloqueos();
}

function cambiarEstadoRamo(id) {
  const el = document.querySelector(`.ramo[data-id="${id}"]`);
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

function actualizarBloqueos() {
  ramos.forEach(ramo => {
    const el = document.querySelector(`.ramo[data-id="${ramo.id}"]`);
    if (!ramo.requisitos) {
      el.classList.remove("locked");
      return;
    }
    const requisitosAprobados = ramo.requisitos.every(req => {
      const elReq = document.querySelector(`.ramo[data-id="${req}"]`);
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
  let atrasoTotal = 0;
  ramos.forEach(ramo => {
    const el = document.querySelector(`.ramo[data-id="${ramo.id}"]`);
    if (el.classList.contains("locked")) return;
    if (!ramo.requisitos || ramo.requisitos.length === 0) return;
    const maxSem = Math.max(
      ...ramo.requisitos.map(req => {
        const reqRamo = ramos.find(r => r.id === req);
        return reqRamo ? reqRamo.semestre : 0;
      })
    );
    if (ramo.semestre <= maxSem) {
      atrasoTotal += 1;
    }
  });
  atrasoInfo.innerText = `Semestres de atraso acumulado: ${atrasoTotal}`;
}

renderMalla();
