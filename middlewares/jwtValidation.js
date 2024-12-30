const jwt = require('jsonwebtoken');

/**
 * -- Middleware para validar un token JWT.
 * -- Verifica que el token proporcionado en las cookies sea válido.
 *
 * -- @param {Object} req - Objeto de solicitud de Express.
 * -- @param {Object} res - Objeto de respuesta de Express.
 * -- @param {Function} next - Función para pasar al siguiente middleware.
 */
const jwtValidation = (req, res, next) => {
    try {
        // -- Obtener el token de las cookies
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ ok: false, message: "No autorizado. Token no proporcionado." });
        }

        // -- Verificar el token
        const validPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log({ validPayload });

        // -- Pasar al siguiente middleware si es válido
        next();
    } catch (err) {
        res.status(401).json({
            ok: false,
            message: "No autorizado. Token inválido.",
            error: err.message,
        });
    }
};

// -- Exportar el middleware
module.exports = { jwtValidation };
