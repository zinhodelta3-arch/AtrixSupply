import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/jwt.js';

function normalizarTipo(tipo) {
    return String(tipo || '').trim().toLowerCase();
}

function isAdmin(usuario) {
    return ['admin', 'administrador'].includes(normalizarTipo(usuario?.tipo));
}

function isFornecedor(usuario) {
    return normalizarTipo(usuario?.tipo) === 'fornecedor';
}

function isCliente(usuario) {
    return ['comum', 'cliente'].includes(normalizarTipo(usuario?.tipo));
}

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                sucesso: false,
                erro: 'Sessao necessaria',
                mensagem: 'Faca login para continuar.'
            });
        }

        const [scheme, token] = authHeader.split(' ');

        if (scheme !== 'Bearer' || !token) {
            return res.status(401).json({
                sucesso: false,
                erro: 'Sessao invalida',
                mensagem: 'Sua sessao nao pode ser validada. Faca login novamente.'
            });
        }

        const decoded = jwt.verify(token, JWT_CONFIG.secret);

        req.usuario = {
            id_user: decoded.id_user,
            tipo: normalizarTipo(decoded.tipo),
            email: decoded.email
        };

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                sucesso: false,
                erro: 'Sessao expirada',
                mensagem: 'Sua sessao expirou. Faca login novamente.'
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                sucesso: false,
                erro: 'Sessao invalida',
                mensagem: 'Sua sessao nao pode ser validada. Faca login novamente.'
            });
        }

        console.error('Erro no middleware de autenticacao:', error);
        return res.status(500).json({
            sucesso: false,
            erro: 'Erro interno do servidor',
            mensagem: 'Nao foi possivel validar sua sessao agora.'
        });
    }
};

const adminMiddleware = (req, res, next) => {
    if (!isAdmin(req.usuario)) {
        return res.status(403).json({
            sucesso: false,
            erro: 'Acesso negado',
            mensagem: 'Voce nao tem permissao para acessar este recurso.'
        });
    }

    next();
};

const clientMiddleware = (req, res, next) => {
    if (!isCliente(req.usuario) && !isAdmin(req.usuario)) {
        return res.status(403).json({
            sucesso: false,
            erro: 'Acesso negado',
            mensagem: 'Voce nao tem permissao para acessar este recurso.'
        });
    }

    next();
};

const supplierMiddleware = (req, res, next) => {
    if (!isFornecedor(req.usuario) && !isAdmin(req.usuario)) {
        return res.status(403).json({
            sucesso: false,
            erro: 'Acesso negado',
            mensagem: 'Voce nao tem permissao para acessar este recurso.'
        });
    }

    next();
};

const selfMiddleware = (req, res, next) => {
    if (isAdmin(req.usuario)) {
        return next();
    }

    if (Number(req.usuario.id_user) !== Number(req.params.id_user)) {
        return res.status(403).json({
            sucesso: false,
            erro: 'Acesso negado',
            mensagem: 'Voce so pode alterar os seus proprios dados.'
        });
    }

    next();
};

export {
    authMiddleware,
    adminMiddleware,
    clientMiddleware,
    supplierMiddleware,
    selfMiddleware,
    isAdmin,
    isFornecedor,
    isCliente
};
