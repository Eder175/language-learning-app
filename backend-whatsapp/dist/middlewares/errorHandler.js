"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    res.status(status).json({
        status: 'error',
        message: err.message || 'Erro interno do servidor',
        path: req.originalUrl,
        timestamp: new Date().toISOString()
    });
}
