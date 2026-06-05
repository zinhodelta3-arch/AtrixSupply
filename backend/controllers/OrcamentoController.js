import OrcamentosModel from '../models/OrcamentoModel.js';
import EncomendaModel from '../models/EncomendasModel.js';
import UsuarioModel from '../models/UsuarioModel.js';

const ESTADOS_ORCAMENTO_VALIDOS = ['visivel', 'invisivel', 'escolhida', 'recusado', 'cancelado'];

function tipoUsuario(req) {
    return String(req.usuario?.tipo || '').toLowerCase();
}

function isAdmin(req) {
    return ['administrador', 'admin'].includes(tipoUsuario(req));
}

function isFornecedor(req) {
    return tipoUsuario(req) === 'fornecedor';
}

function isCliente(req) {
    return tipoUsuario(req) === 'comum';
}

function parsePaginacao(req) {
    const pagina = parseInt(req.query.pagina) || 1;
    const limite = parseInt(req.query.limite) || 10;
    const limiteMaximo = parseInt(process.env.PAGINACAO_LIMITE_MAXIMO) || 100;

    if (pagina <= 0 || limite <= 0 || limite > limiteMaximo) {
        return {
            erro: {
                status: 400,
                resposta: {
                    sucesso: false,
                    erro: 'Paginação inválida',
                    mensagem: `Página deve ser maior que zero e limite entre 1 e ${limiteMaximo}`
                }
            }
        };
    }

    return { pagina, limite, offset: (pagina - 1) * limite };
}

function podeVerOrcamento(req, orcamento) {
    if (isAdmin(req)) return true;

    if (isCliente(req)) {
        return (
            Number(orcamento.id_cliente) === Number(req.usuario.id_user) &&
            ['visivel', 'escolhida', 'recusado'].includes(orcamento.estado)
        );
    }

    if (isFornecedor(req)) {
        return Number(orcamento.id_fornecedor) === Number(req.usuario.id_user);
    }

    return false;
}

function podeAlterarOrcamento(req, orcamento) {
    return isAdmin(req) || Number(orcamento.id_fornecedor) === Number(req.usuario.id_user);
}

