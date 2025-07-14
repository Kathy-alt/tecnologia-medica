const ramos = [
  // Semestre 1
  { id: "anatomia", nombre: "Anatomía Humana", semestre: 1 },
  { id: "biologia", nombre: "Biología Celular", semestre: 1 },
  { id: "lab_biologia", nombre: "Laboratorio de Biología Celular", semestre: 1 },
  { id: "quimica_celular", nombre: "Química Celular", semestre: 1 },
  { id: "quimica_general", nombre: "Química General", semestre: 1 },
  { id: "intro_tecnologia", nombre: "Introducción a la Tecnología Médica", semestre: 1 },
  { id: "algebra_calculo", nombre: "Elemento de Álgebra y Cálculo", semestre: 1 },

  // Semestre 2
  { id: "histoembriologia", nombre: "Histoembriología", semestre: 2 },
  { id: "fisica_general", nombre: "Física General", semestre: 2 },
  { id: "quimica_organica", nombre: "Química Orgánica", semestre: 2 },
  { id: "ingles1", nombre: "Inglés I", semestre: 2 },
  { id: "habilidades_comunicativas", nombre: "Habilidades Comunicativas", semestre: 2 },

  // Semestre 3
  { id: "fisiologia", nombre: "Fisiología Humana", semestre: 3 },
  { id: "bioetica", nombre: "Bioética", semestre: 3 },
  { id: "bioquimica", nombre: "Bioquímica", semestre: 3 },
  { id: "infectologia", nombre: "Infectología", semestre: 3 },
  { id: "ingles2", nombre: "Inglés II", semestre: 3, requisitos: ["ingles1"] },
  { id: "razonamiento_tics", nombre: "Razonamiento Científico y TICs", semestre: 3 },

  // Semestre 4
  { id: "fisiopatologia", nombre: "Fisiopatología", semestre: 4 },
  { id: "farmacologia", nombre: "Farmacología General", semestre: 4 },
  { id: "parasitologia", nombre: "Parasitología", semestre: 4 },
  { id: "inmunologia", nombre: "Inmunología Diagnóstica", semestre: 4 },
  { id: "ingles3", nombre: "Inglés III", semestre: 4, requisitos: ["ingles2"] },

  // Semestre 5
  { id: "procedimientos", nombre: "Procedimientos de Tecnología Médica y Bioseguridad", semestre: 5, requisitos: ["farmacologia"] },
  { id: "salud_publica1", nombre: "Salud Pública I", semestre: 5, requisitos: ["fisiopatologia", "inmunologia"] },
  { id: "microbiologia1", nombre: "Microbiología I", semestre: 5, requisitos: ["parasitologia", "farmacologia"] },
  { id: "hematologia1", nombre: "Hematología I", semestre: 5, requisitos: ["fisiopatologia", "inmunologia"] },
  { id: "ingles4", nombre: "Inglés IV", semestre: 5, requisitos: ["ingles3"] },

  // Semestre 6
  { id: "salud_publica2", nombre: "Salud Pública II", semestre: 6, requisitos: ["salud_publica1", "procedimientos"] },
  { id: "microbiologia2", nombre: "Microbiología II", semestre: 6, requisitos: ["microbiologia1"] },
  { id: "hematologia2", nombre: "Hematología II", semestre: 6, requisitos: ["hematologia1"] },
  { id: "bioquimica_clinica1", nombre: "Bioquímica Clínica I", semestre: 6, requisitos: ["inmunologia", "hematologia1"] },

  // Semestre 7
  { id: "educacion_salud", nombre: "Educación en Salud", semestre: 7, requisitos: ["salud_publica2"] },
  { id: "admin_gestion", nombre: "Administración y Gestión en Salud", semestre: 7, requisitos: ["salud_publica2", "bioquimica_clinica1"] },
  { id: "biologia_molecular", nombre: "Biología Molecular", semestre: 7, requisitos: ["bioquimica_clinica1"] },
  { id: "inmunohematologia", nombre: "Inmunohematología", semestre: 7, requisitos: ["hematologia1"] },
  { id: "bioquimica_clinica2", nombre: "Bioquímica Clínica II", semestre: 7, requisitos: ["bioquimica_clinica1"] },
  { id: "integrador1", nombre: "Integrador I: Caso Clínico BACIMET", semestre: 7, requisitos: [] }, // se considerará desbloqueado sólo si se aprueban todos anteriores

  // Semestre 8
  { id: "metodologia", nombre: "Metodología de la Investigación", semestre: 8, requisitos: ["salud_publica2", "integrador1"] },
  { id: "gestion_calidad", nombre: "Gestión y Aseguramiento de la Calidad", semestre: 8, requisitos: ["admin_gestion", "integrador1"] },
  { id: "medicina_transfusional", nombre: "Medicina Transfusional", semestre: 8, requisitos: ["integrador1", "inmunohematologia"] },
  { id: "diagnostico_molecular", nombre: "Diagnóstico Molecular Clínico", semestre: 8, requisitos: ["integrador1"] },
  { id: "pensamiento_critico", nombre: "Pensamiento Crítico", semestre: 8 },

  // Semestre 9
  { id: "responsabilidad_social", nombre: "Responsabilidad Social", semestre: 9, requisitos: [] }, // requiere aprobar todo hasta 8
  { id: "seminario_investigacion", nombre: "Seminario de Investigación BACIMET", semestre: 9, requisitos: [] }, // idem

  // Semestre 10
  { id: "integrador2", nombre: "Integrador II: Internado Clínico BACIMET", semestre: 10, requisitos: [] } // idem
];

