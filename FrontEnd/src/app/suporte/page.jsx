"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AlertCard from "@/components/AlertCard";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
const SUPORTE_URL = `${API_URL}/api/suporte`;

const inputStyle = {
  background: "#1c1c1c",
  border: "1px solid #3b3b3b",
  color: "white",
  borderRadius: "14px",
  padding: "12px 14px",
  boxShadow: "none",
};

const buttonGradient = {
  background: "linear-gradient(to right, #940533, #ff8800)",
  border: "none",
  color: "white",
  borderRadius: "14px",
  fontWeight: "700",
};

const motionEase = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: motionEase,
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -22,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: motionEase,
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 22,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: motionEase,
    },
  },
};

const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: motionEase,
    },
  },
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

  return decodificarToken(obterToken());
}

function obterNomeUsuario(usuario) {
  return (
    usuario?.nome_user ||
    usuario?.nome ||
    usuario?.name ||
    usuario?.empresa ||
    usuario?.dados?.nome_user ||
    usuario?.dados?.nome ||
    usuario?.dados?.empresa ||
    usuario?.usuario?.nome_user ||
    usuario?.usuario?.nome ||
    usuario?.usuario?.empresa ||
    "Usuário Atrix"
  );
}

function obterIniciaisUsuario(nome) {
  const partes = String(nome || "")
    .trim()
    .split(" ")
    .filter(Boolean);

  if (partes.length === 0) return "UA";

  if (partes.length === 1) {
    return partes[0].slice(0, 2).toUpperCase();
  }

  return `${partes[0][0]}${partes[partes.length - 1][0]}`.toUpperCase();
}

function obterFotoBrutaUsuario(usuario) {
  return (
    usuario?.foto ||
    usuario?.foto_user ||
    usuario?.foto_perfil ||
    usuario?.imagem ||
    usuario?.avatar ||
    usuario?.profile_image ||
    usuario?.dados?.foto ||
    usuario?.dados?.foto_user ||
    usuario?.dados?.foto_perfil ||
    usuario?.dados?.imagem ||
    usuario?.dados?.avatar ||
    usuario?.usuario?.foto ||
    usuario?.usuario?.foto_user ||
    usuario?.usuario?.foto_perfil ||
    usuario?.usuario?.imagem ||
    usuario?.usuario?.avatar ||
    ""
  );
}

function resolverUrlImagemUsuario(imagem) {
  const valorOriginal = String(imagem || "")
    .trim()
    .replace(/\\/g, "/");

  if (!valorOriginal) return "";

  if (
    valorOriginal.startsWith("http://") ||
    valorOriginal.startsWith("https://") ||
    valorOriginal.startsWith("data:image") ||
    valorOriginal.startsWith("blob:")
  ) {
    return valorOriginal;
  }

  if (valorOriginal.startsWith("/")) {
    if (valorOriginal.startsWith("/uploads")) {
      return `${API_URL}${valorOriginal}`;
    }

    return valorOriginal;
  }

  const caminhoLimpo = valorOriginal.replace(/^\/+/, "");

  if (caminhoLimpo.startsWith("uploads/")) {
    return `${API_URL}/${caminhoLimpo}`;
  }

  return `${API_URL}/uploads/imagens/${caminhoLimpo}`;
}

function obterFotoUsuario(usuario) {
  return resolverUrlImagemUsuario(obterFotoBrutaUsuario(usuario));
}

function obterTipoUsuario(usuario) {
  return String(
    usuario?.tipo ||
      usuario?.tipo_user ||
      usuario?.role ||
      usuario?.dados?.tipo ||
      usuario?.dados?.tipo_user ||
      usuario?.usuario?.tipo ||
      usuario?.usuario?.tipo_user ||
      "comum"
  )
    .toLowerCase()
    .trim();
}

function formatarTipoUsuario(tipo) {
  switch (tipo) {
    case "admin":
    case "administrador":
      return "Administrador";
    case "fornecedor":
      return "Fornecedor";
    case "comum":
      return "Cliente comum";
    default:
      return "Usuário";
  }
}

async function lerResposta(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.mensagem || data?.erro || "Não foi possível enviar a solicitação.");
  }

  return data;
}

function mensagemUsuario(error, fallback) {
  const mensagem = String(error?.message || "").trim();

  if (!mensagem || /erro interno|id_|id |não encontrado|não encontrada/i.test(mensagem)) {
    return fallback;
  }

  return mensagem;
}

