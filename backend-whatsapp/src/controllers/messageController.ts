import { Request, Response } from 'express';

export const sendMessage = (req: Request, res: Response) => {
  const { message, user } = req.body;
  // Aqui futuramente vamos integrar IA e lógica de resposta
  res.json({
    reply: `Olá, ${user || 'usuário'}! Você disse: "${message}"`
  });
};