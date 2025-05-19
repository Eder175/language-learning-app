"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
// Carrega variáveis de ambiente do arquivo .env
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middlewares globais
app.use((0, helmet_1.default)()); // Segurança HTTP
app.use((0, cors_1.default)()); // Libera CORS para integração com web/app
app.use(express_1.default.json()); // Suporte a JSON
app.use((0, morgan_1.default)('dev')); // Logs de requisições
// (Futuro) Middleware de autenticação JWT
// import { authenticateJWT } from './middlewares/auth';
// app.use(authenticateJWT);
// (Futuro) Internacionalização
// import { i18n } from './middlewares/i18n';
// app.use(i18n);
app.use('/', routes_1.default);
// Middleware para rotas não encontradas (404)
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Rota não encontrada',
        path: req.originalUrl,
        timestamp: new Date().toISOString()
    });
});
// Middleware global de tratamento de erros
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
