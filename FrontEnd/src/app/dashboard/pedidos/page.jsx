"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

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
      background: "rgba(34,197,94,0.10)",
      border: "1px solid rgba(34,197,94,0.15)",
      color: "#22c55e",
    };
  }

  if (statusNormalizado === "enviado" || statusNormalizado === "processando") {
    return {
      background: "rgba(255,179,0,0.10)",
      border: "1px solid rgba(255,179,0,0.18)",
      color: "#ffb300",
    };
  }

  if (statusNormalizado === "pendente" || statusNormalizado === "carrinho") {
    return {
      background: "rgba(255,136,0,0.10)",
      border: "1px solid rgba(255,136,0,0.18)",
      color: "#ff8800",
    };
  }

  return {
    background: "rgba(245,6,29,0.10)",
    border: "1px solid rgba(245,6,29,0.15)",
    color: "#f5061d",
  };
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

    if (!formEditar.data_entrega) {
      setFormEditarErro("Informe a data de entrega.");
      return;
    }

    try {
      setSalvando(true);

      const payload = {
        data_entrega: formEditar.data_entrega,
      };

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

  return (
    <div
      className="container-fluid py-4 px-3 px-lg-4"
      style={{
        background: "#09090b",
        minHeight: "100vh",
      }}
    >
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
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
              color: "#71717a",
              fontSize: ".95rem",
            }}
          >
            Gerenciamento de pedidos da plataforma
          </p>
        </div>

        <button
          type="button"
          className="btn px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2"
          data-bs-toggle="modal"
          data-bs-target="#pedidoCreateModal"
          onClick={() => {
            limparFeedbacks();
            setFormCriar(FORM_CRIAR_INICIAL);
          }}
          style={{
            background: "linear-gradient(90deg,#ff8800,#ffb300)",
            border: "none",
            color: "#261103",
            borderRadius: "14px",
          }}
        >
          <i className="bi bi-plus-lg" />
          Novo pedido
        </button>
      </div>

      {(feedback || erroLista) && (
        <div
          className="alert border-0 mb-4"
          style={{
            background: feedback ? "rgba(34,197,94,0.10)" : "rgba(245,6,29,0.10)",
            color: feedback ? "#22c55e" : "#f5061d",
            borderRadius: "18px",
          }}
        >
          {feedback || erroLista}
        </div>
      )}

      <div
        className="p-3 p-lg-4"
        style={{
          background: "#111113",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "28px",
        }}
      >
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
          <div>
            <h4
              className="fw-bold mb-1"
              style={{
                color: "#ffffff",
                letterSpacing: "-0.5px",
              }}
            >
              Lista de pedidos
            </h4>

            <p
              className="mb-0"
              style={{
                color: "#71717a",
                fontSize: ".9rem",
              }}
            >
              Controle, criação, edição, exclusão e paginação dos pedidos
            </p>
          </div>

          <div className="d-flex flex-column flex-lg-row gap-2 align-items-stretch align-items-lg-center w-100 w-lg-auto">
            <form onSubmit={handlePesquisar} className="d-flex gap-2">
              <div
                className="d-flex align-items-center px-3 flex-grow-1"
                style={{
                  background: "#151518",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "14px",
                  minWidth: "260px",
                  height: "46px",
                }}
              >
                <i
                  className="bi bi-search"
                  style={{
                    color: "#71717a",
                  }}
                />

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
                  background: "#151518",
                  border: "1px solid rgba(255,179,0,0.16)",
                  color: "#ffb300",
                  borderRadius: "14px",
                  minWidth: "46px",
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
                backgroundColor: "#151518",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#ffffff",
                borderRadius: "14px",
                height: "46px",
                minWidth: "170px",
              }}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status.value || "todos"} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="btn"
              onClick={handleLimparFiltros}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#d4d4d8",
                borderRadius: "14px",
                height: "46px",
              }}
            >
              Limpar
            </button>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
          <span
            style={{
              color: "#71717a",
              fontSize: ".88rem",
            }}
          >
            {paginacao.total} pedido(s) encontrado(s)
          </span>

          <div className="d-flex align-items-center gap-2">
            <span
              style={{
                color: "#71717a",
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
                backgroundColor: "#151518",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#ffffff",
                borderRadius: "12px",
              }}
            >
              {LIMITE_OPTIONS.map((opcao) => (
                <option key={opcao} value={opcao}>
                  {opcao}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table
            className="table align-middle mb-0"
            style={{
              color: "#ffffff",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {["Cliente", "Produto", "N° do pedido", "Data do pedido", "Data de entrega", "Status", "Ações"].map(
                  (coluna, index) => (
                    <th
                      key={coluna}
                      className={`py-3 ${index === 6 ? "text-end" : ""}`}
                      style={{
                        color: "#71717a",
                        fontWeight: "500",
                        border: "none",
                        background: "transparent",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {coluna}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {carregando ? (
                <tr>
                  <td colSpan="7" className="py-5 text-center" style={{ background: "transparent", border: "none" }}>
                    <div className="spinner-border spinner-border-sm me-2" style={{ color: "#ffb300" }} />
                    <span style={{ color: "#d4d4d8" }}>Carregando pedidos...</span>
                  </td>
                </tr>
              ) : pedidos.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-5 text-center" style={{ background: "transparent", border: "none" }}>
                    <div
                      className="d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: "58px",
                        height: "58px",
                        borderRadius: "18px",
                        background: "rgba(255,179,0,0.08)",
                        color: "#ffb300",
                      }}
                    >
                      <i className="bi bi-box-seam fs-4" />
                    </div>
                    <p className="mb-0" style={{ color: "#d4d4d8" }}>
                      Nenhum pedido encontrado.
                    </p>
                  </td>
                </tr>
              ) : (
                pedidos.map((pedido) => {
                  const nomeCliente = getNomeCliente(pedido);

                  return (
                    <tr
                      key={pedido.id_pedido}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <td
                        className="py-3"
                        style={{
                          background: "transparent",
                          border: "none",
                          minWidth: "220px",
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <div
                            className="d-flex justify-content-center align-items-center fw-bold"
                            style={{
                              width: "46px",
                              height: "46px",
                              borderRadius: "14px",
                              background: "rgba(255,136,0,0.12)",
                              border: "1px solid rgba(255,179,0,0.12)",
                              color: "#ffb300",
                              fontSize: ".9rem",
                            }}
                          >
                            {getIniciais(nomeCliente)}
                          </div>

                          <div className="ms-3">
                            <div
                              className="fw-semibold"
                              style={{
                                color: "#ffffff",
                                fontSize: ".95rem",
                              }}
                            >
                              {nomeCliente}
                            </div>

                            <div
                              style={{
                                color: "#71717a",
                                fontSize: ".8rem",
                              }}
                            >
                              ID usuário: {pedido.id_user ?? "—"}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#d4d4d8",
                          minWidth: "150px",
                        }}
                      >
                        {getDescricaoProduto(pedido)}
                      </td>

                      <td
                        style={{
                          background: "transparent",
                          border: "none",
                        }}
                      >
                        <span
                          style={{
                            color: "#d4d4d8",
                            fontSize: ".9rem",
                          }}
                        >
                          #{pedido.id_pedido}
                        </span>
                      </td>

                      <td
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#d4d4d8",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatarData(pedido.data_pedido)}
                      </td>

                      <td
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#d4d4d8",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatarData(pedido.data_entrega)}
                      </td>

                      <td
                        style={{
                          background: "transparent",
                          border: "none",
                        }}
                      >
                        <span
                          className="px-3 py-2 d-inline-flex align-items-center"
                          style={{
                            borderRadius: "12px",
                            fontSize: ".8rem",
                            fontWeight: "600",
                            whiteSpace: "nowrap",
                            ...getStatusStyle(pedido.status),
                          }}
                        >
                          {formatarStatus(pedido.status)}
                        </span>
                      </td>

                      <td
                        className="text-end"
                        style={{
                          background: "transparent",
                          border: "none",
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
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "12px",
                              background: "#151518",
                              border: "1px solid rgba(255,255,255,0.06)",
                              color: "#ffb300",
                            }}
                            title="Editar pedido"
                          >
                            <i className="bi bi-pencil-square" />
                          </button>

                          <button
                            type="button"
                            className="btn d-flex align-items-center justify-content-center"
                            onClick={() => handleExcluirPedido(pedido)}
                            disabled={salvando}
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "12px",
                              background: "rgba(245,6,29,0.10)",
                              border: "1px solid rgba(245,6,29,0.15)",
                              color: "#f5061d",
                            }}
                            title="Excluir pedido"
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

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4">
          <span
            style={{
              color: "#71717a",
              fontSize: ".88rem",
            }}
          >
            Página {paginacao.pagina || pagina} de {totalPaginas}
          </span>

          <nav aria-label="Paginação de pedidos">
            <ul className="pagination mb-0 gap-2">
              <li className={`page-item ${pagina <= 1 || carregando ? "disabled" : ""}`}>
                <button
                  type="button"
                  className="page-link border-0"
                  onClick={() => setPagina((paginaAtual) => Math.max(1, paginaAtual - 1))}
                  style={{
                    background: "#151518",
                    color: "#ffb300",
                    borderRadius: "12px",
                  }}
                >
                  <i className="bi bi-chevron-left" />
                </button>
              </li>

              {paginasVisiveis.map((numeroPagina) => {
                const ativo = numeroPagina === pagina;

                return (
                  <li key={numeroPagina} className="page-item">
                    <button
                      type="button"
                      className="page-link border-0 fw-semibold"
                      onClick={() => setPagina(numeroPagina)}
                      disabled={ativo || carregando}
                      style={{
                        background: ativo ? "linear-gradient(90deg,#ff8800,#ffb300)" : "#151518",
                        color: ativo ? "#261103" : "#d4d4d8",
                        borderRadius: "12px",
                        minWidth: "42px",
                      }}
                    >
                      {numeroPagina}
                    </button>
                  </li>
                );
              })}

              <li className={`page-item ${pagina >= totalPaginas || carregando ? "disabled" : ""}`}>
                <button
                  type="button"
                  className="page-link border-0"
                  onClick={() => setPagina((paginaAtual) => Math.min(totalPaginas, paginaAtual + 1))}
                  style={{
                    background: "#151518",
                    color: "#ffb300",
                    borderRadius: "12px",
                  }}
                >
                  <i className="bi bi-chevron-right" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="modal fade" id="pedidoCreateModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div
            className="modal-content border-0 overflow-hidden"
            style={{
              background: "linear-gradient(135deg,#940533 0%,#7d042b 35%,#5f0321 70%,#3b0215 100%)",
              borderRadius: "28px",
            }}
          >
            <div className="modal-header border-0 pt-4 px-4">
              <div>
                <div
                  className="d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "68px",
                    height: "68px",
                    borderRadius: "22px",
                    background: "rgba(255,179,0,0.08)",
                    border: "1px solid rgba(255,179,0,0.12)",
                  }}
                >
                  <i
                    className="bi bi-bag-plus-fill"
                    style={{
                      color: "#ffb300",
                      fontSize: "1.8rem",
                    }}
                  />
                </div>

                <h2
                  className="fw-bold mb-1"
                  style={{
                    color: "#ffb300",
                    letterSpacing: "-1px",
                  }}
                >
                  Criar pedido
                </h2>

                <p className="mb-0" style={{ color: "#f3f4f6", opacity: 0.75 }}>
                  O backend cria o pedido usando o ID do usuário e o ID do produto.
                </p>
              </div>

              <button
                type="button"
                className="btn-close btn-close-white position-absolute top-0 end-0 m-4"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <form onSubmit={handleCriarPedido} className="modal-body p-4 p-lg-5">
              {formCriarErro && (
                <div
                  className="alert border-0 mb-4"
                  style={{
                    background: "rgba(245,6,29,0.12)",
                    color: "#ffffff",
                    borderRadius: "16px",
                  }}
                >
                  {formCriarErro}
                </div>
              )}

              <div className="row g-4">
                <div className="col-12 col-lg-6">
                  <label className="form-label mb-2" style={{ color: "#f3f4f6", fontSize: ".92rem" }}>
                    ID do usuário
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formCriar.id_user}
                    onChange={(event) => setFormCriar((atual) => ({ ...atual, id_user: event.target.value }))}
                    className="form-control shadow-none"
                    placeholder="Ex: 1"
                    style={{
                      background: "rgba(0,0,0,0.18)",
                      border: "1px solid rgba(245,6,29,0.35)",
                      color: "#ffffff",
                      height: "56px",
                      borderRadius: "16px",
                    }}
                  />
                </div>

                <div className="col-12 col-lg-6">
                  <label className="form-label mb-2" style={{ color: "#f3f4f6", fontSize: ".92rem" }}>
                    ID do produto
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formCriar.id_produto}
                    onChange={(event) => setFormCriar((atual) => ({ ...atual, id_produto: event.target.value }))}
                    className="form-control shadow-none"
                    placeholder="Ex: 4"
                    style={{
                      background: "rgba(0,0,0,0.18)",
                      border: "1px solid rgba(245,6,29,0.35)",
                      color: "#ffffff",
                      height: "56px",
                      borderRadius: "16px",
                    }}
                  />
                </div>
              </div>

              <div className="mt-5 d-flex gap-2 flex-wrap">
                <button
                  type="button"
                  className="btn flex-fill py-3 fw-semibold"
                  data-bs-dismiss="modal"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    color: "#ffffff",
                    borderRadius: "16px",
                  }}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="btn flex-fill py-3 fw-semibold"
                  disabled={salvando}
                  style={{
                    background: "linear-gradient(90deg,#ff8800,#ffb300)",
                    border: "none",
                    color: "#3b0215",
                    borderRadius: "16px",
                    fontSize: "1rem",
                  }}
                >
                  {salvando ? "Criando..." : "Criar pedido"}
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
              background: "linear-gradient(135deg,#111113 0%,#18181b 45%,#3b0215 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "28px",
            }}
          >
            <div className="modal-header border-0 pt-4 px-4">
              <div>
                <div
                  className="d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "68px",
                    height: "68px",
                    borderRadius: "22px",
                    background: "rgba(255,179,0,0.08)",
                    border: "1px solid rgba(255,179,0,0.12)",
                  }}
                >
                  <i
                    className="bi bi-pencil-square"
                    style={{
                      color: "#ffb300",
                      fontSize: "1.8rem",
                    }}
                  />
                </div>

                <h2
                  className="fw-bold mb-1"
                  style={{
                    color: "#ffb300",
                    letterSpacing: "-1px",
                  }}
                >
                  Editar pedido #{pedidoEditando?.id_pedido || ""}
                </h2>

                <p className="mb-0" style={{ color: "#d4d4d8", opacity: 0.75 }}>
                  Atualize a data de entrega e, se o backend estiver ajustado, também o status.
                </p>
              </div>

              <button
                type="button"
                className="btn-close btn-close-white position-absolute top-0 end-0 m-4"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <form onSubmit={handleAtualizarPedido} className="modal-body p-4 p-lg-5">
              {formEditarErro && (
                <div
                  className="alert border-0 mb-4"
                  style={{
                    background: "rgba(245,6,29,0.12)",
                    color: "#ffffff",
                    borderRadius: "16px",
                  }}
                >
                  {formEditarErro}
                </div>
              )}

              <div className="row g-4">
                <div className="col-12 col-lg-6">
                  <label className="form-label mb-2" style={{ color: "#f3f4f6", fontSize: ".92rem" }}>
                    Data de entrega
                  </label>
                  <input
                    type="date"
                    value={formEditar.data_entrega}
                    onChange={(event) => setFormEditar((atual) => ({ ...atual, data_entrega: event.target.value }))}
                    className="form-control shadow-none"
                    style={{
                      background: "rgba(0,0,0,0.18)",
                      border: "1px solid rgba(255,179,0,0.20)",
                      color: "#ffffff",
                      height: "56px",
                      borderRadius: "16px",
                    }}
                  />
                </div>

                <div className="col-12 col-lg-6">
                  <label className="form-label mb-2" style={{ color: "#f3f4f6", fontSize: ".92rem" }}>
                    Status
                  </label>
                  <select
                    value={formEditar.status}
                    onChange={(event) => setFormEditar((atual) => ({ ...atual, status: event.target.value }))}
                    className="form-select shadow-none"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.18)",
                      border: "1px solid rgba(255,179,0,0.20)",
                      color: "#ffffff",
                      height: "56px",
                      borderRadius: "16px",
                    }}
                  >
                    <option value="">Manter sem alteração</option>
                    {STATUS_OPTIONS.filter((status) => status.value).map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                  <small style={{ color: "#a1a1aa" }}>
                    Para editar status, aplique o ajuste do controller enviado abaixo.
                  </small>
                </div>
              </div>

              <div className="mt-5 d-flex gap-2 flex-wrap">
                <button
                  type="button"
                  className="btn flex-fill py-3 fw-semibold"
                  data-bs-dismiss="modal"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    color: "#ffffff",
                    borderRadius: "16px",
                  }}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="btn flex-fill py-3 fw-semibold"
                  disabled={salvando}
                  style={{
                    background: "linear-gradient(90deg,#ff8800,#ffb300)",
                    border: "none",
                    color: "#3b0215",
                    borderRadius: "16px",
                    fontSize: "1rem",
                  }}
                >
                  {salvando ? "Salvando..." : "Salvar alterações"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
