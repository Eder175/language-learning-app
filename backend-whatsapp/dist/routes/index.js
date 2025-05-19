"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = require("../controllers/message.controller");
const router = (0, express_1.Router)();
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
 * Rota principal para receber mensagens
 */
router.post('/message', message_controller_1.sendMessage);
/**
 * (Opcional) Middleware para rotas não encontradas dentro do escopo do router
 *
 * Se preferir, pode deixar esse tratamento global no app principal (index.ts)
 */
// router.use((req: Request, res: Response) => {
//   res.status(404).json({
//     status: 'error',
//     message: 'Rota não encontrada',
//     path: req.originalUrl
//   });
// });
exports.default = router;
