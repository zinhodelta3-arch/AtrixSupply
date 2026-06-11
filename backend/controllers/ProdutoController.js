import ProdutoModel from '../models/ProdutoModel.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { removerArquivoAntigo } from '../middlewares/uploadMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIMITE_PADRAO_PRODUTOS = 12;

const CATEGORIAS_VALIDAS = [
    'geral',
    'automacao_industrial',
    'eletrica_industrial',
    'ferramentas_industriais',
    'fixacao_industrial',
    'instrumentacao_e_medicao',
    'lubrificacao_e_manutencao',
    'maquinas_industriais',
    'motores_e_acionamentos',
    'pecas_mecanicas',
    'pneumatica_e_hidraulica',
    'seguranca_industrial_(epi)',
    'solda_e_metalurgia'
];

function normalizarCategoria(categoria) {
    return String(categoria || '')
        .toLowerCase()
        .trim()
        .split(' ')
        .join('_');
}

function normalizarBooleano(valor) {
    return valor === true || valor === 'true' || valor === '1' || valor === 1;
}

function parsePaginacao(req) {
    const pagina = parseInt(req.query.pagina) || 1;
    const limite = parseInt(req.query.limite) || LIMITE_PADRAO_PRODUTOS;
    const limiteMaximo = parseInt(process.env.PAGINACAO_LIMITE_MAXIMO) || 100;

    if (pagina <= 0) {
        return {
            erro: {
                status: 400,
                resposta: {
                    sucesso: false,
                    erro: 'Página inválida',
                    mensagem: 'A página deve ser um número maior que zero'
                }
            }
        };
    }

    if (limite <= 0 || limite > limiteMaximo) {
        return {
            erro: {
                status: 400,
                resposta: {
                    sucesso: false,
                    erro: 'Limite inválido',
                    mensagem: `O limite deve ser um número entre 1 e ${limiteMaximo}`
                }
            }
        };
    }

    return {
        pagina,
        limite,
        offset: (pagina - 1) * limite
    };
}

