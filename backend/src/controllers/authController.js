const jwt = require("jsonwebtoken")
const User = require("../models/User")
const { jwtSecret } = require("../config/env")

exports.register = async (req, res, next) => {
    try {
        const { username, senha, role } = req.body;

        const campos = ['username', 'senha'];

        const camposObrigatorios = [];

        for (let campo of campos) {
            if (!req.body[campo]) {
                camposObrigatorios.push(campo);
            }

        }
        if (camposObrigatorios.length > 0) {
            res.status(400).json({ error: 'Existem campos obrigatórios não preenchidos.', camposObrigatorios });
            return;
        }

        const existe = await User.findOne({ username });

        if (existe) {
            return res.status(400).json({
                "mensagem": "Usuário já cadastrado."
            });
        }

        const user = new User({
            username,
            passwordHash: senha,
            role: role ?? 0
        });

        await user.save();

        return res.status(201).json({
            "mensagem": "Usuário cadastrado com sucesso!"
        });
    }

    catch (err) {
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { username, senha } = req.body;

        const campos = ['username', 'senha'];

        const camposObrigatorios = [];

        for (let campo of campos) {
            if (!req.body[campo]) {
                camposObrigatorios.push(campo);
            }

        }
        if (camposObrigatorios.length > 0) {
            res.status(400).json({ error: 'Existem campos obrigatórios não preenchidos.', camposObrigatorios });
            return;
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({
                "mensagem": "Usuário não cadastrado."
            });
        }

        const ok = await user.validarSenha(senha);

        if (!ok) {
            return res.status(401).json({
                "mensagem": "Credênciais inválidas."
            });
        }

        const token = jwt.sign(
            {
                sub: user._id, username: user.username, role: user.role
            },
            jwtSecret,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        });

        return res.json({
            user: { id: user._id, username: user.username, role: user.role }
        });

    }

    catch (err) {
        next(err)
    }
}

exports.logout = async (req, res, next) => {
    res.clearCookie("token", { path: "/" });
    return res.json({ "mensagem": "Logout realizado." });
};