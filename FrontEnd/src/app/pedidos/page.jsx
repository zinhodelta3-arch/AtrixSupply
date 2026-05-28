"use client";

import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Image from "next/image";

export default function Pedidos() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const [pedidos, setPedidos] = useState([
    {
      id: "#94821",
      produto: "RTX 4090 ASUS ROG",
      status: "Em transporte",
      data: "19 Maio 2026",
      preco: "R$ 12.499,90",
      cor: "#ff8800",
      imagem:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTbNGoTPkp0FCEaso75eZN-6C_qby-QJ1j8sZOGOhZ_t5GPTYUMVl0nXcCWIekiXL8hhUn-OQl6uXo3jHvZltf-aDgO7q2ekpnkGKbg_CRcDromkmvxgOsj1Q",
    },

    {
      id: "#94822",
      produto: "Ryzen 9 9950X",
      status: "Processando",
      data: "17 Maio 2026",
      preco: "R$ 4.299,90",
      cor: "#ffc107",
      imagem:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSEFj5Dx7K1c8K8W1xM3hWQ0g4yB9s6n4xg",
    },

    {
      id: "#94823",
      produto: "Water Cooler Elite",
      status: "Entregue",
      data: "10 Maio 2026",
      preco: "R$ 899,90",
      cor: "#28c76f",
      imagem:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ8r5h5yV7W4x3g7K8c2",
    },

    {
      id: "#94824",
      produto: "Monitor Gamer 240Hz",
      status: "Em separação",
      data: "08 Maio 2026",
      preco: "R$ 2.199,90",
      cor: "#ff8800",
      imagem:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQf1P7",
    },

    {
      id: "#94825",
      produto: "SSD NVME 2TB",
      status: "Entregue",
      data: "02 Maio 2026",
      preco: "R$ 1.049,90",
      cor: "#28c76f",
      imagem:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR8",
    },
  ]);

  const [paginaAtual, setPaginaAtual] = useState(1);

  const pedidosPorPagina = 4;

  const ultimoPedido =
    paginaAtual * pedidosPorPagina;

  const primeiroPedido =
    ultimoPedido - pedidosPorPagina;

  const pedidosAtuais = pedidos.slice(
    primeiroPedido,
    ultimoPedido
  );

  const totalPaginas = Math.ceil(
    pedidos.length / pedidosPorPagina
  );

  function deletarPedido(id) {
    setPedidos((prev) =>
      prev.filter((pedido) => pedido.id !== id)
    );
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
            Meus Pedidos
          </h1>

          <p className="lead mt-3 col-lg-8">
            Acompanhe seus pedidos,
            entregas e informações das
            suas compras em tempo real.
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
                      src="/core.png"
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
                    Henrique Vieira
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
                            "rgba(255,255,255,.03)",
                          border:
                            "1px solid rgba(255,255,255,.08)",
                          borderRadius: "18px",
                          padding: "18px",
                        }}
                      >
                        <span
                          style={{
                            color: "#cfcfcf",
                            fontSize: ".82rem",
                            textTransform:
                              "uppercase",
                            letterSpacing: ".5px",
                          }}
                        >
                          {item.titulo}
                        </span>

                        <h3
                          style={{
                            color: "white",
                            marginTop: "8px",
                            fontWeight: "700",
                          }}
                        >
                          {item.valor}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>

                {/* BUSCA */}
                <div className="mt-4">
                  <label className="form-label text-white">
                    Buscar pedido
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Digite o pedido..."
                    style={{
                      background: "#1c1c1c",
                      border:
                        "1px solid #3b3b3b",
                      color: "#fff",
                    }}
                  />
                </div>

                {/* BOTÃO */}
                <button
                  className="btn w-100 text-white fw-semibold mt-4"
                  style={{
                    background:
                      "linear-gradient(to right, #c0012a, #ff8800)",
                    border: "none",
                    borderRadius: "14px",
                    padding: "12px",
                    transition: ".3s",
                  }}
                >
                  Novo Pedido
                </button>
              </div>
            </div>

            {/* PEDIDOS */}
            <div className="col-lg-9">
              <div className="row g-4">
                {pedidosAtuais.map((pedido) => (
                  <div
                    className="col-12"
                    key={pedido.id}
                  >
                    <div
                      className="card border-0 overflow-hidden shadow-lg"
                      style={{
                        background: "#111",
                        border:
                          "1px solid rgba(255,255,255,.14)",
                        transition: ".3s",
                      }}
                    >
                      <div className="row g-0">
                        {/* IMAGEM */}
                        <div className="col-md-3">
                          <img
                            src={pedido.imagem}
                            alt={pedido.produto}
                            className="w-100 h-100"
                            style={{
                              objectFit: "cover",
                              minHeight: "250px",
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
                                    color: pedido.cor,
                                    fontWeight: "700",
                                    marginBottom: "8px",
                                    letterSpacing:
                                      ".5px",
                                  }}
                                >
                                  Pedido {pedido.id}
                                </p>

                                <h3 className="text-white fw-bold">
                                  {pedido.produto}
                                </h3>

                                <p
                                  style={{
                                    color: "#cfcfcf",
                                  }}
                                >
                                  Data do pedido:{" "}
                                  {pedido.data}
                                </p>
                              </div>

                              {/* DELETE */}
                              <button
                                onClick={() =>
                                  deletarPedido(
                                    pedido.id
                                  )
                                }
                                className="btn"
                                style={{
                                  background:
                                    "rgba(255,255,255,.05)",
                                  border:
                                    "1px solid rgba(255,255,255,.08)",
                                  color: "#ff5a5a",
                                  width: "45px",
                                  height: "45px",
                                  borderRadius: "12px",
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
                                    padding: "18px",
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
                                      textTransform:
                                        "uppercase",
                                    }}
                                  >
                                    Status
                                  </span>

                                  <h6
                                    style={{
                                      margin: 0,
                                      fontWeight:
                                        "700",
                                      color:
                                        pedido.cor,
                                    }}
                                  >
                                    {pedido.status}
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
                                    padding: "18px",
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
                                      textTransform:
                                        "uppercase",
                                    }}
                                  >
                                    Valor
                                  </span>

                                  <h6
                                    style={{
                                      margin: 0,
                                      fontWeight:
                                        "700",
                                      color:
                                        "#5ba100dc",
                                    }}
                                  >
                                    {pedido.preco}
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
                                    padding: "18px",
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
                                      textTransform:
                                        "uppercase",
                                    }}
                                  >
                                    Entrega
                                  </span>

                                  <h6
                                    className="text-white"
                                    style={{
                                      margin: 0,
                                      fontWeight:
                                        "700",
                                    }}
                                  >
                                    Em andamento
                                  </h6>
                                </div>
                              </div>
                            </div>

                            {/* BOTÕES */}
                            <div className="mt-auto d-flex gap-3 flex-wrap">
                              <button
                                className="btn text-white fw-semibold"
                                style={{
                                  background:
                                    "linear-gradient(to right, #940533, #ff8800)",
                                  border: "none",
                                  borderRadius:
                                    "12px",
                                  padding:
                                    "12px 18px",
                                }}
                              >
                                Ver detalhes
                              </button>

                              <button
                                className="btn btn-outline-light"
                                style={{
                                  borderRadius:
                                    "12px",
                                  padding:
                                    "12px 18px",
                                }}
                              >
                                Rastrear
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* SEM PEDIDOS */}
                {pedidos.length === 0 && (
                  <div className="col-12">
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
                        Todos os pedidos foram
                        removidos.
                      </p>
                    </div>
                  </div>
                )}

                {/* PAGINAÇÃO */}
                <nav className="mt-4">
                  <ul className="pagination justify-content-center">
                    <li
                      className={`page-item ${
                        paginaAtual === 1
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() =>
                          setPaginaAtual(
                            paginaAtual - 1
                          )
                        }
                        style={{
                          background: "#000",
                          color: "white",
                          border:
                            "1px solid white",
                        }}
                      >
                        Anterior
                      </button>
                    </li>

                    {[...Array(totalPaginas)].map(
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
                                index + 1
                              )
                            }
                            className="page-link"
                            style={{
                              background:
                                paginaAtual ===
                                index + 1
                                  ? "linear-gradient(to right, #c0012a, #ff8800)"
                                  : "#000",

                              color: "white",

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
                            paginaAtual + 1
                          )
                        }
                        style={{
                          background: "#000",
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
    </main>
  );
}