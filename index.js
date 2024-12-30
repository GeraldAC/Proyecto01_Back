// -- Importar dependencias
require("dotenv").config();

// -- Importar librerías
const express = require('express');
const cookieParser = require('cookie-parser');

// -- Importar módulos propios
const dbconnect = require("./db/connect");
const taskRoutes = require("./routes/task");
const authRoutes = require("./routes/auth");
const { jwtValidation } = require("./middlewares/jwtValidation");
const User = require("./models/user"); // Modelos de base de datos
const Task = require("./models/task");

// -- Crear aplicación
const app = express();

// -- Conectar a la base de datos
dbconnect();

// -- Middlewares
app.use(express.static('public', { extensions: ['html', 'css', 'js'] }));
app.use(express.json());
app.use(cookieParser());

// -- Configuración de rutas públicas
app.use("/api/auth", authRoutes);

// -- Middleware de validación JWT (Protección de rutas privadas)
app.use(jwtValidation);

// -- Configuración de rutas privadas
app.use("/api/tasks", taskRoutes);

// -- Configurar puerto y poner a escuchar el servidor
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

/**
 * Este archivo configura y ejecuta un servidor Express.
 * Incluye:
 * - Conexión a la base de datos
 * - Configuración de middlewares
 * - Rutas públicas y protegidas por JWT
 * - Inicio del servidor
 */
