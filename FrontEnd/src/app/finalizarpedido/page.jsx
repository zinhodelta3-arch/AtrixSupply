"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import AlertCard from "@/components/AlertCard";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
).replace(/\/$/, "");

const PEDIDOS_URL = `${API_URL}/api/pedidos`;

const pageBackground = `
  radial-gradient(circle at top left, rgba(255,136,0,.10), transparent 25%),
  radial-gradient(circle at bottom right, rgba(192,1,42,.16), transparent 30%),
  linear-gradient(145deg,#08080a,#101014,#160d12)
`;

const heroGradient =
  "linear-gradient(135deg,#940533,#c0012a,#f5061d,#ff8800)";

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

const panelStyle = {
  background: surfaceGradient,
  borderRadius: "30px",
  border: "1px solid rgba(255,255,255,.10)",
  boxShadow: "none",
};

const innerPanelStyle = {
  background: innerSurfaceGradient,
  border: "1px solid rgba(255,255,255,.06)",
  boxShadow: "none",
};

const inputStyle = {
  background: "rgba(255,255,255,.04)",
  border: "1px solid rgba(255,255,255,.08)",
  color: "white",
  borderRadius: "16px",
  padding: "13px 15px",
  boxShadow: "none",
};

const buttonGradient = {
  background: "linear-gradient(90deg,#940533,#c0012a,#ff8800)",
  border: "none",
  color: "white",
  borderRadius: "16px",
  fontWeight: "800",
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
  const delay = Math.min(Number(index) || 0, 14) * 0.055;

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
      duration: 0.34,
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
    usuario?.idUser ||
    usuario?.dados?.id_user ||
    usuario?.dados?.id_usuario ||
    usuario?.dados?.id ||
    usuario?.dados?.userId ||
    usuario?.dados?.idUser ||
    usuario?.usuario?.id_user ||
    usuario?.usuario?.id_usuario ||
    usuario?.usuario?.id ||
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

function formatarPreco(valor) {
  const numero = Number(valor || 0);

  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function getImagemCarrinho(img) {
  if (!img || String(img).trim() === "") {
    return "/logo.png";
  }

  return img;
}

function normalizarItemCarrinho(item) {
  const idProduto = item?.id_produto || item?.id || item?.produto_id;

  return {
    id: String(idProduto || ""),
    id_produto: idProduto,
    name:
      item?.name ||
      item?.nome_produto ||
      item?.nome ||
      "Produto sem nome",
    qty: Math.max(1, Number(item?.qty || item?.quantidade || 1)),
    price: Number(item?.price || item?.preco || 0),
    img: getImagemCarrinho(item?.img || item?.imagem),
  };
}

function getMensagemErro(data) {
  if (Array.isArray(data?.detalhes)) {
    return data.detalhes
      .map((item) => item.mensagem)
      .join(" | ");
  }

  return (
    data?.mensagem ||
    data?.erro ||
    "Não foi possível concluir a operação."
  );
}

export default function FinalizarPedido() {
  const router = useRouter();

  const [usuario, setUsuario] = useState(null);
  const [idUsuario, setIdUsuario] = useState("");
  const [carrinho, setCarrinho] = useState([]);

  const [carregandoPagina, setCarregandoPagina] =
    useState(true);

  const [finalizando, setFinalizando] = useState(false);

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cep: "",
    endereco: "",
    observacao: "",
  });

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    verificarAcessoECarregarCarrinho();
  }, []);

  function verificarAcessoECarregarCarrinho() {
    try {
      setCarregandoPagina(true);
      setErro("");

      const token = obterToken();
      const usuarioLocal = obterUsuarioLocal();
      const idLogado = obterIdUsuario(usuarioLocal);

      if (!token || !usuarioLocal || !idLogado) {
        router.replace("/login");
        return;
      }

      setUsuario(usuarioLocal);
      setIdUsuario(String(idLogado));

      setFormData({
        nome:
          usuarioLocal?.nome_user ||
          usuarioLocal?.nome ||
          "",
        email: usuarioLocal?.email || "",
        telefone: formatarTelefone(
          usuarioLocal?.telefone || ""
        ),
        cep: usuarioLocal?.cep || "",
        endereco: usuarioLocal?.endereco || "",
        observacao: "",
      });

      const carrinhoStorage =
        localStorage.getItem("carrinho");

      const carrinhoParseado = carrinhoStorage
        ? JSON.parse(carrinhoStorage)
        : [];

      const carrinhoSeguro = Array.isArray(
        carrinhoParseado
      )
        ? carrinhoParseado
            .map(normalizarItemCarrinho)
            .filter((item) => item.id_produto)
        : [];

      setCarrinho(carrinhoSeguro);
    } catch (error) {
      console.error(
        "Erro ao carregar finalizar pedido:",
        error
      );

      setErro("Não foi possível carregar seu carrinho.");
      setCarrinho([]);
    } finally {
      setCarregandoPagina(false);
    }
  }

  function atualizarCampo(campo, valor) {
    setFormData((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  function salvarCarrinhoAtualizado(novoCarrinho) {
    setCarrinho(novoCarrinho);

    localStorage.setItem(
      "carrinho",
      JSON.stringify(novoCarrinho)
    );

    window.dispatchEvent(
      new Event("carrinhoAtualizado")
    );
  }

  function aumentarQuantidade(idProduto) {
    const novoCarrinho = carrinho.map((item) => {
      if (String(item.id) !== String(idProduto)) {
        return item;
      }

      return {
        ...item,
        qty: item.qty + 1,
      };
    });

    salvarCarrinhoAtualizado(novoCarrinho);
  }

  function diminuirQuantidade(idProduto) {
    const novoCarrinho = carrinho.map((item) => {
      if (String(item.id) !== String(idProduto)) {
        return item;
      }

      return {
        ...item,
        qty: Math.max(1, item.qty - 1),
      };
    });

    salvarCarrinhoAtualizado(novoCarrinho);
  }

  function removerItem(idProduto) {
    const novoCarrinho = carrinho.filter(
      (item) =>
        String(item.id) !== String(idProduto)
    );

    salvarCarrinhoAtualizado(novoCarrinho);
  }

  function limparCarrinho() {
    salvarCarrinhoAtualizado([]);
  }

  async function criarPedidoUnitario(idProduto) {
    const response = await fetch(PEDIDOS_URL, {
      method: "POST",
      headers: montarHeaders(),
      body: JSON.stringify({
        id_user: Number(idUsuario),
        id_produto: Number(idProduto),
      }),
    });

    const data = await response
      .json()
      .catch(() => null);

    if (!response.ok || data?.sucesso === false) {
      throw new Error(getMensagemErro(data));
    }

    return data;
  }

  async function finalizarPedido(event) {
    event.preventDefault();

    try {
      setErro("");
      setSucesso("");
      setFinalizando(true);

      if (!idUsuario) {
        setErro(
          "Usuário não identificado. Faça login novamente."
        );

        router.replace("/login");
        return;
      }

      if (carrinho.length === 0) {
        setErro("Seu carrinho está vazio.");
        return;
      }

      if (!formData.nome.trim()) {
        setErro(
          "Informe seu nome para finalizar o pedido."
        );

        return;
      }

      if (!formData.email.trim()) {
        setErro(
          "Informe seu email para finalizar o pedido."
        );

        return;
      }

      if (!formData.cep.trim()) {
        setErro(
          "Informe seu CEP para finalizar o pedido."
        );

        return;
      }

      if (!formData.endereco.trim()) {
        setErro(
          "Informe seu endereço para finalizar o pedido."
        );

        return;
      }

      const pedidosParaCriar = [];

      carrinho.forEach((item) => {
        for (let i = 0; i < item.qty; i++) {
          pedidosParaCriar.push(item.id_produto);
        }
      });

      for (const idProduto of pedidosParaCriar) {
        await criarPedidoUnitario(idProduto);
      }

      localStorage.removeItem("carrinho");

      window.dispatchEvent(
        new Event("carrinhoAtualizado")
      );

      setCarrinho([]);

      setSucesso(
        "Pedido finalizado com sucesso! Redirecionando para seus pedidos..."
      );

      setTimeout(() => {
        router.push("/pedidos");
      }, 1200);
    } catch (error) {
      console.error(
        "Erro ao finalizar pedido:",
        error
      );

      setErro(
        error.message ||
          "Não foi possível finalizar o pedido."
      );
    } finally {
      setFinalizando(false);
    }
  }

  const resumo = useMemo(() => {
    const subtotal = carrinho.reduce(
      (acc, item) => {
        return acc + item.price * item.qty;
      },
      0
    );

    const quantidadeTotal = carrinho.reduce(
      (acc, item) => {
        return acc + item.qty;
      },
      0
    );

    const taxaServico = subtotal > 0 ? 0 : 0;
    const freteEstimado = subtotal > 0 ? 0 : 0;

    const total =
      subtotal + taxaServico + freteEstimado;

    return {
      subtotal,
      quantidadeTotal,
      taxaServico,
      freteEstimado,
      total,
    };
  }, [carrinho]);

  if (carregandoPagina) {
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
          initial={{
            opacity: 0,
            y: 16,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.38,
            ease: "easeOut",
          }}
        >
          <motion.div
            className="spinner-border text-warning mb-3"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <h4 className="fw-bold">
            Carregando finalização...
          </h4>

          <p className="text-secondary mb-0">
            Conferindo seu carrinho e seus dados.
          </p>
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
      <motion.section
        className="py-5 text-white"
        initial={{
          opacity: 0,
          y: -18,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.38,
          ease: "easeOut",
        }}
        style={{
          background: heroGradient,
          borderBottom:
            "1px solid rgba(255,255,255,.08)",
          minHeight: "245px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container-fluid px-4 px-lg-5 py-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-4">
            <div className="d-flex align-items-center gap-3">
              <motion.div
                className="d-flex justify-content-center align-items-center"
                initial={{
                  opacity: 0,
                  scale: 0.92,
                  rotate: -4,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  duration: 0.36,
                  ease: "easeOut",
                  delay: 0.08,
                }}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "20px",
                  background:
                    "rgba(255,255,255,.10)",
                  border:
                    "1px solid rgba(255,255,255,.12)",
                }}
              >
                <i
                  className="bi bi-bag-check"
                  style={{
                    fontSize: "1.6rem",
                    color: "#ffcf40",
                  }}
                />
              </motion.div>

              <motion.div
                {...getSequencedMotion(1, 12)}
              >
                <span className="badge bg-warning text-dark mb-2 px-3 py-2">
                  Finalização
                </span>

                <h1
                  style={{
                    margin: 0,
                    fontWeight: "800",
                    fontSize: "2rem",
                    color: "white",
                  }}
                >
                  Finalizar Pedido
                </h1>

                <p
                  style={{
                    margin: "6px 0 0",
                    color:
                      "rgba(255,255,255,.72)",
                  }}
                >
                  Revise seus produtos, confirme seus
                  dados e conclua sua compra.
                </p>
              </motion.div>
            </div>

            <motion.button
              type="button"
              onClick={() =>
                router.push("/produtos")
              }
              className="btn btn-outline-light"
              whileHover={{
                x: -3,
              }}
              whileTap={{
                scale: 0.98,
              }}
              style={{
                borderRadius: "16px",
                padding: "12px 18px",
                fontWeight: "800",
                boxShadow: "none",
              }}
            >
              <i className="bi bi-arrow-left me-2" />
              Continuar comprando
            </motion.button>
          </div>
        </div>
      </motion.section>

      <section className="container-fluid px-4 px-lg-5 py-5">
        <AnimatePresence>
          {erro && (
            <motion.div
              key="erro-finalizar-pedido"
              initial={{
                opacity: 0,
                y: -12,
                scale: 0.985,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -10,
                scale: 0.985,
              }}
              transition={{
                duration: 0.24,
                ease: "easeOut",
              }}
            >
              <AlertCard
                variant="danger"
                title="Erro"
                message={erro}
                className="mb-4"
              />
            </motion.div>
          )}

          {sucesso && (
            <motion.div
              key="sucesso-finalizar-pedido"
              initial={{
                opacity: 0,
                y: -12,
                scale: 0.985,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -10,
                scale: 0.985,
              }}
              transition={{
                duration: 0.24,
                ease: "easeOut",
              }}
            >
              <AlertCard
                variant="success"
                title="Sucesso"
                message={sucesso}
                className="mb-4"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={finalizarPedido}>
          <div className="row g-4">
            <div className="col-xl-8">
              <motion.div
                {...getSequencedMotion(0, 20)}
                style={{
                  ...panelStyle,
                  padding: "32px",
                }}
              >
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
                  <div>
                    <h2
                      style={{
                        color: "#ffe082",
                        fontWeight: "800",
                        marginBottom: "8px",
                      }}
                    >
                      Produtos do Carrinho
                    </h2>

                    <p
                      style={{
                        color:
                          "rgba(255,255,255,.55)",
                        margin: 0,
                      }}
                    >
                      Confira os itens antes de
                      confirmar o pedido.
                    </p>
                  </div>

                  <AnimatePresence>
                    {carrinho.length > 0 && (
                      <motion.button
                        type="button"
                        onClick={limparCarrinho}
                        className="btn btn-outline-danger"
                        initial={{
                          opacity: 0,
                          scale: 0.96,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.96,
                        }}
                        whileHover={{
                          y: -2,
                        }}
                        whileTap={{
                          scale: 0.98,
                        }}
                        style={{
                          borderRadius: "14px",
                          fontWeight: "700",
                        }}
                      >
                        <i className="bi bi-trash3 me-2" />
                        Limpar carrinho
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="popLayout">
                  {carrinho.length === 0 ? (
                    <motion.div
                      key="carrinho-vazio"
                      className="d-flex flex-column justify-content-center align-items-center text-center"
                      initial={{
                        opacity: 0,
                        y: 14,
                        scale: 0.985,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -10,
                        scale: 0.985,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                      style={{
                        minHeight: "330px",
                        ...innerPanelStyle,
                        borderRadius: "26px",
                        padding: "32px",
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

                      <h3 className="fw-bold text-white">
                        Seu carrinho está vazio
                      </h3>

                      <p
                        style={{
                          color:
                            "rgba(255,255,255,.58)",
                          maxWidth: "480px",
                        }}
                      >
                        Adicione produtos ao carrinho
                        antes de finalizar o pedido.
                      </p>

                      <motion.button
                        type="button"
                        onClick={() =>
                          router.push("/produtos")
                        }
                        className="btn mt-3"
                        whileHover={{
                          y: -3,
                        }}
                        whileTap={{
                          scale: 0.98,
                        }}
                        style={{
                          ...buttonGradient,
                          padding: "13px 22px",
                        }}
                      >
                        Ver produtos
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="lista-carrinho"
                      className="d-flex flex-column gap-3"
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                    >
                      {carrinho.map(
                        (item, index) => (
                          <motion.article
                            key={item.id}
                            className="d-flex flex-column flex-md-row align-items-md-center gap-3"
                            layout
                            {...getSequencedMotion(
                              index,
                              16
                            )}
                            exit={{
                              opacity: 0,
                              x: -18,
                              scale: 0.985,
                            }}
                            transition={{
                              duration: 0.28,
                              ease: "easeOut",
                            }}
                            style={{
                              ...innerPanelStyle,
                              borderRadius: "24px",
                              padding: "18px",
                            }}
                          >
                            <div
                              className="d-flex align-items-center justify-content-center"
                              style={{
                                width: "110px",
                                height: "110px",
                                borderRadius:
                                  "20px",
                                background:
                                  "rgba(0,0,0,.22)",
                                border:
                                  "1px solid rgba(255,255,255,.06)",
                                overflow: "hidden",
                                flexShrink: 0,
                              }}
                            >
                              <motion.img
                                src={item.img}
                                alt={item.name}
                                onError={(event) => {
                                  event.currentTarget.src =
                                    "/logo.png";
                                }}
                                initial={{
                                  opacity: 0,
                                  scale: 0.96,
                                }}
                                animate={{
                                  opacity: 1,
                                  scale: 1,
                                }}
                                transition={{
                                  duration: 0.24,
                                  ease: "easeOut",
                                }}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit:
                                    "contain",
                                  padding: "10px",
                                }}
                              />
                            </div>

                            <div
                              className="flex-grow-1"
                              style={{
                                minWidth: 0,
                              }}
                            >
                              <span
                                style={{
                                  color:
                                    "#ffcf40",
                                  fontSize:
                                    ".78rem",
                                  fontWeight:
                                    "800",
                                  textTransform:
                                    "uppercase",
                                  letterSpacing:
                                    ".7px",
                                }}
                              >
                                Produto #
                                {item.id_produto}
                              </span>

                              <h4
                                className="mt-2 mb-2"
                                style={{
                                  color:
                                    "white",
                                  fontWeight:
                                    "800",
                                  fontSize:
                                    "1.15rem",
                                }}
                              >
                                {item.name}
                              </h4>

                              <p
                                className="mb-0"
                                style={{
                                  color:
                                    "rgba(255,255,255,.55)",
                                }}
                              >
                                Valor unitário:{" "}
                                <strong
                                  style={{
                                    color:
                                      "#ffe082",
                                  }}
                                >
                                  {formatarPreco(
                                    item.price
                                  )}
                                </strong>
                              </p>
                            </div>

                            <div
                              className="d-flex align-items-center"
                              style={{
                                width: "fit-content",
                                background:
                                  "rgba(0,0,0,.18)",
                                border:
                                  "1px solid rgba(255,255,255,.07)",
                                borderRadius:
                                  "18px",
                                overflow: "hidden",
                                boxShadow: "none",
                              }}
                            >
                              <motion.button
                                type="button"
                                onClick={() =>
                                  diminuirQuantidade(
                                    item.id
                                  )
                                }
                                disabled={
                                  item.qty <= 1
                                }
                                className="btn"
                                whileTap={
                                  item.qty <= 1
                                    ? {}
                                    : {
                                        scale: 0.94,
                                      }
                                }
                                style={{
                                  width: "48px",
                                  height: "48px",
                                  border: "none",
                                  color: "white",
                                  opacity:
                                    item.qty <= 1
                                      ? 0.35
                                      : 1,
                                }}
                              >
                                <i className="bi bi-dash-lg" />
                              </motion.button>

                              <motion.div
                                key={item.qty}
                                className="d-flex align-items-center justify-content-center"
                                initial={{
                                  opacity: 0,
                                  y: -4,
                                }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                }}
                                transition={{
                                  duration: 0.18,
                                  ease: "easeOut",
                                }}
                                style={{
                                  width: "58px",
                                  fontWeight:
                                    "800",
                                  color: "white",
                                }}
                              >
                                {item.qty}
                              </motion.div>

                              <motion.button
                                type="button"
                                onClick={() =>
                                  aumentarQuantidade(
                                    item.id
                                  )
                                }
                                className="btn"
                                whileTap={{
                                  scale: 0.94,
                                }}
                                style={{
                                  width: "48px",
                                  height: "48px",
                                  border: "none",
                                  color: "white",
                                }}
                              >
                                <i className="bi bi-plus-lg" />
                              </motion.button>
                            </div>

                            <div
                              className="text-md-end"
                              style={{
                                minWidth: "150px",
                              }}
                            >
                              <span
                                style={{
                                  display:
                                    "block",
                                  color:
                                    "rgba(255,255,255,.48)",
                                  fontSize:
                                    ".78rem",
                                  textTransform:
                                    "uppercase",
                                  fontWeight:
                                    "800",
                                }}
                              >
                                Subtotal
                              </span>

                              <motion.strong
                                key={
                                  item.price *
                                  item.qty
                                }
                                initial={{
                                  opacity: 0,
                                  y: -4,
                                }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                }}
                                transition={{
                                  duration: 0.18,
                                  ease: "easeOut",
                                }}
                                style={{
                                  display:
                                    "block",
                                  color:
                                    "#5cff95",
                                  fontSize:
                                    "1.15rem",
                                  marginTop:
                                    "4px",
                                }}
                              >
                                {formatarPreco(
                                  item.price *
                                    item.qty
                                )}
                              </motion.strong>

                              <motion.button
                                type="button"
                                onClick={() =>
                                  removerItem(
                                    item.id
                                  )
                                }
                                className="btn btn-sm mt-2"
                                whileHover={{
                                  y: -2,
                                }}
                                whileTap={{
                                  scale: 0.98,
                                }}
                                style={{
                                  color:
                                    "#ff758f",
                                  border:
                                    "1px solid rgba(255,117,143,.25)",
                                  borderRadius:
                                    "12px",
                                  boxShadow:
                                    "none",
                                }}
                              >
                                <i className="bi bi-x-lg me-1" />
                                Remover
                              </motion.button>
                            </div>
                          </motion.article>
                        )
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            <motion.div
              className="col-xl-4"
              {...getSequencedMotion(2, 20)}
            >
              <aside
                className="position-sticky"
                style={{
                  top: "130px",
                  ...panelStyle,
                  padding: "30px",
                }}
              >
                <div className="d-flex align-items-center gap-3 mb-4">
                  <motion.div
                    className="d-flex align-items-center justify-content-center"
                    initial={{
                      opacity: 0,
                      scale: 0.92,
                      rotate: -4,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                    }}
                    transition={{
                      duration: 0.34,
                      ease: "easeOut",
                    }}
                    style={{
                      width: "54px",
                      height: "54px",
                      borderRadius: "18px",
                      background:
                        "rgba(255,179,0,.12)",
                      color: "#ffcf40",
                      border:
                        "1px solid rgba(255,255,255,.08)",
                    }}
                  >
                    <i
                      className="bi bi-receipt"
                      style={{
                        fontSize: "1.4rem",
                      }}
                    />
                  </motion.div>

                  <div>
                    <h3
                      style={{
                        color: "#ffe082",
                        fontWeight: "800",
                        margin: 0,
                      }}
                    >
                      Resumo
                    </h3>

                    <p
                      style={{
                        color:
                          "rgba(255,255,255,.52)",
                        margin: 0,
                      }}
                    >
                      Pedido de{" "}
                      {usuario?.nome_user ||
                        "usuário"}
                    </p>
                  </div>
                </div>

                <div className="d-flex flex-column gap-3">
                  {[
                    [
                      "Produtos",
                      resumo.quantidadeTotal,
                    ],
                    [
                      "Subtotal",
                      formatarPreco(
                        resumo.subtotal
                      ),
                    ],
                    [
                      "Frete estimado",
                      "A combinar",
                    ],
                  ].map(
                    ([label, value], index) => (
                      <motion.div
                        key={label}
                        className="d-flex justify-content-between"
                        {...getSequencedMotion(
                          index,
                          12
                        )}
                        style={{
                          ...innerPanelStyle,
                          borderRadius: "16px",
                          padding: "15px",
                        }}
                      >
                        <span
                          style={{
                            color:
                              "rgba(255,255,255,.58)",
                          }}
                        >
                          {label}
                        </span>

                        <strong
                          style={
                            label ===
                            "Frete estimado"
                              ? {
                                  color:
                                    "#5cff95",
                                }
                              : undefined
                          }
                        >
                          {value}
                        </strong>
                      </motion.div>
                    )
                  )}

                  <motion.div
                    {...getSequencedMotion(3, 8)}
                    style={{
                      height: "1px",
                      background:
                        "rgba(255,255,255,.08)",
                      margin: "8px 0",
                    }}
                  />

                  <motion.div
                    className="d-flex justify-content-between align-items-end"
                    {...getSequencedMotion(4, 12)}
                  >
                    <div>
                      <span
                        style={{
                          display: "block",
                          color:
                            "rgba(255,255,255,.52)",
                          fontSize: ".82rem",
                          textTransform:
                            "uppercase",
                          fontWeight: "800",
                          letterSpacing: ".7px",
                        }}
                      >
                        Total
                      </span>

                      <small
                        style={{
                          color:
                            "rgba(255,255,255,.42)",
                        }}
                      >
                        Sem frete calculado
                      </small>
                    </div>

                    <motion.strong
                      key={resumo.total}
                      initial={{
                        opacity: 0,
                        y: -5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.18,
                        ease: "easeOut",
                      }}
                      style={{
                        color: "#5cff95",
                        fontSize: "1.7rem",
                      }}
                    >
                      {formatarPreco(
                        resumo.total
                      )}
                    </motion.strong>
                  </motion.div>
                </div>

                <motion.button
                  type="submit"
                  disabled={
                    finalizando ||
                    carrinho.length === 0
                  }
                  className="btn w-100 mt-4"
                  whileHover={
                    finalizando ||
                    carrinho.length === 0
                      ? {}
                      : {
                          y: -3,
                        }
                  }
                  whileTap={
                    finalizando ||
                    carrinho.length === 0
                      ? {}
                      : {
                          scale: 0.98,
                        }
                  }
                  style={{
                    ...buttonGradient,
                    padding: "15px",
                    opacity:
                      finalizando ||
                      carrinho.length === 0
                        ? 0.65
                        : 1,
                    cursor:
                      finalizando ||
                      carrinho.length === 0
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {finalizando ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Finalizando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle-fill me-2" />
                      Confirmar Pedido
                    </>
                  )}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() =>
                    router.push("/pedidos")
                  }
                  className="btn btn-outline-light w-100 mt-3"
                  whileHover={{
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  style={{
                    borderRadius: "16px",
                    padding: "13px",
                    fontWeight: "800",
                    boxShadow: "none",
                  }}
                >
                  Ver meus pedidos
                </motion.button>
              </aside>
            </motion.div>
          </div>
        </form>
      </section>
    </motion.main>
  );
}