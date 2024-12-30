const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

/**
 * -- Controlador para solicitar un código de inicio de sesión.
 * -- Genera y envía un código aleatorio al usuario identificado por su correo.
 *
 * -- @param {Object} req - Objeto de solicitud de Express.
 * -- @param {Object} res - Objeto de respuesta de Express.
 */
const getCode = async (req, res) => {
    try {
        console.log("Solicitando código...");
        const { email } = req.params;

        // -- Buscar usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ ok: false, message: "Usuario con ese correo no encontrado" });
        }

        // -- Generar código aleatorio
        const code = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");
        console.log("Código generado: ", code);

        // -- Guardar código en la base de datos
        user.login_code = code;
        await user.save();

        // -- Enviar código
        res.status(200).json({ ok: true, message: "Código enviado con éxito", code });
    } catch (error) {
        console.error("Error al generar el código:", error);
        res.status(500).json({ ok: false, message: "Error interno del servidor" });
    }
};

/**
 * -- Controlador para iniciar sesión con un código.
 * -- Verifica las credenciales y genera un token JWT en caso exitoso.
 *
 * -- @param {Object} req - Objeto de solicitud de Express.
 * -- @param {Object} res - Objeto de respuesta de Express.
 */
const login = async (req, res) => {
    try {
        const { email } = req.params;
        const { code } = req.body;

        // -- Buscar usuario por email y código
        const user = await User.findOne({ email, login_code: code });
        if (!user) {
            return res
                .status(400)
                .json({ ok: false, message: "Credenciales incorrectas..." });
        }

        // -- Generar token
        const tokenPayload = {
            id: user._id,
            firstName: user.firstName,
            email: user.email,
        };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY);
        console.log({ token });

        // -- Enviar token
        res.cookie("jwt", token);

        // -- Enviar respuesta
        res.status(200).json({
            ok: true,
            data: tokenPayload,
            message: "Inicio de sesión exitoso...",
        });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ ok: false, message: "Error interno del servidor" });
    }
};

// -- Exportar controladores
module.exports = { getCode, login };
