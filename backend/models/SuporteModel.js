import { create, read, update, getConnection } from '../config/database.js';

class SuporteModel {
    static async listarTodos(pagina = 1, limite = 10) {
        const offset = (pagina - 1) * limite;
        const connection = await getConnection();

        try {
            const [tickets] = await connection.query(
                `SELECT st.*, u.nome_user, u.email
                 FROM suporte_tickets st
                 LEFT JOIN usuarios u ON u.id_user = st.id_user
                 ORDER BY st.data_criacao DESC, st.id_ticket DESC
                 LIMIT ? OFFSET ?`,
                [parseInt(limite), parseInt(offset)]
            );

            const [totalResult] = await connection.query('SELECT COUNT(*) as total FROM suporte_tickets');
            const total = totalResult[0].total;

            return {
                tickets,
                total,
                pagina,
                limite,
                totalPaginas: Math.ceil(total / limite)
            };
        } finally {
            connection.release();
        }
    }

    static async listarPorUsuario(id_user, pagina = 1, limite = 10) {
        const offset = (pagina - 1) * limite;
        const connection = await getConnection();

        try {
            const [tickets] = await connection.query(
                `SELECT st.*, u.nome_user, u.email
                 FROM suporte_tickets st
                 LEFT JOIN usuarios u ON u.id_user = st.id_user
                 WHERE st.id_user = ?
                 ORDER BY st.data_criacao DESC, st.id_ticket DESC
                 LIMIT ? OFFSET ?`,
                [parseInt(id_user), parseInt(limite), parseInt(offset)]
            );

            const [totalResult] = await connection.query(
                'SELECT COUNT(*) as total FROM suporte_tickets WHERE id_user = ?',
                [parseInt(id_user)]
            );
            const total = totalResult[0].total;

            return {
                tickets,
                total,
                pagina,
                limite,
                totalPaginas: Math.ceil(total / limite)
            };
        } finally {
            connection.release();
        }
    }

    static async buscarPorId(id_ticket) {
        const rows = await read('suporte_tickets', 'id_ticket = ?', [id_ticket]);
        return rows[0] || null;
    }

    static async criar(dadosTicket) {
        return create('suporte_tickets', dadosTicket);
    }

    static async atualizar(id_ticket, dadosTicket) {
        return update('suporte_tickets', dadosTicket, 'id_ticket = ?', [id_ticket]);
    }
}

export default SuporteModel;
