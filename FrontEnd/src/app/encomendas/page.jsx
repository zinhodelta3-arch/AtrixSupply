"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./page.css";

import Image from "next/image";
import { useState } from "react";

export default function Encomendas() {
  const [encomendas, setEncomendas] = useState([
    {
      id: "#94821",
      produto: "RTX 4090 ASUS ROG",
      status: "Em transporte",
      data: "19 Maio 2026",
      preco: "R$ 12.499,90",
      cor: "#ffb300",
       descricao:
    "Placa de vídeo enviada via transporte expresso com seguro total.",

      orcamentos: [
        {
          empresa: "Kabum",
          valor: "R$ 12.499,90",
        },
        {
          empresa: "Terabyte",
          valor: "R$ 12.899,90",
        },
        {
          empresa: "Pichau",
          valor: "R$ 12.350,00",
        },
      ],
    },

    {
      id: "#94822",
      produto: "Ryzen 9 9950X",
      status: "Processando",
      data: "17 Maio 2026",
      preco: "R$ 4.299,90",
      cor: "#ffcf40",
       descricao:
    "Placa de vídeo enviada via transporte expresso com seguro total.",

      orcamentos: [
        {
          empresa: "Kabum",
          valor: "R$ 4.299,90",
        },
        {
          empresa: "Terabyte",
          valor: "R$ 4.450,00",
        },
        {
          empresa: "Pichau",
          valor: "R$ 4.180,00",
        },
      ],
    },

    {
      id: "#94823",
      produto: "Water Cooler Elite",
      status: "Entregue",
      data: "10 Maio 2026",
      preco: "R$ 899,90",
      cor: "#6dff8b",
       descricao:
    "Placa de vídeo enviada via transporte expresso com seguro total.",

      orcamentos: [
        {
          empresa: "Kabum",
          valor: "R$ 899,90",
        },
        {
          empresa: "Terabyte",
          valor: "R$ 949,90",
        },
        {
          empresa: "Pichau",
          valor: "R$ 879,90",
        },
      ],
    },
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  const [encomendaSelecionada, setEncomendaSelecionada] = useState(null);

  // NOVOS STATES
const [modalCriar, setModalCriar] = useState(false);

const [novaEncomenda, setNovaEncomenda] = useState({
  produto: "",
  descricao: "",
});

  function deletarEncomenda(id) {
    setEncomendas((prev) =>
      prev.filter((encomenda) => encomenda.id !== id)
    );
  }


  function criarEncomenda() {
  if (
    !novaEncomenda.produto ||
    !novaEncomenda.descricao
  )
    return;

  const nova = {
    id: `#${Math.floor(Math.random() * 90000) + 10000}`,
    produto: novaEncomenda.produto,
    descricao: novaEncomenda.descricao,

    status: "Processando",
    data: "26 Maio 2026",
    preco: "R$ 0,00",
    cor: "#ffcf40",

    orcamentos: [
      {
        empresa: "Kabum",
        valor: "R$ 0,00",
      },
    ],
  };

  setEncomendas((prev) => [
    nova,
    ...prev,
  ]);

  setNovaEncomenda({
    produto: "",
    descricao: "",
  });

  setModalCriar(false);
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
                  0deg,
                  rgba(0, 0, 0, 0.88),
                  rgba(255, 17, 0, 0.88),
                  rgba(156, 0, 34, 0.65)
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
                  src="/fisheye.png"
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
                  Bida
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
                      titulo: "Encomendas",
                      valor: encomendas.length,
                    },
                    {
                      titulo: "Processando",
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
                    Encomendas
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
  onClick={() => setModalCriar(true)}
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
  +
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

                  {encomendas.map((encomenda) => (
                    <div
                      key={encomenda.id}
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
                      {/* DELETE */}
                      <button
                        onClick={() =>
                          deletarEncomenda(encomenda.id)
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
                        }}
                      >
                        <i className="bi bi-trash3-fill" />
                      </button>

                      <div className="row align-items-center">

                        {/* PRODUTO */}
                        <div className="col-md-5 mb-4 mb-md-0">
                          <p
                            style={{
                              color: encomenda.cor,
                              marginBottom: "10px",
                              fontWeight: "700",
                              textTransform: "uppercase",
                              letterSpacing: "1px",
                              fontSize: ".78rem",
                            }}
                          >
                            Encomenda {encomenda.id}
                          </p>

                          <h4
                            style={{
                              color: "white",
                              fontWeight: "700",
                              marginBottom: "12px",
                              fontSize: "1.25rem",
                            }}
                          >
                            {encomenda.produto}
                          </h4>

                          <span
                            style={{
                              color:
                                "rgba(255,255,255,.60)",
                            }}
                          >
                            Data: {encomenda.data}
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
                                color: encomenda.cor,
                                marginBottom: "7px",
                                fontSize: ".78rem",
                                fontWeight: "700",
                              }}
                            >
                              STATUS
                            </p>

                            <span
                              style={{
                                color: "white",
                                fontWeight: "600",
                              }}
                            >
                              {encomenda.status}
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
                            }}
                          >
                            VALOR
                          </p>

                          <span
                            style={{
                              color: "white",
                              fontWeight: "700",
                            }}
                          >
                            {encomenda.preco}
                          </span>
                        </div>

                        {/* DETALHES */}
                        <div className="col-md-2 d-flex justify-content-md-end">
                          <button
                            className="btn"
                            onClick={() => {
                              setEncomendaSelecionada(
                                encomenda
                              );
                              setModalAberto(true);
                            }}
                            style={{
                              background:
                                "rgba(255,255,255,.04)",
                              border:
                                "1px solid rgba(255,179,0,.16)",
                              color: "#ffe082",
                              borderRadius: "14px",
                              padding: "12px 18px",
                              fontWeight: "700",
                            }}
                          >
                            Detalhes
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}

                  {encomendas.length === 0 && (
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

      {/* MODAL */}
      {modalAberto && encomendaSelecionada && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.75)",
            backdropFilter: "blur(10px)",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "750px",
              borderRadius: "28px",
              padding: "35px",
              background: `
                linear-gradient(
                  145deg,
                  rgba(25,26,32,.98),
                  rgba(35,20,25,.98)
                )
              `,
              border:
                "1px solid rgba(255,179,0,.12)",
              position: "relative",
            }}
          >
            {/* FECHAR */}
            <button
              onClick={() => setModalAberto(false)}
              className="btn"
              style={{
                position: "absolute",
                top: "18px",
                right: "18px",
                width: "42px",
                height: "42px",
                borderRadius: "14px",
                background: "rgba(255,255,255,.05)",
                border:
                  "1px solid rgba(255,255,255,.08)",
                color: "#ff7b93",
              }}
            >
              <i className="bi bi-x-lg"></i>
            </button>

            <div className="mb-4">
              <p
                style={{
                  color: encomendaSelecionada.cor,
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Encomenda {encomendaSelecionada.id}
              </p>

              <h2
                style={{
                  color: "#f5061d",
                  fontWeight: "800",
                  textAlign: "center",
                }}
              >
                {encomendaSelecionada.produto}
              </h2>
            </div>

            {/* DESCRIÇÃO */}
{/* DESCRIÇÃO */}
<div
  style={{
    marginBottom: "35px",
  }}
>
  <p
    style={{
      color: "#ffe082",
      fontWeight: "800",
      letterSpacing: "1px",
      fontSize: ".82rem",
      marginBottom: "14px",
      textTransform: "uppercase",
    }}
  >
    Descrição
  </p>

  <p
    style={{
      color: "rgba(255,255,255,.82)",
      fontSize: "1rem",
      lineHeight: "1.9",
      margin: 0,
      fontWeight: "400",
    }}
  >
    {encomendaSelecionada.descricao}
  </p>

  <div
    style={{
      marginTop: "18px",
      width: "100%",
      height: "2px",
      borderRadius: "999px",
      background: `
        linear-gradient(
          90deg,
          rgba(245,6,29,0),
          rgba(245,6,29,.9),
          rgba(255,207,64,.95),
          rgba(245,6,29,.9),
          rgba(245,6,29,0)
        )
      `,
      boxShadow: `
        0 0 12px rgba(245,6,29,.35),
        0 0 18px rgba(255,207,64,.18)
      `,
    }}
  />
</div>
<button
  className="btn d-flex align-items-center justify-content-center"
  style={{
    position: "absolute",
    top: "20px",
    right: "70px",
    width: "42px",
    height: "42px",
    borderRadius: "14px",
    border: "1px solid rgba(255,179,0,.18)",
    background: `
      linear-gradient(
        145deg,
        rgba(255,179,0,.18),
        rgba(255,140,0,.10)
      )
    `,
    backdropFilter: "blur(10px)",
    color: "#ffb300",
    boxShadow: "0 0 18px rgba(255,179,0,.18)",
  }}
>
  <i className="bi bi-pencil-fill" />
</button>

            {/* INFO */}
            <div className="row g-4 mb-5">

              <div className="col-md-4">
                <div
                  style={{
                    background:
                      "rgba(255,255,255,.04)",
                    borderRadius: "18px",
                    padding: "18px",
                  }}
                >
                  <p
                    style={{
                      color: "#ffcf40",
                      fontWeight: "700",
                    }}
                  >
                    STATUS
                  </p>

                  <span
                    style={{
                      color: "white",
                      fontWeight: "700",
                    }}
                  >
                    {encomendaSelecionada.status}
                  </span>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  style={{
                    background:
                      "rgba(255,255,255,.04)",
                    borderRadius: "18px",
                    padding: "18px",
                  }}
                >
                  <p
                    style={{
                      color: "#ffcf40",
                      fontWeight: "700",
                    }}
                  >
                    DATA
                  </p>

                  <span
                    style={{
                      color: "white",
                      fontWeight: "700",
                    }}
                  >
                    {encomendaSelecionada.data}
                  </span>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  style={{
                    background:
                      "rgba(255,255,255,.04)",
                    borderRadius: "18px",
                    padding: "18px",
                  }}
                >
                  <p
                    style={{
                      color: "#ffcf40",
                      fontWeight: "700",
                    }}
                  >
                    VALOR
                  </p>

                  <span
                    style={{
                      color: "white",
                      fontWeight: "700",
                    }}
                  >
                    {encomendaSelecionada.preco}
                  </span>
                </div>
              </div>

            </div>

            {/* ORÇAMENTOS */}
            <div>
              <h4
                style={{
                  color: "#940533",
                  fontWeight: "700",
                  marginBottom: "25px",
                }}
              >
                Orçamentos de Empresas
              </h4>

              <div className="d-flex flex-column gap-3">

                {encomendaSelecionada.orcamentos.map(
                  (orcamento, index) => (
                    <div key={index}>

                      {/* HEADER */}
                      <button
                        className="btn w-100 d-flex justify-content-between align-items-center px-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#orcamento-${index}`}
                      >
                        <div className="d-flex align-items-center gap-3">

                          <div
                            style={{
                              width: "12px",
                              height: "12px",
                              borderRadius: "50%",
                              background: "#ffcf40",
                              boxShadow:
                                "0 0 14px rgba(255,207,64,.8)",
                            }}
                          />

                          <span
                            style={{
                              color: "white",
                              fontWeight: "700",
                              fontSize: "1rem",
                            }}
                          >
                            {orcamento.empresa}
                          </span>
                        </div>

                        <div
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "12px",
                            background:
                              "rgba(255,255,255,.04)",
                            border:
                              "1px solid rgba(255,255,255,.06)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <i
                            className="bi bi-chevron-down"
                            style={{
                              color: "#ffcf40",
                            }}
                          />
                        </div>
                      </button>

                      {/* HR */}
                      <hr
                        style={{
                          border: "none",
                          height: "2px",
                          background: `
                            linear-gradient(
                              90deg,
                              rgba(245,6,29,0),
                              rgba(245,6,29,.9),
                              rgba(255,207,64,.95),
                              rgba(245,6,29,.9),
                              rgba(245,6,29,0)
                            )
                          `,
                          borderRadius: "999px",
                          marginTop: "12px",
                          marginBottom: "20px",
                          boxShadow: `
                            0 0 12px rgba(245,6,29,.35),
                            0 0 18px rgba(255,207,64,.18)
                          `,
                        }}
                      />

                      {/* COLLAPSE */}
                      <div
                        className="collapse"
                        id={`orcamento-${index}`}
                      >
                        <div className="d-flex flex-column gap-3 mb-3">

                          {[
                            {
                              nome: "Entrega Expressa",
                              valor: orcamento.valor,
                              icone:
                                "bi-lightning-charge-fill",
                            },
                            {
                              nome: "Entrega Econômica",
                              valor: "R$ 120,00 OFF",
                              icone: "bi-wallet2",
                            },
                            {
                              nome: "Retirada em Loja",
                              valor: "Frete Grátis",
                              icone: "bi-shop",
                            },
                          ].map((opcao, i) => (
                            <div
                              key={i}
                              className="d-flex justify-content-between align-items-center"
                              style={{
                                background: `
                                  linear-gradient(
                                    145deg,
                                    rgba(255,255,255,.05),
                                    rgba(255,255,255,.025)
                                  )
                                `,
                                border:
                                  "1px solid rgba(255,255,255,.06)",
                                borderRadius: "18px",
                                padding: "18px 20px",
                                backdropFilter: "blur(10px)",
                                boxShadow: `
                                  inset 0 1px 0 rgba(255,255,255,.03),
                                  0 10px 20px rgba(0,0,0,.18)
                                `,
                              }}
                            >
                              <div className="d-flex align-items-center gap-3">

                                <div
                                  style={{
                                    width: "42px",
                                    height: "42px",
                                    borderRadius: "14px",
                                    background: `
                                      linear-gradient(
                                        145deg,
                                        rgba(255,207,64,.18),
                                        rgba(245,6,29,.18)
                                      )
                                    `,
                                    border:
                                      "1px solid rgba(255,255,255,.08)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#ffcf40",
                                  }}
                                >
                                  <i
                                    className={`bi ${opcao.icone}`}
                                  />
                                </div>

                                <div>
                                  <span
                                    style={{
                                      color: "white",
                                      fontWeight: "700",
                                      display: "block",
                                    }}
                                  >
                                    {opcao.nome}
                                  </span>

                                  <small
                                    style={{
                                      color:
                                        "rgba(255,255,255,.48)",
                                    }}
                                  >
                                    Melhor opção disponível
                                  </small>
                                </div>
                              </div>

                              <span
                                style={{
                                  color: "#ffd900",
                                  fontWeight: "800",
                                  fontSize: "1rem",
                                }}
                              >
                                {opcao.valor}
                              </span>
                            </div>
                          ))}

                        </div>
                      </div>

                    </div>
                  )
                )}
              </div>
            </div>

          </div>
        </div>
      )}
      {/* MODAL CRIAR */}
{modalCriar && (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.75)",
      backdropFilter: "blur(10px)",
      zIndex: 9999,
      padding: "20px",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "650px",
        borderRadius: "28px",
        padding: "35px",
        background: `
          linear-gradient(
            145deg,
            rgba(25,26,32,.98),
            rgba(35,20,25,.98)
          )
        `,
        border:
          "1px solid rgba(255,179,0,.12)",
        position: "relative",
      }}
    >
      {/* FECHAR */}
      <button
        onClick={() => setModalCriar(false)}
        className="btn"
        style={{
          position: "absolute",
          top: "18px",
          right: "18px",
          width: "42px",
          height: "42px",
          borderRadius: "14px",
          background: "rgba(255,255,255,.05)",
          border:
            "1px solid rgba(255,255,255,.08)",
          color: "#ff7b93",
        }}
      >
        <i className="bi bi-x-lg"></i>
      </button>

      <h2
        style={{
          color: "#ffe082",
          fontWeight: "800",
          marginBottom: "30px",
          marginRight: "50px",
          textAlign: "center",
        }}
      >
        Nova Encomenda
      </h2>

      <div className="d-flex flex-column gap-4">

        {/* PRODUTO */}
        <div>
          <label
            style={{
              color: "#ffcf40",
              marginBottom: "10px",
              display: "block",
              fontWeight: "700",
            }}
          >
            Produto
          </label>

          <input
            type="text"
            value={novaEncomenda.produto}
            onChange={(e) =>
              setNovaEncomenda({
                ...novaEncomenda,
                produto: e.target.value,
              })
            }
            className="form-control"
            style={{
              background: "rgba(255,255,255,.05)",
              border:
                "1px solid rgba(255,255,255,.08)",
              color: "white",
              borderRadius: "16px",
              padding: "14px",
            }}
          />
        </div>

        
        {/* DESCRIÇÃO */}
