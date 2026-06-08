import { create, read, update, deleteRecord, getConnection } from '../config/database.js';

// Model para operações com produtos
class ProdutoModel {

    // Listar todos os produtos (com paginação)
    static async listarTodos(limite, offset) {
        try {

            const connection = await getConnection();
            try {
                const sql = 'SELECT * FROM produtos ORDER BY id_produto DESC LIMIT ? OFFSET ?';

                const [produtos] = await connection.query(sql, [limite, offset]);

                const [totalResult] = await connection.execute('SELECT COUNT(*) as total FROM produtos');
                const total = totalResult[0].total;

                const paginaAtual = (offset / limite) + 1;
                const totalPaginas = Math.ceil(total / limite);

                return {
                    produtos,
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

    static async listarComFiltros(filtros = {}, limite, offset) {
        try {
            const connection = await getConnection();
            try {
                const where = [];
                const params = [];

                if (filtros.nome) {
                    where.push('nome_produto LIKE ?');
                    params.push(`%${filtros.nome}%`);
                }

                if (filtros.categoria) {
                    where.push('categoria = ?');
                    params.push(filtros.categoria);
                }

                if (filtros.precoMin !== undefined) {
                    where.push('preco >= ?');
                    params.push(Number(filtros.precoMin));
                }

                if (filtros.precoMax !== undefined) {
                    where.push('preco <= ?');
                    params.push(Number(filtros.precoMax));
                }

                if (filtros.estoque === 'disponivel') {
                    where.push('estoque > 0');
                }

                if (filtros.fornecedor) {
                    where.push('fornecedor LIKE ?');
                    params.push(`%${filtros.fornecedor}%`);
                }

                const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
                const ordenarSql = filtros.ordenar === 'preco_asc'
                    ? 'preco ASC'
                    : filtros.ordenar === 'preco_desc'
                        ? 'preco DESC'
                        : filtros.ordenar === 'nome'
                            ? 'nome_produto ASC'
                            : 'id_produto DESC';

                const sql = `SELECT * FROM produtos ${whereSql} ORDER BY ${ordenarSql} LIMIT ? OFFSET ?`;
                const [produtos] = await connection.query(sql, [...params, limite, offset]);

                const [totalResult] = await connection.query(
                    `SELECT COUNT(*) as total FROM produtos ${whereSql}`,
                    params
                );
                const total = totalResult[0].total;

                const paginaAtual = (offset / limite) + 1;
                const totalPaginas = Math.ceil(total / limite);

                return {
                    produtos,
                    total,
                    pagina: paginaAtual,
                    limite,
                    totalPaginas
                };
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error('Erro ao listar produtos com filtros:', error);
            throw error;
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
         try {

            const connection = await getConnection();
            try {
                const sql = 'SELECT * FROM produtos WHERE categoria LIKE ? ORDER BY id_produto DESC LIMIT ? OFFSET ?;';

                const [produtos] = await connection.query(sql, [categoria, limite, offset]);

                const [totalResult] = await connection.query('SELECT COUNT(*) as total FROM produtos WHERE categoria LIKE ?', [categoria]);
                const total = totalResult[0].total;

                const paginaAtual = (offset / limite) + 1;
                const totalPaginas = Math.ceil(total / limite);

                return {
                    produtos,
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


    static async buscarPorNome(nome_produto, limite, offset) {
         try {

            const connection = await getConnection();
            try {
                const sql = 'SELECT * FROM produtos WHERE nome_produto LIKE ? ORDER BY id_produto DESC LIMIT ? OFFSET ?;';

                const nome = `%${nome_produto}%`;

                const [produtos] = await connection.query(sql, [nome, limite, offset]);

                const [totalResult] = await connection.query('SELECT COUNT(*) as total FROM produtos WHERE nome_produto LIKE ?;', [nome]);
                const total = totalResult[0].total;

                const paginaAtual = (offset / limite) + 1;
                const totalPaginas = Math.ceil(total / limite);

                return {
                    produtos,
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

export default ProdutoModel;
