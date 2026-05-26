"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Image from "next/image";
import { useMemo, useState } from "react";

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState([
    {
      id: 1,
      produto: "RTX 4090 ASUS ROG",
      preco: 12499.9,
      quantidade: 1,
      imagem: "/core.png",
      categoria: "Placa de Vídeo",
    },
    {
      id: 2,
      produto: "Ryzen 9 9950X",
      preco: 4299.9,
      quantidade: 1,
      imagem: "/core.png",
      categoria: "Processador",
    },
    {
      id: 3,
      produto: "SSD NVME 2TB",
      preco: 1049.9,
      quantidade: 2,
      imagem: "/core.png",
      categoria: "Armazenamento",
    },
  ]);

  function aumentarQuantidade(id) {
    setCarrinho((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantidade: item.quantidade + 1,
            }
          : item
      )
    );
  }

  function diminuirQuantidade(id) {
    setCarrinho((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantidade:
                item.quantidade > 1
                  ? item.quantidade - 1
                  : 1,
            }
          : item
      )
    );
  }

  function removerProduto(id) {
    setCarrinho((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  const subtotal = useMemo(() => {
    return carrinho.reduce(
      (acc, item) =>
        acc + item.preco * item.quantidade,
      0
    );
  }, [carrinho]);

  const frete = subtotal > 0 ? 49.9 : 0;

  const total = subtotal + frete;

  function formatar(valor) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
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
          maxWidth: "1400px",
          minHeight: "90vh",
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
        <div className="row g-0">
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
              className="d-flex flex-column"
              style={{
                padding: "40px 30px",
                height: "100%",
              }}
            >
              <div
                className="d-flex align-items-center gap-3 mb-4"
              >
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "22px",
                    overflow: "hidden",
                    position: "relative",
                    border:
                      "2px solid rgba(255,255,255,.15)",
                  }}
                >
                  <Image
                    src="/core.png"
                    alt="Usuário"
                    fill
                    sizes="70px"
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
                    }}
                  >
                    Henrique Vieira
                  </h4>

                  <span
                    style={{
                      color:
                        "rgba(255,255,255,.75)",
                    }}
                  >
                    Cliente Premium
                  </span>
                </div>
              </div>

              {/* RESUMO */}
              <div
                style={{
                  background:
                    "rgba(255,255,255,.04)",
                  border:
                    "1px solid rgba(255,255,255,.08)",
                  borderRadius: "26px",
                  padding: "28px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <h3
                  style={{
                    color: "#fff0a6",
                    fontWeight: "800",
                    marginBottom: "28px",
                  }}
                >
                  Resumo do Carrinho
                </h3>

                <div className="d-flex flex-column gap-3">
                  <div
                    style={{
                      background:
                        "rgba(255,255,255,.05)",
                      borderRadius: "18px",
                      padding: "18px",
                    }}
                  >
                    <div className="d-flex justify-content-between">
                      <span
                        style={{
                          color:
                            "rgba(255,255,255,.7)",
                        }}
                      >
                        Produtos
                      </span>

                      <strong>
                        {carrinho.length}
                      </strong>
                    </div>
                  </div>

                  <div
                    style={{
                      background:
                        "rgba(255,255,255,.05)",
                      borderRadius: "18px",
                      padding: "18px",
                    }}
                  >
                    <div className="d-flex justify-content-between">
                      <span
                        style={{
                          color:
                            "rgba(255,255,255,.7)",
                        }}
                      >
                        Subtotal
                      </span>

                      <strong>
                        {formatar(subtotal)}
                      </strong>
                    </div>
                  </div>

                  <div
                    style={{
                      background:
                        "rgba(255,255,255,.05)",
                      borderRadius: "18px",
                      padding: "18px",
                    }}
                  >
                    <div className="d-flex justify-content-between">
                      <span
                        style={{
                          color:
                            "rgba(255,255,255,.7)",
                        }}
                      >
                        Frete
                      </span>

                      <strong>
                        {formatar(frete)}
                      </strong>
                    </div>
                  </div>

                  <div
                    style={{
                      background: `
                        linear-gradient(
                          90deg,
                          rgba(255,207,64,.15),
                          rgba(192,1,42,.18)
                        )
                      `,
                      border:
                        "1px solid rgba(255,255,255,.08)",
                      borderRadius: "22px",
                      padding: "22px",
                      marginTop: "10px",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <span
                        style={{
                          fontWeight: "700",
                          color: "#ffe082",
                          fontSize: "1.1rem",
                        }}
                      >
                        Total
                      </span>

                      <strong
                        style={{
                          fontSize: "1.5rem",
                        }}
                      >
                        {formatar(total)}
                      </strong>
                    </div>
                  </div>

                  <button
                    className="btn mt-3"
                    style={{
                      background:
                        "linear-gradient(90deg,#ffcf40,#ff9d00,#c0012a)",
                      color: "white",
                      border: "none",
                      borderRadius: "18px",
                      padding: "16px",
                      fontWeight: "800",
                      fontSize: "1rem",
                      boxShadow:
                        "0 15px 30px rgba(192,1,42,.22)",
                    }}
                  >
                    Finalizar Compra
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CONTEÚDO */}
          <div className="col-lg-8">
            <div
              style={{
                padding: "40px",
                height: "90vh",
                overflowY: "auto",
              }}
            >
              {/* TOPO */}
              <div className="mb-4">
                <h1
                  style={{
                    color: "#ffe082",
                    fontWeight: "800",
                    fontSize: "2.4rem",
                    marginBottom: "8px",
                  }}
                >
                  Meu Carrinho
                </h1>

                <p
                  style={{
                    color:
                      "rgba(255,255,255,.58)",
                    marginBottom: 0,
                  }}
                >
                  Confira seus produtos antes
                  de finalizar a compra.
                </p>
              </div>

              <div className="d-flex flex-column gap-4">
                {carrinho.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: `
                        linear-gradient(
                          145deg,
                          rgba(30,32,38,.95),
                          rgba(38,24,29,.95)
                        )
                      `,
                      borderRadius: "28px",
                      padding: "24px",
                      border:
                        "1px solid rgba(255,255,255,.05)",
                      boxShadow: `
                        inset 0 1px 0 rgba(255,255,255,.03),
                        0 12px 30px rgba(0,0,0,.25)
                      `,
                    }}
                  >
                    <div className="row align-items-center">
                      {/* IMAGEM */}
                      <div className="col-md-2 mb-4 mb-md-0">
                        <div
                          style={{
                            width: "110px",
                            height: "110px",
                            borderRadius: "24px",
                            overflow: "hidden",
                            position: "relative",
                            background:
                              "rgba(255,255,255,.04)",
                            border:
                              "1px solid rgba(255,255,255,.05)",
                          }}
                        >
                          <Image
                            src={item.imagem}
                            alt={item.produto}
                            fill
                            sizes="110px"
                            style={{
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </div>

                      {/* INFO */}
                      <div className="col-md-4 mb-4 mb-md-0">
                        <span
                          style={{
                            color: "#ffcf40",
                            fontSize: ".8rem",
                            fontWeight: "700",
                            textTransform:
                              "uppercase",
                            letterSpacing: ".8px",
                          }}
                        >
                          {item.categoria}
                        </span>

                        <h4
                          style={{
                            marginTop: "10px",
                            color: "white",
                            fontWeight: "700",
                          }}
                        >
                          {item.produto}
                        </h4>

                        <span
                          style={{
                            color:
                              "rgba(255,255,255,.6)",
                          }}
                        >
                          Produto Premium
                        </span>
                      </div>

                      {/* QUANTIDADE */}
                      <div className="col-md-3 mb-4 mb-md-0">
                        <div
                          className="d-flex align-items-center justify-content-center gap-3"
                          style={{
                            background:
                              "rgba(255,255,255,.04)",
                            border:
                              "1px solid rgba(255,255,255,.05)",
                            borderRadius: "18px",
                            padding: "12px",
                            width: "fit-content",
                          }}
                        >
                          <button
                            className="btn"
                            onClick={() =>
                              diminuirQuantidade(
                                item.id
                              )
                            }
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "12px",
                              background:
                                "rgba(255,255,255,.05)",
                              color: "white",
                              border: "none",
                            }}
                          >
                            <i className="bi bi-dash-lg" />
                          </button>

                          <span
                            style={{
                              fontWeight: "700",
                              minWidth: "20px",
                              textAlign: "center",
                            }}
                          >
                            {item.quantidade}
                          </span>

                          <button
                            className="btn"
                            onClick={() =>
                              aumentarQuantidade(
                                item.id
                              )
                            }
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "12px",
                              background:
                                "linear-gradient(90deg,#ffcf40,#ff9d00)",
                              color: "white",
                              border: "none",
                            }}
                          >
                            <i className="bi bi-plus-lg" />
                          </button>
                        </div>
                      </div>

                      {/* PREÇO + REMOVER */}
                      <div className="col-md-3">
                        <div className="d-flex flex-column align-items-md-end gap-3">
                          <strong
                            style={{
                              fontSize: "1.25rem",
                              color: "#ffe082",
                            }}
                          >
                            {formatar(
                              item.preco *
                                item.quantidade
                            )}
                          </strong>

                          <button
                            className="btn"
                            onClick={() =>
                              removerProduto(
                                item.id
                              )
                            }
                            style={{
                              background:
                                "rgba(255,255,255,.04)",
                              border:
                                "1px solid rgba(255,255,255,.05)",
                              color: "#ff758f",
                              borderRadius: "14px",
                              padding:
                                "10px 16px",
                              fontWeight: "700",
                            }}
                          >
                            <i className="bi bi-trash3-fill me-2" />
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {carrinho.length === 0 && (
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{
                      height: "420px",
                      borderRadius: "28px",
                      border:
                        "1px solid rgba(255,255,255,.06)",
                      background:
                        "rgba(255,255,255,.02)",
                    }}
                  >
                    <i
                      className="bi bi-cart-x"
                      style={{
                        fontSize: "5rem",
                        color: "#ffcf40",
                        marginBottom: "18px",
                      }}
                    />

                    <h2
                      style={{
                        color: "white",
                        fontWeight: "800",
                      }}
                    >
                      Seu carrinho está vazio
                    </h2>

                    <p
                      style={{
                        color:
                          "rgba(255,255,255,.55)",
                      }}
                    >
                      Adicione produtos para
                      continuar.
                    </p>

                    <button
                      className="btn mt-3"
                      style={{
                        background:
                          "linear-gradient(90deg,#ffcf40,#ff9d00,#c0012a)",
                        color: "white",
                        border: "none",
                        borderRadius: "16px",
                        padding:
                          "14px 28px",
                        fontWeight: "700",
                      }}
                    >
                      Explorar Produtos
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}