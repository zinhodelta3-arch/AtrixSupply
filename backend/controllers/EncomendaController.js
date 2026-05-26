import EncomendaModel from '../models/EncomendasModel.js';
import UsuarioModel from '../models/UsuarioModel.js';
import { fileURLToPath } from 'url';
import path from 'path';
import LogisticaModel from '../models/LogisticaModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

            const resultado = await EncomendaModel.listarTodos(limite, offset); 

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

        // GET /encomendas/:id - Buscar encomendas por ID
    static async buscarPorId(req, res) {
        try {
            const { id_encomenda } = req.params;

            // Validação básica do ID
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
                    mensagem: `Encomenda com ID ${id_encomenda} não foi encontrado`
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

            const resultado = await EncomendaModel.buscarPorNome(pecas, limite, offset); 

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
                mensagem: 'Não foi possível listar as encomendas por nome'
            });
        }
    }


    // POST /encomendas - Criar nova encomenda
    static async criar(req, res) {
        try {
            const { id_user, id_logistica, pecas, descricao, status, orcamento, data_com, data_entrega } = req.body;

            // Validações manuais - coletar todos os erros
            const erros = [];

            //validar id_user
            if (!id_user || isNaN(id_user) || id_user < 0){
                erros.push({
                    campo: 'id_user',
                    mensagem: 'formato de id inválido'
                })
            }

            //validar pecas
            if(!pecas || pecas.trim() === ''){
                erros.push({
                    campo: 'nome da peça',
                    mensagem: 'o nome da(s) peças é obrigatório'
                })
            } else if(pecas.trim().length>=150){
                erros.push({
                    campo: 'formato do nome da peça',
                    mensagem: 'Formato inválido: use até 50 caracteres'
                })
            }

            //validar descricao

            if(!descricao || descricao.trim() === ''){
                erros.push({
                    campo: 'Descrição',
                    mensagem: 'a descrição é obrigatória'
                })
            } else if(descricao.trim() >= 500){
                erros.push({
                    campo: "Descrição",
                    mensagem: "A descrição suporta até 500 caracteres"
                })
            }


            //validar status
            // if (!status || status.trim() === ''){
            //     erros.push({
            //         campo: "Status",
            //         descricao: "O status é obrigatório"
            //     })
            // }

            // Verificar se o user existe
            const userExistente = await UsuarioModel.buscarPorId(id_user);
            if (!userExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Produto não encontrado',
                    mensagem: `Produto com ID ${id_user} não foi encontrado`
                });
            }

            // Se houver erros, retornar todos de uma vez
            if (erros.length > 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Dados inválidos',
                    detalhes: erros
                });
            }

            // Preparar dados da encomenda
            // id_user, id_logistica, pecas, descricao, status, orcamento, data_com, data_entrega
            const dadosEncomenda = {
                id_user: parseInt(id_user),
                id_logistica: null,
                pecas: pecas.trim(),
                descricao: descricao.trim(),
                status: status.trim(),
                orcamento: null,
                data_com: null,
                data_entrega: null

            };

            const encomendaId = await EncomendaModel.criar(dadosEncomenda);

            res.status(201).json({
                sucesso: true,
                mensagem: 'Produto criado com sucesso',
                dados: {
                    id: encomendaId,
                    ...dadosEncomenda
                }
            });
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível criar o pedido'
            });
        }
    }

    // PUT /pedido/:id - Atualizar pedido (user)
    // id_user, id_logistica, pecas, descricao, status, orcamento, data_com, data_entrega
    static async atualizar(req, res) {
        try {
            const { id_encomenda } = req.params;
            const { pecas, descricao, status } = req.body;

            // validação do status

            if (!status || status.trim() !== 'em_andamento'){
                return res.status(400).json({
                    sucesso: false, 
                    erro: 'Edição Inválida',
                    mensagem: 'A encomenda não pode ser editada'
                })
            }

            // Validação do ID
            if (!id_encomenda || isNaN(id_encomenda)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            // Verificar se o pedido existe
            const encomendaExistente = await EncomendaModel.buscarPorId(id_encomenda);
            if (!encomendaExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Produto não encontrado',
                    mensagem: `Pedido com ID ${id_encomenda} não foi encontrado`
                });
            }

            // Preparar dados para atualização
            const dadosAtualizacao = {};
            const erros = [];

            //validar pecas
            if(!pecas || pecas.trim() === ''){
                erros.push({
                    campo: 'nome da peça',
                    mensagem: 'o nome da(s) peças é obrigatório'
                })
            } else if(pecas.trim().length>=150){
                erros.push({
                    campo: 'formato do nome da peça',
                    mensagem: 'Formato inválido: use até 150 caracteres'
                })
            }


            //validar descricao

            if(!descricao || descricao.trim() === ''){
                erros.push({
                    campo: 'Descrição',
                    mensagem: 'a descrição é obrigatória'
                })
            } else if(descricao.trim().length >= 500){
                erros.push({
                    campo: "Descrição",
                    mensagem: "A descrição suporta até 500 caracteres"
                })
            }

            // Verificar se há erros
            if (Object.keys(erros).length === 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: erros,
                    mensagem: 'Foram encontrados erros'
                });
            }

            dadosAtualizacao.pecas = pecas.trim();
            dadosAtualizacao.descricao = descricao.trim()

            // Verificar se há dados para atualizar
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
                mensagem: 'Produto atualizado com sucesso',
                dados: {
                    linhasAfetadas: resultado.affectedRows || 1
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

    // PUT /pedido/:id - Atualizar pedido (user)
    // id_user, id_logistica, pecas, descricao, status, orcamento, data_com, data_entrega
    static async atualizarCheck(req, res) {
        try {
            const { id_encomenda } = req.params;
            const { id_logistica, status, orcamento, data_entrega } = req.body;

            // validação do status

            if (!status || status.trim() !== 'em_andamento'){
                return res.status(400).json({
                    sucesso: false, 
                    erro: 'Edição Inválida',
                    mensagem: 'A encomenda não pode ser editada'
                })
            }

            // Validação do ID
            if (!id_encomenda || isNaN(id_encomenda)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            //validar id_logistica
            if (!id_logistica || isNaN(id_logistica) || id_logistica < 0){
                erros.push({
                    campo: 'id_logistica',
                    mensagem: 'formato de id inválido'
                })
            }

            // Verificar se a encomenda existe
            const encomendaExistente = await EncomendaModel.buscarPorId(id_encomenda);
            if (!encomendaExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Produto não encontrado',
                    mensagem: `Pedido com ID ${id_encomenda} não foi encontrado`
                });
            }

            // Verificar se a logística existe
            const logisticaExistente = await LogisticaModel.buscarPorId(id_logistica);
            if (!logisticaExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Produto não encontrado',
                    mensagem: `Produto com ID ${id_logistica} não foi encontrado`
                });
            }

            // Preparar dados para atualização
            const dadosAtualizacao = {};

            //validar orçamento

            if (orcamento !== undefined) {
                if (isNaN(orcamento) || estoque < 0) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Orçamento inválido',
                        mensagem: 'O orçamento deve ser um número maior ou igual que zero'
                    });
                }
                dadosAtualizacao.estoque = parseInt(estoque);
            }

            //validar data de entrega
            if (data_entrega !== undefined) {
                const date = new Date(data_entrega)
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

            // Verificar se há dados para atualizar
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
                mensagem: 'Produto atualizado com sucesso',
                dados: {
                    linhasAfetadas: resultado.affectedRows || 1
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

    // DELETE /encomendas/:id_encomenda - Excluir encomenda
    static async excluir(req, res) {
        try {
            const { id_encomenda } = req.params;

            // Validação do ID
            if (!id_encomenda || isNaN(id_encomenda)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            // Verificar se o produto existe
            const encomendaExistente = await EncomendaModel.buscarPorId(id_encomenda);
            if (!encomendaExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Encomenda não encontrada',
                    mensagem: `Produto com ID ${id_encomenda} não foi encontrado`
                });
            }

            const resultado = await EncomendaModel.excluir(id_encomenda);

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
}

export default EncomendaController;

