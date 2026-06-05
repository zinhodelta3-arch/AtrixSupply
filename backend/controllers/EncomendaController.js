import EncomendaModel from '../models/EncomendasModel.js';
import UsuarioModel from '../models/UsuarioModel.js';
import LogisticaModel from '../models/LogisticaModel.js';
import { calcularDataEntregaEstimada, atualizarEntregasVencidas } from '../utils/entregaAutomatica.js';

const STATUS_ENCOMENDA_VALIDOS = [
    'pendente',
    'aguardando_orcamento',
    'orcamento_recebido',
    'orcamento_escolhido',
    'em_producao',
    'aguardando_logistica',
    'em_transporte',
    'entregue',
    'finalizado',
    'cancelado'
];

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

function podeAlterarComoCliente(req, encomenda) {
    return isAdmin(req) || Number(encomenda.id_user) === Number(req.usuario.id_user);
}

function podeAlterarComoFornecedor(req, encomenda) {
    return isAdmin(req) || Number(encomenda.id_fornecedor) === Number(req.usuario.id_user);
}

class EncomendaController {
    static async listarTodos(req, res) {
        try {
            await atualizarEntregasVencidas();

            const paginacaoEntrada = parsePaginacao(req);
            if (paginacaoEntrada.erro) {
                return res.status(paginacaoEntrada.erro.status).json(paginacaoEntrada.erro.resposta);
            }

            const { limite, offset } = paginacaoEntrada;
            const resultado = await EncomendaModel.listarTodos(limite, offset, req.usuario);

            res.status(200).json({
                sucesso: true,
                dados: resultado.encomendas,
                paginacao: {
                    pagina: resultado.pagina,
                    limite: resultado.limite,
                    total: resultado.total,
                    totalPaginas: resultado.totalPaginas
                }
            });
        } catch (error) {
            console.error('Erro ao listar encomendas:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar as encomendas'
            });
        }
    }

    static async buscarPorId(req, res) {
        try {
            await atualizarEntregasVencidas();

            const { id_encomenda } = req.params;

            if (!id_encomenda || isNaN(id_encomenda)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            const encomenda = await EncomendaModel.buscarPorId(id_encomenda, req.usuario);

            if (!encomenda) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Encomenda não encontrada',
                    mensagem: `Encomenda com ID ${id_encomenda} não foi encontrada`
                });
            }

            res.status(200).json({
                sucesso: true,
                dados: encomenda
            });
        } catch (error) {
            console.error('Erro ao buscar encomenda:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível buscar a encomenda'
            });
        }
    }

    static async buscarPorNome(req, res) {
        try {
            await atualizarEntregasVencidas();

            const paginacaoEntrada = parsePaginacao(req);
            if (paginacaoEntrada.erro) {
                return res.status(paginacaoEntrada.erro.status).json(paginacaoEntrada.erro.resposta);
            }

            const pecas = req.params.pecas || '';
            const { limite, offset } = paginacaoEntrada;
            const resultado = await EncomendaModel.buscarPorNome(pecas, limite, offset, req.usuario);

            res.status(200).json({
                sucesso: true,
                dados: resultado.encomendas,
                paginacao: {
                    pagina: resultado.pagina,
                    limite: resultado.limite,
                    total: resultado.total,
                    totalPaginas: resultado.totalPaginas
                }
            });
        } catch (error) {
            console.error('Erro ao listar encomendas por nome:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar as encomendas por nome'
            });
        }
    }

    static async criar(req, res) {
        try {
            if (isFornecedor(req)) {
                return res.status(403).json({
                    sucesso: false,
                    erro: 'Acesso negado',
                    mensagem: 'Fornecedor não pode criar encomenda de cliente'
                });
            }

            const { id_user, pecas, descricao } = req.body;
            const idCliente = isAdmin(req) && id_user ? Number(id_user) : Number(req.usuario.id_user);
            const erros = [];

            if (!idCliente || isNaN(idCliente) || idCliente <= 0) {
                erros.push({ campo: 'id_user', mensagem: 'ID do usuário inválido' });
            }

            if (!pecas || pecas.trim() === '') {
                erros.push({ campo: 'pecas', mensagem: 'O nome da(s) peça(s) é obrigatório' });
            } else if (pecas.trim().length > 255) {
                erros.push({ campo: 'pecas', mensagem: 'Use até 255 caracteres' });
            }

            if (!descricao || descricao.trim() === '') {
                erros.push({ campo: 'descricao', mensagem: 'A descrição é obrigatória' });
            } else if (descricao.trim().length > 1000) {
                erros.push({ campo: 'descricao', mensagem: 'A descrição suporta até 1000 caracteres' });
            }

            if (erros.length > 0) {
                return res.status(400).json({ sucesso: false, erro: 'Dados inválidos', detalhes: erros });
            }

            const userExistente = await UsuarioModel.buscarPorId(idCliente);
            if (!userExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Usuário não encontrado',
                    mensagem: `Usuário com ID ${idCliente} não foi encontrado`
                });
            }

            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);

            const dadosEncomenda = {
                id_user: idCliente,
                id_fornecedor: null,
                id_logistica: null,
                pecas: pecas.trim(),
                descricao: descricao.trim(),
                status: 'aguardando_orcamento',
                orcamento: null,
                data_com: hoje.toISOString().split('T')[0],
                data_entrega: null
            };

            const encomendaId = await EncomendaModel.criar(dadosEncomenda);

            res.status(201).json({
                sucesso: true,
                mensagem: 'Encomenda criada com sucesso',
                dados: { id_encomenda: encomendaId, ...dadosEncomenda }
            });
        } catch (error) {
            console.error('Erro ao criar encomenda:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível criar a encomenda'
            });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id_encomenda } = req.params;
            const { pecas, descricao, status } = req.body;

            if (!id_encomenda || isNaN(id_encomenda)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            const encomendaExistente = await EncomendaModel.buscarPorId(id_encomenda);
            if (!encomendaExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Encomenda não encontrada',
                    mensagem: `Encomenda com ID ${id_encomenda} não foi encontrada`
                });
            }

            if (!podeAlterarComoCliente(req, encomendaExistente)) {
                return res.status(403).json({
                    sucesso: false,
                    erro: 'Acesso negado',
                    mensagem: 'Você só pode editar encomendas criadas por você'
                });
            }

            if (
                !isAdmin(req) &&
                !['pendente', 'aguardando_orcamento'].includes(encomendaExistente.status)
            ) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Edição inválida',
                    mensagem: 'A encomenda não pode ser editada após receber orçamento'
                });
            }

            const dadosAtualizacao = {};

            if (pecas !== undefined) {
                if (!pecas || pecas.trim() === '') {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Peças inválidas',
                        mensagem: 'O nome da(s) peça(s) é obrigatório'
                    });
                }
                dadosAtualizacao.pecas = pecas.trim();
            }

            if (descricao !== undefined) {
                if (!descricao || descricao.trim() === '') {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Descrição inválida',
                        mensagem: 'A descrição é obrigatória'
                    });
                }
                dadosAtualizacao.descricao = descricao.trim();
            }

            if (status !== undefined) {
                const statusNormalizado = String(status).trim().toLowerCase();
                if (!STATUS_ENCOMENDA_VALIDOS.includes(statusNormalizado)) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Status inválido',
                        mensagem: `Status permitido: ${STATUS_ENCOMENDA_VALIDOS.join(', ')}`
                    });
                }

                if (!isAdmin(req) && statusNormalizado !== 'cancelado') {
                    return res.status(403).json({
                        sucesso: false,
                        erro: 'Acesso negado',
                        mensagem: 'Cliente só pode cancelar a encomenda por esta rota'
                    });
                }

                dadosAtualizacao.status = statusNormalizado;
            }

            if (Object.keys(dadosAtualizacao).length === 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nenhum dado para atualizar',
                    mensagem: 'Forneça pelo menos um campo para atualizar'
                });
            }

            const resultado = await EncomendaModel.atualizar(id_encomenda, dadosAtualizacao);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Encomenda atualizada com sucesso',
                dados: { linhasAfetadas: resultado || 1 }
            });
        } catch (error) {
            console.error('Erro ao atualizar encomenda:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível atualizar a encomenda'
            });
        }
    }

    static async atualizarCheck(req, res) {
        return EncomendaController.definirLogistica(req, res);
    }

    static async atualizarApos(req, res) {
        return EncomendaController.definirLogistica(req, res);
    }

    static async definirLogistica(req, res) {
        try {
            const { id_encomenda } = req.params;
            const { id_logistica, data_entrega } = req.body;

            if (!id_encomenda || isNaN(id_encomenda)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID encomenda inválido',
                    mensagem: 'O ID da encomenda deve ser um número válido'
                });
            }

            if (!id_logistica || isNaN(id_logistica) || Number(id_logistica) <= 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID logística inválido',
                    mensagem: 'O ID da logística deve ser um número válido'
                });
            }

            const encomendaExistente = await EncomendaModel.buscarPorId(id_encomenda);
            if (!encomendaExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Encomenda não encontrada',
                    mensagem: `Encomenda com ID ${id_encomenda} não foi encontrada`
                });
            }

            if (!podeAlterarComoFornecedor(req, encomendaExistente)) {
                return res.status(403).json({
                    sucesso: false,
                    erro: 'Acesso negado',
                    mensagem: 'A logística só pode ser definida depois que o cliente escolher seu orçamento'
                });
            }

            if (
                !isAdmin(req) &&
                !['orcamento_escolhido', 'em_producao', 'aguardando_logistica'].includes(
                    encomendaExistente.status
                )
            ) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Encomenda indisponível',
                    mensagem: 'Esta encomenda ainda não está pronta para receber logística'
                });
            }

            const logisticaExistente = await LogisticaModel.buscarPorId(id_logistica);
            if (!logisticaExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Logística não encontrada',
                    mensagem: `Logística com ID ${id_logistica} não foi encontrada`
                });
            }

            if (
                !isAdmin(req) &&
                Number(logisticaExistente.id_dono) !== Number(req.usuario.id_user)
            ) {
                return res.status(403).json({
                    sucesso: false,
                    erro: 'Acesso negado',
                    mensagem: 'Fornecedor só pode usar logística cadastrada por ele'
                });
            }

            let dataEntregaFinal = calcularDataEntregaEstimada(logisticaExistente.veiculo);

            if (data_entrega !== undefined && data_entrega !== null && data_entrega !== '') {
                const date = new Date(data_entrega);
                const hoje = new Date();
                hoje.setHours(0, 0, 0, 0);

                if (isNaN(date.getTime()) || date < hoje) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Data de entrega inválida',
                        mensagem: 'A data deve ser válida e posterior à data atual'
                    });
                }

                dataEntregaFinal = date.toISOString().split('T')[0];
            }

            const dadosAtualizacao = {
                id_logistica: Number(id_logistica),
                status: 'em_transporte',
                data_entrega: dataEntregaFinal
            };

            const resultado = await EncomendaModel.atualizar(id_encomenda, dadosAtualizacao);
            await LogisticaModel.atualizar(id_logistica, { disponibilidade: 'ocupado' });

            res.status(200).json({
                sucesso: true,
                mensagem: 'Logística definida e encomenda enviada para transporte',
                dados: {
                    linhasAfetadas: resultado || 1,
                    data_entrega: dataEntregaFinal
                }
            });
        } catch (error) {
            console.error('Erro ao definir logística da encomenda:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível definir a logística'
            });
        }
    }

    static async excluir(req, res) {
        try {
            const { id_encomenda } = req.params;

            if (!id_encomenda || isNaN(id_encomenda)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            const encomendaExistente = await EncomendaModel.buscarPorId(id_encomenda);
            if (!encomendaExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Encomenda não encontrada',
                    mensagem: `Encomenda com ID ${id_encomenda} não foi encontrada`
                });
            }

            if (!podeAlterarComoCliente(req, encomendaExistente)) {
                return res.status(403).json({
                    sucesso: false,
                    erro: 'Acesso negado',
                    mensagem: 'Você só pode excluir encomendas criadas por você'
                });
            }

            if (
                !isAdmin(req) &&
                ['em_transporte', 'entregue', 'finalizado'].includes(encomendaExistente.status)
            ) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Exclusão inválida',
                    mensagem: 'Encomendas em transporte, entregues ou finalizadas não podem ser excluídas'
                });
            }

            const resultado = await EncomendaModel.excluir(id_encomenda);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Encomenda excluída com sucesso',
                dados: { linhasAfetadas: resultado || 1 }
            });
        } catch (error) {
            console.error('Erro ao excluir encomenda:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível excluir a encomenda'
            });
        }
    }
}

export default EncomendaController;
