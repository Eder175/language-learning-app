"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const sendMessage = (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: 'Corpo da requisição vazio.' });
    }
    if (typeof req.body.user !== 'string' || !req.body.user.trim()) {
        return res.status(400).json({ error: 'Campo "user" é obrigatório e deve ser uma string não vazia.' });
    }
    if (typeof req.body.message !== 'string' || !req.body.message.trim()) {
        return res.status(400).json({ error: 'Campo "message" é obrigatório e deve ser uma string não vazia.' });
    }
    const { user, message } = req.body;
    const reply = `Olá, ${user}! Você disse: "${message}"`;
    return res.status(200).json({ reply });
};
exports.sendMessage = sendMessage;
