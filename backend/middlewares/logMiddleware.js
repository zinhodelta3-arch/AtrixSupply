import { create } from '../config/database.js';

// Middleware para registrar logs de acesso
export const logMiddleware = async (req, res, next) => {
    const startTime = Date.now();
    
    // Capturar dados da requisição (sem usuario_id ainda, será capturado na resposta)
    const logData = {
        rota: req.originalUrl,
        metodo: req.method,
        ip_address: req.ip || req.connection.remoteAddress || req.socket.remoteAddress,
        user_agent: req.get('User-Agent'),
        dados_requisicao: JSON.stringify({
            headers: {
                'content-type': req.get('Content-Type'),
                'authorization': req.get('Authorization') ? 'Bearer [REDACTED]' : null,
                'user-agent': req.get('User-Agent')
            },
            body: req.method !== 'GET' ? sanitizeRequestBody(req.body) : null,
            query: Object.keys(req.query).length > 0 ? req.query : null
        })
    };

    // Interceptar a resposta para capturar status code, tempo e usuário (após authMiddleware executar)
    const originalSend = res.send;
    const originalJson = res.json;
    let logRegistrado = false;

    function registrarLog(data) {
        if (logRegistrado) return;

        logRegistrado = true;

        const finalLogData = {
            ...logData,
            status_code: res.statusCode,
            tempo_resposta_ms: Date.now() - startTime
        };

        if (req.usuario && req.usuario.id_user) {
            finalLogData.id_usuarios = req.usuario.id_user;
        }

        if (res.statusCode >= 400) {
            finalLogData.dados_resposta = JSON.stringify({
                error: true,
                status: res.statusCode,
                message: typeof data === 'object' ? JSON.stringify(data).substring(0, 500) : String(data).substring(0, 500)
            });
        }

        saveLog(finalLogData).catch(error => {
            console.error('Erro ao salvar log:', error);
        });
    }

    res.send = function(data) {
        registrarLog(data);
        
        return originalSend.call(this, data);
    };
    
    res.json = function(data) {
        registrarLog(data);
        
        return originalJson.call(this, data);
    };

    next();
};

// Função para sanitizar dados sensíveis do body
function sanitizeRequestBody(body) {
    if (!body || typeof body !== 'object') return body;
    
    const sanitized = { ...body };
    
    // Remover campos sensíveis
    const sensitiveFields = ['senha', 'password', 'token', 'authorization'];
    sensitiveFields.forEach(field => {
        if (sanitized[field]) {
            sanitized[field] = '[REDACTED]';
        }
    });
    
    return sanitized;
}

// Função para salvar o log no banco de dados
async function saveLog(logData) {
    try {
        await create('logs', logData);
    } catch (error) {
        console.error('Erro ao inserir log no banco:', error);
    }
}

// Middleware para logs simples (apenas console)
export const simpleLogMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const usuario = req.usuario ? `[${req.usuario.email}]` : '[Anônimo]';
    
    console.log(`${timestamp} - ${req.method} ${req.originalUrl} ${usuario} - IP: ${req.ip || 'N/A'}`);
    
    next();
};
