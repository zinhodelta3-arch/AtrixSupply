import express from 'express';
import NotificacaoController from '../controllers/NotificacaoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, NotificacaoController.listarMinhas);
router.put('/lidas', authMiddleware, NotificacaoController.marcarTodasLidas);
router.put('/:id_notificacao/lida', authMiddleware, NotificacaoController.marcarLida);

export default router;
