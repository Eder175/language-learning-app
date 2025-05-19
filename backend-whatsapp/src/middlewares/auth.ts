import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'linguaverse_super_secret';

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'error',
      message: 'Token de autenticação não fornecido.',
      timestamp: new Date().toISOString()
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // @ts-ignore
    req.user = decoded; // Disponibiliza o usuário para as rotas
    next();
  } catch (err) {
    return res.status(403).json({
      status: 'error',
      message: 'Token inválido ou expirado.',
      timestamp: new Date().toISOString()
    });
  }
}