"use client";

import { useEffect, useMemo, useState } from "react";
import { resolveImageUrl } from "@/utils/imageUrl";
import "../algo.css";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
const PRODUTOS_URL = `${API_URL}/api/produtos`;
const LIMITE = 10;

const categorias = [
  { value: "geral", label: "Geral" },
  { value: "automacao_industrial", label: "Automação Industrial" },
  { value: "eletrica_industrial", label: "Elétrica Industrial" },
  { value: "fixacao_industrial", label: "Fixação Industrial" },
  { value: "instrumentacao_e_medicao", label: "Instrumentação e Medição" },
  { value: "lubrificacao_e_manutencao", label: "Lubrificação e Manutenção" },
  { value: "maquinas_industriais", label: "Máquinas Industriais" },
  { value: "motores_e_acionamentos", label: "Motores e Acionamentos" },
  { value: "pecas_mecanicas", label: "Peças Mecânicas" },
  { value: "pneumatica_e_hidraulica", label: "Pneumática e Hidráulica" },
  { value: "seguranca_industrial_(epi)", label: "Segurança Industrial (EPI)" },
  { value: "solda_e_metalurgia", label: "Solda e Metalurgia" },
];

const formInicial = {
  nome_produto: "",
  descricao: "",
  preco: "",
  categoria: "geral",
  estoque: "",
  fornecedor: "",
  imagem: null,
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

function pegarToken() {
  if (typeof window === "undefined") return "";

  return (
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("usuarioToken") ||
    localStorage.getItem("jwt") ||
    ""
  );
}

function formatarPreco(valor) {
  const numero = Number(valor || 0);

  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarCategoria(categoria) {
  if (!categoria) return "Sem categoria";

  const encontrada = categorias.find((item) => item.value === categoria);

  if (encontrada) return encontrada.label;

  return String(categoria)
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letra) => letra.toUpperCase());
}

function getProdutoId(produto) {
  return produto?.id_produto || produto?.id;
}

function getMensagemErro(data) {
  if (data?.detalhes?.length) {
    return data.detalhes.map((erro) => erro.mensagem).join(" | ");
  }

  return data?.mensagem || data?.erro || "Ocorreu um erro inesperado.";
}

function getStatusProduto(produto) {
  const estoque = Number(produto?.estoque || 0);

  if (estoque <= 0) return "Esgotado";
  if (estoque <= 5) return "Baixo estoque";

  return "Disponível";
}

function getStatusStyle(status) {
  if (status === "Disponível") {
    return {
      background: "rgba(92,255,149,.10)",
      border: "1px solid rgba(92,255,149,.22)",
      color: "#5cff95",
    };
  }

  if (status === "Baixo estoque") {
    return {
      background: "rgba(255,207,64,.10)",
      border: "1px solid rgba(255,207,64,.22)",
      color: "#ffcf40",
    };
  }

  return {
    background: "rgba(255,117,143,.10)",
    border: "1px solid rgba(255,117,143,.22)",
    color: "#ff758f",
  };
}

