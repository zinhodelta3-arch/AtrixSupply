import { getConnection } from "../config/database.js";

const INTERVALO_LIMPEZA_MS = 24 * 60 * 60 * 1000; // 24 horas

export async function excluirNotificacaoAutomatica() {
  const connection = await getConnection();

  try {
    const [resultado] = await connection.execute(`
      DELETE FROM notificacoes
      WHERE data_criacao < DATE_SUB(NOW(), INTERVAL 7 DAY)
    `);

    console.log(
      `[Notificações] Limpeza concluída. Removidas: ${resultado.affectedRows}`
    );

    return resultado.affectedRows;
  } catch (error) {
    console.error("[Notificações] Erro ao limpar notificações antigas:", error);
    return 0;
  } finally {
    connection.release();
  }
}

export function iniciarLimpezaNotificacoesAutomaticas() {
  excluirNotificacaoAutomatica();

  setInterval(() => {
    excluirNotificacaoAutomatica();
  }, INTERVALO_LIMPEZA_MS);
}