import express from 'express';
import OrcamentoController from '../controllers/OrcamentoController.js';
import { authMiddleware, supplierMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rotas protegidas GET
router.get('/', authMiddleware, supplierMiddleware, OrcamentoController.listarTodos);
router.get('/nome/:nome_orcamento', authMiddleware, supplierMiddleware, OrcamentoController.buscarPorNome);
router.get('/encomenda/:id_encomenda', authMiddleware, supplierMiddleware, OrcamentoController.buscarPorEncomenda);
router.get('/estado/:estado', authMiddleware, supplierMiddleware, OrcamentoController.buscarPorEstado);
router.get('/:id_orcamento', authMiddleware, supplierMiddleware, OrcamentoController.buscarPorId); 

// Rotas protegidas POST, PUT & DELETE
router.post('/', authMiddleware, supplierMiddleware, OrcamentoController.criar);
router.put('/:id_orcamento', authMiddleware, supplierMiddleware, OrcamentoController.atualizar);
router.delete('/:id_orcamento', authMiddleware, supplierMiddleware, OrcamentoController.excluir);

// Rotas OPTIONS para CORS (preflight requests)
router.options('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/nome/:nome_orcamento', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/encomenda/:id_encomenda', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/estado/:estado', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/:id_orcamento', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

export default router;