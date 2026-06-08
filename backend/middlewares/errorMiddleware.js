import { ApiError } from '../utils/apiError.js';

// Middleware centralizado para tratamento de erros
export const errorMiddleware = (error, req, res, next) => {
    // Se for um ApiError, usar seus dados
    if (error instanceof ApiError) {
        return res.status(error.statusCode).json(error.toJSON());
    }
    
    // Se for erro de validação do multer (upload)
    if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            sucesso: false,
            erro: 'Arquivo muito grande',
            mensagem: `Tamanho máximo permitido: ${error.limit / 1024 / 1024}MB`
        });
    }
    
    // Se for erro de token JWT
    if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            sucesso: false,
            erro: 'Sessao invalida',
            mensagem: 'Sua sessao nao pode ser validada. Faca login novamente.'
        });
    }
    
    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
            sucesso: false,
            erro: 'Sessao expirada',
            mensagem: 'Sua sessao expirou. Faca login novamente.'
        });
    }
    
    // Se for erro de sintaxe JSON
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return res.status(400).json({
            sucesso: false,
            erro: 'Dados invalidos',
            mensagem: 'Nao foi possivel ler os dados enviados. Revise as informacoes e tente novamente.'
        });
    }
    
    // Erro genérico - logar detalhes mas não expor para o cliente
    console.error('Erro não tratado:', {
        mensagem: error.message,
        stack: error.stack,
        url: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString()
    });
    
    // Retornar erro genérico
    res.status(500).json({
        sucesso: false,
        erro: 'Erro interno do servidor',
        mensagem: 'Ocorreu um erro inesperado. Tente novamente em instantes.'
    });
};

