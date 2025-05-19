"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
/**
 * Controller para envio e resposta de mensagens.
 * Pronto para integração futura com IA, logs e internacionalização.
 */
const sendMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validação do corpo da requisição
        if (!req.body) {
            return res.status(400).json({
                status: 'error',
                message: 'Corpo da requisição vazio.',
                timestamp: new Date().toISOString()
            });
        }
        const { user, message } = req.body;
        if (typeof user !== 'string' || !user.trim()) {
            return res.status(400).json({
                status: 'error',
                message: 'Campo "user" é obrigatório e deve ser uma string não vazia.',
                timestamp: new Date().toISOString()
            });
        }
        if (typeof message !== 'string' || !message.trim()) {
            return res.status(400).json({
                status: 'error',
                message: 'Campo "message" é obrigatório e deve ser uma string não vazia.',
                timestamp: new Date().toISOString()
            });
        }
        // Aqui você pode adicionar logs, rastreio, analytics, etc.
        // Exemplo: log.info(`[${user}] enviou: ${message}`);
        // Simulação de resposta (futuro: integração com IA)
        const reply = `Olá, ${user}! Você disse: "${message}"`;
        // Resposta padronizada
        return res.status(200).json({
            status: 'success',
            message: 'Mensagem recebida com sucesso!',
            data: {
                reply,
                originalMessage: message,
                user
            },
            timestamp: new Date().toISOString()
        });
    }
    catch (err) {
        // Encaminha o erro para o middleware global de erros
        next(err);
    }
});
exports.sendMessage = sendMessage;
