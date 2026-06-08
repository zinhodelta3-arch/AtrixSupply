import EncomendaModel from '../models/EncomendasModel.js';
import UsuarioModel from '../models/UsuarioModel.js';
import LogisticaModel from '../models/LogisticaModel.js';
import {
    STATUS_ENCOMENDA,
    anexarStatusApresentacao,
    podeDefinirLogistica,
    podeEditarDadosBasicos
} from '../utils/encomendaStatus.js';
import { isAdmin, isCliente } from '../middlewares/authMiddleware.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function podeAcessarEncomenda(req, encomenda) {
    return isAdmin(req.usuario) || Number(encomenda?.id_user) === Number(req.usuario?.id_user);
}

// Controller para operações com pedidos
class EncomendaController {

    // GET /pedidos - Listar todos os encomendas (com paginação)
    static async listarTodos(req, res) {
        try {
            let pagina = parseInt(req.query.pagina) || 1;
            let limite = parseInt(req.query.limite) || 10;

            if (pagina <= 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Página inválida',
                    mensagem: 'A página deve ser um número maior que zero'
                });
            }
            if (limite <= 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Limite inválido',
                    mensagem: 'O limite deve ser um número maior que zero'
                });
            }

            const limiteMaximo = parseInt(process.env.PAGINACAO_LIMITE_MAXIMO) || 100;
            if (limite > limiteMaximo) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Limite inválido',
                    mensagem: `O limite deve ser um número entre 1 e ${limiteMaximo}`
                });
            }

            const offset = (pagina - 1) * limite;
            const resultado = isCliente(req.usuario)
                ? await EncomendaModel.listarPorUsuario(req.usuario.id_user, limite, offset)
                : await EncomendaModel.listarTodos(limite, offset);

            res.status(200).json({
                sucesso: true,
                dados: resultado.encomendas.map(anexarStatusApresentacao),
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

    // GET /encomendas/:id - Buscar encomendas por ID
    static async buscarPorId(req, res) {
        try {
            const { id_encomenda } = req.params;

            if (!id_encomenda || isNaN(id_encomenda)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            const encomenda = await EncomendaModel.buscarPorId(id_encomenda);

            if (!encomenda) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Encomenda não encontrada',
                    mensagem: `Encomenda com ID ${id_encomenda} nao foi encontrada`
                });
            }

            if (isCliente(req.usuario) && !podeAcessarEncomenda(req, encomenda)) {
                return res.status(403).json({
                    sucesso: false,
                    erro: 'Acesso negado',
                    mensagem: 'Você não tem permissão para acessar esta encomenda'
                });
            }

            res.status(200).json({
                sucesso: true,
                dados: anexarStatusApresentacao(encomenda)
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

    // GET /pedidos/pecas/:pecas - Listar todos os pedidos com o nome das peças (com paginação)
    static async buscarPorNome(req, res) {
        try {
            let pecas = req.params.pecas || '*';
            let pagina = parseInt(req.query.pagina) || 1;
            let limite = parseInt(req.query.limite) || 10;

            if (pagina <= 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Página inválida',
                    mensagem: 'A página deve ser um número maior que zero'
                });
            }
            if (limite <= 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Limite inválido',
                    mensagem: 'O limite deve ser um número maior que zero'
                });
            }

            const limiteMaximo = parseInt(process.env.PAGINACAO_LIMITE_MAXIMO) || 100;
            if (limite > limiteMaximo) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Limite inválido',
                    mensagem: `O limite deve ser um número entre 1 e ${limiteMaximo}`
                });
            }

            const offset = (pagina - 1) * limite;
            const resultado = isCliente(req.usuario)
                ? await EncomendaModel.buscarPorNomePorUsuario(req.usuario.id_user, pecas, limite, offset)
                : await EncomendaModel.buscarPorNome(pecas, limite, offset);

            res.status(200).json({
                sucesso: true,
                dados: resultado.encomendas.map(anexarStatusApresentacao),
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
                mensagem: 'Não foi possível listar as encomendas por nome'
            });
        }
    }

    // POST /encomendas - Criar nova encomenda
    static async criar(req, res) {
        try {
            const { id_user, pecas, descricao } = req.body;
            const erros = [];
            const idUsuarioEncomenda = isAdmin(req.usuario) && id_user ? id_user : req.usuario?.id_user;

            if (!idUsuarioEncomenda || isNaN(idUsuarioEncomenda) || idUsuarioEncomenda < 0){
                erros.push({ campo: 'id_user', mensagem: 'formato de id inválido' });
            }

            if(!pecas || pecas.trim() === ''){
                erros.push({ campo: 'nome da peça', mensagem: 'o nome da(s) peças é obrigatório' });
            } else if(pecas.trim().length >= 150){
                erros.push({ campo: 'formato do nome da peça', mensagem: 'Formato inválido: use até 150 caracteres' });
            }

            if(!descricao || descricao.trim() === ''){
                erros.push({ campo: 'Descrição', mensagem: 'a descrição é obrigatória' });
            } else if(descricao.trim().length >= 500){
                erros.push({ campo: "Descrição", mensagem: "A descrição suporta até 500 caracteres" });
            }

            if (erros.length > 0) {
                return res.status(400).json({ sucesso: false, erro: 'Dados inválidos', detalhes: erros });
            }

            const userExistente = await UsuarioModel.buscarPorId(idUsuarioEncomenda);
            if (!userExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Usuário não encontrado',
                    mensagem: `Usuário com ID ${idUsuarioEncomenda} não foi encontrado`
                });
            }

            const hoje = new Date();
            hoje.setHours(0,0,0,0);
            const data_atual = hoje.toISOString().split('T')[0];

            const dadosEncomenda = {
                id_user: parseInt(idUsuarioEncomenda),
                id_logistica: null,
                pecas: pecas.trim(),
                descricao: descricao.trim(),
                status: STATUS_ENCOMENDA.SOLICITADA,
                orcamento: null,
                data_com: data_atual,
                data_entrega: null
            };

            const encomendaId = await EncomendaModel.criar(dadosEncomenda);

            res.status(201).json({
                sucesso: true,
                mensagem: 'Encomenda criada com sucesso',
                dados: { id: encomendaId, ...dadosEncomenda }
            });
        } catch (error) {
            console.error('Erro ao criar encomenda:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Nao foi possivel criar a encomenda'
            });
        }
    }

    // PUT /encomendas/user/:id - Atualizar pedido (user)
    static async atualizar(req, res) {
        try {
            const { id_encomenda } = req.params;
            const { pecas, descricao } = req.body;

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
                    erro: 'Encomenda nao encontrada',
                    mensagem: `Encomenda com ID ${id_encomenda} não foi encontrada`
                });
            }

            if (!podeEditarDadosBasicos(encomendaExistente.status)){
                return res.status(400).json({
                    sucesso: false, 
                    erro: 'Edicao invalida',
                    mensagem: 'Esta encomenda nao pode mais ser editada.'
                });
            }

            if (!podeAcessarEncomenda(req, encomendaExistente)) {
                return res.status(403).json({
                    sucesso: false,
                    erro: 'Acesso negado',
                    mensagem: 'Você não tem permissão para editar esta encomenda'
                });
            }

            const erros = [];

            if(!pecas || pecas.trim() === ''){
                erros.push({ campo: 'nome da peça', mensagem: 'o nome da(s) peças é obrigatório' });
            } else if(pecas.trim().length >= 150){
                erros.push({ campo: 'formato do nome da peça', message: 'Formato inválido: use até 150 caracteres' });
            }

            if(!descricao || descricao.trim() === ''){
                erros.push({ campo: 'Descrição', mensagem: 'a descrição é obrigatória' });
            } else if(descricao.trim().length >= 500){
                erros.push({ campo: "Descrição", mensagem: "A descrição suporta até 500 caracteres" });
            }

            if (erros.length > 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Dados inválidos',
                    detalhes: erros
                });
            }

            const dadosAtualizacao = {
                pecas: pecas.trim(),
                descricao: descricao.trim()
            };

            const resultado = await EncomendaModel.atualizar(id_encomenda, dadosAtualizacao);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Encomenda atualizada com sucesso',
                dados: { linhasAfetadas: resultado.affectedRows || 1 }
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

    // PUT /pedido/processo/check/:id - Atualizar pedido (processo de triagem)
    static async atualizarCheck(req, res) {
        try {
            const { id_encomenda } = req.params;
            const { id_logistica, orcamento, motivo_admin } = req.body;
            const erros = []; // Corrigido: adicionada a declaração da array

            if (!id_encomenda || isNaN(id_encomenda)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            if (!id_logistica || isNaN(id_logistica) || id_logistica < 0){
                erros.push({ campo: 'id_logistica', mensagem: 'formato de id inválido' });
            }

            if (erros.length > 0) {
                return res.status(400).json({ sucesso: false, erro: 'Dados inválidos', detalhes: erros });
            }

            const encomendaExistente = await EncomendaModel.buscarPorId(id_encomenda);
            if (!encomendaExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Encomenda nao encontrada',
                    mensagem: `Encomenda com ID ${id_encomenda} nao foi encontrada`
                });
            }

            const logisticaExistente = await LogisticaModel.buscarPorId(id_logistica);
            if (!logisticaExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Logística não encontrada',
                    mensagem: `Logistica com ID ${id_logistica} nao foi encontrada`
                });
            }

            if (String(logisticaExistente.disponibilidade || '').toLowerCase() !== 'disponivel') {
                return res.status(409).json({
                    sucesso: false,
                    erro: 'Logística indisponível',
                    mensagem: 'Selecione uma logística disponível para esta encomenda'
                });
            }

            if (!podeDefinirLogistica(encomendaExistente.status, req.usuario, motivo_admin)){
                return res.status(400).json({
                    sucesso: false, 
                    erro: 'Etapa invalida',
                    mensagem: 'A logistica so pode ser definida apos a escolha do orcamento.'
                });
            }

            // Montando objeto de atualização
            const dadosAtualizacao = {
                id_logistica: parseInt(id_logistica),
                status: STATUS_ENCOMENDA.LOGISTICA_DEFINIDA
            };

            if (orcamento !== undefined) {
                if (isNaN(orcamento) || orcamento < 0) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Orçamento inválido',
                        mensagem: 'O orçamento deve ser um número maior ou igual que zero'
                    });
                }
                dadosAtualizacao.orcamento = parseFloat(orcamento);
            }

            // Corrigido: Cálculo real de 20 dias no objeto Date do JS
            const hoje = new Date();
            hoje.setDate(hoje.getDate() + 20); 
            dadosAtualizacao.data_entrega = hoje.toISOString().split('T')[0];

            const resultado = await EncomendaModel.atualizar(id_encomenda, dadosAtualizacao);
            await LogisticaModel.atualizar(id_logistica, { disponibilidade: 'ocupado' });

            res.status(200).json({
                sucesso: true,
                mensagem: 'Logistica definida para a encomenda',
                dados: { linhasAfetadas: resultado.affectedRows || 1 }
            });
        } catch (error) {
            console.error('Erro ao atualizar encomenda:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Nao foi possivel atualizar a encomenda'
            });
        }
    }

    // PUT /pedido/processo/apos/:id - Atualizar encomenda (pós-compra)
    static async atualizarApos(req, res) {
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

            if (!id_logistica || isNaN(id_logistica) || id_logistica < 0){
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
                    erro: 'Encomenda nao encontrada',
                    mensagem: `Encomenda com ID ${id_encomenda} nao foi encontrada`
                });
            }

            const logisticaExistente = await LogisticaModel.buscarPorId(id_logistica);
            if (!logisticaExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Logística não encontrada',
                    mensagem: `Logistica com ID ${id_logistica} nao foi encontrada`
                });
            }

            const dadosAtualizacao = {
                id_logistica: parseInt(id_logistica),
                status: STATUS_ENCOMENDA.EM_TRANSPORTE
            };

            if (data_entrega !== undefined) {
                const date = new Date(data_entrega);
                const hoje = new Date();
                hoje.setHours(0,0,0,0);

                if (isNaN(date.getTime())) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Data de entrega inválida',
                        mensagem: 'O formato da data deve ser válido'
                    });
                }

                if(date < hoje){
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Data de entrega inválida',
                        mensagem: 'A data deve ser posterior a data atual'
                    });
                }

                dadosAtualizacao.data_entrega = date.toISOString().split('T')[0];
            }

            const resultado = await EncomendaModel.atualizar(id_encomenda, dadosAtualizacao);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Encomenda atualizada com sucesso',
                dados: { linhasAfetadas: resultado.affectedRows || 1 }
            });
        } catch (error) {
            console.error('Erro ao atualizar encomenda:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Nao foi possivel atualizar a encomenda'
            });
        }
    }

    // DELETE /encomendas/:id_encomenda - Excluir encomenda
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
                    mensagem: `Encomenda com ID ${id_encomenda} nao foi encontrada`
                });
            }

            if (!podeAcessarEncomenda(req, encomendaExistente)) {
                return res.status(403).json({
                    sucesso: false,
                    erro: 'Acesso negado',
                    mensagem: 'Você não tem permissão para excluir esta encomenda'
                });
            }

            const resultado = await EncomendaModel.excluir(id_encomenda);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Encomenda excluida com sucesso',
                dados: { linhasAfetadas: resultado.affectedRows || 1 }
            });
        } catch (error) {
            console.error('Erro ao excluir encomenda:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Nao foi possivel excluir a encomenda'
            });
        }
    }
}

export default EncomendaController;
