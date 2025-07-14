const ramos = [
  { id: "anatomia", nombre: "Anatomía Humana", semestre: 1 },
  { id: "biologia", nombre: "Biología Celular", semestre: 1 },
  { id: "lab_biologia", nombre: "Laboratorio de Biología Celular", semestre: 1 },
  { id: "quimica_celular", nombre: "Química Celular", semestre: 1 },
  { id: "quimica_general", nombre: "Química General", semestre: 1 },
  { id: "intro_tecnologia", nombre: "Introducción a la Tecnología Médica", semestre: 1 },
  { id: "algebra_calculo", nombre: "Elemento de Álgebra y Cálculo", semestre: 1 },

  { id: "histoembriologia", nombre: "Histoembriología", semestre: 2 },
  { id: "fisica_general", nombre: "Física General", semestre: 2 },
  { id: "quimica_organica", nombre: "Química Orgánica", semestre: 2 },
  { id: "ingles1", nombre: "Inglés I", semestre: 2 },
  { id: "habilidades_comunicativas", nombre: "Habilidades Comunicativas", semestre: 2 },

  { id: "fisiologia", nombre: "Fisiología Humana", semestre: 3 },
  { id: "bioetica", nombre: "Bioética", semestre: 3 },
  { id: "bioquimica", nombre: "Bioquímica", semestre: 3 },
  { id: "infectologia", nombre: "Infectología", semestre: 3 },
  { id: "ingles2", nombre: "Inglés II", semestre: 3, requisitos: ["ingles1"] },
  { id: "razonamiento_tics", nombre: "Razonamiento Científico y TICs", semestre: 3 },

  { id: "fisiopatologia", nombre: "Fisiopatología", semestre: 4 },
  { id: "farmacologia", nombre: "Farmacología General", semestre: 4 },
  { id: "parasitologia", nombre: "Parasitología", semestre: 4 },
  { id: "inmunologia", nombre: "Inmunología Diagnóstica", semestre: 4 },
  { id: "ingles3", nombre: "Inglés III", semestre: 4, requisitos: ["ingles2"] },

  { id: "procedimientos", nombre: "Procedimientos de Tecnología Médica y Bioseguridad", semestre: 5, requisitos: ["farmacologia"] },
  { id: "salud_publica1", nombre: "Salud Pública I", semestre: 5, requisitos: ["fisiopatologia", "inmunologia"] },
  { id: "microbiologia1", nombre: "Microbiología I", semestre: 5, requisitos: ["parasitologia", "farmacologia"] },
  { id: "hematologia1", nombre: "Hematología I", semestre: 5, requisitos: ["fisiopatologia", "inmunologia"] },
  { id: "ingles4", nombre: "Inglés IV", semestre: 5, requisitos: ["ingles3"] },

  { id: "salud_publica2", nombre: "Salud Pública II", semestre: 6, requisitos: ["salud_publica1", "procedimientos"] },
  { id: "microbiologia2", nombre: "Microbiología II", semestre: 6, requisitos: ["microbiologia1"] },
  { id: "hematologia2", nombre: "Hematología II", semestre: 6, requisitos: ["hematologia1"] },
  { id: "bioquimica_clinica1", nombre: "Bioquímica Clínica I", semestre: 6, requisitos: ["inmunologia", "hematologia1"] },

  { id: "educacion_salud", nombre: "Educación en Salud", semestre: 7, requisitos: ["salud_publica2"] },
  { id: "admin_gestion", nombre: "Administración y Gestión en Salud", semestre: 7, requisitos: ["salud_publica2", "bioquimica_clinica1"] },
  { id: "biologia_molecular", nombre: "Biología Molecular", semestre: 7, requisitos: ["bioquimica_clinica1"] },
  { id: "inmunohematologia", nombre: "Inmunohematología", semestre: 7, requisitos: ["hematologia1"] },
  { id: "bioquimica_clinica2", nombre: "Bioquímica Clínica II", semestre: 7, requisitos: ["bioquimica_clinica1"] },
  { id: "integrador1", nombre: "Integrador I: Caso Clínico BACIMET", semestre: 7 },

  { id: "metodologia", nombre: "Metodología de la Investigación", semestre: 8, requisitos: ["salud_publica2", "integrador1"] },
  { id: "gestion_calidad", nombre: "Gestión y Aseguramiento de la Calidad", semestre: 8, requisitos: ["admin_gestion", "integrador1"] },
  { id: "medicina_transfusional", nombre: "Medicina Transfusional", semestre: 8, requisitos: ["integrador1", "inmunohematologia"] },
  { id: "diagnostico_molecular", nombre: "Diagnóstico Molecular Clínico", semestre: 8, requisitos: ["integrador1"] },
  { id: "pensamiento_critico", nombre: "Pensamiento Crítico", semestre: 8 },

  { id: "responsabilidad_social", nombre: "Responsabilidad Social", semestre: 9 },
  { id: "seminario_investigacion", nombre: "Seminario de Investigación BACIMET", semestre: 9 },

  { id: "integrador2", nombre: "Integrador II: Internado Clínico BACIMET", semestre: 10 }
];

