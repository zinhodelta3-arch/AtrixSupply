"use client";

import { useEffect, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

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
    usuario?.dados?.nome_user ||
    usuario?.dados?.nome ||
    usuario?.usuario?.nome_user ||
    usuario?.usuario?.nome ||
    "Usuário Atrix"
  );
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
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("geral");
  const [mensagem, setMensagem] = useState("");
  const [feedback, setFeedback] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    setUsuarioLogado(obterUsuarioLogado());
  }, []);

  const tipoUsuario = obterTipoUsuario(usuarioLogado);
  const nomeUsuario = obterNomeUsuario(usuarioLogado);

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
    <main
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
      <section
        className="py-5 text-white"
        style={{
          background: "linear-gradient(135deg,#940533,#c0012a,#f5061d)",
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <div className="container py-4 text-center">
          <span className="badge bg-warning text-dark mb-3 px-3 py-2">
            Central de Suporte
          </span>

          <h1 className="display-4 fw-bold">
            Como podemos ajudar?
          </h1>

          <p className="lead mt-3 mb-0">
            Abra solicitações, resolva dúvidas e acompanhe problemas do sistema ATRIX Supply.
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
                  background: "rgba(17,17,17,.95)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
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
                    }}
                  >
                    <i className="bi bi-person-circle" />
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
                </div>

                <button
                  type="button"
                  className="btn w-100 mb-4"
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
                </button>

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
                    </div>
                  ))}
                </div>
              </aside>
            </div>

            <div className="col-lg-9">
              <div
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

                  <div
                    className="d-flex align-items-center justify-content-center"
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
                  </div>
                </div>

                <div className="row g-3">
                  {solucoes.map((item) => (
                    <div className="col-md-6" key={item.titulo}>
                      <button
                        type="button"
                        className="text-start w-100 h-100"
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
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <form
                id="form-suporte"
                onSubmit={enviarSuporte}
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

                  <div
                    className="d-flex align-items-center justify-content-center"
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
                  </div>
                </div>

                {feedback && (
                  <div className="alert alert-success border-0" style={{ borderRadius: "16px" }}>
                    {feedback}
                  </div>
                )}

                {erro && (
                  <div className="alert alert-danger border-0" style={{ borderRadius: "16px" }}>
                    {erro}
                  </div>
                )}

                <div className="row g-3">
                  <div className="col-md-8">
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
                  </div>

                  <div className="col-md-4">
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
                  </div>

                  <div className="col-12">
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
                  </div>
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

                  <button
                    type="submit"
                    disabled={enviando}
                    className="btn"
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
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
