"use client";

import { useEffect, useState } from "react";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
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

function pegarToken() {
  if (typeof window === "undefined") return "";

  return (
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("usuarioToken") ||
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

function getImagemUrl(imagem) {
  if (!imagem) return null;

  if (String(imagem).startsWith("http")) return imagem;

  if (String(imagem).startsWith("/uploads")) {
    return `${API_URL}${imagem}`;
  }

  return `${API_URL}/uploads/imagens/${imagem}`;
}

function getMensagemErro(data) {
  if (data?.detalhes?.length) {
    return data.detalhes.map((erro) => erro.mensagem).join(" | ");
  }

  return data?.mensagem || data?.erro || "Ocorreu um erro inesperado.";
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

      const rota = termo
        ? `/api/produtos/nome/${encodeURIComponent(termo)}`
        : "/api/produtos";

      const resposta = await fetch(
        `${API_URL}${rota}?pagina=${paginaAtual}&limite=${LIMITE}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await resposta.json();

      if (!resposta.ok || !data.sucesso) {
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
      setProdutos([]);
      setErroLista(error.message || "Não foi possível carregar os produtos.");
    } finally {
      setCarregando(false);
    }
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
        background: "rgba(34,197,94,0.10)",
        border: "1px solid rgba(34,197,94,0.15)",
        color: "#22c55e",
      };
    }

    if (status === "Baixo estoque") {
      return {
        background: "rgba(255,179,0,0.10)",
        border: "1px solid rgba(255,179,0,0.18)",
        color: "#ffb300",
      };
    }

    return {
      background: "rgba(245,6,29,0.10)",
      border: "1px solid rgba(245,6,29,0.15)",
      color: "#f5061d",
    };
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

      const body = new FormData();

      body.append("nome_produto", formData.nome_produto);
      body.append("descricao", formData.descricao);
      body.append("preco", formData.preco);
      body.append("categoria", formData.categoria);
      body.append("estoque", formData.estoque);
      body.append("fornecedor", formData.fornecedor);

      if (formData.imagem) {
        body.append("imagem", formData.imagem);
      }

      const idProduto = getProdutoId(produtoSelecionado);

      const url = modoEdicao
        ? `${API_URL}/produtos/${idProduto}`
        : `${API_URL}/produtos`;

      const resposta = await fetch(url, {
        method: modoEdicao ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      const data = await resposta.json();

      if (!resposta.ok || !data.sucesso) {
        throw new Error(getMensagemErro(data));
      }

      setFormSucesso(
        modoEdicao
          ? "Produto atualizado com sucesso."
          : "Produto criado com sucesso."
      );

      await carregarProdutos(modoEdicao ? pagina : 1, pesquisa.trim());

      setTimeout(() => {
        fecharModal();
        setFormData(formInicial);
        setProdutoSelecionado(null);
        setModoEdicao(false);
      }, 500);
    } catch (error) {
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

      const resposta = await fetch(`${API_URL}/produtos/${idProduto}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await resposta.json();

      if (!resposta.ok || !data.sucesso) {
        throw new Error(getMensagemErro(data));
      }

      await carregarProdutos(pagina, pesquisa.trim());
    } catch (error) {
      alert(error.message || "Não foi possível excluir o produto.");
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
            Produtos
          </h1>

          <p
            className="mb-0"
            style={{
              color: "#71717a",
              fontSize: ".95rem",
            }}
          >
            Gerenciamento de produtos da plataforma
          </p>
        </div>

        <button
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          data-bs-toggle="modal"
          data-bs-target="#productModal"
          onClick={abrirCadastro}
          style={{
            background: "#c0012a",
            border: "1px solid rgba(255,255,255,0.06)",
            color: "#ffffff",
            borderRadius: "14px",
            fontWeight: "600",
          }}
        >
          <i className="bi bi-plus-lg"></i>
          Novo Produto
        </button>
      </div>

      <div
        className="p-3 p-lg-4"
        style={{
          background: "#111113",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "28px",
        }}
      >
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
                color: "#71717a",
                fontSize: ".9rem",
              }}
            >
              {paginacao.total || 0} produto(s) cadastrado(s)
            </p>
          </div>

          <div
            className="d-flex align-items-center px-3"
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

        {carregando ? (
          <div className="text-center py-5" style={{ color: "#ffb300" }}>
            <div className="spinner-border mb-3" role="status"></div>
            <p className="mb-0">Carregando produtos...</p>
          </div>
        ) : produtos.length === 0 ? (
          <div className="text-center py-5" style={{ color: "#71717a" }}>
            <i className="bi bi-box-seam" style={{ fontSize: "2.5rem" }}></i>
            <p className="mt-3 mb-0">Nenhum produto encontrado.</p>
          </div>
        ) : (
          <>
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
                    <th className="py-3" style={thStyle}>
                      Produto
                    </th>
                    <th className="py-3" style={thStyle}>
                      Categoria
                    </th>
                    <th className="py-3" style={thStyle}>
                      Preço
                    </th>
                    <th className="py-3" style={thStyle}>
                      Estoque
                    </th>
                    <th className="py-3" style={thStyle}>
                      Status
                    </th>
                    <th className="py-3 text-end" style={thStyle}>
                      Ações
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {produtos.map((produto) => {
                    const status = getStatusProduto(produto);
                    const imagemUrl = getImagemUrl(produto.imagem);

                    return (
                      <tr
                        key={getProdutoId(produto)}
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        <td className="py-3" style={tdStyle}>
                          <div className="d-flex align-items-center">
                            <div
                              className="d-flex justify-content-center align-items-center fw-bold overflow-hidden"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "14px",
                                background: "rgba(255,136,0,0.12)",
                                border: "1px solid rgba(255,179,0,0.12)",
                                color: "#ffb300",
                                fontSize: "1.1rem",
                              }}
                            >
                              {imagemUrl ? (
                                <img
                                  src={imagemUrl}
                                  alt={produto.nome_produto}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              ) : (
                                <i className="bi bi-box-seam"></i>
                              )}
                            </div>

                            <div className="ms-3">
                              <div
                                className="fw-semibold"
                                style={{
                                  color: "#ffffff",
                                  fontSize: ".95rem",
                                }}
                              >
                                {produto.nome_produto}
                              </div>

                              <div
                                style={{
                                  color: "#71717a",
                                  fontSize: ".8rem",
                                }}
                              >
                                ID: {getProdutoId(produto)}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td style={tdStyle}>
                          <span
                            style={{
                              color: "#d4d4d8",
                              fontSize: ".9rem",
                            }}
                          >
                            {formatarCategoria(produto.categoria)}
                          </span>
                        </td>

                        <td style={tdStyle}>
                          <span
                            className="fw-semibold"
                            style={{
                              color: "#ffb300",
                              fontSize: ".9rem",
                            }}
                          >
                            {formatarPreco(produto.preco)}
                          </span>
                        </td>

                        <td style={tdStyle}>
                          <span
                            style={{
                              color: "#d4d4d8",
                              fontSize: ".9rem",
                            }}
                          >
                            {produto.estoque} unidades
                          </span>
                        </td>

                        <td style={tdStyle}>
                          <span
                            className="px-3 py-2 d-inline-flex align-items-center"
                            style={{
                              borderRadius: "12px",
                              fontSize: ".8rem",
                              fontWeight: "600",
                              ...getStatusStyle(status),
                            }}
                          >
                            {status}
                          </span>
                        </td>

                        <td className="text-end" style={tdStyle}>
                          <div className="d-flex justify-content-end gap-2">
                            <button
                              type="button"
                              className="btn d-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#productModal"
                              onClick={() => abrirEdicao(produto)}
                              style={{
                                width: "42px",
                                height: "42px",
                                borderRadius: "12px",
                                background: "#151518",
                                border: "1px solid rgba(255,255,255,0.06)",
                                color: "#ffb300",
                              }}
                            >
                              <i className="bi bi-pencil-square"></i>
                            </button>

                            <button
                              type="button"
                              onClick={() => excluirProduto(produto)}
                              className="btn d-flex align-items-center justify-content-center"
                              style={{
                                width: "42px",
                                height: "42px",
                                borderRadius: "12px",
                                background: "rgba(245,6,29,0.10)",
                                border: "1px solid rgba(245,6,29,0.15)",
                                color: "#f5061d",
                              }}
                            >
                              <i className="bi bi-trash3"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4">
              <span style={{ color: "#71717a", fontSize: ".9rem" }}>
                Página {paginacao.pagina || pagina} de{" "}
                {paginacao.totalPaginas || 1}
              </span>

              <div className="d-flex gap-2">
                <button
                  className="btn px-3"
                  disabled={pagina <= 1 || carregando}
                  onClick={() => carregarProdutos(pagina - 1, pesquisa.trim())}
                  style={paginationBtnStyle}
                >
                  Anterior
                </button>

                <button
                  className="btn px-3"
                  disabled={
                    pagina >= (paginacao.totalPaginas || 1) || carregando
                  }
                  onClick={() => carregarProdutos(pagina + 1, pesquisa.trim())}
                  style={paginationBtnStyle}
                >
                  Próxima
                </button>
              </div>
            </div>
          </>
        )}
      </div>

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
              background: `
                linear-gradient(
                  135deg,
                  #940533 0%,
                  #7d042b 35%,
                  #5f0321 70%,
                  #3b0215 100%
                )
              `,
              borderRadius: "28px",
            }}
          >
            <div className="modal-header border-0 pt-4 px-4">
              <div className="w-100 text-center">
                <div
                  className="d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "78px",
                    height: "78px",
                    borderRadius: "22px",
                    background: "rgba(255,179,0,0.08)",
                    border: "1px solid rgba(255,179,0,0.12)",
                  }}
                >
                  <i
                    className="bi bi-box-seam-fill"
                    style={{
                      color: "#ffb300",
                      fontSize: "2rem",
                    }}
                  />
                </div>

                <h2
                  className="fw-bold mb-0"
                  style={{
                    color: "#ffb300",
                    letterSpacing: "-1px",
                  }}
                >
                  {modoEdicao ? "Editar Produto" : "Cadastro de Produto"}
                </h2>
              </div>

              <button
                type="button"
                className="btn-close btn-close-white position-absolute top-0 end-0 m-4"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <form onSubmit={salvarProduto}>
              <div className="modal-body p-4 p-lg-5">
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

                <div className="row g-4">
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
                      style={inputStyle}
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
                      style={inputStyle}
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
                      style={inputStyle}
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
                      style={inputStyle}
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
                      style={inputStyle}
                    >
                      {categorias.map((categoria) => (
                        <option key={categoria.value} value={categoria.value}>
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
                      style={inputStyle}
                    />

                    {modoEdicao && (
                      <small
                        className="d-block mt-2"
                        style={{ color: "#f3f4f6", opacity: 0.75 }}
                      >
                        Envie uma nova imagem apenas se quiser substituir a
                        atual.
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
                        ...inputStyle,
                        height: "auto",
                        resize: "none",
                        paddingTop: "14px",
                      }}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <button
                    type="submit"
                    disabled={salvando}
                    className="btn w-100 py-3 fw-semibold"
                    style={{
                      background: salvando
                        ? "rgba(255,179,0,0.45)"
                        : "linear-gradient(90deg,#ff8800,#ffb300)",
                      border: "none",
                      color: "#3b0215",
                      borderRadius: "16px",
                      fontSize: "1rem",
                    }}
                  >
                    {salvando
                      ? "Salvando..."
                      : modoEdicao
                      ? "Salvar alterações"
                      : "Criar produto"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const thStyle = {
  color: "#71717a",
  fontWeight: "500",
  border: "none",
  background: "transparent",
};

const tdStyle = {
  background: "transparent",
  border: "none",
};

const labelStyle = {
  color: "#f3f4f6",
  fontSize: ".92rem",
};

const inputStyle = {
  backgroundColor: "rgba(0,0,0,0.18)",
  border: "1px solid rgba(245,6,29,0.35)",
  color: "#ffffff",
  minHeight: "56px",
  borderRadius: "16px",
};

const paginationBtnStyle = {
  background: "#151518",
  border: "1px solid rgba(255,255,255,0.06)",
  color: "#ffb300",
  borderRadius: "12px",
};