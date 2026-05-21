"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Image from "next/image";
import { useState } from "react";

export default function LogisticaFornecedor() {
  const [entregas, setEntregas] = useState([
    {
      id: "#LG9021",
      produto: "RTX 4090 ASUS ROG STRIX",
      destino: "São Paulo, SP",
      status: "Em rota",
      motorista: "Carlos Henrique",
      prazo: "22 Maio 2026",
      progresso: 82,
      cor: "#ffb300",
    },
    {
      id: "#LG9022",
      produto: "Ryzen 9 9950X",
      destino: "Rio de Janeiro, RJ",
      status: "Em preparo",
      motorista: "Marcos Silva",
      prazo: "23 Maio 2026",
      progresso: 45,
      cor: "#ffcf40",
    },
    {
      id: "#LG9023",
      produto: "SSD NVME 2TB",
      destino: "Curitiba, PR",
      status: "Entregue",
      motorista: "Felipe Costa",
      prazo: "20 Maio 2026",
      progresso: 100,
      cor: "#5cff95",
    },
    {
      id: "#LG9024",
      produto: "Monitor Gamer 240Hz",
      destino: "Belo Horizonte, MG",
      status: "Carga não localizada",
      motorista: "André Lima",
      prazo: "24 Maio 2026",
      progresso: 18,
      cor: "#ff8a65",
    },
  ]);

  function removerEntrega(id) {
    setEntregas((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `
          radial-gradient(circle at top left, rgba(255,179,0,.06), transparent 25%),
          radial-gradient(circle at bottom right, rgba(192,1,42,.10), transparent 25%),
          linear-gradient(
            145deg,
            #0c0d10 0%,
            #121317 30%,
            #181418 55%,
            #1d1218 100%
          )
        `,
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}
      <div
        className="px-4 px-lg-5 py-4 d-flex justify-content-between align-items-center flex-wrap gap-3"
        style={{
          borderBottom:
            "1px solid rgba(255,255,255,.05)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "20px",
              background: `
                linear-gradient(
                  145deg,
                  rgba(255,179,0,.25),
                  rgba(192,1,42,.18)
                )
              `,
              border:
                "1px solid rgba(255,255,255,.08)",
            }}
          >
            <i
              className="bi bi-truck"
              style={{
                fontSize: "1.6rem",
                color: "#ffcf40",
              }}
            />
          </div>

          <div>
            <h1
              style={{
                margin: 0,
                fontWeight: "800",
                fontSize: "2rem",
                background:
                  "linear-gradient(90deg,#ffcf40,#ff9d00,#c0012a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Painel Logístico
            </h1>

            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,.55)",
              }}
            >
              Controle de entregas e distribuição
            </p>
          </div>
        </div>

        <button
          className="btn"
          style={{
            background:
              "linear-gradient(90deg,#ffcf40,#ff9d00,#c0012a)",
            border: "none",
            color: "white",
            borderRadius: "16px",
            padding: "14px 24px",
            fontWeight: "700",
            boxShadow:
              "0 12px 24px rgba(192,1,42,.24)",
          }}
        >
          <i className="bi bi-plus-circle-fill me-2" />
          Nova Entrega
        </button>
      </div>

      {/* CONTEÚDO */}
      <div className="container-fluid px-4 px-lg-5 py-5">
        <div className="row g-4">
          {/* SIDEBAR */}
          <div className="col-xl-3">
            <div
              style={{
                background: `
                  linear-gradient(
                    145deg,
                    rgba(22,23,27,.96),
                    rgba(28,22,25,.96)
                  )
                `,
                borderRadius: "30px",
                padding: "30px",
                border:
                  "1px solid rgba(255,215,120,.10)",
                height: "100%",
                boxShadow: `
                  0 25px 60px rgba(221,25,25,.18),
                  0 0 25px rgba(235,194,13,.06)
                `,
              }}
            >
              {/* PERFIL */}
              <div className="text-center">
                <div
                  style={{
                    width: "140px",
                    height: "140px",
                    margin: "0 auto",
                    borderRadius: "28px",
                    overflow: "hidden",
                    position: "relative",
                    border:
                      "2px solid rgba(255,255,255,.08)",
                    boxShadow:
                      "0 20px 40px rgba(0,0,0,.35)",
                  }}
                >
                  <Image
                    src="/core.png"
                    alt="Fornecedor"
                    fill
                    priority
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>

                <h3
                  style={{
                    marginTop: "22px",
                    fontWeight: "800",
                    color: "#ffe082",
                  }}
                >
                  Supplier Prime
                </h3>

                <p
                  style={{
                    color: "rgba(255,255,255,.55)",
                    marginBottom: 0,
                  }}
                >
                  Central logística premium
                </p>
              </div>

              {/* MÉTRICAS */}
              <div className="d-flex flex-column gap-3 mt-5">
                {[
                  {
                    titulo: "Em Transporte",
                    valor: "07",
                    icon: "bi-box-seam",
                  },
                  {
                    titulo: "Finalizadas",
                    valor: "142",
                    icon: "bi-check-circle",
                  },
                  {
                    titulo: "Motoristas",
                    valor: "12",
                    icon: "bi-person-badge",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center gap-3"
                    style={{
                      background:
                        "rgba(255,255,255,.03)",
                      border:
                        "1px solid rgba(255,255,255,.05)",
                      borderRadius: "20px",
                      padding: "18px",
                    }}
                  >
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "16px",
                        background:
                          "rgba(255,179,0,.12)",
                      }}
                    >
                      <i
                        className={`bi ${item.icon}`}
                        style={{
                          color: "#ffcf40",
                          fontSize: "1.2rem",
                        }}
                      />
                    </div>

                    <div>
                      <p
                        style={{
                          margin: 0,
                          color:
                            "rgba(255,255,255,.58)",
                          fontSize: ".82rem",
                        }}
                      >
                        {item.titulo}
                      </p>

                      <span
                        style={{
                          fontWeight: "800",
                          fontSize: "1.2rem",
                        }}
                      >
                        {item.valor}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DIREITA */}
          <div className="col-xl-9">
            <div
              style={{
                background: `
                  linear-gradient(
                    145deg,
                    rgba(22,23,27,.96),
                    rgba(28,22,25,.96)
                  )
                `,
                borderRadius: "30px",
                border:
                  "1px solid rgba(255,215,120,.10)",
                padding: "35px",
                height: "100%",
                boxShadow: `
                  0 25px 60px rgba(221,25,25,.18),
                  0 0 25px rgba(235,194,13,.06)
                `,
              }}
            >
              {/* TOPO */}
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                <div>
                  <h2
                    style={{
                      color: "#ffe082",
                      fontWeight: "800",
                      marginBottom: "8px",
                    }}
                  >
                    Monitoramento de Entregas
                  </h2>

                  <p
                    style={{
                      margin: 0,
                      color: "rgba(255,255,255,.55)",
                    }}
                  >
                    Visualize o andamento das cargas.
                  </p>
                </div>

                <div
                  className="d-flex align-items-center gap-2"
                  style={{
                    background:
                      "rgba(255,255,255,.03)",
                    border:
                      "1px solid rgba(255,255,255,.05)",
                    borderRadius: "16px",
                    padding: "12px 16px",
                    minWidth: "260px",
                  }}
                >
                  <i
                    className="bi bi-search"
                    style={{
                      color: "#ffcf40",
                    }}
                  />

                  <input
                    type="text"
                    placeholder="Buscar entrega..."
                    style={{
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: "white",
                      width: "100%",
                    }}
                  />
                </div>
              </div>

              {/* LISTA */}
              <div
                style={{
                  maxHeight: "72vh",
                  overflowY: "auto",
                  paddingRight: "6px",
                }}
              >
                <div className="d-flex flex-column gap-4">
                  {entregas.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        position: "relative",
                        background: `
                          linear-gradient(
                            145deg,
                            rgba(30,32,38,.95),
                            rgba(38,24,29,.95)
                          )
                        `,
                        borderRadius: "28px",
                        padding: "28px",
                        border:
                          "1px solid rgba(255,255,255,.05)",
                        overflow: "hidden",
                      }}
                    >
                      {/* REMOVER */}
                      <button
                        onClick={() =>
                          removerEntrega(item.id)
                        }
                        className="btn"
                        style={{
                          position: "absolute",
                          top: "18px",
                          right: "18px",
                          width: "42px",
                          height: "42px",
                          borderRadius: "14px",
                          background:
                            "rgba(255,255,255,.04)",
                          border:
                            "1px solid rgba(255,255,255,.05)",
                          color: "#ff758f",
                        }}
                      >
                        <i className="bi bi-trash3-fill" />
                      </button>

                      <div className="row g-4 align-items-center">
                        {/* INFO */}
                        <div className="col-lg-4">
                          <p
                            style={{
                              color: item.cor,
                              fontWeight: "700",
                              marginBottom: "10px",
                              fontSize: ".82rem",
                              textTransform: "uppercase",
                              letterSpacing: ".8px",
                            }}
                          >
                            Entrega {item.id}
                          </p>

                          <h4
                            style={{
                              fontWeight: "700",
                              marginBottom: "14px",
                            }}
                          >
                            {item.produto}
                          </h4>

                          <div className="d-flex flex-column gap-2">
                            <span
                              style={{
                                color:
                                  "rgba(255,255,255,.65)",
                              }}
                            >
                              <i className="bi bi-geo-alt me-2" />
                              {item.destino}
                            </span>

                            <span
                              style={{
                                color:
                                  "rgba(255,255,255,.65)",
                              }}
                            >
                              <i className="bi bi-person me-2" />
                              {item.motorista}
                            </span>
                          </div>
                        </div>

                        {/* STATUS */}
                        <div className="col-lg-3">
                          <div
                            style={{
                              background:
                                "rgba(255,255,255,.03)",
                              border:
                                "1px solid rgba(255,255,255,.05)",
                              borderRadius: "22px",
                              padding: "22px",
                            }}
                          >
                            <p
                              style={{
                                color: item.cor,
                                fontWeight: "700",
                                marginBottom: "10px",
                                textTransform: "uppercase",
                                fontSize: ".78rem",
                                letterSpacing: ".7px",
                              }}
                            >
                              Status
                            </p>

                            <h5
                              style={{
                                margin: 0,
                                fontWeight: "700",
                              }}
                            >
                              {item.status}
                            </h5>
                          </div>
                        </div>

                        {/* PROGRESSO */}
                        <div className="col-lg-3">
                          <p
                            style={{
                              color: "#ffcf40",
                              fontWeight: "700",
                              marginBottom: "12px",
                              textTransform: "uppercase",
                              fontSize: ".78rem",
                            }}
                          >
                            Progresso
                          </p>

                          <div
                            style={{
                              width: "100%",
                              height: "14px",
                              borderRadius: "999px",
                              background:
                                "rgba(255,255,255,.05)",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                width: `${item.progresso}%`,
                                height: "100%",
                                borderRadius: "999px",
                                background: `
                                  linear-gradient(
                                    90deg,
                                    #ffcf40,
                                    #ff9d00,
                                    #c0012a
                                  )
                                `,
                              }}
                            />
                          </div>

                          <span
                            style={{
                              marginTop: "10px",
                              display: "block",
                              color:
                                "rgba(255,255,255,.65)",
                            }}
                          >
                            {item.progresso}% concluído
                          </span>
                        </div>

                        {/* PRAZO */}
                        <div className="col-lg-2 d-flex justify-content-lg-end">
                          <div
                            style={{
                              textAlign: "right",
                            }}
                          >
                            <p
                              style={{
                                color:
                                  "rgba(255,255,255,.5)",
                                marginBottom: "8px",
                                fontSize: ".78rem",
                                textTransform: "uppercase",
                              }}
                            >
                              Prazo
                            </p>

                            <h6
                              style={{
                                color: "#ffe082",
                                fontWeight: "700",
                                margin: 0,
                              }}
                            >
                              {item.prazo}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {entregas.length === 0 && (
                    <div
                      className="d-flex flex-column justify-content-center align-items-center"
                      style={{
                        height: "320px",
                        borderRadius: "28px",
                        background:
                          "rgba(255,255,255,.02)",
                        border:
                          "1px solid rgba(255,255,255,.06)",
                      }}
                    >
                      <i
                        className="bi bi-truck"
                        style={{
                          fontSize: "4rem",
                          color: "#ffcf40",
                          marginBottom: "18px",
                        }}
                      />

                      <h3
                        style={{
                          fontWeight: "700",
                        }}
                      >
                        Nenhuma entrega ativa
                      </h3>

                      <p
                        style={{
                          color:
                            "rgba(255,255,255,.55)",
                        }}
                      >
                        Todas as entregas foram removidas.
                      </p>
                    </div>
                  )}

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}