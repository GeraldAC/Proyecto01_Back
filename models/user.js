// -- Importar librerías
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// -- Crear esquema
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    login_code: String,
})

// -- Crear modelo
const User = mongoose.model("User", userSchema, "users")

// -- Exportar modelo
module.exports = { User }