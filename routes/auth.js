const express = require("express");
const { getCode, login } = require("../controllers/auth");
const router = express.Router();

/**
 * -- Ruta para solicitar un código de inicio de sesión.
 * -- @route POST /login/:email/code
 * -- @param {string} email - Dirección de correo electrónico del usuario.
 */
router.post("/login/:email/code", getCode);

/**
 * -- Ruta para iniciar sesión con el código proporcionado.
 * -- @route POST /login/:email
 * -- @param {string} email - Dirección de correo electrónico del usuario.
 */
router.post("/login/:email", login);

// -- Exportar el enrutador
module.exports = router;
