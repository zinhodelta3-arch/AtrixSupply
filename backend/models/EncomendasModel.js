import { create, read, update, deleteRecord, getConnection } from '../config/database.js';

// Model para operações com produtos
class EncomendaModel {
    // Listar todos as encomendas (com paginação)
    static async listarTodos(limite, offset) {
        try {

            const connection = await getConnection();
            try {
                const sql = 'SELECT * FROM encomendas ORDER BY id_encomenda DESC LIMIT ? OFFSET ?';

                const [encomendas] = await connection.query(sql, [limite, offset]);

                const [totalResult] = await connection.execute('SELECT COUNT(*) as total FROM encomendas');
                const total = totalResult[0].total;

                const paginaAtual = (offset / limite) + 1;
                const totalPaginas = Math.ceil(total / limite);

                return {
                    encomendas,
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

    // Buscar encomenda por ID
    static async buscarPorId(id_encomenda) {
        try {
            const rows = await read('encomendas', `id_encomenda = ${id_encomenda}`);
            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar produto por ID:', error);
            throw error;
        }
    }

    // Criar nova encomenda
    static async criar(dadosEncomenda) {
        try {
            return await create('encomendas', dadosEncomenda);
        } catch (error) {
            console.error('Erro ao criar encomenda:', error);
            throw error;
        }
    }

    // Atualizar produto
    static async atualizar(id_encomenda, dadosEncomenda) {
        try {
            return await update('encomendas', dadosEncomenda, `id_encomenda = ${id_encomenda}`);
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            throw error;
        }
    }

    // Excluir encomenda
    static async excluir(id_encomenda) {
        try {
            return await deleteRecord('encomendas', `id_encomenda = ${id_encomenda}`);
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            throw error;
        }
    }

    //buscar pelo nome das peças

    static async buscarPorNome(pecas, limite, offset) {
         try {

            const connection = await getConnection();
            try {
                const sql = 'SELECT * FROM encomendas WHERE pecas LIKE ?;';

                const nome = `%${pecas}%`;

                const [encomendas] = await connection.query(sql, [nome, limite, offset]);

                const [totalResult] = await connection.query('SELECT COUNT(*) as total FROM encomendas WHERE pecas LIKE ?;', [nome]);
                const total = totalResult[0].total;

                const paginaAtual = (offset / limite) + 1;
                const totalPaginas = Math.ceil(total / limite);

                return {
                    encomendas,
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

    // 
}

export default EncomendaModel;
