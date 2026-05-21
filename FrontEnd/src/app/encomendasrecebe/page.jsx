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
      categoria: "Motores",
      empresa: "Indústria Alpha",
      quantidade: 4,
      status: "concluído",
      data: "12/06/2026",
    },

    {
      id: 2,
      produto: "parafuso",
      categoria: "Motores",
      empresa: "Indústria Alpha",
      quantidade: 4,
      status: "Enviado",
      data: "12/06/2026",
    },

    {
      id: 3,
      produto: "parafuso",
      categoria: "Motores",
      empresa: "Indústria Alpha",
      quantidade: 4,
      status: "Pendente",
      data: "12/06/2026",
    },

    {
      id: 4,
      produto: "Motor Industrial X200",
      categoria: "Motores",
      empresa: "Indústria Alpha",
      quantidade: 4,
      status: "Pendente",
      data: "12/06/2026",
    },

    {
      id: 5,
      produto: "Motor Industrial X200",
      categoria: "Rolamentos",
      empresa: "Indústria Alpha",
      quantidade: 4,
      status: "Pendente",
      data: "12/06/2026",
    },

    {
      id: 6,
      produto: "Motor Industrial X200",
      categoria: "Rolamentos",
      empresa: "Indústria Alpha",
      quantidade: 4,
      status: "Pendente",
      data: "12/06/2026",
    },

    {
      id: 7,
      produto: "Motor Industrial X200",
      categoria: "Motores",
      empresa: "Indústria Alpha",
      quantidade: 4,
      status: "Pendente",
      data: "12/06/2026",
    },

    {
      id: 8,
      produto: "Motor Industrial X200",
      categoria: "Motores",
      empresa: "Indústria Alpha",
      quantidade: 4,
      status: "Pendente",
      data: "12/06/2026",
    },
  ];

const [listaEncomendas, setListaEncomendas] = 
  useState(encomendas);

const [paginaAtual, setPaginaAtual] = useState(1);

const [busca, setBusca] = useState("");

const [categoriaSelecionada, setCategoriaSelecionada] =
  useState("Todas");

const [statusSelecionado, setStatusSelecionado] =
  useState("Todos");

const [filtrosAplicados, setFiltrosAplicados] = useState({
  categoria: "Todas",
  status: "Todos",
});

const encomendasPorPagina = 8;

const indiceUltimaEncomenda = paginaAtual * encomendasPorPagina;

const indicePrimeiraEncomenda =
  indiceUltimaEncomenda - encomendasPorPagina;


const encomendasFiltradas = listaEncomendas.filter(
  (pedido) => {

    const buscaMatch =
      pedido.produto
        .toLowerCase()
        .includes(busca.toLowerCase());

    const categoriaMatch =
      filtrosAplicados.categoria === "Todas" ||
      pedido.categoria === filtrosAplicados.categoria;

    const statusMatch =
      filtrosAplicados.status === "Todos" ||
      pedido.status === filtrosAplicados.status;

    return (
      buscaMatch &&
      categoriaMatch &&
      statusMatch
    );
  }
);

const encomendasAtuais = encomendasFiltradas.slice(
  indicePrimeiraEncomenda,
  indiceUltimaEncomenda
);

