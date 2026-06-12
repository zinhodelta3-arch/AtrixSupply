import { create, read, update, deleteRecord, getConnection } from '../config/database.js';

// Model para operações com produtos
class ProdutoModel {

    // Listar todos os produtos sem filtros, mantendo compatibilidade com o controller antigo
    static async listarTodos(limite, offset) {
        return await ProdutoModel.listarComFiltros({
            limite,
            offset,
        });
    }

    // Listar produtos com filtros + paginação real no banco
    static async listarComFiltros({
        limite = 12,
        offset = 0,
        busca = "",
        categoria = "",
        precoMaximo = null,
        somenteEstoque = false,
    } = {}) {
        const connection = await getConnection();

        try {
            const where = [];
            const params = [];

            const limiteSeguro = Number(limite) > 0 ? Number(limite) : 12;
            const offsetSeguro = Number(offset) >= 0 ? Number(offset) : 0;

            if (busca && String(busca).trim()) {
                where.push("nome_produto LIKE ?");
                params.push(`%${String(busca).trim()}%`);
            }

            if (
                categoria &&
                String(categoria).trim() &&
                String(categoria).trim().toLowerCase() !== "todas"
            ) {
                where.push("categoria = ?");
                params.push(String(categoria).trim());
            }

            if (
                precoMaximo !== null &&
                precoMaximo !== undefined &&
                precoMaximo !== "" &&
                Number(precoMaximo) > 0
            ) {
                where.push("preco <= ?");
                params.push(Number(precoMaximo));
            }

            if (
                somenteEstoque === true ||
                somenteEstoque === "true" ||
                somenteEstoque === "1" ||
                somenteEstoque === 1
            ) {
                where.push("estoque > 0");
            }

            const whereSql = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

            const sqlProdutos = `
                SELECT *
                FROM produtos
                ${whereSql}
                ORDER BY id_produto DESC
                LIMIT ? OFFSET ?;
            `;

            const [produtos] = await connection.query(sqlProdutos, [
                ...params,
                limiteSeguro,
                offsetSeguro,
            ]);

            const sqlTotal = `
                SELECT COUNT(*) AS total
                FROM produtos
                ${whereSql};
            `;

            const [totalResult] = await connection.execute(sqlTotal, params);
            const total = Number(totalResult[0]?.total || 0);

            const [maiorPrecoResult] = await connection.execute(`
                SELECT MAX(preco) AS maiorPreco
                FROM produtos;
            `);

            const maiorPreco = Number(maiorPrecoResult[0]?.maiorPreco || 0);

            const paginaAtual = Math.floor(offsetSeguro / limiteSeguro) + 1;
            const totalPaginas = Math.max(1, Math.ceil(total / limiteSeguro));

            return {
                produtos,
                total,
                pagina: paginaAtual,
                limite: limiteSeguro,
                totalPaginas,
                maiorPreco,
            };
        } catch (error) {
            console.error('Erro ao listar produtos com filtros:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    // Buscar produto por ID
    static async buscarPorId(id_produto) {
        try {
            const rows = await read('produtos', 'id_produto = ?', [id_produto]);
            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar produto por ID:', error);
            throw error;
        }
    }

    // Criar novo produto
    static async criar(dadosProduto) {
        try {
            return await create('produtos', dadosProduto);
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            throw error;
        }
    }

    // Atualizar produto
    static async atualizar(id_produto, dadosProduto) {
        try {
            return await update('produtos', dadosProduto, 'id_produto = ?', [id_produto]);
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            throw error;
        }
    }

    // Excluir produto
    static async excluir(id_produto) {
        try {
            return await deleteRecord('produtos', 'id_produto = ?', [id_produto]);
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            throw error;
        }
    }

    // Buscar produtos por categoria
    static async buscarPorCategoria(categoria, limite, offset) {
        return await ProdutoModel.listarComFiltros({
            limite,
            offset,
            categoria,
        });
    }

    // Buscar produtos por nome
    static async buscarPorNome(nome_produto, limite, offset) {
        return await ProdutoModel.listarComFiltros({
            limite,
            offset,
            busca: nome_produto,
        });
    }
}

export default ProdutoModel;
