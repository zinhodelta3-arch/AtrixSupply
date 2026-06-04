"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
const ENCOMENDAS_URL = `${API_URL}/api/encomendas`;

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

    async function carregarEncomendas() {
      try {
        setLoading(true);
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

        setEncomendas(Array.isArray(lista) ? lista : []);
        setPaginacao(normalizarPaginacao(data));
      } catch (error) {
        if (error.name === "AbortError") return;

        console.error("Erro ao carregar encomendas:", error);
        setErro(error.message || "Não foi possível carregar suas encomendas.");
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

    return () => {
      clearTimeout(delay);
      controller.abort();
    };
  }, [validandoAcesso, paginaAtual, busca, usuarioLogado]);

  function handleBuscaChange(event) {
    setBusca(event.target.value);
    setPaginaAtual(1);
  }

  function abrirDetalhes(encomenda) {
    setEncomendaSelecionada(encomenda);
  }

  const metricas = useMemo(() => {
    return {
      total: encomendas.length,
      pendentes: encomendas.filter((item) => item.status === "pendente").length,
      andamento: encomendas.filter((item) => item.status === "em_andamento").length,
      finalizadas: encomendas.filter((item) => item.status === "finalizado").length,
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
            Acompanhe seus pedidos
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

                  <p className="mb-0">
                    Você ainda não possui encomendas ou a pesquisa não encontrou resultados.
                  </p>
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
                                      {encomenda.id_fornecedor || "Não informado"}
                                    </span>
                                  </p>

                                  <p className="text-secondary mb-2">
                                    Logística:
                                    <span className="text-white fw-semibold ms-2">
                                      {encomenda.id_logistica || "Não informada"}
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
                                  disabled
                                >
                                  Aguardando fornecedor
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
                    <strong>{encomendaSelecionada?.id_fornecedor || "Não informado"}</strong>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 rounded-4" style={{ background: "#181818" }}>
                    <span className="text-secondary d-block mb-1">Logística</span>
                    <strong>{encomendaSelecionada?.id_logistica || "Não informada"}</strong>
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}