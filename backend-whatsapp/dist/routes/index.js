"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = require("../controllers/message.controller");
const auth_1 = require("../middlewares/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET || 'linguaverse_super_secret';
/**
 * Rota de status da API
 */
router.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'API WhatsApp Language AI - Online!',
        timestamp: new Date().toISOString()
    });
});
/**
 * Rota de login para gerar token JWT
 * (No futuro: validar usuário/senha no banco de dados)
 */
router.post('/login', (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({
            status: 'error',
            message: 'Usuário é obrigatório.',
            timestamp: new Date().toISOString()
        });
    }
    // Gera token JWT
    const token = jsonwebtoken_1.default.sign({ username }, JWT_SECRET, { expiresIn: '2h' });
    return res.status(200).json({
        status: 'success',
        message: 'Login realizado com sucesso!',
        token,
        timestamp: new Date().toISOString()
    });
});
/**
 * Rota protegida para receber mensagens
 */
router.post('/message', auth_1.authenticateJWT, message_controller_1.sendMessage);
exports.default = router;
