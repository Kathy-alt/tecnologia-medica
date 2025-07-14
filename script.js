// Archivo script.js funcional con requisitos completos e interacción avanzada

const ramos = [
  // Semestre 1
  { id: "anatomia", nombre: "Anatomía Humana", semestre: 1 },
  { id: "biocel", nombre: "Biología Celular", semestre: 1 },
  { id: "labbiocel", nombre: "Lab. de Biología Celular", semestre: 1 },
  { id: "quimcel", nombre: "Química Celular", semestre: 1 },
  { id: "quimgeneral", nombre: "Química General", semestre: 1 },
  { id: "introTM", nombre: "Intro a la Tecnología Médica", semestre: 1 },
  { id: "algebra", nombre: "Elementos de Álgebra y Cálculo", semestre: 1 },

  // Semestre 2
  { id: "histo", nombre: "Histoembriología", semestre: 2 },
  { id: "fisica", nombre: "Física General", semestre: 2 },
  { id: "quimorg", nombre: "Química Orgánica", semestre: 2 },
  { id: "ingles1", nombre: "Inglés I", semestre: 2 },
  { id: "comunicacion", nombre: "Habilidades Comunicativas", semestre: 2 },

  // Semestre 3
  { id: "fisiologia", nombre: "Fisiología Humana", semestre: 3 },
  { id: "bioetica", nombre: "Bioética", semestre: 3 },
  { id: "bioq", nombre: "Bioquímica", semestre: 3 },
  { id: "infecto", nombre: "Infectología", semestre: 3 },
  { id: "ingles2", nombre: "Inglés II", semestre: 3, requisitos: ["ingles1"] },
  { id: "tics", nombre: "Razonamiento Científico y TICs", semestre: 3 },

  // Semestre 4
  { id: "fisiopato", nombre: "Fisiopatología", semestre: 4 },
  { id: "farmaco", nombre: "Farmacología General", semestre: 4 },
  { id: "parasitologia", nombre: "Parasitología", semestre: 4 },
  { id: "inmuno", nombre: "Inmunología Diagnóstica", semestre: 4 },
  { id: "ingles3", nombre: "Inglés III", semestre: 4, requisitos: ["ingles2"] },

  // Semestre 5
  { id: "procedimientos", nombre: "Procedimientos y Bioseguridad", semestre: 5, requisitos: ["farmaco"] },
  { id: "saludpub1", nombre: "Salud Pública I", semestre: 5, requisitos: ["fisiopato"] },
  { id: "micro1", nombre: "Microbiología I", semestre: 5, requisitos: ["parasitologia", "farmaco"] },
  { id: "hemato1", nombre: "Hematología I", semestre: 5, requisitos: ["fisiopato", "inmuno"] },
  { id: "ingles4", nombre: "Inglés IV", semestre: 5, requisitos: ["ingles3"] },

  // Semestre 6
  { id: "saludpub2", nombre: "Salud Pública II", semestre: 6, requisitos: ["saludpub1", "procedimientos"] },
  { id: "micro2", nombre: "Microbiología II", semestre: 6, requisitos: ["micro1"] },
  { id: "hemato2", nombre: "Hematología II", semestre: 6, requisitos: ["hemato1"] },
  { id: "bioqclin1", nombre: "Bioquímica Clínica I", semestre: 6, requisitos: ["inmuno", "hemato1"] },

  // Semestre 7
  { id: "educacion", nombre: "Educación en Salud", semestre: 7, requisitos: ["saludpub2"] },
  { id: "admin", nombre: "Administración y Gestión", semestre: 7, requisitos: ["saludpub2", "bioqclin1"] },
  { id: "biomol", nombre: "Biología Molecular", semestre: 7, requisitos: ["bioqclin1"] },
  { id: "inmunohemato", nombre: "Inmunohematología", semestre: 7, requisitos: ["hemato1"] },
  { id: "bioqclin2", nombre: "Bioquímica Clínica II", semestre: 7, requisitos: ["bioqclin1"] },
  { id: "integrador1", nombre: "Integrador I: Caso Clínico", semestre: 7, requisitos: ["bioqclin2", "inmunohemato", "admin", "biomol", "educacion", "saludpub2", "hemato2", "micro2"] },

  // Semestre 8
  { id: "metodologia", nombre: "Metodología Investigación", semestre: 8, requisitos: ["saludpub2", "integrador1"] },
  { id: "gestion", nombre: "Gestión y Calidad", semestre: 8, requisitos: ["admin", "integrador1"] },
  { id: "transfusion", nombre: "Medicina Transfusional", semestre: 8, requisitos: ["integrador1", "inmunohemato"] },
  { id: "diagmol", nombre: "Diagnóstico Molecular Clínico", semestre: 8, requisitos: ["integrador1"] },
  { id: "procesamiento", nombre: "Procesamiento Crítico", semestre: 8 },

  // Semestre 9
  { id: "responsabilidad", nombre: "Responsabilidad Social", semestre: 9, requisitos: ["metodologia", "gestion", "transfusion", "diagmol"] },
  { id: "seminario", nombre: "Seminario Investigación", semestre: 9, requisitos: ["metodologia", "integrador1"] },

  // Semestre 10
  { id: "integrador2", nombre: "Integrador II: Internado Clínico", semestre: 10, requisitos: ["seminario", "responsabilidad"] }
];

const mallaContainer = document.getElementById("malla-container");
const estadoContainer = document.getElementById("estado");

function crearRamo(ramo) {
  const div = document.createElement("div");
  div.classList.add("ramo");
  div.innerText = ramo.nombre;
  div.dataset.id = ramo.id;
  if (ramo.requisitos) {
    div.classList.add("locked");
    div.dataset.requisitos = JSON.stringify(ramo.requisitos);
  }
  div.addEventListener("click", () => toggleEstadoRamo(ramo.id));
  return div;
}

function renderMalla() {
  for (let s = 1; s <= 10; s++) {
    const title = document.createElement("div");
    title.className = "semestre-title";
    title.textContent = `Semestre ${s}`;
    mallaContainer.appendChild(title);

    ramos.filter(r => r.semestre === s).forEach(ramo => {
      const div = crearRamo(ramo);
      mallaContainer.appendChild(div);
    });
  }
}

function toggleEstadoRamo(id) {
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
  calcularRetraso();
}

function actualizarBloqueos() {
  ramos.forEach(ramo => {
    const el = document.querySelector(`.ramo[data-id="${ramo.id}"]`);
    if (!ramo.requisitos) {
      el.classList.remove("locked");
      return;
    }
    const aprobados = ramo.requisitos.every(req => {
      const elReq = document.querySelector(`.ramo[data-id="${req}"]`);
      return elReq && elReq.classList.contains("approved");
    });
    if (aprobados) {
      el.classList.remove("locked");
    } else {
      el.classList.add("locked");
    }
  });
}

function calcularRetraso() {
  let retraso = 0;
  for (let s = 1; s <= 10; s++) {
    const ramosSem = ramos.filter(r => r.semestre === s);
    const aprobados = ramosSem.filter(r => {
      const el = document.querySelector(`.ramo[data-id="${r.id}"]`);
      return el && el.classList.contains("approved");
    });
    if (aprobados.length < ramosSem.length) retraso++;
  }
  estadoContainer.textContent = `Semestres atrasados: ${retraso}`;
}

renderMalla();
