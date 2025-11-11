const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");

function auth(req, res, next) {
    const header = req.headers.authorization;
    
    if(!header) {
        return res.status(401).json({
            "mensagem": "Token não informado."
        });
    }

    const [type, token] = header.split(' ');

    if(type !== 'Bearer' || !token) {
        return res.status(401).json({
            "mensagem": "Formato do token inválido."
        });
    }

    try {
        const payload = jwt.verify(token, jwtSecret);

        req.user = payload;
        next();
    }

    catch (err) {
        return res.status(401).json({
            "mensagem": "Token inválido ou expirado."
        });
    }
}

module.exports = auth;