const ramos = [
  // Semestre 1
  { id: "anatomia", nombre: "Anatomía Humana", semestre: 1 },
  { id: "biologia", nombre: "Biología Celular", semestre: 1 },
  { id: "lab_biologia", nombre: "Laboratorio de Biología Celular", semestre: 1, requisitos: ["biologia"] },
  { id: "quimica_cel", nombre: "Química Celular", semestre: 1 },
  { id: "quimica_gen", nombre: "Química General", semestre: 1 },
  { id: "intro_tec", nombre: "Introducción a la Tecnología Médica", semestre: 1 },
  { id: "algebra", nombre: "Elemento de Álgebra y Cálculo", semestre: 1 },

  // Semestre 2
  { id: "histoembriologia", nombre: "Histoembriología", semestre: 2 },
  { id: "fisica_gen", nombre: "Física General", semestre: 2 },
  { id: "quimica_org", nombre: "Química Orgánica", semestre: 2 },
  { id: "ingles1", nombre: "Inglés I", semestre: 2 },
  { id: "habilidades_com", nombre: "Habilidades Comunicativas", semestre: 2 },

  // Semestre 3
  { id: "fisiologia", nombre: "Fisiología Humana", semestre: 3 },
  { id: "bioetica", nombre: "Bioética", semestre: 3 },
  { id: "bioquimica", nombre: "Bioquímica", semestre: 3 },
  { id: "infectologia", nombre: "Infectología", semestre: 3 },
  { id: "ingles2", nombre: "Inglés II", semestre: 3, requisitos: ["ingles1"] },
  { id: "razon_cient", nombre: "Razonamiento Científico y TICs", semestre: 3 },

  // Semestre 4
  { id: "fisiopato", nombre: "Fisiopatología", semestre: 4 },
  { id: "farmaco", nombre: "Farmacología General", semestre: 4 },
  { id: "parasitologia", nombre: "Parasitología", semestre: 4 },
  { id: "inmuno_diag", nombre: "Inmunología Diagnóstica", semestre: 4 },
  { id: "ingles3", nombre: "Inglés III", semestre: 4, requisitos: ["ingles2"] },

  // Semestre 5
  { id: "proc_tec_med", nombre: "Procedimientos de Tecnología Médica y Bioseguridad", semestre: 5, requisitos: ["farmaco"] },
  { id: "salud_pub1", nombre: "Salud Pública 1", semestre: 5, requisitos: ["fisiopato"] },
  { id: "microbio1", nombre: "Microbiología 1", semestre: 5, requisitos: ["parasitologia","farmaco"] },
  { id: "hema1", nombre: "Hematología 1", semestre: 5, requisitos: ["fisiopato","inmuno_diag"] },
  { id: "ingles4", nombre: "Inglés IV", semestre: 5, requisitos: ["ingles3"] },

  // Semestre 6
  { id: "salud_pub2", nombre: "Salud Pública 2", semestre: 6, requisitos: ["salud_pub1","proc_tec_med"] },
  { id: "microbio2", nombre: "Microbiología 2", semestre: 6, requisitos: ["microbio1"] },
  { id: "hema2", nombre: "Hematología 2", semestre: 6, requisitos: ["hema1"] },
  { id: "bioquim_clin1", nombre: "Bioquímica Clínica 1", semestre: 6, requisitos: ["inmuno_diag","hema1"] },

  // Semestre 7
  { id: "educ_salud", nombre: "Educación en Salud", semestre: 7, requisitos: ["salud_pub2"] },
  { id: "admin_gest_salud", nombre: "Administración y Gestión en Salud", semestre: 7, requisitos: ["salud_pub2","bioquim_clin1"] },
  { id: "biologia_mol", nombre: "Biología Molecular", semestre: 7, requisitos: ["bioquim_clin1"] },
  { id: "inmunohema", nombre: "Inmunohematología", semestre: 7, requisitos: ["hema1"] },
  { id: "bioquim_clin2", nombre: "Bioquímica Clínica 2", semestre: 7, requisitos: ["bioquim_clin1"] },
  { id: "integrador1", nombre: "Integrador 1: Caso Clínico BACIMET", semestre: 7, requisitos: [] },

  // Semestre 8
  { id: "metodo_inv", nombre: "Metodología de la Investigación", semestre: 8, requisitos: ["salud_pub2","integrador1"] },
  { id: "gestion_calidad", nombre: "Gestión y Aseguramiento de la Calidad", semestre: 8, requisitos: ["admin_gest_salud","integrador1"] },
  { id: "fisiopatologia2", nombre: "Fisiopatología 2", semestre: 8, requisitos: ["fisiopato"] },
  { id: "bioquim_clin3", nombre: "Bioquímica Clínica 3", semestre: 8, requisitos: ["bioquim_clin2"] },
  { id: "integrador2", nombre: "Integrador 2: Caso Clínico BACIMET", semestre: 8, requisitos: ["integrador1"] },

  // Semestre 9
  { id: "residencia", nombre: "Residencia Profesional", semestre: 9, requisitos: ["integrador2"] },

  // Semestre 10
  { id: "trabajo_grado", nombre: "Trabajo de Grado", semestre: 10, requisitos: ["residencia"] }
];

