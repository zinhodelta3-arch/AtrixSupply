"use client";

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./encomendasrecebe.css";

export default function PainelFornecedor() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const encomendas = [
    {
      id: 1,
      produto: "Porca",
      quantidade: 4,
      descricao:
        "Porca industrial de alta resistência utilizada em motores pesados.",
      entrega: "18/06/2026",
    },

    {
      id: 2,
      produto: "Parafuso",
      quantidade: 12,
      descricao:
        "Parafuso industrial galvanizado resistente à corrosão.",
      entrega: "20/06/2026",
    },

    {
      id: 3,
      produto: "Motor Industrial X200",
      quantidade: 2,
      descricao:
        "Motor industrial de alta potência para linhas automatizadas.",
      entrega: "25/06/2026",
    },
  ];

  const [listaEncomendas] =
    useState(encomendas);

  const [paginaAtual, setPaginaAtual] =
    useState(1);

  const [busca, setBusca] = useState("");

  const [pedidoSelecionado, setPedidoSelecionado] =
    useState(null);

  const [orcamentos, setOrcamentos] =
    useState([
      {
        id: 1,
        nome: "Básico",
        tipo: "Econômico",
        preco: "1250",
        publicado: true,
      },

      {
        id: 2,
        nome: "Profissional",
        tipo: "Premium",
        preco: "2850",
        publicado: false,
      },

      {
        id: 3,
        nome: "Enterprise",
        tipo: "Avançado",
        preco: "5400",
        publicado: true,
      },
    ]);

  const encomendasPorPagina = 8;

  const indiceUltimaEncomenda =
    paginaAtual * encomendasPorPagina;

  const indicePrimeiraEncomenda =
    indiceUltimaEncomenda -
    encomendasPorPagina;

  const encomendasFiltradas =
    listaEncomendas.filter((pedido) => {
      return pedido.produto
        .toLowerCase()
        .includes(busca.toLowerCase());
    });

  const encomendasAtuais =
    encomendasFiltradas.slice(
      indicePrimeiraEncomenda,
      indiceUltimaEncomenda
    );

  const totalPaginas = Math.ceil(
    encomendasFiltradas.length /
      encomendasPorPagina
  );

  return (
    <main
      style={{
        background: "#000",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <section
        className="py-5 text-white"
        style={{
          background:
            "linear-gradient(135deg,#940533,#c0012a,#f5061d)",
        }}
      >
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-12 text-center">
              <span className="badge bg-warning text-dark mb-3 px-3 py-2">
                Painel do Fornecedor
              </span>

              <h1 className="display-4 fw-bold">
                Gerencie suas encomendas
              </h1>

              <p className="lead mt-3">
                Visualize todos os pedidos
                recebidos pela sua empresa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="py-5">
        <div className="container-fluid px-4">
          <div className="row">
            {/* FILTROS */}
            <div className="col-lg-3 mb-4">
              <div
                className="p-4 rounded-4 shadow-lg position-sticky"
                style={{
                  top: "20px",
                  background: "#111",
                  border:
                    "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <h3 className="text-white fw-bold mb-4">
                  Buscar Produto
                </h3>

                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control fornecedor-input"
                    placeholder="Digite o nome"
                    value={busca}
                    onChange={(e) =>
                      setBusca(
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>

            {/* LISTA */}
            <div className="col-lg-9">
              <div className="row g-4">
                {encomendasAtuais.map(
                  (pedido) => (
                    <div
                      className="col-12"
                      key={pedido.id}
                    >
                      <div
                        className="card border-0 shadow-lg overflow-hidden"
                        style={{
                          background:
                            "#111",
                        }}
                      >
                        <div className="card-body p-4">
                          <div className="row align-items-center">
                            <div className="col-lg-8">
                              <h3 className="text-white fw-bold mb-3">
                                {
                                  pedido.produto
                                }
                              </h3>

                              <p className="text-secondary mb-2">
                                Quantidade:
                                <span className="text-white fw-semibold ms-2">
                                  {
                                    pedido.quantidade
                                  }
                                </span>
                              </p>

                              <p className="text-secondary">
                                Entrega:
                                <span className="text-white fw-semibold ms-2">
                                  {
                                    pedido.entrega
                                  }
                                </span>
                              </p>
                            </div>

                            <div className="col-lg-4 mt-4 mt-lg-0">
                              <div className="d-grid gap-3">
                                <button
                                  className="btn btn-outline-light fw-semibold"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalDetalhes"
                                  onClick={() =>
                                    setPedidoSelecionado(
                                      pedido
                                    )
                                  }
                                >
                                  Ver detalhes
                                </button>

                                <button
                                  className="btn visualizar-btn text-white fw-semibold"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalOrcamento"
                                  onClick={() =>
                                    setPedidoSelecionado(
                                      pedido
                                    )
                                  }
                                >
                                  Gerenciar orçamento
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

              <nav className="mt-5">
                <ul className="pagination justify-content-center">
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
                          className="page-link"
                          onClick={() =>
                            setPaginaAtual(
                              index + 1
                            )
                          }
                        >
                          {index + 1}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL DETALHES */}
      <div
        className="modal fade"
        id="modalDetalhes"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div
            className="modal-content border-0"
            style={{
              background: "#111",
              color: "white",
              borderRadius: "24px",
            }}
          >
            <div
              className="modal-header border-0"
              style={{
                background:
                  "linear-gradient(135deg,#940533,#c0012a,#f5061d)",
              }}
            >
              <h2 className="fw-bold">
                {
                  pedidoSelecionado?.produto
                }
              </h2>

              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body p-4">
              <div className="mb-4">
                <h5 className="text-secondary">
                  Descrição
                </h5>

                <p>
                  {
                    pedidoSelecionado?.descricao
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL ORÇAMENTO */}
      <div
        className="modal fade"
        id="modalOrcamento"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div
            className="modal-content border-0"
            style={{
              background: "#111",
              color: "white",
              borderRadius: "24px",
            }}
          >
            <div
              className="modal-header border-0"
              style={{
                background:
                  "linear-gradient(135deg,#940533,#c0012a,#f5061d)",
              }}
            >
              <div>
                <h2 className="fw-bold mb-1">
                  Orçamentos
                </h2>

                <p className="mb-0 opacity-75">
                  {
                    pedidoSelecionado?.produto
                  }
                </p>
              </div>

              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body p-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                <h3 className="fw-bold">
                  Opções de orçamento
                </h3>

                <button
                  className="btn visualizar-btn text-white fw-semibold"
                  onClick={() =>
                    setOrcamentos([
                      ...orcamentos,
                      {
                        id: Date.now(),
                        nome: "Novo Plano",
                        tipo: "Novo",
                        preco: "0",
                        publicado: false,
                      },
                    ])
                  }
                >
                  + Adicionar
                </button>
              </div>

              <div className="row g-4">
                {orcamentos.map(
                  (
                    orcamento,
                    index
                  ) => (
                    <div
                      className="col-lg-4"
                      key={
                        orcamento.id
                      }
                    >
                      <div
                        className="p-4 rounded-4 h-100"
                        style={{
                          background:
                            "#181818",

                          border:
                            "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span
                            className={`badge ${
                              orcamento.publicado
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {orcamento.publicado
                              ? "Publicado"
                              : "Não publicado"}
                          </span>

                          <button
                            className={`btn btn-sm ${
                              orcamento.publicado
                                ? "btn-outline-warning"
                                : "btn-outline-success"
                            }`}
                            onClick={() => {
                              const novos =
                                [
                                  ...orcamentos,
                                ];

                              novos[
                                index
                              ].publicado =
                                !novos[
                                  index
                                ]
                                  .publicado;

                              setOrcamentos(
                                novos
                              );
                            }}
                          >
                            {orcamento.publicado
                              ? "Privar"
                              : "Publicar"}
                          </button>
                        </div>

                        <input
                          type="text"
                          className="form-control fornecedor-input fw-bold mb-3"
                          value={
                            orcamento.nome
                          }
                          onChange={(
                            e
                          ) => {
                            const novos =
                              [
                                ...orcamentos,
                              ];

                            novos[
                              index
                            ].nome =
                              e.target.value;

                            setOrcamentos(
                              novos
                            );
                          }}
                        />

                        <input
                          type="text"
                          className="form-control fornecedor-input mb-3"
                          placeholder="Tipo"
                          value={
                            orcamento.tipo
                          }
                          onChange={(
                            e
                          ) => {
                            const novos =
                              [
                                ...orcamentos,
                              ];

                            novos[
                              index
                            ].tipo =
                              e.target.value;

                            setOrcamentos(
                              novos
                            );
                          }}
                        />

                        <input
                          type="text"
                          className="form-control fornecedor-input mb-4"
                          placeholder="Preço"
                          value={
                            orcamento.preco
                          }
                          onChange={(
                            e
                          ) => {
                            const novos =
                              [
                                ...orcamentos,
                              ];

                            novos[
                              index
                            ].preco =
                              e.target.value;

                            setOrcamentos(
                              novos
                            );
                          }}
                        />

                        <h2 className="fw-bold text-danger mb-4">
                          R${" "}
                          {
                            orcamento.preco
                          }
                        </h2>

                        <div className="d-flex gap-2">
                          <button className="btn visualizar-btn text-white fw-semibold w-100">
                            Salvar
                          </button>

                          <button
                            className="btn btn-outline-danger"
                            onClick={() => {
                              const novos =
                                orcamentos.filter(
                                  (
                                    _,
                                    i
                                  ) =>
                                    i !==
                                    index
                                );

                              setOrcamentos(
                                novos
                              );
                            }}
                          >
                            🗑
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}