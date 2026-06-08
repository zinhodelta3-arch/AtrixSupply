import { create, read, update, getConnection } from '../config/database.js';

class NotificacaoModel {
    static async listarPorUsuario(id_user, pagina = 1, limite = 10) {
        const offset = (pagina - 1) * limite;
        const connection = await getConnection();

        try {
            const [notificacoes] = await connection.query(
                'SELECT * FROM notificacoes WHERE id_user = ? ORDER BY data_criacao DESC, id_notificacao DESC LIMIT ? OFFSET ?',
                [parseInt(id_user), parseInt(limite), parseInt(offset)]
            );

            const [totalResult] = await connection.query(
                'SELECT COUNT(*) as total FROM notificacoes WHERE id_user = ?',
                [parseInt(id_user)]
            );

            const total = totalResult[0].total;

            return {
                notificacoes,
                total,
                pagina,
                limite,
                totalPaginas: Math.ceil(total / limite)
            };
        } finally {
            connection.release();
        }
    }

    static async buscarPorId(id_notificacao) {
        const rows = await read('notificacoes', 'id_notificacao = ?', [id_notificacao]);
        return rows[0] || null;
    }

    static async criar(dadosNotificacao) {
        return create('notificacoes', dadosNotificacao);
    }

    static async marcarComoLida(id_notificacao) {
        return update('notificacoes', { lida: 1 }, 'id_notificacao = ?', [id_notificacao]);
    }

    static async marcarTodasComoLidas(id_user) {
        return update('notificacoes', { lida: 1 }, 'id_user = ?', [id_user]);
    }
}

export default NotificacaoModel;
