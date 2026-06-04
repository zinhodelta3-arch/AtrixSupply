"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");

const pageBackground = `
  radial-gradient(circle at top left, rgba(255,136,0,.10), transparent 25%),
  radial-gradient(circle at bottom right, rgba(192,1,42,.16), transparent 30%),
  linear-gradient(145deg,#08080a,#101014,#160d12)
`;

const surfaceGradient = `
  linear-gradient(
    145deg,
    rgba(17,17,17,.96),
    rgba(25,18,22,.96)
  )
`;

const innerSurfaceGradient = `
  linear-gradient(
    145deg,
    rgba(255,255,255,.035),
    rgba(255,255,255,.015)
  )
`;

const cardStyle = {
  background: surfaceGradient,
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "24px",
  boxShadow: "none",
};

const innerCardStyle = {
  background: innerSurfaceGradient,
  border: "1px solid rgba(255,255,255,.06)",
  borderRadius: "20px",
  boxShadow: "none",
};

const metricCardStyle = (cor, ativo) => ({
  background: ativo
    ? `
      linear-gradient(
        145deg,
        rgba(22,22,26,.98),
        rgba(35,20,25,.98)
      )
    `
    : surfaceGradient,
  border: ativo ? `1px solid ${cor}66` : "1px solid rgba(255,255,255,.08)",
  borderRadius: "24px",
  boxShadow: ativo
    ? `0 18px 42px rgba(0,0,0,.26), 0 0 0 1px ${cor}22`
    : "none",
  transform: ativo ? "translateY(-5px)" : "translateY(0)",
  transition:
    "transform .22s ease, border-color .22s ease, background .22s ease, box-shadow .22s ease",
  cursor: "default",
});

const metricIconStyle = (cor, ativo) => ({
  width: "58px",
  height: "58px",
  borderRadius: "18px",
  background: ativo ? `${cor}24` : `${cor}18`,
  border: ativo ? `1px solid ${cor}55` : `1px solid ${cor}33`,
  color: cor,
  flexShrink: 0,
  transform: ativo ? "scale(1.07) rotate(-3deg)" : "scale(1)",
  transition: "transform .22s ease, background .22s ease, border-color .22s ease",
});

const statusCardStyle = (cor, ativo) => ({
  ...innerCardStyle,
  padding: "15px",
  border: ativo ? `1px solid ${cor}55` : innerCardStyle.border,
  background: ativo
    ? `
      linear-gradient(
        145deg,
        rgba(255,255,255,.055),
        rgba(255,255,255,.025)
      )
    `
    : innerCardStyle.background,
  transform: ativo ? "translateX(4px)" : "translateX(0)",
  transition:
    "transform .2s ease, border-color .2s ease, background .2s ease",
});

const buttonGradient = {
  background: "linear-gradient(90deg,#940533,#c0012a,#ff8800)",
  color: "white",
  border: "none",
  borderRadius: "16px",
  fontWeight: "800",
  boxShadow: "none",
};

const dashboardTableWrapperStyle = {
  borderRadius: "22px",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,.08)",
  background: "linear-gradient(145deg, rgba(10,10,14,.98), rgba(22,13,18,.98))",
};

const dashboardTableStyle = {
  "--bs-table-bg": "transparent",
  "--bs-table-color": "#ffffff",
  "--bs-table-hover-bg": "rgba(255,136,0,.06)",
  "--bs-table-hover-color": "#ffffff",
  "--bs-table-border-color": "rgba(255,255,255,.07)",
  marginBottom: 0,
};

const dashboardTableHeadCellStyle = {
  background: "rgba(255,179,0,.08)",
  color: "#ffcf40",
  borderColor: "rgba(255,255,255,.08)",
  padding: "16px 18px",
  fontWeight: "800",
};

const dashboardTableCellStyle = {
  background: "transparent",
  color: "#ffffff",
  borderColor: "rgba(255,255,255,.07)",
  padding: "16px 18px",
};

const meses = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

function obterToken() {
  if (typeof window === "undefined") return "";

  return (
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("jwt") ||
    ""
  );
}

function obterUsuarioLocal() {
  if (typeof window === "undefined") return null;

  const chaves = ["usuario", "user", "dadosUsuario", "authUser"];

  for (const chave of chaves) {
    const valor = localStorage.getItem(chave);

    if (!valor) continue;

    try {
      return JSON.parse(valor);
    } catch {
      continue;
    }
  }

  return null;
}

