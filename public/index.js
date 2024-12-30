console.log("Este JS se ejecuta en el navegador")

// -- Obtener elementos del HTML y guardarlos
const createEditBtn = document.querySelector("#create-task")
const input = document.querySelector("#task-name")
const tasksDiv = document.querySelector("#tasks")

const baseBackendUrl = `${window.origin}/api`

let TASK_TO_EDIT = null

// -- Agregar funcionalidad a los botones
createEditBtn.addEventListener("click", async () => {
    const creating = !TASK_TO_EDIT
    const path = creating ? "tasks" : `tasks/${TASK_TO_EDIT._id}`
    const method = creating ? "POST" : "PUT"
    
    const res = await fetch(`${baseBackendUrl}/${path}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input.value })
    })
    getTasks()
    input.value = ""
    createEditBtn.innerText = "Crear tarea"
    const resJSON = await res.json()
    console.log({ resJSON })
})

async function getTasks() {
    try {
        tasksDiv.innerHTML = null
        const res = await fetch(`${baseBackendUrl}/tasks`)
        const resJSON = await res.json()
        const tasks = resJSON.data
        for (const task of tasks) {
            const taskParagraph = document.createElement("span")
            const deleteTaskIcon = document.createElement("i")
            const taskContainerDiv = document.createElement("div")
            deleteTaskIcon.classList.add("fa-regular", "fa-trash-can")
            taskParagraph.innerText = task.name
            deleteTaskIcon.setAttribute("id", task._id)
            deleteTaskIcon.addEventListener("click", (e) => {
                const taskId = e.target.id
                fetch(`${baseBackendUrl}/tasks/${taskId}`, {
                    method: "DELETE"
                })
                .then(() => {
                    const taskDiv = deleteTaskIcon.parentElement
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
            taskContainerDiv.appendChild(deleteTaskIcon)
            tasksDiv.appendChild(taskContainerDiv)
        }
    } catch (error) {
        console.log({ error });
    } finally {
        TASK_TO_EDIT = null
    }
}

getTasks()