<div>
  <label
    style={{
      color: "#ffcf40",
      marginBottom: "10px",
      display: "block",
      fontWeight: "700",
    }}
  >
    Descrição
  </label>

  <textarea
    placeholder="Descreva a encomenda..."
    value={novaEncomenda.descricao}
    onChange={(e) =>
      setNovaEncomenda({
        ...novaEncomenda,
        descricao: e.target.value,
      })
    }
    className="form-control"
    rows={5}
    style={{
      background: "rgba(255,255,255,.05)",
      border:
        "1px solid rgba(255,255,255,.08)",
      color: "white",
      borderRadius: "16px",
      padding: "16px",
      resize: "none",
      lineHeight: "1.7",
    }}
  />
</div>

        

        {/* BOTÃO */}
        <div
  style={{
    position: "relative",
    borderRadius: "22px",
    overflow: "hidden",
    marginTop: "10px",
  }}
  className="botao-glow"
>
  <button
    onClick={criarEncomenda}
    className="btn w-100"
    style={{
      position: "relative",
      zIndex: 2,
      background:
        "linear-gradient(90deg,#ffcf40,#ff9d00,#c0012a)",
      color: "white",
      padding: "16px",
      borderRadius: "20px",
      border: "none",
      fontWeight: "800",
      backdropFilter: "blur(10px)",
    }}
  >
    Criar Encomenda
  </button>
</div>

      </div>
    </div>
  </div>
)}
    </div>
  );
}