function normalizarTipoUsuario(usuario) {
  if (!usuario) return "";

  return String(
    usuario?.tipo ||
      usuario?.tipo_user ||
      usuario?.role ||
      usuario?.nivel ||
      usuario?.dados?.tipo ||
      usuario?.dados?.tipo_user ||
      usuario?.usuario?.tipo ||
      ""
  )
    .trim()
    .toLowerCase();
}

function usuarioEhAdministrador(usuario) {
  const tipo = normalizarTipoUsuario(usuario);

  return tipo === "administrador" || tipo === "admin";
}

function usuarioEhCliente(usuario) {
  const tipo = normalizarTipoUsuario(usuario);

  if (!tipo) return false;

  return tipo === "comum" || tipo === "cliente";
}

function montarUrl(endpoint, params = {}) {
  const url = new URL(`${API_URL}${endpoint}`);

  Object.entries(params).forEach(([chave, valor]) => {
    if (valor !== undefined && valor !== null && valor !== "") {
      url.searchParams.set(chave, String(valor));
    }
  });

  return url.toString();
}

function montarHeaders() {
  const token = obterToken();

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function requisitarJson(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: montarHeaders(),
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || data?.sucesso === false) {
    const detalhes = Array.isArray(data?.detalhes)
      ? data.detalhes.map((item) => item.mensagem).join(" | ")
      : null;

    throw new Error(
      detalhes ||
        data?.mensagem ||
        data?.erro ||
        `Erro ao buscar dados em ${url}`
    );
  }

  return data;
}

async function buscarTodasPaginas(endpoint, limite = 100) {
  let pagina = 1;
  let totalPaginas = 1;
  let dadosAcumulados = [];
  let paginacaoFinal = null;

  do {
    const url = montarUrl(endpoint, {
      pagina,
      limite,
    });

    const data = await requisitarJson(url);

    const dados = Array.isArray(data?.dados) ? data.dados : [];

    dadosAcumulados = [...dadosAcumulados, ...dados];

    paginacaoFinal = data?.paginacao || null;
    totalPaginas = Number(data?.paginacao?.totalPaginas || 1);

    pagina += 1;
  } while (pagina <= totalPaginas && pagina <= 50);

  return {
    dados: dadosAcumulados,
    paginacao: paginacaoFinal,
  };
}

function formatarNumero(valor) {
  return Number(valor || 0).toLocaleString("pt-BR");
}

function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function obterIdProduto(produto) {
  return String(produto?.id_produto || produto?.id || produto?.produto_id || "");
}

function obterIdPedido(pedido) {
  return pedido?.id_pedido || pedido?.id || pedido?.pedido_id || "---";
}

function obterNumeroIdPedido(pedido) {
  return Number(pedido?.id_pedido || pedido?.id || pedido?.pedido_id || 0);
}

function criarProdutosMap(produtos) {
  const mapa = new Map();

  produtos.forEach((produto) => {
    const id = obterIdProduto(produto);

    if (id) {
      mapa.set(id, produto);
    }
  });

  return mapa;
}

function calcularValorPedido(pedido, produtosMap) {
  const valorDireto = Number(
    pedido?.preco_produto ||
      pedido?.preco ||
      pedido?.valor ||
      pedido?.valor_total ||
      pedido?.total ||
      0
  );

  if (valorDireto > 0) return valorDireto;

  const idProduto = String(
    pedido?.id_produto ||
      pedido?.produto_id ||
      pedido?.produto?.id_produto ||
      pedido?.produto?.id ||
      ""
  );

  const produto = produtosMap.get(idProduto);

  return Number(produto?.preco || produto?.preco_produto || produto?.valor || 0);
}

function obterDataPedido(pedido) {
  const valor =
    pedido?.data_pedido ||
    pedido?.data_compra ||
    pedido?.data ||
    pedido?.created_at ||
    pedido?.criado_em ||
    pedido?.createdAt;

  if (!valor) return null;

  const data = new Date(valor);

  if (Number.isNaN(data.getTime())) return null;

  return data;
}

function formatarDataPedido(pedido) {
  const data = obterDataPedido(pedido);

  if (!data) return "Sem data";

  return data.toLocaleDateString("pt-BR");
}

function obterStatusPedido(pedido) {
  return String(pedido?.status || "pendente").trim().toLowerCase();
}