class OrcamentosController {
    static async listarTodos(req, res) {
        try {
            const paginacaoEntrada = parsePaginacao(req);
            if (paginacaoEntrada.erro) {
                return res.status(paginacaoEntrada.erro.status).json(paginacaoEntrada.erro.resposta);
            }

            const { pagina, limite } = paginacaoEntrada;
            const resultado = await OrcamentosModel.listarTodos(pagina, limite, req.usuario);

            res.status(200).json({
                sucesso: true,
                dados: resultado.orcamentos,
                paginacao: {
                    pagina: resultado.pagina,
                    limite: resultado.limite,
                    total: resultado.total,
                    totalPaginas: resultado.totalPaginas
                }
            });
        } catch (error) {
            console.error('Erro ao listar orçamentos:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os orçamentos'
            });
        }
    }

    static async buscarPorNome(req, res) {
        try {
            const paginacaoEntrada = parsePaginacao(req);
            if (paginacaoEntrada.erro) {
                return res.status(paginacaoEntrada.erro.status).json(paginacaoEntrada.erro.resposta);
            }

            const { limite, offset } = paginacaoEntrada;
            const resultado = await OrcamentosModel.buscarPorNome(
                req.params.nome_orcamento || '',
                limite,
                offset,
                req.usuario
            );

            res.status(200).json({
                sucesso: true,
                dados: resultado.orcamentos,
                paginacao: {
                    pagina: resultado.pagina,
                    limite: resultado.limite,
                    total: resultado.total,
                    totalPaginas: resultado.totalPaginas
                }
            });
        } catch (error) {
            console.error('Erro ao listar orçamentos por nome:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os orçamentos por nome'
            });
        }
    }

    static async buscarPorEncomenda(req, res) {
        try {
            const { id_encomenda } = req.params;
            const paginacaoEntrada = parsePaginacao(req);
            if (paginacaoEntrada.erro) {
                return res.status(paginacaoEntrada.erro.status).json(paginacaoEntrada.erro.resposta);
            }

            if (!id_encomenda || isNaN(id_encomenda)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID de encomenda inválido',
                    mensagem: 'O ID da encomenda deve ser um número válido'
                });
            }

            const { limite, offset } = paginacaoEntrada;
            const resultado = await OrcamentosModel.buscarPorEncomenda(
                Number(id_encomenda),
                limite,
                offset,
                req.usuario
            );

            res.status(200).json({
                sucesso: true,
                dados: resultado.orcamentos,
                paginacao: {
                    pagina: resultado.pagina,
                    limite: resultado.limite,
                    total: resultado.total,
                    totalPaginas: resultado.totalPaginas
                }
            });
        } catch (error) {
            console.error('Erro ao listar por encomenda:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os orçamentos por encomenda'
            });
        }
    }

    static async buscarPorEstado(req, res) {
        try {
            const estado = String(req.params.estado || 'visivel').toLowerCase();
            const paginacaoEntrada = parsePaginacao(req);
            if (paginacaoEntrada.erro) {
                return res.status(paginacaoEntrada.erro.status).json(paginacaoEntrada.erro.resposta);
            }

            if (!ESTADOS_ORCAMENTO_VALIDOS.includes(estado)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Estado inválido',
                    mensagem: `O estado deve ser: ${ESTADOS_ORCAMENTO_VALIDOS.join(', ')}`
                });
            }

            const { limite, offset } = paginacaoEntrada;
            const resultado = await OrcamentosModel.buscarPorEstado(estado, limite, offset, req.usuario);

            res.status(200).json({
                sucesso: true,
                dados: resultado.orcamentos,
                paginacao: {
                    pagina: resultado.pagina,
                    limite: resultado.limite,
                    total: resultado.total,
                    totalPaginas: resultado.totalPaginas
                }
            });
        } catch (error) {
            console.error('Erro ao listar por estado:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os orçamentos por estado'
            });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id_orcamento } = req.params;

            if (!id_orcamento || isNaN(id_orcamento)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            const orcamento = await OrcamentosModel.buscarPorId(id_orcamento);

            if (!orcamento || !podeVerOrcamento(req, orcamento)) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Orçamento não encontrado',
                    mensagem: `Orçamento com ID ${id_orcamento} não foi encontrado`
                });
            }

            res.status(200).json({
                sucesso: true,
                dados: orcamento
            });
        } catch (error) {
            console.error('Erro ao buscar orçamento:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível buscar o orçamento'
            });
        }
    }

    static async criar(req, res) {
        try {
            if (!isFornecedor(req) && !isAdmin(req)) {
                return res.status(403).json({
                    sucesso: false,
                    erro: 'Acesso negado',
                    mensagem: 'Apenas fornecedores podem criar orçamentos'
                });
            }

            const {
                id_encomenda,
                id_fornecedor,
                nome_orcamento,
                tipo_orcamento,
                estimacao,
                estado
            } = req.body;
            const erros = [];

            if (!id_encomenda || isNaN(id_encomenda)) {
                erros.push({ campo: 'id_encomenda', mensagem: 'ID da encomenda é obrigatório e deve ser numérico' });
            }

            if (!nome_orcamento || nome_orcamento.trim() === '') {
                erros.push({ campo: 'nome_orcamento', mensagem: 'Nome do orçamento é obrigatório' });
            }

            if (!tipo_orcamento || tipo_orcamento.trim() === '') {
                erros.push({ campo: 'tipo_orcamento', mensagem: 'Tipo do orçamento é obrigatório' });
            }

            if (estimacao === undefined || estimacao === null || isNaN(estimacao) || Number(estimacao) < 0) {
                erros.push({ campo: 'estimacao', mensagem: 'Estimação é obrigatória e deve ser um número positivo' });
            }

            const estadoFinal = String(estado || 'visivel').toLowerCase();
            if (!ESTADOS_ORCAMENTO_VALIDOS.includes(estadoFinal) || estadoFinal === 'escolhida') {
                erros.push({ campo: 'estado', mensagem: 'Estado inválido para criação' });
            }

            if (erros.length > 0) {
                return res.status(400).json({ sucesso: false, erro: 'Dados inválidos', detalhes: erros });
            }

            const encomenda = await EncomendaModel.buscarPorId(id_encomenda);
            if (!encomenda) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Encomenda não encontrada',
                    mensagem: `Encomenda com ID ${id_encomenda} não foi encontrada`
                });
            }

            if (['entregue', 'finalizado', 'cancelado'].includes(encomenda.status)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Encomenda encerrada',
                    mensagem: 'Não é possível criar orçamento para encomenda encerrada'
                });
            }

            if (
                !isAdmin(req) &&
                !['pendente', 'aguardando_orcamento', 'orcamento_recebido'].includes(encomenda.status)
            ) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Etapa encerrada',
                    mensagem: 'Esta encomenda já passou da etapa de orçamento'
                });
            }

            const idFornecedorFinal = isAdmin(req) && id_fornecedor
                ? Number(id_fornecedor)
                : Number(req.usuario.id_user);

            const fornecedor = await UsuarioModel.buscarPorId(idFornecedorFinal);
            if (!fornecedor) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Fornecedor não encontrado',
                    mensagem: `Fornecedor com ID ${idFornecedorFinal} não foi encontrado`
                });
            }

            const dadosOrcamento = {
                id_encomenda: Number(id_encomenda),
                id_fornecedor: idFornecedorFinal,
                nome_orcamento: nome_orcamento.trim(),
                tipo_orcamento: tipo_orcamento.trim(),
                estimacao: Number(estimacao),
                estado: estadoFinal
            };

            const orcamentoId = await OrcamentosModel.criar(dadosOrcamento);

            if (['pendente', 'aguardando_orcamento'].includes(encomenda.status) && estadoFinal === 'visivel') {
                await EncomendaModel.atualizar(id_encomenda, { status: 'orcamento_recebido' });
            }

            res.status(201).json({
                sucesso: true,
                mensagem: 'Orçamento criado com sucesso',
                dados: { id_orcamento: orcamentoId, ...dadosOrcamento }
            });
        } catch (error) {
            console.error('Erro ao criar orçamento:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível criar o registro de orçamento'
            });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id_orcamento } = req.params;
            const { id_encomenda, nome_orcamento, tipo_orcamento, estimacao, estado } = req.body;

            if (!id_orcamento || isNaN(id_orcamento)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            const orcamentoExistente = await OrcamentosModel.buscarPorId(id_orcamento);
            if (!orcamentoExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Não encontrado',
                    mensagem: `Registro com ID ${id_orcamento} não encontrado`
                });
            }

            if (!podeAlterarOrcamento(req, orcamentoExistente)) {
                return res.status(403).json({
                    sucesso: false,
                    erro: 'Acesso negado',
                    mensagem: 'Fornecedor só pode alterar orçamentos que pertencem a ele'
                });
            }

            if (!isAdmin(req) && orcamentoExistente.estado === 'escolhida') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Orçamento escolhido',
                    mensagem: 'Orçamento escolhido não pode ser alterado pelo fornecedor'
                });
            }

            const dadosAtualizacao = {};

            if (id_encomenda !== undefined && Number(id_encomenda) !== Number(orcamentoExistente.id_encomenda)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Encomenda inválida',
                    mensagem: 'Não é permitido mover orçamento para outra encomenda'
                });
            }

            if (nome_orcamento !== undefined) {
                if (!nome_orcamento || nome_orcamento.trim() === '') {
                    return res.status(400).json({ sucesso: false, erro: 'Nome inválido' });
                }
                dadosAtualizacao.nome_orcamento = nome_orcamento.trim();
            }

            if (tipo_orcamento !== undefined) {
                if (!tipo_orcamento || tipo_orcamento.trim() === '') {
                    return res.status(400).json({ sucesso: false, erro: 'Tipo inválido' });
                }
                dadosAtualizacao.tipo_orcamento = tipo_orcamento.trim();
            }

            if (estimacao !== undefined) {
                if (isNaN(estimacao) || Number(estimacao) < 0) {
                    return res.status(400).json({ sucesso: false, erro: 'Estimação inválida' });
                }
                dadosAtualizacao.estimacao = Number(estimacao);
            }

            if (estado !== undefined) {
                const estadoNormalizado = String(estado).toLowerCase();
                if (!ESTADOS_ORCAMENTO_VALIDOS.includes(estadoNormalizado)) {
                    return res.status(400).json({ sucesso: false, erro: 'Estado inválido' });
                }

                if (!isAdmin(req) && estadoNormalizado === 'escolhida') {
                    return res.status(403).json({
                        sucesso: false,
                        erro: 'Acesso negado',
                        mensagem: 'A escolha de orçamento deve ser feita pelo cliente'
                    });
                }

                dadosAtualizacao.estado = estadoNormalizado;
            }

            if (Object.keys(dadosAtualizacao).length === 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nenhum dado',
                    mensagem: 'Forneça pelo menos um campo para atualizar'
                });
            }

            const resultado = await OrcamentosModel.atualizar(id_orcamento, dadosAtualizacao);

            if (
                dadosAtualizacao.estado === 'visivel' &&
                ['pendente', 'aguardando_orcamento'].includes(orcamentoExistente.status_encomenda)
            ) {
                await EncomendaModel.atualizar(orcamentoExistente.id_encomenda, { status: 'orcamento_recebido' });
            }

            res.status(200).json({
                sucesso: true,
                mensagem: 'Orçamento atualizado com sucesso',
                dados: { linhasAfetadas: resultado || 1 }
            });
        } catch (error) {
            console.error('Erro ao atualizar orçamento:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível atualizar o registro'
            });
        }
    }

    static async escolher(req, res) {
        try {
            if (!isCliente(req) && !isAdmin(req)) {
                return res.status(403).json({
                    sucesso: false,
                    erro: 'Acesso negado',
                    mensagem: 'Apenas o cliente da encomenda pode escolher orçamento'
                });
            }

            const { id_orcamento } = req.params;

            if (!id_orcamento || isNaN(id_orcamento)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            const orcamento = await OrcamentosModel.escolherOrcamento(
                Number(id_orcamento),
                Number(req.usuario.id_user)
            );

            res.status(200).json({
                sucesso: true,
                mensagem: 'Orçamento escolhido com sucesso',
                dados: orcamento
            });
        } catch (error) {
            console.error('Erro ao escolher orçamento:', error);
            res.status(error.status || 500).json({
                sucesso: false,
                erro: error.status ? 'Regra de negócio' : 'Erro interno do servidor',
                mensagem: error.message || 'Não foi possível escolher o orçamento'
            });
        }
    }

    static async excluir(req, res) {
        try {
            const { id_orcamento } = req.params;

            if (!id_orcamento || isNaN(id_orcamento)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            const orcamentoExistente = await OrcamentosModel.buscarPorId(id_orcamento);
            if (!orcamentoExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Não encontrado',
                    mensagem: `Registro com ID ${id_orcamento} não encontrado`
                });
            }

            if (!podeAlterarOrcamento(req, orcamentoExistente)) {
                return res.status(403).json({
                    sucesso: false,
                    erro: 'Acesso negado',
                    mensagem: 'Fornecedor só pode excluir orçamentos que pertencem a ele'
                });
            }

            if (orcamentoExistente.estado === 'escolhida') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Orçamento escolhido',
                    mensagem: 'Não é possível excluir um orçamento já escolhido'
                });
            }

            const resultado = await OrcamentosModel.excluir(id_orcamento);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Registro de orçamento excluído com sucesso',
                dados: { linhasAfetadas: resultado || 1 }
            });
        } catch (error) {
            console.error('Erro ao excluir orçamento:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível excluir o registro'
            });
        }
    }
}

export default OrcamentosController;
