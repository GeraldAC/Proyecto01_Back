require("dotenv").config()

const express = require('express')
const app = express()
const port = process.env.PORT

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// -- Configurar conexión a la base de datos
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Conexión a la base de datos establecida...")
    })
    .catch((err) => {
        console.log("Error al conectarse a la base de datos...", {err});
    })

// -- Crear el esquema
const taskSchema = new Schema({
    name: String,
    done: Boolean
})

// -- Crear el modelo
const Task = mongoose.model("Task", taskSchema, "tasks")

// -- Middlewares
app.use(express.static('public'))
app.use(express.json())

// -- Configurar rutas
app.get("/api/tasks", (req, res) => {
    Task.find()
    .then((tasks) => {
        res.status(200).json({ ok: true, data: tasks})
    })
    .catch((err) => {
        res.status(400).json({ ok: false, message: "Error al obtener las tareas", error: err})
    })
})

app.post("/api/tasks", (req, res) => {
    const body = req.body
    console.log({ body })
    Task
    .create({
        name: body.text,
        done: false
    })
    .then((createdTask) => {
        res.status(201).json({ ok: true, message: "Tarea creada con exito", data: createdTask})
    })
    .catch((err) => {
        res.status(400).json({ ok: false, message: "Error al crear la tarea", error: err})
    })
})

app.delete("/api/tasks/:id", (req, res) => {
    const id = req.params.id
    Task.findByIdAndDelete(id)
    .then((deletedTask) => {
        res.status(200).json({ ok: true, message: "Tarea eliminada con exito", data: deletedTask})
    })
    .catch((err) => {
        res.status(400).json({ ok: false, message: "Error al eliminar la tarea", error: err})
    })
})

app.put("/api/tasks/:id", (req, res) => {
    const body = req.body
    const id = req.params.id

    Task.findByIdAndUpdate(id, {
        name: body.text
    })
    .then((updateTask) => {
        res.status(200).json({ ok: true, message: "Tarea editada con exito", data: updateTask})
    })
    .catch((err) => {
        res.status(400).json({ ok: false, message: "Error al editar la tarea", error: err})
    })
})

// -- Poner a escuchar el servidor
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})