const totalPaginas = Math.ceil(
  encomendasFiltradas.length / encomendasPorPagina
);


  return (
    <main
      style={{
        background: "#000",
        minHeight: "100vh",
      }}
    >

      <section
        className="py-5 text-white"
        style={{
          background:
            "linear-gradient(135deg, #940533, #c0012a, #f5061d)",
        }}
      >
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="badge bg-warning text-dark mb-3 px-3 py-2">
                Painel do Fornecedor
              </span>

              <h1 className="display-4 fw-bold">
                Gerencie suas encomendas
              </h1>

              <p className="lead mt-3">
                Visualize todos os pedidos recebidos pela sua empresa,
                acompanhe o status das encomendas e organize suas entregas.
              </p>
            </div>

            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <button className="btn btn-outline-light btn-lg fw-semibold" 
              onClick={() => window.location.reload()}>
                Atualizar pedidos
              </button>
            </div>
          </div>
        </div>
      </section>

    
      <section className="py-5">
        <div className="container-fluid px-4">
          <div className="row">
            
     
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
                  Filtrar Encomendas
                </h3>

             
                <div className="mb-4">
                  <label className="form-label text-white">
                    Buscar Produto
                  </label>

                  <input
                    type="text"
                    className="form-control fornecedor-input"
                    placeholder="Digite o nome do produto"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                  />
                </div>


                <div className="mb-4">
                  <label className="form-label text-white">
                    Categoria
                  </label>

                  <select
                    className="form-select fornecedor-input"
                    value={categoriaSelecionada}
                    onChange={(e) => 
                      setCategoriaSelecionada(e.target.value)}
                  >
                    <option>Todas</option>
                    <option>Motores</option>
                    <option>Rolamentos</option>
                    <option>Painéis</option>
                    <option>Engrenagens</option>
                  </select>
                </div>

              
                <div className="mb-4">
                  <label className="form-label text-white">
                    Status
                  </label>

                  <select
                    className="form-select fornecedor-input"
                    value={statusSelecionado}
                    onChange={(e) => 
                        setStatusSelecionado(e.target.value)}
                  >
                    <option>Todos</option>
                    <option>Pendente</option>
                    <option>Em andamento</option>
                    <option>Enviado</option>
                    <option>Concluído</option>
                  </select>
                </div>

                <button
                className="btn w-100 text-white fw-semibold filtro-btn"
                onClick={() => setFiltrosAplicados({
                    categoria: categoriaSelecionada,
                    status: statusSelecionado,
                })}> Aplicar filtros
                </button>
              </div>
            </div>

        
            <div className="col-lg-9">
                {encomendasFiltradas.length === 0 && (
  <div
    className="text-center py-5 rounded-4"
    style={{
      background: "#111",
      border: "1px solid rgba(255,255,255,0.1)",
    }}
  >
    <h3 className="text-white fw-bold mb-3">
      Nenhuma encomenda encontrada
    </h3>

    <p className="text-secondary mb-0">
      Tente alterar os filtros ou buscar outro produto.
    </p>
  </div>
)}
              <div className="row g-4">
                {encomendasAtuais.map((pedido) => (
                  <div className="col-12" key={pedido.id}>
                    <div
                      className="card border-0 shadow-lg overflow-hidden encomenda-card"
                      style={{
                        background: "#111",
                      }}
                    >
                      <div className="card-body p-4">
                        <div className="row align-items-center">
                          
            
                          <div className="col-lg-8">
                            <div className="d-flex flex-wrap gap-2 mb-3">
                              <span className="badge bg-danger">
                                {pedido.categoria}
                              </span>

                              <span className="badge bg-warning text-dark">
                                {pedido.status}
                              </span>
                            </div>

                            <h3 className="text-white fw-bold">
                              {pedido.produto}
                            </h3>

                            <p className="text-secondary mb-2">
                              Empresa solicitante:
                              <span className="text-white fw-semibold ms-2">
                                {pedido.empresa}
                              </span>
                            </p>

                            <p className="text-secondary mb-2">
                              Quantidade:
                              <span className="text-white fw-semibold ms-2">
                                {pedido.quantidade}
                              </span>
                            </p>

                            <p className="text-secondary">
                              Data do pedido:
                              <span className="text-white fw-semibold ms-2">
                                {pedido.data}
                              </span>
                            </p>
                          </div>


                          <div className="col-lg-4 mt-4 mt-lg-0">
                            <div className="d-grid gap-3">
                              <button className="btn visualizar-btn text-white fw-semibold">
                                Ver detalhes
                              </button>

                              <select className="form-select fornecedor-input">
                                <option>Alterar status</option>
                                <option>Pendente</option>
                                <option>Em andamento</option>
                                <option>Enviado</option>
                                <option>Concluído</option>
                              </select>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>


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
      </section>
    </main>
  );
}