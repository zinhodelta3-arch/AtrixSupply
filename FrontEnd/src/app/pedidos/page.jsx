"use client";

import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./pedidos.css";

import Image from "next/image";

export default function Pedidos() {

  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    async function carregarPedidos() {
      try {
        const response = await fetch(
          "http://localhost:3001/api/pedidos"
        );

        const data = await response.json();

        setPedidos(Array.isArray(data.dados) ? data.dados : []);
      } catch (erro) {
        console.error(erro);
      }
    }

    carregarPedidos();
  },  []); 

  const [pedidoParaExcluir, setPedidoParaExcluir] =
  useState(null);

  const [buscaProduto, setBuscaProduto] = useState("");
  const [statusSelecionado, setStatusSelecionado] = useState("Todos");

  const pedidosFiltrados = pedidos.filter((pedido) => {
  const nomeMatch = pedido.produto
    .toLowerCase()
    .includes(buscaProduto.toLowerCase());

  const statusMatch =
    statusSelecionado === "Todos" ||
    pedido.status === statusSelecionado;

  return nomeMatch && statusMatch;
});

  const [paginaAtual, setPaginaAtual] = useState(1);

  const pedidosPorPagina = 6;

  const ultimoPedido =
    paginaAtual * pedidosPorPagina;

  const primeiroPedido =
    ultimoPedido - pedidosPorPagina;

  const pedidosAtuais = pedidosFiltrados.slice(
  primeiroPedido,
  ultimoPedido
);

const totalPaginas = Math.ceil(
  pedidosFiltrados.length / pedidosPorPagina
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
                    Cliente
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
                <br/>
                <br/>

                {/* BUSCA */}
                <div className="mb-3">
  <label className="form-label text-white">
    Buscar produto
  </label>

  <input
    type="text"
    className="form-control"
    placeholder="Digite o nome do produto..."
    value={buscaProduto}
    onChange={(e) => setBuscaProduto(e.target.value)}
    style={{
      background: "#151518",
      border: "1px solid rgba(255,255,255,0.06)",
      color: "#fff",
    }}
  />
</div>

<div className="mb-4">
  <label className="form-label text-white">
    Status do pedido
  </label>

  <select
    className="form-select"
    value={statusSelecionado}
    onChange={(e) =>
      setStatusSelecionado(e.target.value)
    }
    style={{
      background: "#151518",
      border: "1px solid rgba(255,255,255,0.06)",
      color: "#fff",
    }}
  >
    <option>Todos</option>
    <option>Processando</option>
    <option>Em separação</option>
    <option>Em transporte</option>
    <option>Entregue</option>
  </select>
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
  className="w-100"
  style={{
    objectFit: "cover",
    height: "320px",
    borderRadius: "12px",
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
  className="btn"
  data-bs-toggle="modal"
  data-bs-target="#modalExcluir"
  onClick={() => setPedidoParaExcluir(pedido)}
  style={{
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.08)",
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
                {pedidosFiltrados.length === 0 && (
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
                        Tente pesquisar por outro nome.
                      </p>
                    </div>
                  </div>
                )}

                {/* PAGINAÇÃO */}
                <nav className="mt-5">
  <ul className="pagination justify-content-center">

    <li className={`page-item ${paginaAtual === 1 ? "disabled" : ""}`}>
      <button
        className="page-link paginacao-btn"
        onClick={() => setPaginaAtual(paginaAtual - 1)}
      >
        Anterior
      </button>
    </li>

    {[...Array(totalPaginas)].map((_, index) => (
      <li
        key={index}
        className={`page-item ${
          paginaAtual === index + 1 ? "active" : ""
        }`}
      >
        <button
          className={
            paginaAtual === index + 1
              ? "page-link paginacao-btn-active"
              : "page-link paginacao-btn"
          }
          onClick={() => setPaginaAtual(index + 1)}
        >
          {index + 1}
        </button>
      </li>
    ))}

    <li
      className={`page-item ${
        paginaAtual === totalPaginas ? "disabled" : ""
      }`}
    >
      <button
        className="page-link paginacao-btn"
        onClick={() => setPaginaAtual(paginaAtual + 1)}
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
      <div
  className="modal fade"
  id="modalExcluir"
  tabIndex="-1"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered">
    <div
      className="modal-content border-0"
      style={{
        background: "#111",
        borderRadius: "24px",
      }}
    >
      <div className="modal-body p-4 text-center">

        <i
          className="bi bi-exclamation-triangle-fill"
          style={{
            fontSize: "4rem",
            color: "#ff8800",
          }}
        ></i>

        <h3 className="text-white fw-bold mt-3">
          Confirmar exclusão
        </h3>

        <p
          style={{
            color: "#cfcfcf",
          }}
        >
          Tem certeza que deseja excluir o pedido:
          <br />

          <span
            style={{
              color: "#fff",
              fontWeight: "700",
            }}
          >
            {pedidoParaExcluir?.id}
          </span>
          ?
        </p>

        <div className="d-flex gap-3 mt-4">

          <button
            className="btn btn-outline-light w-50"
            data-bs-dismiss="modal"
          >
            Cancelar
          </button>

          <button
            className="btn w-50 text-white"
            style={{
              background:
                "linear-gradient(to right, #c0012a, #ff4d4d)",
              border: "none",
            }}
            data-bs-dismiss="modal"
            onClick={() =>
              deletarPedido(
                pedidoParaExcluir.id
              )
            }
          >
            Excluir
          </button>

        </div>
      </div>
    </div>
  </div>
</div>
    </main>
  );
}