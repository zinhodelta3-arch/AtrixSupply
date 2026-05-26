import express from 'express';
import OrcamentosController from '../controllers/OrcamentosController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rotas protegidas GET
router.get('/', authMiddleware, OrcamentosController.listarTodos);
router.get('/nome/:nome_orcamento', authMiddleware, OrcamentosController.buscarPorNome);

//rever esse aqui, pois talvez não seja necessario a busca por encomenda
router.get('/encomenda/:id_encomenda', authMiddleware, OrcamentosController.buscarPorEncomenda);

router.get('/estado/:estado', authMiddleware, OrcamentosController.buscarPorEstado);
router.get('/:id_orcamento', authMiddleware, OrcamentosController.buscarPorId); // Sempre por último para evitar conflitos

// Rotas protegidas POST, PUT & DELETE
router.post('/', authMiddleware, OrcamentosController.criar);
router.put('/:id_orcamento', authMiddleware, OrcamentosController.atualizar);
router.delete('/:id_orcamento', authMiddleware, OrcamentosController.excluir);

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