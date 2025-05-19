"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use('/', routes_1.default);
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
