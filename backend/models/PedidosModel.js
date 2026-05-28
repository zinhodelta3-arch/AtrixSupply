import { create, read, update, deleteRecord, getConnection } from '../config/database.js';

// Model para operações com produtos
class PedidosModel {
    // Listar todos os produtos (com paginação)
    static async listarTodos(limite, offset) {
        try {

            const connection = await getConnection();
            try {
                const sql = 'SELECT * FROM pedidos ORDER BY id_pedido DESC LIMIT ? OFFSET ?';

                const [pedidos] = await connection.query(sql, [limite, offset]);

                const [totalResult] = await connection.execute('SELECT COUNT(*) as total FROM produtos');
                const total = totalResult[0].total;

                const paginaAtual = (offset / limite) + 1;
                const totalPaginas = Math.ceil(total / limite);

                return {
                    pedidos,
                    total,
                    pagina: paginaAtual,
                    limite,
                    totalPaginas
                };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            throw error;
        }
    }

    // Buscar pedido por ID
    static async buscarPorId(id_pedido) {
        try {
            const rows = await read('pedidos', `id_pedido = ${id_pedido}`);
            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar pedido por ID:', error);
            throw error;
        }
    }

    // Criar novo pedido
    static async criar(dadosPedido) {
        try {
            return await create('pedidos', dadosPedido);
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            throw error;
        }
    }

    // Atualizar produto
    static async atualizar(id_pedido, dadosPedido) {
        try {
            return await update('pedidos', dadosPedido, `id_pedido = ${id_pedido}`);
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            throw error;
        }
    }

    // Excluir produto
    static async excluir(id_pedido) {
        try {
            return await deleteRecord('pedidos', `id_pedido = ${id_pedido}`);
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            throw error;
        }
    }


    //buscar pelo id do user

    static async buscarPorIdUser(id_user, limite, offset) {
         try {

            const connection = await getConnection();
            try {
                const sql = 'SELECT p.* FROM pedidos p JOIN usuarios u ON u.id_user = p.id_user WHERE p.id_user = ? LIMIT ? OFFSET ?;';

                const [pedidos] = await connection.query(sql, [id_user, limite, offset]);

                const [totalResult] = await connection.query('SELECT COUNT(*) as total FROM pedidos p JOIN usuarios u ON u.id_user = p.id_user WHERE u.id_user = ?;', [id_user]);
                const total = totalResult[0].total;

                const paginaAtual = (offset / limite) + 1;
                const totalPaginas = Math.ceil(total / limite);

                return {
                    pedidos,
                    total,
                    pagina: paginaAtual,
                    limite,
                    totalPaginas
                };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            throw error;
        }
    }

    //buscar pelo nome do user

    static async buscarPorNome(nome_user, limite, offset) {
         try {

            const connection = await getConnection();
            try {
                const sql = 'SELECT p.* FROM pedidos p JOIN usuarios u ON u.id_user = p.id_user WHERE u.nome_user LIKE ?;';

                const nome = `%${nome_user}%`;

                const [pedidos] = await connection.query(sql, [nome, limite, offset]);

                const [totalResult] = await connection.query('SELECT COUNT(*) as total FROM pedidos p JOIN usuarios u ON u.id_user = p.id_user WHERE u.nome_user LIKE ?;', [nome]);
                const total = totalResult[0].total;

                const paginaAtual = (offset / limite) + 1;
                const totalPaginas = Math.ceil(total / limite);

                return {
                    pedidos,
                    total,
                    pagina: paginaAtual,
                    limite,
                    totalPaginas
                };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            throw error;
        }
    }

    //buscar pelo status

    static async buscarPorStatus(status, limite, offset) {
         try {

            const connection = await getConnection();
            try {
                const sql = 'SELECT * FROM pedidos WHERE status = ?;';

                const [pedidos] = await connection.query(sql, [status, limite, offset]);

                const [totalResult] = await connection.query('SELECT COUNT(*) as total FROM pedidos WHERE status = ?;', [status]);
                const total = totalResult[0].total;

                const paginaAtual = (offset / limite) + 1;
                const totalPaginas = Math.ceil(total / limite);

                return {
                    pedidos,
                    total,
                    pagina: paginaAtual,
                    limite,
                    totalPaginas
                };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            throw error;
        }
    }
}

export default PedidosModel;
