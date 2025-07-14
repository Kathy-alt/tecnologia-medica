# 💉 Tecnología Médica mención BACIMET — Malla Interactiva

Bienvenido/a a la **malla interactiva** de la carrera **Tecnología Médica mención BACIMET** (UNAB Diurna).  
Esta herramienta te permite:

✅ Marcar ramos como aprobados  
❌ Marcar ramos como reprobados  
🔒 Visualizar requisitos bloqueados  
📊 Ver cuántos **semestres de atraso** llevas, calculados automáticamente  

---

## 🎨 Estilo

El diseño utiliza **tonos burdeos y rosados** (color institucional de salud) con una estructura clara por semestre.  
Cada ramo es un cuadrado interactivo con los siguientes estados:

- 🟣 **Aprobado**: Color fucsia intenso
- ⚪ **Disponible**: Rosa claro
- 🔒 **Bloqueado**: Gris claro (no cumple requisitos aún)
- ❌ **Reprobado**: Gris oscuro

---

## 🧠 Lógica funcional

- Puedes hacer clic sobre cualquier ramo para cambiar su estado:  
  `Disponible → Aprobado → Reprobado → Disponible`
- Cuando apruebas un ramo, desbloquea automáticamente los que dependen de él.
- Si repruebas un ramo, los siguientes se bloquean y se acumulan **semestres de atraso**.
- La cuenta de atraso se muestra dinámicamente al final de la malla.

---

## 🗂 Estructura del proyecto

---

## 🚀 ¿Cómo usarlo?

1. Descarga o clona el repositorio.
2. Abre `index.html` en tu navegador.
3. Haz clic en los ramos para simular tu progreso académico.
4. Observa los ramos que se desbloquean o bloquean.
5. Consulta los **semestres de atraso** en la parte inferior.

---

## 🏥 Carrera simulada

La malla corresponde a la mención **BACIMET** (Banco de Sangre, Laboratorio Clínico e Imagenología), e incluye los **10 semestres oficiales**, con **requisitos reales** según la planificación académica UNAB.

---

## 📌 Créditos

Este simulador fue desarrollado con el fin de ayudar a estudiantes de Tecnología Médica UNAB a **visualizar su avance académico** y planificar su carga de ramos con claridad.

---

## 🧩 Próximas mejoras (sugerencias)

- Guardar el progreso con `localStorage` o base de datos
- Exportar como PDF o imagen
- Mostrar malla por año
- Mostrar créditos o carga horaria por ramo

---

**Colores clave:**

| Estado       | Color        |
|--------------|--------------|
| Aprobado     | `#ff69b4`    |
| Reprobado    | `#ccc`       |
| Disponible   | `#ffc0cb`    |
| Bloqueado    | `#ffe6ec`    |
| Bordes clave | `#c71585`    |

---

_Disfruta organizando tu carrera de forma visual y eficiente_ ❤️‍🩹  

