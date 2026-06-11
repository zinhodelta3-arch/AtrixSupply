import PublicMetricasModel from "../models/PublicMetricasModel.js";

const TEMPO_CACHE_MS = 5 * 60 * 1000;

let cacheMetricasHome = {
  atualizadoEm: 0,
  dados: null,
};

function aproximarContador(valor) {
  const numero = Number(valor || 0);

  if (!Number.isFinite(numero) || numero <= 0) {
    return "0";
  }

  if (numero < 10) {
    return "10+";
  }

  if (numero < 100) {
    return `${Math.floor(numero / 10) * 10}+`;
  }

  if (numero < 1000) {
    return `${Math.floor(numero / 50) * 50}+`;
  }

  if (numero < 10000) {
    return `${Math.floor(numero / 100) * 100}+`;
  }

  return `${Math.floor(numero / 1000) * 1000}+`;
}

function formatarMetricasPublicas(metricas) {
  return {
    produtosCatalogados: aproximarContador(metricas.produtosCatalogados),
    usuariosCadastrados: aproximarContador(metricas.usuariosCadastrados),
    pedidosFeitos: aproximarContador(metricas.pedidosFeitos),
  };
}

class PublicMetricasController {
  static async metricasHome(req, res) {
    try {
      const agora = Date.now();
      const cacheValido =
        cacheMetricasHome.dados &&
        agora - cacheMetricasHome.atualizadoEm < TEMPO_CACHE_MS;

      if (cacheValido) {
        return res.status(200).json({
          sucesso: true,
          mensagem: "Métricas públicas carregadas com sucesso.",
          dados: cacheMetricasHome.dados,
          cache: true,
        });
      }

      const metricasReais = await PublicMetricasModel.buscarMetricasHome();
      const metricasPublicas = formatarMetricasPublicas(metricasReais);

      cacheMetricasHome = {
        atualizadoEm: agora,
        dados: metricasPublicas,
      };

      return res.status(200).json({
        sucesso: true,
        mensagem: "Métricas públicas carregadas com sucesso.",
        dados: metricasPublicas,
        cache: false,
      });
    } catch (error) {
      console.error("Erro ao carregar métricas públicas da home:", error);

      return res.status(500).json({
        sucesso: false,
        mensagem: "Não foi possível carregar as métricas públicas no momento.",
        dados: {
          produtosCatalogados: "0",
          usuariosCadastrados: "0",
          pedidosFeitos: "0",
        },
      });
    }
  }
}

export default PublicMetricasController;