"use client";

import { useEffect, useMemo, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./pedidos.css";

import Image from "next/image";
import { useRouter } from "next/navigation";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
const PEDIDOS_URL = `${API_URL}/api/pedidos`;
const PRODUTOS_URL = `${API_URL}/api/produtos`;

const PEDIDOS_POR_PAGINA = 6;

const statusOptions = [
  { value: "Todos", label: "Todos" },
  { value: "carrinho", label: "Carrinho" },
  { value: "pendente", label: "Pendente" },
  { value: "processando", label: "Processando" },
  { value: "enviado", label: "Enviado" },
  { value: "entregue", label: "Entregue" },
  { value: "cancelado", label: "Cancelado" },
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

function obterIdUsuario(usuario) {
  return (
    usuario?.id_user ||
    usuario?.id_usuario ||
    usuario?.id ||
    usuario?.userId ||
    usuario?.dados?.id_user ||
    usuario?.dados?.id_usuario ||
    usuario?.dados?.id ||
    usuario?.usuario?.id_user ||
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

function getMensagemErro(data) {
  if (data?.detalhes?.length) {
    return data.detalhes.map((erro) => erro.mensagem).join(" | ");
  }

  return data?.mensagem || data?.erro || "Ocorreu um erro inesperado.";
}

function getImagemUrl(imagem) {
  if (!imagem) return "/placeholder.png";

  if (String(imagem).startsWith("http")) return imagem;

  if (String(imagem).startsWith("/uploads")) {
    return `${API_URL}${imagem}`;
  }

  return `${API_URL}/uploads/imagens/${imagem}`;
}

function formatarPreco(valor) {
  const numero = Number(valor || 0);

  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarData(valor) {
  if (!valor) return "Não informado";

  const data = new Date(valor);

  if (Number.isNaN(data.getTime())) return valor;

  return data.toLocaleDateString("pt-BR");
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
      return "Pendente";
  }
}

function getCorStatus(status) {
  switch (status) {
    case "entregue":
      return "#5ba100dc";
    case "enviado":
      return "#ffb300";
    case "processando":
      return "#ff8800";
    case "pendente":
      return "#f5c542";
    case "cancelado":
      return "#ff5a5a";
    case "carrinho":
      return "#8ab4ff";
    default:
      return "#ffcf40";
  }
}

function getEntregaLabel(pedido) {
  if (pedido.status === "entregue") return "Entregue";
  if (pedido.status === "cancelado") return "Cancelado";
  if (pedido.data_entrega) return `Previsão: ${formatarData(pedido.data_entrega)}`;

  return "Em andamento";
}

function normalizarPedido(pedido, produto) {
  const status = String(pedido?.status || "pendente").toLowerCase();

  return {
    ...pedido,
    id_pedido: pedido?.id_pedido || pedido?.id,
    id_produto: pedido?.id_produto,
    produto: pedido?.nome_produto || produto?.nome_produto || `Produto #${pedido?.id_produto || "N/A"}`,
    imagem: getImagemUrl(produto?.imagem || pedido?.imagem),
    preco: produto?.preco ?? pedido?.preco ?? 0,
    status,
    statusLabel: formatarStatus(status),
    cor: getCorStatus(status),
    dataPedidoFormatada: formatarData(pedido?.data_pedido),
    dataEntregaFormatada: pedido?.data_entrega ? formatarData(pedido.data_entrega) : null,
  };
}

export default function Pedidos() {
  const router = useRouter();

  const [usuario, setUsuario] = useState(null);
  const [verificandoAcesso, setVerificandoAcesso] = useState(true);

  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroLista, setErroLista] = useState("");

  const [pedidoParaExcluir, setPedidoParaExcluir] = useState(null);
  const [excluindo, setExcluindo] = useState(false);

  const [buscaProduto, setBuscaProduto] = useState("");
  const [statusSelecionado, setStatusSelecionado] = useState("Todos");
  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    verificarAcessoECarregarPedidos();
  }, []);

  async function verificarAcessoECarregarPedidos() {
    try {
      setVerificandoAcesso(true);

      const token = obterToken();
      const usuarioLocal = obterUsuarioLocal();
      const idUsuario = obterIdUsuario(usuarioLocal);

      if (!token || !idUsuario) {
        router.replace("/login");
        return;
      }

      setUsuario(usuarioLocal);
      setVerificandoAcesso(false);

      await carregarPedidos(idUsuario);
    } catch (error) {
      console.error("Erro ao verificar acesso:", error);
      setErroLista(error.message || "Não foi possível verificar o acesso.");
      setVerificandoAcesso(false);
      setCarregando(false);
    }
  }

  async function buscarProdutoPorId(id_produto) {
    if (!id_produto) return null;

    try {
      const response = await fetch(`${PRODUTOS_URL}/${id_produto}`, {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.sucesso) {
        return null;
      }

      return data?.dados || null;
    } catch (error) {
      console.error(`Erro ao buscar produto ${id_produto}:`, error);
      return null;
    }
  }

  async function carregarPedidos(idUsuario = obterIdUsuario(usuario)) {
    try {
      setCarregando(true);
      setErroLista("");

      const response = await fetch(
        `${PEDIDOS_URL}/id_user/${idUsuario}?pagina=1&limite=100`,
        {
          method: "GET",
          headers: montarHeaders(),
          cache: "no-store",
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.sucesso) {
        throw new Error(getMensagemErro(data));
      }

      const listaPedidos = Array.isArray(data?.dados)
        ? data.dados
        : Array.isArray(data?.dados?.pedidos)
        ? data.dados.pedidos
        : [];

      const pedidosNormalizados = await Promise.all(
        listaPedidos.map(async (pedido) => {
          const produto = await buscarProdutoPorId(pedido.id_produto);
          return normalizarPedido(pedido, produto);
        })
      );

      setPedidos(pedidosNormalizados);
      setPaginaAtual(1);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
      setPedidos([]);
      setErroLista(error.message || "Não foi possível carregar os pedidos.");
    } finally {
      setCarregando(false);
    }
  }

  async function confirmarExclusaoPedido() {
    if (!pedidoParaExcluir?.id_pedido) return;

    try {
      setExcluindo(true);

      const response = await fetch(`${PEDIDOS_URL}/${pedidoParaExcluir.id_pedido}`, {
        method: "DELETE",
        headers: montarHeaders(),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.sucesso) {
        throw new Error(getMensagemErro(data));
      }

      setPedidos((prev) =>
        prev.filter((pedido) => pedido.id_pedido !== pedidoParaExcluir.id_pedido)
      );

      setPedidoParaExcluir(null);
    } catch (error) {
      console.error("Erro ao excluir pedido:", error);
      alert(error.message || "Não foi possível excluir o pedido.");
    } finally {
      setExcluindo(false);
    }
  }

  function irParaProdutos() {
    router.push("/produtos");
  }

  const pedidosFiltrados = useMemo(() => {
    return pedidos.filter((pedido) => {
      const nomeProduto = String(pedido.produto || "").toLowerCase();
      const busca = buscaProduto.trim().toLowerCase();

      const nomeMatch = !busca || nomeProduto.includes(busca);

      const statusMatch =
        statusSelecionado === "Todos" ||
        pedido.status === statusSelecionado;

      return nomeMatch && statusMatch;
    });
  }, [pedidos, buscaProduto, statusSelecionado]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(pedidosFiltrados.length / PEDIDOS_POR_PAGINA)
  );

  const pedidosAtuais = useMemo(() => {
    const ultimoPedido = paginaAtual * PEDIDOS_POR_PAGINA;
    const primeiroPedido = ultimoPedido - PEDIDOS_POR_PAGINA;

    return pedidosFiltrados.slice(primeiroPedido, ultimoPedido);
  }, [pedidosFiltrados, paginaAtual]);

  const resumo = useMemo(() => {
    const total = pedidos.length;

    const emAndamento = pedidos.filter((pedido) =>
      ["pendente", "processando", "enviado"].includes(pedido.status)
    ).length;

    const finalizados = pedidos.filter(
      (pedido) => pedido.status === "entregue"
    ).length;

    return {
      total,
      emAndamento,
      finalizados,
    };
  }, [pedidos]);

  useEffect(() => {
    setPaginaAtual(1);
  }, [buscaProduto, statusSelecionado]);

  if (verificandoAcesso) {
    return (
      <main
        className="d-flex justify-content-center align-items-center text-white"
        style={{
          background: "#000",
          minHeight: "100vh",
        }}
      >
        <div className="text-center">
          <div className="spinner-border text-warning mb-3" />
          <h4 className="fw-bold">Verificando acesso...</h4>
          <p className="text-secondary mb-0">
            Você precisa estar logado para acessar seus pedidos.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        background: "#000",
        minHeight: "100vh",
      }}
    >
      <section
        className="py-5 text-white"
        style={{
          background: "linear-gradient(to right, #c0012a, #ff8800)",
        }}
      >
        <div className="container py-4">
          <h1 className="display-4 fw-bold">Meus Pedidos</h1>

          <p className="lead mt-3 col-lg-8">
            Acompanhe seus pedidos, entregas e informações das suas compras em
            tempo real.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container-fluid px-4">
          <div className="row">
            <div className="col-lg-3 mb-4">
              <div
                className="position-sticky p-4 rounded-4 shadow-lg"
                style={{
                  top: "20px",
                  background: "#111",
                  border: "1px solid rgba(255,255,255,.14)",
                }}
              >
                <div className="text-center">
                  <div
                    style={{
                      width: "130px",
                      height: "130px",
                      borderRadius: "24px",
                      overflow: "hidden",
                      margin: "0 auto",
                      border: "2px solid rgba(255,255,255,.14)",
                    }}
                  >
                    <Image
                      src="/core.png"
                      alt="Usuário"
                      width={130}
                      height={130}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <h4 className="text-white fw-bold mt-4">
                    {usuario?.nome_user || "Usuário"}
                  </h4>

                  <p style={{ color: "#cfcfcf" }}>
                    {usuario?.tipo === "fornecedor"
                      ? "Fornecedor"
                      : usuario?.tipo === "admin" || usuario?.tipo === "administrador"
                      ? "Administrador"
                      : "Cliente"}
                  </p>
                </div>

                <div className="mt-4">
                  <h5 className="text-white fw-bold mb-3">Resumo</h5>

                  <div className="d-flex flex-column gap-3">
                    {[
                      {
                        titulo: "Pedidos",
                        valor: resumo.total,
                      },
                      {
                        titulo: "Em andamento",
                        valor: resumo.emAndamento,
                      },
                      {
                        titulo: "Finalizados",
                        valor: resumo.finalizados,
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        style={{
                          background: "rgba(255,255,255,.03)",
                          border: "1px solid rgba(255,255,255,.08)",
                          borderRadius: "18px",
                          padding: "18px",
                        }}
                      >
                        <span
                          style={{
                            color: "#cfcfcf",
                            fontSize: ".82rem",
                            textTransform: "uppercase",
                            letterSpacing: ".5px",
                          }}
                        >
                          {item.titulo}
                        </span>

                        <h3
                          style={{
                            color: "white",
                            marginTop: "8px",
                            fontWeight: "700",
                          }}
                        >
                          {String(item.valor).padStart(2, "0")}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="my-4" />

                <div className="mb-3">
                  <label className="form-label text-white">
                    Buscar produto
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Digite o nome do produto..."
                    value={buscaProduto}
                    onChange={(e) => setBuscaProduto(e.target.value)}
                    style={{
                      background: "#151518",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: "#fff",
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-white">
                    Status do pedido
                  </label>

                  <select
                    className="form-select"
                    value={statusSelecionado}
                    onChange={(e) => setStatusSelecionado(e.target.value)}
                    style={{
                      background: "#151518",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: "#fff",
                    }}
                  >
                    {statusOptions.map((status) => (
                      <option
                        key={status.value}
                        value={status.value}
                        style={{ color: "#111" }}
                      >
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={irParaProdutos}
                  className="btn w-100 text-white fw-semibold mt-4"
                  style={{
                    background: "linear-gradient(to right, #c0012a, #ff8800)",
                    border: "none",
                    borderRadius: "14px",
                    padding: "12px",
                    transition: ".3s",
                  }}
                >
                  Comprar produtos
                </button>
              </div>
            </div>

            <div className="col-lg-9">
              {erroLista && (
                <div className="alert alert-danger rounded-4">
                  {erroLista}
                </div>
              )}

              {carregando ? (
                <div
                  className="d-flex flex-column justify-content-center align-items-center"
                  style={{
                    height: "320px",
                    borderRadius: "28px",
                    border: "1px solid rgba(255,255,255,.06)",
                    background: "rgba(255,255,255,.02)",
                  }}
                >
                  <div className="spinner-border text-warning mb-3" />
                  <h4 className="text-white fw-bold">
                    Carregando pedidos...
                  </h4>
                </div>
              ) : (
                <div className="row g-4">
                  {pedidosAtuais.map((pedido) => (
                    <div className="col-12" key={pedido.id_pedido}>
                      <div
                        className="card border-0 overflow-hidden shadow-lg"
                        style={{
                          background: "#111",
                          border: "1px solid rgba(255,255,255,.14)",
                          transition: ".3s",
                        }}
                      >
                        <div className="row g-0">
                          <div className="col-md-3">
                            <img
                              src={pedido.imagem}
                              alt={pedido.produto}
                              className="w-100"
                              onError={(event) => {
                                event.currentTarget.src = "/placeholder.png";
                              }}
                              style={{
                                objectFit: "cover",
                                height: "320px",
                                borderRadius: "12px",
                              }}
                            />
                          </div>

                          <div className="col-md-9">
                            <div className="card-body h-100 d-flex flex-column">
                              <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                                <div>
                                  <p
                                    style={{
                                      color: pedido.cor,
                                      fontWeight: "700",
                                      marginBottom: "8px",
                                      letterSpacing: ".5px",
                                    }}
                                  >
                                    Pedido #{pedido.id_pedido}
                                  </p>

                                  <h3 className="text-white fw-bold">
                                    {pedido.produto}
                                  </h3>

                                  <p style={{ color: "#cfcfcf" }}>
                                    Data do pedido:{" "}
                                    {pedido.dataPedidoFormatada}
                                  </p>
                                </div>

                                <button
                                  className="btn"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalExcluir"
                                  onClick={() => setPedidoParaExcluir(pedido)}
                                  style={{
                                    background: "rgba(255,255,255,.05)",
                                    border: "1px solid rgba(255,255,255,.08)",
                                    color: "#ff5a5a",
                                    width: "45px",
                                    height: "45px",
                                    borderRadius: "12px",
                                  }}
                                >
                                  <i className="bi bi-trash-fill"></i>
                                </button>
                              </div>

                              <div className="row mt-4">
                                <div className="col-md-4 mb-3">
                                  <div
                                    style={{
                                      background: "rgba(255,255,255,.03)",
                                      border: "1px solid rgba(255,255,255,.08)",
                                      borderRadius: "16px",
                                      padding: "18px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color: "#cfcfcf",
                                        fontSize: ".8rem",
                                        display: "block",
                                        marginBottom: "8px",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      Status
                                    </span>

                                    <h6
                                      style={{
                                        margin: 0,
                                        fontWeight: "700",
                                        color: pedido.cor,
                                      }}
                                    >
                                      {pedido.statusLabel}
                                    </h6>
                                  </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                  <div
                                    style={{
                                      background: "rgba(255,255,255,.03)",
                                      border: "1px solid rgba(255,255,255,.08)",
                                      borderRadius: "16px",
                                      padding: "18px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color: "#cfcfcf",
                                        fontSize: ".8rem",
                                        display: "block",
                                        marginBottom: "8px",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      Valor
                                    </span>

                                    <h6
                                      style={{
                                        margin: 0,
                                        fontWeight: "700",
                                        color: "#5ba100dc",
                                      }}
                                    >
                                      {formatarPreco(pedido.preco)}
                                    </h6>
                                  </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                  <div
                                    style={{
                                      background: "rgba(255,255,255,.03)",
                                      border: "1px solid rgba(255,255,255,.08)",
                                      borderRadius: "16px",
                                      padding: "18px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color: "#cfcfcf",
                                        fontSize: ".8rem",
                                        display: "block",
                                        marginBottom: "8px",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      Entrega
                                    </span>

                                    <h6
                                      className="text-white"
                                      style={{
                                        margin: 0,
                                        fontWeight: "700",
                                      }}
                                    >
                                      {getEntregaLabel(pedido)}
                                    </h6>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-auto d-flex gap-3 flex-wrap">
                                <button
                                  className="btn text-white fw-semibold"
                                  style={{
                                    background:
                                      "linear-gradient(to right, #940533, #ff8800)",
                                    border: "none",
                                    borderRadius: "12px",
                                    padding: "12px 18px",
                                  }}
                                >
                                  Ver detalhes
                                </button>

                                <button
                                  className="btn btn-outline-light"
                                  style={{
                                    borderRadius: "12px",
                                    padding: "12px 18px",
                                  }}
                                >
                                  Rastrear
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {pedidosFiltrados.length === 0 && (
                    <div className="col-12">
                      <div
                        className="d-flex flex-column justify-content-center align-items-center"
                        style={{
                          height: "300px",
                          borderRadius: "28px",
                          border: "1px solid rgba(255,255,255,.06)",
                          background: "rgba(255,255,255,.02)",
                        }}
                      >
                        <i
                          className="bi bi-bag-x"
                          style={{
                            fontSize: "4rem",
                            color: "#ffcf40",
                            marginBottom: "18px",
                          }}
                        />

                        <h3
                          style={{
                            color: "white",
                            fontWeight: "700",
                          }}
                        >
                          Nenhum pedido encontrado
                        </h3>

                        <p
                          style={{
                            color: "rgba(255,255,255,.55)",
                          }}
                        >
                          Tente pesquisar por outro nome ou status.
                        </p>
                      </div>
                    </div>
                  )}

                  {pedidosFiltrados.length > 0 && (
                    <nav className="mt-5">
                      <ul className="pagination justify-content-center">
                        <li
                          className={`page-item ${
                            paginaAtual === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link paginacao-btn"
                            onClick={() =>
                              setPaginaAtual((prev) => Math.max(prev - 1, 1))
                            }
                          >
                            Anterior
                          </button>
                        </li>

                        {[...Array(totalPaginas)].map((_, index) => (
                          <li
                            key={index}
                            className={`page-item ${
                              paginaAtual === index + 1 ? "active" : ""
                            }`}
                          >
                            <button
                              className={
                                paginaAtual === index + 1
                                  ? "page-link paginacao-btn-active"
                                  : "page-link paginacao-btn"
                              }
                              onClick={() => setPaginaAtual(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}

                        <li
                          className={`page-item ${
                            paginaAtual === totalPaginas ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link paginacao-btn"
                            onClick={() =>
                              setPaginaAtual((prev) =>
                                Math.min(prev + 1, totalPaginas)
                              )
                            }
                          >
                            Próximo
                          </button>
                        </li>
                      </ul>
                    </nav>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div
        className="modal fade"
        id="modalExcluir"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content border-0"
            style={{
              background: "#111",
              borderRadius: "24px",
            }}
          >
            <div className="modal-body p-4 text-center">
              <i
                className="bi bi-exclamation-triangle-fill"
                style={{
                  fontSize: "4rem",
                  color: "#ff8800",
                }}
              ></i>

              <h3 className="text-white fw-bold mt-3">
                Confirmar exclusão
              </h3>

              <p
                style={{
                  color: "#cfcfcf",
                }}
              >
                Tem certeza que deseja excluir o pedido:
                <br />

                <span
                  style={{
                    color: "#fff",
                    fontWeight: "700",
                  }}
                >
                  #{pedidoParaExcluir?.id_pedido}
                </span>
                ?
              </p>

              <div className="d-flex gap-3 mt-4">
                <button
                  className="btn btn-outline-light w-50"
                  data-bs-dismiss="modal"
                  disabled={excluindo}
                >
                  Cancelar
                </button>

                <button
                  className="btn w-50 text-white"
                  style={{
                    background: "linear-gradient(to right, #c0012a, #ff4d4d)",
                    border: "none",
                  }}
                  data-bs-dismiss="modal"
                  disabled={excluindo}
                  onClick={confirmarExclusaoPedido}
                >
                  {excluindo ? "Excluindo..." : "Excluir"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}