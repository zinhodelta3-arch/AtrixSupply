"use client";

import { useEffect, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");

const ENCOMENDAS_URL = `${API_URL}/api/encomendas`;
const ORCAMENTOS_URL = `${API_URL}/api/orcamentos`;

const encomendasPorPagina = 8;

const inputStyle = {
  background: "#1c1c1c",
  border: "1px solid #3b3b3b",
  color: "white",
  borderRadius: "14px",
  padding: "12px 14px",
};

const gradientButtonStyle = {
  background: "linear-gradient(to right, #940533, #ff8800)",
  border: "none",
  borderRadius: "14px",
  color: "white",
  fontWeight: "700",
};

function obterToken() {
  if (typeof window === "undefined") return "";

  return (
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("jwt") ||
    ""
  );
}

function montarHeaders() {
  const token = obterToken();

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function tratarResposta(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const detalhes = Array.isArray(data?.detalhes)
      ? data.detalhes.map((item) => item.mensagem).join(" | ")
      : null;

    throw new Error(
      detalhes ||
        data?.mensagem ||
        data?.erro ||
        "Não foi possível concluir a operação."
    );
  }

  return data;
}

function normalizarListaEncomendas(data) {
  return data?.dados || data?.encomendas || data?.data || [];
}

function normalizarTotalPaginas(data) {
  return data?.paginacao?.totalPaginas || data?.totalPaginas || 1;
}

function formatarStatus(status) {
  switch (status) {
    case "pendente":
      return "Pendente";
    case "em_andamento":
      return "Em andamento";
    case "finalizado":
      return "Finalizado";
    case "cancelado":
      return "Cancelado";
    default:
      return "Não informado";
  }
}

function corStatus(status) {
  switch (status) {
    case "pendente":
      return "bg-warning text-dark";
    case "em_andamento":
      return "bg-primary";
    case "finalizado":
      return "bg-success";
    case "cancelado":
      return "bg-danger";
    default:
      return "bg-secondary";
  }
}

function formatarEstadoOrcamento(estado) {
  switch (estado) {
    case "visivel":
      return "Visível";
    case "invisivel":
      return "Invisível";
    case "escolhida":
      return "Escolhida";
    default:
      return "Não informado";
  }
}

function corEstadoOrcamento(estado) {
  switch (estado) {
    case "visivel":
      return "bg-success";
    case "escolhida":
      return "bg-warning text-dark";
    case "invisivel":
      return "bg-secondary";
    default:
      return "bg-secondary";
  }
}

function formatarData(data) {
  if (!data) return "Não informada";

  const dataObj = new Date(data);

  if (Number.isNaN(dataObj.getTime())) {
    return data;
  }

  return dataObj.toLocaleDateString("pt-BR");
}

function formatarDinheiro(valor) {
  const numero = Number(valor || 0);

  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function PainelFornecedor() {
  const [listaEncomendas, setListaEncomendas] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  const [orcamentos, setOrcamentos] = useState([]);
  const [carregandoOrcamentos, setCarregandoOrcamentos] = useState(false);
  const [erroOrcamento, setErroOrcamento] = useState(null);
  const [feedbackOrcamento, setFeedbackOrcamento] = useState(null);
  const [salvandoOrcamento, setSalvandoOrcamento] = useState(false);

  const [formOrcamento, setFormOrcamento] = useState({
    id_orcamento: null,
    nome_orcamento: "",
    tipo_orcamento: "",
    estimacao: "",
    estado: "invisivel",
  });

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function buscarDadosDoBackend() {
      try {
        setLoading(true);
        setError(null);

        const query = `?pagina=${paginaAtual}&limite=${encomendasPorPagina}`;

        let url = `${ENCOMENDAS_URL}${query}`;

        if (busca.trim()) {
          url = `${ENCOMENDAS_URL}/pecas/${encodeURIComponent(busca.trim())}${query}`;
        }

        let response = await fetch(url, {
          method: "GET",
          headers: montarHeaders(),
          signal: controller.signal,
        });

        if (!response.ok && busca.trim()) {
          response = await fetch(`${ENCOMENDAS_URL}${query}`, {
            method: "GET",
            headers: montarHeaders(),
            signal: controller.signal,
          });
        }

        const data = await tratarResposta(response);

        let encomendas = normalizarListaEncomendas(data);

        if (busca.trim()) {
          const termo = busca.trim().toLowerCase();

          encomendas = encomendas.filter((pedido) =>
            String(pedido.pecas || pedido.produto || "")
              .toLowerCase()
              .includes(termo)
          );
        }

        setListaEncomendas(Array.isArray(encomendas) ? encomendas : []);
        setTotalPaginas(normalizarTotalPaginas(data));
      } catch (err) {
        if (err.name === "AbortError") return;

        console.error("Erro na integração:", err);
        setError(err.message || "Não foi possível carregar as encomendas do servidor.");
        setListaEncomendas([]);
        setTotalPaginas(1);
      } finally {
        setLoading(false);
      }
    }

    const delayDebounce = setTimeout(() => {
      buscarDadosDoBackend();
    }, 400);

    return () => {
      clearTimeout(delayDebounce);
      controller.abort();
    };
  }, [paginaAtual, busca]);

  function handleBuscaChange(event) {
    setBusca(event.target.value);
    setPaginaAtual(1);
  }

  function limparFormOrcamento() {
    setFormOrcamento({
      id_orcamento: null,
      nome_orcamento: "",
      tipo_orcamento: "",
      estimacao: "",
      estado: "invisivel",
    });

    setErroOrcamento(null);
    setFeedbackOrcamento(null);
  }

  function atualizarCampoOrcamento(campo, valor) {
    setFormOrcamento((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  async function carregarOrcamentosDaEncomenda(id_encomenda) {
    if (!id_encomenda) return;

    try {
      setCarregandoOrcamentos(true);
      setErroOrcamento(null);
      setFeedbackOrcamento(null);

      const response = await fetch(
        `${ORCAMENTOS_URL}/encomenda/${id_encomenda}?pagina=1&limite=20`,
        {
          method: "GET",
          headers: montarHeaders(),
        }
      );

      const data = await tratarResposta(response);

      setOrcamentos(Array.isArray(data?.dados) ? data.dados : []);
    } catch (error) {
      console.error("Erro ao carregar orçamentos:", error);
      setErroOrcamento(error.message || "Não foi possível carregar os orçamentos.");
      setOrcamentos([]);
    } finally {
      setCarregandoOrcamentos(false);
    }
  }

  function abrirDetalhes(pedido) {
    setPedidoSelecionado(pedido);
  }

  function abrirOrcamentos(pedido) {
    setPedidoSelecionado(pedido);
    limparFormOrcamento();
    carregarOrcamentosDaEncomenda(pedido.id_encomenda);
  }

  function editarOrcamento(orcamento) {
    setFormOrcamento({
      id_orcamento: orcamento.id_orcamento,
      nome_orcamento: orcamento.nome_orcamento || "",
      tipo_orcamento: orcamento.tipo_orcamento || "",
      estimacao: orcamento.estimacao ?? "",
      estado: orcamento.estado || "invisivel",
    });

    setErroOrcamento(null);
    setFeedbackOrcamento(null);
  }

  async function salvarOrcamento(event) {
    event.preventDefault();

    try {
      setSalvandoOrcamento(true);
      setErroOrcamento(null);
      setFeedbackOrcamento(null);

      if (!pedidoSelecionado?.id_encomenda) {
        setErroOrcamento("Selecione uma encomenda antes de criar o orçamento.");
        return;
      }

      if (!formOrcamento.nome_orcamento.trim()) {
        setErroOrcamento("O nome do orçamento é obrigatório.");
        return;
      }

      if (!formOrcamento.tipo_orcamento.trim()) {
        setErroOrcamento("O tipo do orçamento é obrigatório.");
        return;
      }

      if (
        formOrcamento.estimacao === "" ||
        Number.isNaN(Number(formOrcamento.estimacao)) ||
        Number(formOrcamento.estimacao) < 0
      ) {
        setErroOrcamento("A estimação deve ser um número positivo.");
        return;
      }

      const body = {
        id_encomenda: Number(pedidoSelecionado.id_encomenda),
        nome_orcamento: formOrcamento.nome_orcamento.trim(),
        tipo_orcamento: formOrcamento.tipo_orcamento.trim(),
        estimacao: Number(formOrcamento.estimacao),
        estado: formOrcamento.estado,
      };

      const editando = Boolean(formOrcamento.id_orcamento);

      const response = await fetch(
        editando
          ? `${ORCAMENTOS_URL}/${formOrcamento.id_orcamento}`
          : ORCAMENTOS_URL,
        {
          method: editando ? "PUT" : "POST",
          headers: montarHeaders(),
          body: JSON.stringify(body),
        }
      );

      const data = await tratarResposta(response);

      setFeedbackOrcamento(
        data?.mensagem ||
          (editando ? "Orçamento atualizado com sucesso." : "Orçamento criado com sucesso.")
      );

      limparFormOrcamento();
      await carregarOrcamentosDaEncomenda(pedidoSelecionado.id_encomenda);
    } catch (error) {
      console.error("Erro ao salvar orçamento:", error);
      setErroOrcamento(error.message || "Não foi possível salvar o orçamento.");
    } finally {
      setSalvandoOrcamento(false);
    }
  }

  async function excluirOrcamento(id_orcamento) {
    const confirmar = window.confirm("Tem certeza que deseja excluir este orçamento?");

    if (!confirmar) return;

    try {
      setErroOrcamento(null);
      setFeedbackOrcamento(null);

      const response = await fetch(`${ORCAMENTOS_URL}/${id_orcamento}`, {
        method: "DELETE",
        headers: montarHeaders(),
      });

      const data = await tratarResposta(response);

      setFeedbackOrcamento(data?.mensagem || "Orçamento excluído com sucesso.");

      await carregarOrcamentosDaEncomenda(pedidoSelecionado.id_encomenda);
    } catch (error) {
      console.error("Erro ao excluir orçamento:", error);
      setErroOrcamento(error.message || "Não foi possível excluir o orçamento.");
    }
  }

  const metricas = useMemo(() => {
    return {
      total: listaEncomendas.length,
      pendentes: listaEncomendas.filter((pedido) => pedido.status === "pendente").length,
      andamento: listaEncomendas.filter((pedido) => pedido.status === "em_andamento").length,
      finalizadas: listaEncomendas.filter((pedido) => pedido.status === "finalizado").length,
    };
  }, [listaEncomendas]);

  return (
    <main
      style={{
        background: `
          radial-gradient(circle at top left, rgba(255,136,0,.10), transparent 25%),
          radial-gradient(circle at bottom right, rgba(192,1,42,.16), transparent 30%),
          linear-gradient(145deg,#08080a,#101014,#160d12)
        `,
        minHeight: "100vh",
        color: "white",
      }}
    >
      <section
        className="py-5 text-white"
        style={{
          background: "linear-gradient(135deg,#940533,#c0012a,#f5061d)",
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <div className="container py-4 text-center">
          <span className="badge bg-warning text-dark mb-3 px-3 py-2">
            Painel do Fornecedor
          </span>

          <h1 className="display-4 fw-bold">
            Gerencie suas encomendas
          </h1>

          <p className="lead mt-3 mb-0">
            Visualize pedidos recebidos e administre os orçamentos enviados.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container-fluid px-4">
          <div className="row g-4">
            <div className="col-lg-3">
              <div
                className="p-4 rounded-4 shadow-lg position-sticky"
                style={{
                  top: "20px",
                  background: "rgba(17,17,17,.95)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <h3 className="text-white fw-bold mb-4">
                  Buscar Produto
                </h3>

                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control fornecedor-input"
                    placeholder="Digite o nome da peça"
                    value={busca}
                    onChange={handleBuscaChange}
                    style={inputStyle}
                  />
                </div>

                <div className="d-flex flex-column gap-3">
                  {[
                    {
                      titulo: "Nesta página",
                      valor: metricas.total,
                      icon: "bi-box-seam",
                    },
                    {
                      titulo: "Pendentes",
                      valor: metricas.pendentes,
                      icon: "bi-hourglass-split",
                    },
                    {
                      titulo: "Em andamento",
                      valor: metricas.andamento,
                      icon: "bi-arrow-repeat",
                    },
                    {
                      titulo: "Finalizadas",
                      valor: metricas.finalizadas,
                      icon: "bi-check-circle",
                    },
                  ].map((item) => (
                    <div
                      key={item.titulo}
                      className="d-flex align-items-center gap-3"
                      style={{
                        background: "rgba(255,255,255,.035)",
                        border: "1px solid rgba(255,255,255,.06)",
                        borderRadius: "18px",
                        padding: "15px",
                      }}
                    >
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: "46px",
                          height: "46px",
                          borderRadius: "14px",
                          background: "rgba(255,136,0,.14)",
                          color: "#ffb300",
                        }}
                      >
                        <i className={`bi ${item.icon}`} />
                      </div>

                      <div>
                        <p
                          className="mb-0"
                          style={{
                            color: "rgba(255,255,255,.58)",
                            fontSize: ".82rem",
                          }}
                        >
                          {item.titulo}
                        </p>

                        <strong style={{ fontSize: "1.15rem" }}>
                          {String(item.valor).padStart(2, "0")}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-9">
              {loading && (
                <div
                  className="text-white text-center py-5 rounded-4"
                  style={{
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.06)",
                  }}
                >
                  <div className="spinner-border text-warning mb-3" />
                  <h4 className="fw-bold">
                    Carregando encomendas...
                  </h4>
                </div>
              )}

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              {!loading && !error && listaEncomendas.length === 0 && (
                <div
                  className="text-center py-5 rounded-4"
                  style={{
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.06)",
                    color: "rgba(255,255,255,.62)",
                  }}
                >
                  <i
                    className="bi bi-inbox"
                    style={{
                      fontSize: "4rem",
                      color: "#ffb300",
                    }}
                  />

                  <h3 className="fw-bold mt-3 text-white">
                    Nenhuma encomenda encontrada
                  </h3>

                  <p className="mb-0">
                    Tente alterar a pesquisa ou confira se a API retornou dados.
                  </p>
                </div>
              )}

              <div className="row g-4">
                {!loading &&
                  listaEncomendas.map((pedido) => (
                    <div className="col-12" key={pedido.id_encomenda}>
                      <div
                        className="card shadow-lg overflow-hidden encomenda-card"
                        style={{
                          background: "rgba(17,17,17,.96)",
                          borderRadius: "24px",
                          border: "1px solid rgba(255,255,255,.08)",
                        }}
                      >
                        <div className="card-body p-4">
                          <div className="row align-items-center g-4">
                            <div className="col-lg-8">
                              <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
                                <span
                                  className={`badge ${corStatus(pedido.status)}`}
                                  style={{
                                    borderRadius: "999px",
                                    padding: "8px 12px",
                                  }}
                                >
                                  {formatarStatus(pedido.status)}
                                </span>

                                <span
                                  className="badge bg-dark border"
                                  style={{
                                    borderColor: "rgba(255,255,255,.12)",
                                    borderRadius: "999px",
                                    padding: "8px 12px",
                                    color: "rgba(255,255,255,.72)",
                                  }}
                                >
                                  #{pedido.id_encomenda}
                                </span>
                              </div>

                              <h3 className="text-white fw-bold mb-3">
                                {pedido.pecas || pedido.produto || "Peça não informada"}
                              </h3>

                              <div className="row g-3">
                                <div className="col-md-6">
                                  <p className="text-secondary mb-2">
                                    Usuário:
                                    <span className="text-white fw-semibold ms-2">
                                      {pedido.id_user || "Não informado"}
                                    </span>
                                  </p>

                                  <p className="text-secondary mb-2">
                                    Fornecedor:
                                    <span className="text-white fw-semibold ms-2">
                                      {pedido.id_fornecedor || "Não informado"}
                                    </span>
                                  </p>
                                </div>

                                <div className="col-md-6">
                                  <p className="text-secondary mb-2">
                                    Compra:
                                    <span className="text-white fw-semibold ms-2">
                                      {formatarData(pedido.data_com)}
                                    </span>
                                  </p>

                                  <p className="text-secondary mb-2">
                                    Entrega:
                                    <span className="text-white fw-semibold ms-2">
                                      {formatarData(pedido.data_entrega)}
                                    </span>
                                  </p>
                                </div>
                              </div>

                              <p className="text-secondary mt-2 mb-0">
                                Orçamento:
                                <span className="text-white fw-semibold ms-2">
                                  {pedido.orcamento
                                    ? formatarDinheiro(pedido.orcamento)
                                    : "Não informado"}
                                </span>
                              </p>
                            </div>

                            <div className="col-lg-4">
                              <div className="d-grid gap-3">
                                <button
                                  className="btn btn-outline-light fw-semibold"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalDetalhes"
                                  onClick={() => abrirDetalhes(pedido)}
                                  style={{
                                    borderRadius: "14px",
                                    padding: "12px 16px",
                                  }}
                                >
                                  Ver detalhes
                                </button>

                                <button
                                  className="btn visualizar-btn text-white fw-semibold"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalOrcamento"
                                  onClick={() => abrirOrcamentos(pedido)}
                                  style={{
                                    ...gradientButtonStyle,
                                    padding: "12px 16px",
                                  }}
                                >
                                  Gerenciar orçamento
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {totalPaginas > 1 && (
                <nav className="mt-5">
                  <ul className="pagination justify-content-center flex-wrap gap-2">
                    <li className={`page-item ${paginaAtual <= 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
                        style={{
                          background: "#111",
                          color: "white",
                          border: "1px solid rgba(255,255,255,.18)",
                          borderRadius: "12px",
                        }}
                      >
                        Anterior
                      </button>
                    </li>

                    {[...Array(totalPaginas)].map((_, index) => {
                      const numeroPagina = index + 1;
                      const ativo = paginaAtual === numeroPagina;

                      return (
                        <li key={numeroPagina} className="page-item">
                          <button
                            className="page-link"
                            onClick={() => setPaginaAtual(numeroPagina)}
                            style={{
                              background: ativo
                                ? "linear-gradient(to right, #c0012a, #ff8800)"
                                : "#111",
                              color: "white",
                              border: ativo
                                ? "1px solid transparent"
                                : "1px solid rgba(255,255,255,.18)",
                              borderRadius: "12px",
                            }}
                          >
                            {numeroPagina}
                          </button>
                        </li>
                      );
                    })}

                    <li className={`page-item ${paginaAtual >= totalPaginas ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() =>
                          setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))
                        }
                        style={{
                          background: "#111",
                          color: "white",
                          border: "1px solid rgba(255,255,255,.18)",
                          borderRadius: "12px",
                        }}
                      >
                        Próxima
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MODAL DETALHES */}
      <div className="modal fade" id="modalDetalhes" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div
            className="modal-content border-0"
            style={{
              background: "#111",
              color: "white",
              borderRadius: "24px",
              overflow: "hidden",
            }}
          >
            <div
              className="modal-header border-0"
              style={{
                background: "linear-gradient(135deg,#940533,#c0012a,#f5061d)",
              }}
            >
              <div>
                <h2 className="fw-bold mb-1">
                  {pedidoSelecionado?.pecas || pedidoSelecionado?.produto || "Encomenda"}
                </h2>

                <p className="mb-0 opacity-75">
                  Código #{pedidoSelecionado?.id_encomenda || "---"}
                </p>
              </div>

              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              />
            </div>

            <div className="modal-body p-4">
              <div className="mb-4">
                <h5 className="text-secondary">Descrição</h5>

                <p>
                  {pedidoSelecionado?.descricao ||
                    "Sem descrição disponível para esta encomenda."}
                </p>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="p-3 rounded-4" style={{ background: "#181818" }}>
                    <span className="text-secondary d-block mb-1">
                      Status
                    </span>

                    <strong>
                      {formatarStatus(pedidoSelecionado?.status)}
                    </strong>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 rounded-4" style={{ background: "#181818" }}>
                    <span className="text-secondary d-block mb-1">
                      Logística
                    </span>

                    <strong>
                      {pedidoSelecionado?.id_logistica || "Não informada"}
                    </strong>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 rounded-4" style={{ background: "#181818" }}>
                    <span className="text-secondary d-block mb-1">
                      Data da compra
                    </span>

                    <strong>
                      {formatarData(pedidoSelecionado?.data_com)}
                    </strong>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 rounded-4" style={{ background: "#181818" }}>
                    <span className="text-secondary d-block mb-1">
                      Data de entrega
                    </span>

                    <strong>
                      {formatarData(pedidoSelecionado?.data_entrega)}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL ORÇAMENTO REAL */}
      <div className="modal fade" id="modalOrcamento" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div
            className="modal-content border-0"
            style={{
              background: "#111",
              color: "white",
              borderRadius: "24px",
              overflow: "hidden",
            }}
          >
            <div
              className="modal-header border-0"
              style={{
                background: "linear-gradient(135deg,#940533,#c0012a,#f5061d)",
              }}
            >
              <div>
                <h2 className="fw-bold mb-1">
                  Orçamentos
                </h2>

                <p className="mb-0 opacity-75">
                  {pedidoSelecionado?.pecas || pedidoSelecionado?.produto || "Encomenda"}
                </p>
              </div>

              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              />
            </div>

            <div className="modal-body p-4">
              {erroOrcamento && (
                <div className="alert alert-danger">
                  {erroOrcamento}
                </div>
              )}

              {feedbackOrcamento && (
                <div className="alert alert-success">
                  {feedbackOrcamento}
                </div>
              )}

              <form
                onSubmit={salvarOrcamento}
                className="p-4 rounded-4 mb-4"
                style={{
                  background: "#181818",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                  <div>
                    <h3 className="fw-bold mb-1">
                      {formOrcamento.id_orcamento
                        ? "Editar orçamento"
                        : "Novo orçamento"}
                    </h3>

                    <p className="text-secondary mb-0">
                      Encomenda #{pedidoSelecionado?.id_encomenda || "---"}
                    </p>
                  </div>

                  {formOrcamento.id_orcamento && (
                    <button
                      type="button"
                      className="btn btn-outline-light"
                      onClick={limparFormOrcamento}
                      style={{
                        borderRadius: "14px",
                      }}
                    >
                      Cancelar edição
                    </button>
                  )}
                </div>

                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label text-secondary">
                      Nome do orçamento
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ex: Plano econômico"
                      value={formOrcamento.nome_orcamento}
                      onChange={(event) =>
                        atualizarCampoOrcamento("nome_orcamento", event.target.value)
                      }
                      style={inputStyle}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label text-secondary">
                      Tipo
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ex: Premium"
                      value={formOrcamento.tipo_orcamento}
                      onChange={(event) =>
                        atualizarCampoOrcamento("tipo_orcamento", event.target.value)
                      }
                      style={inputStyle}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label text-secondary">
                      Estimação
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="form-control"
                      placeholder="Ex: 1250"
                      value={formOrcamento.estimacao}
                      onChange={(event) =>
                        atualizarCampoOrcamento("estimacao", event.target.value)
                      }
                      style={inputStyle}
                    />
                  </div>

                  <div className="col-md-2">
                    <label className="form-label text-secondary">
                      Estado
                    </label>

                    <select
                      className="form-select"
                      value={formOrcamento.estado}
                      onChange={(event) =>
                        atualizarCampoOrcamento("estado", event.target.value)
                      }
                      style={inputStyle}
                    >
                      <option value="invisivel" style={{ color: "#111" }}>
                        Invisível
                      </option>
                      <option value="visivel" style={{ color: "#111" }}>
                        Visível
                      </option>
                      <option value="escolhida" style={{ color: "#111" }}>
                        Escolhida
                      </option>
                    </select>
                  </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                  <button
                    type="submit"
                    disabled={salvandoOrcamento}
                    className="btn text-white fw-semibold"
                    style={{
                      ...gradientButtonStyle,
                      padding: "12px 22px",
                      minWidth: "180px",
                    }}
                  >
                    {salvandoOrcamento ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Salvando...
                      </>
                    ) : formOrcamento.id_orcamento ? (
                      "Atualizar orçamento"
                    ) : (
                      "Criar orçamento"
                    )}
                  </button>
                </div>
              </form>

              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                <h3 className="fw-bold mb-0">
                  Orçamentos cadastrados
                </h3>

                <span className="badge bg-dark border text-white px-3 py-2">
                  {orcamentos.length} orçamento(s)
                </span>
              </div>

              {carregandoOrcamentos && (
                <div className="text-center py-5">
                  <div className="spinner-border text-warning mb-3" />

                  <h5 className="fw-bold">
                    Carregando orçamentos...
                  </h5>
                </div>
              )}

              {!carregandoOrcamentos && orcamentos.length === 0 && (
                <div
                  className="text-center py-5 rounded-4"
                  style={{
                    background: "#181818",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,.65)",
                  }}
                >
                  <i
                    className="bi bi-receipt"
                    style={{
                      fontSize: "3.5rem",
                      color: "#ffb300",
                    }}
                  />

                  <h4 className="fw-bold mt-3 text-white">
                    Nenhum orçamento cadastrado
                  </h4>

                  <p className="mb-0">
                    Crie uma opção de orçamento para esta encomenda.
                  </p>
                </div>
              )}

              {!carregandoOrcamentos && orcamentos.length > 0 && (
                <div className="row g-4">
                  {orcamentos.map((orcamento) => (
                    <div className="col-lg-4" key={orcamento.id_orcamento}>
                      <div
                        className="p-4 rounded-4 h-100"
                        style={{
                          background: "#181818",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span
                            className={`badge ${corEstadoOrcamento(orcamento.estado)}`}
                          >
                            {formatarEstadoOrcamento(orcamento.estado)}
                          </span>

                          <span className="text-secondary small">
                            #{orcamento.id_orcamento}
                          </span>
                        </div>

                        <h4 className="fw-bold mb-2">
                          {orcamento.nome_orcamento}
                        </h4>

                        <p className="text-secondary mb-3">
                          {orcamento.tipo_orcamento}
                        </p>

                        <h2 className="fw-bold text-danger mb-4">
                          {formatarDinheiro(orcamento.estimacao)}
                        </h2>

                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-outline-warning fw-semibold w-100"
                            onClick={() => editarOrcamento(orcamento)}
                            style={{
                              borderRadius: "14px",
                            }}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => excluirOrcamento(orcamento.id_orcamento)}
                            style={{
                              borderRadius: "14px",
                            }}
                          >
                            <i className="bi bi-trash3-fill" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}