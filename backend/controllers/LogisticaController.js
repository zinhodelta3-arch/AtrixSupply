import LogisticaModel from '../models/LogisticaModel.js';

// Controller para operações de logística
class LogisticaController {

    // GET /logistica - Listar todas as logísticas (com paginação)
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

            const resultado = await LogisticaModel.listarTodos(pagina, limite); 

            res.status(200).json({
                sucesso: true,
                dados: resultado.logistica,
                paginacao: {
                    pagina: resultado.pagina, 
                    limite: resultado.limite, 
                    total: resultado.total,   
                    totalPaginas: resultado.totalPaginas 
                }
            });
        } catch (error) {
            console.error('Erro ao listar logistica:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar as logísticas'
            });
        }
    }

    // GET /logistica/veiculo/:veiculo - Listar por tipo de veículo (com paginação)
    static async buscarPorVeiculo(req, res) {
        try {
            let veiculo = req.params.veiculo || 'não selecionado';
            let pagina = parseInt(req.query.pagina) || 1;
            let limite = parseInt(req.query.limite) || 10;
            const offset = (pagina - 1) * limite;

            const resultado = await LogisticaModel.buscarPorVeiculo(veiculo, limite, offset); 

            res.status(200).json({
                sucesso: true,
                dados: resultado.logistica,
                paginacao: {
                    pagina: resultado.pagina, 
                    limite: resultado.limite, 
                    total: resultado.total,   
                    totalPaginas: resultado.totalPaginas 
                }
            });
        } catch (error) {
            console.error('Erro ao listar por veículo:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar as logísticas por veículo'
            });
        }
    }

    // GET /logistica/disponibilidade/:disponibilidade - Listar por disponibilidade (com paginação)
    static async buscarPorDisponibilidade(req, res) {
        try {
            let disponibilidade = req.params.disponibilidade || 'disponivel';
            let pagina = parseInt(req.query.pagina) || 1;
            let limite = parseInt(req.query.limite) || 10;
            const offset = (pagina - 1) * limite;

            const resultado = await LogisticaModel.buscarPorDisponibilidade(disponibilidade, limite, offset); 

            res.status(200).json({
                sucesso: true,
                dados: resultado.logistica,
                paginacao: {
                    pagina: resultado.pagina, 
                    limite: resultado.limite, 
                    total: resultado.total,   
                    totalPaginas: resultado.totalPaginas 
                }
            });
        } catch (error) {
            console.error('Erro ao listar por disponibilidade:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar as logísticas por disponibilidade'
            });
        }
    }

    // GET /logistica/nome/:nome_logistica - Listar por nome (com paginação)
    static async buscarPorNome(req, res) {
        try {
            let nome_logistica = req.params.nome_logistica || '';
            let pagina = parseInt(req.query.pagina) || 1;
            let limite = parseInt(req.query.limite) || 10;
            const offset = (pagina - 1) * limite;

            const resultado = await LogisticaModel.buscarPorNome(nome_logistica, limite, offset); 

            res.status(200).json({
                sucesso: true,
                dados: resultado.logistica,
                paginacao: {
                    pagina: resultado.pagina, 
                    limite: resultado.limite, 
                    total: resultado.total,   
                    totalPaginas: resultado.totalPaginas 
                }
            });
        } catch (error) {
            console.error('Erro ao listar por nome:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar as logísticas por nome'
            });
        }
    }

    // GET /logistica/:id - Buscar logistica por ID
    static async buscarPorId(req, res) {
        try {
            const { id_logistica } = req.params;

            if (!id_logistica || isNaN(id_logistica)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            const logistica = await LogisticaModel.buscarPorId(id_logistica);

            if (!logistica) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Logística não encontrada',
                    mensagem: `Logística com ID ${id_logistica} não foi encontrada`
                });
            }

            res.status(200).json({
                sucesso: true,
                dados: logistica
            });
        } catch (error) {
            console.error('Erro ao buscar logistica:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível buscar a logística'
            });
        }
    }

    // POST /logistica - Criar nova logistica
    static async criar(req, res) {
        try {
            const { id_dono, nome_logistica, veiculo, disponibilidade, destino } = req.body;
            const erros = [];

            // Validar id_dono
            if (!id_dono || isNaN(id_dono)) {
                erros.push({ campo: 'id_dono', mensagem: 'ID do dono é obrigatório e deve ser numérico' });
            }

            // Validar nome_logistica
            if (!nome_logistica || nome_logistica.trim() === '') {
                erros.push({ campo: 'nome_logistica', mensagem: 'Nome da logística é obrigatório' });
            } else if (nome_logistica.trim().length > 150) {
                erros.push({ campo: 'nome_logistica', mensagem: 'O nome deve ter no máximo 150 caracteres' });
            }

            // Validar veículo (ENUM)
            const veiculosValidos = ['caminhão', 'van', 'moto', 'carro', 'bicicleta', 'não selecionado'];
            if (veiculo && !veiculosValidos.includes(veiculo.toLowerCase())) {
                erros.push({ campo: 'veiculo', mensagem: 'Veículo inválido' });
            }

            // Validar disponibilidade (ENUM)
            const disponibilidadesValidas = ['disponivel', 'ocupado', 'manutencao'];
            if (disponibilidade && !disponibilidadesValidas.includes(disponibilidade.toLowerCase())) {
                erros.push({ campo: 'disponibilidade', mensagem: 'Disponibilidade inválida' });
            }

            if (erros.length > 0) {
                return res.status(400).json({ sucesso: false, erro: 'Dados inválidos', detalhes: erros });
            }

            const dadosLogistica = {
                id_dono: parseInt(id_dono),
                nome_logistica: nome_logistica.trim(),
                veiculo: veiculo ? veiculo.toLowerCase() : 'não selecionado',
                disponibilidade: disponibilidade ? disponibilidade.toLowerCase() : 'disponivel',
                destino: destino ? destino.trim() : null
            };

            const logisticaId = await LogisticaModel.criar(dadosLogistica);

            res.status(201).json({
                sucesso: true,
                mensagem: 'Logística criada com sucesso',
                dados: { id_logistica: logisticaId, ...dadosLogistica }
            });
        } catch (error) {
            console.error('Erro ao criar logistica:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível criar o registro de logística'
            });
        }
    }

    // PUT /logistica/:id - Atualizar logistica
    static async atualizar(req, res) {
        try {
            const { id_logistica } = req.params;
            const { nome_logistica, veiculo, disponibilidade, destino } = req.body;

            if (!id_logistica || isNaN(id_logistica)) {
                return res.status(400).json({ sucesso: false, erro: 'ID inválido', mensagem: 'O ID deve ser um número válido' });
            }

            const logisticaExistente = await LogisticaModel.buscarPorId(id_logistica);
            if (!logisticaExistente) {
                return res.status(404).json({ sucesso: false, erro: 'Não encontrado', mensagem: `Registro com ID ${id_logistica} não encontrado` });
            }

            const dadosAtualizacao = {};

            if (nome_logistica !== undefined) {
                if (nome_logistica.trim() === '') return res.status(400).json({ sucesso: false, erro: 'Nome inválido' });
                dadosAtualizacao.nome_logistica = nome_logistica.trim();
            }

            if (veiculo !== undefined) {
                const veiculosValidos = ['caminhão', 'van', 'moto', 'carro', 'bicicleta', 'não selecionado'];
                if (!veiculosValidos.includes(veiculo.toLowerCase())) return res.status(400).json({ sucesso: false, erro: 'Veículo inválido' });
                dadosAtualizacao.veiculo = veiculo.toLowerCase();
            }

            if (disponibilidade !== undefined) {
                const disponibilidadesValidas = ['disponivel', 'ocupado', 'manutencao'];
                if (!disponibilidadesValidas.includes(disponibilidade.toLowerCase())) return res.status(400).json({ sucesso: false, erro: 'Disponibilidade inválida' });
                dadosAtualizacao.disponibilidade = disponibilidade.toLowerCase();
            }

            if (destino !== undefined) {
                dadosAtualizacao.destino = destino ? destino.trim() : null;
            }

            if (Object.keys(dadosAtualizacao).length === 0) {
                return res.status(400).json({ sucesso: false, erro: 'Nenhum dado', mensagem: 'Forneça pelo menos um campo para atualizar' });
            }

            const resultado = await LogisticaModel.atualizar(id_logistica, dadosAtualizacao);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Logística atualizada com sucesso',
                dados: { linhasAfetadas: resultado.affectedRows || 1 }
            });
        } catch (error) {
            console.error('Erro ao atualizar logistica:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível atualizar o registro'
            });
        }
    }

    // DELETE /logistica/:id - Excluir logistica
    static async excluir(req, res) {
        try {
            const { id_logistica } = req.params;

            if (!id_logistica || isNaN(id_logistica)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            const logisticaExistente = await LogisticaModel.buscarPorId(id_logistica);
            if (!logisticaExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Não encontrado',
                    mensagem: `Registro com ID ${id_logistica} não encontrado`
                });
            }

            const resultado = await LogisticaModel.excluir(id_logistica);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Registro de logística excluído com sucesso',
                dados: { linhasAfetadas: resultado || 1 }
            });
        } catch (error) {
            console.error('Erro ao excluir logistica:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível excluir o registro'
            });
        }
    }
}

export default LogisticaController;