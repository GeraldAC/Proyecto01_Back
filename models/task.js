// -- Importar librerías
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// -- Crear esquema
const taskSchema = new Schema({
    name: String,
    done: Boolean
})

// -- Crear modelo
const Task = mongoose.model("Task", taskSchema, "tasks")

// -- Exportar modelo
module.exports = { Task }