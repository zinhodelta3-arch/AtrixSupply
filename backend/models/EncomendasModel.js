import { create, read, update, deleteRecord, getConnection } from '../config/database.js';

// Model para operações com encomendas
class EncomendaModel {
    
    // Listar todas as encomendas (com paginação)
    static async listarTodos(limite, offset) {
        try {
            const connection = await getConnection();
            try {
                const sql = 'SELECT * FROM encomendas ORDER BY id_encomenda DESC LIMIT ? OFFSET ?';
                const [encomendas] = await connection.query(sql, [parseInt(limite), parseInt(offset)]);

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
            console.error('Erro ao listar encomendas:', error);
            throw error;
        }
    }

    // Buscar encomenda por ID (Seguro usando placeholders)
    static async buscarPorId(id_encomenda) {
        try {
            // Usando placeholders de interrogação se o seu read() suportar, 
            // ou tratando explicitamente para evitar SQL Injection
            const rows = await read('encomendas', 'id_encomenda = ?', [id_encomenda]);
            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar encomenda por ID:', error);
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

    // Atualizar encomenda
    static async atualizar(id_encomenda, dadosEncomenda) {
        try {
            return await update('encomendas', dadosEncomenda, 'id_encomenda = ?', [id_encomenda]);
        } catch (error) {
            console.error('Erro ao atualizar encomenda:', error);
            throw error;
        }
    }

    // Excluir encomenda
    static async excluir(id_encomenda) {
        try {
            return await deleteRecord('encomendas', 'id_encomenda = ?', [id_encomenda]);
        } catch (error) {
            console.error('Erro ao excluir encomenda:', error);
            throw error;
        }
    }

    // Buscar pelo nome das peças (Corrigido LIMIT e OFFSET)
    static async buscarPorNome(pecas, limite, offset) {
         try {
            const connection = await getConnection();
            try {
                // CORREÇÃO: Faltava o 'LIMIT ? OFFSET ?' na query sql original
                const sql = 'SELECT * FROM encomendas WHERE pecas LIKE ? ORDER BY id_encomenda DESC LIMIT ? OFFSET ?';
                const nome = `%${pecas}%`;

                // Passando limite e offset mapeados corretamente
                const [encomendas] = await connection.query(sql, [nome, parseInt(limite), parseInt(offset)]);

                const [totalResult] = await connection.query('SELECT COUNT(*) as total FROM encomendas WHERE pecas LIKE ?', [nome]);
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
            console.error('Erro ao buscar encomendas por nome:', error);
            throw error;
        }
    }
}

export default EncomendaModel;