function getImagemFallbackLetra(nome) {
  return String(nome || "P").trim().slice(0, 1).toUpperCase();
}

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [pagina, setPagina] = useState(1);

  const [paginacao, setPaginacao] = useState({
    pagina: 1,
    limite: LIMITE,
    total: 0,
    totalPaginas: 1,
  });

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erroLista, setErroLista] = useState(null);

  const [modoEdicao, setModoEdicao] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [formData, setFormData] = useState(formInicial);
  const [formErro, setFormErro] = useState(null);
  const [formSucesso, setFormSucesso] = useState(null);

  const [cardHoverAtivo, setCardHoverAtivo] = useState(null);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      carregarProdutos(1, pesquisa.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [pesquisa]);

  async function carregarProdutos(paginaAtual = 1, termo = pesquisa.trim()) {
    try {
      setCarregando(true);
      setErroLista(null);

      const url = termo
        ? `${PRODUTOS_URL}/nome/${encodeURIComponent(termo)}?pagina=${paginaAtual}&limite=${LIMITE}`
        : `${PRODUTOS_URL}?pagina=${paginaAtual}&limite=${LIMITE}`;

      const resposta = await fetch(url, {
        method: "GET",
        cache: "no-store",
      });

      const data = await resposta.json().catch(() => null);

      if (!resposta.ok || !data?.sucesso) {
        throw new Error(getMensagemErro(data));
      }

      setProdutos(Array.isArray(data.dados) ? data.dados : []);

      setPaginacao(
        data.paginacao || {
          pagina: paginaAtual,
          limite: LIMITE,
          total: 0,
          totalPaginas: 1,
        }
      );

      setPagina(data.paginacao?.pagina || paginaAtual);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      setProdutos([]);
      setErroLista(error.message || "Não foi possível carregar os produtos.");
    } finally {
      setCarregando(false);
    }
  }

  function abrirCadastro() {
    setModoEdicao(false);
    setProdutoSelecionado(null);
    setFormData(formInicial);
    setFormErro(null);
    setFormSucesso(null);
  }

  function abrirEdicao(produto) {
    setModoEdicao(true);
    setProdutoSelecionado(produto);
    setFormErro(null);
    setFormSucesso(null);

    setFormData({
      nome_produto: produto.nome_produto || "",
      descricao: produto.descricao || "",
      preco: produto.preco || "",
      categoria: produto.categoria || "geral",
      estoque: produto.estoque ?? "",
      fornecedor: produto.fornecedor || "",
      imagem: null,
    });
  }

  function alterarCampo(event) {
    const { name, value, files } = event.target;

    if (name === "imagem") {
      setFormData((atual) => ({
        ...atual,
        imagem: files?.[0] || null,
      }));
      return;
    }

    setFormData((atual) => ({
      ...atual,
      [name]: value,
    }));
  }

  async function fecharModal() {
    const bootstrap = await import("bootstrap/dist/js/bootstrap.bundle.min.js");
    const modalEl = document.getElementById("productModal");

    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal?.hide();
    }
  }

  async function salvarProduto(event) {
    event.preventDefault();

    try {
      setSalvando(true);
      setFormErro(null);
      setFormSucesso(null);

      const token = pegarToken();

      if (!token) {
        throw new Error("Você precisa estar logado para criar ou editar produtos.");
      }

      if (!formData.nome_produto.trim()) {
        throw new Error("O nome do produto é obrigatório.");
      }

      if (!formData.preco || Number(formData.preco) <= 0) {
        throw new Error("O preço deve ser maior que zero.");
      }

      if (formData.estoque === "" || Number(formData.estoque) < 0) {
        throw new Error("O estoque deve ser maior ou igual a zero.");
      }

      if (!formData.fornecedor.trim()) {
        throw new Error("O fornecedor é obrigatório.");
      }

      const body = new FormData();

      body.append("nome_produto", formData.nome_produto.trim());
      body.append("descricao", formData.descricao.trim());
      body.append("preco", formData.preco);
      body.append("categoria", formData.categoria);
      body.append("estoque", formData.estoque);
      body.append("fornecedor", formData.fornecedor.trim());

      if (formData.imagem) {
        body.append("imagem", formData.imagem);
      }

      const idProduto = getProdutoId(produtoSelecionado);

      const url = modoEdicao ? `${PRODUTOS_URL}/${idProduto}` : PRODUTOS_URL;

      const resposta = await fetch(url, {
        method: modoEdicao ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      const data = await resposta.json().catch(() => null);

      if (!resposta.ok || !data?.sucesso) {
        throw new Error(getMensagemErro(data));
      }

      setFormSucesso(
        modoEdicao ? "Produto atualizado com sucesso." : "Produto criado com sucesso."
      );

      await carregarProdutos(modoEdicao ? pagina : 1, pesquisa.trim());

      setTimeout(() => {
        fecharModal();
        setFormData(formInicial);
        setProdutoSelecionado(null);
        setModoEdicao(false);
      }, 500);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      setFormErro(error.message || "Não foi possível salvar o produto.");
    } finally {
      setSalvando(false);
    }
  }

  async function excluirProduto(produto) {
    const idProduto = getProdutoId(produto);

    if (!idProduto) {
      alert("ID do produto não encontrado.");
      return;
    }

    const confirmar = window.confirm(
      `Deseja excluir o produto "${produto.nome_produto}"?`
    );

    if (!confirmar) return;

    try {
      const token = pegarToken();

      if (!token) {
        throw new Error("Você precisa estar logado para excluir produtos.");
      }

      const resposta = await fetch(`${PRODUTOS_URL}/${idProduto}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await resposta.json().catch(() => null);

      if (!resposta.ok || !data?.sucesso) {
        throw new Error(getMensagemErro(data));
      }

      await carregarProdutos(pagina, pesquisa.trim());
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      alert(error.message || "Não foi possível excluir o produto.");
    }
  }

  const metricas = useMemo(() => {
    const disponiveis = produtos.filter(
      (produto) => getStatusProduto(produto) === "Disponível"
    ).length;

    const baixoEstoque = produtos.filter(
      (produto) => getStatusProduto(produto) === "Baixo estoque"
    ).length;

    const esgotados = produtos.filter(
      (produto) => getStatusProduto(produto) === "Esgotado"
    ).length;

    const valorEmEstoque = produtos.reduce((acc, produto) => {
      return acc + Number(produto.preco || 0) * Number(produto.estoque || 0);
    }, 0);

    return {
      totalSistema: paginacao.total || produtos.length,
      totalPagina: produtos.length,
      disponiveis,
      baixoEstoque,
      esgotados,
      valorEmEstoque,
    };
  }, [produtos, paginacao.total]);

  const metricasCards = [
    {
      titulo: "Total no sistema",
      valor: Number(metricas.totalSistema || 0).toLocaleString("pt-BR"),
      detalhe: "Produtos cadastrados",
      icon: "bi-box-seam-fill",
      cor: "#ffcf40",
    },
    {
      titulo: "Disponíveis",
      valor: Number(metricas.disponiveis || 0).toLocaleString("pt-BR"),
      detalhe: "Produtos com estoque saudável nesta página",
      icon: "bi-check-circle-fill",
      cor: "#5cff95",
    },
    {
      titulo: "Baixo estoque",
      valor: Number(metricas.baixoEstoque || 0).toLocaleString("pt-BR"),
      detalhe: "Produtos com 1 a 5 unidades",
      icon: "bi-exclamation-circle-fill",
      cor: "#ff8800",
    },
    {
      titulo: "Valor em estoque",
      valor: formatarPreco(metricas.valorEmEstoque),
      detalhe: "Soma aproximada desta página",
      icon: "bi-currency-dollar",
      cor: "#8ab4ff",
    },
  ];

  const totalPaginas = Math.max(1, Number(paginacao.totalPaginas || 1));

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
            Produtos
          </h1>

          <p
            className="mb-0"
            style={{
              color: "rgba(255,255,255,.58)",
              fontSize: ".95rem",
            }}
          >
            Gerenciamento de produtos, estoque, fornecedores e categorias da plataforma.
          </p>
        </div>

        <button
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          data-bs-toggle="modal"
          data-bs-target="#productModal"
          onClick={abrirCadastro}
          style={buttonGradient}
        >
          <i className="bi bi-plus-lg"></i>
          Novo Produto
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
                        fontSize: card.titulo === "Valor em estoque" ? "1.45rem" : "1.8rem",
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

      <section className="p-3 p-lg-4" style={cardStyle}>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <h4
              className="fw-bold mb-1"
              style={{
                color: "#ffffff",
                letterSpacing: "-0.5px",
              }}
            >
              Lista de Produtos
            </h4>

            <p
              className="mb-0"
              style={{
                color: "rgba(255,255,255,.55)",
                fontSize: ".9rem",
              }}
            >
              {paginacao.total || 0} produto(s) cadastrado(s)
            </p>
          </div>

          <div
            className="d-flex align-items-center px-3"
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: "16px",
              minWidth: "280px",
              height: "48px",
            }}
          >
            <i className="bi bi-search" style={{ color: "#ffcf40" }} />

            <input
              type="text"
              value={pesquisa}
              onChange={(event) => setPesquisa(event.target.value)}
              placeholder="Pesquisar produto..."
              className="form-control border-0 shadow-none"
              style={{
                background: "transparent",
                color: "#ffffff",
                fontSize: ".92rem",
              }}
            />
          </div>
        </div>

        {erroLista && (
          <div
            className="alert border-0 mb-4"
            style={{
              background: "rgba(245,6,29,0.10)",
              color: "#fca5a5",
              borderRadius: "16px",
            }}
          >
            {erroLista}
          </div>
        )}

        <div className="table-responsive" style={dashboardTableWrapperStyle}>
          <table
            className="table table-hover align-middle"
            style={dashboardTableStyle}
          >
            <thead>
              <tr>
                <th style={dashboardTableHeadCellStyle}>Produto</th>
                <th style={dashboardTableHeadCellStyle}>Categoria</th>
                <th style={dashboardTableHeadCellStyle}>Preço</th>
                <th style={dashboardTableHeadCellStyle}>Estoque</th>
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
                    colSpan="6"
                    className="text-center"
                    style={{
                      ...dashboardTableCellStyle,
                      padding: "34px 18px",
                      color: "rgba(255,255,255,.65)",
                    }}
                  >
                    <span className="spinner-border spinner-border-sm text-warning me-2" />
                    Carregando produtos...
                  </td>
                </tr>
              ) : produtos.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center"
                    style={{
                      ...dashboardTableCellStyle,
                      padding: "42px 18px",
                    }}
                  >
                    <i
                      className="bi bi-box-seam d-block mb-3"
                      style={{
                        color: "#ffcf40",
                        fontSize: "2.4rem",
                      }}
                    />

                    <h5 className="fw-bold mb-1">Nenhum produto encontrado</h5>

                    <p
                      className="mb-0"
                      style={{
                        color: "rgba(255,255,255,.52)",
                      }}
                    >
                      Tente pesquisar outro nome ou cadastre um novo produto.
                    </p>
                  </td>
                </tr>
              ) : (
                produtos.map((produto) => {
                  const status = getStatusProduto(produto);
                  const imagemUrl = produto.imagem ? resolveImageUrl(produto.imagem, "") : "";

                  return (
                    <tr key={getProdutoId(produto)}>
                      <td style={dashboardTableCellStyle}>
                        <div className="d-flex align-items-center">
                          <div
                            className="d-flex justify-content-center align-items-center fw-bold overflow-hidden"
                            style={{
                              width: "52px",
                              height: "52px",
                              borderRadius: "16px",
                              background: "rgba(255,179,0,.12)",
                              border: "1px solid rgba(255,179,0,.20)",
                              color: "#ffcf40",
                              fontSize: "1rem",
                              flexShrink: 0,
                            }}
                          >
                            {imagemUrl ? (
                              <img
                                src={imagemUrl}
                                alt={produto.nome_produto}
                                onError={(event) => {
                                  event.currentTarget.style.display = "none";
                                }}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              getImagemFallbackLetra(produto.nome_produto)
                            )}
                          </div>

                          <div className="ms-3" style={{ minWidth: 0 }}>
                            <div
                              className="fw-bold text-truncate"
                              style={{
                                color: "#ffffff",
                                fontSize: ".95rem",
                                maxWidth: "260px",
                              }}
                              title={produto.nome_produto}
                            >
                              {produto.nome_produto || "Produto sem nome"}
                            </div>

                            <div
                              style={{
                                color: "rgba(255,255,255,.50)",
                                fontSize: ".82rem",
                              }}
                            >
                              ID: {getProdutoId(produto)}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td style={dashboardTableCellStyle}>
                        <span style={{ color: "rgba(255,255,255,.82)" }}>
                          {formatarCategoria(produto.categoria)}
                        </span>
                      </td>

                      <td style={dashboardTableCellStyle}>
                        <span
                          className="fw-bold"
                          style={{
                            color: "#5cff95",
                            fontSize: ".92rem",
                          }}
                        >
                          {formatarPreco(produto.preco)}
                        </span>
                      </td>

                      <td style={dashboardTableCellStyle}>
                        <span style={{ color: "rgba(255,255,255,.72)" }}>
                          {Number(produto.estoque || 0).toLocaleString("pt-BR")} unidades
                        </span>
                      </td>

                      <td style={dashboardTableCellStyle}>
                        <span
                          className="px-3 py-2 d-inline-flex align-items-center"
                          style={{
                            borderRadius: "999px",
                            fontSize: ".78rem",
                            fontWeight: "800",
                            ...getStatusStyle(status),
                          }}
                        >
                          {status}
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
                            data-bs-target="#productModal"
                            onClick={() => abrirEdicao(produto)}
                            title="Editar produto"
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
                            <i className="bi bi-pencil-square"></i>
                          </button>

                          <button
                            type="button"
                            onClick={() => excluirProduto(produto)}
                            className="btn d-flex align-items-center justify-content-center"
                            title="Excluir produto"
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
                            <i className="bi bi-trash3"></i>
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
                onClick={() => carregarProdutos(pagina - 1, pesquisa.trim())}
                style={{
                  ...paginationBtnStyle,
                  opacity: pagina <= 1 ? 0.45 : 1,
                  cursor: pagina <= 1 ? "not-allowed" : "pointer",
                }}
              >
                <i className="bi bi-chevron-left me-1" />
                Anterior
              </button>

              {[...Array(totalPaginas)].slice(0, 5).map((_, index) => {
                const numeroPagina = index + 1;
                const ativo = pagina === numeroPagina;

                return (
                  <button
                    key={numeroPagina}
                    type="button"
                    className="btn px-3"
                    onClick={() => carregarProdutos(numeroPagina, pesquisa.trim())}
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
                onClick={() => carregarProdutos(pagina + 1, pesquisa.trim())}
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

      <div
        className="modal fade"
        id="productModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
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
                  <i
                    className={modoEdicao ? "bi bi-pencil-square" : "bi bi-box-seam-fill"}
                    style={{ fontSize: "1.45rem" }}
                  />
                </div>

                <div>
                  <h2
                    className="fw-bold mb-1"
                    style={{
                      color: "#ffe082",
                      letterSpacing: "-1px",
                    }}
                  >
                    {modoEdicao ? "Editar Produto" : "Novo Produto"}
                  </h2>

                  <p
                    className="mb-0"
                    style={{
                      color: "rgba(255,255,255,.58)",
                    }}
                  >
                    {modoEdicao
                      ? "Atualize os dados do produto selecionado."
                      : "Cadastre um produto no catálogo da plataforma."}
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

            <form onSubmit={salvarProduto}>
              <div className="modal-body" style={{ padding: "28px 32px 10px" }}>
                {formErro && (
                  <div
                    className="alert border-0 mb-4"
                    style={{
                      background: "rgba(245,6,29,0.14)",
                      color: "#fecaca",
                      borderRadius: "16px",
                    }}
                  >
                    {formErro}
                  </div>
                )}

                {formSucesso && (
                  <div
                    className="alert border-0 mb-4"
                    style={{
                      background: "rgba(34,197,94,0.14)",
                      color: "#bbf7d0",
                      borderRadius: "16px",
                    }}
                  >
                    {formSucesso}
                  </div>
                )}

                <div className="row g-3">
                  <div className="col-12 col-lg-6">
                    <label className="form-label mb-2" style={labelStyle}>
                      Nome do produto
                    </label>

                    <input
                      type="text"
                      name="nome_produto"
                      value={formData.nome_produto}
                      onChange={alterarCampo}
                      className="form-control shadow-none"
                      placeholder="Ex: Motor Industrial"
                      required
                      style={modalInputStyle}
                    />
                  </div>

                  <div className="col-12 col-lg-6">
                    <label className="form-label mb-2" style={labelStyle}>
                      Preço
                    </label>

                    <input
                      type="number"
                      name="preco"
                      value={formData.preco}
                      onChange={alterarCampo}
                      className="form-control shadow-none"
                      placeholder="Ex: 89.90"
                      step="0.01"
                      min="0"
                      required
                      style={modalInputStyle}
                    />
                  </div>

                  <div className="col-12 col-lg-6">
                    <label className="form-label mb-2" style={labelStyle}>
                      Estoque
                    </label>

                    <input
                      type="number"
                      name="estoque"
                      value={formData.estoque}
                      onChange={alterarCampo}
                      className="form-control shadow-none"
                      placeholder="Quantidade disponível"
                      min="0"
                      required
                      style={modalInputStyle}
                    />
                  </div>

                  <div className="col-12 col-lg-6">
                    <label className="form-label mb-2" style={labelStyle}>
                      Fornecedor
                    </label>

                    <input
                      type="text"
                      name="fornecedor"
                      value={formData.fornecedor}
                      onChange={alterarCampo}
                      className="form-control shadow-none"
                      placeholder="Nome do fornecedor"
                      required
                      style={modalInputStyle}
                    />
                  </div>

                  <div className="col-12 col-lg-6">
                    <label className="form-label mb-2" style={labelStyle}>
                      Categoria
                    </label>

                    <select
                      name="categoria"
                      value={formData.categoria}
                      onChange={alterarCampo}
                      className="form-select shadow-none"
                      required
                      style={{
                        ...modalInputStyle,
                        cursor: "pointer",
                      }}
                    >
                      {categorias.map((categoria) => (
                        <option
                          key={categoria.value}
                          value={categoria.value}
                          style={{ background: "#151518", color: "#fff" }}
                        >
                          {categoria.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-lg-6">
                    <label className="form-label mb-2" style={labelStyle}>
                      Imagem do produto
                    </label>

                    <input
                      type="file"
                      name="imagem"
                      onChange={alterarCampo}
                      className="form-control shadow-none"
                      accept="image/*"
                      style={modalInputStyle}
                    />

                    {modoEdicao && (
                      <small
                        className="d-block mt-2"
                        style={{ color: "rgba(255,255,255,.58)" }}
                      >
                        Envie uma nova imagem apenas se quiser substituir a atual.
                      </small>
                    )}
                  </div>

                  <div className="col-12">
                    <label className="form-label mb-2" style={labelStyle}>
                      Descrição
                    </label>

                    <textarea
                      name="descricao"
                      value={formData.descricao}
                      onChange={alterarCampo}
                      className="form-control shadow-none"
                      placeholder="Descreva os detalhes do produto..."
                      rows={4}
                      style={{
                        ...modalInputStyle,
                        height: "auto",
                        resize: "none",
                        paddingTop: "14px",
                      }}
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
                  disabled={salvando}
                  className="btn"
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
                  ) : modoEdicao ? (
                    "Salvar alterações"
                  ) : (
                    "Criar produto"
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
