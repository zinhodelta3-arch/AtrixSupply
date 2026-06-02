"use client";

import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Image from "next/image";

export default function Encomendas() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const [modalAberto, setModalAberto] =
    useState(false);

  const [
    encomendaSelecionada,
    setEncomendaSelecionada,
  ] = useState(null);

  const [
    empresaSelecionada,
    setEmpresaSelecionada,
  ] = useState(null);

  const [encomendas] = useState([
    {
      id: "#94821",

      produto: "RTX 4090 ASUS ROG",

      status: "Em transporte",

      data: "19 Maio 2026",

      preco: "R$ 12.199,90",

      cor: "#ff8800",

      descricao:
        "Placa de vídeo enviada via transporte expresso com seguro total.",

      imagem:
        "https://images.kabum.com.br/produtos/fotos/384997/placa-de-video-rtx-4090.jpg",

      orcamentos: [
        {
          empresa: "Kabum",

          opcoes: [
            {
              nome:
                "Entrega padrão",

              valor:
                "R$ 12.499,90",

              entrega:
                "5 dias",

              garantia:
                "12 meses",
            },

            {
              nome:
                "Entrega expressa",

              valor:
                "R$ 12.899,90",

              entrega:
                "1 dia",

              garantia:
                "12 meses",
            },

            {
              nome:
                "Premium + Seguro",

              valor:
                "R$ 13.250,00",

              entrega:
                "24 horas",

              garantia:
                "24 meses",
            },
          ],
        },

        {
          empresa: "Terabyte",

          opcoes: [
            {
              nome:
                "Plano básico",

              valor:
                "R$ 12.350,00",

              entrega:
                "4 dias",

              garantia:
                "12 meses",
            },

            {
              nome:
                "Plano gamer",

              valor:
                "R$ 12.780,00",

              entrega:
                "2 dias",

              garantia:
                "24 meses",
            },
          ],
        },

        {
          empresa: "Pichau",

          opcoes: [
            {
              nome:
                "Entrega normal",

              valor:
                "R$ 12.299,90",

              entrega:
                "5 dias",

              garantia:
                "12 meses",
            },

            {
              nome:
                "Entrega turbo",

              valor:
                "R$ 12.999,90",

              entrega:
                "1 dia",

              garantia:
                "24 meses",
            },
          ],
        },
      ],
    },

    {
      id: "#94822",

      produto: "Ryzen 9 9950X",

      status: "Processando",

      data: "17 Maio 2026",

      preco: "R$ 4.199,90",

      cor: "#ffc107",

      descricao:
        "Processador em análise de envio para transportadora.",

      imagem:
        "https://m.media-amazon.com/images/I/61vGQNUEsGL.jpg",

      orcamentos: [
        {
          empresa: "Kabum",

          opcoes: [
            {
              nome:
                "Entrega padrão",

              valor:
                "R$ 4.299,90",

              entrega:
                "4 dias",

              garantia:
                "12 meses",
            },

            {
              nome:
                "Entrega rápida",

              valor:
                "R$ 4.550,00",

              entrega:
                "1 dia",

              garantia:
                "24 meses",
            },
          ],
        },

        {
          empresa: "Amazon",

          opcoes: [
            {
              nome:
                "Prime Express",

              valor:
                "R$ 4.399,90",

              entrega:
                "24 horas",

              garantia:
                "12 meses",
            },

            {
              nome:
                "Plano econômico",

              valor:
                "R$ 4.199,90",

              entrega:
                "5 dias",

              garantia:
                "12 meses",
            },
          ],
        },
      ],
    },
  ]);

  return (
    <main
      style={{
        background: "#000",
        minHeight: "100vh",
      }}
    >
      {/* HERO */}
      <section
        className="py-5 text-white"
        style={{
          background:
            "linear-gradient(to right, #7a0018, #ff8800)",
        }}
      >
        <div className="container py-4">
          <h1 className="display-4 fw-bold">
            Encomendas
          </h1>

          <p className="lead mt-3 col-lg-7">
            Gerencie encomendas,
            acompanhe empresas e
            visualize diversos
            orçamentos em tempo
            real.
          </p>
        </div>
      </section>

      {/* CONTEUDO */}
      <section className="py-5">
        <div className="container-fluid px-4">
          <div className="row">
            {/* SIDEBAR */}
            <div className="col-lg-3 mb-4">
              <div
                className="position-sticky p-4 rounded-4 shadow-lg"
                style={{
                  top: "20px",
                  background: "#111",
                  border:
                    "1px solid rgba(255,255,255,.08)",
                }}
              >
                <div className="text-center">
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius:
                        "24px",
                      overflow:
                        "hidden",
                      margin:
                        "0 auto",
                    }}
                  >
                    <Image
                      src="/fisheye.png"
                      alt="Usuário"
                      width={120}
                      height={120}
                      style={{
                        width:
                          "100%",
                        height:
                          "100%",
                        objectFit:
                          "cover",
                      }}
                    />
                  </div>

                  <h4 className="text-white fw-bold mt-4">
                    Bida
                  </h4>

                  <p
                    style={{
                      color:
                        "#bdbdbd",
                    }}
                  >
                    Cliente Premium
                  </p>
                </div>

                <div className="mt-4 d-flex flex-column gap-3">
                  <div
                    style={{
                      background:
                        "rgba(255,255,255,.03)",
                      border:
                        "1px solid rgba(255,255,255,.08)",
                      borderRadius:
                        "18px",
                      padding:
                        "18px",
                    }}
                  >
                    <span
                      style={{
                        color:
                          "#9d9d9d",
                      }}
                    >
                      Encomendas
                    </span>

                    <h2 className="text-white fw-bold mt-2">
                      {
                        encomendas.length
                      }
                    </h2>
                  </div>

                  <div
                    style={{
                      background:
                        "rgba(255,255,255,.03)",
                      border:
                        "1px solid rgba(255,255,255,.08)",
                      borderRadius:
                        "18px",
                      padding:
                        "18px",
                    }}
                  >
                    <span
                      style={{
                        color:
                          "#9d9d9d",
                      }}
                    >
                      Empresas
                    </span>

                    <h2 className="text-white fw-bold mt-2">
                      10+
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* LISTA */}
            <div className="col-lg-9">
              <div className="row g-4">
                {encomendas.map(
                  (encomenda) => (
                    <div
                      className="col-12"
                      key={
                        encomenda.id
                      }
                    >
                      <div
                        className="card border-0 overflow-hidden"
                        style={{
                          background:
                            "#111",
                          border:
                            "1px solid rgba(255,255,255,.08)",
                          borderRadius:
                            "26px",
                        }}
                      >
                        <div className="row g-0">
                          {/* IMAGEM */}
                          <div className="col-lg-3">
                            <img
                              src={
                                encomenda.imagem
                              }
                              alt={
                                encomenda.produto
                              }
                              className="w-100 h-100"
                              style={{
                                objectFit:
                                  "cover",
                                maxHeight:
                                  "280px",
                              }}
                            />
                          </div>

                          {/* CONTEUDO */}
                          <div className="col-lg-9">
                            <div className="card-body p-4">
                              <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                                <div>
                                  <span
                                    style={{
                                      color:
                                        encomenda.cor,
                                      fontWeight:
                                        "700",
                                    }}
                                  >
                                    {
                                      encomenda.id
                                    }
                                  </span>

                                  <h2 className="text-white fw-bold mt-2">
                                    {
                                      encomenda.produto
                                    }
                                  </h2>

                                  <p
                                    style={{
                                      color:
                                        "#bdbdbd",
                                      maxWidth:
                                        "620px",
                                    }}
                                  >
                                    {
                                      encomenda.descricao
                                    }
                                  </p>
                                </div>

                                <div
                                  style={{
                                    background:
                                      "rgba(255,255,255,.04)",
                                    border:
                                      "1px solid rgba(255,255,255,.08)",
                                    borderRadius:
                                      "16px",
                                    padding:
                                      "14px 18px",
                                  }}
                                >
                                  <span
                                    style={{
                                      color:
                                        "#9d9d9d",
                                      fontSize:
                                        ".8rem",
                                    }}
                                  >
                                    DATA
                                  </span>

                                  <h6 className="text-white fw-bold mt-2 mb-0">
                                    {
                                      encomenda.data
                                    }
                                  </h6>
                                </div>
                              </div>

                              {/* CARDS */}
                              <div className="row g-3 mt-3">
                                <div className="col-md-4">
                                  <div
                                    style={{
                                      background:
                                        "rgba(255,255,255,.03)",
                                      border:
                                        "1px solid rgba(255,255,255,.06)",
                                      borderRadius:
                                        "18px",
                                      padding:
                                        "20px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color:
                                          "#9d9d9d",
                                      }}
                                    >
                                      STATUS
                                    </span>

                                    <h5
                                      className="fw-bold mt-2"
                                      style={{
                                        color:
                                          encomenda.cor,
                                      }}
                                    >
                                      {
                                        encomenda.status
                                      }
                                    </h5>
                                  </div>
                                </div>

                                <div className="col-md-4">
                                  <div
                                    style={{
                                      background:
                                        "rgba(255,255,255,.03)",
                                      border:
                                        "1px solid rgba(255,255,255,.06)",
                                      borderRadius:
                                        "18px",
                                      padding:
                                        "20px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color:
                                          "#9d9d9d",
                                      }}
                                    >
                                      MELHOR PREÇO
                                    </span>

                                    <h5
                                      className="fw-bold mt-2"
                                      style={{
                                        color:
                                          "#4ade80",
                                      }}
                                    >
                                      {
                                        encomenda.preco
                                      }
                                    </h5>
                                  </div>
                                </div>

                                <div className="col-md-4">
                                  <div
                                    style={{
                                      background:
                                        "rgba(255,255,255,.03)",
                                      border:
                                        "1px solid rgba(255,255,255,.06)",
                                      borderRadius:
                                        "18px",
                                      padding:
                                        "20px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color:
                                          "#9d9d9d",
                                      }}
                                    >
                                      EMPRESAS
                                    </span>

                                    <h5 className="text-white fw-bold mt-2">
                                      {
                                        encomenda
                                          .orcamentos
                                          .length
                                      }{" "}
                                      opções
                                    </h5>
                                  </div>
                                </div>
                              </div>

                              {/* BOTAO */}
                              <div className="mt-4">
                                <button
                                  onClick={() => {
                                    setEncomendaSelecionada(
                                      encomenda
                                    );

                                    setEmpresaSelecionada(
                                      null
                                    );

                                    setModalAberto(
                                      true
                                    );
                                  }}
                                  className="btn text-white fw-bold"
                                  style={{
                                    background:
                                      "linear-gradient(to right, #7a0018, #ff8800)",
                                    border:
                                      "none",
                                    borderRadius:
                                      "14px",
                                    padding:
                                      "13px 24px",
                                  }}
                                >
                                  Ver Orçamentos
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {modalAberto &&
        encomendaSelecionada && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              position: "fixed",
              inset: 0,
              background:
                "rgba(0,0,0,.82)",
              backdropFilter:
                "blur(10px)",
              zIndex: 9999,
              padding: "20px",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth:
                  "920px",
                borderRadius:
                  "28px",
                overflow:
                  "hidden",
                background:
                  "#111",
                border:
                  "1px solid rgba(255,255,255,.08)",
              }}
            >
              {/* HEADER */}
              <div
                style={{
                  background:
                    "linear-gradient(to right, #7a0018, #ff8800)",
                  padding:
                    "30px",
                  position:
                    "relative",
                }}
              >
                <button
                  onClick={() => {
                    setModalAberto(
                      false
                    );

                    setEmpresaSelecionada(
                      null
                    );
                  }}
                  className="btn"
                  style={{
                    position:
                      "absolute",
                    top: "18px",
                    right: "18px",
                    width: "48px",
                    height: "48px",
                    borderRadius:
                      "14px",
                    background:
                      "rgba(255,255,255,.15)",
                    border:
                      "1px solid rgba(255,255,255,.15)",
                    color:
                      "#fff",
                  }}
                >
                  <i className="bi bi-x-lg"></i>
                </button>

                <div className="d-flex align-items-center gap-4 flex-wrap">
                  <img
                    src={
                      encomendaSelecionada.imagem
                    }
                    alt={
                      encomendaSelecionada.produto
                    }
                    style={{
                      width:
                        "130px",
                      height:
                        "130px",
                      objectFit:
                        "cover",
                      borderRadius:
                        "22px",
                    }}
                  />

                  <div>
                    <h2 className="fw-bold text-white">
                      {
                        encomendaSelecionada.produto
                      }
                    </h2>

                    <p
                      style={{
                        color:
                          "rgba(255,255,255,.82)",
                        maxWidth:
                          "520px",
                        marginBottom:
                          "0",
                      }}
                    >
                      {
                        encomendaSelecionada.descricao
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* CONTEUDO */}
              <div className="p-4">
                <div className="mb-4">
                  <h4 className="text-white fw-bold">
                    Empresas
                    disponíveis
                  </h4>

                  <p
                    style={{
                      color:
                        "rgba(255,255,255,.55)",
                    }}
                  >
                    Clique em uma
                    empresa para
                    visualizar os
                    orçamentos.
                  </p>
                </div>

                {/* EMPRESAS */}
                <div className="row g-3">
                  {encomendaSelecionada.orcamentos.map(
                    (
                      empresa,
                      index
                    ) => (
                      <div
                        className="col-md-4"
                        key={index}
                      >
                        <button
                          onClick={() =>
                            setEmpresaSelecionada(
                              empresa
                            )
                          }
                          className="w-100 text-start"
                          style={{
                            background:
                              empresaSelecionada?.empresa ===
                              empresa.empresa
                                ? "linear-gradient(to right, #7a0018, #ff8800)"
                                : "rgba(255,255,255,.03)",

                            border:
                              empresaSelecionada?.empresa ===
                              empresa.empresa
                                ? "1px solid transparent"
                                : "1px solid rgba(255,255,255,.08)",

                            borderRadius:
                              "18px",

                            padding:
                              "18px",

                            color:
                              "#fff",
                          }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h5 className="fw-bold mb-1">
                                {
                                  empresa.empresa
                                }
                              </h5>

                              <span
                                style={{
                                  color:
                                    "#cfcfcf",
                                  fontSize:
                                    ".85rem",
                                }}
                              >
                                Ver opções
                              </span>
                            </div>

                            <i className="bi bi-building-fill fs-4"></i>
                          </div>
                        </button>
                      </div>
                    )
                  )}
                </div>

                {/* ORÇAMENTOS */}
                {empresaSelecionada && (
                  <div className="mt-5">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                      <div>
                        <span
                          style={{
                            color:
                              "#9d9d9d",
                          }}
                        >
                          EMPRESA
                          SELECIONADA
                        </span>

                        <h2 className="fw-bold text-white mt-2">
                          {
                            empresaSelecionada.empresa
                          }
                        </h2>
                      </div>

                      <div
                        style={{
                          background:
                            "rgba(255,255,255,.04)",
                          border:
                            "1px solid rgba(255,255,255,.08)",
                          borderRadius:
                            "16px",
                          padding:
                            "14px 18px",
                        }}
                      >
                        <span
                          style={{
                            color:
                              "#9d9d9d",
                          }}
                        >
                          ORÇAMENTOS
                        </span>

                        <h5 className="text-white fw-bold mt-2 mb-0">
                          {
                            empresaSelecionada
                              .opcoes
                              .length
                          }{" "}
                          opções
                        </h5>
                      </div>
                    </div>

                    {/* LISTA DE OPÇÕES */}
                    <div className="row g-3">
                      {empresaSelecionada.opcoes.map(
                        (
                          opcao,
                          index
                        ) => (
                          <div
                            className="col-md-6"
                            key={index}
                          >
                            <div
                              style={{
                                background:
                                  "rgba(255,255,255,.03)",

                                border:
                                  "1px solid rgba(255,255,255,.08)",

                                borderRadius:
                                  "22px",

                                padding:
                                  "24px",
                              }}
                            >
                              <div className="d-flex justify-content-between align-items-start">
                                <div>
                                  <span
                                    style={{
                                      color:
                                        "#9d9d9d",
                                      fontSize:
                                        ".8rem",
                                    }}
                                  >
                                    PLANO
                                  </span>

                                  <h4 className="text-white fw-bold mt-2">
                                    {
                                      opcao.nome
                                    }
                                  </h4>
                                </div>

                                <h4
                                  className="fw-bold"
                                  style={{
                                    color:
                                      "#4ade80",
                                  }}
                                >
                                  {
                                    opcao.valor
                                  }
                                </h4>
                              </div>

                              <div className="row g-3 mt-3">
                                <div className="col-6">
                                  <div
                                    style={{
                                      background:
                                        "rgba(255,255,255,.04)",

                                      borderRadius:
                                        "14px",

                                      padding:
                                        "14px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color:
                                          "#9d9d9d",
                                        fontSize:
                                          ".72rem",
                                      }}
                                    >
                                      ENTREGA
                                    </span>

                                    <h6 className="text-white fw-bold mt-2 mb-0">
                                      {
                                        opcao.entrega
                                      }
                                    </h6>
                                  </div>
                                </div>

                                <div className="col-6">
                                  <div
                                    style={{
                                      background:
                                        "rgba(255,255,255,.04)",

                                      borderRadius:
                                        "14px",

                                      padding:
                                        "14px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color:
                                          "#9d9d9d",
                                        fontSize:
                                          ".72rem",
                                      }}
                                    >
                                      GARANTIA
                                    </span>

                                    <h6 className="text-white fw-bold mt-2 mb-0">
                                      {
                                        opcao.garantia
                                      }
                                    </h6>
                                  </div>
                                </div>
                              </div>

                              <button
                                className="btn w-100 text-white fw-bold mt-4"
                                style={{
                                  background:
                                    "linear-gradient(to right, #7a0018, #ff8800)",

                                  border:
                                    "none",

                                  borderRadius:
                                    "14px",

                                  padding:
                                    "12px",
                                }}
                              >
                                Escolher
                                orçamento
                              </button>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
    </main>
  );
}