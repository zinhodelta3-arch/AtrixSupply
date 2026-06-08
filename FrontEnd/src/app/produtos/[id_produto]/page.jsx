"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
const PRODUTOS_URL = `${API_URL}/api/produtos`;
const IMAGEM_PADRAO_PRODUTO = "/logo.png";

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

const softSurfaceGradient = `
  linear-gradient(
    145deg,
    rgba(255,255,255,.035),
    rgba(255,255,255,.015)
  )
`;

const panelStyle = {
  background: surfaceGradient,
  borderRadius: "34px",
  border: "1px solid rgba(255,255,255,.10)",
  boxShadow: "none",
};

const innerPanelStyle = {
  background: softSurfaceGradient,
  border: "1px solid rgba(255,255,255,.06)",
  boxShadow: "none",
};

const buttonGradient = {
  background: "linear-gradient(90deg,#940533,#c0012a,#ff8800)",
  color: "white",
  border: "none",
  boxShadow: "none",
};

function obterToken() {
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

function obterUsuarioLocal() {
  if (typeof window === "undefined") return null;

  try {
    const usuarioStorage = localStorage.getItem("usuario");

    if (!usuarioStorage) return null;

    return JSON.parse(usuarioStorage);
  } catch {
    return null;
  }
}

function obterTipoUsuario(usuario) {
  return String(
    usuario?.tipo ||
      usuario?.tipo_user ||
      usuario?.role ||
      usuario?.dados?.tipo ||
      usuario?.dados?.tipo_user ||
      usuario?.usuario?.tipo ||
      ""
  )
    .trim()
    .toLowerCase();
}

function usuarioPodeComprar(usuario) {
  return ["comum", "cliente"].includes(obterTipoUsuario(usuario));
}

function getImagemUrl(imagem) {
  const imagemTratada = String(imagem || "").trim().replaceAll("\\", "/");

  if (!imagemTratada) {
    return IMAGEM_PADRAO_PRODUTO;
  }

  if (imagemTratada.startsWith("http") || imagemTratada.startsWith("data:image")) {
    return imagemTratada;
  }

  if (imagemTratada.startsWith("/uploads")) {
    return `${API_URL}${imagemTratada}`;
  }

  if (imagemTratada.startsWith("uploads/")) {
    return `${API_URL}/${imagemTratada}`;
  }

  return `${API_URL}/uploads/imagens/${imagemTratada}`;
}

function obterImagemProduto(produto) {
  return (
    produto?.imagem ||
    produto?.imagem_produto ||
    produto?.url_imagem ||
    produto?.imagem_url ||
    produto?.foto ||
    produto?.img ||
    produto?.image ||
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
  if (!categoria) return "Categoria";

  return String(categoria)
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letra) => letra.toUpperCase());
}

function getEstoqueInfo(estoque) {
  const quantidade = Number(estoque || 0);

  if (quantidade <= 0) {
    return {
      label: "Produto indisponível",
      cor: "#ff5a5a",
      icon: "bi-x-circle-fill",
      disponivel: false,
    };
  }

  if (quantidade <= 5) {
    return {
      label: `Baixo estoque: ${quantidade} unidade(s)`,
      cor: "#ffb300",
      icon: "bi-exclamation-circle-fill",
      disponivel: true,
    };
  }

  return {
    label: `Em estoque: ${quantidade} unidade(s)`,
    cor: "#5cff95",
    icon: "bi-check-circle-fill",
    disponivel: true,
  };
}

function getMensagemErro(data) {
  if (data?.detalhes?.length) {
    return data.detalhes.map((erro) => erro.mensagem).join(" | ");
  }

  return data?.mensagem || data?.erro || "Não foi possível concluir a operação.";
}

function getToastStyle(tipo) {
  if (tipo === "success") {
    return {
      icon: "bi-check-circle-fill",
      cor: "#5cff95",
      fundo: "rgba(32,130,75,.16)",
      borda: "rgba(92,255,149,.28)",
    };
  }

  if (tipo === "warning") {
    return {
      icon: "bi-exclamation-triangle-fill",
      cor: "#ffcf40",
      fundo: "rgba(255,179,0,.13)",
      borda: "rgba(255,207,64,.28)",
    };
  }

  return {
    icon: "bi-x-circle-fill",
    cor: "#ff5a5a",
    fundo: "rgba(255,90,90,.14)",
    borda: "rgba(255,90,90,.28)",
  };
}