// Controller para operações com produtos
class ProdutoController {
    // GET /produtos - Listar todos os produtos com filtros + paginação real no banco
    static async listarTodos(req, res) {
        try {
            const paginacaoEntrada = parsePaginacao(req);

            if (paginacaoEntrada.erro) {
                return res
                    .status(paginacaoEntrada.erro.status)
                    .json(paginacaoEntrada.erro.resposta);
            }

            const { limite, offset } = paginacaoEntrada;

            const busca = String(req.query.busca || '').trim();
            const categoria = normalizarCategoria(req.query.categoria || '');
            const precoMaximo = req.query.precoMaximo ?? req.query.preco_maximo ?? null;
            const somenteEstoque = normalizarBooleano(
                req.query.somenteEstoque ?? req.query.somente_estoque
            );

            if (
                categoria &&
                categoria !== 'todas' &&
                !CATEGORIAS_VALIDAS.includes(categoria)
            ) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Categoria inexistente',
                    mensagem: 'Categoria não encontrada'
                });
            }

            const resultado = await ProdutoModel.listarComFiltros({
                limite,
                offset,
                busca,
                categoria,
                precoMaximo,
                somenteEstoque
            });

            res.status(200).json({
                sucesso: true,
                dados: resultado.produtos,
                paginacao: {
                    pagina: resultado.pagina,
                    limite: resultado.limite,
                    total: resultado.total,
                    totalPaginas: resultado.totalPaginas
                },
                filtros: {
                    busca,
                    categoria: categoria || 'todas',
                    precoMaximo:
                        precoMaximo === null || precoMaximo === ''
                            ? null
                            : Number(precoMaximo),
                    somenteEstoque
                },
                meta: {
                    maiorPreco: resultado.maiorPreco
                }
            });
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os produtos'
            });
        }
    }

    // GET /produtos/categoria/:categoria - Listar produtos da categoria com paginação
    static async buscarPorCategoria(req, res) {
        try {
            const categoriaValidada = normalizarCategoria(req.params.categoria || '');

            if (!categoriaValidada) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Categoria obrigatória',
                    mensagem: 'A categoria é obrigatória para essa operação'
                });
            }

            if (
                categoriaValidada !== 'todas' &&
                !CATEGORIAS_VALIDAS.includes(categoriaValidada)
            ) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Categoria inexistente',
                    mensagem: 'Categoria não encontrada'
                });
            }

            const paginacaoEntrada = parsePaginacao(req);

            if (paginacaoEntrada.erro) {
                return res
                    .status(paginacaoEntrada.erro.status)
                    .json(paginacaoEntrada.erro.resposta);
            }

            const { limite, offset } = paginacaoEntrada;

            const resultado = await ProdutoModel.buscarPorCategoria(
                categoriaValidada,
                limite,
                offset
            );

            res.status(200).json({
                sucesso: true,
                dados: resultado.produtos,
                paginacao: {
                    pagina: resultado.pagina,
                    limite: resultado.limite,
                    total: resultado.total,
                    totalPaginas: resultado.totalPaginas
                },
                meta: {
                    maiorPreco: resultado.maiorPreco
                }
            });
        } catch (error) {
            console.error('Erro ao listar produtos por categoria:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os produtos por categoria'
            });
        }
    }

    // GET /produtos/nome/:nome_produto - Listar produtos por nome com paginação
    static async buscarPorNome(req, res) {
        try {
            const nome_produto = String(req.params.nome_produto || '').trim();

            if (!nome_produto) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nome obrigatório',
                    mensagem: 'O nome do produto é obrigatório para essa operação'
                });
            }

            const paginacaoEntrada = parsePaginacao(req);

            if (paginacaoEntrada.erro) {
                return res
                    .status(paginacaoEntrada.erro.status)
                    .json(paginacaoEntrada.erro.resposta);
            }

            const { limite, offset } = paginacaoEntrada;

            const resultado = await ProdutoModel.buscarPorNome(
                nome_produto,
                limite,
                offset
            );

            res.status(200).json({
                sucesso: true,
                dados: resultado.produtos,
                paginacao: {
                    pagina: resultado.pagina,
                    limite: resultado.limite,
                    total: resultado.total,
                    totalPaginas: resultado.totalPaginas
                },
                meta: {
                    maiorPreco: resultado.maiorPreco
                }
            });
        } catch (error) {
            console.error('Erro ao listar produtos por nome:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os produtos por nome'
            });
        }
    }

    // GET /produtos/:id - Buscar produto por ID
    static async buscarPorId(req, res) {
        try {
            const { id_produto } = req.params;

            if (!id_produto || isNaN(id_produto)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            const produto = await ProdutoModel.buscarPorId(id_produto);

            if (!produto) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Produto não encontrado',
                    mensagem: `Produto com ID ${id_produto} não foi encontrado`
                });
            }

            res.status(200).json({
                sucesso: true,
                dados: produto
            });
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível buscar o produto'
            });
        }
    }

    // POST /produtos - Criar novo produto
    static async criar(req, res) {
        try {
            const { nome_produto, descricao, preco, categoria, estoque, fornecedor } = req.body;
            const categoriaValidada = normalizarCategoria(categoria || 'geral');

            const erros = [];

            if (!nome_produto || nome_produto.trim() === '') {
                erros.push({
                    campo: 'nome',
                    mensagem: 'Nome é obrigatório'
                });
            } else {
                if (nome_produto.trim().length < 3) {
                    erros.push({
                        campo: 'nome',
                        mensagem: 'O nome deve ter pelo menos 3 caracteres'
                    });
                }

                if (nome_produto.trim().length > 255) {
                    erros.push({
                        campo: 'nome',
                        mensagem: 'O nome deve ter no máximo 255 caracteres'
                    });
                }
            }

            if (!preco || isNaN(preco) || preco <= 0) {
                erros.push({
                    campo: 'preco',
                    mensagem: 'Preço deve ser um número positivo'
                });
            }

            if (!categoriaValidada || categoriaValidada === '') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'categoria obrigatória',
                    mensagem: 'A categoria é obrigatória para essa operação'
                });
            }

            if (!CATEGORIAS_VALIDAS.includes(categoriaValidada)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'categoria inexistente',
                    mensagem: 'Categoria não encontrada'
                });
            }

            if (estoque === undefined || estoque === null || isNaN(estoque) || Number(estoque) < 0) {
                erros.push({
                    campo: 'estoque',
                    mensagem: 'Estoque deve ser um número maior ou igual a zero'
                });
            }

            if (!fornecedor || fornecedor.trim() === '') {
                erros.push({
                    campo: 'fornecedor',
                    mensagem: 'Fornecedor é obrigatório'
                });
            }

            if (erros.length > 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Dados inválidos',
                    detalhes: erros
                });
            }

            const dadosProduto = {
                nome_produto: nome_produto.trim(),
                descricao: descricao ? descricao.trim() : null,
                preco: parseFloat(preco),
                categoria: categoriaValidada,
                estoque: parseInt(estoque),
                fornecedor: fornecedor.trim()
            };

            if (req.file) {
                dadosProduto.imagem = req.file.filename;
            }

            const produtoId = await ProdutoModel.criar(dadosProduto);

            res.status(201).json({
                sucesso: true,
                mensagem: 'Produto criado com sucesso',
                dados: {
                    id: produtoId,
                    ...dadosProduto
                }
            });
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível criar o produto'
            });
        }
    }

    // PUT /produtos/:id - Atualizar produto
    static async atualizar(req, res) {
        try {
            const { id_produto } = req.params;
            const { nome_produto, descricao, preco, categoria, estoque, fornecedor } = req.body;

            const categoriaValidada =
                categoria !== undefined ? normalizarCategoria(categoria) : undefined;

            if (!id_produto || isNaN(id_produto)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            const produtoExistente = await ProdutoModel.buscarPorId(id_produto);

            if (!produtoExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Produto não encontrado',
                    mensagem: `Produto com ID ${id_produto} não foi encontrado`
                });
            }

            const dadosAtualizacao = {};

            if (nome_produto !== undefined) {
                if (nome_produto.trim() === '') {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Nome inválido',
                        mensagem: 'O nome não pode estar vazio'
                    });
                }

                dadosAtualizacao.nome_produto = nome_produto.trim();
            }

            if (preco !== undefined) {
                if (isNaN(preco) || preco <= 0) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Preço inválido',
                        mensagem: 'O preço deve ser um número maior que zero'
                    });
                }

                dadosAtualizacao.preco = parseFloat(preco);
            }

            if (descricao !== undefined) {
                dadosAtualizacao.descricao = descricao
                    ? descricao.trim()
                    : 'Ainda sem descrição';
            }

            if (categoria !== undefined) {
                if (!categoriaValidada || categoriaValidada === '') {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'categoria obrigatória',
                        mensagem: 'A categoria é obrigatória para essa operação'
                    });
                }

                if (!CATEGORIAS_VALIDAS.includes(categoriaValidada)) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'categoria inexistente',
                        mensagem: 'Categoria não encontrada'
                    });
                }

                dadosAtualizacao.categoria = categoriaValidada || 'geral';
            }

            if (estoque !== undefined) {
                if (isNaN(estoque) || estoque < 0) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Estoque inválido',
                        mensagem: 'O estoque deve ser um número maior ou igual que zero'
                    });
                }

                dadosAtualizacao.estoque = parseInt(estoque);
            }

            if (req.file) {
                if (produtoExistente.imagem) {
                    await removerArquivoAntigo(produtoExistente.imagem, 'imagem');
                }

                dadosAtualizacao.imagem = req.file.filename;
            }

            if (fornecedor !== undefined) {
                if (fornecedor.trim() === '') {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Fornecedor inválido',
                        mensagem: 'O fornecedor não pode estar vazio'
                    });
                }

                dadosAtualizacao.fornecedor = fornecedor.trim();
            }

            if (Object.keys(dadosAtualizacao).length === 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nenhum dado para atualizar',
                    mensagem: 'Forneça pelo menos um campo para atualizar'
                });
            }

            const resultado = await ProdutoModel.atualizar(id_produto, dadosAtualizacao);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Produto atualizado com sucesso',
                dados: {
                    linhasAfetadas: resultado || 1
                }
            });
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível atualizar o produto'
            });
        }
    }

    // DELETE /produtos/:id - Excluir produto
    static async excluir(req, res) {
        try {
            const { id_produto } = req.params;

            if (!id_produto || isNaN(id_produto)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            const produtoExistente = await ProdutoModel.buscarPorId(id_produto);

            if (!produtoExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Produto não encontrado',
                    mensagem: `Produto com ID ${id_produto} não foi encontrado`
                });
            }

            if (produtoExistente.imagem) {
                await removerArquivoAntigo(produtoExistente.imagem, 'imagem');
            }

            const resultado = await ProdutoModel.excluir(id_produto);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Produto excluído com sucesso',
                dados: {
                    linhasAfetadas: resultado || 1
                }
            });
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível excluir o produto'
            });
        }
    }

    // POST /produtos/upload - Upload de imagem para produto
    static async uploadImagem(req, res) {
        try {
            const { produto_id } = req.body;

            if (!produto_id || isNaN(produto_id)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID de produto inválido',
                    mensagem: 'O ID do produto é obrigatório e deve ser um número válido'
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Imagem não fornecida',
                    mensagem: 'É necessário enviar uma imagem'
                });
            }

            const produtoExistente = await ProdutoModel.buscarPorId(produto_id);

            if (!produtoExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Produto não encontrado',
                    mensagem: `Produto com ID ${produto_id} não foi encontrado`
                });
            }

            if (produtoExistente.imagem) {
                await removerArquivoAntigo(produtoExistente.imagem, 'imagem');
            }

            await ProdutoModel.atualizar(produto_id, {
                imagem: req.file.filename
            });

            res.status(200).json({
                sucesso: true,
                mensagem: 'Imagem enviada com sucesso',
                dados: {
                    nomeArquivo: req.file.filename,
                    caminho: `/uploads/imagens/${req.file.filename}`
                }
            });
        } catch (error) {
            console.error('Erro ao fazer upload de imagem:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível fazer upload da imagem'
            });
        }
    }
}

export default ProdutoController;