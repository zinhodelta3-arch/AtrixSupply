"use client";

import Link from "next/link";
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

const pageBackground = `
  radial-gradient(circle at top left, rgba(255,136,0,.10), transparent 25%),
  radial-gradient(circle at bottom right, rgba(192,1,42,.16), transparent 30%),
  linear-gradient(145deg,#08080a,#101014,#160d12)
`;

const heroGradient = "linear-gradient(135deg,#940533,#c0012a,#f5061d,#ff8800)";

const panelStyle = {
  background: "rgba(17,17,17,.95)",
  border: "1px solid rgba(255,255,255,0.12)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 24px 70px rgba(0,0,0,.35)",
};

const cardStyle = {
  background: "rgba(17,17,17,.96)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "24px",
  boxShadow: "0 25px 70px rgba(0,0,0,.35)",
};

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

const modalSurface = {
  background: `
    radial-gradient(circle at top left, rgba(255,136,0,.10), transparent 35%),
    radial-gradient(circle at bottom right, rgba(192,1,42,.16), transparent 34%),
    linear-gradient(145deg,#111,#181016)
  `,
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "28px",
  color: "white",
  overflow: "hidden",
};

const modalInfoBox = {
  background: "rgba(255,255,255,.035)",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "18px",
  padding: "18px",
};

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

function obterTipoUsuario(usuario) {
  return String(
    usuario?.tipo ||
      usuario?.dados?.tipo ||
      usuario?.usuario?.tipo ||
      ""
  )
    .trim()
    .toLowerCase();
}

