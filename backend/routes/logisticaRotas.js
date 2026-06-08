import express from 'express';
import LogisticaController from '../controllers/LogisticaController.js';
import { authMiddleware, supplierMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rotas protegidas (precisam de autenticação)
router.get('/', authMiddleware, supplierMiddleware, LogisticaController.listarTodos);
router.get('/veiculo/:veiculo', authMiddleware, supplierMiddleware, LogisticaController.buscarPorVeiculo);
router.get('/disponibilidade/:disponibilidade', authMiddleware, supplierMiddleware, LogisticaController.buscarPorDisponibilidade);
router.get('/nome/:nome_logistica', authMiddleware, supplierMiddleware, LogisticaController.buscarPorNome);
router.get('/:id_logistica', authMiddleware, supplierMiddleware, LogisticaController.buscarPorId);
router.post('/', authMiddleware, supplierMiddleware, LogisticaController.criar);
router.put('/:id_logistica', authMiddleware, supplierMiddleware, LogisticaController.atualizar);
router.delete('/:id_logistica', authMiddleware, supplierMiddleware, LogisticaController.excluir);

// Rotas OPTIONS para CORS (preflight requests)
router.options('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/veiculo/:veiculo', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/disponibilidade/:disponibilidade', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/nome/:nome_logistica', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/:id_logistica', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

export default router;