function formatarStatus(status) {
  switch (status) {
    case "carrinho":
      return "Carrinho";
    case "pendente":
      return "Pendente";
    case "processando":
      return "Processando";
    case "enviado":
      return "Enviado";
    case "entregue":
      return "Entregue";
    case "cancelado":
      return "Cancelado";
    default:
      return status || "Não informado";
  }
}

function getStatusColor(status) {
  switch (status) {
    case "entregue":
      return "#5cff95";
    case "enviado":
      return "#8ab4ff";
    case "processando":
      return "#ffcf40";
    case "pendente":
      return "#ff8800";
    case "cancelado":
      return "#ff758f";
    case "carrinho":
      return "#b8b8b8";
    default:
      return "#ffcf40";
  }
}

function obterNomeCliente(pedido) {
  return (
    pedido?.nome_user ||
    pedido?.nome_cliente ||
    pedido?.usuario_nome ||
    pedido?.usuario?.nome_user ||
    "Cliente não informado"
  );
}

function obterNomeProduto(pedido, produtosMap) {
  if (pedido?.nome_produto) return pedido.nome_produto;

  const idProduto = String(pedido?.id_produto || pedido?.produto_id || "");
  const produto = produtosMap.get(idProduto);

  return produto?.nome_produto || produto?.nome || "Produto não informado";
}

