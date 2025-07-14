const ramos = [
  // Semestre 1
  { id: "anatomia", nombre: "Anatomía Humana", semestre: 1 },
  { id: "biocelular", nombre: "Biología Celular", semestre: 1 },
  { id: "lab_biocelular", nombre: "Laboratorio de Biología Celular", semestre: 1, requisitos: ["biocelular"] },
  { id: "quim_celular", nombre: "Química Celular", semestre: 1 },
  { id: "quim_general", nombre: "Química General", semestre: 1 },
  { id: "intro_tm", nombre: "Introducción a la Tecnología Médica", semestre: 1 },
  { id: "algebra_calculo", nombre: "Elemento de Álgebra y Cálculo", semestre: 1 },

  // Semestre 2
  { id: "hisoembriologia", nombre: "Hisoembriología", semestre: 2 },
  { id: "fisica_general", nombre: "Física General", semestre: 2 },
  { id: "quim_organica", nombre: "Química Orgánica", semestre: 2 },
  { id: "ingles1", nombre: "Inglés I", semestre: 2 },
  { id: "habilidades", nombre: "Habilidades Comunicativas", semestre: 2 },

  // Semestre 3
  { id: "fisiologia", nombre: "Fisiología Humana", semestre: 3 },
  { id: "bioetica", nombre: "Bioética", semestre: 3 },
  { id: "bioquimica", nombre: "Bioquímica", semestre: 3 },
  { id: "infectologia", nombre: "Infectología", semestre: 3 },
  { id: "ingles2", nombre: "Inglés II", semestre: 3, requisitos: ["ingles1"] },
  { id: "razon_cientifico", nombre: "Razonamiento Científico y TICs", semestre: 3 },

  // Semestre 4
  { id: "fisiopatologia", nombre: "Fisiopatología", semestre: 4 },
  { id: "farmacologia", nombre: "Farmacología General", semestre: 4 },
  { id: "parasitologia", nombre: "Parasitología", semestre: 4 },
  { id: "inmuno_diag", nombre: "Inmunología Diagnóstica", semestre: 4 },
  { id: "ingles3", nombre: "Inglés III", semestre: 4, requisitos: ["ingles2"] },

  // Semestre 5
  { id: "procedimientos", nombre: "Procedimientos de Tecnología Médica y Bioseguridad", semestre: 5, requisitos: ["farmacologia"] },
  { id: "salud_pub1", nombre: "Salud Pública 1", semestre: 5, requisitos: ["fisiopatologia", "inmuno_diag"] },
  { id: "microbiologia1", nombre: "Microbiología 1", semestre: 5, requisitos: ["parasitologia", "farmacologia"] },
  { id: "hematologia1", nombre: "Hematología 1", semestre: 5, requisitos: ["fisiopatologia", "inmuno_diag"] },
  { id: "ingles4", nombre: "Inglés IV", semestre: 5, requisitos: ["ingles3"] },

  // Semestre 6
  { id: "salud_pub2", nombre: "Salud Pública 2", semestre: 6, requisitos: ["salud_pub1", "procedimientos"] },
  { id: "microbiologia2", nombre: "Microbiología 2", semestre: 6, requisitos: ["microbiologia1"] },
  { id: "hematologia2", nombre: "Hematología 2", semestre: 6, requisitos: ["hematologia1"] },
  { id: "bioquim_clin1", nombre: "Bioquímica Clínica 1", semestre: 6, requisitos: ["inmuno_diag", "hematologia1"] },

  // Semestre 7
  { id: "educacion_salud", nombre: "Educación en Salud", semestre: 7, requisitos: ["salud_pub2"] },
  { id: "admin_gestion", nombre: "Administración y Gestión en Salud", semestre: 7, requisitos: ["salud_pub2", "bioquim_clin1"] },
  { id: "biologia_mol", nombre: "Biología Molecular", semestre: 7, requisitos: ["bioquim_clin1"] },
  { id: "inmunohematologia", nombre: "Inmunohematología", semestre: 7, requisitos: ["hematologia1"] },
  { id: "bioquim_clin2", nombre: "Bioquímica Clínica 2", semestre: 7, requisitos: ["bioquim_clin1"] },
  { id: "integrador1", nombre: "Integrador 1: Caso Clínico BACIMET", semestre: 7, requisitos: [] }, // se añade check más adelante

  // Semestre 8
  { id: "metodologia_inv", nombre: "Metodología de la Investigación", semestre: 8, requisitos: ["salud_pub2", "integrador1"] },
  { id: "gestion_calidad", nombre: "Gestión y Aseguramiento de la Calidad", semestre: 8, requisitos: ["admin_gestion", "integrador1"] },
  { id: "medicina_trans", nombre: "Medicina Transfusional", semestre: 8, requisitos: ["integrador1", "inmunohematologia"] },
  { id: "diag_molecular", nombre: "Diagnóstico Molecular Clínico", semestre: 8, requisitos: ["integrador1"] },
  { id: "pensamiento_critico", nombre: "Procesamiento Crítico", semestre: 8 },

  // Semestre 9
  { id: "responsabilidad_social", nombre: "Responsabilidad Social", semestre: 9, requisitos: [] }, // check más adelante
  { id: "seminario_invest", nombre: "Seminario de Investigación BACIMET", semestre: 9, requisitos: [] }, // check más adelante

  // Semestre 10
  { id: "integrador2", nombre: "Integrador 2: Internado Clínico BACIMET", semestre: 10, requisitos: [] } // check más adelante
];

