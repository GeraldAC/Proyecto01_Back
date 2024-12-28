console.log("Este JS se ejecuta en el navegador")

// -- Obtener elementos del HTML y guardarlos
const createEditBtn = document.querySelector("#create-task")
const input = document.querySelector("#task-name")
const tasksDiv = document.querySelector("#tasks")

const baseBackendUrl = `${window.origin}/api`
console.log({ window, baseBackendUrl });


let TASK_TO_EDIT = null

// -- Agregar funcionalidad a los botones
createEditBtn.addEventListener("click", () => {
    const creating = !TASK_TO_EDIT
    const path = creating ? "tasks" : `tasks/${TASK_TO_EDIT._id}`
    const method = creating ? "POST" : "PUT"
    fetch(`${baseBackendUrl}/${path}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input.value })
    }).then((res) => {
        getTasks()
        input.value = ""
        createEditBtn.innerText = "Crear tarea"
        return res.json()
    }).then((resJSON) => {
        console.log({ resJSON })
    })
})

function getTasks() {
    tasksDiv.innerHTML = null
    fetch(`${baseBackendUrl}/tasks`)
    .then((res) => {
        return res.json()
    }).then((resJSON) => {
        const tasks = resJSON.data
        for (const task of tasks) {
            const taskParagraph = document.createElement("p")
            const deleteTaskBtn = document.createElement("button")
            const taskContainerDiv = document.createElement("div")
            deleteTaskBtn.innerText = "Borrar"
            taskParagraph.innerText = task.name
            deleteTaskBtn.setAttribute("id", task._id)
            deleteTaskBtn.addEventListener("click", (e) => {
                const taskId = e.target.id
                fetch(`${baseBackendUrl}/tasks/${taskId}`, {
                    method: "DELETE"
                })
                .then(() => {
                    const taskDiv = deleteTaskBtn.parentElement
                    taskDiv.remove()
                })
            })
            taskParagraph.addEventListener("click", (e) => {
                input.value = task.name
                createEditBtn.innerText = "Editar tarea"
                TASK_TO_EDIT = task
                console.log({ TASK_TO_EDIT });
            })
            taskContainerDiv.appendChild(taskParagraph)
            taskContainerDiv.appendChild(deleteTaskBtn)
            tasksDiv.appendChild(taskContainerDiv)
        }
    })
}

getTasks()