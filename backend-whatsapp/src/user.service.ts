// src/controllers/user.controller.ts
import { PrismaClient } from '@prisma/prisma-client';

const prisma = new PrismaClient();

export async function createUser(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.create({ data: { username, password } });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
}

export async function authenticateUser(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findFirst({ where: { username, password } });
    if (!user) {
      res.status(401).json({ message: 'Usuário ou senha incorretos' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao autenticar usuário' });
  }
}

export async function saveMessage(req: Request, res: Response) {
  const { content, userId } = req.body;
  try {
    const message = await prisma.message.create({ data: { content, userId } });
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao salvar mensagem' });
  }
}