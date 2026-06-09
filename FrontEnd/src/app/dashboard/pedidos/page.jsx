"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import "../algo.css";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
const PEDIDOS_ENDPOINT = `${API_URL}/api/pedidos`;

const STATUS_OPTIONS = [
  { value: "", label: "Todos" },
  { value: "carrinho", label: "Carrinho" },
  { value: "pendente", label: "Pendente" },
  { value: "processando", label: "Processando" },
  { value: "enviado", label: "Enviado" },
  { value: "entregue", label: "Entregue" },
  { value: "cancelado", label: "Cancelado" },
];

const LIMITE_OPTIONS = [5, 10, 20, 50];

const FORM_CRIAR_INICIAL = {
  id_user: "",
  id_produto: "",
};

const FORM_EDITAR_INICIAL = {
  data_entrega: "",
  status: "",
};

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
  borderRadius: "28px",
  boxShadow: "none",
};

const buttonGradient = {
  background: "linear-gradient(90deg,#940533,#c0012a,#ff8800)",
  color: "white",
  border: "none",
  borderRadius: "16px",
  fontWeight: "800",
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
  borderRadius: "28px",
  boxShadow: ativo
    ? `0 18px 42px rgba(0,0,0,.26), 0 0 0 1px ${cor}22`
    : "none",
  transform: ativo ? "translateY(-5px)" : "translateY(0)",
  transition:
    "transform .22s ease, border-color .22s ease, background .22s ease, box-shadow .22s ease",
  cursor: "default",
});

const metricIconStyle = (cor, ativo) => ({
  width: "56px",
  height: "56px",
  borderRadius: "18px",
  background: ativo ? `${cor}24` : `${cor}18`,
  border: ativo ? `1px solid ${cor}55` : `1px solid ${cor}33`,
  color: cor,
  flexShrink: 0,
  transform: ativo ? "scale(1.07) rotate(-3deg)" : "scale(1)",
  transition: "transform .22s ease, background .22s ease, border-color .22s ease",
});

const inputStyle = {
  background: "rgba(255,255,255,.04)",
  border: "1px solid rgba(255,255,255,.08)",
  color: "#ffffff",
  minHeight: "54px",
  borderRadius: "16px",
  boxShadow: "none",
};

const modalInputStyle = {
  backgroundColor: "rgba(255,255,255,.04)",
  border: "1px solid rgba(255,255,255,.10)",
  color: "#ffffff",
  minHeight: "56px",
  borderRadius: "16px",
  boxShadow: "none",
};

const labelStyle = {
  color: "rgba(255,255,255,.72)",
  fontSize: ".9rem",
  fontWeight: "700",
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
  whiteSpace: "nowrap",
};

const dashboardTableCellStyle = {
  background: "transparent",
  color: "#ffffff",
  borderColor: "rgba(255,255,255,.07)",
  padding: "16px 18px",
  verticalAlign: "middle",
};

const paginationBtnStyle = {
  background: "rgba(255,255,255,.04)",
  border: "1px solid rgba(255,255,255,.08)",
  color: "#ffcf40",
  borderRadius: "14px",
  fontWeight: "800",
  boxShadow: "none",
};

function getAuthToken() {
  if (typeof window === "undefined") return "";

  return (
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken") ||
    ""
  );
}

