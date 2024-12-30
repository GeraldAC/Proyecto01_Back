// -- Obtener elementos del HTML y guardarlos
const form = document.querySelector("form")
const emailInput = document.querySelector("#email")
const codeInput = document.querySelector("#code")
const codeBtn = document.querySelector("#codeBtn")

// -- Definir la URL base del backend
const baseBackendUrl = `${window.origin}/api`

// -- Agregar funcionalidad a los elementos del HTML
codeBtn.addEventListener("click", async (e) => {
    console.log("Solicitando código...")
    const res = await fetch(
        `${baseBackendUrl}/auth/login/${emailInput.value}/code`, 
        {
        method: "POST"
        }
    )
    const resJSON = await res.json()
    console.log({ resJSON });
})

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    console.log("Iniciando sesión...")
    const res = await fetch(`${baseBackendUrl}/auth/login/${emailInput.value}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ code: codeInput.value }),
    })
    const resJSON = await res.json()
    window.location.href = "/"
    console.log({ resJSON });
})