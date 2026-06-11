import { getConnection } from "../config/database.js";

class PublicMetricasModel {
  static async tabelaExiste(connection, nomeTabela) {
    const [rows] = await connection.execute(
      `
        SELECT COUNT(*) AS total
        FROM information_schema.tables
        WHERE table_schema = DATABASE()
          AND table_name = ?
      `,
      [nomeTabela]
    );

    return Number(rows?.[0]?.total || 0) > 0;
  }

  static async buscarColunas(connection, nomeTabela) {
    const [rows] = await connection.execute(
      `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = DATABASE()
          AND table_name = ?
      `,
      [nomeTabela]
    );

    return rows.map((row) => row.column_name);
  }

  static montarWhereSeguro(nomeTabela, colunas) {
    const colunasSet = new Set(colunas);

    if (nomeTabela === "produtos") {
      if (colunasSet.has("estado")) {
        return "WHERE estado NOT IN ('excluido', 'excluida', 'deletado', 'deletada', 'inativo', 'inativa')";
      }

      if (colunasSet.has("status")) {
        return "WHERE status NOT IN ('excluido', 'excluida', 'deletado', 'deletada', 'inativo', 'inativa')";
      }

      return "";
    }

    if (nomeTabela === "usuarios") {
      const filtros = [];

      if (colunasSet.has("estado")) {
        filtros.push("estado NOT IN ('excluido', 'excluida', 'banido', 'banida', 'inativo', 'inativa')");
      }

      if (colunasSet.has("status")) {
        filtros.push("status NOT IN ('excluido', 'excluida', 'banido', 'banida', 'inativo', 'inativa')");
      }

      if (colunasSet.has("tipo_user")) {
        filtros.push("tipo_user NOT IN ('admin', 'administrador')");
      } else if (colunasSet.has("tipo")) {
        filtros.push("tipo NOT IN ('admin', 'administrador')");
      } else if (colunasSet.has("nivel_acesso")) {
        filtros.push("nivel_acesso NOT IN ('admin', 'administrador')");
      }

      return filtros.length ? `WHERE ${filtros.join(" AND ")}` : "";
    }

    if (nomeTabela === "pedidos" || nomeTabela === "encomendas") {
      if (colunasSet.has("status")) {
        return "WHERE status NOT IN ('cancelado', 'cancelada', 'rascunho', 'excluido', 'excluida')";
      }

      if (colunasSet.has("estado")) {
        return "WHERE estado NOT IN ('cancelado', 'cancelada', 'rascunho', 'excluido', 'excluida')";
      }

      return "";
    }

    return "";
  }

  static async contarTabela(connection, nomeTabela) {
    const existe = await this.tabelaExiste(connection, nomeTabela);

    if (!existe) {
      return 0;
    }

    const colunas = await this.buscarColunas(connection, nomeTabela);
    const where = this.montarWhereSeguro(nomeTabela, colunas);

    const [rows] = await connection.execute(
      `
        SELECT COUNT(*) AS total
        FROM ${nomeTabela}
        ${where}
      `
    );

    return Number(rows?.[0]?.total || 0);
  }

  static async contarPrimeiraTabelaExistente(connection, nomesTabelas) {
    for (const nomeTabela of nomesTabelas) {
      const existe = await this.tabelaExiste(connection, nomeTabela);

      if (existe) {
        return this.contarTabela(connection, nomeTabela);
      }
    }

    return 0;
  }

  static async buscarMetricasHome() {
    const connection = await getConnection();

    try {
      const [produtosCatalogados, usuariosCadastrados, pedidosFeitos] =
        await Promise.all([
          this.contarPrimeiraTabelaExistente(connection, ["produtos"]),
          this.contarPrimeiraTabelaExistente(connection, ["usuarios"]),
          this.contarPrimeiraTabelaExistente(connection, ["pedidos", "encomendas"]),
        ]);

      return {
        produtosCatalogados,
        usuariosCadastrados,
        pedidosFeitos,
      };
    } finally {
      connection.release();
    }
  }
}

export default PublicMetricasModel;