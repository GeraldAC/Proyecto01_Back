// -- Obtener elementos del HTML y guardarlos
const form = document.querySelector("form")
const emailInput = document.querySelector("#email")
const codeInput = document.querySelector("#code")
const codeBtn = document.querySelector("#codeBtn")

// -- Definir la URL base del backend
const baseBackendUrl = `${window.origin}/api`

let Swal = "Hola Mundo"

// -- Agregar funcionalidad a los elementos del HTML
codeBtn.addEventListener("click", async (e) => {
    console.log("Solicitando código...")
    try {

        if(!emailInput.value) {
            Swal.fire("UPS", "Debes ingresar el correo", "info")
            return
        }

        const res = await fetch(
            `${baseBackendUrl}/auth/login/${emailInput.value}/code`, 
            {
            method: "POST"
            }
        )
        const resJSON = await res.json()
        console.log({ resJSON });
    } catch (error) {
        console.log({ error });
    }
})

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    console.log("Iniciando sesión...")

    if(!emailInput.value || !codeInput.value) {
        Swal.fire("UPS", "Debes ingresar el correo y el código", "info")
        return
    }

    const res = await fetch(`${baseBackendUrl}/auth/login/${emailInput.value}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ code: codeInput.value }),
    })
    const resJSON = await res.json()
    window.location.href = "/"
    console.log({ resJSON });
})