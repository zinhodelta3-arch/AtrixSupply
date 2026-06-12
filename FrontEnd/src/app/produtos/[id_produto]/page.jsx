"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import AlertCard from "@/components/AlertCard";
import { FALLBACK_IMAGE, resolveImageUrl, useImageFallback } from "@/utils/imageUrl";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
const PRODUTOS_URL = `${API_URL}/api/produtos`;
const IMAGEM_PADRAO_PRODUTO = FALLBACK_IMAGE;

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

const pageMotionProps = {
  initial: {
    opacity: 0,
    y: 14,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.42,
    ease: "easeOut",
  },
};

function getSequencedMotion(index = 0, deslocamento = 16) {
  const delay = Math.min(Number(index) || 0, 12) * 0.055;

  return {
    initial: {
      opacity: 0,
      y: deslocamento,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      duration: 0.36,
      ease: "easeOut",
      delay,
    },
  };
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

function usuarioEstaLogado() {
  return Boolean(obterToken() && obterUsuarioLocal());
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

export default function Compra() {
  const params = useParams();
  const router = useRouter();

  const id_produto = params?.id_produto;
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
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
  const imagemProduto = resolveImageUrl(produto?.imagem, IMAGEM_PADRAO_PRODUTO);
  const estoqueInfo = getEstoqueInfo(estoqueProduto);

  const subtotal = useMemo(() => {
    return precoProduto * quantidade;
  }, [precoProduto, quantidade]);

  function mostrarToast(tipo, titulo, texto) {
    setToast({
      tipo,
      titulo,
      texto,
    });
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

    if (!usuarioEstaLogado()) {
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
      <motion.main
        {...pageMotionProps}
        className="d-flex justify-content-center align-items-center text-white"
        style={{
          minHeight: "100vh",
          background: pageBackground,
        }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
        >
          <motion.div
            className="spinner-border text-warning mb-3"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <h4 className="fw-bold">Carregando produto...</h4>

          <p className="text-secondary mb-0">
            Buscando detalhes da compra.
          </p>
        </motion.div>
      </motion.main>
    );
  }

  if (erro) {
    return (
      <motion.main
        {...pageMotionProps}
        className="d-flex justify-content-center align-items-center text-white p-4"
        style={{
          minHeight: "100vh",
          background: pageBackground,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
          style={{ width: "min(520px, 100%)" }}
        >
          <AlertCard
            variant="empty"
            icon="bi-exclamation-triangle"
            title="Produto não encontrado"
            message={erro}
            centered
            style={{ width: "100%", padding: "36px" }}
            actions={
              <motion.button
                type="button"
                onClick={() => router.push("/produtos")}
                className="btn"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  ...buttonGradient,
                  borderRadius: "16px",
                  padding: "12px 22px",
                  fontWeight: "800",
                }}
              >
                Voltar aos produtos
              </motion.button>
            }
          />
        </motion.div>
      </motion.main>
    );
  }

  return (
    <motion.main
      {...pageMotionProps}
      style={{
        minHeight: "100vh",
        background: pageBackground,
        color: "white",
        overflow: "hidden",
      }}
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            key={`${toast.tipo}-${toast.titulo}-${toast.texto}`}
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            style={{
              position: "relative",
              zIndex: 80,
            }}
          >
            <AlertCard
              variant={toast.tipo}
              title={toast.titulo}
              message={toast.texto}
              toast
              duration={3200}
              onClose={() => setToast(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        className="px-4 px-lg-5 py-4"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, ease: "easeOut" }}
        style={{
          borderBottom: "1px solid rgba(255,255,255,.05)",
          backdropFilter: "blur(12px)",
          background: "rgba(0,0,0,.12)",
        }}
      >
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <motion.button
              type="button"
              onClick={() => router.push("/produtos")}
              className="btn btn-outline-light"
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.98 }}
              style={{
                borderRadius: "14px",
                padding: "10px 16px",
              }}
            >
              <i className="bi bi-arrow-left me-2" />
              Voltar
            </motion.button>

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
      </motion.header>

      <section className="container-fluid px-4 px-lg-5 py-5">
        <div className="row g-4 align-items-stretch">
          <motion.div
            className="col-xl-7"
            {...getSequencedMotion(0, 20)}
          >
            <div
              className="h-100"
              style={{
                ...panelStyle,
                padding: "28px",
              }}
            >
              <motion.div
                className="d-flex justify-content-center align-items-center"
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.42, ease: "easeOut", delay: 0.1 }}
                style={{
                  minHeight: "560px",
                  borderRadius: "28px",
                  background: softSurfaceGradient,
                  border: "1px solid rgba(255,255,255,.06)",
                  overflow: "hidden",
                  boxShadow: "none",
                }}
              >
                <motion.img
                  src={imagemProduto}
                  alt={produto?.nome_produto || "Produto Atrix Supply"}
                  onError={(event) => useImageFallback(event, IMAGEM_PADRAO_PRODUTO)}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.44, ease: "easeOut", delay: 0.18 }}
                  style={{
                    width: "100%",
                    height: "520px",
                    objectFit: "contain",
                    padding: "32px",
                    filter: "none",
                  }}
                />
              </motion.div>

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
                ].map((item, index) => (
                  <motion.div
                    className="col-md-4"
                    key={item.titulo}
                    {...getSequencedMotion(index + 2, 14)}
                  >
                    <motion.div
                      className="h-100"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
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
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="col-xl-5"
            {...getSequencedMotion(1, 20)}
          >
            <div
              className="h-100"
              style={{
                ...panelStyle,
                padding: "36px",
              }}
            >
              <motion.div
                className="d-flex justify-content-between align-items-start gap-3 flex-wrap"
                {...getSequencedMotion(0, 12)}
              >
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
              </motion.div>

              <motion.h2
                className="mt-4"
                {...getSequencedMotion(1, 14)}
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.3rem)",
                  fontWeight: "900",
                  lineHeight: "1.05",
                  letterSpacing: "-1.5px",
                }}
              >
                {produto?.nome_produto || "Produto sem nome"}
              </motion.h2>

              <motion.p
                className="mt-3"
                {...getSequencedMotion(2, 14)}
                style={{
                  color: "rgba(255,255,255,.62)",
                  lineHeight: "1.8",
                  fontSize: "1rem",
                }}
              >
                {produto?.descricao ||
                  "Produto industrial selecionado para alta performance, segurança e uso profissional."}
              </motion.p>

              <motion.div
                className="mt-4"
                {...getSequencedMotion(3, 14)}
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
              </motion.div>

              <motion.div
                className="mt-4"
                {...getSequencedMotion(4, 14)}
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
                    <motion.button
                      type="button"
                      className="btn"
                      onClick={diminuirQuantidade}
                      disabled={quantidade <= 1}
                      whileTap={{ scale: quantidade <= 1 ? 1 : 0.94 }}
                      style={{
                        width: "54px",
                        height: "54px",
                        border: "none",
                        color: "white",
                        opacity: quantidade <= 1 ? 0.35 : 1,
                      }}
                    >
                      <i className="bi bi-dash-lg" />
                    </motion.button>

                    <motion.div
                      key={quantidade}
                      className="d-flex justify-content-center align-items-center"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      style={{
                        width: "70px",
                        fontWeight: "800",
                        fontSize: "1.1rem",
                      }}
                    >
                      {quantidade}
                    </motion.div>

                    <motion.button
                      type="button"
                      className="btn"
                      onClick={aumentarQuantidade}
                      disabled={estoqueProduto > 0 && quantidade >= estoqueProduto}
                      whileTap={{
                        scale:
                          estoqueProduto > 0 && quantidade >= estoqueProduto ? 1 : 0.94,
                      }}
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
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="mt-4"
                {...getSequencedMotion(5, 14)}
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

                  <motion.strong
                    key={subtotal}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    style={{
                      color: "#5cff95",
                      fontSize: "1.25rem",
                    }}
                  >
                    {formatarPreco(subtotal)}
                  </motion.strong>
                </div>
              </motion.div>

              <motion.div
                className="d-grid gap-3 mt-4"
                {...getSequencedMotion(6, 14)}
              >
                <motion.button
                  type="button"
                  className="btn"
                  onClick={adicionarAoCarrinho}
                  disabled={!estoqueInfo.disponivel}
                  whileHover={estoqueInfo.disponivel ? { y: -3 } : {}}
                  whileTap={estoqueInfo.disponivel ? { scale: 0.98 } : {}}
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
                </motion.button>

                <motion.button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={() => router.push("/produtos")}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    borderRadius: "18px",
                    padding: "15px",
                    fontWeight: "800",
                    boxShadow: "none",
                  }}
                >
                  Continuar comprando
                </motion.button>
              </motion.div>

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
                ].map((item, index) => (
                  <motion.div
                    key={item.texto}
                    className="d-flex align-items-center gap-3"
                    {...getSequencedMotion(index + 7, 12)}
                    whileHover={{ x: 3 }}
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
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.section
          className="mt-4"
          {...getSequencedMotion(3, 18)}
          style={{
            ...panelStyle,
            padding: "32px",
            borderRadius: "30px",
          }}
        >
          <div className="row g-4">
            <motion.div
              className="col-lg-7"
              {...getSequencedMotion(0, 12)}
            >
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
            </motion.div>

            <motion.div
              className="col-lg-5"
              {...getSequencedMotion(1, 12)}
            >
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
                ].map(([label, value], index) => (
                  <motion.div
                    key={label}
                    className="d-flex justify-content-between gap-3"
                    {...getSequencedMotion(index, 10)}
                    whileHover={{ x: 3 }}
                    style={{
                      ...innerPanelStyle,
                      borderRadius: "14px",
                      padding: "13px 15px",
                    }}
                  >
                    <span style={{ color: "rgba(255,255,255,.5)" }}>
                      {label}
                    </span>

                    <strong style={{ color: "rgba(255,255,255,.86)" }}>
                      {value}
                    </strong>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>
      </section>
    </motion.main>
  );
}