"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./produtos.css";
import CardProduto from "@/components/CardProduto";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
const PRODUTOS_URL = `${API_URL}/api/produtos`;

const PRODUTOS_POR_PAGINA = 12;

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

function normalizarRespostaProdutos(data, paginaSolicitada) {
  const fonte = data?.dados ?? data ?? {};

  let lista = [];

  if (Array.isArray(fonte)) {
    lista = fonte;
  } else if (Array.isArray(fonte?.produtos)) {
    lista = fonte.produtos;
  } else if (Array.isArray(fonte?.itens)) {
    lista = fonte.itens;
  } else if (Array.isArray(fonte?.items)) {
    lista = fonte.items;
  } else if (Array.isArray(data?.produtos)) {
    lista = data.produtos;
  }

  const paginacaoFonte = data?.paginacao || fonte?.paginacao || {};

  const pagina =
    Number(
      paginacaoFonte?.paginaAtual ??
        paginacaoFonte?.pagina ??
        fonte?.paginaAtual ??
        fonte?.pagina ??
        data?.paginaAtual ??
        data?.pagina ??
        paginaSolicitada
    ) || paginaSolicitada;

  const total =
    Number(
      paginacaoFonte?.total ??
        paginacaoFonte?.totalItens ??
        paginacaoFonte?.totalProdutos ??
        fonte?.total ??
        fonte?.totalItens ??
        fonte?.totalProdutos ??
        data?.total ??
        data?.totalItens ??
        data?.totalProdutos ??
        lista.length
    ) || lista.length;

  const limite =
    Number(
      paginacaoFonte?.limite ??
        fonte?.limite ??
        data?.limite ??
        PRODUTOS_POR_PAGINA
    ) || PRODUTOS_POR_PAGINA;

  const totalPaginas =
    Number(
      paginacaoFonte?.totalPaginas ??
        paginacaoFonte?.total_paginas ??
        fonte?.totalPaginas ??
        fonte?.total_paginas ??
        data?.totalPaginas ??
        data?.total_paginas
    ) || Math.max(1, Math.ceil(total / PRODUTOS_POR_PAGINA));

  const maiorPreco =
    Number(
      data?.meta?.maiorPreco ??
        data?.maiorPreco ??
        fonte?.maiorPreco ??
        fonte?.meta?.maiorPreco ??
        0
    ) || 0;

  return {
    lista,
    paginacao: {
      pagina,
      limite,
      total,
      totalPaginas,
    },
    maiorPreco,
  };
}

