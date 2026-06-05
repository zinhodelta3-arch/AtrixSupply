import { create, update, deleteRecord, getConnection } from '../config/database.js';

class EncomendaModel {
    static selectDetalhado() {
        return `
            SELECT
                e.*,
                cliente.nome_user AS cliente_nome,
                cliente.empresa AS cliente_empresa,
                fornecedor.nome_user AS fornecedor_nome,
                fornecedor.empresa AS fornecedor_empresa,
                l.nome_logistica,
                l.veiculo AS logistica_veiculo,
                l.destino AS logistica_destino,
                l.disponibilidade AS logistica_disponibilidade,
                (
                    SELECT COUNT(*)
                    FROM orcamentos o
                    WHERE o.id_encomenda = e.id_encomenda
                      AND o.estado IN ('visivel', 'escolhida')
                ) AS total_orcamentos,
                (
                    SELECT GROUP_CONCAT(DISTINCT COALESCE(u.empresa, u.nome_user) SEPARATOR ', ')
                    FROM orcamentos o
                    LEFT JOIN usuarios u ON u.id_user = o.id_fornecedor
                    WHERE o.id_encomenda = e.id_encomenda
                      AND o.estado IN ('visivel', 'escolhida')
                ) AS empresas_orcamentos
            FROM encomendas e
            LEFT JOIN usuarios cliente ON cliente.id_user = e.id_user
            LEFT JOIN usuarios fornecedor ON fornecedor.id_user = e.id_fornecedor
            LEFT JOIN logistica l ON l.id_logistica = e.id_logistica
        `;
    }

    static filtroPorUsuario(usuario) {
        const tipo = String(usuario?.tipo || '').toLowerCase();
        const idUsuario = Number(usuario?.id_user || 0);

        if (['administrador', 'admin'].includes(tipo)) {
            return { where: '1 = 1', params: [] };
        }

        if (tipo === 'comum') {
            return { where: 'e.id_user = ?', params: [idUsuario] };
        }

        if (tipo === 'fornecedor') {
            return {
                where: `(
                    (e.id_fornecedor IS NULL AND e.status NOT IN ('entregue', 'finalizado', 'cancelado'))
                    OR e.id_fornecedor = ?
                    OR EXISTS (
                        SELECT 1
                        FROM orcamentos o
                        WHERE o.id_encomenda = e.id_encomenda
                          AND o.id_fornecedor = ?
                    )
                )`,
                params: [idUsuario, idUsuario]
            };
        }

        return { where: '1 = 0', params: [] };
    }

    static async listarTodos(limite, offset, usuario = null) {
        const filtro = this.filtroPorUsuario(usuario);
        const connection = await getConnection();

        try {
            const sql = `
                ${this.selectDetalhado()}
                WHERE ${filtro.where}
                ORDER BY e.id_encomenda DESC
                LIMIT ? OFFSET ?
            `;

            const [encomendas] = await connection.query(sql, [
                ...filtro.params,
                parseInt(limite),
                parseInt(offset)
            ]);

            const [totalResult] = await connection.query(
                `SELECT COUNT(*) AS total FROM encomendas e WHERE ${filtro.where}`,
                filtro.params
            );

            const total = totalResult[0].total;
            const paginaAtual = (offset / limite) + 1;

            return {
                encomendas,
                total,
                pagina: paginaAtual,
                limite,
                totalPaginas: Math.ceil(total / limite)
            };
        } catch (error) {
            console.error('Erro ao listar encomendas:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    static async buscarPorId(id_encomenda, usuario = null) {
        const filtro = usuario ? this.filtroPorUsuario(usuario) : { where: '1 = 1', params: [] };
        const connection = await getConnection();

        try {
            const [rows] = await connection.query(
                `
                    ${this.selectDetalhado()}
                    WHERE e.id_encomenda = ?
                      AND ${filtro.where}
                    LIMIT 1
                `,
                [id_encomenda, ...filtro.params]
            );

            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar encomenda por ID:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    static async criar(dadosEncomenda) {
        try {
            return await create('encomendas', dadosEncomenda);
        } catch (error) {
            console.error('Erro ao criar encomenda:', error);
            throw error;
        }
    }

    static async atualizar(id_encomenda, dadosEncomenda) {
        try {
            return await update('encomendas', dadosEncomenda, 'id_encomenda = ?', [id_encomenda]);
        } catch (error) {
            console.error('Erro ao atualizar encomenda:', error);
            throw error;
        }
    }

    static async excluir(id_encomenda) {
        try {
            return await deleteRecord('encomendas', 'id_encomenda = ?', [id_encomenda]);
        } catch (error) {
            console.error('Erro ao excluir encomenda:', error);
            throw error;
        }
    }

    static async buscarPorNome(pecas, limite, offset, usuario = null) {
        const filtro = this.filtroPorUsuario(usuario);
        const connection = await getConnection();

        try {
            const nome = `%${pecas}%`;
            const where = `(${filtro.where}) AND e.pecas LIKE ?`;

            const [encomendas] = await connection.query(
                `
                    ${this.selectDetalhado()}
                    WHERE ${where}
                    ORDER BY e.id_encomenda DESC
                    LIMIT ? OFFSET ?
                `,
                [...filtro.params, nome, parseInt(limite), parseInt(offset)]
            );

            const [totalResult] = await connection.query(
                `SELECT COUNT(*) AS total FROM encomendas e WHERE ${where}`,
                [...filtro.params, nome]
            );

            const total = totalResult[0].total;

            return {
                encomendas,
                total,
                pagina: (offset / limite) + 1,
                limite,
                totalPaginas: Math.ceil(total / limite)
            };
        } catch (error) {
            console.error('Erro ao buscar encomendas por nome:', error);
            throw error;
        } finally {
            connection.release();
        }
    }
}

export default EncomendaModel;
