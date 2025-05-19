import { Router, Request, Response } from 'express';
import { sendMessage } from '../controllers/message.controller';
import { authenticateJWT } from '../middlewares/auth';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'linguaverse_super_secret';

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
 * Rota de login para gerar token JWT
 * (No futuro: validar usuário/senha no banco de dados)
 */
router.post('/login', (req: Request, res: Response) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({
      status: 'error',
      message: 'Usuário é obrigatório.',
      timestamp: new Date().toISOString()
    });
  }

  // Gera token JWT
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '2h' });

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
router.post('/message', authenticateJWT, sendMessage);

export default router;