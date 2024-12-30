const jwt = require('jsonwebtoken')

const jwtValidation = (req, res, next) => {
    try {
        const token = req.cookies.jwt
        const validPayload = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log({ validPayload });
        next()
    } catch (err) {
        res.status(401).json({ ok: false, message: "No autorizado. Invalid TOKEN", error: err})
    }
}

module.exports = { jwtValidation }