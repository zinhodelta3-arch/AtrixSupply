"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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

const buttonGradient = {
  background: "linear-gradient(to right, #940533, #ff8800)",
  border: "none",
  color: "white",
  borderRadius: "14px",
  fontWeight: "700",
};

function decodificarToken(token) {
  try {
    if (!token || !token.includes(".")) return null;

    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");

    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => {
          return "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(json);
  } catch {
    return null;
  }
}

function obterToken() {
  if (typeof window === "undefined") return "";

  return (
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("jwt") ||
    ""
  );
}

function obterUsuarioLogado() {
  if (typeof window === "undefined") return null;

  const chavesUsuario = ["usuario", "user", "dadosUsuario", "authUser"];

  for (const chave of chavesUsuario) {
    const valor = localStorage.getItem(chave);

    if (!valor) continue;

    try {
      return JSON.parse(valor);
    } catch {
      continue;
    }
  }

  const token = obterToken();

  return decodificarToken(token);
}

function obterTipoUsuario(usuario) {
  return String(
    usuario?.tipo ||
      usuario?.tipo_user ||
      usuario?.role ||
      usuario?.nivel ||
      usuario?.dados?.tipo ||
      usuario?.dados?.tipo_user ||
      usuario?.dados?.role ||
      usuario?.dados?.nivel ||
      usuario?.usuario?.tipo ||
      usuario?.usuario?.tipo_user ||
      ""
  )
    .toLowerCase()
    .trim();
}

function obterIdUsuario(usuario) {
  return (
    usuario?.id_user ||
    usuario?.id_usuario ||
    usuario?.id ||
    usuario?.userId ||
    usuario?.dados?.id_user ||
    usuario?.dados?.id_usuario ||
    usuario?.dados?.id ||
    usuario?.dados?.userId ||
    usuario?.usuario?.id_user ||
    usuario?.usuario?.id_usuario ||
    usuario?.usuario?.id ||
    usuario?.usuario?.userId ||
    null
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
    const erro = new Error(data?.mensagem || data?.erro || "Não foi possível concluir a operação.");
    erro.status = response.status;
    erro.detalhes = data?.detalhes || null;
    throw erro;
  }

  return data;
}

function mensagemUsuario(error, fallback) {
  const mensagem = String(error?.message || "").trim();

  if (
    !mensagem ||
    /erro interno|regra de negócio|id_|id |status permitido|não foi encontrada/i.test(mensagem)
  ) {
    return fallback;
  }

  return mensagem;
}

function normalizarLista(data) {
  return data?.dados || data?.encomendas || data?.data || [];
}

function normalizarPaginacao(data) {
  return {
    pagina: data?.paginacao?.pagina || data?.pagina || 1,
    limite: data?.paginacao?.limite || data?.limite || encomendasPorPagina,
    total: data?.paginacao?.total || data?.total || 0,
    totalPaginas: data?.paginacao?.totalPaginas || data?.totalPaginas || 1,
  };
}

function formatarStatus(status) {
  switch (status) {
    case "pendente":
      return "Pendente";
    case "aguardando_orcamento":
      return "Aguardando orçamento";
    case "orcamento_recebido":
      return "Orçamento recebido";
    case "orcamento_escolhido":
      return "Orçamento escolhido";
    case "em_producao":
      return "Em produção";
    case "aguardando_logistica":
      return "Aguardando logística";
    case "em_transporte":
      return "Em transporte";
    case "entregue":
      return "Entregue";
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
    case "aguardando_orcamento":
      return "bg-warning text-dark";
    case "orcamento_recebido":
    case "orcamento_escolhido":
    case "em_producao":
    case "aguardando_logistica":
      return "bg-primary";
    case "em_transporte":
      return "bg-info text-dark";
    case "entregue":
    case "finalizado":
      return "bg-success";
    case "cancelado":
      return "bg-danger";
    default:
      return "bg-secondary";
  }
}

function formatarData(data) {
  if (!data) return "Não informada";

  const dataObj = new Date(data);

  if (Number.isNaN(dataObj.getTime())) return data;

  return dataObj.toLocaleDateString("pt-BR");
}

function formatarDinheiro(valor) {
  if (valor === null || valor === undefined || valor === "") {
    return "Não informado";
  }

  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function Encomendas() {
  const router = useRouter();

  const [validandoAcesso, setValidandoAcesso] = useState(true);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const [encomendas, setEncomendas] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [paginacao, setPaginacao] = useState({
    pagina: 1,
    limite: encomendasPorPagina,
    total: 0,
    totalPaginas: 1,
  });

  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const [encomendaSelecionada, setEncomendaSelecionada] = useState(null);
  const [orcamentosSelecionados, setOrcamentosSelecionados] = useState([]);
  const [carregandoOrcamentos, setCarregandoOrcamentos] = useState(false);
  const [erroOrcamentos, setErroOrcamentos] = useState(null);
  const [feedbackOrcamentos, setFeedbackOrcamentos] = useState(null);
  const [escolhendoOrcamentoId, setEscolhendoOrcamentoId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [formEncomenda, setFormEncomenda] = useState({
    pecas: "",
    descricao: "",
  });
  const [salvandoEncomenda, setSalvandoEncomenda] = useState(false);
  const [erroFormulario, setErroFormulario] = useState(null);
  const [feedbackEncomenda, setFeedbackEncomenda] = useState(null);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    try {
      setValidandoAcesso(true);

      const token = obterToken();
      const usuario = obterUsuarioLogado();
      const tipoUsuario = obterTipoUsuario(usuario);
      const idUsuario = obterIdUsuario(usuario);

      if (!token || !usuario || !idUsuario) {
        router.replace("/login");
        return;
      }

      if (tipoUsuario !== "comum") {
        router.replace("/");
        return;
      }

      setUsuarioLogado(usuario);
      setValidandoAcesso(false);
    } catch (error) {
      console.error("Erro ao validar acesso:", error);
      localStorage.removeItem("usuario");
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    if (validandoAcesso || !usuarioLogado) return;

    const controller = new AbortController();

    async function carregarEncomendas(silencioso = false) {
      try {
        if (!silencioso) {
          setLoading(true);
        }
        setErro(null);

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

        let lista = normalizarLista(data);
        const idUsuario = obterIdUsuario(usuarioLogado);

        if (idUsuario) {
          lista = lista.filter((item) => {
            if (!item.id_user && !item.id_usuario) return true;

            return Number(item.id_user || item.id_usuario) === Number(idUsuario);
          });
        }

        if (busca.trim()) {
          const termo = busca.trim().toLowerCase();

          lista = lista.filter((item) =>
            String(item.pecas || item.produto || item.descricao || "")
              .toLowerCase()
              .includes(termo)
          );
        }

        const listaSegura = Array.isArray(lista) ? lista : [];
        setEncomendas(listaSegura);
        setPaginacao(normalizarPaginacao(data));

        setEncomendaSelecionada((selecionada) => {
          if (!selecionada?.id_encomenda) return selecionada;

          return (
            listaSegura.find(
              (item) => Number(item.id_encomenda) === Number(selecionada.id_encomenda)
            ) || selecionada
          );
        });
      } catch (error) {
        if (error.name === "AbortError") return;

        console.error("Erro ao carregar encomendas:", error);
        setErro("Não conseguimos carregar suas encomendas agora. Tente novamente em instantes.");
        setEncomendas([]);
        setPaginacao({
          pagina: 1,
          limite: encomendasPorPagina,
          total: 0,
          totalPaginas: 1,
        });
      } finally {
        setLoading(false);
      }
    }

    const delay = setTimeout(() => {
      carregarEncomendas();
    }, 350);
    const intervalo = setInterval(() => {
      carregarEncomendas(true);
    }, 30000);

    return () => {
      clearTimeout(delay);
      clearInterval(intervalo);
      controller.abort();
    };
  }, [validandoAcesso, paginaAtual, busca, usuarioLogado, refreshKey]);

  function handleBuscaChange(event) {
    setBusca(event.target.value);
    setPaginaAtual(1);
  }

  async function carregarOrcamentosDaEncomenda(idEncomenda) {
    if (!idEncomenda) return;

    try {
      setCarregandoOrcamentos(true);
      setErroOrcamentos(null);
      setFeedbackOrcamentos(null);

      const response = await fetch(
        `${ORCAMENTOS_URL}/encomenda/${idEncomenda}?pagina=1&limite=50`,
        {
          method: "GET",
          headers: montarHeaders(),
          cache: "no-store",
        }
      );

      const data = await tratarResposta(response);

      setOrcamentosSelecionados(Array.isArray(data?.dados) ? data.dados : []);
    } catch (error) {
      console.error("Erro ao carregar orçamentos:", error);
      setErroOrcamentos("Não conseguimos carregar os orçamentos desta encomenda.");
      setOrcamentosSelecionados([]);
    } finally {
      setCarregandoOrcamentos(false);
    }
  }

  function abrirDetalhes(encomenda) {
    setEncomendaSelecionada(encomenda);
    setOrcamentosSelecionados([]);
    setErroOrcamentos(null);
    setFeedbackOrcamentos(null);
    carregarOrcamentosDaEncomenda(encomenda.id_encomenda);
  }

  async function escolherOrcamento(orcamento) {
    if (!orcamento?.id_orcamento) return;

    try {
      setEscolhendoOrcamentoId(orcamento.id_orcamento);
      setErroOrcamentos(null);
      setFeedbackOrcamentos(null);

      const response = await fetch(`${ORCAMENTOS_URL}/${orcamento.id_orcamento}/escolher`, {
        method: "POST",
        headers: montarHeaders(),
      });

      const data = await tratarResposta(response);

      setFeedbackOrcamentos(data?.mensagem || "Orçamento escolhido com sucesso.");
      await carregarOrcamentosDaEncomenda(orcamento.id_encomenda);
      setRefreshKey((valor) => valor + 1);
    } catch (error) {
      console.error("Erro ao escolher orçamento:", error);
      setErroOrcamentos(
        mensagemUsuario(error, "Não conseguimos escolher este orçamento agora.")
      );
    } finally {
      setEscolhendoOrcamentoId(null);
    }
  }

  function atualizarCampoEncomenda(campo, valor) {
    setFormEncomenda((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  function limparFormEncomenda() {
    setFormEncomenda({
      pecas: "",
      descricao: "",
    });
    setErroFormulario(null);
    setFeedbackEncomenda(null);
  }

  async function criarEncomenda(event) {
    event.preventDefault();

    try {
      setSalvandoEncomenda(true);
      setErroFormulario(null);
      setFeedbackEncomenda(null);

      if (!formEncomenda.pecas.trim()) {
        setErroFormulario("Informe qual peça você precisa.");
        return;
      }

      if (!formEncomenda.descricao.trim()) {
        setErroFormulario("Descreva a encomenda para o fornecedor entender o pedido.");
        return;
      }

      const response = await fetch(ENCOMENDAS_URL, {
        method: "POST",
        headers: montarHeaders(),
        body: JSON.stringify({
          pecas: formEncomenda.pecas.trim(),
          descricao: formEncomenda.descricao.trim(),
        }),
      });

      const data = await tratarResposta(response);

      setFeedbackEncomenda(data?.mensagem || "Encomenda criada com sucesso.");
      setFormEncomenda({
        pecas: "",
        descricao: "",
      });
      setPaginaAtual(1);
      setRefreshKey((valor) => valor + 1);
    } catch (error) {
      console.error("Erro ao criar encomenda:", error);
      setErroFormulario(
        mensagemUsuario(error, "Não conseguimos criar a encomenda agora.")
      );
    } finally {
      setSalvandoEncomenda(false);
    }
  }

  const metricas = useMemo(() => {
    return {
      total: encomendas.length,
      pendentes: encomendas.filter((item) =>
        ["pendente", "aguardando_orcamento"].includes(item.status)
      ).length,
      andamento: encomendas.filter((item) =>
        [
          "orcamento_recebido",
          "orcamento_escolhido",
          "em_producao",
          "aguardando_logistica",
          "em_transporte",
        ].includes(item.status)
      ).length,
      finalizadas: encomendas.filter((item) =>
        ["entregue", "finalizado"].includes(item.status)
      ).length,
      canceladas: encomendas.filter((item) => item.status === "cancelado").length,
    };
  }, [encomendas]);

  if (validandoAcesso || !usuarioLogado) {
    return (
      <main
        className="d-flex justify-content-center align-items-center text-white"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(145deg,#08080a,#101014,#160d12)",
        }}
      >
        <div className="text-center">
          <div className="spinner-border text-warning mb-3" />

          <h4 className="fw-bold">
            Verificando acesso...
          </h4>

          <p className="text-secondary mb-0">
            Apenas usuários comuns podem acessar esta página.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        color: "white",
        background: `
          radial-gradient(circle at top left, rgba(255,136,0,.10), transparent 25%),
          radial-gradient(circle at bottom right, rgba(192,1,42,.16), transparent 30%),
          linear-gradient(145deg,#08080a,#101014,#160d12)
        `,
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
            Minhas Encomendas
          </span>

          <h1 className="display-4 fw-bold">
            Acompanhe suas encomendas
          </h1>

          <p className="lead mt-3 mb-0">
            Veja o status, datas, orçamento e detalhes das suas encomendas.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container-fluid px-4">
          <div className="row g-4">
            <div className="col-lg-3">
              <aside
                className="p-4 rounded-4 shadow-lg position-sticky"
                style={{
                  top: "20px",
                  background: "rgba(17,17,17,.95)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <h3 className="fw-bold mb-4">
                  Buscar encomenda
                </h3>

                <input
                  type="text"
                  className="form-control mb-4"
                  placeholder="Digite o nome da peça"
                  value={busca}
                  onChange={handleBuscaChange}
                  style={inputStyle}
                />

                <button
                  type="button"
                  className="btn w-100 mb-4"
                  data-bs-toggle="modal"
                  data-bs-target="#modalNovaEncomenda"
                  onClick={limparFormEncomenda}
                  style={{
                    ...buttonGradient,
                    padding: "12px 16px",
                  }}
                >
                  Nova encomenda
                </button>

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
                    {
                      titulo: "Canceladas",
                      valor: metricas.canceladas,
                      icon: "bi-x-circle",
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
              </aside>
            </div>

            <div className="col-lg-9">
              {loading && (
                <div
                  className="text-center py-5 rounded-4"
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

              {erro && (
                <div className="alert alert-danger">
                  {erro}
                </div>
              )}

              {!loading && !erro && encomendas.length === 0 && (
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

                  <p className="mb-4">
                    Você ainda não possui encomendas ou a pesquisa não encontrou resultados.
                  </p>

                  <button
                    type="button"
                    className="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#modalNovaEncomenda"
                    onClick={limparFormEncomenda}
                    style={{
                      ...buttonGradient,
                      padding: "12px 20px",
                    }}
                  >
                    Criar encomenda
                  </button>
                </div>
              )}

              <div className="row g-4">
                {!loading &&
                  encomendas.map((encomenda) => (
                    <div className="col-12" key={encomenda.id_encomenda}>
                      <article
                        className="card shadow-lg overflow-hidden"
                        style={{
                          background: "rgba(17,17,17,.96)",
                          borderRadius: "24px",
                          border: "1px solid rgba(255,255,255,.08)",
                        }}
                      >
                        <div className="card-body p-4">
                          <div className="row g-4 align-items-center">
                            <div className="col-lg-8">
                              <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
                                <span
                                  className={`badge ${corStatus(encomenda.status)}`}
                                  style={{
                                    borderRadius: "999px",
                                    padding: "8px 12px",
                                  }}
                                >
                                  {formatarStatus(encomenda.status)}
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
                                  #{encomenda.id_encomenda}
                                </span>
                              </div>

                              <h3 className="text-white fw-bold mb-3">
                                {encomenda.pecas || encomenda.produto || "Peça não informada"}
                              </h3>

                              <p className="text-secondary mb-3">
                                {encomenda.descricao || "Sem descrição cadastrada."}
                              </p>

                              <div className="row g-3">
                                <div className="col-md-6">
                                  <p className="text-secondary mb-2">
                                    Fornecedor:
                                    <span className="text-white fw-semibold ms-2">
                                      {encomenda.fornecedor_empresa ||
                                        encomenda.fornecedor_nome ||
                                        "Ainda não escolhido"}
                                    </span>
                                  </p>

                                  <p className="text-secondary mb-2">
                                    Logística:
                                    <span className="text-white fw-semibold ms-2">
                                      {encomenda.nome_logistica ||
                                        encomenda.logistica_destino ||
                                        "Não informada"}
                                    </span>
                                  </p>
                                </div>

                                <div className="col-md-6">
                                  <p className="text-secondary mb-2">
                                    Compra:
                                    <span className="text-white fw-semibold ms-2">
                                      {formatarData(encomenda.data_com)}
                                    </span>
                                  </p>

                                  <p className="text-secondary mb-2">
                                    Entrega:
                                    <span className="text-white fw-semibold ms-2">
                                      {formatarData(encomenda.data_entrega)}
                                    </span>
                                  </p>
                                </div>
                              </div>

                              <p className="text-secondary mt-2 mb-0">
                                Orçamento:
                                <span className="text-white fw-semibold ms-2">
                                  {formatarDinheiro(encomenda.orcamento)}
                                </span>
                              </p>

                              <p className="text-secondary mt-2 mb-0">
                                Empresas que enviaram orçamento:
                                <span className="text-white fw-semibold ms-2">
                                  {encomenda.empresas_orcamentos || "Nenhuma ainda"}
                                </span>
                              </p>
                            </div>

                            <div className="col-lg-4">
                              <div className="d-grid gap-3">
                                <button
                                  type="button"
                                  className="btn btn-outline-light fw-semibold"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalDetalhesEncomenda"
                                  onClick={() => abrirDetalhes(encomenda)}
                                  style={{
                                    borderRadius: "14px",
                                    padding: "12px 16px",
                                  }}
                                >
                                  Ver detalhes
                                </button>

                                <button
                                  type="button"
                                  className="btn fw-semibold"
                                  style={{
                                    ...buttonGradient,
                                    padding: "12px 16px",
                                  }}
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalDetalhesEncomenda"
                                  onClick={() => abrirDetalhes(encomenda)}
                                  disabled={Number(encomenda.total_orcamentos || 0) === 0}
                                >
                                  {Number(encomenda.total_orcamentos || 0) > 0
                                    ? "Ver orçamentos"
                                    : "Aguardando fornecedor"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
              </div>

              {paginacao.totalPaginas > 1 && (
                <nav className="mt-5">
                  <ul className="pagination justify-content-center flex-wrap gap-2">
                    <li className={`page-item ${paginaAtual <= 1 ? "disabled" : ""}`}>
                      <button
                        type="button"
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

                    {[...Array(paginacao.totalPaginas)].map((_, index) => {
                      const numeroPagina = index + 1;
                      const ativo = paginaAtual === numeroPagina;

                      return (
                        <li key={numeroPagina} className="page-item">
                          <button
                            type="button"
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

                    <li
                      className={`page-item ${
                        paginaAtual >= paginacao.totalPaginas ? "disabled" : ""
                      }`}
                    >
                      <button
                        type="button"
                        className="page-link"
                        onClick={() =>
                          setPaginaAtual((prev) =>
                            Math.min(prev + 1, paginacao.totalPaginas)
                          )
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

      <div className="modal fade" id="modalNovaEncomenda" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
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
                <h2 className="fw-bold mb-1">Nova encomenda</h2>

                <p className="mb-0 opacity-75">
                  Descreva o que você precisa receber orçamento.
                </p>
              </div>

              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              />
            </div>

            <form onSubmit={criarEncomenda} className="modal-body p-4">
              {erroFormulario && (
                <div className="alert alert-danger">{erroFormulario}</div>
              )}

              {feedbackEncomenda && (
                <div className="alert alert-success">{feedbackEncomenda}</div>
              )}

              <div className="mb-3">
                <label className="form-label text-secondary">Peça ou conjunto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ex: Correia industrial"
                  value={formEncomenda.pecas}
                  onChange={(event) => atualizarCampoEncomenda("pecas", event.target.value)}
                  style={inputStyle}
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-secondary">Descrição</label>
                <textarea
                  className="form-control"
                  rows={5}
                  placeholder="Informe medidas, quantidade, urgência ou observações importantes."
                  value={formEncomenda.descricao}
                  onChange={(event) =>
                    atualizarCampoEncomenda("descricao", event.target.value)
                  }
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn w-100"
                disabled={salvandoEncomenda}
                style={{
                  ...buttonGradient,
                  padding: "12px 16px",
                  opacity: salvandoEncomenda ? 0.7 : 1,
                }}
              >
                {salvandoEncomenda ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Criando...
                  </>
                ) : (
                  "Criar encomenda"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="modal fade" id="modalDetalhesEncomenda" tabIndex="-1">
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
                  {encomendaSelecionada?.pecas ||
                    encomendaSelecionada?.produto ||
                    "Encomenda"}
                </h2>

                <p className="mb-0 opacity-75">
                  Código #{encomendaSelecionada?.id_encomenda || "---"}
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
                  {encomendaSelecionada?.descricao ||
                    "Sem descrição disponível para esta encomenda."}
                </p>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="p-3 rounded-4" style={{ background: "#181818" }}>
                    <span className="text-secondary d-block mb-1">Status</span>
                    <strong>{formatarStatus(encomendaSelecionada?.status)}</strong>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 rounded-4" style={{ background: "#181818" }}>
                    <span className="text-secondary d-block mb-1">Orçamento</span>
                    <strong>{formatarDinheiro(encomendaSelecionada?.orcamento)}</strong>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 rounded-4" style={{ background: "#181818" }}>
                    <span className="text-secondary d-block mb-1">Fornecedor</span>
                    <strong>
                      {encomendaSelecionada?.fornecedor_empresa ||
                        encomendaSelecionada?.fornecedor_nome ||
                        "Ainda não escolhido"}
                    </strong>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 rounded-4" style={{ background: "#181818" }}>
                    <span className="text-secondary d-block mb-1">Logística</span>
                    <strong>
                      {encomendaSelecionada?.nome_logistica ||
                        encomendaSelecionada?.logistica_destino ||
                        "Não informada"}
                    </strong>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 rounded-4" style={{ background: "#181818" }}>
                    <span className="text-secondary d-block mb-1">Data da compra</span>
                    <strong>{formatarData(encomendaSelecionada?.data_com)}</strong>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 rounded-4" style={{ background: "#181818" }}>
                    <span className="text-secondary d-block mb-1">Data de entrega</span>
                    <strong>{formatarData(encomendaSelecionada?.data_entrega)}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                  <h5 className="mb-0 text-white">Orçamentos recebidos</h5>

                  <span className="badge bg-dark border text-white">
                    {orcamentosSelecionados.length} orçamento(s)
                  </span>
                </div>

                {erroOrcamentos && (
                  <div className="alert alert-danger">{erroOrcamentos}</div>
                )}

                {feedbackOrcamentos && (
                  <div className="alert alert-success">{feedbackOrcamentos}</div>
                )}

                {carregandoOrcamentos && (
                  <div className="text-center py-4">
                    <div className="spinner-border text-warning mb-2" />
                    <p className="mb-0 text-secondary">Carregando orçamentos...</p>
                  </div>
                )}

                {!carregandoOrcamentos && orcamentosSelecionados.length === 0 && (
                  <div className="p-4 rounded-4 text-center" style={{ background: "#181818" }}>
                    <i className="bi bi-receipt text-warning" style={{ fontSize: "2.4rem" }} />
                    <p className="mb-0 mt-3 text-secondary">
                      Nenhum orçamento visível foi enviado para esta encomenda.
                    </p>
                  </div>
                )}

                {!carregandoOrcamentos && orcamentosSelecionados.length > 0 && (
                  <div className="row g-3">
                    {orcamentosSelecionados.map((orcamento) => {
                      const escolhido = orcamento.estado === "escolhida";
                      const podeEscolher = orcamento.estado === "visivel";

                      return (
                        <div className="col-md-6" key={orcamento.id_orcamento}>
                          <div className="p-3 rounded-4 h-100" style={{ background: "#181818" }}>
                            <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
                              <span className={`badge ${corEstadoOrcamento(orcamento.estado)}`}>
                                {formatarEstadoOrcamento(orcamento.estado)}
                              </span>

                              <span className="text-secondary small">
                                #{orcamento.id_orcamento}
                              </span>
                            </div>

                            <h5 className="fw-bold mb-2">{orcamento.nome_orcamento}</h5>

                            <p className="text-secondary mb-2">
                              {orcamento.tipo_orcamento}
                            </p>

                            <p className="text-secondary mb-3">
                              Empresa:
                              <span className="text-white fw-semibold ms-2">
                                {orcamento.fornecedor_empresa ||
                                  orcamento.fornecedor_nome ||
                                  "Fornecedor"}
                              </span>
                            </p>

                            <h4 className="fw-bold text-warning mb-3">
                              {formatarDinheiro(orcamento.estimacao)}
                            </h4>

                            <button
                              type="button"
                              className="btn w-100 fw-semibold"
                              onClick={() => escolherOrcamento(orcamento)}
                              disabled={!podeEscolher || escolhendoOrcamentoId === orcamento.id_orcamento}
                              style={{
                                ...buttonGradient,
                                opacity: podeEscolher ? 1 : 0.55,
                                cursor: podeEscolher ? "pointer" : "not-allowed",
                              }}
                            >
                              {escolhendoOrcamentoId === orcamento.id_orcamento ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-2" />
                                  Escolhendo...
                                </>
                              ) : escolhido ? (
                                "Orçamento escolhido"
                              ) : (
                                "Escolher orçamento"
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function formatarEstadoOrcamento(estado) {
  switch (estado) {
    case "visivel":
      return "Visível";
    case "invisivel":
      return "Invisível";
    case "escolhida":
      return "Escolhida";
    case "recusado":
      return "Recusado";
    case "cancelado":
      return "Cancelado";
    default:
      return "Não informado";
  }
}

function corEstadoOrcamento(estado) {
  switch (estado) {
    case "escolhida":
      return "bg-warning text-dark";
    case "visivel":
      return "bg-success";
    case "recusado":
      return "bg-secondary";
    case "cancelado":
      return "bg-danger";
    default:
      return "bg-secondary";
  }
}
