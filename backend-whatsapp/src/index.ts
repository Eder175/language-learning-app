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

// Inicializa o client do WhatsApp (importação já executa o client)
import './core/whatsapp-integration/whatsappClient';

// Middlewares globais
app.use(helmet()); // Segurança HTTP
app.use(cors()); // Libera CORS para integração com web/app
app.use(express.json({ limit: '10mb' })); // Suporte a JSON com payload grande
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

// Log de inicialização com informações detalhadas
app.listen(PORT, () => {
  console.log('\n==============================');
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`📅 Iniciado em: ${new Date().toLocaleString('pt-BR')}`);
  console.log('🔒 Segurança: Helmet + CORS + JSON limit');
  console.log('📝 Logs: Morgan ativado');
  console.log('🤖 WhatsApp Client: Inicialização automática');
  console.log('==============================\n');
});