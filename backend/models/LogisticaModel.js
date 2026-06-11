import { create, read, update, deleteRecord, getConnection } from '../config/database.js';

// Model para operações de logística
class LogisticaModel {
    static filtroPorUsuario(usuario) {
        const tipo = String(usuario?.tipo || '').toLowerCase();
        const idUsuario = Number(usuario?.id_user || 0);

        if (['administrador', 'admin'].includes(tipo)) {
            return { where: '1 = 1', params: [] };
        }

        if (tipo === 'fornecedor') {
            return { where: 'id_dono = ?', params: [idUsuario] };
        }

        return { where: '1 = 0', params: [] };
    }
    
    // Listar logistica (com paginação)
    static async listarTodos(pagina = 1, limite = 10, usuario = null) {
        try {
            const offset = (pagina - 1) * limite;
            const filtro = this.filtroPorUsuario(usuario);
            const connection = await getConnection();
            
            try {

                const sql = `
                    SELECT *
                    FROM logistica
                    WHERE ${filtro.where}
                    ORDER BY disponibilidade = 'disponivel' DESC, id_logistica DESC
                    LIMIT ? OFFSET ?
                `;
                const [logistica] = await connection.query(sql, [
                    ...filtro.params,
                    limite,
                    offset
                ]);
                
                // Contar total de registros
                const [totalResult] = await connection.execute(
                    `SELECT COUNT(*) as total FROM logistica WHERE ${filtro.where}`,
                    filtro.params
                );
                const total = totalResult[0].total;
                
                return {
                    logistica,
                    total,
                    pagina,
                    limite,
                    totalPaginas: Math.ceil(total / limite)
                };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Erro ao listar logistica:', error);
            throw error;
        }
    }

    // Buscar logistica por ID
    static async buscarPorId(id_logistica) {
        try {
            const rows = await read('logistica', `id_logistica = ?`, [id_logistica]);
            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar logistica por ID:', error);
            throw error;
        }
    }

    // Buscar logistica por nome
    static async buscarPorNome(nome_logistica, limite = 10, offset = 0) {
         try {
            const connection = await getConnection();
            try {
                const sql = 'SELECT * FROM logistica WHERE nome_logistica LIKE ? ORDER BY id_logistica DESC LIMIT ? OFFSET ?;';
                const nome = `%${nome_logistica}%`;

                const [logistica] = await connection.query(sql, [nome, limite, offset]);

                const [totalResult] = await connection.query('SELECT COUNT(*) as total FROM logistica WHERE nome_logistica LIKE ?;', [nome]);
                const total = totalResult[0].total;

                return {
                    logistica,
                    total,
                    pagina: (offset / limite) + 1,
                    limite,
                    totalPaginas: Math.ceil(total / limite)
                };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Erro ao buscar logistica por nome:', error);
            throw error;
        }
    }

    // Buscar logistica por endereço/destino
    // CORRIGIDO: O nome do método era repetido. Mudou para 'buscarPorDestino'
    static async buscarPorDestino(destino, limite = 10, offset = 0) {
         try {
            const connection = await getConnection();
            try {
                // CORRIGIDO: Tabela mudada para 'logistica' e campo para 'destino'
                const sql = 'SELECT * FROM logistica WHERE destino LIKE ? ORDER BY id_logistica DESC LIMIT ? OFFSET ?;';
                const buscaDestino = `%${destino}%`;

                const [logistica] = await connection.query(sql, [buscaDestino, limite, offset]);

                const [totalResult] = await connection.query('SELECT COUNT(*) as total FROM logistica WHERE destino LIKE ?;', [buscaDestino]);
                const total = totalResult[0].total;

                return {
                    logistica,
                    total,
                    pagina: (offset / limite) + 1,
                    limite,
                    totalPaginas: Math.ceil(total / limite)
                };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Erro ao buscar logistica por destino:', error);
            throw error;
        }
    }

    // Buscar por tipo de veiculo
    static async buscarPorVeiculo(veiculo, limite = 10, offset = 0) {
         try {
            const connection = await getConnection();
            try {
                const sql = 'SELECT * FROM logistica WHERE veiculo = ? ORDER BY id_logistica DESC LIMIT ? OFFSET ?;';

                const [logistica] = await connection.query(sql, [veiculo, limite, offset]);

                const [totalResult] = await connection.query('SELECT COUNT(*) as total FROM logistica WHERE veiculo = ?', [veiculo]);
                const total = totalResult[0].total;

                return {
                    logistica,
                    total,
                    pagina: (offset / limite) + 1,
                    limite,
                    totalPaginas: Math.ceil(total / limite)
                };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Erro ao buscar por veículo:', error);
            throw error;
        }
    }

    // Buscar por tipo disponibilidade
    static async buscarPorDisponibilidade(disponibilidade, limite = 10, offset = 0) {
         try {
            const connection = await getConnection();
            try {
                const sql = 'SELECT * FROM logistica WHERE disponibilidade = ? ORDER BY id_logistica DESC LIMIT ? OFFSET ?;';

                const [logistica] = await connection.query(sql, [disponibilidade, limite, offset]);

                const [totalResult] = await connection.query('SELECT COUNT(*) as total FROM logistica WHERE disponibilidade = ?', [disponibilidade]);
                const total = totalResult[0].total;

                return {
                    logistica,
                    total,
                    pagina: (offset / limite) + 1,
                    limite,
                    totalPaginas: Math.ceil(total / limite)
                };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Erro ao buscar por disponibilidade:', error);
            throw error;
        }
    }

    static async contarEncomendasVinculadas(id_logistica) {
        const connection = await getConnection();

        try {
            const [rows] = await connection.query(
                `
                    SELECT COUNT(*) AS total
                    FROM encomendas
                    WHERE id_logistica = ?
                    AND status NOT IN ('entregue', 'finalizado', 'cancelado')
                `,
                [id_logistica]
            );

            return Number(rows[0]?.total || 0);
        } catch (error) {
            console.error('Erro ao contar encomendas vinculadas à logística:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    static async buscarEncomendaAtivaPorLogistica(id_logistica, ignorarIdEncomenda = null) {
        const connection = await getConnection();

        try {
            const params = [id_logistica];
            let filtroIgnorar = '';

            if (ignorarIdEncomenda) {
                filtroIgnorar = 'AND id_encomenda <> ?';
                params.push(ignorarIdEncomenda);
            }

            const [rows] = await connection.query(
                `
                    SELECT id_encomenda, id_user, status
                    FROM encomendas
                    WHERE id_logistica = ?
                    ${filtroIgnorar}
                    AND status NOT IN ('entregue', 'finalizado', 'cancelado')
                    LIMIT 1
                `,
                params
            );

            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar encomenda ativa por logística:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    // Criar nova logistica
    static async criar(dadosLogistica) {
        try {
            return await create('logistica', dadosLogistica);
        } catch (error) {
            console.error('Erro ao criar logistica:', error);
            throw error;
        }
    }

    // Atualizar logistica
    static async atualizar(id_logistica, dadosLogistica) {
        try {
            return await update('logistica', dadosLogistica, `id_logistica = ?`, [id_logistica]);
        } catch (error) {
            console.error('Erro ao atualizar logistica:', error);
            throw error;
        }
    }

    // Excluir logistica
    static async excluir(id_logistica) {
        try {
            return await deleteRecord('logistica', `id_logistica = ?`, [id_logistica]);
        } catch (error) {
            console.error('Erro ao excluir logistica:', error);
            throw error;
        }
    }

    static async contarEncomendasVinculadas(id_logistica) {
        const connection = await getConnection();

        try {
            const [rows] = await connection.query(
                `
                    SELECT COUNT(*) AS total
                    FROM encomendas
                    WHERE id_logistica = ?
                      AND status NOT IN ('entregue', 'finalizado', 'cancelado')
                `,
                [id_logistica]
            );

            return rows[0]?.total || 0;
        } finally {
            connection.release();
        }
    }
}

export default LogisticaModel;
