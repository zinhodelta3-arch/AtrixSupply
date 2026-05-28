import express from 'express';
import EncomendaController from '../controllers/EncomendaController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rotas protegidas GET
router.get('/', authMiddleware, EncomendaController.listarTodos);
router.get('/pecas/:pecas', authMiddleware, EncomendaController.buscarPorNome);
router.get('/:id_encomenda', authMiddleware, EncomendaController.buscarPorId); 

// Rotas protegidas POST, PUT, PATCH & DELETE
router.post('/', authMiddleware, EncomendaController.criar);
router.put('/user/:id_encomenda', authMiddleware, EncomendaController.atualizar);
router.put('/processo/:id_encomenda', authMiddleware, EncomendaController.atualizarCheck);

// Rota para atualizar dados de orçamento, logística e data de entrega
router.delete('/:id_encomenda', authMiddleware, EncomendaController.excluir);

// Rotas OPTIONS para CORS (preflight requests)
router.options('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/pecas/:pecas', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/check/:id_encomenda', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/:id_encomenda', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

export default router;