async function apiRequest(endpoint, options = {}) {
  const token = getAuthToken();
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(endpoint, {
    ...options,
    headers,
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await response.json() : null;

  if (!response.ok || data?.sucesso === false) {
    const detalhes = Array.isArray(data?.detalhes)
      ? data.detalhes.map((item) => item.mensagem).join(" | ")
      : "";

    throw new Error(
      detalhes ||
        data?.mensagem ||
        data?.erro ||
        `Erro ${response.status}: não foi possível concluir a operação.`
    );
  }

  return data;
}

function fecharModal(modalId) {
  if (typeof window === "undefined") return;

  const modalElement = document.getElementById(modalId);
  const bootstrap = window.bootstrap;

  if (!modalElement || !bootstrap?.Modal) return;

  const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
  modal.hide();
}

function formatarData(data) {
  if (!data) return "—";

  const dataNormalizada = String(data).includes("T") ? new Date(data) : new Date(`${data}T00:00:00`);

  if (Number.isNaN(dataNormalizada.getTime())) return "—";

  return dataNormalizada.toLocaleDateString("pt-BR");
}

function dataParaInput(data) {
  if (!data) return "";

  const dataNormalizada = String(data).includes("T") ? new Date(data) : new Date(`${data}T00:00:00`);

  if (Number.isNaN(dataNormalizada.getTime())) return "";

  return dataNormalizada.toISOString().split("T")[0];
}

function formatarStatus(status) {
  const statusNormalizado = String(status || "").toLowerCase().trim();

  const mapa = {
    carrinho: "Carrinho",
    pendente: "Pendente",
    processando: "Processando",
    enviado: "Enviado",
    entregue: "Entregue",
    cancelado: "Cancelado",
  };

  return mapa[statusNormalizado] || "Sem status";
}

function getStatusStyle(status) {
  const statusNormalizado = String(status || "").toLowerCase().trim();

  if (statusNormalizado === "entregue") {
    return {
      background: "rgba(92,255,149,.10)",
      border: "1px solid rgba(92,255,149,.22)",
      color: "#5cff95",
    };
  }

  if (statusNormalizado === "enviado") {
    return {
      background: "rgba(138,180,255,.10)",
      border: "1px solid rgba(138,180,255,.22)",
      color: "#8ab4ff",
    };
  }

  if (statusNormalizado === "processando") {
    return {
      background: "rgba(255,207,64,.10)",
      border: "1px solid rgba(255,207,64,.22)",
      color: "#ffcf40",
    };
  }

  if (statusNormalizado === "pendente" || statusNormalizado === "carrinho") {
    return {
      background: "rgba(255,136,0,.10)",
      border: "1px solid rgba(255,136,0,.22)",
      color: "#ff8800",
    };
  }

  return {
    background: "rgba(255,117,143,.10)",
    border: "1px solid rgba(255,117,143,.22)",
    color: "#ff758f",
  };
}

function getStatusDotColor(status) {
  const statusNormalizado = String(status || "").toLowerCase().trim();

  if (statusNormalizado === "entregue") return "#5cff95";
  if (statusNormalizado === "enviado") return "#8ab4ff";
  if (statusNormalizado === "processando") return "#ffcf40";
  if (statusNormalizado === "pendente" || statusNormalizado === "carrinho") return "#ff8800";

  return "#ff758f";
}

function getNomeCliente(pedido) {
  return (
    pedido?.nome_user ||
    pedido?.usuario?.nome_user ||
    pedido?.nome_cliente ||
    pedido?.cliente ||
    `Usuário #${pedido?.id_user ?? "—"}`
  );
}

function getDescricaoProduto(pedido) {
  return pedido?.nome_produto || pedido?.produto || `Produto #${pedido?.id_produto ?? "—"}`;
}

function getIniciais(nome) {
  return String(nome || "P")
    .split(" ")
    .filter(Boolean)
    .map((parte) => parte[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [limite, setLimite] = useState(10);
  const [paginacao, setPaginacao] = useState({
    pagina: 1,
    limite: 10,
    total: 0,
    totalPaginas: 1,
  });

  const [pesquisa, setPesquisa] = useState("");
  const [pesquisaAplicada, setPesquisaAplicada] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erroLista, setErroLista] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const [formCriar, setFormCriar] = useState(FORM_CRIAR_INICIAL);
  const [formCriarErro, setFormCriarErro] = useState(null);

  const [pedidoEditando, setPedidoEditando] = useState(null);
  const [formEditar, setFormEditar] = useState(FORM_EDITAR_INICIAL);
  const [formEditarErro, setFormEditarErro] = useState(null);

  const [cardHoverAtivo, setCardHoverAtivo] = useState(null);

  const totalPaginas = Math.max(1, Number(paginacao?.totalPaginas || 1));

  const paginasVisiveis = useMemo(() => {
    const total = totalPaginas;
    const atual = Number(pagina || 1);
    const tamanho = 5;

    let inicio = Math.max(1, atual - Math.floor(tamanho / 2));
    let fim = Math.min(total, inicio + tamanho - 1);

    if (fim - inicio + 1 < tamanho) {
      inicio = Math.max(1, fim - tamanho + 1);
    }

    return Array.from({ length: fim - inicio + 1 }, (_, index) => inicio + index);
  }, [pagina, totalPaginas]);

  const endpointAtual = useMemo(() => {
    const params = new URLSearchParams({
      pagina: String(pagina),
      limite: String(limite),
    });

    if (statusFiltro) {
      return `${PEDIDOS_ENDPOINT}/status/${encodeURIComponent(statusFiltro)}?${params.toString()}`;
    }

    if (pesquisaAplicada.trim()) {
      return `${PEDIDOS_ENDPOINT}/nome_user/${encodeURIComponent(pesquisaAplicada.trim())}?${params.toString()}`;
    }

    return `${PEDIDOS_ENDPOINT}?${params.toString()}`;
  }, [pagina, limite, pesquisaAplicada, statusFiltro]);

  const carregarPedidos = useCallback(async () => {
    try {
      setCarregando(true);
      setErroLista(null);

      const resposta = await apiRequest(endpointAtual);

      const lista = Array.isArray(resposta?.dados)
        ? resposta.dados
        : Array.isArray(resposta?.dados?.pedidos)
        ? resposta.dados.pedidos
        : [];

      setPedidos(lista);

      setPaginacao({
        pagina: Number(resposta?.paginacao?.pagina || pagina),
        limite: Number(resposta?.paginacao?.limite || limite),
        total: Number(resposta?.paginacao?.total || lista.length),
        totalPaginas: Number(resposta?.paginacao?.totalPaginas || 1),
      });
    } catch (error) {
      setPedidos([]);
      setErroLista(error.message || "Não foi possível carregar os pedidos.");
    } finally {
      setCarregando(false);
    }
  }, [endpointAtual, pagina, limite]);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js").then((bootstrap) => {
      window.bootstrap = bootstrap?.default || bootstrap;
    });
  }, []);

  useEffect(() => {
    carregarPedidos();
  }, [carregarPedidos]);

  function limparFeedbacks() {
    setFeedback(null);
    setErroLista(null);
    setFormCriarErro(null);
    setFormEditarErro(null);
  }

  function handlePesquisar(event) {
    event.preventDefault();
    limparFeedbacks();
    setPagina(1);
    setPesquisaAplicada(pesquisa);
  }

  function handleLimparFiltros() {
    limparFeedbacks();
    setPesquisa("");
    setPesquisaAplicada("");
    setStatusFiltro("");
    setPagina(1);
  }

  function handleMudarStatusFiltro(event) {
    limparFeedbacks();
    setStatusFiltro(event.target.value);
    setPagina(1);
  }

  function handleMudarLimite(event) {
    limparFeedbacks();
    setLimite(Number(event.target.value));
    setPagina(1);
  }

  function validarFormularioCriar() {
    const idUser = Number(formCriar.id_user);
    const idProduto = Number(formCriar.id_produto);

    if (!idUser || Number.isNaN(idUser) || idUser <= 0) {
      return "Informe um ID de usuário válido.";
    }

    if (!idProduto || Number.isNaN(idProduto) || idProduto <= 0) {
      return "Informe um ID de produto válido.";
    }

    return null;
  }

  async function handleCriarPedido(event) {
    event.preventDefault();
    limparFeedbacks();

    const erroValidacao = validarFormularioCriar();

    if (erroValidacao) {
      setFormCriarErro(erroValidacao);
      return;
    }

    try {
      setSalvando(true);

      await apiRequest(PEDIDOS_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({
          id_user: Number(formCriar.id_user),
          id_produto: Number(formCriar.id_produto),
        }),
      });

      setFormCriar(FORM_CRIAR_INICIAL);
      setFeedback("Pedido criado com sucesso.");
      fecharModal("pedidoCreateModal");

      if (pagina !== 1) {
        setPagina(1);
      } else {
        await carregarPedidos();
      }
    } catch (error) {
      setFormCriarErro(error.message || "Não foi possível criar o pedido.");
    } finally {
      setSalvando(false);
    }
  }

  function prepararEdicao(pedido) {
    limparFeedbacks();

    setPedidoEditando(pedido);

    setFormEditar({
      data_entrega: dataParaInput(pedido?.data_entrega),
      status: String(pedido?.status || ""),
    });
  }

  async function handleAtualizarPedido(event) {
    event.preventDefault();
    limparFeedbacks();

    if (!pedidoEditando?.id_pedido) {
      setFormEditarErro("Pedido inválido para edição.");
      return;
    }

    if (!formEditar.data_entrega && !formEditar.status) {
      setFormEditarErro("Informe pelo menos uma alteração.");
      return;
    }

    try {
      setSalvando(true);

      const payload = {};

      if (formEditar.data_entrega) {
        payload.data_entrega = formEditar.data_entrega;
      }

      if (formEditar.status) {
        payload.status = formEditar.status;
      }

      await apiRequest(`${PEDIDOS_ENDPOINT}/${pedidoEditando.id_pedido}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      setFeedback("Pedido atualizado com sucesso.");
      fecharModal("pedidoEditModal");
      await carregarPedidos();
    } catch (error) {
      setFormEditarErro(error.message || "Não foi possível atualizar o pedido.");
    } finally {
      setSalvando(false);
    }
  }

  async function handleExcluirPedido(pedido) {
    limparFeedbacks();

    const idPedido = pedido?.id_pedido;

    if (!idPedido) return;

    const confirmar = window.confirm(`Deseja excluir o pedido #${idPedido}?`);

    if (!confirmar) return;

    try {
      setSalvando(true);

      await apiRequest(`${PEDIDOS_ENDPOINT}/${idPedido}`, {
        method: "DELETE",
      });

      setFeedback("Pedido excluído com sucesso.");

      if (pedidos.length === 1 && pagina > 1) {
        setPagina((paginaAtual) => Math.max(1, paginaAtual - 1));
      } else {
        await carregarPedidos();
      }
    } catch (error) {
      setErroLista(error.message || "Não foi possível excluir o pedido.");
    } finally {
      setSalvando(false);
    }
  }

  const metricas = useMemo(() => {
    const totalPagina = pedidos.length;

    const porStatus = pedidos.reduce((acc, pedido) => {
      const status = String(pedido?.status || "sem_status").toLowerCase().trim();
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return {
      totalSistema: paginacao.total || totalPagina,
      totalPagina,
      pendentes: (porStatus.pendente || 0) + (porStatus.carrinho || 0),
      emAndamento: (porStatus.processando || 0) + (porStatus.enviado || 0),
      entregues: porStatus.entregue || 0,
      cancelados: porStatus.cancelado || 0,
    };
  }, [pedidos, paginacao.total]);

  const metricasCards = [
    {
      titulo: "Total no sistema",
      valor: Number(metricas.totalSistema || 0).toLocaleString("pt-BR"),
      detalhe: "Pedidos cadastrados",
      icon: "bi-bag-check-fill",
      cor: "#ffcf40",
    },
    {
      titulo: "Nesta página",
      valor: Number(metricas.totalPagina || 0).toLocaleString("pt-BR"),
      detalhe: "Pedidos carregados agora",
      icon: "bi-list-check",
      cor: "#ff8800",
    },
    {
      titulo: "Em andamento",
      valor: Number(metricas.emAndamento || 0).toLocaleString("pt-BR"),
      detalhe: "Processando ou enviados",
      icon: "bi-truck",
      cor: "#8ab4ff",
    },
    {
      titulo: "Pendentes",
      valor: Number(metricas.pendentes || 0).toLocaleString("pt-BR"),
      detalhe: "Carrinho ou pendente",
      icon: "bi-hourglass-split",
      cor: "#ff758f",
    },
  ];

  return (
    <main
      className="container-fluid py-4 px-3 px-lg-4"
      style={{
        background: pageBackground,
        minHeight: "100vh",
        color: "white",
      }}
    >
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
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
            Administração
          </span>

          <h1
            className="fw-bold mb-1"
            style={{
              color: "#ffb300",
              fontSize: "2rem",
              letterSpacing: "-1px",
            }}
          >
            Pedidos
          </h1>

          <p
            className="mb-0"
            style={{
              color: "rgba(255,255,255,.58)",
              fontSize: ".95rem",
            }}
          >
            Gerenciamento de pedidos, clientes, produtos, status e entregas da plataforma.
          </p>
        </div>

        <button
          type="button"
          className="btn d-inline-flex align-items-center gap-2 px-4 py-2"
          data-bs-toggle="modal"
          data-bs-target="#pedidoCreateModal"
          onClick={() => {
            limparFeedbacks();
            setFormCriar(FORM_CRIAR_INICIAL);
          }}
          style={buttonGradient}
        >
          <i className="bi bi-plus-lg" />
          Novo pedido
        </button>
      </div>

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
                        color: ativo ? "rgba(255,255,255,.74)" : "rgba(255,255,255,.58)",
                        fontSize: ".9rem",
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
                        color: ativo ? "rgba(255,255,255,.58)" : "rgba(255,255,255,.42)",
                        fontSize: ".82rem",
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
                    <i className={`bi ${card.icon}`} style={{ fontSize: "1.35rem" }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {(feedback || erroLista) && (
        <div
          className="alert border-0 mb-4"
          style={{
            background: feedback ? "rgba(34,197,94,0.10)" : "rgba(245,6,29,0.10)",
            color: feedback ? "#5cff95" : "#ff758f",
            borderRadius: "18px",
          }}
        >
          {feedback || erroLista}
        </div>
      )}

      <section className="p-3 p-lg-4" style={cardStyle}>
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
          <div>
            <h4
              className="fw-bold mb-1"
              style={{
                color: "#ffffff",
                letterSpacing: "-0.5px",
              }}
            >
              Lista de Pedidos
            </h4>

            <p
              className="mb-0"
              style={{
                color: "rgba(255,255,255,.55)",
                fontSize: ".9rem",
              }}
            >
              Controle, criação, edição, exclusão e paginação dos pedidos.
            </p>
          </div>

          <div
            className="d-flex flex-column flex-xl-row gap-2 align-items-stretch align-items-xl-center"
            style={{
              width: "min(100%, 900px)",
            }}
          >
            <form onSubmit={handlePesquisar} className="d-flex gap-2 flex-grow-1">
              <div
                className="d-flex align-items-center px-3 flex-grow-1"
                style={{
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: "16px",
                  minWidth: "240px",
                  height: "48px",
                }}
              >
                <i className="bi bi-search" style={{ color: "#ffcf40" }} />

                <input
                  type="text"
                  value={pesquisa}
                  onChange={(event) => setPesquisa(event.target.value)}
                  placeholder="Pesquisar por nome do cliente..."
                  className="form-control border-0 shadow-none"
                  style={{
                    background: "transparent",
                    color: "#ffffff",
                    fontSize: ".92rem",
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn"
                style={{
                  ...paginationBtnStyle,
                  minWidth: "48px",
                }}
                title="Pesquisar"
              >
                <i className="bi bi-arrow-right" />
              </button>
            </form>

            <select
              value={statusFiltro}
              onChange={handleMudarStatusFiltro}
              className="form-select shadow-none"
              style={{
                ...inputStyle,
                minWidth: "170px",
                height: "48px",
                cursor: "pointer",
              }}
            >
              {STATUS_OPTIONS.map((status) => (
                <option
                  key={status.value || "todos"}
                  value={status.value}
                  style={{ background: "#151518", color: "#fff" }}
                >
                  {status.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="btn"
              onClick={handleLimparFiltros}
              style={{
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.08)",
                color: "#ffffff",
                borderRadius: "14px",
                height: "48px",
                fontWeight: "800",
              }}
            >
              Limpar
            </button>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
          <span
            style={{
              color: "rgba(255,255,255,.55)",
              fontSize: ".9rem",
            }}
          >
            {paginacao.total} pedido(s) encontrado(s)
          </span>

          <div className="d-flex align-items-center gap-2">
            <span
              style={{
                color: "rgba(255,255,255,.55)",
                fontSize: ".88rem",
              }}
            >
              Mostrar
            </span>

            <select
              value={limite}
              onChange={handleMudarLimite}
              className="form-select form-select-sm shadow-none"
              style={{
                width: "82px",
                backgroundColor: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.08)",
                color: "#ffffff",
                borderRadius: "12px",
              }}
            >
              {LIMITE_OPTIONS.map((opcao) => (
                <option
                  key={opcao}
                  value={opcao}
                  style={{ background: "#151518", color: "#fff" }}
                >
                  {opcao}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-responsive" style={dashboardTableWrapperStyle}>
          <table
            className="table table-hover align-middle"
            style={dashboardTableStyle}
          >
            <thead>
              <tr>
                <th style={dashboardTableHeadCellStyle}>Cliente</th>
                <th style={dashboardTableHeadCellStyle}>Produto</th>
                <th style={dashboardTableHeadCellStyle}>Nº do pedido</th>
                <th style={dashboardTableHeadCellStyle}>Data do pedido</th>
                <th style={dashboardTableHeadCellStyle}>Data de entrega</th>
                <th style={dashboardTableHeadCellStyle}>Status</th>
                <th style={{ ...dashboardTableHeadCellStyle, textAlign: "right" }}>
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {carregando ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center"
                    style={{
                      ...dashboardTableCellStyle,
                      padding: "34px 18px",
                      color: "rgba(255,255,255,.65)",
                    }}
                  >
                    <span className="spinner-border spinner-border-sm text-warning me-2" />
                    Carregando pedidos...
                  </td>
                </tr>
              ) : pedidos.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center"
                    style={{
                      ...dashboardTableCellStyle,
                      padding: "42px 18px",
                    }}
                  >
                    <i
                      className="bi bi-bag-x d-block mb-3"
                      style={{
                        color: "#ffcf40",
                        fontSize: "2.4rem",
                      }}
                    />

                    <h5 className="fw-bold mb-1">Nenhum pedido encontrado</h5>

                    <p
                      className="mb-0"
                      style={{
                        color: "rgba(255,255,255,.52)",
                      }}
                    >
                      Tente mudar os filtros ou cadastre um novo pedido.
                    </p>
                  </td>
                </tr>
              ) : (
                pedidos.map((pedido) => {
                  const nomeCliente = getNomeCliente(pedido);
                  const statusDotColor = getStatusDotColor(pedido.status);

                  return (
                    <tr key={pedido.id_pedido}>
                      <td style={dashboardTableCellStyle}>
                        <div className="d-flex align-items-center">
                          <div
                            className="d-flex justify-content-center align-items-center fw-bold text-uppercase"
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "16px",
                              background: "rgba(255,179,0,.12)",
                              border: "1px solid rgba(255,179,0,.20)",
                              color: "#ffcf40",
                              fontSize: ".9rem",
                              flexShrink: 0,
                            }}
                          >
                            {getIniciais(nomeCliente)}
                          </div>

                          <div className="ms-3" style={{ minWidth: 0 }}>
                            <div
                              className="fw-bold text-truncate"
                              style={{
                                color: "#ffffff",
                                fontSize: ".95rem",
                                maxWidth: "230px",
                              }}
                              title={nomeCliente}
                            >
                              {nomeCliente}
                            </div>

                            <div
                              style={{
                                color: "rgba(255,255,255,.50)",
                                fontSize: ".82rem",
                              }}
                            >
                              ID usuário: {pedido.id_user ?? "—"}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td style={dashboardTableCellStyle}>
                        <span
                          className="d-inline-block text-truncate"
                          style={{
                            color: "rgba(255,255,255,.82)",
                            maxWidth: "220px",
                          }}
                          title={getDescricaoProduto(pedido)}
                        >
                          {getDescricaoProduto(pedido)}
                        </span>
                      </td>

                      <td style={dashboardTableCellStyle}>
                        <span
                          className="fw-bold"
                          style={{
                            color: "#ffcf40",
                            whiteSpace: "nowrap",
                          }}
                        >
                          #{pedido.id_pedido}
                        </span>
                      </td>

                      <td style={dashboardTableCellStyle}>
                        <span style={{ color: "rgba(255,255,255,.72)", whiteSpace: "nowrap" }}>
                          {formatarData(pedido.data_pedido)}
                        </span>
                      </td>

                      <td style={dashboardTableCellStyle}>
                        <span style={{ color: "rgba(255,255,255,.72)", whiteSpace: "nowrap" }}>
                          {formatarData(pedido.data_entrega)}
                        </span>
                      </td>

                      <td style={dashboardTableCellStyle}>
                        <span
                          className="px-3 py-2 d-inline-flex align-items-center gap-2"
                          style={{
                            borderRadius: "999px",
                            fontSize: ".78rem",
                            fontWeight: "800",
                            whiteSpace: "nowrap",
                            ...getStatusStyle(pedido.status),
                          }}
                        >
                          <span
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "999px",
                              background: statusDotColor,
                              display: "inline-block",
                            }}
                          />
                          {formatarStatus(pedido.status)}
                        </span>
                      </td>

                      <td
                        style={{
                          ...dashboardTableCellStyle,
                          textAlign: "right",
                        }}
                      >
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            type="button"
                            className="btn d-flex align-items-center justify-content-center"
                            data-bs-toggle="modal"
                            data-bs-target="#pedidoEditModal"
                            onClick={() => prepararEdicao(pedido)}
                            disabled={salvando}
                            title="Editar pedido"
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "14px",
                              background: "rgba(255,179,0,.08)",
                              border: "1px solid rgba(255,179,0,.16)",
                              color: "#ffcf40",
                              boxShadow: "none",
                            }}
                          >
                            <i className="bi bi-pencil-square" />
                          </button>

                          <button
                            type="button"
                            className="btn d-flex align-items-center justify-content-center"
                            onClick={() => handleExcluirPedido(pedido)}
                            disabled={salvando}
                            title="Excluir pedido"
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "14px",
                              background: "rgba(245,6,29,.10)",
                              border: "1px solid rgba(245,6,29,.18)",
                              color: "#ff758f",
                              boxShadow: "none",
                            }}
                          >
                            <i className="bi bi-trash3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {!carregando && !erroLista && (
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4">
            <span
              style={{
                color: "rgba(255,255,255,.55)",
                fontSize: ".9rem",
              }}
            >
              Página {paginacao.pagina || pagina} de {totalPaginas}
            </span>

            <div className="d-flex gap-2 flex-wrap">
              <button
                type="button"
                className="btn px-3"
                disabled={pagina <= 1 || carregando}
                onClick={() => setPagina((paginaAtual) => Math.max(1, paginaAtual - 1))}
                style={{
                  ...paginationBtnStyle,
                  opacity: pagina <= 1 ? 0.45 : 1,
                  cursor: pagina <= 1 ? "not-allowed" : "pointer",
                }}
              >
                <i className="bi bi-chevron-left me-1" />
                Anterior
              </button>

              {paginasVisiveis.map((numeroPagina) => {
                const ativo = numeroPagina === pagina;

                return (
                  <button
                    key={numeroPagina}
                    type="button"
                    className="btn px-3"
                    onClick={() => setPagina(numeroPagina)}
                    disabled={ativo || carregando}
                    style={{
                      ...paginationBtnStyle,
                      background: ativo
                        ? "linear-gradient(90deg,#940533,#c0012a,#ff8800)"
                        : paginationBtnStyle.background,
                      color: "#ffffff",
                      border: ativo
                        ? "1px solid rgba(255,255,255,.10)"
                        : paginationBtnStyle.border,
                    }}
                  >
                    {numeroPagina}
                  </button>
                );
              })}

              <button
                type="button"
                className="btn px-3"
                disabled={pagina >= totalPaginas || carregando}
                onClick={() => setPagina((paginaAtual) => Math.min(totalPaginas, paginaAtual + 1))}
                style={{
                  ...paginationBtnStyle,
                  opacity: pagina >= totalPaginas ? 0.45 : 1,
                  cursor: pagina >= totalPaginas ? "not-allowed" : "pointer",
                }}
              >
                Próxima
                <i className="bi bi-chevron-right ms-1" />
              </button>
            </div>
          </div>
        )}
      </section>

      <div className="modal fade" id="pedidoCreateModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div
            className="modal-content border-0 overflow-hidden"
            style={{
              background: surfaceGradient,
              borderRadius: "30px",
              border: "1px solid rgba(255,255,255,.10)",
              color: "white",
              boxShadow: "0 28px 90px rgba(0,0,0,.38)",
            }}
          >
            <div
              className="modal-header border-0"
              style={{
                padding: "30px 32px 22px",
                borderBottom: "1px solid rgba(255,255,255,.07)",
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "18px",
                    background: "rgba(255,179,0,.12)",
                    border: "1px solid rgba(255,179,0,.22)",
                    color: "#ffcf40",
                    flexShrink: 0,
                  }}
                >
                  <i className="bi bi-bag-plus-fill" style={{ fontSize: "1.45rem" }} />
                </div>

                <div>
                  <h2
                    className="fw-bold mb-1"
                    style={{
                      color: "#ffe082",
                      letterSpacing: "-1px",
                    }}
                  >
                    Criar Pedido
                  </h2>

                  <p
                    className="mb-0"
                    style={{
                      color: "rgba(255,255,255,.58)",
                    }}
                  >
                    O backend cria o pedido usando o ID do usuário e o ID do produto.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="btn-close btn-close-white shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <form onSubmit={handleCriarPedido}>
              <div className="modal-body" style={{ padding: "28px 32px 10px" }}>
                {formCriarErro && (
                  <div
                    className="alert border-0 mb-4"
                    style={{
                      background: "rgba(245,6,29,0.14)",
                      color: "#fecaca",
                      borderRadius: "16px",
                    }}
                  >
                    {formCriarErro}
                  </div>
                )}

                <div className="row g-3">
                  <div className="col-12 col-lg-6">
                    <label className="form-label mb-2" style={labelStyle}>
                      ID do usuário
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={formCriar.id_user}
                      onChange={(event) =>
                        setFormCriar((atual) => ({
                          ...atual,
                          id_user: event.target.value,
                        }))
                      }
                      className="form-control shadow-none"
                      placeholder="Ex: 1"
                      style={modalInputStyle}
                    />
                  </div>

                  <div className="col-12 col-lg-6">
                    <label className="form-label mb-2" style={labelStyle}>
                      ID do produto
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={formCriar.id_produto}
                      onChange={(event) =>
                        setFormCriar((atual) => ({
                          ...atual,
                          id_produto: event.target.value,
                        }))
                      }
                      className="form-control shadow-none"
                      placeholder="Ex: 4"
                      style={modalInputStyle}
                    />
                  </div>
                </div>
              </div>

              <div
                className="d-flex justify-content-end gap-2 flex-wrap"
                style={{
                  padding: "22px 32px 32px",
                  borderTop: "1px solid rgba(255,255,255,.07)",
                }}
              >
                <button
                  type="button"
                  className="btn btn-outline-light"
                  data-bs-dismiss="modal"
                  disabled={salvando}
                  style={{
                    borderRadius: "16px",
                    padding: "12px 20px",
                    fontWeight: "800",
                    boxShadow: "none",
                  }}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="btn"
                  disabled={salvando}
                  style={{
                    ...buttonGradient,
                    padding: "12px 24px",
                    minWidth: "190px",
                    opacity: salvando ? 0.7 : 1,
                    cursor: salvando ? "not-allowed" : "pointer",
                  }}
                >
                  {salvando ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Criando...
                    </>
                  ) : (
                    "Criar pedido"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal fade" id="pedidoEditModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div
            className="modal-content border-0 overflow-hidden"
            style={{
              background: surfaceGradient,
              borderRadius: "30px",
              border: "1px solid rgba(255,255,255,.10)",
              color: "white",
              boxShadow: "0 28px 90px rgba(0,0,0,.38)",
            }}
          >
            <div
              className="modal-header border-0"
              style={{
                padding: "30px 32px 22px",
                borderBottom: "1px solid rgba(255,255,255,.07)",
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "18px",
                    background: "rgba(255,179,0,.12)",
                    border: "1px solid rgba(255,179,0,.22)",
                    color: "#ffcf40",
                    flexShrink: 0,
                  }}
                >
                  <i className="bi bi-pencil-square" style={{ fontSize: "1.45rem" }} />
                </div>

                <div>
                  <h2
                    className="fw-bold mb-1"
                    style={{
                      color: "#ffe082",
                      letterSpacing: "-1px",
                    }}
                  >
                    Editar pedido #{pedidoEditando?.id_pedido || ""}
                  </h2>

                  <p
                    className="mb-0"
                    style={{
                      color: "rgba(255,255,255,.58)",
                    }}
                  >
                    Atualize a data de entrega e, se o backend aceitar, também o status.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="btn-close btn-close-white shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <form onSubmit={handleAtualizarPedido}>
              <div className="modal-body" style={{ padding: "28px 32px 10px" }}>
                {formEditarErro && (
                  <div
                    className="alert border-0 mb-4"
                    style={{
                      background: "rgba(245,6,29,0.14)",
                      color: "#fecaca",
                      borderRadius: "16px",
                    }}
                  >
                    {formEditarErro}
                  </div>
                )}

                <div className="row g-3">
                  <div className="col-12 col-lg-6">
                    <label className="form-label mb-2" style={labelStyle}>
                      Data de entrega
                    </label>

                    <input
                      type="date"
                      value={formEditar.data_entrega}
                      onChange={(event) =>
                        setFormEditar((atual) => ({
                          ...atual,
                          data_entrega: event.target.value,
                        }))
                      }
                      className="form-control shadow-none"
                      style={modalInputStyle}
                    />
                  </div>

                  <div className="col-12 col-lg-6">
                    <label className="form-label mb-2" style={labelStyle}>
                      Status
                    </label>

                    <select
                      value={formEditar.status}
                      onChange={(event) =>
                        setFormEditar((atual) => ({
                          ...atual,
                          status: event.target.value,
                        }))
                      }
                      className="form-select shadow-none"
                      style={{
                        ...modalInputStyle,
                        cursor: "pointer",
                      }}
                    >
                      <option value="" style={{ background: "#151518", color: "#fff" }}>
                        Manter sem alteração
                      </option>

                      {STATUS_OPTIONS.filter((status) => status.value).map((status) => (
                        <option
                          key={status.value}
                          value={status.value}
                          style={{ background: "#151518", color: "#fff" }}
                        >
                          {status.label}
                        </option>
                      ))}
                    </select>

                    <small
                      className="d-block mt-2"
                      style={{
                        color: "rgba(255,255,255,.52)",
                      }}
                    >
                      Se o status não salvar, é porque o controller do backend ainda não aceita esse campo no PUT.
                    </small>
                  </div>
                </div>
              </div>

              <div
                className="d-flex justify-content-end gap-2 flex-wrap"
                style={{
                  padding: "22px 32px 32px",
                  borderTop: "1px solid rgba(255,255,255,.07)",
                }}
              >
                <button
                  type="button"
                  className="btn btn-outline-light"
                  data-bs-dismiss="modal"
                  disabled={salvando}
                  style={{
                    borderRadius: "16px",
                    padding: "12px 20px",
                    fontWeight: "800",
                    boxShadow: "none",
                  }}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="btn"
                  disabled={salvando}
                  style={{
                    ...buttonGradient,
                    padding: "12px 24px",
                    minWidth: "190px",
                    opacity: salvando ? 0.7 : 1,
                    cursor: salvando ? "not-allowed" : "pointer",
                  }}
                >
                  {salvando ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Salvando...
                    </>
                  ) : (
                    "Salvar alterações"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}