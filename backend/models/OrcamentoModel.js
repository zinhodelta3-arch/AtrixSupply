import { create, read, update, deleteRecord, getConnection } from '../config/database.js';

// Model para operações de orçamentos
class OrcamentosModel {
    
    // Listar orçamentos (com paginação)
    static async listarTodos(pagina = 1, limite = 10) {
        try {
            const offset = (pagina - 1) * limite;
            const connection = await getConnection();
            
            try {
                const sql = 'SELECT * FROM orcamentos ORDER BY id_orcamento DESC LIMIT ? OFFSET ?';
                const [orcamentos] = await connection.query(sql, [limite, offset]);
                
                // Contar total de registros
                const [totalResult] = await connection.execute('SELECT COUNT(*) as total FROM orcamentos');
                const total = totalResult[0].total;
                
                return {
                    orcamentos,
                    total,
                    pagina,
                    limite,
                    totalPaginas: Math.ceil(total / limite)
                };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Erro ao listar orçamentos:', error);
            throw error;
        }
    }

    // Buscar orçamento por ID
    static async buscarPorId(id_orcamento) {
        try {
            const rows = await read('orcamentos', `id_orcamento = ?`, [id_orcamento]);
            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar orçamento por ID:', error);
            throw error;
        }
    }

    // Buscar orçamento por nome (com paginação)
    static async buscarPorNome(nome_orcamento, limite = 10, offset = 0) {
         try {
            const connection = await getConnection();
            try {
                const sql = 'SELECT * FROM orcamentos WHERE nome_orcamento LIKE ? ORDER BY id_orcamento DESC LIMIT ? OFFSET ?;';
                const nome = `%${nome_orcamento}%`;

                const [orcamentos] = await connection.query(sql, [nome, limite, offset]);

                const [totalResult] = await connection.query('SELECT COUNT(*) as total FROM orcamentos WHERE nome_orcamento LIKE ?;', [nome]);
                const total = totalResult[0].total;

                return {
                    orcamentos,
                    total,
                    pagina: (offset / limite) + 1,
                    limite,
                    totalPaginas: Math.ceil(total / limite)
                };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Erro ao buscar orçamento por nome:', error);
            throw error;
        }
    }

    // Buscar orçamentos por ID da Encomenda (Chave Estrangeira)
    static async buscarPorEncomenda(id_encomenda, limite = 10, offset = 0) {
         try {
            const connection = await getConnection();
            try {
                const sql = 'SELECT * FROM orcamentos WHERE id_encomenda = ? ORDER BY id_orcamento DESC LIMIT ? OFFSET ?;';

                const [orcamentos] = await connection.query(sql, [id_encomenda, limite, offset]);

                const [totalResult] = await connection.query('SELECT COUNT(*) as total FROM orcamentos WHERE id_encomenda = ?;', [id_encomenda]);
                const total = totalResult[0].total;

                return {
                    orcamentos,
                    total,
                    pagina: (offset / limite) + 1,
                    limite,
                    totalPaginas: Math.ceil(total / limite)
                };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Erro ao buscar orçamentos por encomenda:', error);
            throw error;
        }
    }

    // Buscar orçamentos por Estado (visivel, invisivel, escolhida)
    static async buscarPorEstado(estado, limite = 10, offset = 0) {
         try {
            const connection = await getConnection();
            try {
                const sql = 'SELECT * FROM orcamentos WHERE estado = ? ORDER BY id_orcamento DESC LIMIT ? OFFSET ?;';

                const [orcamentos] = await connection.query(sql, [estado, limite, offset]);

                const [totalResult] = await connection.query('SELECT COUNT(*) as total FROM orcamentos WHERE estado = ?;', [estado]);
                const total = totalResult[0].total;

                return {
                    orcamentos,
                    total,
                    pagina: (offset / limite) + 1,
                    limite,
                    totalPaginas: Math.ceil(total / limite)
                };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Erro ao buscar orçamentos por estado:', error);
            throw error;
        }
    }

    // Criar novo orçamento
    static async criar(dadosOrcamento) {
        try {
            return await create('orcamentos', dadosOrcamento);
        } catch (error) {
            console.error('Erro ao criar orçamento:', error);
            throw error;
        }
    }

    // Atualizar orçamento
    static async atualizar(id_orcamento, dadosOrcamento) {
        try {
            return await update('orcamentos', dadosOrcamento, `id_orcamento = ?`, [id_orcamento]);
        } catch (error) {
            console.error('Erro ao atualizar orçamento:', error);
            throw error;
        }
    }

    // Excluir orçamento
    static async excluir(id_orcamento) {
        try {
            return await deleteRecord('orcamentos', `id_orcamento = ?`, [id_orcamento]);
        } catch (error) {
            console.error('Erro ao excluir orçamento:', error);
            throw error;
        }
    }
}

export default OrcamentosModel;