export default function Compra() {
  const params = useParams();
  const router = useRouter();

  const id_produto = params?.id_produto;
  const toastTimerRef = useRef(null);

  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    async function carregarProduto() {
      try {
        setCarregando(true);
        setErro("");
        setToast(null);

        const response = await fetch(`${PRODUTOS_URL}/${id_produto}`, {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json().catch(() => null);

        if (!response.ok || !data?.sucesso) {
          throw new Error(getMensagemErro(data));
        }

        setProduto(data?.dados || null);
        setQuantidade(1);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
        setErro(error.message || "Não foi possível carregar o produto.");
      } finally {
        setCarregando(false);
      }
    }

    if (id_produto) {
      carregarProduto();
    }
  }, [id_produto]);

  const precoProduto = Number(produto?.preco_produto ?? produto?.preco ?? 0);
  const estoqueProduto = Number(produto?.estoque_produto ?? produto?.estoque ?? 0);
  const imagemProduto = getImagemUrl(obterImagemProduto(produto));
  const estoqueInfo = getEstoqueInfo(estoqueProduto);

  const subtotal = useMemo(() => {
    return precoProduto * quantidade;
  }, [precoProduto, quantidade]);

  function mostrarToast(tipo, titulo, texto) {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    setToast({
      tipo,
      titulo,
      texto,
    });

    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 3200);
  }

  function diminuirQuantidade() {
    setQuantidade((valorAtual) => Math.max(valorAtual - 1, 1));
  }

  function aumentarQuantidade() {
    if (estoqueProduto > 0) {
      setQuantidade((valorAtual) => Math.min(valorAtual + 1, estoqueProduto));
      return;
    }

    setQuantidade((valorAtual) => valorAtual + 1);
  }

  function adicionarAoCarrinho() {
    if (!produto) return;

    const token = obterToken();
    const usuarioLocal = obterUsuarioLocal();

    if (!token || !usuarioLocal) {
      mostrarToast(
        "warning",
        "Login necessário",
        "Entre na sua conta para adicionar produtos ao carrinho."
      );

      setTimeout(() => {
        router.push("/login");
      }, 850);

      return;
    }

    if (!usuarioPodeComprar(usuarioLocal)) {
      mostrarToast(
        "warning",
        "Acesso de cliente necessário",
        "Use uma conta de cliente para adicionar produtos ao carrinho."
      );

      return;
    }

    if (!estoqueInfo.disponivel) {
      mostrarToast(
        "danger",
        "Produto indisponível",
        "Este produto está indisponível no momento."
      );

      return;
    }

    try {
      const carrinhoStorage = localStorage.getItem("carrinho");
      const carrinhoAtual = carrinhoStorage ? JSON.parse(carrinhoStorage) : [];
      const carrinhoSeguro = Array.isArray(carrinhoAtual) ? carrinhoAtual : [];

      const novoItem = {
        id: String(produto.id_produto || id_produto),
        name: produto.nome_produto || "Produto sem nome",
        qty: quantidade,
        price: precoProduto,
        img: imagemProduto,
      };

      const indexExistente = carrinhoSeguro.findIndex(
        (item) => String(item.id) === String(novoItem.id)
      );

      if (indexExistente > -1) {
        const quantidadeAtual = Number(carrinhoSeguro[indexExistente].qty || 1);
        const novaQuantidade = quantidadeAtual + quantidade;

        carrinhoSeguro[indexExistente].qty =
          estoqueProduto > 0 ? Math.min(novaQuantidade, estoqueProduto) : novaQuantidade;
      } else {
        carrinhoSeguro.push(novoItem);
      }

      localStorage.setItem("carrinho", JSON.stringify(carrinhoSeguro));
      window.dispatchEvent(new Event("carrinhoAtualizado"));

      mostrarToast(
        "success",
        "Produto adicionado",
        "O item foi enviado para o seu carrinho."
      );
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);

      mostrarToast(
        "danger",
        "Erro no carrinho",
        "Não foi possível adicionar o produto ao carrinho."
      );
    }
  }

  if (carregando) {
    return (
      <main
        className="d-flex justify-content-center align-items-center text-white"
        style={{
          minHeight: "100vh",
          background: pageBackground,
        }}
      >
        <div className="text-center">
          <div className="spinner-border text-warning mb-3" />
          <h4 className="fw-bold">Carregando produto...</h4>
          <p className="text-secondary mb-0">Buscando detalhes da compra.</p>
        </div>
      </main>
    );
  }

  if (erro) {
    return (
      <main
        className="d-flex justify-content-center align-items-center text-white p-4"
        style={{
          minHeight: "100vh",
          background: pageBackground,
        }}
      >
        <div
          className="text-center"
          style={{
            width: "min(520px, 100%)",
            ...panelStyle,
            padding: "36px",
          }}
        >
          <i
            className="bi bi-exclamation-triangle"
            style={{
              fontSize: "3.2rem",
              color: "#ffb300",
            }}
          />

          <h3 className="fw-bold mt-3">Produto não encontrado</h3>

          <p className="text-secondary mt-3">{erro}</p>

          <button
            type="button"
            onClick={() => router.push("/produtos")}
            className="btn mt-3"
            style={{
              ...buttonGradient,
              borderRadius: "16px",
              padding: "12px 22px",
              fontWeight: "800",
            }}
          >
            Voltar aos produtos
          </button>
        </div>
      </main>
    );
  }

  const toastVisual = toast ? getToastStyle(toast.tipo) : null;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: pageBackground,
        color: "white",
        overflow: "hidden",
      }}
    >
      {toast && toastVisual && (
        <div
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{
            position: "fixed",
            top: "92px",
            right: "24px",
            zIndex: 9999,
            width: "min(380px, calc(100vw - 32px))",
            background: surfaceGradient,
            border: `1px solid ${toastVisual.borda}`,
            boxShadow: "none",
            borderRadius: "22px",
            padding: "16px",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="d-flex gap-3 align-items-start">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "15px",
                background: toastVisual.fundo,
                color: toastVisual.cor,
                flexShrink: 0,
              }}
            >
              <i className={`bi ${toastVisual.icon}`} />
            </div>

            <div style={{ minWidth: 0 }}>
              <strong
                style={{
                  display: "block",
                  color: "#ffffff",
                  fontSize: ".98rem",
                  marginBottom: "4px",
                }}
              >
                {toast.titulo}
              </strong>

              <span
                style={{
                  display: "block",
                  color: "rgba(255,255,255,.68)",
                  fontSize: ".9rem",
                  lineHeight: "1.45",
                }}
              >
                {toast.texto}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setToast(null)}
              className="btn p-0 ms-auto"
              style={{
                color: "rgba(255,255,255,.55)",
                lineHeight: 1,
              }}
              aria-label="Fechar aviso"
            >
              <i className="bi bi-x-lg" />
            </button>
          </div>
        </div>
      )}

      <header
        className="px-4 px-lg-5 py-4"
        style={{
          borderBottom: "1px solid rgba(255,255,255,.05)",
          backdropFilter: "blur(12px)",
          background: "rgba(0,0,0,.12)",
        }}
      >
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <button
              type="button"
              onClick={() => router.push("/produtos")}
              className="btn btn-outline-light"
              style={{
                borderRadius: "14px",
                padding: "10px 16px",
              }}
            >
              <i className="bi bi-arrow-left me-2" />
              Voltar
            </button>

            <div className="text-lg-end">
              <span
                style={{
                  color: "rgba(255,255,255,.5)",
                  fontSize: ".82rem",
                  textTransform: "uppercase",
                  letterSpacing: ".8px",
                  fontWeight: "800",
                }}
              >
                Detalhes do produto
              </span>

              <h1
                style={{
                  margin: 0,
                  fontWeight: "900",
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  background: "linear-gradient(90deg,#ffcf40,#ff9d00,#c0012a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Compra segura Atrix Supply
              </h1>
            </div>
          </div>
        </div>
      </header>

      <section className="container-fluid px-4 px-lg-5 py-5">
        <div className="row g-4 align-items-stretch">
          <div className="col-xl-7">
            <div
              className="h-100"
              style={{
                ...panelStyle,
                padding: "28px",
              }}
            >
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  minHeight: "560px",
                  borderRadius: "28px",
                  background: softSurfaceGradient,
                  border: "1px solid rgba(255,255,255,.06)",
                  overflow: "hidden",
                  boxShadow: "none",
                }}
              >
                <img
                  src={imagemProduto}
                  alt={produto?.nome_produto || "Produto Atrix Supply"}
                  onError={(event) => {
                    const img = event.currentTarget;

                    if (img.dataset.fallbackApplied === "true") return;

                    img.dataset.fallbackApplied = "true";
                    img.src = IMAGEM_PADRAO_PRODUTO;
                  }}
                  style={{
                    width: "100%",
                    height: "520px",
                    objectFit: "contain",
                    padding: "32px",
                    filter: "none",
                  }}
                />
              </div>

              <div className="row g-3 mt-3">
                {[
                  {
                    icon: "bi-truck",
                    titulo: "Entrega",
                    texto: "Envio para todo Brasil",
                  },
                  {
                    icon: "bi-shield-check",
                    titulo: "Garantia",
                    texto: "Compra protegida",
                  },
                  {
                    icon: "bi-credit-card",
                    titulo: "Pagamento",
                    texto: "Ambiente seguro",
                  },
                ].map((item) => (
                  <div className="col-md-4" key={item.titulo}>
                    <div
                      className="h-100"
                      style={{
                        ...innerPanelStyle,
                        borderRadius: "20px",
                        padding: "18px",
                      }}
                    >
                      <i
                        className={`bi ${item.icon}`}
                        style={{
                          color: "#ffcf40",
                          fontSize: "1.35rem",
                        }}
                      />

                      <h6
                        className="mt-3 mb-1"
                        style={{
                          color: "#ffffff",
                          fontWeight: "800",
                        }}
                      >
                        {item.titulo}
                      </h6>

                      <p
                        className="mb-0"
                        style={{
                          color: "rgba(255,255,255,.58)",
                          fontSize: ".88rem",
                        }}
                      >
                        {item.texto}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-xl-5">
            <div
              className="h-100"
              style={{
                ...panelStyle,
                padding: "36px",
              }}
            >
              <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
                <span
                  style={{
                    color: "#ffcf40",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontWeight: "800",
                    fontSize: ".78rem",
                  }}
                >
                  {formatarCategoria(produto?.categoria)}
                </span>

                <span
                  className="badge"
                  style={{
                    background: `${estoqueInfo.cor}18`,
                    color: estoqueInfo.cor,
                    border: `1px solid ${estoqueInfo.cor}55`,
                    borderRadius: "999px",
                    padding: "9px 12px",
                    fontWeight: "800",
                  }}
                >
                  <i className={`bi ${estoqueInfo.icon} me-2`} />
                  {estoqueInfo.disponivel ? "Disponível" : "Indisponível"}
                </span>
              </div>

              <h2
                className="mt-4"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.3rem)",
                  fontWeight: "900",
                  lineHeight: "1.05",
                  letterSpacing: "-1.5px",
                }}
              >
                {produto?.nome_produto || "Produto sem nome"}
              </h2>

              <p
                className="mt-3"
                style={{
                  color: "rgba(255,255,255,.62)",
                  lineHeight: "1.8",
                  fontSize: "1rem",
                }}
              >
                {produto?.descricao ||
                  "Produto industrial selecionado para alta performance, segurança e uso profissional."}
              </p>

              <div
                className="mt-4"
                style={{
                  ...innerPanelStyle,
                  borderRadius: "26px",
                  padding: "24px",
                }}
              >
                <span
                  style={{
                    display: "block",
                    color: "rgba(255,255,255,.48)",
                    textTransform: "uppercase",
                    fontSize: ".76rem",
                    fontWeight: "800",
                    letterSpacing: ".8px",
                    marginBottom: "8px",
                  }}
                >
                  Preço final
                </span>

                <h3
                  style={{
                    color: "#ffe082",
                    fontWeight: "900",
                    fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                    margin: 0,
                  }}
                >
                  {formatarPreco(precoProduto)}
                </h3>

                <p
                  className="mb-0 mt-2"
                  style={{
                    color: "rgba(255,255,255,.55)",
                  }}
                >
                  Pagamento seguro · até 12x sem juros
                </p>
              </div>

              <div
                className="mt-4"
                style={{
                  ...innerPanelStyle,
                  borderRadius: "24px",
                  padding: "22px",
                }}
              >
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div>
                    <p
                      style={{
                        color: "#ffcf40",
                        fontWeight: "800",
                        marginBottom: "8px",
                        textTransform: "uppercase",
                        letterSpacing: ".7px",
                        fontSize: ".78rem",
                      }}
                    >
                      Quantidade
                    </p>

                    <span
                      style={{
                        color: estoqueInfo.cor,
                        fontWeight: "700",
                        fontSize: ".92rem",
                      }}
                    >
                      <i className={`bi ${estoqueInfo.icon} me-2`} />
                      {estoqueInfo.label}
                    </span>
                  </div>

                  <div
                    className="d-flex align-items-center"
                    style={{
                      width: "fit-content",
                      background: "rgba(0,0,0,.18)",
                      border: "1px solid rgba(255,255,255,.07)",
                      borderRadius: "18px",
                      overflow: "hidden",
                      boxShadow: "none",
                    }}
                  >
                    <button
                      type="button"
                      className="btn"
                      onClick={diminuirQuantidade}
                      disabled={quantidade <= 1}
                      style={{
                        width: "54px",
                        height: "54px",
                        border: "none",
                        color: "white",
                        opacity: quantidade <= 1 ? 0.35 : 1,
                      }}
                    >
                      <i className="bi bi-dash-lg" />
                    </button>

                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        width: "70px",
                        fontWeight: "800",
                        fontSize: "1.1rem",
                      }}
                    >
                      {quantidade}
                    </div>

                    <button
                      type="button"
                      className="btn"
                      onClick={aumentarQuantidade}
                      disabled={estoqueProduto > 0 && quantidade >= estoqueProduto}
                      style={{
                        width: "54px",
                        height: "54px",
                        border: "none",
                        color: "white",
                        opacity:
                          estoqueProduto > 0 && quantidade >= estoqueProduto ? 0.35 : 1,
                      }}
                    >
                      <i className="bi bi-plus-lg" />
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="mt-4"
                style={{
                  ...innerPanelStyle,
                  borderRadius: "22px",
                  padding: "18px",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span
                    style={{
                      color: "rgba(255,255,255,.58)",
                      fontWeight: "700",
                    }}
                  >
                    Subtotal
                  </span>

                  <strong
                    style={{
                      color: "#5cff95",
                      fontSize: "1.25rem",
                    }}
                  >
                    {formatarPreco(subtotal)}
                  </strong>
                </div>
              </div>

              <div className="d-grid gap-3 mt-4">
                <button
                  type="button"
                  className="btn"
                  onClick={adicionarAoCarrinho}
                  disabled={!estoqueInfo.disponivel}
                  style={{
                    ...buttonGradient,
                    background: estoqueInfo.disponivel
                      ? buttonGradient.background
                      : "rgba(255,255,255,.12)",
                    padding: "17px",
                    borderRadius: "18px",
                    fontWeight: "900",
                    fontSize: "1.03rem",
                    letterSpacing: ".3px",
                    cursor: estoqueInfo.disponivel ? "pointer" : "not-allowed",
                  }}
                >
                  <i className="bi bi-cart-plus-fill me-2" />
                  Adicionar ao carrinho
                </button>

                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={() => router.push("/produtos")}
                  style={{
                    borderRadius: "18px",
                    padding: "15px",
                    fontWeight: "800",
                    boxShadow: "none",
                  }}
                >
                  Continuar comprando
                </button>
              </div>

              <div className="d-flex flex-column gap-3 mt-5">
                {[
                  {
                    icon: "bi-patch-check",
                    texto: "Fornecedor verificado: " + (produto?.fornecedor || "Atrix Supply"),
                  },
                  {
                    icon: "bi-arrow-repeat",
                    texto: "Troca e suporte conforme política da plataforma",
                  },
                  {
                    icon: "bi-lock",
                    texto: "Dados protegidos durante toda a compra",
                  },
                ].map((item) => (
                  <div
                    key={item.texto}
                    className="d-flex align-items-center gap-3"
                    style={{
                      ...innerPanelStyle,
                      borderRadius: "16px",
                      padding: "15px 17px",
                      color: "rgba(255,255,255,.72)",
                    }}
                  >
                    <i
                      className={`bi ${item.icon}`}
                      style={{
                        color: "#ffcf40",
                        fontSize: "1.1rem",
                      }}
                    />

                    <span>{item.texto}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section
          className="mt-4"
          style={{
            ...panelStyle,
            padding: "32px",
            borderRadius: "30px",
          }}
        >
          <div className="row g-4">
            <div className="col-lg-7">
              <h4
                style={{
                  color: "#ffe082",
                  fontWeight: "900",
                  marginBottom: "14px",
                }}
              >
                Descrição completa
              </h4>

              <p
                style={{
                  color: "rgba(255,255,255,.7)",
                  lineHeight: "1.9",
                  margin: 0,
                }}
              >
                {produto?.descricao ||
                  "Este produto ainda não possui uma descrição detalhada cadastrada."}
              </p>
            </div>

            <div className="col-lg-5">
              <h4
                style={{
                  color: "#ffe082",
                  fontWeight: "900",
                  marginBottom: "14px",
                }}
              >
                Especificações
              </h4>

              <div className="d-flex flex-column gap-2">
                {[
                  ["Código", `#${produto?.id_produto || id_produto}`],
                  ["Categoria", formatarCategoria(produto?.categoria)],
                  ["Fornecedor", produto?.fornecedor || "Não informado"],
                  ["Estoque", `${estoqueProduto} unidade(s)`],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="d-flex justify-content-between gap-3"
                    style={{
                      ...innerPanelStyle,
                      borderRadius: "14px",
                      padding: "13px 15px",
                    }}
                  >
                    <span style={{ color: "rgba(255,255,255,.5)" }}>{label}</span>

                    <strong style={{ color: "rgba(255,255,255,.86)" }}>
                      {value}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
