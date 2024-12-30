// -- Importar dependencias
require("dotenv").config()
// -- Importar librerías
const express = require('express')
// -- Crear aplicación
const app = express()

// -- Importar librerías
const dbconnect = require("./db/connect")

const cookieParser = require('cookie-parser')

const taskRoutes = require("./routes/task")
const authRoutes = require("./routes/auth")

const { jwtValidation } = require("./middlewares/jwtValidation")


// -- Conectar a la base de datos
dbconnect()

// -- Crear modelos
const User = require("./models/user")
const Task = require("./models/task")


// -- Middlewares
app.use(express.static('public', { extensions: ['html', 'css', 'js'] }));
app.use(express.json())
app.use(cookieParser())

// -- Configuración de routers
app.use("/api/auth", authRoutes)

// -- Middleware de validación JWT

app.use(jwtValidation)

// -- Configuración de routers - protegido
app.use("/api/tasks", taskRoutes)

// -- Configurar puerto
const port = process.env.PORT
// -- Poner a escuchar el servidor
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})