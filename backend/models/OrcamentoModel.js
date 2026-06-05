import { create, update, deleteRecord, getConnection } from '../config/database.js';

class OrcamentosModel {
    static selectDetalhado() {
        return `
            SELECT
                o.*,
                e.id_user AS id_cliente,
                e.id_fornecedor AS id_fornecedor_escolhido,
                e.status AS status_encomenda,
                e.pecas,
                e.descricao AS descricao_encomenda,
                fornecedor.nome_user AS fornecedor_nome,
                fornecedor.empresa AS fornecedor_empresa
            FROM orcamentos o
            INNER JOIN encomendas e ON e.id_encomenda = o.id_encomenda
            LEFT JOIN usuarios fornecedor ON fornecedor.id_user = o.id_fornecedor
        `;
    }

    static filtroPorUsuario(usuario) {
        const tipo = String(usuario?.tipo || '').toLowerCase();
        const idUsuario = Number(usuario?.id_user || 0);

        if (['administrador', 'admin'].includes(tipo)) {
            return { where: '1 = 1', params: [] };
        }

        if (tipo === 'comum') {
            return {
                where: "e.id_user = ? AND o.estado IN ('visivel', 'escolhida', 'recusado')",
                params: [idUsuario]
            };
        }

        if (tipo === 'fornecedor') {
            return { where: 'o.id_fornecedor = ?', params: [idUsuario] };
        }

        return { where: '1 = 0', params: [] };
    }

