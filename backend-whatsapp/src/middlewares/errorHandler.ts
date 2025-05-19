import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const status = err.status || 500;
  res.status(status).json({
    status: 'error',
    message: err.message || 'Erro interno do servidor',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
}