// Estado de aprobación: "none" (sin aprobar), "approved", "failed"
const estadoRamos = {}; // id -> estado

const mallaContainer = document.getElementById("malla-container");
const estadoDiv = document.getElementById("estado");

// Inicializa todos los ramos con estado none
ramos.forEach(r => estadoRamos[r.id] = "none");

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
  // Lock si prerrequisitos no aprobados
  if (!puedeTomarRamo(td.dataset.id)) {
    td.classList.add("locked");
  }
}

function puedeTomarRamo(id) {
  const ramo = ramos.find(r => r.id === id);
  if (!ramo.requisitos || ramo.requisitos.length === 0) return true;

  return ramo.requisitos.every(reqId => estadoRamos[reqId] === "approved");
}

// Cambia el estado del ramo en ciclo none -> approved -> failed -> none
function toggleEstado(id) {
  if (!puedeTomarRamo(id)) return; // no permite cambiar estado si bloqueado

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

  // Crear encabezado (semestres)
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  for(let i=1; i<=10; i++) {
    const th = document.createElement("th");
    th.textContent = `Semestre ${i}`;
    trHead.appendChild(th);
  }
  thead.appendChild(trHead);
  tabla.appendChild(thead);

  // Calcular número máximo de ramos por semestre para filas
  const maxRamos = Math.max(...Array.from({length:10}, (_,i) => ramos.filter(r => r.semestre === i+1).length));

  // Crear cuerpo con filas por ramos
  const tbody = document.createElement("tbody");
  for(let fila=0; fila<maxRamos; fila++) {
    const tr = document.createElement("tr");
    for(let semestre=1; semestre<=10; semestre++) {
      const ramosSemestre = ramos.filter(r => r.semestre === semestre);
      if (fila < ramosSemestre.length) {
        const td = crearCelda(ramosSemestre[fila]);
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
  // Aquí puedes calcular semestres atrasados o resumen
  // Por simplicidad, solo contamos cuántos aprobados y fallados
  let aprobados = 0, fallados = 0;
  for (const estado of Object.values(estadoRamos)) {
    if (estado === "approved") aprobados++;
    else if (estado === "failed") fallados++;
  }
  estadoDiv.textContent = `Aprobados: ${aprobados} | Desaprobados: ${fallados}`;
}

renderMalla();
mostrarEstadoGeneral();


// Iniciar tabla al cargar página
actualizarTabla();
actualizarEstado();