export default function Suporte() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [fotoUsuarioQuebrou, setFotoUsuarioQuebrou] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("geral");
  const [mensagem, setMensagem] = useState("");
  const [feedback, setFeedback] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    setUsuarioLogado(obterUsuarioLogado());
  }, []);

  useEffect(() => {
    setFotoUsuarioQuebrou(false);
  }, [usuarioLogado]);

  const tipoUsuario = obterTipoUsuario(usuarioLogado);
  const nomeUsuario = obterNomeUsuario(usuarioLogado);
  const fotoUsuario = obterFotoUsuario(usuarioLogado);
  const iniciaisUsuario = obterIniciaisUsuario(nomeUsuario);
  const exibirFotoUsuario = Boolean(fotoUsuario && !fotoUsuarioQuebrou);

  const solucoes = useMemo(
    () => [
      {
        icon: "bi-truck",
        titulo: "Entrega e logística",
        descricao: "Acompanhe atrasos, logística vinculada, transporte e previsão de entrega.",
      },
      {
        icon: "bi-receipt",
        titulo: "Orçamentos",
        descricao: "Veja propostas recebidas, escolha de fornecedor e valores informados.",
      },
      {
        icon: "bi-box-seam",
        titulo: "Encomendas",
        descricao: "Abra chamados sobre peças, descrição incorreta ou problemas no pedido.",
      },
      {
        icon: "bi-person-lock",
        titulo: "Conta e acesso",
        descricao: "Recupere acesso, revise dados do perfil ou informe problemas de login.",
      },
    ],
    []
  );

  const categorias = [
    { value: "geral", label: "Geral" },
    { value: "encomenda", label: "Encomenda" },
    { value: "orcamento", label: "Orçamento" },
    { value: "logistica", label: "Logística" },
    { value: "conta", label: "Conta e acesso" },
  ];

  async function enviarSuporte(event) {
    event?.preventDefault?.();

    setFeedback("");
    setErro("");

    if (!titulo.trim()) {
      setErro("Informe o título do problema.");
      return;
    }

    if (!mensagem.trim()) {
      setErro("Descreva o problema antes de enviar.");
      return;
    }

    const token = obterToken();

    if (!token) {
      setErro("Faça login para enviar uma solicitação de suporte.");
      return;
    }

    try {
      setEnviando(true);

      const response = await fetch(SUPORTE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          assunto: titulo.trim(),
          mensagem: mensagem.trim(),
          categoria,
        }),
      });

      const data = await lerResposta(response);

      setFeedback(data?.mensagem || "Solicitação enviada com sucesso. Nossa equipe acompanhará seu caso.");
      setTitulo("");
      setCategoria("geral");
      setMensagem("");
    } catch (error) {
      console.error("Erro ao enviar suporte:", error);
      setErro(mensagemUsuario(error, "Não foi possível enviar a solicitação agora."));
    } finally {
      setEnviando(false);
    }
  }

  function preencherSolucaoRapida(item) {
    const tituloNormalizado = item.titulo.toLowerCase();

    if (tituloNormalizado.includes("logística") || tituloNormalizado.includes("entrega")) {
      setCategoria("logistica");
    } else if (tituloNormalizado.includes("orçamento")) {
      setCategoria("orcamento");
    } else if (tituloNormalizado.includes("encomenda")) {
      setCategoria("encomenda");
    } else if (tituloNormalizado.includes("conta")) {
      setCategoria("conta");
    } else {
      setCategoria("geral");
    }

    setTitulo(item.titulo);
    setMensagem((mensagemAtual) =>
      mensagemAtual.trim()
        ? mensagemAtual
        : `Olá, preciso de ajuda com: ${item.titulo}.\n\nDetalhes do problema: `
    );

    const form = document.getElementById("form-suporte");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <motion.main
      initial="hidden"
      animate="visible"
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
      <motion.section
        variants={fadeUp}
        className="py-5 text-white"
        style={{
          background: "linear-gradient(135deg,#940533,#c0012a,#f5061d)",
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <div className="container py-4 text-center">
          <motion.span
            variants={scaleIn}
            className="badge bg-warning text-dark mb-3 px-3 py-2"
          >
            Central de Suporte
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="display-4 fw-bold"
            transition={{ delay: 0.08 }}
          >
            Como podemos ajudar?
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="lead mt-3 mb-0"
            transition={{ delay: 0.14 }}
          >
            Abra solicitações, resolva dúvidas e acompanhe problemas do sistema ATRIX Supply.
          </motion.p>
        </div>
      </motion.section>

      <section className="py-5">
        <div className="container-fluid px-4">
          <div className="row g-4">
            <div className="col-lg-3">
              <motion.aside
                variants={fadeLeft}
                className="p-4 rounded-4 shadow-lg position-sticky"
                style={{
                  top: "20px",
                  background: "rgba(17,17,17,.95)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <motion.div
                  variants={scaleIn}
                  className="d-flex align-items-center gap-3 mb-4"
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
                      width: "52px",
                      height: "52px",
                      borderRadius: "16px",
                      background: "rgba(255,136,0,.14)",
                      color: "#ffb300",
                      fontSize: "1.25rem",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    {exibirFotoUsuario ? (
                      <img
                        src={fotoUsuario}
                        alt={`Foto de ${nomeUsuario}`}
                        onError={() => setFotoUsuarioQuebrou(true)}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    ) : (
                      <span
                        aria-label={`Iniciais de ${nomeUsuario}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background:
                            "linear-gradient(135deg, rgba(148,5,51,.78), rgba(192,1,42,.58), rgba(255,136,0,.34))",
                          color: "#ffb300",
                          fontWeight: 900,
                          fontSize: "1rem",
                          letterSpacing: ".5px",
                          textTransform: "uppercase",
                        }}
                      >
                        {iniciaisUsuario}
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="mb-0 text-white fw-bold">
                      {nomeUsuario}
                    </p>

                    <span
                      style={{
                        color: "rgba(255,255,255,.58)",
                        fontSize: ".82rem",
                      }}
                    >
                      {formatarTipoUsuario(tipoUsuario)}
                    </span>
                  </div>
                </motion.div>

                <motion.button
                  type="button"
                  className="btn w-100 mb-4"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const form = document.getElementById("form-suporte");
                    form?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  style={{
                    ...buttonGradient,
                    padding: "12px 16px",
                  }}
                >
                  Abrir solicitação
                </motion.button>

                <div className="d-flex flex-column gap-3">
                  {[
                    {
                      titulo: "Atendimento",
                      valor: "24h",
                      icon: "bi-headset",
                    },
                    {
                      titulo: "Canal seguro",
                      valor: "Ativo",
                      icon: "bi-shield-fill-check",
                    },
                    {
                      titulo: "Categoria",
                      valor: categorias.find((item) => item.value === categoria)?.label || "Geral",
                      icon: "bi-tags",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.titulo}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.16 + index * 0.07, duration: 0.38, ease: motionEase }}
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

                        <strong style={{ fontSize: "1rem" }}>
                          {item.valor}
                        </strong>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.aside>
            </div>

            <div className="col-lg-9">
              <motion.div
                variants={fadeRight}
                className="p-4 p-lg-5 rounded-4 shadow-lg mb-4"
                style={{
                  background: "rgba(17,17,17,.96)",
                  border: "1px solid rgba(255,255,255,.08)",
                }}
              >
                <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap mb-4">
                  <div>
                    <span className="badge bg-dark border text-white mb-3 px-3 py-2">
                      Soluções rápidas
                    </span>

                    <h2 className="fw-bold mb-2">
                      Escolha um tipo de problema
                    </h2>

                    <p className="mb-0" style={{ color: "rgba(255,255,255,.62)" }}>
                      Selecione uma opção abaixo para preencher a solicitação mais rápido.
                    </p>
                  </div>

                  <motion.div
                    className="d-flex align-items-center justify-content-center"
                    animate={{ rotate: [0, 4, -4, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "18px",
                      background: "rgba(255,136,0,.14)",
                      color: "#ffb300",
                      fontSize: "1.45rem",
                    }}
                  >
                    <i className="bi bi-lightning-charge-fill" />
                  </motion.div>
                </div>

                <div className="row g-3">
                  {solucoes.map((item, index) => (
                    <motion.div
                      className="col-md-6"
                      key={item.titulo}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.08, duration: 0.42, ease: motionEase }}
                    >
                      <motion.button
                        type="button"
                        className="text-start w-100 h-100"
                        whileHover={{ y: -4, scale: 1.01 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={() => preencherSolucaoRapida(item)}
                        style={{
                          background: "rgba(255,255,255,.035)",
                          border: "1px solid rgba(255,255,255,.06)",
                          borderRadius: "20px",
                          padding: "20px",
                          color: "white",
                        }}
                      >
                        <div
                          className="d-flex align-items-center justify-content-center mb-3"
                          style={{
                            width: "52px",
                            height: "52px",
                            borderRadius: "16px",
                            background: "rgba(255,136,0,.14)",
                            color: "#ffb300",
                            fontSize: "1.2rem",
                          }}
                        >
                          <i className={`bi ${item.icon}`} />
                        </div>

                        <h5 className="fw-bold mb-2">
                          {item.titulo}
                        </h5>

                        <p
                          className="mb-0"
                          style={{
                            color: "rgba(255,255,255,.62)",
                            lineHeight: 1.6,
                            fontSize: ".92rem",
                          }}
                        >
                          {item.descricao}
                        </p>
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.form
                id="form-suporte"
                onSubmit={enviarSuporte}
                variants={fadeUp}
                className="p-4 p-lg-5 rounded-4 shadow-lg"
                style={{
                  background: "rgba(17,17,17,.96)",
                  border: "1px solid rgba(255,255,255,.08)",
                }}
              >
                <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap mb-4">
                  <div>
                    <span className="badge bg-warning text-dark mb-3 px-3 py-2">
                      Nova solicitação
                    </span>

                    <h2 className="fw-bold mb-2">
                      Enviar chamado para o suporte
                    </h2>

                    <p className="mb-0" style={{ color: "rgba(255,255,255,.62)" }}>
                      Descreva o problema com clareza para a equipe conseguir te ajudar.
                    </p>
                  </div>

                  <motion.div
                    className="d-flex align-items-center justify-content-center"
                    whileHover={{ rotate: -8, scale: 1.05 }}
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "18px",
                      background: "rgba(255,136,0,.14)",
                      color: "#ffb300",
                      fontSize: "1.35rem",
                    }}
                  >
                    <i className="bi bi-send-fill" />
                  </motion.div>
                </div>

                <AnimatePresence mode="wait">
                  {feedback && (
                    <motion.div
                      key="feedback-suporte"
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.26, ease: motionEase }}
                    >
                      <AlertCard
                        variant="success"
                        title="Sucesso"
                        message={feedback}
                      />
                    </motion.div>
                  )}

                  {erro && (
                    <motion.div
                      key="erro-suporte"
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.26, ease: motionEase }}
                    >
                      <AlertCard
                        variant="danger"
                        title="Erro"
                        message={erro}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="row g-3">
                  <motion.div
                    className="col-md-8"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.24, duration: 0.36, ease: motionEase }}
                  >
                    <label className="form-label text-secondary">
                      Título do problema
                    </label>

                    <input
                      type="text"
                      value={titulo}
                      onChange={(event) => setTitulo(event.target.value)}
                      placeholder="Ex: Problema com orçamento"
                      className="form-control"
                      style={inputStyle}
                    />
                  </motion.div>

                  <motion.div
                    className="col-md-4"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.36, ease: motionEase }}
                  >
                    <label className="form-label text-secondary">
                      Categoria
                    </label>

                    <select
                      className="form-select"
                      value={categoria}
                      onChange={(event) => setCategoria(event.target.value)}
                      style={inputStyle}
                    >
                      {categorias.map((item) => (
                        <option key={item.value} value={item.value} style={{ color: "#111" }}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div
                    className="col-12"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.36, duration: 0.36, ease: motionEase }}
                  >
                    <label className="form-label text-secondary">
                      Descrição
                    </label>

                    <textarea
                      rows={7}
                      value={mensagem}
                      onChange={(event) => setMensagem(event.target.value)}
                      placeholder="Explique o que aconteceu, onde aconteceu e qual resultado você esperava."
                      className="form-control"
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                      }}
                    />
                  </motion.div>
                </div>

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4">
                  <span
                    style={{
                      color: "rgba(255,255,255,.45)",
                      fontSize: ".86rem",
                    }}
                  >
                    O chamado será enviado vinculado ao usuário logado.
                  </span>

                  <motion.button
                    type="submit"
                    disabled={enviando}
                    className="btn"
                    whileHover={enviando ? undefined : { y: -2, scale: 1.01 }}
                    whileTap={enviando ? undefined : { scale: 0.98 }}
                    style={{
                      ...buttonGradient,
                      padding: "12px 24px",
                      opacity: enviando ? 0.65 : 1,
                    }}
                  >
                    {enviando ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar solicitação"
                    )}
                  </motion.button>
                </div>
              </motion.form>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
