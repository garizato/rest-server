const jwt = require('jsonwebtoken');

// =========================
// VERIFICAR TOKEN
// =========================

let verificaToken = (req, res, next) => {

    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;

        next();
    });
};


// =========================
// VERIFICAR TOKEN
// =========================

let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();
        return;
    } else {
        return res.json({
            ok: false,
            message: 'Usuario no autorizado'
        });
    }
};


module.exports = {
    verificaToken,
    verificaAdmin_Role
}