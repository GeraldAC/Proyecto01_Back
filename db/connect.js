// -- Importar librerías
const mongoose = require('mongoose');

/**
 * -- Configura la conexión a la base de datos MongoDB.
 * -- Usa la URL de conexión definida en la variable de entorno `MONGODB_URL`.
 */
const dbconnect = () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Conexión a la base de datos establecida MongoDB...");
        })
        .catch((err) => {
            console.error("Error al conectarse a la base de datos:", err);
        });
};

// -- Exportar función
module.exports = dbconnect;
