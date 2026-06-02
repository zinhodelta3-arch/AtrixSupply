import express from 'express';
import EncomendaController from '../controllers/EncomendaController.js';
import { authMiddleware, supplierMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// ==========================================================
// 1. ROTAS DE EXECUÇÃO (GET, POST, PUT, DELETE)
// ==========================================================

// Rotas protegidas GET
router.get('/', authMiddleware, EncomendaController.listarTodos);
router.get('/pecas/:pecas', authMiddleware, EncomendaController.buscarPorNome);
router.get('/:id_encomenda', authMiddleware, EncomendaController.buscarPorId); 

// Rotas protegidas POST, PUT & DELETE
router.post('/', authMiddleware, EncomendaController.criar);
router.put('/user/:id_encomenda', authMiddleware, EncomendaController.atualizar);
router.put('/processo/check/:id_encomenda', authMiddleware, EncomendaController.atualizarCheck);
router.put('/processo/apos/:id_encomenda', authMiddleware, supplierMiddleware, EncomendaController.atualizarApos);
router.delete('/:id_encomenda', authMiddleware, EncomendaController.excluir);

// ==========================================================
// 2. ROTAS OPTIONS (CORS Preflight) - CORRIGIDAS
// ==========================================================

// Raiz / (Mapeia GET e POST)
router.options('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

// Busca por peças
router.options('/pecas/:pecas', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

// Atualização de dados pelo Usuário Comum (/user/:id)
router.options('/user/:id_encomenda', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

// Triagem do Processo (/processo/check/:id) - Corrigido caminho e método PUT
router.options('/processo/check/:id_encomenda', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

// Pós-compra do Fornecedor (/processo/apos/:id) - Adicionado para cobrir a rota nova
router.options('/processo/apos/:id_encomenda', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

// ID Direto (Mapeia o GET e o DELETE da rota raiz)
router.options('/:id_encomenda', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

export default router;