import express from 'express';
import SuporteController from '../controllers/SuporteController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rotas protegidas GET
router.get('/', authMiddleware, adminMiddleware, SuporteController.listarTodos);
router.get('/meus', authMiddleware, SuporteController.listarMeus);

// Rotas protegidas POST & PUT
router.post('/', authMiddleware, SuporteController.criar);
router.put('/:id_ticket/responder', authMiddleware, adminMiddleware, SuporteController.responder);
router.put('/:id_ticket/status', authMiddleware, adminMiddleware, SuporteController.atualizarStatus);

// Rotas OPTIONS para CORS (preflight requests)
router.options('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/meus', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/:id_ticket/responder', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/:id_ticket/status', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

export default router;