import express from 'express';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/', routes);

// Middleware para rotas não encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Rota não encontrada',
    path: req.originalUrl
  });
});

// Middleware global de tratamento de erros (500)
app.use((err, req, res, next) => {
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