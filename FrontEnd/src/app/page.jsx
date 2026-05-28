import "./page.css";

export default function Home() {
  return (
    <>
      <main>
        <div className="container col-xxl-8 px-4 py-5">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img
                src="porca.png"
                className="d-block mx-lg-auto img-fluid"
                alt="Peça Industrial"
                width={700}
                height={500}
                loading="lazy"
              />
            </div>

            <div className="col-lg-6">
              <h1 className="display-5 fw-bold lh-1 mb-3 titulo">
                A Melhor Fornecedora de Peças Industriais para a sua Empresa
              </h1>

              <p className="lead">
                Fornecemos componentes industriais de alta qualidade,
                desenvolvidos para garantir segurança, eficiência e máxima
                durabilidade em todos os tipos de operações e projetos
                industriais.
              </p>

              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <button
                  type="button"
                  className="btn btn-primary btn-lg px-4 me-md-2 btn-custom"
                >
                  Orçamento
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary btn-lg px-4 btn-sec"
                >
                  Categorias
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SERVIÇOS */}
        <section className="bg-black text-light py-5 py-xl-8">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-12 col-md-10 col-lg-8 col-xl-7">
                <h3
                  className="fs-6 mb-2 text-center text-uppercase"
                  style={{ color: "#f5061d" }}
                >
                  What we do?
                </h3>

                <h2 className="display-5 mb-5 text-center text-white">
                  Oferecemos peças de qualidade, atendimento especializado e
                  soluções eficientes para você
                </h2>

                <hr
                  className="w-50 mx-auto mb-5 mb-xl-9"
                  style={{ borderColor: "#f5061d" }}
                />
              </div>
            </div>
          </div>

          <div className="container overflow-hidden">
            <div className="row gy-4 gy-xl-0">
              
              {/* CARD 1 */}
              <div className="col-12 col-sm-6 col-xl-3">
                <div
                  className="card text-light border-0 shadow h-100"
                  style={{
                    backgroundColor: "#000",
                    borderBottom: "4px solid #f5061d",
                  }}
                >
                  <div className="card-body text-center p-4 p-xxl-5">
                    <h4 className="mb-4 text-white">
                      Atendimento Especializado
                    </h4>

                    <p style={{ color: "#b3b3b3" }}>
                      Nossa equipe oferece suporte completo para ajudar você a
                      encontrar as peças ideais com rapidez e total confiança.
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 2 */}
              <div className="col-12 col-sm-6 col-xl-3">
                <div
                  className="card text-light border-0 shadow h-100"
                  style={{
                    backgroundColor: "#000",
                    borderBottom: "4px solid #f5061d",
                  }}
                >
                  <div className="card-body text-center p-4 p-xxl-5">
                    <h4 className="mb-4 text-white">
                      Entrega <br /> Rápida
                    </h4>

                    <p style={{ color: "#b3b3b3" }}>
                      Contamos com logística eficiente para entregar suas peças
                      com mais velocidade e segurança.
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 3 */}
              <div className="col-12 col-sm-6 col-xl-3">
                <div
                  className="card text-light border-0 shadow h-100"
                  style={{
                    backgroundColor: "#000",
                    borderBottom: "4px solid #f5061d",
                  }}
                >
                  <div className="card-body text-center p-4 p-xxl-5">
                    <h4 className="mb-4 text-white">
                      Peças de Qualidade
                    </h4>

                    <p style={{ color: "#b3b3b3" }}>
                      Selecionamos produtos de alta qualidade para garantir mais
                      desempenho e durabilidade.
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 4 */}
              <div className="col-12 col-sm-6 col-xl-3">
                <div
                  className="card text-light border-0 shadow h-100"
                  style={{
                    backgroundColor: "#000",
                    borderBottom: "4px solid #f5061d",
                  }}
                >
                  <div className="card-body text-center p-4 p-xxl-5">
                    <h4 className="mb-4 text-white">
                      Compra <br /> Segura
                    </h4>

                    <p style={{ color: "#b3b3b3" }}>
                      Garantimos uma experiência segura com pagamentos
                      confiáveis e proteção em cada pedido.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUTOS */}
        <section className="py-5 bg-dark position-relative">
          <div className="container position-relative">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="text-white fw-bold">Nossos Produtos</h2>
            </div>

            <div
              id="carouselProdutos"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="4000"
            >
              <button
                className="carousel-control-prev custom-arrow"
                type="button"
                data-bs-target="#carouselProdutos"
                data-bs-slide="prev"
              >
                <span className="custom-icon">❮</span>
              </button>

              <button
                className="carousel-control-next custom-arrow"
                type="button"
                data-bs-target="#carouselProdutos"
                data-bs-slide="next"
              >
                <span className="custom-icon">❯</span>
              </button>

              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row g-4">

                    <div className="col-md-4">
                      <div className="card produto-card h-100 border-0 shadow-lg">
                        <img
                          src="fixadores.png"
                          className="card-img-top"
                          alt="Fixadores"
                        />

                        <div className="card-body">
                          <h5 className="card-title">Fixadores</h5>

                          <p className="card-text">
                            Parafusos, porcas e arruelas industriais.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}