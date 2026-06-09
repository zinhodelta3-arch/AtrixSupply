"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Image from "next/image";
import { useState } from "react";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
const SUPORTE_URL = `${API_URL}/api/suporte`;

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

async function lerResposta(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.mensagem || data?.erro || "Não foi possível enviar a solicitação.");
  }

  return data;
}

export default function Suporte() {
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [feedback, setFeedback] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const solucoes = [
    {
      icon: "bi-truck",
      titulo: "Pedido atrasado",
      descricao: "Confira o rastreio atualizado e verifique o endereço cadastrado.",
    },
    {
      icon: "bi-credit-card",
      titulo: "Pagamento recusado",
      descricao: "Verifique os dados do cartão ou tente outro método.",
    },
    {
      icon: "bi-box-seam",
      titulo: "Produto com defeito",
      descricao: "Solicite suporte técnico rapidamente.",
    },
    {
      icon: "bi-person-lock",
      titulo: "Problemas na conta",
      descricao: "Atualize sua senha ou confirme seu e-mail.",
    },
  ];

  async function enviarSuporte() {
    setFeedback("");
    setErro("");

    if (!titulo.trim() || !mensagem.trim()) {
      setErro("Preencha o título e a descrição da solicitação.");
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
          categoria: "geral",
        }),
      });

      await lerResposta(response);

      setFeedback("Solicitação enviada com sucesso. Nossa equipe acompanhará seu caso.");
      setTitulo("");
      setMensagem("");
    } catch (error) {
      setErro(error.message || "Não foi possível enviar a solicitação.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center p-3"
      style={{
        minHeight: "100vh",
        paddingTop: "120px", /* Abre espaço para a navbar flutuante premium não cobrir o conteúdo */
        paddingBottom: "60px",
        background: "transparent", /* Usa o fundo padrão unificado do site para não quebrar as outras páginas */
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1280px",
          minHeight: "86vh",
          borderRadius: "28px",
          overflow: "hidden",
          border: "1px solid rgba(255,215,120,.08)",
          background: `
            linear-gradient(
              145deg,
              rgba(20,21,26,.97),
              rgba(26,18,22,.97)
            )
          `,
          backdropFilter: "blur(14px)",
          boxShadow: `
            0 20px 50px rgba(221,25,25,.18),
            0 0 30px rgba(255,196,0,.06)
          `,
        }}
      >
        <div className="row g-0 h-100">
          {/* SIDEBAR */}
          <div
            className="col-lg-4"
            style={{
              background: `
                linear-gradient(
                  180deg,
                  rgba(255,179,0,.88),
                  rgba(255,136,0,.42),
                  rgba(192,1,42,.72)
                )
              `,
              borderRight: "1px solid rgba(255,255,255,.05)",
            }}
          >
            <div
              className="d-flex flex-column h-100"
              style={{
                padding: "30px 24px",
              }}
            >
              {/* USER */}
              <div
                style={{
                  background: "rgba(255,255,255,.05)",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: "22px",
                  padding: "18px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div
                    style={{
                      width: "74px",
                      height: "74px",
                      borderRadius: "20px",
                      overflow: "hidden",
                      position: "relative",
                      border: "2px solid rgba(255,255,255,.15)",
                    }}
                  >
                    <Image
                      src="/logo.png"
                      alt="Usuário"
                      fill
                      priority
                      sizes="74px"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div>
                    <h4
                      style={{
                        margin: 0,
                        fontWeight: "800",
                        color: "#fff4c4",
                        fontSize: "1.2rem",
                      }}
                    >
                      Usuário Atrix
                    </h4>

                    <span
                      style={{
                        color: "rgba(255,255,255,.72)",
                        fontSize: ".85rem",
                      }}
                    >
                      Central de suporte
                    </span>
                  </div>
                </div>
              </div>

              {/* SUPPORT CARD */}
              <div
                className="mt-4"
                style={{
                  background: `
                    linear-gradient(
                      145deg,
                      rgba(0,0,0,.20),
                      rgba(255,255,255,.04)
                    )
                  `,
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: "24px",
                  padding: "24px",
                }}
              >
                <div
                  className="d-flex justify-content-center align-items-center mb-4"
                  style={{
                    width: "62px",
                    height: "62px",
                    borderRadius: "18px",
                    background: "linear-gradient(145deg,#ffcf40,#ff9500,#c0012a)",
                    color: "white",
                    fontSize: "1.5rem",
                    boxShadow: "0 10px 22px rgba(192,1,42,.20)",
                  }}
                >
                  <i className="bi bi-headset" />
                </div>

                <h4
                  style={{
                    color: "#fff0a6",
                    fontWeight: "800",
                    marginBottom: "12px",
                    fontSize: "1.3rem",
                  }}
                >
                  Precisa de ajuda?
                </h4>

                <p
                  style={{
                    color: "rgba(255,255,255,.68)",
                    lineHeight: 1.7,
                    marginBottom: "20px",
                    fontSize: ".92rem",
                  }}
                >
                  Nossa equipe está pronta para ajudar você rapidamente.
                </p>

                <button
                  className="btn w-100"
                  style={{
                    background: "linear-gradient(90deg,#ffcf40,#ff9d00,#c0012a)",
                    border: "none",
                    borderRadius: "16px",
                    color: "white",
                    padding: "13px",
                    fontWeight: "700",
                    fontSize: ".92rem",
                  }}
                >
                  Abrir solicitação
                </button>
              </div>

              {/* FOOTER */}
              <div
                className="mt-auto"
                style={{
                  background: "rgba(255,255,255,.05)",
                  border: "1px solid rgba(255,255,255,.06)",
                  borderRadius: "22px",
                  padding: "18px",
                }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "16px",
                      background: "linear-gradient(145deg,#ffcf40,#c0012a)",
                      color: "white",
                      fontSize: "1rem",
                    }}
                  >
                    <i className="bi bi-shield-fill-check" />
                  </div>

                  <div>
                    <h6
                      style={{
                        margin: 0,
                        fontWeight: "800",
                        color: "#fff0a6",
                      }}
                    >
                      Suporte seguro
                    </h6>

                    <span
                      style={{
                        color: "rgba(255,255,255,.68)",
                        fontSize: ".78rem",
                      }}
                    >
                      Atendimento protegido
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="col-lg-8">
            <div
              style={{
                padding: "34px",
              }}
            >
              {/* HEADER */}
              <div className="mb-4">
                <h1
                  style={{
                    color: "#ffe082",
                    fontWeight: "800",
                    fontSize: "2.2rem",
                    marginBottom: "10px",
                  }}
                >
                  Central de Suporte
                </h1>

                <p
                  style={{
                    color: "rgba(255,255,255,.58)",
                    margin: 0,
                    fontSize: ".95rem",
                  }}
                >
                  Resolva problemas rapidamente ou envie uma solicitação personalizada.
                </p>
              </div>

              {/* SOLUTIONS */}
              <div className="mb-4">
                <h5
                  style={{
                    color: "#fff0a6",
                    fontWeight: "700",
                    marginBottom: "20px",
                  }}
                >
                  Soluções rápidas
                </h5>

                <div className="row g-3">
                  {solucoes.map((item, index) => (
                    <div className="col-md-6" key={index}>
                      <div
                        style={{
                          height: "100%",
                          background: `
                            linear-gradient(
                              145deg,
                              rgba(30,32,38,.95),
                              rgba(38,24,29,.95)
                            )
                          `,
                          borderRadius: "22px",
                          padding: "22px",
                          border: "1px solid rgba(255,255,255,.05)",
                          boxShadow: "0 10px 24px rgba(0,0,0,.18)",
                        }}
                      >
                        <div
                          className="d-flex justify-content-center align-items-center mb-3"
                          style={{
                            width: "58px",
                            height: "58px",
                            borderRadius: "18px",
                            background: "linear-gradient(145deg,#ffcf40,#ff9500,#c0012a)",
                            color: "white",
                            fontSize: "1.3rem",
                          }}
                        >
                          <i className={`bi ${item.icon}`} />
                        </div>

                        <h6
                          style={{
                            color: "white",
                            fontWeight: "700",
                            marginBottom: "10px",
                            fontSize: "1rem",
                          }}
                        >
                          {item.titulo}
                        </h6>

                        <p
                          style={{
                            color: "rgba(255,255,255,.62)",
                            margin: 0,
                            lineHeight: 1.7,
                            fontSize: ".86rem",
                        }}
                        >
                          {item.descricao}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FORM */}
              <div
                style={{
                  background: `
                    linear-gradient(
                      145deg,
                      rgba(30,32,38,.95),
                      rgba(38,24,29,.95)
                    )
                  `,
                  borderRadius: "26px",
                  padding: "30px",
                  border: "1px solid rgba(255,255,255,.05)",
                  boxShadow: "0 12px 30px rgba(0,0,0,.18)",
                }}
              >
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "18px",
                      background: "linear-gradient(145deg,#ffcf40,#ff9500,#c0012a)",
                      color: "white",
                      fontSize: "1.3rem",
                    }}
                  >
                    <i className="bi bi-send-fill" />
                  </div>

                  <div>
                    <h4
                      style={{
                        margin: 0,
                        color: "#fff0a6",
                        fontWeight: "800",
                        fontSize: "1.3rem",
                      }}
                    >
                      Enviar solicitação
                    </h4>

                    <span
                      style={{
                        color: "rgba(255,255,255,.58)",
                        fontSize: ".86rem",
                      }}
                    >
                      Descreva detalhadamente o problema.
                    </span>
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

                <div className="mb-3">
                  <label
                    className="form-label"
                    style={{
                      color: "#ffe082",
                      fontWeight: "700",
                      fontSize: ".9rem",
                    }}
                  >
                    Título do problema
                  </label>

                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Ex: Problema com entrega"
                    className="form-control"
                    style={{
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid rgba(255,255,255,.08)",
                      borderRadius: "16px",
                      color: "white",
                      padding: "14px",
                      height: "52px",
                      fontSize: ".92rem",
                      boxShadow: "none",
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="form-label"
                    style={{
                      color: "#ffe082",
                      fontWeight: "700",
                      fontSize: ".9rem",
                    }}
                  >
                    Descrição
                  </label>

                  <textarea
                    rows={6}
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    placeholder="Descreva seu problema..."
                    className="form-control"
                    style={{
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid rgba(255,255,255,.08)",
                      borderRadius: "16px",
                      color: "white",
                      padding: "16px",
                      resize: "none",
                      fontSize: ".92rem",
                      boxShadow: "none",
                    }}
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <span
                    style={{
                      color: "rgba(255,255,255,.42)",
                      fontSize: ".82rem",
                    }}
                  >
                    Atendimento disponível 24 horas.
                  </span>

                  <button
                    onClick={enviarSuporte}
                    disabled={enviando}
                    className="btn"
                    style={{
                      background: "linear-gradient(90deg,#ffcf40,#ff9d00,#c0012a)",
                      color: "white",
                      padding: "13px 26px",
                      borderRadius: "16px",
                      border: "none",
                      fontWeight: "700",
                      fontSize: ".9rem",
                    }}
                  >
                    {enviando ? "Enviando..." : "Enviar solicitação"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