function montarHeaders() {
  const token = obterToken();

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function getMensagemErro(data) {
  if (data?.detalhes?.length) {
    return data.detalhes.map((erro) => erro.mensagem).join(" | ");
  }

  return data?.mensagem || data?.erro || "Ocorreu um erro inesperado.";
}

function getImagemUrl(imagem) {
  if (!imagem) return "/logo.png";

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

function getNivelStatus(status) {
  switch (status) {
    case "carrinho":
      return 0;
    case "pendente":
      return 1;
    case "processando":
      return 2;
    case "enviado":
      return 3;
    case "entregue":
      return 4;
    case "cancelado":
      return -1;
    default:
      return 1;
  }
}

function getEtapasRastreamento(pedido) {
  if (!pedido) return [];

  if (pedido.status === "cancelado") {
    return [
      {
        titulo: "Pedido recebido",
        descricao: "Seu pedido entrou no sistema da Atrix Supply.",
        icon: "bi-receipt-cutoff",
        data: pedido.dataPedidoFormatada,
        estado: "done",
      },
      {
        titulo: "Pedido cancelado",
        descricao: "Este pedido foi cancelado e não seguirá para entrega.",
        icon: "bi-x-octagon-fill",
        data: pedido.dataEntregaFormatada || "Sem data informada",
        estado: "cancelled",
      },
    ];
  }

  const nivelAtual = getNivelStatus(pedido.status);

  const etapas = [
    {
      status: "pendente",
      titulo: "Pedido recebido",
      descricao: "Recebemos seu pedido e ele já está registrado no sistema.",
      icon: "bi-receipt-cutoff",
      data: pedido.dataPedidoFormatada,
      nivel: 1,
    },
    {
      status: "processando",
      titulo: "Pedido em processamento",
      descricao: "A equipe está validando o pedido e preparando a separação do produto.",
      icon: "bi-box-seam-fill",
      data: "Em preparação",
      nivel: 2,
    },
    {
      status: "enviado",
      titulo: "Pedido enviado",
      descricao: "O pedido saiu para transporte ou está aguardando despacho final.",
      icon: "bi-truck",
      data: pedido.status === "enviado" ? "Em rota" : "Aguardando envio",
      nivel: 3,
    },
    {
      status: "entregue",
      titulo: "Entrega concluída",
      descricao: "O pedido foi entregue ao destino informado.",
      icon: "bi-check-circle-fill",
      data: pedido.dataEntregaFormatada || "Aguardando confirmação",
      nivel: 4,
    },
  ];

  return etapas.map((etapa) => {
    if (nivelAtual > etapa.nivel) {
      return {
        ...etapa,
        estado: "done",
      };
    }

    if (nivelAtual === etapa.nivel) {
      return {
        ...etapa,
        estado: "active",
      };
    }

    return {
      ...etapa,
      estado: "pending",
    };
  });
}

function getEtapaStyle(estado) {
  if (estado === "done") {
    return {
      color: "#5ba100dc",
      background: "rgba(91,161,0,.13)",
      border: "1px solid rgba(91,161,0,.28)",
    };
  }

  if (estado === "active") {
    return {
      color: "#ffb300",
      background: "rgba(255,179,0,.13)",
      border: "1px solid rgba(255,179,0,.28)",
    };
  }

  if (estado === "cancelled") {
    return {
      color: "#ff5a5a",
      background: "rgba(255,90,90,.13)",
      border: "1px solid rgba(255,90,90,.28)",
    };
  }

  return {
    color: "rgba(255,255,255,.38)",
    background: "rgba(255,255,255,.04)",
    border: "1px solid rgba(255,255,255,.08)",
  };
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

  const [pedidoDetalhe, setPedidoDetalhe] = useState(null);
  const [pedidoRastreamento, setPedidoRastreamento] = useState(null);

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
      setCarregando(true);
      setErroLista("");

      const token = obterToken();
      const usuarioLocal = obterUsuarioLocal();
      const idUsuario = obterIdUsuario(usuarioLocal);
      const tipoUsuario = obterTipoUsuario(usuarioLocal);

      if (!token || !idUsuario) {
        router.replace("/login");
        return;
      }

      if (tipoUsuario !== "comum") {
        router.replace("/");
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

  const etapasRastreamento = useMemo(() => {
    return getEtapasRastreamento(pedidoRastreamento);
  }, [pedidoRastreamento]);

  useEffect(() => {
    setPaginaAtual(1);
  }, [buscaProduto, statusSelecionado]);

  if (verificandoAcesso) {
    return (
      <main
        className="d-flex justify-content-center align-items-center text-white"
        style={{
          background: pageBackground,
          minHeight: "100vh",
        }}
      >
        <div className="text-center">
          <div className="spinner-border text-warning mb-3" />
          <h4 className="fw-bold">Verificando acesso...</h4>
          <p className="text-secondary mb-0">
            Apenas usuários comuns podem acessar seus pedidos.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        background: pageBackground,
        minHeight: "100vh",
        color: "white",
      }}
    >
      <section
        className="py-5 text-white"
        style={{
          background: heroGradient,
          borderBottom: "1px solid rgba(255,255,255,.08)",
          boxShadow: "0 25px 80px rgba(192,1,42,.18)",
        }}
      >
        <div className="container py-4">
          <span className="badge bg-warning text-dark mb-3 px-3 py-2">
            Área do Cliente
          </span>

          <h1 className="display-4 fw-bold">Meus Pedidos</h1>

          <p className="lead mt-3 col-lg-8 mb-0">
            Acompanhe seus pedidos, entregas e informações das suas compras em
            tempo real.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container-fluid px-4">
          <div className="row g-4">
            <div className="col-lg-3">
              <aside
                className="position-sticky p-4 rounded-4"
                style={{
                  top: "20px",
                  ...panelStyle,
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
                      boxShadow: "0 18px 40px rgba(0,0,0,.35)",
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
                    Cliente
                  </p>
                </div>

                <div className="mt-4">
                  <h5 className="text-white fw-bold mb-3">Resumo</h5>

                  <div className="d-flex flex-column gap-3">
                    {[
                      {
                        titulo: "Pedidos",
                        valor: resumo.total,
                        icon: "bi-bag-check",
                      },
                      {
                        titulo: "Em andamento",
                        valor: resumo.emAndamento,
                        icon: "bi-arrow-repeat",
                      },
                      {
                        titulo: "Finalizados",
                        valor: resumo.finalizados,
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
                            flexShrink: 0,
                          }}
                        >
                          <i className={`bi ${item.icon}`} />
                        </div>

                        <div>
                          <span
                            style={{
                              color: "rgba(255,255,255,.58)",
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
                              marginTop: "4px",
                              marginBottom: 0,
                              fontWeight: "700",
                              fontSize: "1.35rem",
                            }}
                          >
                            {String(item.valor).padStart(2, "0")}
                          </h3>
                        </div>
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
                    style={inputStyle}
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
                    style={inputStyle}
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
                    ...buttonGradient,
                    padding: "12px",
                  }}
                >
                  Comprar produtos
                </button>
              </aside>
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
                    background: "rgba(255,255,255,.03)",
                  }}
                >
                  <div className="spinner-border text-warning mb-3" />

                  <h4 className="text-white fw-bold">
                    Carregando pedidos...
                  </h4>

                  <p
                    className="mb-0"
                    style={{
                      color: "rgba(255,255,255,.58)",
                    }}
                  >
                    Buscando suas compras atualizadas.
                  </p>
                </div>
              ) : (
                <div className="row g-4">
                  {pedidosAtuais.map((pedido) => (
                    <div className="col-12" key={pedido.id_pedido}>
                      <article
                        className="card border-0 overflow-hidden"
                        style={cardStyle}
                      >
                        <div className="row g-0">
                          <div className="col-md-3">
                            <img
                              src={pedido.imagem}
                              alt={pedido.produto}
                              className="w-100"
                              onError={(event) => {
                                event.currentTarget.src = "/logo.png";
                              }}
                              style={{
                                objectFit: "cover",
                                height: "320px",
                                borderRadius: "18px",
                                padding: "10px",
                              }}
                            />
                          </div>

                          <div className="col-md-9">
                            <div className="card-body h-100 d-flex flex-column p-4">
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
                                  type="button"
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
                                  type="button"
                                  className="btn text-white fw-semibold"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalDetalhesPedido"
                                  onClick={() => setPedidoDetalhe(pedido)}
                                  style={{
                                    ...buttonGradient,
                                    padding: "12px 18px",
                                  }}
                                >
                                  <i className="bi bi-eye-fill me-2" />
                                  Ver detalhes
                                </button>

                                <button
                                  type="button"
                                  className="btn btn-outline-light"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalRastrearPedido"
                                  onClick={() => setPedidoRastreamento(pedido)}
                                  style={{
                                    borderRadius: "12px",
                                    padding: "12px 18px",
                                  }}
                                >
                                  <i className="bi bi-truck me-2" />
                                  Rastrear
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
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
                          background: "rgba(255,255,255,.03)",
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
                      <ul className="pagination justify-content-center flex-wrap gap-2">
                        <li
                          className={`page-item ${
                            paginaAtual === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            type="button"
                            className="page-link paginacao-btn"
                            onClick={() =>
                              setPaginaAtual((prev) => Math.max(prev - 1, 1))
                            }
                          >
                            Anterior
                          </button>
                        </li>

                        {[...Array(totalPaginas)].map((_, index) => {
                          const numeroPagina = index + 1;
                          const ativo = paginaAtual === numeroPagina;

                          return (
                            <li
                              key={numeroPagina}
                              className={`page-item ${ativo ? "active" : ""}`}
                            >
                              <button
                                type="button"
                                className={
                                  ativo
                                    ? "page-link paginacao-btn-active"
                                    : "page-link paginacao-btn"
                                }
                                onClick={() => setPaginaAtual(numeroPagina)}
                              >
                                {numeroPagina}
                              </button>
                            </li>
                          );
                        })}

                        <li
                          className={`page-item ${
                            paginaAtual === totalPaginas ? "disabled" : ""
                          }`}
                        >
                          <button
                            type="button"
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
        id="modalDetalhesPedido"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content border-0" style={modalSurface}>
            <div className="modal-header border-0 px-4 px-lg-5 pt-4">
              <div>
                <span
                  className="badge mb-2"
                  style={{
                    background: pedidoDetalhe
                      ? `${pedidoDetalhe.cor}22`
                      : "rgba(255,179,0,.12)",
                    color: pedidoDetalhe?.cor || "#ffb300",
                    border: pedidoDetalhe
                      ? `1px solid ${pedidoDetalhe.cor}55`
                      : "1px solid rgba(255,179,0,.22)",
                    borderRadius: "999px",
                    padding: "8px 12px",
                  }}
                >
                  Pedido #{pedidoDetalhe?.id_pedido || "—"}
                </span>

                <h3 className="modal-title fw-bold text-white">
                  Detalhes do pedido
                </h3>
              </div>

              <button
                type="button"
                className="btn-close btn-close-white shadow-none"
                data-bs-dismiss="modal"
                aria-label="Fechar"
              />
            </div>

            <div className="modal-body px-4 px-lg-5 pb-5">
              {pedidoDetalhe && (
                <div className="row g-4 align-items-stretch">
                  <div className="col-lg-5">
                    <div
                      className="h-100"
                      style={{
                        ...modalInfoBox,
                        padding: "14px",
                      }}
                    >
                      <img
                        src={pedidoDetalhe.imagem}
                        alt={pedidoDetalhe.produto}
                        onError={(event) => {
                          event.currentTarget.src = "/logo.png";
                        }}
                        style={{
                          width: "100%",
                          height: "360px",
                          objectFit: "cover",
                          borderRadius: "20px",
                          background: "rgba(0,0,0,.25)",
                        }}
                      />

                      <div className="p-3">
                        <h4 className="fw-bold text-white mb-2">
                          {pedidoDetalhe.produto}
                        </h4>

                        <p
                          className="mb-0"
                          style={{
                            color: "rgba(255,255,255,.58)",
                            lineHeight: 1.7,
                          }}
                        >
                          Produto vinculado ao pedido #{pedidoDetalhe.id_pedido}.
                          Para mais informações técnicas, acesse a página do produto.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-7">
                    <div className="row g-3">
                      {[
                        {
                          label: "Status",
                          value: pedidoDetalhe.statusLabel,
                          color: pedidoDetalhe.cor,
                          icon: "bi-activity",
                        },
                        {
                          label: "Valor",
                          value: formatarPreco(pedidoDetalhe.preco),
                          color: "#5ba100dc",
                          icon: "bi-cash-coin",
                        },
                        {
                          label: "Data do pedido",
                          value: pedidoDetalhe.dataPedidoFormatada,
                          color: "#ffb300",
                          icon: "bi-calendar-check",
                        },
                        {
                          label: "Entrega",
                          value: getEntregaLabel(pedidoDetalhe),
                          color: "#8ab4ff",
                          icon: "bi-truck",
                        },
                        {
                          label: "ID do pedido",
                          value: `#${pedidoDetalhe.id_pedido}`,
                          color: "#ff8800",
                          icon: "bi-hash",
                        },
                        {
                          label: "ID do produto",
                          value: `#${pedidoDetalhe.id_produto || "N/A"}`,
                          color: "#f5061d",
                          icon: "bi-box-seam",
                        },
                      ].map((item) => (
                        <div className="col-md-6" key={item.label}>
                          <div style={modalInfoBox} className="h-100">
                            <div className="d-flex align-items-center gap-3">
                              <div
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                  width: "46px",
                                  height: "46px",
                                  borderRadius: "14px",
                                  background: `${item.color}18`,
                                  border: `1px solid ${item.color}33`,
                                  color: item.color,
                                  flexShrink: 0,
                                }}
                              >
                                <i className={`bi ${item.icon}`} />
                              </div>

                              <div>
                                <span
                                  style={{
                                    color: "rgba(255,255,255,.52)",
                                    fontSize: ".78rem",
                                    textTransform: "uppercase",
                                    letterSpacing: ".6px",
                                    fontWeight: 800,
                                  }}
                                >
                                  {item.label}
                                </span>

                                <h6
                                  className="mb-0 mt-1 fw-bold"
                                  style={{
                                    color: item.color,
                                  }}
                                >
                                  {item.value}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4" style={modalInfoBox}>
                      <h5 className="fw-bold text-white mb-3">
                        Resumo operacional
                      </h5>

                      <p
                        className="mb-0"
                        style={{
                          color: "rgba(255,255,255,.64)",
                          lineHeight: 1.8,
                        }}
                      >
                        Este pedido está com status{" "}
                        <strong style={{ color: pedidoDetalhe.cor }}>
                          {pedidoDetalhe.statusLabel}
                        </strong>
                        . A entrega aparece como{" "}
                        <strong style={{ color: "#ffb300" }}>
                          {getEntregaLabel(pedidoDetalhe)}
                        </strong>
                        . As informações exibidas são baseadas nos dados atuais da
                        API de pedidos e produtos.
                      </p>
                    </div>

                    <div className="d-flex gap-3 flex-wrap mt-4">
                      {pedidoDetalhe.id_produto && (
                        <Link
                          href={`/produtos/${pedidoDetalhe.id_produto}`}
                          className="btn text-white fw-semibold"
                          data-bs-dismiss="modal"
                          style={{
                            ...buttonGradient,
                            padding: "12px 18px",
                            textDecoration: "none",
                          }}
                        >
                          <i className="bi bi-box-arrow-up-right me-2" />
                          Ver produto
                        </Link>
                      )}

                      <button
                        type="button"
                        className="btn btn-outline-light"
                        data-bs-dismiss="modal"
                        style={{
                          borderRadius: "14px",
                          padding: "12px 18px",
                          fontWeight: 700,
                        }}
                      >
                        Fechar detalhes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="modalRastrearPedido"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0" style={modalSurface}>
            <div className="modal-header border-0 px-4 px-lg-5 pt-4">
              <div>
                <span className="badge bg-warning text-dark mb-2 px-3 py-2">
                  Rastreamento
                </span>

                <h3 className="modal-title fw-bold text-white">
                  Pedido #{pedidoRastreamento?.id_pedido || "—"}
                </h3>

                <p
                  className="mb-0 mt-2"
                  style={{
                    color: "rgba(255,255,255,.58)",
                  }}
                >
                  {pedidoRastreamento?.produto || "Produto não informado"}
                </p>
              </div>

              <button
                type="button"
                className="btn-close btn-close-white shadow-none"
                data-bs-dismiss="modal"
                aria-label="Fechar"
              />
            </div>

            <div className="modal-body px-4 px-lg-5 pb-5">
              {pedidoRastreamento && (
                <>
                  <div
                    className="mb-4"
                    style={{
                      ...modalInfoBox,
                      borderColor: `${pedidoRastreamento.cor}33`,
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                      <div>
                        <span
                          style={{
                            color: "rgba(255,255,255,.55)",
                            fontSize: ".8rem",
                            textTransform: "uppercase",
                            letterSpacing: ".6px",
                            fontWeight: 800,
                          }}
                        >
                          Status atual
                        </span>

                        <h4
                          className="fw-bold mt-1 mb-0"
                          style={{
                            color: pedidoRastreamento.cor,
                          }}
                        >
                          {pedidoRastreamento.statusLabel}
                        </h4>
                      </div>

                      <div
                        className="text-end"
                        style={{
                          color: "rgba(255,255,255,.64)",
                        }}
                      >
                        <strong className="d-block text-white">
                          {getEntregaLabel(pedidoRastreamento)}
                        </strong>
                        <span style={{ fontSize: ".88rem" }}>
                          Pedido feito em {pedidoRastreamento.dataPedidoFormatada}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-column gap-3">
                    {etapasRastreamento.map((etapa, index) => {
                      const visual = getEtapaStyle(etapa.estado);
                      const ultima = index === etapasRastreamento.length - 1;

                      return (
                        <div
                          key={`${etapa.titulo}-${index}`}
                          className="d-flex gap-3 position-relative"
                        >
                          {!ultima && (
                            <div
                              style={{
                                position: "absolute",
                                left: "24px",
                                top: "54px",
                                bottom: "-16px",
                                width: "2px",
                                background:
                                  etapa.estado === "done"
                                    ? "rgba(91,161,0,.45)"
                                    : "rgba(255,255,255,.10)",
                              }}
                            />
                          )}

                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "16px",
                              flexShrink: 0,
                              zIndex: 2,
                              ...visual,
                            }}
                          >
                            <i className={`bi ${etapa.icon}`} />
                          </div>

                          <div
                            className="flex-grow-1"
                            style={{
                              ...modalInfoBox,
                              opacity: etapa.estado === "pending" ? 0.72 : 1,
                            }}
                          >
                            <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                              <div>
                                <h5
                                  className="fw-bold mb-2"
                                  style={{
                                    color:
                                      etapa.estado === "pending"
                                        ? "rgba(255,255,255,.62)"
                                        : "white",
                                  }}
                                >
                                  {etapa.titulo}
                                </h5>

                                <p
                                  className="mb-0"
                                  style={{
                                    color: "rgba(255,255,255,.58)",
                                    lineHeight: 1.7,
                                  }}
                                >
                                  {etapa.descricao}
                                </p>
                              </div>

                              <span
                                className="badge"
                                style={{
                                  ...visual,
                                  borderRadius: "999px",
                                  padding: "8px 10px",
                                  fontWeight: 800,
                                }}
                              >
                                {etapa.data}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div
                    className="mt-4"
                    style={{
                      background: "rgba(255,179,0,.08)",
                      border: "1px solid rgba(255,179,0,.18)",
                      borderRadius: "18px",
                      padding: "16px",
                      color: "rgba(255,255,255,.70)",
                    }}
                  >
                    <i className="bi bi-info-circle-fill me-2 text-warning" />
                    Este rastreamento usa o status atual do pedido. Quando o
                    backend tiver transportadora/código de rastreio, essa área pode
                    ser conectada ao rastreio real.
                  </div>

                  <div className="d-flex justify-content-end mt-4">
                    <button
                      type="button"
                      className="btn btn-outline-light"
                      data-bs-dismiss="modal"
                      style={{
                        borderRadius: "14px",
                        padding: "12px 18px",
                        fontWeight: 700,
                      }}
                    >
                      Fechar rastreamento
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

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
              background: "rgba(17,17,17,.98)",
              borderRadius: "24px",
              border: "1px solid rgba(255,255,255,.08)",
              color: "white",
              overflow: "hidden",
            }}
          >
            <div
              className="modal-body p-4 text-center"
              style={{
                background: `
                  radial-gradient(circle at top left, rgba(255,136,0,.10), transparent 35%),
                  linear-gradient(145deg,#111,#181016)
                `,
              }}
            >
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
                  type="button"
                  className="btn btn-outline-light w-50"
                  data-bs-dismiss="modal"
                  disabled={excluindo}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="btn w-50 text-white"
                  style={{
                    background: "linear-gradient(to right, #c0012a, #ff4d4d)",
                    border: "none",
                    borderRadius: "12px",
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