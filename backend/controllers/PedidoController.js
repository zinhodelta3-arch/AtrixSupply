import PedidosModel from '../models/PedidosModel.js';
import UsuarioModel from '../models/UsuarioModel.js';
import ProdutoModel from '../models/ProdutoModel.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Controller para operações com pedidos
class PedidoController {

    // GET /pedidos - Listar todos os pedidos (com paginação)
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

            const resultado = await PedidosModel.listarTodos(limite, offset); 

            res.status(200).json({
                sucesso: true,
                dados: resultado.pedidos,
                paginacao: {
                    pagina: resultado.pagina, 
                    limite: resultado.limite, 
                    total: resultado.total,   
                    totalPaginas: resultado.totalPaginas 
                }
            });
        } catch (error) {
            console.error('Erro ao listar pedidos:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os pedidos'
            });
        }
    }

    // GET /pedidos/:id - Buscar pedido por ID
    static async buscarPorId(req, res) {
        try {
            const { id_pedido } = req.params;

            // Validação básica do ID
            if (!id_pedido || isNaN(id_pedido)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            const pedido = await PedidosModel.buscarPorId(id_pedido);

            if (!pedido) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Pedido não encontrado',
                    mensagem: `Pedido com ID ${id_pedido} não foi encontrado`
                });
            }

            res.status(200).json({
                sucesso: true,
                dados: pedido
            });
        } catch (error) {
            console.error('Erro ao buscar pedido:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível buscar o pedido'
            });
        }
    }


        // GET /pedidos/id_user/:id_user- Buscar pedido por ID do usuário
    static async buscarPorIdUser(req, res) {
        try {
            const { id_user } = req.params;

            // Validação básica do ID
            if (!id_user || isNaN(id_user)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

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

            const pedido = await PedidosModel.buscarPorIdUser(id_user, limite, offset);

            if (!pedido) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Sem pedidos',
                    mensagem: `O usuário não possui pedidos`
                });
            }

            res.status(200).json({
                sucesso: true,
                dados: pedido
            });
        } catch (error) {
            console.error('Erro ao buscar pedido:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível buscar o pedido'
            });
        }
    }

    // GET /pedidos/nome_user/:nome_user - Listar todos os pedidos com o nome do usuário (com paginação)
    static async buscarPorNome(req, res) {
        try {
            
            let nome_user = req.params.nome_user || '*';
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

            const resultado = await PedidosModel.buscarPorNome(nome_user, limite, offset); 

            res.status(200).json({
                sucesso: true,
                dados: resultado.pedidos,
                paginacao: {
                    pagina: resultado.pagina, 
                    limite: resultado.limite, 
                    total: resultado.total,   
                    totalPaginas: resultado.totalPaginas 
                }
            });
        } catch (error) {
            console.error('Erro ao listar pedidos:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os pedidos por nome'
            });
        }
    }

    // GET /pedidos/status/:status - Listar todos os pedidos com o status (com paginação, para admin)
    static async buscarPorStatus(req, res) {
        try {
            
            let status = req.params.status || '*';
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

            const resultado = await PedidosModel.buscarPorStatus(status, limite, offset); 

            res.status(200).json({
                sucesso: true,
                dados: resultado.pedidos,
                paginacao: {
                    pagina: resultado.pagina, 
                    limite: resultado.limite, 
                    total: resultado.total,   
                    totalPaginas: resultado.totalPaginas 
                }
            });
        } catch (error) {
            console.error('Erro ao listar pedidos:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os pedidos por status'
            });
        }
    }


    // POST /pedidos - Criar novo pedido
    static async criar(req, res) {
        try {
            const { id_user, id_produto } = req.body;

            // Validações manuais - coletar todos os erros
            const erros = [];

            //validar id_user
            if (!id_user || isNaN(id_user) || id_user < 0){
                erros.push({
                    campo: 'id_user',
                    mensagem: 'formato de id inválido'
                })
            }

            //validar id_produto
            if (!id_produto || isNaN(id_produto) || id_produto < 0){
                erros.push({
                    campo: 'id_produto',
                    mensagem: 'formato de id inválido'
                })
            }

             // Se houver erros, retornar todos de uma vez
            if (erros.length > 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Dados inválidos',
                    detalhes: erros
                });
            }

            // Verificar se o user existe
            const userExistente = await UsuarioModel.buscarPorId(id_user);
            if (!userExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Usuário não encontrado',
                    mensagem: `Usuário com ID ${id_user} não foi encontrado`
                });
            }

            // Verificar se o produto existe
            const produtoExistente = await ProdutoModel.buscarPorId(id_produto);
            if (!produtoExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Produto não encontrado',
                    mensagem: `Produto com ID ${id_produto} não foi encontrado`
                });
            }

            const hoje = new Date();
            hoje.setHours(0,0,0,0);
            const data_atual = hoje.toISOString().split('T')[0];

            // Preparar dados do pedido
            const dadosPedido = {
                id_user: parseInt(id_user),
                id_produto: parseInt(id_produto),
                data_pedido: data_atual
            };

            const pedidoId = await PedidosModel.criar(dadosPedido);

            res.status(201).json({
                sucesso: true,
                mensagem: 'Pedido criado com sucesso',
                dados: {
                    id: pedidoId,
                    ...dadosPedido
                }
            });
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível criar o pedido'
            });
        }
    }
    

    // PUT /pedido/:id - Atualizar pedido
    static async atualizar(req, res) {
        try {
            const { id_pedido } = req.params;
            const { data_entrega } = req.body;

            // Validação do ID
            if (!id_pedido || isNaN(id_pedido)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            // Verificar se o pedido existe
            const pedidoExistente = await PedidosModel.buscarPorId(id_pedido);
            if (!pedidoExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Pedido não encontrado',
                    mensagem: `Pedido com ID ${id_pedido} não foi encontrado`
                });
            }

            // Preparar dados para atualização
            const dadosAtualizacao = {};

            //validar data de entrega
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

            // Verificar se há dados para atualizar
            if (Object.keys(dadosAtualizacao).length === 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nenhum dado para atualizar',
                    mensagem: 'Forneça pelo menos um campo para atualizar'
                });
            }

            const resultado = await PedidosModel.atualizar(id_pedido, dadosAtualizacao);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Pedido atualizado com sucesso',
                dados: {
                    linhasAfetadas: resultado.affectedRows || 1
                }
            });
        } catch (error) {
            console.error('Erro ao atualizar pedido:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível atualizar o pedido'
            });
        }
    }

    // DELETE /pedidos/:id_pedido - Excluir pedido
    static async excluir(req, res) {
        try {
            const { id_pedido } = req.params;

            // Validação do ID
            if (!id_pedido || isNaN(id_pedido)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            // Verificar se o pedido existe
            const pedidoExistente = await PedidosModel.buscarPorId(id_pedido);
            if (!pedidoExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Pedido não encontrado',
                    mensagem: `Pedido com ID ${id_pedido} não foi encontrado`
                });
            }

            const resultado = await PedidosModel.excluir(id_pedido);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Pedido excluído com sucesso',
                dados: {
                    linhasAfetadas: resultado || 1
                }
            });
        } catch (error) {
            console.error('Erro ao excluir pedido:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível excluir o pedido'
            });
        }
    }
}

export default PedidoController;

