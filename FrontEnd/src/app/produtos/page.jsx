"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./produtos.css";
import CardProduto from "@/components/CardProduto";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
const PRODUTOS_URL = `${API_URL}/api/produtos`;

const produtosPorPagina = 12;

const categorias = [
  { value: "todas", label: "Todas" },
  { value: "automacao_industrial", label: "Automação Industrial" },
  { value: "eletrica_industrial", label: "Elétrica Industrial" },
  { value: "ferramentas_industriais", label: "Ferramentas Industriais" },
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

function normalizarCategoria(categoria) {
  return String(categoria || "")
    .toLowerCase()
    .trim()
    .replaceAll(" ", "_");
}

function getMensagemErro(data) {
  if (Array.isArray(data?.detalhes)) {
    return data.detalhes.map((item) => item.mensagem).join(" | ");
  }

  return data?.mensagem || data?.erro || "Não foi possível carregar os produtos.";
}

export default function Produtos() {
  const router = useRouter();

  const [produtos, setProdutos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("todas");
  const [precoMaximo, setPrecoMaximo] = useState(0);
  const [somenteEstoque, setSomenteEstoque] = useState(false);

  const [validandoAcesso, setValidandoAcesso] = useState(true);
  const [acessoPermitido, setAcessoPermitido] = useState(false);
  const [carregandoProdutos, setCarregandoProdutos] = useState(true);

  const [erro, setErro] = useState("");

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    try {
      const usuarioStorage = localStorage.getItem("usuario");

      if (!usuarioStorage) {
        setAcessoPermitido(true);
        return;
      }

      const usuarioParseado = JSON.parse(usuarioStorage);

      if (!usuarioParseado) {
        localStorage.removeItem("usuario");
        setAcessoPermitido(true);
        return;
      }

      const tipoUsuario = String(usuarioParseado?.tipo || "")
        .trim()
        .toLowerCase();

      if (tipoUsuario !== "comum") {
        router.replace("/");
        return;
      }

      setAcessoPermitido(true);
    } catch (error) {
      console.error("Erro ao validar acesso do usuário:", error);

      localStorage.removeItem("usuario");
      setAcessoPermitido(true);
    } finally {
      setValidandoAcesso(false);
    }
  }, [router]);

  useEffect(() => {
    if (!acessoPermitido) return;

    async function carregarProdutos() {
      try {
        setCarregandoProdutos(true);
        setErro("");

        const response = await fetch(PRODUTOS_URL, {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json().catch(() => null);

        if (!response.ok || !data?.sucesso) {
          throw new Error(getMensagemErro(data));
        }

        const lista = Array.isArray(data?.dados) ? data.dados : [];

        setProdutos(lista);

        const maiorPreco = lista.reduce((maior, produto) => {
          const preco = Number(produto?.preco || 0);
          return preco > maior ? preco : maior;
        }, 0);

        setPrecoMaximo(Math.ceil(maiorPreco));
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        setErro(error.message || "Não foi possível carregar os produtos.");
        setProdutos([]);
      } finally {
        setCarregandoProdutos(false);
      }
    }

    carregarProdutos();
  }, [acessoPermitido]);

  const maiorPrecoDisponivel = useMemo(() => {
    return produtos.reduce((maior, produto) => {
      const preco = Number(produto?.preco || 0);
      return preco > maior ? preco : maior;
    }, 0);
  }, [produtos]);

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((produto) => {
      const nomeProduto = String(
        produto?.nome_produto ||
          produto?.nome ||
          ""
      ).toLowerCase();

      const termoBusca = busca.trim().toLowerCase();

      const categoriaProduto = normalizarCategoria(produto?.categoria);
      const categoriaFiltro = normalizarCategoria(categoriaSelecionada);

      const precoProduto = Number(produto?.preco || 0);
      const estoqueProduto = Number(produto?.estoque || 0);

      const buscaMatch = !termoBusca || nomeProduto.includes(termoBusca);

      const categoriaMatch =
        categoriaFiltro === "todas" || categoriaProduto === categoriaFiltro;

      const precoMatch =
        !precoMaximo || precoMaximo <= 0 || precoProduto <= Number(precoMaximo);

      const estoqueMatch = !somenteEstoque || estoqueProduto > 0;

      return buscaMatch && categoriaMatch && precoMatch && estoqueMatch;
    });
  }, [produtos, busca, categoriaSelecionada, precoMaximo, somenteEstoque]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(produtosFiltrados.length / produtosPorPagina)
  );

  const produtosAtuais = useMemo(() => {
    const ultimoProduto = paginaAtual * produtosPorPagina;
    const primeiroProduto = ultimoProduto - produtosPorPagina;

    return produtosFiltrados.slice(primeiroProduto, ultimoProduto);
  }, [produtosFiltrados, paginaAtual]);

  useEffect(() => {
    setPaginaAtual(1);
  }, [busca, categoriaSelecionada, precoMaximo, somenteEstoque]);

  function limparFiltros() {
    setBusca("");
    setCategoriaSelecionada("todas");
    setPrecoMaximo(Math.ceil(maiorPrecoDisponivel));
    setSomenteEstoque(false);
    setPaginaAtual(1);
  }

  if (validandoAcesso || !acessoPermitido) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center px-4"
        style={{
          minHeight: "100vh",
          background: "#09090b",
          color: "#ffb300",
        }}
      >
        <div className="spinner-border text-warning mb-3" role="status" />

        <h3 className="fw-bold">
          {validandoAcesso ? "Validando acesso..." : "Acesso negado"}
        </h3>

        <p
          className="mb-0"
          style={{
            color: "rgba(255,255,255,.65)",
          }}
        >
          {validandoAcesso
            ? "Estamos verificando seu tipo de usuário."
            : "Apenas usuários comuns ou visitantes podem acessar esta página."}
        </p>
      </div>
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
            Catálogo Industrial
          </span>

          <h1 className="display-4 fw-bold">
            Nossos Produtos
          </h1>

          <p className="lead mt-3 col-lg-8 mb-0">
            Encontre peças industriais, componentes técnicos e soluções
            específicas para sua empresa com rapidez e segurança.
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
                  ...panelStyle,
                }}
              >
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "16px",
                      background: "rgba(255,136,0,.14)",
                      color: "#ffb300",
                    }}
                  >
                    <i className="bi bi-funnel-fill" />
                  </div>

                  <div>
                    <h3 className="text-white fw-bold mb-0">
                      Filtrar
                    </h3>

                    <small style={{ color: "rgba(255,255,255,.55)" }}>
                      Refine sua busca
                    </small>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label text-white">
                    Buscar Produto
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Digite o nome..."
                    value={busca}
                    onChange={(event) => setBusca(event.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-white">
                    Categoria
                  </label>

                  <select
                    className="form-select"
                    value={categoriaSelecionada}
                    onChange={(event) => setCategoriaSelecionada(event.target.value)}
                    style={inputStyle}
                  >
                    {categorias.map((categoria) => (
                      <option
                        key={categoria.value}
                        value={categoria.value}
                        style={{ color: "#111" }}
                      >
                        {categoria.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label text-white d-flex justify-content-between">
                    <span>Faixa de preço</span>

                    <span style={{ color: "#ffb300", fontWeight: "700" }}>
                      até{" "}
                      {Number(precoMaximo || 0).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </label>

                  <input
                    type="range"
                    className="form-range"
                    min="0"
                    max={Math.ceil(maiorPrecoDisponivel || 0)}
                    value={precoMaximo || 0}
                    onChange={(event) => setPrecoMaximo(Number(event.target.value))}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-white">
                    Disponibilidade
                  </label>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="estoque"
                      checked={somenteEstoque}
                      onChange={(event) => setSomenteEstoque(event.target.checked)}
                    />

                    <label
                      className="form-check-label text-white"
                      htmlFor="estoque"
                    >
                      Em estoque
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn w-100 text-white fw-semibold"
                  onClick={limparFiltros}
                  style={{
                    ...buttonGradient,
                    padding: "12px",
                  }}
                >
                  Limpar filtros
                </button>

                <div
                  className="mt-4 p-3 rounded-4"
                  style={{
                    background: "rgba(255,255,255,.035)",
                    border: "1px solid rgba(255,255,255,.06)",
                  }}
                >
                  <span
                    style={{
                      color: "rgba(255,255,255,.58)",
                      fontSize: ".82rem",
                      textTransform: "uppercase",
                      letterSpacing: ".5px",
                    }}
                  >
                    Produtos encontrados
                  </span>

                  <h3 className="fw-bold mt-2 mb-0">
                    {String(produtosFiltrados.length).padStart(2, "0")}
                  </h3>
                </div>
              </aside>
            </div>

            <div className="col-lg-9">
              {carregandoProdutos && (
                <div
                  className="text-center py-5 rounded-4"
                  style={{
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.06)",
                  }}
                >
                  <div className="spinner-border text-warning mb-3" />

                  <h4 className="fw-bold">
                    Carregando produtos...
                  </h4>

                  <p
                    className="mb-0"
                    style={{
                      color: "rgba(255,255,255,.58)",
                    }}
                  >
                    Buscando catálogo atualizado.
                  </p>
                </div>
              )}

              {erro && (
                <div className="alert alert-danger rounded-4">
                  {erro}
                </div>
              )}

              {!carregandoProdutos && !erro && produtosFiltrados.length === 0 && (
                <div
                  className="text-center py-5 rounded-4"
                  style={{
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.06)",
                    color: "rgba(255,255,255,.62)",
                  }}
                >
                  <i
                    className="bi bi-box-seam"
                    style={{
                      fontSize: "4rem",
                      color: "#ffb300",
                    }}
                  />

                  <h3 className="fw-bold mt-3 text-white">
                    Nenhum produto encontrado
                  </h3>

                  <p className="mb-0">
                    Tente limpar os filtros ou buscar outro termo.
                  </p>
                </div>
              )}

              <div className="row g-4">
                {!carregandoProdutos &&
                  !erro &&
                  produtosAtuais.map((produto) => (
                    <CardProduto
                      key={produto.id_produto || produto.id}
                      produto={produto}
                    />
                  ))}
              </div>

              {!carregandoProdutos && !erro && produtosFiltrados.length > 0 && (
                <nav className="mt-5">
                  <ul className="pagination justify-content-center flex-wrap gap-2">
                    <li className={`page-item ${paginaAtual === 1 ? "disabled" : ""}`}>
                      <button
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
          </div>
        </div>
      </section>
    </main>
  );
}