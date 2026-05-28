import express from 'express';
import PedidoController from '../controllers/PedidoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rotas protegidas GET
router.get('/', authMiddleware, PedidoController.listarTodos);
router.get('/:id_pedido', authMiddleware, PedidoController.buscarPorId);
router.get('/id_user/:id_user', authMiddleware, PedidoController.buscarPorIdUser);
router.get('/nome_user/:nome_user', authMiddleware, PedidoController.buscarPorNome);
router.get('/status/:status', authMiddleware, PedidoController.buscarPorStatus); 


// Rotas protegidas POST, PUT & DELETE
router.post('/', authMiddleware, PedidoController.criar);
router.put('/:id_pedido', authMiddleware, PedidoController.atualizar);
router.delete('/:id_pedido', authMiddleware, PedidoController.excluir);

// Rotas OPTIONS para CORS (preflight requests)
router.options('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/id_user/:id_user', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/nome_user/:nome_user', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/:id_pedido', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

export default router;