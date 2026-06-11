import express from 'express';
import ProdutoController from '../controllers/ProdutoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { uploadImagens, handleUploadError } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// ==========================================================
// ROTAS PÚBLICAS
// ==========================================================

// Lista geral com suporte a paginação e filtros por query:
// GET /api/produtos?pagina=1&limite=12&busca=motor&categoria=motores_e_acionamentos
router.get('/', ProdutoController.listarTodos);

// Rotas antigas mantidas por compatibilidade
router.get('/categoria/:categoria', ProdutoController.buscarPorCategoria);
router.get('/nome/:nome_produto', ProdutoController.buscarPorNome);

// Buscar produto por ID
// Importante: essa rota dinâmica precisa ficar depois de /categoria e /nome
router.get('/:id_produto', ProdutoController.buscarPorId);

// ==========================================================
// ROTAS PROTEGIDAS
// ==========================================================

router.post(
  '/',
  authMiddleware,
  uploadImagens.single('imagem'),
  handleUploadError,
  ProdutoController.criar
);

router.post(
  '/upload',
  authMiddleware,
  uploadImagens.single('imagem'),
  handleUploadError,
  ProdutoController.uploadImagem
);

router.put(
  '/:id_produto',
  authMiddleware,
  uploadImagens.single('imagem'),
  handleUploadError,
  ProdutoController.atualizar
);

router.delete(
  '/:id_produto',
  authMiddleware,
  ProdutoController.excluir
);

// ==========================================================
// ROTAS OPTIONS PARA CORS
// ==========================================================

router.options('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).send();
});

router.options('/categoria/:categoria', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).send();
});

router.options('/nome/:nome_produto', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).send();
});

router.options('/upload', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).send();
});

router.options('/:id_produto', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).send();
});

export default router;