export default function Produtos() {
  const router = useRouter();

  const [produtos, setProdutos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [paginacaoApi, setPaginacaoApi] = useState({
    pagina: 1,
    limite: PRODUTOS_POR_PAGINA,
    total: 0,
    totalPaginas: 1,
  });

  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("todas");
  const [precoMaximo, setPrecoMaximo] = useState(0);
  const [maiorPrecoCatalogo, setMaiorPrecoCatalogo] = useState(0);
  const [precoAlteradoPeloUsuario, setPrecoAlteradoPeloUsuario] = useState(false);
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

    const controller = new AbortController();

    async function carregarProdutos() {
      try {
        setCarregandoProdutos(true);
        setErro("");

        const params = new URLSearchParams();

        params.set("pagina", String(paginaAtual));
        params.set("limite", String(PRODUTOS_POR_PAGINA));

        const buscaLimpa = busca.trim();
        const categoriaNormalizada = normalizarCategoria(categoriaSelecionada);
        const precoMaximoNumerico = Number(precoMaximo || 0);

        if (buscaLimpa) {
          params.set("busca", buscaLimpa);
        }

        if (categoriaNormalizada && categoriaNormalizada !== "todas") {
          params.set("categoria", categoriaNormalizada);
        }

        if (precoAlteradoPeloUsuario && precoMaximoNumerico > 0) {
          params.set("precoMaximo", String(precoMaximoNumerico));
        }

        if (somenteEstoque) {
          params.set("somenteEstoque", "true");
        }

        const url = `${PRODUTOS_URL}?${params.toString()}`;

        const response = await fetch(url, {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        });

        const data = await response.json().catch(() => null);

        if (!response.ok || data?.sucesso === false) {
          throw new Error(getMensagemErro(data));
        }

        const { lista, paginacao, maiorPreco } = normalizarRespostaProdutos(
          data,
          paginaAtual
        );

        setProdutos(Array.isArray(lista) ? lista : []);
        setPaginacaoApi(paginacao);

        if (maiorPreco > 0) {
          setMaiorPrecoCatalogo(maiorPreco);

          if (!precoAlteradoPeloUsuario) {
            setPrecoMaximo(Math.ceil(maiorPreco));
          }
        }
      } catch (error) {
        if (error?.name === "AbortError") return;

        console.error("Erro ao carregar produtos:", error);
        setErro(error.message || "Não foi possível carregar os produtos.");
        setProdutos([]);
        setPaginacaoApi({
          pagina: 1,
          limite: PRODUTOS_POR_PAGINA,
          total: 0,
          totalPaginas: 1,
        });
      } finally {
        if (!controller.signal.aborted) {
          setCarregandoProdutos(false);
        }
      }
    }

    carregarProdutos();

    return () => {
      controller.abort();
    };
  }, [
    acessoPermitido,
    paginaAtual,
    busca,
    categoriaSelecionada,
    precoMaximo,
    precoAlteradoPeloUsuario,
    somenteEstoque,
  ]);

  const maiorPrecoDisponivel = useMemo(() => {
    if (Number(maiorPrecoCatalogo || 0) > 0) {
      return Number(maiorPrecoCatalogo);
    }

    return produtos.reduce((maior, produto) => {
      const preco = Number(produto?.preco || 0);
      return preco > maior ? preco : maior;
    }, 0);
  }, [maiorPrecoCatalogo, produtos]);

  const produtosFiltrados = useMemo(() => {
    // O backend já devolve a lista filtrada e paginada.
    // Não filtre aqui, senão o filtro volta a considerar só a página atual.
    return produtos;
  }, [produtos]);

  const existeFiltroAtivo = useMemo(() => {
    const maiorPrecoArredondado = Math.ceil(maiorPrecoDisponivel || 0);
    const precoMaximoNumerico = Number(precoMaximo || 0);

    return (
      Boolean(busca.trim()) ||
      categoriaSelecionada !== "todas" ||
      Boolean(somenteEstoque) ||
      (precoAlteradoPeloUsuario &&
        precoMaximoNumerico > 0 &&
        maiorPrecoArredondado > 0 &&
        precoMaximoNumerico < maiorPrecoArredondado)
    );
  }, [
    busca,
    categoriaSelecionada,
    somenteEstoque,
    precoMaximo,
    precoAlteradoPeloUsuario,
    maiorPrecoDisponivel,
  ]);

  const totalPaginas = Math.max(1, Number(paginacaoApi?.totalPaginas || 1));

  const produtosAtuais = useMemo(() => {
    return produtosFiltrados;
  }, [produtosFiltrados]);

  useEffect(() => {
    if (!carregandoProdutos && paginaAtual > totalPaginas) {
      setPaginaAtual(totalPaginas);
    }
  }, [carregandoProdutos, paginaAtual, totalPaginas]);

  function alterarBusca(valor) {
    setPaginaAtual(1);
    setBusca(valor);
  }

  function alterarCategoria(valor) {
    setPaginaAtual(1);
    setCategoriaSelecionada(valor);
  }

  function alterarPrecoMaximo(valor) {
    setPaginaAtual(1);
    setPrecoAlteradoPeloUsuario(true);
    setPrecoMaximo(Number(valor));
  }

  function alterarSomenteEstoque(valor) {
    setPaginaAtual(1);
    setSomenteEstoque(valor);
  }

  function alterarPagina(novaPagina) {
    const paginaSegura = Math.min(Math.max(Number(novaPagina) || 1, 1), totalPaginas);
    setPaginaAtual(paginaSegura);

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function limparFiltros() {
    setBusca("");
    setCategoriaSelecionada("todas");
    setPrecoAlteradoPeloUsuario(false);
    setPrecoMaximo(Math.ceil(maiorPrecoDisponivel || maiorPrecoCatalogo || 0));
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
                  <label className="form-label text-white" >
                    Buscar Produto
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Digite o nome..."
                    value={busca}
                    onChange={(event) => alterarBusca(event.target.value)}
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
                    onChange={(event) => alterarCategoria(event.target.value)}
                    style={inputStyle}
                  >
                    {categorias.map((categoria) => (
                      <option
                        key={categoria.value}
                        value={categoria.value}
                        style={{ color: "#ffffff" }}
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
                    onChange={(event) => alterarPrecoMaximo(event.target.value)}
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
                      onChange={(event) => alterarSomenteEstoque(event.target.checked)}
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
                    {String(
                      paginacaoApi?.total ?? produtosFiltrados.length
                    ).padStart(2, "0")}
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

              {!carregandoProdutos && !erro && Number(paginacaoApi?.total || 0) > 0 && (
                <nav className="mt-5">
                  <ul className="pagination justify-content-center flex-wrap gap-2">
                    <li className={`page-item ${paginaAtual === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link paginacao-btn"
                        onClick={() => alterarPagina(paginaAtual - 1)}
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
                            onClick={() => alterarPagina(numeroPagina)}
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
                        onClick={() => alterarPagina(paginaAtual + 1)}
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