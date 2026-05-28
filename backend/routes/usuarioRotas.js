import express from 'express';
import AuthController from '../controllers/AuthController.js';
import { authMiddleware, adminMiddleware, selfMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rotas de usuários (pública)

router.get('/:id_user', AuthController.buscarUsuarioPorId);

// Rotas de usuários (selfCheck)

router.put('/:id_user', authMiddleware, selfMiddleware, AuthController.atualizarUsuario);
router.delete('/:id_user', authMiddleware, selfMiddleware, AuthController.excluirUsuario);

// Rotas de usuários (apenas admin)
router.get('/', authMiddleware, adminMiddleware, AuthController.listarUsuarios);
router.post('/', authMiddleware, adminMiddleware, AuthController.criarUsuario);
router.put('/admin/:id_user', authMiddleware, adminMiddleware, AuthController.atualizarUsuario);
router.delete('/admin/:id_user', authMiddleware, adminMiddleware, AuthController.excluirUsuario);

// Rotas OPTIONS para CORS (preflight requests)
router.options('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

router.options('/:id_user', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

export default router;

