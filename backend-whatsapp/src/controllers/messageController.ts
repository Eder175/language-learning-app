import { Request, Response } from 'express';

function validateMessageBody(body: any): { valid: boolean; error?: string } {
  if (!body) return { valid: false, error: 'Corpo da requisição vazio.' };
  if (typeof body.user !== 'string' || !body.user.trim()) return { valid: false, error: 'Campo "user" é obrigatório.' };
  if (typeof body.message !== 'string' || !body.message.trim()) return { valid: false, error: 'Campo "message" é obrigatório.' };
  return { valid: true };
}

export const sendMessage = (req: Request, res: Response) => {
  console.log('Recebido:', req.body);

  const validation = validateMessageBody(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  const { user, message } = req.body;
  const reply = `Olá, ${user}! Você disse: "${message}"`;

  return res.json({ reply });
};