import { Router, Request, Response, NextFunction } from 'express';
import { sendMessage } from '../controllers/message.controller';

const router = Router();

/**
 * Rota de status da API
 */
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'API WhatsApp Language AI - Online!',
    timestamp: new Date().toISOString()
  });
});

/**
 * Rota principal para receber mensagens
 */
router.post('/message', sendMessage);

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

export default router;