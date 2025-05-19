import { Request, Response, NextFunction } from 'express';

/**
 * Controller para envio e resposta de mensagens.
 * Pronto para integração futura com IA, logs e internacionalização.
 */
export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
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
  } catch (err) {
    // Encaminha o erro para o middleware global de erros
    next(err);
  }
};