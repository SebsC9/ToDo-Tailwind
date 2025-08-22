const form = document.getElementById("formTarea");
const tareaInput = document.getElementById("tareaInput");
const btnAgregar = document.getElementById("btnAgregar");
const listaTareas = document.getElementById("listaTareas");
const btnEliminarTodas = document.getElementById("btnEliminar");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    agregarTarea();
});

function agregarTarea(texto = tareaInput.value.trim(), completada = false) {
    if (texto !== "") {
        const li = document.createElement("li");
        li.className = "flex items-center justify-between gap-2 p-2 bg-stone-700 rounded mb-2";

        const leftDiv = document.createElement("div");
        leftDiv.className = "flex items-center gap-2";

        const span = document.createElement("span");
        span.textContent = texto;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = completada;
        checkbox.className = "mr-2";

        checkbox.addEventListener("change", function() {
            if (checkbox.checked) {
                li.classList.add("line-through", "text-gray-800");
            } else {
                li.classList.remove("line-through", "text-gray-800");
            }
            guardarTareas();
        });

        if (completada) {
            li.classList.add("line-through", "text-gray-800");
        }

        const eliminarBtn = document.createElement("button");
        eliminarBtn.className = "bg-red-500 text-white rounded px-2";
        
        eliminarBtn.textContent = "X";
        eliminarBtn.addEventListener("click", function() {
            listaTareas.removeChild(li);
            guardarTareas();
        });

        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(span);

        li.appendChild(leftDiv);
        li.appendChild(eliminarBtn);

        listaTareas.appendChild(li);

        guardarTareas();
        tareaInput.value = "";
    } else {
        alert("Por favor, ingresa una tarea.");
    }
}


function guardarTareas() {
    const tareas = [];
    const items = listaTareas.getElementsByTagName("li");
    for (let i = 0; i < items.length; i++) {
        const tarea = items[i].getElementsByTagName("span")[0].textContent;
        const completada = items[i].getElementsByTagName("input")[0].checked;
        tareas.push({ tarea, completada });
    }
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function cargarTareas () {
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.forEach(t => {
        agregarTarea(t.tarea, t.completada);
    });
}

btnEliminarTodas.addEventListener("click", () => {
    listaTareas.innerHTML = "";
    localStorage.removeItem("tareas");
});

cargarTareas();