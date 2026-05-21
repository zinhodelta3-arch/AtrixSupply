"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Image from "next/image";
import { useState } from "react";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([
    {
      id: "#94821",
      produto: "RTX 4090 ASUS ROG",
      status: "Em transporte",
      data: "19 Maio 2026",
      preco: "R$ 12.499,90",
      cor: "#ffb300",
    },
    {
      id: "#94822",
      produto: "Ryzen 9 9950X",
      status: "Processando",
      data: "17 Maio 2026",
      preco: "R$ 4.299,90",
      cor: "#ffcf40",
    },
    {
      id: "#94823",
      produto: "Water Cooler Elite",
      status: "Entregue",
      data: "10 Maio 2026",
      preco: "R$ 899,90",
      cor: "#ffcf40",
    },
    {
      id: "#94824",
      produto: "Monitor Gamer 240Hz",
      status: "Em separação",
      data: "08 Maio 2026",
      preco: "R$ 2.199,90",
      cor: "#ffb300",
    },
    {
      id: "#94825",
      produto: "SSD NVME 2TB",
      status: "Entregue",
      data: "02 Maio 2026",
      preco: "R$ 1.049,90",
      cor: "#ffcf40",
    },
  ]);

  function deletarPedido(id) {
    setPedidos((prev) =>
      prev.filter((pedido) => pedido.id !== id)
    );
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center p-4"
      style={{
        minHeight: "100vh",
        background: `
          radial-gradient(circle at top left, rgba(255,215,120,.05), transparent 25%),
          radial-gradient(circle at bottom right, rgba(192,1,42,.08), transparent 25%),
          linear-gradient(
            145deg,
            #0c0d10 0%,
            #121317 30%,
            #181418 55%,
            #1e1217 100%
          )
        `,
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          height: "90vh",
          background: `
            linear-gradient(
              145deg,
              rgba(22,23,27,.96),
              rgba(28,22,25,.96)
            )
          `,
          borderRadius: "32px",
          overflow: "hidden",
          border: "1px solid rgba(255,215,120,.12)",
          boxShadow: `
            0 25px 60px rgba(221, 25, 25, 0.28),
            0 0 30px rgba(235, 194, 13, 0.10)
          `,
          backdropFilter: "blur(16px)",
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
                  rgba(255,136,0,.45),
                  rgba(192,1,42,.65)
                )
              `,
              borderRight:
                "1px solid rgba(255,255,255,.05)",
            }}
          >
            <div
              className="d-flex flex-column align-items-center"
              style={{
                padding: "45px 30px",
                height: "100%",
              }}
            >
              {/* FOTO */}
              <div
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "28px",
                  overflow: "hidden",
                  position: "relative",
                  border:
                    "3px solid rgba(255,255,255,.18)",
                  boxShadow: `
                    0 20px 40px rgba(0,0,0,.35),
                    0 0 25px rgba(255,179,0,.25)
                  `,
                }}
              >
                <Image
                  src="/core.png"
                  alt="Usuário"
                  fill
                  priority
                  sizes="180px"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* USER */}
              <div
                className="w-100 mt-4"
                style={{
                  background: "rgba(255,255,255,.04)",
                  border:
                    "1px solid rgba(255,255,255,.08)",
                  borderRadius: "22px",
                  padding: "22px",
                  textAlign: "center",
                  backdropFilter: "blur(10px)",
                }}
              >
                <h3
                  style={{
                    color: "#fff4c4",
                    fontWeight: "800",
                    fontSize: "1.45rem",
                    marginBottom: "5px",
                  }}
                >
                  Henrique Vieira
                </h3>

                <span
                  style={{
                    color: "rgba(255,255,255,.75)",
                    fontSize: ".95rem",
                  }}
                >
                  Cliente Premium
                </span>
              </div>

              {/* RESUMO */}
              <div
                className="w-100 mt-4"
                style={{
                  background: "rgba(255,255,255,.03)",
                  border:
                    "1px solid rgba(255,255,255,.06)",
                  borderRadius: "22px",
                  padding: "28px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <h4
                  style={{
                    color: "#fff0a6",
                    fontWeight: "700",
                    marginBottom: "22px",
                    textAlign: "center",
                  }}
                >
                  Resumo
                </h4>

                <div className="d-flex flex-column gap-3">
                  {[
                    {
                      titulo: "Pedidos",
                      valor: pedidos.length,
                    },
                    {
                      titulo: "Em andamento",
                      valor: "03",
                    },
                    {
                      titulo: "Finalizados",
                      valor: "21",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      style={{
                        background:
                          "rgba(255,255,255,.05)",
                        border:
                          "1px solid rgba(255,255,255,.05)",
                        borderRadius: "18px",
                        padding: "16px",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          color: "#ffe082",
                          fontSize: ".82rem",
                          marginBottom: "6px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: ".5px",
                        }}
                      >
                        {item.titulo}
                      </p>

                      <span
                        style={{
                          fontSize: "1.35rem",
                          fontWeight: "800",
                          color: "white",
                        }}
                      >
                        {item.valor}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CONTEÚDO */}
          <div className="col-lg-8">
            <div
              style={{
                padding: "45px 38px",
                height: "90vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* TOPO */}
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                <div>
                  <h1
                    style={{
                      color: "#ffe082",
                      fontWeight: "800",
                      margin: 0,
                      fontSize: "2.3rem",
                    }}
                  >
                    Meus Pedidos
                  </h1>

                  <p
                    style={{
                      color: "rgba(255,255,255,.58)",
                      marginTop: "8px",
                      marginBottom: 0,
                    }}
                  >
                    Acompanhe seus pedidos e status.
                  </p>
                </div>

                <button
                  className="btn"
                  style={{
                    background:
                      "linear-gradient(90deg,#ffcf40,#ff9d00,#c0012a)",
                    color: "white",
                    padding: "14px 28px",
                    borderRadius: "16px",
                    border: "none",
                    fontWeight: "700",
                    boxShadow:
                      "0 12px 24px rgba(192,1,42,.22)",
                  }}
                >
                  Novo Pedido
                </button>
              </div>

              {/* SCROLL */}
              <div
                style={{
                  overflowY: "auto",
                  flex: 1,
                  paddingRight: "6px",
                }}
              >
                <div className="d-flex flex-column gap-4">
                  {pedidos.map((pedido) => (
                    <div
                      key={pedido.id}
                      style={{
                        position: "relative",
                        background: `
                          linear-gradient(
                            145deg,
                            rgba(30,32,38,.95),
                            rgba(38,24,29,.95)
                          )
                        `,
                        borderRadius: "26px",
                        padding: "30px",
                        border:
                          "1px solid rgba(255,255,255,.05)",
                        boxShadow: `
                          inset 0 1px 0 rgba(255,255,255,.03),
                          0 12px 30px rgba(0,0,0,.25)
                        `,
                        overflow: "hidden",
                      }}
                    >
                      {/* DELETE BUTTON */}
                      <button
                        onClick={() =>
                          deletarPedido(pedido.id)
                        }
                        className="btn d-flex align-items-center justify-content-center"
                        style={{
                          position: "absolute",
                          top: "20px",
                          right: "20px",
                          width: "42px",
                          height: "42px",
                          borderRadius: "14px",
                          border:
                            "1px solid rgba(255,255,255,.06)",
                          background: `
                            linear-gradient(
                              145deg,
                              rgba(255,255,255,.04),
                              rgba(255,255,255,.02)
                            )
                          `,
                          backdropFilter: "blur(10px)",
                          color: "#ff758f",
                          transition: "all .25s ease",
                          boxShadow: `
                            inset 0 1px 0 rgba(255,255,255,.03),
                            0 10px 25px rgba(0,0,0,.20)
                          `,
                        }}
                      >
                        <i
                          className="bi bi-trash3-fill"
                          style={{
                            fontSize: "1rem",
                          }}
                        />
                      </button>

                      <div className="row align-items-center">
                        {/* PRODUTO */}
                        <div className="col-md-5 mb-4 mb-md-0">
                          <p
                            style={{
                              color: pedido.cor,
                              marginBottom: "10px",
                              fontWeight: "700",
                              textTransform: "uppercase",
                              letterSpacing: "1px",
                              fontSize: ".78rem",
                            }}
                          >
                            Pedido {pedido.id}
                          </p>

                          <h4
                            style={{
                              color: "white",
                              fontWeight: "700",
                              marginBottom: "12px",
                              fontSize: "1.25rem",
                            }}
                          >
                            {pedido.produto}
                          </h4>

                          <span
                            style={{
                              color:
                                "rgba(255,255,255,.60)",
                            }}
                          >
                            Data: {pedido.data}
                          </span>
                        </div>

                        {/* STATUS */}
                        <div className="col-md-3 mb-4 mb-md-0">
                          <div
                            style={{
                              background:
                                "rgba(255,255,255,.04)",
                              border:
                                "1px solid rgba(255,255,255,.05)",
                              borderRadius: "18px",
                              padding: "16px",
                              textAlign: "center",
                            }}
                          >
                            <p
                              style={{
                                color: pedido.cor,
                                marginBottom: "7px",
                                fontSize: ".78rem",
                                fontWeight: "700",
                                textTransform: "uppercase",
                                letterSpacing: ".8px",
                              }}
                            >
                              Status
                            </p>

                            <span
                              style={{
                                color: "white",
                                fontWeight: "600",
                              }}
                            >
                              {pedido.status}
                            </span>
                          </div>
                        </div>

                        {/* PREÇO */}
                        <div className="col-md-2 mb-4 mb-md-0">
                          <p
                            style={{
                              color: "#ffcf40",
                              marginBottom: "8px",
                              fontWeight: "700",
                              fontSize: ".78rem",
                              textTransform: "uppercase",
                              letterSpacing: ".8px",
                            }}
                          >
                            Valor
                          </p>

                          <span
                            style={{
                              color: "white",
                              fontWeight: "700",
                              fontSize: "1.05rem",
                            }}
                          >
                            {pedido.preco}
                          </span>
                        </div>

                        {/* DETALHES */}
                        <div className="col-md-2 d-flex justify-content-md-end">
                          <button
                            className="btn"
                            style={{
                              background:
                                "rgba(255,255,255,.04)",
                              border:
                                "1px solid rgba(255,179,0,.16)",
                              color: "#ffe082",
                              borderRadius: "14px",
                              padding: "12px 18px",
                              fontWeight: "700",
                              transition: ".2s",
                            }}
                          >
                            Detalhes
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {pedidos.length === 0 && (
                    <div
                      className="d-flex flex-column justify-content-center align-items-center"
                      style={{
                        height: "300px",
                        borderRadius: "28px",
                        border:
                          "1px solid rgba(255,255,255,.06)",
                        background:
                          "rgba(255,255,255,.02)",
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

                      <h3
                        style={{
                          color: "white",
                          fontWeight: "700",
                        }}
                      >
                        Nenhum pedido encontrado
                      </h3>

                      <p
                        style={{
                          color:
                            "rgba(255,255,255,.55)",
                        }}
                      >
                        Todos os pedidos foram removidos.
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