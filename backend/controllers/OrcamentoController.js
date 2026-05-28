import OrcamentosModel from '../models/OrcamentoModel.js';

// Controller para operações de orçamentos
class OrcamentosController {

    // GET /orcamentos - Listar todos os orçamentos (com paginação)
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

            const resultado = await OrcamentosModel.listarTodos(pagina, limite); 

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

    // GET /orcamentos/nome/:nome_orcamento - Listar por nome (com paginação)
    static async buscarPorNome(req, res) {
        try {
            let nome_orcamento = req.params.nome_orcamento || '';
            let pagina = parseInt(req.query.pagina) || 1;
            let limite = parseInt(req.query.limite) || 10;
            const offset = (pagina - 1) * limite;

            const resultado = await OrcamentosModel.buscarPorNome(nome_orcamento, limite, offset); 

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

    // GET /orcamentos/encomenda/:id_encomenda - Listar por ID da encomenda (com paginação)
    static async buscarPorEncomenda(req, res) {
        try {
            const { id_encomenda } = req.params;
            let pagina = parseInt(req.query.pagina) || 1;
            let limite = parseInt(req.query.limite) || 10;
            const offset = (pagina - 1) * limite;

            if (!id_encomenda || isNaN(id_encomenda)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID de encomenda inválido',
                    mensagem: 'O ID da encomenda deve ser um número válido'
                });
            }

            const resultado = await OrcamentosModel.buscarPorEncomenda(parseInt(id_encomenda), limite, offset); 

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

    // GET /orcamentos/estado/:estado - Listar por estado (com paginação)
    static async buscarPorEstado(req, res) {
        try {
            let estado = req.params.estado || 'invisivel';
            let pagina = parseInt(req.query.pagina) || 1;
            let limite = parseInt(req.query.limite) || 10;
            const offset = (pagina - 1) * limite;

            const estadosValidos = ['visivel', 'invisivel', 'escolhida'];
            if (!estadosValidos.includes(estado.toLowerCase())) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Estado inválido',
                    mensagem: 'O estado deve ser um dos seguintes: visivel, invisivel ou escolhida'
                });
            }

            const resultado = await OrcamentosModel.buscarPorEstado(estado.toLowerCase(), limite, offset); 

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

    // GET /orcamentos/:id - Buscar orçamento por ID
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

            if (!orcamento) {
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

    // POST /orcamentos - Criar novo orçamento
    static async criar(req, res) {
        try {
            const { id_encomenda, nome_orcamento, tipo_orcamento, estimacao, estado } = req.body;
            const erros = [];

            // Validar id_encomenda
            if (!id_encomenda || isNaN(id_encomenda)) {
                erros.push({ campo: 'id_encomenda', mensagem: 'ID da encomenda é obrigatório e deve ser numérico' });
            }

            // Validar nome_orcamento
            if (!nome_orcamento || nome_orcamento.trim() === '') {
                erros.push({ campo: 'nome_orcamento', mensagem: 'Nome do orçamento é obrigatório' });
            } else if (nome_orcamento.trim().length > 255) {
                erros.push({ campo: 'nome_orcamento', mensagem: 'O nome deve ter no máximo 255 caracteres' });
            }

            // Validar tipo_orcamento
            if (!tipo_orcamento || tipo_orcamento.trim() === '') {
                erros.push({ campo: 'tipo_orcamento', mensagem: 'Tipo do orçamento é obrigatório' });
            } else if (tipo_orcamento.trim().length > 255) {
                erros.push({ campo: 'tipo_orcamento', mensagem: 'O tipo deve ter no máximo 255 caracteres' });
            }

            // Validar estimacao (DECIMAL)
            if (estimacao === undefined || estimacao === null || isNaN(estimacao) || parseFloat(estimacao) < 0) {
                erros.push({ campo: 'estimacao', mensagem: 'Estimação é obrigatória e deve ser um número positivo' });
            }

            // Validar estado (ENUM)
            const estadosValidos = ['visivel', 'invisivel', 'escolhida'];
            if (estado && !estadosValidos.includes(estado.toLowerCase())) {
                erros.push({ campo: 'estado', mensagem: 'Estado inválido' });
            }

            if (erros.length > 0) {
                return res.status(400).json({ sucesso: false, erro: 'Dados inválidos', detalhes: erros });
            }

            const dadosOrcamento = {
                id_encomenda: parseInt(id_encomenda),
                nome_orcamento: nome_orcamento.trim(),
                tipo_orcamento: tipo_orcamento.trim(),
                estimacao: parseFloat(estimacao),
                estado: estado ? estado.toLowerCase() : 'invisivel'
            };

            const orcamentoId = await OrcamentosModel.criar(dadosOrcamento);

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

    // PUT /orcamentos/:id - Atualizar orçamento
    static async atualizar(req, res) {
        try {
            const { id_orcamento } = req.params;
            const { id_encomenda, nome_orcamento, tipo_orcamento, estimacao, estado } = req.body;

            if (!id_orcamento || isNaN(id_orcamento)) {
                return res.status(400).json({ sucesso: false, erro: 'ID inválido', mensagem: 'O ID deve ser um número válido' });
            }

            const orcamentoExistente = await OrcamentosModel.buscarPorId(id_orcamento);
            if (!orcamentoExistente) {
                return res.status(404).json({ sucesso: false, erro: 'Não encontrado', mensagem: `Registro com ID ${id_orcamento} não encontrado` });
            }

            const dadosAtualizacao = {};

            if (id_encomenda !== undefined) {
                if (isNaN(id_encomenda)) return res.status(400).json({ sucesso: false, erro: 'ID da encomenda deve ser numérico' });
                dadosAtualizacao.id_encomenda = parseInt(id_encomenda);
            }

            if (nome_orcamento !== undefined) {
                if (nome_orcamento.trim() === '') return res.status(400).json({ sucesso: false, erro: 'Nome inválido' });
                dadosAtualizacao.nome_orcamento = nome_orcamento.trim();
            }

            if (tipo_orcamento !== undefined) {
                if (tipo_orcamento.trim() === '') return res.status(400).json({ sucesso: false, erro: 'Tipo inválido' });
                dadosAtualizacao.tipo_orcamento = tipo_orcamento.trim();
            }

            if (estimacao !== undefined) {
                if (isNaN(estimacao) || parseFloat(estimacao) < 0) return res.status(400).json({ sucesso: false, erro: 'Estimação inválida' });
                dadosAtualizacao.estimacao = parseFloat(estimacao);
            }

            if (estado !== undefined) {
                const estadosValidos = ['visivel', 'invisivel', 'escolhida'];
                if (!estadosValidos.includes(estado.toLowerCase())) return res.status(400).json({ sucesso: false, erro: 'Estado inválido' });
                dadosAtualizacao.estado = estado.toLowerCase();
            }

            if (Object.keys(dadosAtualizacao).length === 0) {
                return res.status(400).json({ sucesso: false, erro: 'Nenhum dado', mensagem: 'Forneça pelo menos um campo para atualizar' });
            }

            const resultado = await OrcamentosModel.atualizar(id_orcamento, dadosAtualizacao);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Orçamento atualizado com sucesso',
                dados: { linhasAfetadas: resultado.affectedRows || 1 }
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

    // DELETE /orcamentos/:id - Excluir orçamento
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