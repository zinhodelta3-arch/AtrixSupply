"use client";

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./produtos.css"

export default function Produtos() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const produtos = [
    {
      id: "id",
      nome: "Nome do produto",
      descricao: "Descrição do produto",
      preco: "R$",
      categoria: "Categoria do produto",
      imagem: "Imagem do produto",
    },

];

const [paginaAtual, setPaginaAtual] = useState(1);

const produtosPorPagina = 12;

const ultimoProduto =
  paginaAtual * produtosPorPagina;

const primeiroProduto =
  ultimoProduto - produtosPorPagina;

const produtosAtuais = produtos.slice(
  primeiroProduto,
  ultimoProduto
);

const totalPaginas = Math.ceil(
  produtos.length / produtosPorPagina
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
            "linear-gradient(to right, #c0012a, #ff8800)",
        }}
      >
        <div className="container py-4">
          <h1 className="display-4 fw-bold">Nossos Produtos</h1>

          <p className="lead mt-3 col-lg-8">
            Encontre peças industriais, componentes técnicos e soluções
            específicas para sua empresa com rapidez e segurança.
          </p>
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
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                }}
              >
                <h3 className="text-white fw-bold mb-4">
                  Filtrar Produtos
                </h3>


                <div className="mb-4">
                  <label className="form-label text-white">
                    Buscar Produto
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Digite o nome..."
                    style={{
                      background: "#1c1c1c",
                      border: "1px solid #3b3b3b",
                      color: "#fff",
                    }}
                  />
                </div>


                <div className="mb-4">
                  <label className="form-label text-white">
                    Categoria
                  </label>

                  <select
                    className="form-select"
                    style={{
                      background: "#1c1c1c",
                      border: "1px solid #3b3b3b",
                      color: "#fff",
                    }}
                  >
                    <option>Todas</option>
                    <option>Automação Industrial</option>
                    <option>Elétrica Industrial</option>
                    <option>Ferramentas Industriais</option>
                    <option>Fixação Industrial</option>
                    <option>Instrumentação e Medição</option>
                    <option>Lubrificação e Manutenção</option>
                    <option>Máquinas Industriais</option>
                    <option>Motores e Acionamentos</option>
                    <option>Peças Mecânicas</option>
                    <option>Pneumática e Hidráulica</option>
                    <option>Segurança Industrial (EPI)</option>
                    <option>Solda e Metalurgia</option>
                  </select>
                </div>


                <div className="mb-4">
                  <label className="form-label text-white">
                    Faixa de preço
                  </label>

                  <input
                    type="range"
                    className="form-range"
                  />
                </div>


                <div className="mb-4">
                  <label className="form-label text-white">
                    Disponibilidade
                  </label>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="estoque"
                    />

                    <label
                      className="form-check-label text-white"
                      htmlFor="estoque"
                    >
                      Em estoque
                    </label>
                  </div>
                </div>

                <button
                  className="corbtn btn w-100 text-white fw-semibold"
                  style={{
                    background:
                      "linear-gradient(to right, #c0012a, #ff8800)",
                    border: "none",
                  }}
                >
                  Aplicar filtros
                </button>
              </div>
            </div>


            <div className="col-lg-9">
              <div className="row g-4">
                {produtosAtuais.map((produto) => (
                  <div className="col-md-6 col-lg-3" key={produto.id}>
                    <div
                      className="borda amplia card h-100 border-0 shadow-lg overflow-hidden"
                      style={{
                        background: "#111",
                        transition: "0.3s",
                        border: "1px solid rgba(199, 68, 68, 0.14)",
                      }}
                    >
                      <link rel="stylesheet" href="" />

                      <img
                        src="Imagem do produto aqui"
                        className="card-img-top"
                        alt={produto.img}
                        style={{
                          height: "220px",
                          objectFit: "cover",
                        }}
                      />


                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title text-white fw-bold">
                          {produto.nome}
                        </h5>

                        <p
                          className="card-text mt-2"
                          style={{
                            color: "#cfcfcf",
                          }}
                        >
                          {produto.descricao}
                        </p>

                        <p
                          className="card-text mt-2 tam"
                          style={{
                            color: "#ffee8b",
                          }}
                        >
                          {produto.categoria}
                        </p>

                        <p
                          className="card-text mt-2 fw-bold"
                          style={{
                            color: "#5ba100dc",
                          }}
                        >
                          {produto.preco}
                        </p>

                        
                      </div>
                    </div>
                  </div>
                ))}


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
    </main>
  );
}