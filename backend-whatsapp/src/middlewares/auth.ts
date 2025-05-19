import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'linguaverse_super_secret';

/**
 * Middleware de autenticação JWT.
 * Valida o token enviado no header Authorization.
 * No futuro: pode ser expandido para roles, permissões, blacklist, etc.
 */
export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({
      status: 'error',
      message: 'Token de autenticação não fornecido.',
      timestamp: new Date().toISOString()
    });
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      status: 'error',
      message: 'Formato do token inválido.',
      timestamp: new Date().toISOString()
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // @ts-ignore
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: 'error',
      message: 'Token inválido ou expirado.',
      timestamp: new Date().toISOString()
    });
  }
}