export default function Dashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [avisos, setAvisos] = useState([]);

  const [usuario, setUsuario] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [cardHoverAtivo, setCardHoverAtivo] = useState(null);
  const [statusHoverAtivo, setStatusHoverAtivo] = useState(null);

  useEffect(() => {
    carregarDashboard();
  }, []);

  async function carregarDashboard() {
    try {
      setLoading(true);
      setErro("");
      setAvisos([]);

      const usuarioLocal = obterUsuarioLocal();
      const token = obterToken();

      if (!usuarioLocal || !token || !usuarioEhAdministrador(usuarioLocal)) {
        router.replace("/");
        return;
      }

      setUsuario(usuarioLocal);

      const [pedidosResult, usuariosResult, produtosResult] = await Promise.allSettled([
        buscarTodasPaginas("/api/pedidos"),
        buscarTodasPaginas("/api/usuarios"),
        buscarTodasPaginas("/api/produtos"),
      ]);

      const avisosTemp = [];

      if (pedidosResult.status === "fulfilled") {
        setPedidos(pedidosResult.value.dados);
      } else {
        setPedidos([]);
        avisosTemp.push(`Pedidos: ${pedidosResult.reason.message}`);
      }

      if (usuariosResult.status === "fulfilled") {
        setUsuarios(usuariosResult.value.dados);
      } else {
        setUsuarios([]);
        avisosTemp.push(`Usuários: ${usuariosResult.reason.message}`);
      }

      if (produtosResult.status === "fulfilled") {
        setProdutos(produtosResult.value.dados);
      } else {
        setProdutos([]);
        avisosTemp.push(`Produtos: ${produtosResult.reason.message}`);
      }

      setAvisos(avisosTemp);

      if (avisosTemp.length === 3) {
        setErro("Não foi possível carregar os dados do dashboard.");
      }
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
      setErro(error.message || "Erro ao carregar dashboard.");
    } finally {
      setLoading(false);
    }
  }

  const dadosCalculados = useMemo(() => {
    const produtosMap = criarProdutosMap(produtos);

    const clientes = usuarios.filter(usuarioEhCliente);

    const agora = new Date();
    const mesAtual = agora.getMonth();
    const anoAtual = agora.getFullYear();

    const receitaMensal = Array(12).fill(0);

    let rendaTotal = 0;
    let rendaMesAtual = 0;
    let pedidosMesAtual = 0;

    const status = {
      carrinho: 0,
      pendente: 0,
      processando: 0,
      enviado: 0,
      entregue: 0,
      cancelado: 0,
      outros: 0,
    };

    pedidos.forEach((pedido) => {
      const valor = calcularValorPedido(pedido, produtosMap);

      rendaTotal += valor;

      const data = obterDataPedido(pedido);

      if (data && data.getFullYear() === anoAtual) {
        receitaMensal[data.getMonth()] += valor;

        if (data.getMonth() === mesAtual) {
          rendaMesAtual += valor;
          pedidosMesAtual += 1;
        }
      }

      const statusPedido = obterStatusPedido(pedido);

      if (Object.prototype.hasOwnProperty.call(status, statusPedido)) {
        status[statusPedido] += 1;
      } else {
        status.outros += 1;
      }
    });

    const ticketMedio = pedidos.length > 0 ? rendaTotal / pedidos.length : 0;

    const pedidosRecentes = [...pedidos]
      .sort((a, b) => obterNumeroIdPedido(b) - obterNumeroIdPedido(a))
      .slice(0, 6)
      .map((pedido) => ({
        ...pedido,
        valor_calculado: calcularValorPedido(pedido, produtosMap),
        nome_produto_calculado: obterNomeProduto(pedido, produtosMap),
      }));

    return {
      produtosMap,
      totalPedidos: pedidos.length,
      totalClientes: clientes.length,
      totalUsuarios: usuarios.length,
      totalProdutos: produtos.length,
      rendaTotal,
      rendaMesAtual,
      pedidosMesAtual,
      ticketMedio,
      receitaMensal,
      status,
      pedidosRecentes,
    };
  }, [pedidos, usuarios, produtos]);

  const chartData = useMemo(() => {
    return {
      labels: meses,
      datasets: [
        {
          label: "Renda",
          data: dadosCalculados.receitaMensal,
          borderColor: "#f5061d",
          backgroundColor: "rgba(245,6,29,0.08)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#ff8800",
          pointBorderColor: "#ffb300",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  }, [dadosCalculados.receitaMensal]);

  const chartOptions = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "#111113",
          borderColor: "#c0012a",
          borderWidth: 1,
          titleColor: "#ffb300",
          bodyColor: "#ffffff",
          callbacks: {
            label: (context) => `Renda: ${formatarMoeda(context.raw)}`,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#a1a1aa",
          },
          grid: {
            color: "rgba(255,255,255,0.04)",
          },
        },
        y: {
          ticks: {
            color: "#a1a1aa",
            callback: (value) => formatarMoeda(value),
          },
          grid: {
            color: "rgba(255,255,255,0.04)",
          },
        },
      },
    };
  }, []);

  const metricasCards = [
    {
      titulo: "Total de Pedidos",
      valor: formatarNumero(dadosCalculados.totalPedidos),
      detalhe: `${formatarNumero(dadosCalculados.pedidosMesAtual)} neste mês`,
      icon: "bi-bag-check-fill",
      cor: "#ff8800",
    },
    {
      titulo: "Renda do Mês",
      valor: formatarMoeda(dadosCalculados.rendaMesAtual),
      detalhe: `Ticket médio: ${formatarMoeda(dadosCalculados.ticketMedio)}`,
      icon: "bi-currency-dollar",
      cor: "#5cff95",
    },
    {
      titulo: "Total de Clientes",
      valor: formatarNumero(dadosCalculados.totalClientes),
      detalhe: `${formatarNumero(dadosCalculados.totalUsuarios)} usuários no sistema`,
      icon: "bi-people-fill",
      cor: "#8ab4ff",
    },
    {
      titulo: "Produtos",
      valor: formatarNumero(dadosCalculados.totalProdutos),
      detalhe: "Produtos cadastrados",
      icon: "bi-box-seam-fill",
      cor: "#ffcf40",
    },
  ];

  const statusCards = [
    ["pendente", dadosCalculados.status.pendente],
    ["processando", dadosCalculados.status.processando],
    ["enviado", dadosCalculados.status.enviado],
    ["entregue", dadosCalculados.status.entregue],
    ["cancelado", dadosCalculados.status.cancelado],
    ["carrinho", dadosCalculados.status.carrinho],
  ];

  if (loading) {
    return (
      <main
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: pageBackground,
          color: "#ffb300",
        }}
      >
        <div className="text-center">
          <div className="spinner-border text-warning mb-3" />

          <h4 className="fw-bold">Carregando dashboard...</h4>

          <p className="mb-0" style={{ color: "rgba(255,255,255,.55)" }}>
            Buscando pedidos, usuários e produtos na API.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="container-fluid py-4 px-3 px-lg-4"
      style={{
        background: pageBackground,
        minHeight: "100vh",
        color: "white",
      }}
    >
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-5">
        <div>
          <span
            className="badge mb-3"
            style={{
              background: "rgba(255,179,0,.14)",
              color: "#ffcf40",
              border: "1px solid rgba(255,179,0,.25)",
              borderRadius: "999px",
              padding: "9px 13px",
              fontWeight: "800",
            }}
          >
            Painel administrativo
          </span>

          <h1
            className="fw-bold mb-1"
            style={{
              color: "#ffb300",
              fontSize: "2rem",
              letterSpacing: "-1px",
            }}
          >
            Dashboard
          </h1>

          <p
            className="mb-0"
            style={{
              color: "rgba(255,255,255,.58)",
              fontSize: ".95rem",
            }}
          >
            Bem-vindo, {usuario?.nome_user || "Administrador"}. Visão geral real do desempenho da loja.
          </p>
        </div>

        <div className="d-flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={carregarDashboard}
            className="btn btn-outline-light"
            style={{
              borderRadius: "14px",
              fontWeight: "800",
              boxShadow: "none",
            }}
          >
            <i className="bi bi-arrow-clockwise me-2" />
            Atualizar
          </button>

          <Link
            href="/dashboard/produtos"
            className="btn"
            style={{
              ...buttonGradient,
              padding: "10px 16px",
              textDecoration: "none",
            }}
          >
            <i className="bi bi-plus-circle me-2" />
            Gerenciar produtos
          </Link>
        </div>
      </div>

      {erro && (
        <div
          className="alert alert-danger mb-4"
          style={{
            borderRadius: "18px",
            border: "none",
          }}
        >
          {erro}
        </div>
      )}

      {avisos.length > 0 && (
        <div
          className="alert alert-warning mb-4"
          style={{
            borderRadius: "18px",
            border: "none",
          }}
        >
          <strong>Aviso:</strong> alguns dados não foram carregados.

          <ul className="mb-0 mt-2">
            {avisos.map((aviso, index) => (
              <li key={index}>{aviso}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="row g-4 mb-4">
        {metricasCards.map((card) => {
          const ativo = cardHoverAtivo === card.titulo;

          return (
            <div className="col-12 col-md-6 col-xl-3" key={card.titulo}>
              <div
                className="p-4 h-100"
                style={metricCardStyle(card.cor, ativo)}
                onMouseEnter={() => setCardHoverAtivo(card.titulo)}
                onMouseLeave={() => setCardHoverAtivo(null)}
              >
                <div className="d-flex justify-content-between align-items-start gap-3">
                  <div style={{ minWidth: 0 }}>
                    <p
                      className="mb-2"
                      style={{
                        color: ativo
                          ? "rgba(255,255,255,.74)"
                          : "rgba(255,255,255,.58)",
                        fontSize: ".92rem",
                        transition: "color .22s ease",
                      }}
                    >
                      {card.titulo}
                    </p>

                    <h2
                      className="fw-bold mb-2"
                      style={{
                        color: "#ffffff",
                        letterSpacing: "-1px",
                        fontSize: "1.8rem",
                      }}
                    >
                      {card.valor}
                    </h2>

                    <span
                      style={{
                        color: ativo
                          ? "rgba(255,255,255,.62)"
                          : "rgba(255,255,255,.45)",
                        fontSize: ".84rem",
                        transition: "color .22s ease",
                      }}
                    >
                      {card.detalhe}
                    </span>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={metricIconStyle(card.cor, ativo)}
                  >
                    <i
                      className={`bi ${card.icon}`}
                      style={{
                        color: card.cor,
                        fontSize: "1.4rem",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="row g-4 mb-4">
        <div className="col-xl-8">
          <div className="p-4 h-100" style={cardStyle}>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
              <div>
                <h4
                  className="fw-bold mb-1"
                  style={{
                    color: "#ffffff",
                    letterSpacing: "-0.5px",
                  }}
                >
                  Renda Anual
                </h4>

                <p
                  className="mb-0"
                  style={{
                    color: "rgba(255,255,255,.55)",
                    fontSize: ".92rem",
                  }}
                >
                  Soma dos pedidos por mês no ano atual
                </p>
              </div>

              <div
                className="px-3 py-2"
                style={{
                  background: "rgba(192,1,42,0.10)",
                  border: "1px solid rgba(192,1,42,0.20)",
                  borderRadius: "14px",
                  color: "#ffb300",
                  fontWeight: "700",
                  fontSize: ".9rem",
                }}
              >
                Total: {formatarMoeda(dadosCalculados.rendaTotal)}
              </div>
            </div>

            <div style={{ width: "100%", height: "400px" }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="p-4 h-100" style={cardStyle}>
            <h4
              className="fw-bold mb-1"
              style={{
                color: "#ffffff",
              }}
            >
              Pedidos por Status
            </h4>

            <p
              className="mb-4"
              style={{
                color: "rgba(255,255,255,.55)",
                fontSize: ".92rem",
              }}
            >
              Distribuição atual dos pedidos
            </p>

            <div className="d-flex flex-column gap-3">
              {statusCards.map(([status, total]) => {
                const corStatus = getStatusColor(status);
                const ativo = statusHoverAtivo === status;

                return (
                  <div
                    key={status}
                    className="d-flex justify-content-between align-items-center"
                    style={statusCardStyle(corStatus, ativo)}
                    onMouseEnter={() => setStatusHoverAtivo(status)}
                    onMouseLeave={() => setStatusHoverAtivo(null)}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <span
                        style={{
                          width: ativo ? "14px" : "12px",
                          height: ativo ? "14px" : "12px",
                          borderRadius: "999px",
                          background: corStatus,
                          display: "inline-block",
                          transition: "width .2s ease, height .2s ease",
                        }}
                      />

                      <span
                        style={{
                          color: ativo
                            ? "rgba(255,255,255,.94)"
                            : "rgba(255,255,255,.84)",
                          fontWeight: "700",
                          transition: "color .2s ease",
                        }}
                      >
                        {formatarStatus(status)}
                      </span>
                    </div>

                    <strong
                      style={{
                        color: "#fff",
                      }}
                    >
                      {formatarNumero(total)}
                    </strong>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4" style={cardStyle}>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <h4
              className="fw-bold mb-1"
              style={{
                color: "#ffffff",
              }}
            >
              Pedidos Recentes
            </h4>

            <p
              className="mb-0"
              style={{
                color: "rgba(255,255,255,.55)",
                fontSize: ".92rem",
              }}
            >
              Últimos pedidos registrados no sistema
            </p>
          </div>

          <Link
            href="/dashboard/pedidos"
            className="btn btn-outline-light"
            style={{
              borderRadius: "14px",
              fontWeight: "800",
              textDecoration: "none",
            }}
          >
            Ver todos
          </Link>
        </div>

        {dadosCalculados.pedidosRecentes.length === 0 ? (
          <div
            className="text-center py-5"
            style={{
              ...innerCardStyle,
            }}
          >
            <i
              className="bi bi-bag-x"
              style={{
                color: "#ffcf40",
                fontSize: "3rem",
              }}
            />

            <h5 className="fw-bold mt-3">Nenhum pedido encontrado</h5>

            <p
              className="mb-0"
              style={{
                color: "rgba(255,255,255,.55)",
              }}
            >
              Quando houver pedidos, eles aparecerão aqui.
            </p>
          </div>
        ) : (
          <div className="table-responsive" style={dashboardTableWrapperStyle}>
            <table
              className="table table-hover align-middle"
              style={dashboardTableStyle}
            >
              <thead>
                <tr>
                  <th style={dashboardTableHeadCellStyle}>Pedido</th>
                  <th style={dashboardTableHeadCellStyle}>Cliente</th>
                  <th style={dashboardTableHeadCellStyle}>Produto</th>
                  <th style={dashboardTableHeadCellStyle}>Data</th>
                  <th style={dashboardTableHeadCellStyle}>Status</th>
                  <th style={dashboardTableHeadCellStyle}>Valor</th>
                </tr>
              </thead>

              <tbody>
                {dadosCalculados.pedidosRecentes.map((pedido) => {
                  const status = obterStatusPedido(pedido);

                  return (
                    <tr key={obterIdPedido(pedido)}>
                      <td style={dashboardTableCellStyle} className="fw-bold">
                        #{obterIdPedido(pedido)}
                      </td>

                      <td style={dashboardTableCellStyle}>
                        {obterNomeCliente(pedido)}
                      </td>

                      <td style={dashboardTableCellStyle}>
                        {pedido.nome_produto_calculado}
                      </td>

                      <td style={dashboardTableCellStyle}>
                        {formatarDataPedido(pedido)}
                      </td>

                      <td style={dashboardTableCellStyle}>
                        <span
                          className="badge"
                          style={{
                            background: `${getStatusColor(status)}22`,
                            color: getStatusColor(status),
                            border: `1px solid ${getStatusColor(status)}55`,
                            borderRadius: "999px",
                            padding: "8px 10px",
                            fontWeight: "800",
                          }}
                        >
                          {formatarStatus(status)}
                        </span>
                      </td>

                      <td
                        style={{
                          ...dashboardTableCellStyle,
                          color: "#5cff95",
                          fontWeight: "800",
                        }}
                      >
                        {formatarMoeda(pedido.valor_calculado)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}