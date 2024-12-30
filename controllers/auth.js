const { User } = require("../models/user")
const jwt = require('jsonwebtoken')

const getCode = async (req, res) => {
    console.log("Solicitando código...");
    const { email } = req.params
    // -- Buscar usuario por email
    const user = await User.findOne({ email })
    if (!user) {
        // await User.create({ firstName: "Usuario", lastName: "Nuevo", email })
        return res
            .status(400)
            .json({ ok: false, message: "Usuario con ese correo no encontrado"})
    }
    // -- Generar código aleatorio
    let code = ""
    for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 9)
    }
    console.log("Código generado: ", code);
    // -- Guardar código en la base de datos
    user.login_code = code
    await user.save()
    // -- Enviar código
    res.status(200).json({ ok: true, message: "Código enviado con exito", code })
}

const login = async (req, res) => {
    const { email } = req.params
    const { code } = req.body

    // -- Buscar usuario por email
    const user = await User.findOne({ email, login_code: code })

    if (!user) {
        return res
            .status(400)
            .json({ ok: false, message: "Credeciales incorrectas..."})
    }

    // -- Generar token
    const tokenPayload = {
        id: user._id,
        firstName: user.firstName,
        email: user.email
    }
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY)
    console.log({ token })
    // -- Enviar token
    res.cookie("jwt", token)
    // -- Enviar respuesta
    res.status(200).json({ ok: true, data: tokenPayload, message: "Inicio de sesión exitoso..." })
}

module.exports = { getCode, login }