// Ajustes de prerrequisitos que requieren aprobar TODOS los anteriores:
// - integrador1 (sem 7) requiere TODOS los ramos hasta sem 6 aprobados
// - responsabilidad_social y seminario_invest (sem 9) requieren TODOS los ramos hasta sem 8 aprobados + integrador2
// - integrador2 (sem 10) requiere TODOS los anteriores aprobados

// Por simplicidad, vamos a definir funciones que marquen estas reglas en la lógica.

const mallaContainer = document.getElementById("malla-container");
const estado = document.getElementById("estado");

let estadosRamos = {}; // {id: "approved"|"failed"|null}

function crearTabla() {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");

  for(let s=1; s<=10; s++) {
    const th = document.createElement("th");
    th.textContent = `Semestre ${s}`;
    trHead.appendChild(th);
  }
  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  // máximo ramos por semestre
  const maxRamos = Math.max(...Array.from({length:10}, (_, i) => ramos.filter(r => r.semestre === i+1).length));
  for(let i=0; i<maxRamos; i++) {
    const tr = document.createElement("tr");
    for(let s=1; s<=10; s++) {
      const td = document.createElement("td");
      const ramosSem = ramos.filter(r => r.semestre === s);
      if(ramosSem[i]) {
        const ramo = ramosSem[i];
        const divRamo = document.createElement("div");
        divRamo.classList.add("ramo");
        divRamo.id = ramo.id;
        divRamo.textContent = ramo.nombre;
        td.appendChild(divRamo);
      }
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  mallaContainer.appendChild(table);
}

function puedenAprobar(ramo) {
  if(!ramo.requisitos || ramo.requisitos.length === 0) return true;
  return ramo.requisitos.every(req => estadosRamos[req] === "approved");
}

function checkEspeciales(ramo) {
  // integrador1 (sem7) requiere TODOS los ramos hasta sem6 aprobados
  if(ramo.id === "integrador1") {
    const hasta6 = ramos.filter(r => r.semestre <= 6);
    return hasta6.every(r => estadosRamos[r.id] === "approved");
  }
  // integrador2 (sem10) requiere TODOS los anteriores aprobados
  if(ramo.id === "integrador2") {
    return ramos.every(r => estadosRamos[r.id] === "approved");
  }
  // responsabilidad_social y seminario_invest (sem9) requieren TODOS los ramos hasta sem 8 aprobados + integrador2
  if(ramo.id === "responsabilidad_social" || ramo.id === "seminario_invest") {
    const hasta8 = ramos.filter(r => r.semestre <= 8);
    return hasta8.every(r => estadosRamos[r.id] === "approved") && estadosRamos["integrador2"] === "approved";
  }
  return true;
}

function actualizarEstados() {
  // Primero bloquear o desbloquear ramos según requisitos
  ramos.forEach(ramo => {
    const divRamo = document.getElementById(ramo.id);
    if (!divRamo) return;
    const puede = puedenAprobar(ramo) && checkEspeciales(ramo);
    if (estadosRamos[ramo.id] === "approved") {
      divRamo.classList.add("approved");
      divRamo.classList.remove("failed", "locked");
      divRamo.style.cursor = "pointer";
    } else if (estadosRamos[ramo.id] === "failed") {
      divRamo.classList.add("failed");
      divRamo.classList.remove("approved", "locked");
      divRamo.style.cursor = "pointer";
    } else {
      if (puede) {
        divRamo.classList.remove("locked", "approved", "failed");
        divRamo.style.cursor = "pointer";
      } else {
        divRamo.classList.add("locked");
        divRamo.classList.remove("approved", "failed");
        divRamo.style.cursor = "not-allowed";
      }
    }
  });
  mostrarEstadoGeneral();
}

function mostrarEstadoGeneral() {
  // Contar semestres atrasados (considerando desaprobados)
  // Por cada ramo desaprobado que está antes que uno aprobado en semestre mayor,
  // sumar semestres de atraso.
  let atrasos = 0;
  for(let s=1; s<=10; s++) {
    const ramosSem = ramos.filter(r => r.semestre === s);
    for(const ramo of ramosSem) {
      if(estadosRamos[ramo.id] === "failed") {
        atrasos += 1; // contar cada desaprobado como 1 atraso simple
      }
    }
  }
  estado.textContent = `Semestres atrasados estimados por desaprobados: ${atrasos}`;
}

function toggleEstado(id) {
  if(!estadosRamos[id]) estadosRamos[id] = null;
  if(estadosRamos[id] === null) estadosRamos[id] = "approved";
  else if(estadosRamos[id] === "approved") estadosRamos[id] = "failed";
  else estadosRamos[id] = null;
  actualizarEstados();
}

function agregarEventos() {
  ramos.forEach(ramo => {
    const divRamo = document.getElementById(ramo.id);
    if(!divRamo) return;
    divRamo.addEventListener("click", () => {
      if(divRamo.classList.contains("locked")) return;
      toggleEstado(ramo.id);
    });
  });
}

function init() {
  crearTabla();
  estadosRamos = {};
  actualizarEstados();
  agregarEventos();
}

init();
