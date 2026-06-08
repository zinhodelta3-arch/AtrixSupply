import express from 'express';
import AuthController from '../controllers/AuthController.js';
import { authMiddleware, adminMiddleware, selfMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, AuthController.listarUsuarios);
router.post('/', authMiddleware, adminMiddleware, AuthController.criarUsuario);
router.put('/admin/:id_user', authMiddleware, adminMiddleware, AuthController.atualizarUsuario);
router.delete('/admin/:id_user', authMiddleware, adminMiddleware, AuthController.excluirUsuario);

router.get('/:id_user', authMiddleware, selfMiddleware, AuthController.buscarUsuarioPorId);
router.put('/:id_user', authMiddleware, selfMiddleware, AuthController.atualizarUsuario);
router.delete('/:id_user', authMiddleware, selfMiddleware, AuthController.excluirUsuario);

router.options('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

router.options('/:id_user', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

router.options('/admin/:id_user', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

export default router;