// Estado del ramo: aprobado, desaprobado o null (no cursado)
const estados = {};
// Contar cuántos semestres retrasados
let atrasos = 0;

const totalSemestres = 10;

function puedeCursar(ramo) {
  if (!ramo.requisitos || ramo.requisitos.length === 0) return true;

  // Todos los prerequisitos deben estar aprobados
  return ramo.requisitos.every(reqId => estados[reqId] === 'aprobado');
}

function actualizarTabla() {
  const tbody = document.getElementById("malla-body");
  tbody.innerHTML = "";

  // Construimos arreglo de arrays por semestre (columnas)
  // Para poder pintar filas, cada fila corresponde a un conjunto de ramos en las mismas posiciones de semestres.
  // Pero aquí por simplicidad, haremos una fila por cada máximo número de ramos por semestre.
  
  // Primero agrupamos ramos por semestre
  const ramosPorSemestre = [];
  for (let i = 1; i <= totalSemestres; i++) {
    ramosPorSemestre[i] = ramos.filter(r => r.semestre === i);
  }

  // Encontrar el máximo número de ramos en algún semestre
  const maxRamosFila = Math.max(...ramosPorSemestre.map(arr => arr.length || 0));

  // Construir las filas
  for (let fila = 0; fila < maxRamosFila; fila++) {
    const tr = document.createElement("tr");

    for (let s = 1; s <= totalSemestres; s++) {
      const td = document.createElement("td");
      const ramo = ramosPorSemestre[s][fila];
      if (ramo) {
        // Evaluar si puede cursar o está bloqueado por prerequisitos
        const aprobado = estados[ramo.id] === 'aprobado';
        const desaprobado = estados[ramo.id] === 'desaprobado';
        const puede = puedeCursar(ramo);

        const div = document.createElement("div");
        div.classList.add("ramo");
        div.textContent = ramo.nombre;
        div.title = `Semestre: ${ramo.semestre}\nID: ${ramo.id}\n` +
                    (ramo.requisitos && ramo.requisitos.length > 0 ? `Requisitos: ${ramo.requisitos.join(", ")}` : "Sin requisitos");
        
        if (aprobado) {
          div.classList.add("approved");
        } else if (desaprobado) {
          div.classList.add("failed");
        } else if (!puede) {
          div.classList.add("locked");
        }

        div.onclick = () => {
          if (div.classList.contains("locked")) return; // No cambiar estado si bloqueado

          // Cambiar ciclo aprobado -> desaprobado -> sin estado -> aprobado ...
          if (!estados[ramo.id]) {
            estados[ramo.id] = 'aprobado';
          } else if (estados[ramo.id] === 'aprobado') {
            estados[ramo.id] = 'desaprobado';
          } else if (estados[ramo.id] === 'desaprobado') {
            delete estados[ramo.id];
          }
          actualizarTabla();
          actualizarEstado();
        };

        td.appendChild(div);
      }
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }
}

function actualizarEstado() {
  // Calcular atrasos: contar cuántos ramos aprobados están con semestre anterior y aún no cursaron los anteriores

  atrasos = 0;

  for (const ramo of ramos) {
    if (estados[ramo.id] === 'aprobado') {
      // Para cada prerequisito del ramo, si no está aprobado y el semestre del prereq es anterior, es atraso
      if (ramo.requisitos && ramo.requisitos.length > 0) {
        for (const pre of ramo.requisitos) {
          const preRamo = ramos.find(r => r.id === pre);
          if (preRamo && preRamo.semestre < ramo.semestre) {
            if (estados[pre] !== 'aprobado') {
              atrasos++;
              break;
            }
          }
        }
      }
    }
  }

  const estadoDiv = document.getElementById("estado");
  if (atrasos > 0) {
    estadoDiv.textContent = `⚠️ Hay ${atrasos} atraso(s) de prerrequisitos para ramos aprobados.`;
  } else {
    estadoDiv.textContent = "✔️ Todos los prerrequisitos están cumplidos para los ramos aprobados.";
  }
}

// Iniciar tabla al cargar página
actualizarTabla();
actualizarEstado();

