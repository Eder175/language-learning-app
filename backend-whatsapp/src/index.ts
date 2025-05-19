import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router from './routes';
import { errorHandler } from './middlewares/errorHandler';

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares globais
app.use(helmet()); // Segurança HTTP
app.use(cors()); // Libera CORS para integração com web/app
app.use(express.json()); // Suporte a JSON
app.use(morgan('dev')); // Logs de requisições

// (Futuro) Middleware de autenticação JWT
// import { authenticateJWT } from './middlewares/auth';
// app.use(authenticateJWT);

// (Futuro) Internacionalização
// import { i18n } from './middlewares/i18n';
// app.use(i18n);

app.use('/', router);

// Middleware para rotas não encontradas (404)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Rota não encontrada',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Middleware global de tratamento de erros
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});