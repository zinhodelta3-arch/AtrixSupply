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

  const [encomendas, setEncomendas] =
    useState([
      {
        id: "#94821",
        produto: "RTX 4090 ASUS ROG",
        status: "Em transporte",
        data: "19 Maio 2026",
        preco: "R$ 12.499,90",
        cor: "#ff8800",

        descricao:
          "Placa de vídeo enviada via transporte expresso com seguro total.",

        imagem:
          "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTbNGoTPkp0FCEaso75eZN-6C_qby-QJ1j8sZOGOhZ_t5GPTYUMVl0nXcCWIekiXL8hhUn-OQl6uXo3jHvZltf-aDgO7q2ekpnkGKbg_CRcDromkmvxgOsj1Q",

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
        cor: "#ffc107",

        descricao:
          "Processador em análise de envio para transportadora.",

        imagem:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ",

        orcamentos: [
          {
            empresa: "Kabum",
            valor: "R$ 4.299,90",
          },

          {
            empresa: "Terabyte",
            valor: "R$ 4.450,00",
          },
        ],
      },
    ]);

  const [modalAberto, setModalAberto] =
    useState(false);

  const [
    encomendaSelecionada,
    setEncomendaSelecionada,
  ] = useState(null);

  const [modalCriar, setModalCriar] =
    useState(false);

  const [paginaAtual, setPaginaAtual] =
    useState(1);

  const [novaEncomenda, setNovaEncomenda] =
    useState({
      produto: "",
      descricao: "",
    });

  const encomendasPorPagina = 4;

  const ultimaEncomenda =
    paginaAtual * encomendasPorPagina;

  const primeiraEncomenda =
    ultimaEncomenda -
    encomendasPorPagina;

  const encomendasAtuais =
    encomendas.slice(
      primeiraEncomenda,
      ultimaEncomenda
    );

  const totalPaginas = Math.ceil(
    encomendas.length /
      encomendasPorPagina
  );

  function deletarEncomenda(id) {
    setEncomendas((prev) =>
      prev.filter(
        (encomenda) =>
          encomenda.id !== id
      )
    );
  }

  function criarEncomenda() {
    if (
      !novaEncomenda.produto ||
      !novaEncomenda.descricao
    )
      return;

    const nova = {
      id: `#${
        Math.floor(
          Math.random() * 90000
        ) + 10000
      }`,

      produto: novaEncomenda.produto,

      descricao:
        novaEncomenda.descricao,

      status: "Processando",

      data: "28 Maio 2026",

      preco: "R$ 0,00",

      cor: "#ffc107",

      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ",

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
           "linear-gradient(to right, #c0012a, #ff8800)",
        }}
      >
        <div className="container py-4">
          <h1 className="display-4 fw-bold">
            Encomendas
          </h1>

          <p className="lead mt-3 col-lg-8">
            Gerencie encomendas,
            acompanhe orçamentos e
            visualize detalhes dos
            pedidos em tempo real.
          </p>
        </div>
      </section>

      {/* CONTEÚDO */}
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
                    "1px solid rgba(255,255,255,.14)",
                }}
              >
                {/* PERFIL */}
                <div className="text-center">
                  <div
                    style={{
                      width: "130px",
                      height: "130px",
                      borderRadius: "24px",
                      overflow: "hidden",
                      margin: "0 auto",
                      border:
                        "2px solid rgba(255,255,255,.14)",
                    }}
                  >
                    <Image
                      src="/fisheye.png"
                      alt="Usuário"
                      width={130}
                      height={130}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <h4 className="text-white fw-bold mt-4">
                    Bida
                  </h4>

                  <p
                    style={{
                      color: "#cfcfcf",
                    }}
                  >
                    Cliente Premium
                  </p>
                </div>

                {/* RESUMO */}
                <div className="mt-4">
                  <h5 className="text-white fw-bold mb-3">
                    Resumo
                  </h5>

                  <div className="d-flex flex-column gap-3">
                    {[
                      {
                        titulo:
                          "Encomendas",
                        valor:
                          encomendas.length,
                      },

                      {
                        titulo:
                          "Processando",
                        valor: "03",
                      },

                      {
                        titulo:
                          "Finalizados",
                        valor: "21",
                      },
                    ].map(
                      (item, index) => (
                        <div
                          key={index}
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
                                "#cfcfcf",

                              fontSize:
                                ".82rem",

                              textTransform:
                                "uppercase",

                              letterSpacing:
                                ".5px",
                            }}
                          >
                            {
                              item.titulo
                            }
                          </span>

                          <h3
                            style={{
                              color:
                                "white",

                              marginTop:
                                "8px",

                              fontWeight:
                                "700",
                            }}
                          >
                            {
                              item.valor
                            }
                          </h3>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* BUSCA */}
                <div className="mt-4">
                  <label className="form-label text-white">
                    Buscar encomenda
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Digite a encomenda..."
                    style={{
                      background:
                        "#1c1c1c",

                      border:
                        "1px solid #3b3b3b",

                      color: "#fff",
                    }}
                  />
                </div>

                {/* BOTÃO */}
                <button
                  onClick={() =>
                    setModalCriar(true)
                  }
                  className="btn w-100 text-white fw-semibold mt-4"
                  style={{
                    background:
                      "linear-gradient(to right, #c0012a, #ff8800)",

                    border: "none",

                    borderRadius:
                      "14px",

                    padding: "12px",
                  }}
                >
                  Nova Encomenda
                </button>
              </div>
            </div>

            {/* LISTA */}
            <div className="col-lg-9">
              <div className="row g-4">
                {encomendasAtuais.map(
                  (encomenda) => (
                    <div
                      className="col-12"
                      key={
                        encomenda.id
                      }
                    >
                      <div
                        className="card border-0 overflow-hidden shadow-lg"
                        style={{
                          background:
                            "#111",

                          border:
                            "1px solid rgba(255,255,255,.14)",
                        }}
                      >
                        <div className="row g-0">
                          {/* IMAGEM */}
                          <div className="col-md-3">
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

                                minHeight:
                                  "250px",
                              }}
                            />
                          </div>

                          {/* CONTEÚDO */}
                          <div className="col-md-9">
                            <div className="card-body h-100 d-flex flex-column">
                              {/* TOPO */}
                              <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                                <div>
                                  <p
                                    style={{
                                      color:
                                        encomenda.cor,

                                      fontWeight:
                                        "700",

                                      marginBottom:
                                        "8px",
                                    }}
                                  >
                                    Encomenda{" "}
                                    {
                                      encomenda.id
                                    }
                                  </p>

                                  <h3 className="text-white fw-bold">
                                    {
                                      encomenda.produto
                                    }
                                  </h3>

                                  <p
                                    style={{
                                      color:
                                        "#cfcfcf",
                                    }}
                                  >
                                    Data:{" "}
                                    {
                                      encomenda.data
                                    }
                                  </p>
                                </div>

                                {/* DELETE */}
                                <button
                                  onClick={() =>
                                    deletarEncomenda(
                                      encomenda.id
                                    )
                                  }
                                  className="btn"
                                  style={{
                                    background:
                                      "rgba(255,255,255,.05)",

                                    border:
                                      "1px solid rgba(255,255,255,.08)",

                                    color:
                                      "#ff5a5a",

                                    width:
                                      "45px",

                                    height:
                                      "45px",

                                    borderRadius:
                                      "12px",
                                  }}
                                >
                                  <i className="bi bi-trash-fill"></i>
                                </button>
                              </div>

                              {/* INFO */}
                              <div className="row mt-4">
                                <div className="col-md-4 mb-3">
                                  <div
                                    style={{
                                      background:
                                        "rgba(255,255,255,.03)",

                                      border:
                                        "1px solid rgba(255,255,255,.08)",

                                      borderRadius:
                                        "16px",

                                      padding:
                                        "18px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color:
                                          "#cfcfcf",

                                        fontSize:
                                          ".8rem",

                                        display:
                                          "block",

                                        marginBottom:
                                          "8px",
                                      }}
                                    >
                                      Status
                                    </span>

                                    <h6
                                      style={{
                                        margin:
                                          0,

                                        fontWeight:
                                          "700",

                                        color:
                                          encomenda.cor,
                                      }}
                                    >
                                      {
                                        encomenda.status
                                      }
                                    </h6>
                                  </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                  <div
                                    style={{
                                      background:
                                        "rgba(255,255,255,.03)",

                                      border:
                                        "1px solid rgba(255,255,255,.08)",

                                      borderRadius:
                                        "16px",

                                      padding:
                                        "18px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color:
                                          "#cfcfcf",

                                        fontSize:
                                          ".8rem",

                                        display:
                                          "block",

                                        marginBottom:
                                          "8px",
                                      }}
                                    >
                                      Valor
                                    </span>

                                    <h6
                                      style={{
                                        margin:
                                          0,

                                        fontWeight:
                                          "700",

                                        color:
                                          "#5ba100dc",
                                      }}
                                    >
                                      {
                                        encomenda.preco
                                      }
                                    </h6>
                                  </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                  <div
                                    style={{
                                      background:
                                        "rgba(255,255,255,.03)",

                                      border:
                                        "1px solid rgba(255,255,255,.08)",

                                      borderRadius:
                                        "16px",

                                      padding:
                                        "18px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color:
                                          "#cfcfcf",

                                        fontSize:
                                          ".8rem",

                                        display:
                                          "block",

                                        marginBottom:
                                          "8px",
                                      }}
                                    >
                                      Empresas
                                    </span>

                                    <h6
                                      className="text-white"
                                      style={{
                                        margin:
                                          0,

                                        fontWeight:
                                          "700",
                                      }}
                                    >
                                      {
                                        encomenda
                                          .orcamentos
                                          .length
                                      }{" "}
                                      opções
                                    </h6>
                                  </div>
                                </div>
                              </div>

                              {/* BOTÕES */}
                              <div className="mt-auto d-flex gap-3 flex-wrap">
                                <button
                                  onClick={() => {
                                    setEncomendaSelecionada(
                                      encomenda
                                    );

                                    setModalAberto(
                                      true
                                    );
                                  }}
                                  className="btn text-white fw-semibold"
                                  style={{
                                    background:
                                      "linear-gradient(to right, #940533, #ff8800)",

                                    border:
                                      "none",

                                    borderRadius:
                                      "12px",

                                    padding:
                                      "12px 18px",
                                  }}
                                >
                                  Ver detalhes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}

                {/* PAGINAÇÃO */}
                <nav className="mt-4">
                  <ul className="pagination justify-content-center">
                    <li
                      className={`page-item ${
                        paginaAtual ===
                        1
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() =>
                          setPaginaAtual(
                            paginaAtual -
                              1
                          )
                        }
                        style={{
                          background:
                            "#000",

                          color: "white",

                          border:
                            "1px solid white",
                        }}
                      >
                        Anterior
                      </button>
                    </li>

                    {[
                      ...Array(
                        totalPaginas
                      ),
                    ].map(
                      (_, index) => (
                        <li
                          key={index}
                          className={`page-item ${
                            paginaAtual ===
                            index + 1
                              ? "active"
                              : ""
                          }`}
                        >
                          <button
                            onClick={() =>
                              setPaginaAtual(
                                index +
                                  1
                              )
                            }
                            className="page-link"
                            style={{
                              background:
                                paginaAtual ===
                                index + 1
                                  ? "linear-gradient(to right, #c0012a, #ff8800)"
                                  : "#000",

                              color:
                                "white",

                              border:
                                "1px solid white",
                            }}
                          >
                            {index + 1}
                          </button>
                        </li>
                      )
                    )}

                    <li
                      className={`page-item ${
                        paginaAtual ===
                        totalPaginas
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() =>
                          setPaginaAtual(
                            paginaAtual +
                              1
                          )
                        }
                        style={{
                          background:
                            "#000",

                          color: "white",

                          border:
                            "1px solid white",
                        }}
                      >
                        Próximo
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL DETALHES */}
      {modalAberto &&
        encomendaSelecionada && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              position: "fixed",
              inset: 0,
              background:
                "rgba(0,0,0,.75)",

              backdropFilter:
                "blur(10px)",

              zIndex: 9999,

              padding: "20px",
            }}
          >
            <div
              style={{
                width: "100%",

                maxWidth: "750px",

                borderRadius:
                  "28px",

                padding: "35px",

                background:
                  "#111",

                border:
                  "1px solid rgba(255,255,255,.12)",

                position:
                  "relative",
              }}
            >
              {/* FECHAR */}
              <button
                onClick={() =>
                  setModalAberto(
                    false
                  )
                }
                className="btn"
                style={{
                  position:
                    "absolute",

                  top: "18px",

                  right: "18px",

                  width: "42px",

                  height: "42px",

                  borderRadius:
                    "14px",

                  background:
                    "rgba(255,255,255,.05)",

                  border:
                    "1px solid rgba(255,255,255,.08)",

                  color:
                    "#ff7b93",
                }}
              >
                <i className="bi bi-x-lg"></i>
              </button>

              <h2
                className="fw-bold text-white mb-4"
              >
                {
                  encomendaSelecionada.produto
                }
              </h2>

              <p
                style={{
                  color:
                    "rgba(255,255,255,.75)",
                }}
              >
                {
                  encomendaSelecionada.descricao
                }
              </p>

              <div className="row mt-4">
                {encomendaSelecionada.orcamentos.map(
                  (
                    orcamento,
                    index
                  ) => (
                    <div
                      className="col-md-6 mb-3"
                      key={index}
                    >
                      <div
                        style={{
                          background:
                            "rgba(255,255,255,.03)",

                          border:
                            "1px solid rgba(255,255,255,.08)",

                          borderRadius:
                            "18px",

                          padding:
                            "20px",
                        }}
                      >
                        <h5
                          className="fw-bold"
                          style={{
                            color:
                              "#ffcf40",
                          }}
                        >
                          {
                            orcamento.empresa
                          }
                        </h5>

                        <p className="text-white mb-0">
                          {
                            orcamento.valor
                          }
                        </p>
                      </div>
                    </div>
                  )
                )}
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
            background:
              "rgba(0,0,0,.75)",

            backdropFilter:
              "blur(10px)",

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
              background: "#111",
              border:
                "1px solid rgba(255,255,255,.12)",
              position: "relative",
            }}
          >
            {/* FECHAR */}
            <button
              onClick={() =>
                setModalCriar(false)
              }
              className="btn"
              style={{
                position:
                  "absolute",

                top: "18px",

                right: "18px",

                width: "42px",

                height: "42px",

                borderRadius:
                  "14px",

                background:
                  "rgba(255,255,255,.05)",

                border:
                  "1px solid rgba(255,255,255,.08)",

                color:
                  "#ff7b93",
              }}
            >
              <i className="bi bi-x-lg"></i>
            </button>

            <h2
              className="fw-bold text-white text-center mb-4"
            >
              Nova Encomenda
            </h2>

            {/* INPUT */}
            <div className="mb-4">
              <label className="form-label text-white fw-bold">
                Produto
              </label>

              <input
                type="text"
                value={
                  novaEncomenda.produto
                }
                onChange={(e) =>
                  setNovaEncomenda({
                    ...novaEncomenda,
                    produto:
                      e.target.value,
                  })
                }
                className="form-control"
                style={{
                  background:
                    "#1c1c1c",

                  border:
                    "1px solid #3b3b3b",

                  color: "#fff",

                  padding: "14px",
                }}
              />
            </div>

            {/* TEXTAREA */}
            <div className="mb-4">
              <label className="form-label text-white fw-bold">
                Descrição
              </label>

              <textarea
                rows={5}
                value={
                  novaEncomenda.descricao
                }
                onChange={(e) =>
                  setNovaEncomenda({
                    ...novaEncomenda,
                    descricao:
                      e.target.value,
                  })
                }
                className="form-control"
                style={{
                  background:
                    "#1c1c1c",

                  border:
                    "1px solid #3b3b3b",

                  color: "#fff",

                  padding: "14px",

                  resize: "none",
                }}
              />
            </div>

            {/* BOTÃO */}
            <button
              onClick={
                criarEncomenda
              }
              className="btn w-100 text-white fw-bold"
              style={{
                background:
                  "linear-gradient(to right, #c0012a, #ff8800)",

                border: "none",

                padding: "14px",

                borderRadius:
                  "14px",
              }}
            >
              Criar Encomenda
            </button>
          </div>
        </div>
      )}
    </main>
  );
}