const estadoRamos = {};
ramos.forEach(r => estadoRamos[r.id] = "none");

const mallaContainer = document.getElementById("malla-container");
const estadoDiv = document.getElementById("estado");

function crearCelda(ramo) {
  const td = document.createElement("td");
  td.classList.add("ramo");
  td.textContent = ramo.nombre;
  td.dataset.id = ramo.id;
  td.dataset.semestre = ramo.semestre;

  actualizarEstadoCelda(td, estadoRamos[ramo.id]);

  td.addEventListener("click", () => {
    toggleEstado(ramo.id);
  });

  return td;
}

function actualizarEstadoCelda(td, estado) {
  td.classList.remove("approved", "failed", "locked");
  if (estado === "approved") {
    td.classList.add("approved");
  } else if (estado === "failed") {
    td.classList.add("failed");
  }
  if (!puedeTomarRamo(td.dataset.id)) {
    td.classList.add("locked");
  }
}

function puedeTomarRamo(id) {
  const ramo = ramos.find(r => r.id === id);
  if (!ramo.requisitos || ramo.requisitos.length === 0) return true;

  return ramo.requisitos.every(reqId => estadoRamos[reqId] === "approved");
}

function toggleEstado(id) {
  if (!puedeTomarRamo(id)) return;

  const estadoActual = estadoRamos[id];
  let nuevoEstado;
  if (estadoActual === "none") nuevoEstado = "approved";
  else if (estadoActual === "approved") nuevoEstado = "failed";
  else nuevoEstado = "none";

  estadoRamos[id] = nuevoEstado;

  renderMalla();
  mostrarEstadoGeneral();
}

function renderMalla() {
  mallaContainer.innerHTML = "";
  const tabla = document.createElement("table");
  tabla.classList.add("malla-table");

  // Crear encabezados
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  for (let i = 1; i <= 10; i++) {
    const th = document.createElement("th");
    th.textContent = `Semestre ${i}`;
    trHead.appendChild(th);
  }
  thead.appendChild(trHead);
  tabla.appendChild(thead);

  // Encontrar max cantidad de ramos por semestre para filas
  const maxFilas = Math.max(...[...Array(10).keys()].map(i => ramos.filter(r => r.semestre === i+1).length));

  // Crear cuerpo de tabla
  const tbody = document.createElement("tbody");
  for (let fila = 0; fila < maxFilas; fila++) {
    const tr = document.createElement("tr");
    for (let semestre = 1; semestre <= 10; semestre++) {
      const ramo = ramos.filter(r => r.semestre === semestre)[fila];
      if (ramo) {
        const td = crearCelda(ramo);
        tr.appendChild(td);
      } else {
        const td = document.createElement("td");
        tr.appendChild(td);
      }
    }
    tbody.appendChild(tr);
  }

  tabla.appendChild(tbody);
  mallaContainer.appendChild(tabla);
}

function mostrarEstadoGeneral() {
  // Calcular semestres atrasados (simples)
  let atrasados = 0;
  for (let i = 1; i <= 10; i++) {
    const ramosSemestre = ramos.filter(r => r.semestre === i);
    // Si alguno está desaprobado y no fue aprobado en semestres anteriores, se cuenta atraso
    const desaprobados = ramosSemestre.filter(r => estadoRamos[r.id] === "failed");
    if (desaprobados.length > 0) atrasados++;
  }

  estadoDiv.textContent = `Semestres atrasados: ${atrasados}`;
}

renderMalla();
mostrarEstadoGeneral();
const ramos = [
  { id: "anatomia", nombre: "Anatomía Humana", semestre: 1 },
  { id: "biologia", nombre: "Biología Celular", semestre: 1 },
  // Agrega aquí todos los ramos igual que tu lista original...
];

const mallaContainer = document.getElementById("malla-container");

function crearRamo(ramo) {
  const div = document.createElement("div");
  div.classList.add("ramo");
  div.innerText = ramo.nombre;
  div.dataset.id = ramo.id;
  div.dataset.semestre = ramo.semestre;
  div.addEventListener("click", () => {
    div.classList.toggle("approved");
    console.log(`Ramo ${ramo.nombre} clickeado`);
  });
  return div;
}

function renderMalla() {
  mallaContainer.innerHTML = "";
  for (let semestre = 1; semestre <= 10; semestre++) {
    const semestreTitle = document.createElement("div");
    semestreTitle.classList.add("semestre-title");
    semestreTitle.innerText = `Semestre ${semestre}`;
    mallaContainer.appendChild(semestreTitle);

    const semestreRamos = ramos.filter(r => r.semestre === semestre);
    semestreRamos.forEach(ramo => {
      const ramoDiv = crearRamo(ramo);
      mallaContainer.appendChild(ramoDiv);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderMalla();
});

