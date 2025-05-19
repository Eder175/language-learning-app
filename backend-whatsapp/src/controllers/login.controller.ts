import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'linguaverse_super_secret';

/**
 * Controller de login.
 * Futuro: validar usuário/senha no banco de dados, logs, autenticação multifator, etc.
 */
export const loginController = (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Simulação de autenticação (ajuste para seu caso real)
  if (username === 'Eder' && password === '123456') {
    const token = jwt.sign(
      { username },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.json({
      status: 'success',
      message: 'Login realizado com sucesso!',
      token,
      timestamp: new Date().toISOString()
    });
  } else {
    return res.status(401).json({
      status: 'error',
      message: 'Usuário ou senha inválidos.',
      timestamp: new Date().toISOString()
    });
  }
};