    static async listarTodos(pagina = 1, limite = 10, usuario = null) {
        const offset = (pagina - 1) * limite;
        const filtro = this.filtroPorUsuario(usuario);
        const connection = await getConnection();

        try {
            const [orcamentos] = await connection.query(
                `
                    ${this.selectDetalhado()}
                    WHERE ${filtro.where}
                    ORDER BY o.id_orcamento DESC
                    LIMIT ? OFFSET ?
                `,
                [...filtro.params, limite, offset]
            );

            const [totalResult] = await connection.query(
                `
                    SELECT COUNT(*) AS total
                    FROM orcamentos o
                    INNER JOIN encomendas e ON e.id_encomenda = o.id_encomenda
                    WHERE ${filtro.where}
                `,
                filtro.params
            );

            const total = totalResult[0].total;

            return {
                orcamentos,
                total,
                pagina,
                limite,
                totalPaginas: Math.ceil(total / limite)
            };
        } catch (error) {
            console.error('Erro ao listar orçamentos:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    static async buscarPorId(id_orcamento) {
        const connection = await getConnection();

        try {
            const [rows] = await connection.query(
                `${this.selectDetalhado()} WHERE o.id_orcamento = ? LIMIT 1`,
                [id_orcamento]
            );

            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar orçamento por ID:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    static async buscarPorNome(nome_orcamento, limite = 10, offset = 0, usuario = null) {
        const filtro = this.filtroPorUsuario(usuario);
        const connection = await getConnection();

        try {
            const nome = `%${nome_orcamento}%`;
            const where = `(${filtro.where}) AND o.nome_orcamento LIKE ?`;

            const [orcamentos] = await connection.query(
                `
                    ${this.selectDetalhado()}
                    WHERE ${where}
                    ORDER BY o.id_orcamento DESC
                    LIMIT ? OFFSET ?
                `,
                [...filtro.params, nome, limite, offset]
            );

            const [totalResult] = await connection.query(
                `
                    SELECT COUNT(*) AS total
                    FROM orcamentos o
                    INNER JOIN encomendas e ON e.id_encomenda = o.id_encomenda
                    WHERE ${where}
                `,
                [...filtro.params, nome]
            );

            const total = totalResult[0].total;

            return {
                orcamentos,
                total,
                pagina: (offset / limite) + 1,
                limite,
                totalPaginas: Math.ceil(total / limite)
            };
        } catch (error) {
            console.error('Erro ao buscar orçamento por nome:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    static async buscarPorEncomenda(id_encomenda, limite = 10, offset = 0, usuario = null) {
        const filtro = this.filtroPorUsuario(usuario);
        const connection = await getConnection();

        try {
            const where = `o.id_encomenda = ? AND (${filtro.where})`;

            const [orcamentos] = await connection.query(
                `
                    ${this.selectDetalhado()}
                    WHERE ${where}
                    ORDER BY o.estado = 'escolhida' DESC, o.id_orcamento DESC
                    LIMIT ? OFFSET ?
                `,
                [id_encomenda, ...filtro.params, limite, offset]
            );

            const [totalResult] = await connection.query(
                `
                    SELECT COUNT(*) AS total
                    FROM orcamentos o
                    INNER JOIN encomendas e ON e.id_encomenda = o.id_encomenda
                    WHERE ${where}
                `,
                [id_encomenda, ...filtro.params]
            );

            const total = totalResult[0].total;

            return {
                orcamentos,
                total,
                pagina: (offset / limite) + 1,
                limite,
                totalPaginas: Math.ceil(total / limite)
            };
        } catch (error) {
            console.error('Erro ao buscar orçamentos por encomenda:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    static async buscarPorEstado(estado, limite = 10, offset = 0, usuario = null) {
        const filtro = this.filtroPorUsuario(usuario);
        const connection = await getConnection();

        try {
            const where = `o.estado = ? AND (${filtro.where})`;

            const [orcamentos] = await connection.query(
                `
                    ${this.selectDetalhado()}
                    WHERE ${where}
                    ORDER BY o.id_orcamento DESC
                    LIMIT ? OFFSET ?
                `,
                [estado, ...filtro.params, limite, offset]
            );

            const [totalResult] = await connection.query(
                `
                    SELECT COUNT(*) AS total
                    FROM orcamentos o
                    INNER JOIN encomendas e ON e.id_encomenda = o.id_encomenda
                    WHERE ${where}
                `,
                [estado, ...filtro.params]
            );

            const total = totalResult[0].total;

            return {
                orcamentos,
                total,
                pagina: (offset / limite) + 1,
                limite,
                totalPaginas: Math.ceil(total / limite)
            };
        } catch (error) {
            console.error('Erro ao buscar orçamentos por estado:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    static async criar(dadosOrcamento) {
        try {
            return await create('orcamentos', dadosOrcamento);
        } catch (error) {
            console.error('Erro ao criar orçamento:', error);
            throw error;
        }
    }

    static async atualizar(id_orcamento, dadosOrcamento) {
        try {
            return await update('orcamentos', dadosOrcamento, 'id_orcamento = ?', [id_orcamento]);
        } catch (error) {
            console.error('Erro ao atualizar orçamento:', error);
            throw error;
        }
    }

    static async excluir(id_orcamento) {
        try {
            return await deleteRecord('orcamentos', 'id_orcamento = ?', [id_orcamento]);
        } catch (error) {
            console.error('Erro ao excluir orçamento:', error);
            throw error;
        }
    }

    static async escolherOrcamento(id_orcamento, id_cliente) {
        const connection = await getConnection();

        try {
            await connection.beginTransaction();

            const [rows] = await connection.query(
                `
                    SELECT o.*, e.id_user AS id_cliente, e.status AS status_encomenda
                    FROM orcamentos o
                    INNER JOIN encomendas e ON e.id_encomenda = o.id_encomenda
                    WHERE o.id_orcamento = ?
                    FOR UPDATE
                `,
                [id_orcamento]
            );

            const orcamento = rows[0];

            if (!orcamento) {
                const erro = new Error('Orçamento não encontrado');
                erro.status = 404;
                throw erro;
            }

            if (Number(orcamento.id_cliente) !== Number(id_cliente)) {
                const erro = new Error('Você só pode escolher orçamento de encomenda criada por você');
                erro.status = 403;
                throw erro;
            }

            if (!['visivel', 'escolhida'].includes(orcamento.estado)) {
                const erro = new Error('Este orçamento não está disponível para escolha');
                erro.status = 400;
                throw erro;
            }

            await connection.execute(
                `
                    UPDATE orcamentos
                    SET estado = 'recusado'
                    WHERE id_encomenda = ?
                      AND id_orcamento <> ?
                      AND estado <> 'cancelado'
                `,
                [orcamento.id_encomenda, id_orcamento]
            );

            await connection.execute(
                "UPDATE orcamentos SET estado = 'escolhida' WHERE id_orcamento = ?",
                [id_orcamento]
            );

            await connection.execute(
                `
                    UPDATE encomendas
                    SET id_fornecedor = ?,
                        orcamento = ?,
                        status = 'orcamento_escolhido'
                    WHERE id_encomenda = ?
                `,
                [orcamento.id_fornecedor, orcamento.estimacao, orcamento.id_encomenda]
            );

            await connection.commit();

            return {
                ...orcamento,
                estado: 'escolhida'
            };
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
}

export default OrcamentosModel;
