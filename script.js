
const ramos = {
  "1-1": [
    { nombre: "Introducción y Praxis de la Psicología", abre: ["Procesos Psicológicos Individuales y Relacionales"] },
    { nombre: "Constructivismo I: Conversaciones y Emociones", abre: ["Práctica Inicial"] },
    { nombre: "Psicobiología I", abre: ["Psicobiología II"] },
    { nombre: "Bases Socioantropológicas de la Psicología", abre: [] },
    { nombre: "Epistemología", abre: [] }
  ],
  "1-2": [
    { nombre: "Procesos Psicológicos Individuales y Relacionales", abre: [] },
    { nombre: "Psicobiología II", abre: [] },
    { nombre: "Enfoques Psicoanalítico y Humanista", abre: [] },
    { nombre: "Metodología Cuantitativa", abre: ["Análisis de Datos Cuantitativos"] },
    { nombre: "Certificación 1", abre: ["Certificación 2"] },
    { nombre: "Electivo 1", abre: ["Electivo 2"] }
  ],
  "2-1": [
    { nombre: "Psicología del Desarrollo I", abre: ["Psicología del Desarrollo II"] },
    { nombre: "Psicología Social I", abre: ["Psicología Social II"] },
    { nombre: "Psicología Cognitiva y Conductual", abre: [] },
    { nombre: "Psicología Sistémica", abre: [] },
    { nombre: "Análisis de Datos Cuantitativos", abre: ["Metodología Cualitativa"] },
    { nombre: "Electivo 2", abre: ["Electivo 3"] }
  ],
  "2-2": [
    { nombre: "Psicología del Desarrollo II", abre: [] },
    { nombre: "Psicología Social II", abre: [] },
    { nombre: "Práctica Inicial", abre: ["Constructivismo II: Entrevistas Psicológicas"] },
    { nombre: "Psicología de la Comunicación", abre: [] },
    { nombre: "Metodología Cualitativa", abre: ["Análisis de Datos Cualitativos"] },
    { nombre: "Electivo 3", abre: ["Electivo 4"] }
  ],
  "3-1": [
    { nombre: "Psicopatología Adulto", abre: ["Psiquiatría"] },
    { nombre: "Evaluación y Procesos Psicodiagnósticos Adulto I", abre: ["Evaluación y Procesos Psicodiagnósticos Adulto II"] },
    { nombre: "Psicopatología y Psicodiagnóstico Infanto Juvenil I", abre: ["Psicopatología y Psicodiagnóstico Infanto Juvenil II"] },
    { nombre: "Procesos Psicosociales en Organizaciones", abre: ["Análisis y Diagnóstico del Trabajo y Organizaciones"] },
    { nombre: "Análisis de Datos Cualitativos", abre: [] },
    { nombre: "Certificación 2", abre: ["Certificación 3"] }
  ],
  "3-2": [
    { nombre: "Psiquiatría", abre: [] },
    { nombre: "Evaluación y Procesos Psicodiagnósticos Adulto II", abre: ["Evaluación y Procesos Psicodiagnósticos Adulto III"] },
    { nombre: "Psicopatología y Psicodiagnóstico Infanto Juvenil II", abre: [] },
    { nombre: "Análisis y Diagnóstico del Trabajo y Organizaciones", abre: [] },
    { nombre: "Constructivismo II: Entrevistas Psicológicas", abre: ["Constructivismo III: Construcción de Problemas"] },
    { nombre: "Electivo 4", abre: [] }
  ],
  "4-1": [
    { nombre: "Optativo Temas Profesionales de la Psicología", abre: [] },
    { nombre: "Evaluación y Procesos Psicodiagnósticos Adulto III", abre: [] },
    { nombre: "Análisis y comprensión de proccesos educativos", abre: ["Taller de Intervención en Psicología Educacional"] },
    { nombre: "Optativo Temas Emergentes en Psicología", abre: [] },
    { nombre: "Constructivismo III: Construcción de Problemas", abre: [] },
    { nombre: "Formulación y Evaluación de Proyectos Psicosociales", abre: ["Proyecto de Licenciatura"] }
  ],
  "4-2": [
    { nombre: "Taller de Intervención en Psicología Clínica", abre: [] },
    { nombre: "Taller de Intervención en Psicología Educacional", abre: [] },
    { nombre: "Taller de Intervención en Psicología Organizacional", abre: [] },
    { nombre: "Taller de Intervención en Psicología Jurídica y Sociocomunitaria", abre: [] },
    { nombre: "Proyecto de Licenciatura", abre: ["Optativo de profundización I", "Optativo de profundización II"] }
  ],
  "5-1": [
    { nombre: "Optativo de profundización I", abre: ["Optativo de profundización III"] },
    { nombre: "Optativo de profundización II", abre: ["Optativo de profundización IV"] },
    { nombre: "Práctica Profesional I", abre: ["Práctica Profesional II"] }
  ],
  "5-2": [
    { nombre: "Optativo de profundización III", abre: [] },
    { nombre: "Optativo de profundización IV", abre: [] },
    { nombre: "Práctica Profesional II", abre: [] }
  ]
};

const estadoRamos = {};

function crearMalla() {
  const malla = document.getElementById("malla");

  for (const semestre in ramos) {
    const contenedorSemestre = document.createElement("div");
    contenedorSemestre.className = "semestre";
    contenedorSemestre.innerHTML = `<h2>Semestre ${semestre}</h2>`;

    ramos[semestre].forEach(ramo => {
      const div = document.createElement("div");
      div.className = "ramo bloqueado";
      div.textContent = ramo.nombre;
      div.addEventListener("click", () => aprobarRamo(ramo.nombre));

      estadoRamos[ramo.nombre] = {
        element: div,
        aprobado: false,
        requisitos: [],
        abre: ramo.abre
      };

      contenedorSemestre.appendChild(div);
    });

    malla.appendChild(contenedorSemestre);
  }

  // Establecer relaciones inversas
  for (const nombre in estadoRamos) {
    const data = estadoRamos[nombre];
    data.abre.forEach(destino => {
      if (!estadoRamos[destino].requisitos) estadoRamos[destino].requisitos = [];
      estadoRamos[destino].requisitos.push(nombre);
    });
  }

  // Activar los que no tienen requisitos
  for (const nombre in estadoRamos) {
    if (!estadoRamos[nombre].requisitos.length) {
      estadoRamos[nombre].element.classList.remove("bloqueado");
    }
  }
}

function aprobarRamo(nombre) {
  const ramo = estadoRamos[nombre];
  if (!ramo || ramo.aprobado) return;
  ramo.aprobado = true;
  ramo.element.classList.add("aprobado");

  for (const siguiente of ramo.abre) {
    const siguienteRamo = estadoRamos[siguiente];
    if (!siguienteRamo.requisitos.some(req => !estadoRamos[req].aprobado)) {
      siguienteRamo.element.classList.remove("bloqueado");
    }
  }
}

crearMalla();
