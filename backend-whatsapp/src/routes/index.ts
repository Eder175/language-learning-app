import { Router, Request, Response } from 'express';
import { sendMessage } from '../controllers/message.controller';
import { loginController } from '../controllers/login.controller';
import { authenticateJWT } from '../middlewares/auth';

// Futuro: importar middlewares de logging, analytics, rate limiting, internacionalização, etc.
// import { logRequest } from '../middlewares/logRequest';
// import { rateLimiter } from '../middlewares/rateLimiter';
// import { i18nMiddleware } from '../middlewares/i18n';

const router = Router();

/**
 * Rota de status da API
 * Futuro: incluir informações de versão, uptime, status de serviços externos, etc.
 */
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'API WhatsApp Language AI - Online!',
    version: '1.0.0', // Futuro: puxar de package.json
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

/**
 * Rota de login para gerar token JWT
 * Futuro: validar usuário/senha no banco de dados, autenticação multifator, logs de acesso, etc.
 */
router.post('/login', loginController);

/**
 * Rota protegida para receber mensagens
 * Futuro: integração com IA, logs, analytics, internacionalização, etc.
 */
router.post('/message', authenticateJWT, sendMessage);

/**
 * Rota para logout (futuro: blacklist de tokens, revogação, etc.)
 */
router.post('/logout', authenticateJWT, (req: Request, res: Response) => {
  // Futuro: implementar blacklist de tokens JWT
  res.status(200).json({
    status: 'success',
    message: 'Logout realizado com sucesso! (Futuro: invalidar token)',
    timestamp: new Date().toISOString()
  });
});

/**
 * Rota para healthcheck (monitoramento externo)
 */
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

/**
 * Rota para internacionalização (futuro)
 */
// router.get('/i18n/:lang', i18nMiddleware, (req: Request, res: Response) => {
//   res.status(200).json({ status: 'success', message: 'Internacionalização OK!' });
// });

/**
 * Rota para analytics (futuro)
 */
// router.get('/analytics', authenticateJWT, analyticsController);

export default router;