import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/', routes);

// Middleware para rotas não encontradas (404)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Rota não encontrada',
    path: req.originalUrl
  });
});

// Middleware global de tratamento de erros (500)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro global:', err);
  res.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor',
    details: err.message || err
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});