import { create, read, update, getConnection } from '../config/database.js';

class NotificacaoModel {
    static async listarPorUsuario(id_user, pagina = 1, limite = 10) {
    const offset = (pagina - 1) * limite;
    const connection = await getConnection();

    try {
        const [notificacoes] = await connection.query(
            `
            SELECT
                n.*,

                st.id_ticket,
                st.assunto AS suporte_assunto,
                st.categoria AS suporte_categoria,
                st.mensagem AS mensagem_original,
                st.resposta_admin,
                st.status AS suporte_status,
                st.data_criacao AS data_chamado,
                st.data_atualizacao AS data_resposta,

                admin.nome_user AS nome_admin_resposta,
                admin.email AS email_admin_resposta
            FROM notificacoes n
            LEFT JOIN suporte_tickets st
                ON st.id_ticket = n.id_ticket
               AND st.id_user = n.id_user
            LEFT JOIN usuarios admin
                ON admin.id_user = st.id_admin_resposta
            WHERE n.id_user = ?
            ORDER BY n.data_criacao DESC, n.id_notificacao DESC
            LIMIT ? OFFSET ?
            `,
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
