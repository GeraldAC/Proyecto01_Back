// -- Importar librerías
const mongoose = require('mongoose')

// -- Configurar conexión a la base de datos
const dbconnect = () => {
    mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Conexión a la base de datos establecida MongoDB...")
    })
    .catch((err) => {
        console.log("Error al conectarse a la base de datos...", {err});
    })
}

// -- Exportar función
module.exports = dbconnect