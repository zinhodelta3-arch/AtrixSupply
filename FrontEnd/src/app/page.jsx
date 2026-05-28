"use client";
import { useState } from "react";
import "./page.css";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <>
      <main>
        <div className="hero-industrial">
          <img src="/en1.png" className="gear-big" alt="" />
          <img src="/en2.png" className="gear-small" alt="" />

          {/* PEÇA GIGANTE DESFOCADA */}
          <img src="/engrenagem.png" className="bg-piece-blur" alt="" />

          {/* PEÇA DISTANTE */}
          <img src="/parafuso.png" className="bg-piece-back" alt="" />

          <div className="container col-xxl-8 px-4" style={{ paddingTop: "50px" }}>
            <div className="row flex-lg-row-reverse align-items-center g-5">
              <div className="col-10 col-sm-8 col-lg-6">
                {/* IMAGEM PRINCIPAL */}
                <img
                  src="porca.png"
                  className="d-block mx-lg-auto img-fluid porca-bd"
                  alt="Peça Industrial"
                  width={700}
                  height={500}
                  loading="lazy"
                />
              </div>

              <div className="col-lg-6">
                <h1 className="display-5 fw-bold lh-1 mb-3 titulo" style={{ fontSize: "60px" }}>
                  A Melhor{" "}
                  <span
                    style={{
                      background: "linear-gradient(90deg, orange, red)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Fornecedora
                  </span>{" "}
                  de Peças Industriais para a sua Empresa
                </h1>

                <p className="lead" style={{ fontSize: "25px" }}>
                  Fornecemos componentes industriais de alta qualidade, desenvolvidos para garantir segurança,
                  eficiência e máxima durabilidade em todos os tipos de operações e projetos industriais.
                </p>

                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                  <button type="button" className="btn btn-primary btn-lg px-4 me-md-2 btn-custom">
                    Orçamento
                  </button>

                  <button type="button" className="btn btn-outline-secondary btn-lg px-4 btn-sec">
                    Categorias
                  </button>
                  <br />
                </div>
              </div>

              <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "40px" }}>
                <div style={{ display: "flex", gap: "80px", alignItems: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <h1 style={{ color: "#ff3c00", marginBottom: "5px" }}>5000+</h1>
                    <p style={{ margin: 0, color: "#a0a0a0" }}>Fornecedores</p>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <h1 style={{ color: "#ff3c00", marginBottom: "5px" }}>15k+</h1>
                    <p style={{ margin: 0, color: "#a0a0a0" }}>Clientes Ativos</p>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <h1 style={{ color: "#ff3c00", marginBottom: "5px" }}>99.9%</h1>
                    <p style={{ margin: 0, color: "#a0a0a0" }}>Uptime</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>




        {/* SERVIÇOS */}
        <section className="bg-black text-light py-5 py-xl-8">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-12 col-md-10 col-lg-8 col-xl-7">
                <h3 className="fs-6 mb-2 text-center text-uppercase" style={{ color: "#f5061d" }}>
                  Por que escolher o AtrixSupply?
                </h3>

                <h2 className="display-5 mb-5 text-center text-white">
                  Oferecemos peças de qualidade, atendimento especializado e soluções eficientes para você
                </h2>

                <hr className="w-50 mx-auto mb-5 mb-xl-9" style={{ borderColor: "#f5061d" }} />
              </div>
            </div>
          </div>

          <div className="container overflow-hidden">
            <div className="row gy-4 gy-xl-0">
              <div className="col-12 col-sm-6 col-xl-3">
                <div
                  className="card text-light border-0 shadow h-100"
                  style={{ backgroundColor: "#000", borderBottom: "4px solid #f5061d" }}
                >
                  <div className="card-body text-center p-4 p-xxl-5">
                    <i className="bi bi-headset mb-4" style={{ fontSize: "55px", color: "#f5061d", display: "block" }}></i>
                    <h4 className="mb-4 text-white">Atendimento Especializado</h4>
                    <p style={{ color: "#b3b3b3" }}>
                      Nossa equipe oferece suporte completo para ajudar você a encontrar as peças ideais com rapidez e total confiança.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-xl-3">
                <div
                  className="card text-light border-0 shadow h-100"
                  style={{ backgroundColor: "#000", borderBottom: "4px solid #f5061d" }}
                >
                  <div className="card-body text-center p-4 p-xxl-5">
                    <i className="bi bi-truck mb-4" style={{ fontSize: "55px", color: "#f5061d", display: "block" }}></i>
                    <h4 className="mb-4 text-white">Entrega <br /> Rápida</h4>
                    <p style={{ color: "#b3b3b3" }}>
                      Contamos com logística eficiente para entregar suas peças com mais velocidade e segurança.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-xl-3">
                <div
                  className="card text-light border-0 shadow h-100"
                  style={{ backgroundColor: "#000", borderBottom: "4px solid #f5061d" }}
                >
                  <div className="card-body text-center p-4 p-xxl-5">
                    <i className="bi bi-gear-wide-connected mb-4" style={{ fontSize: "55px", color: "#f5061d", display: "block" }}></i>
                    <h4 className="mb-4 text-white">Peças de Qualidade</h4>
                    <p style={{ color: "#b3b3b3" }}>
                      Selecionamos produtos de alta qualidade para garantir mais desempenho e durabilidade.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-xl-3">
                <div
                  className="card text-light border-0 shadow h-100"
                  style={{ backgroundColor: "#000", borderBottom: "4px solid #f5061d" }}
                >
                  <div className="card-body text-center p-4 p-xxl-5">
                    <i className="bi bi-shield-check mb-4" style={{ fontSize: "55px", color: "#f5061d", display: "block" }}></i>
                    <h4 className="mb-4 text-white">Compra <br /> Segura</h4>
                    <p style={{ color: "#b3b3b3" }}>
                      Garantimos uma experiência segura com pagamentos confiáveis e proteção em cada pedido.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>










        {/* PRODUTOS */}
        <section
          className="py-5 position-relative"
          style={{
            background: "linear-gradient(to right, #ff0000, #ff7a00)"
          }}
        >
          <div className="container position-relative">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="text-white fw-bold">Nossos Produtos</h2>
            </div>

            <div id="carouselProdutos" className="carousel slide">
              {/* SETAS COM EVENTO CLICK */}
              <button className="carousel-control-prev custom-arrow" type="button" onClick={prevSlide} style={{ transform: "translateX(-90px)" }}>
                <span className="custom-icon">❮</span>
              </button>

              <button className="carousel-control-next custom-arrow" type="button" onClick={nextSlide} style={{ transform: "translateX(90px)" }}>
                <span className="custom-icon">❯</span>
              </button>

              <div className="carousel-inner">
                {/* SLIDE 1 */}
                <div className={`carousel-item ${currentSlide === 0 ? "active" : ""}`}>
                  <div className="row g-4">
                    <div className="col-md-4">
                      <div className="card produto-card h-100 border-0 shadow-lg">
                        <img src="/fixadores.png" className="card-img-top produto-img" alt="Fixadores" />
                        <div className="card-body">
                          <h5 className="card-title">Fixadores</h5>
                          <p className="card-text">Parafusos, porcas, arruelas e sistemas de fixação industrial.</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="card produto-card h-100 border-0 shadow-lg">
                        <img src="/engrenagens.png" className="card-img-top produto-img" alt="Engrenagens" />
                        <div className="card-body">
                          <h5 className="card-title">Engrenagens</h5>
                          <p className="card-text">Engrenagens industriais de alta precisão para máquinas e motores.</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="card produto-card h-100 border-0 shadow-lg">
                        <img src="/rolamentos.png" className="card-img-top produto-img" alt="Rolamentos" />
                        <div className="card-body">
                          <h5 className="card-title">Rolamentos</h5>
                          <p className="card-text">Rolamentos resistentes para aplicações industriais pesadas.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SLIDE 2 */}
                <div className={`carousel-item ${currentSlide === 1 ? "active" : ""}`}>
                  <div className="row g-4">
                    <div className="col-md-4">
                      <div className="card produto-card h-100 border-0 shadow-lg">
                        <img src="/hidraulica.png" className="card-img-top produto-img" alt="Hidráulica" />
                        <div className="card-body">
                          <h5 className="card-title">Hidráulica</h5>
                          <p className="card-text">Componentes hidráulicos para sistemas industriais modernos.</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="card produto-card h-100 border-0 shadow-lg">
                        <img src="/motores.png" className="card-img-top produto-img" alt="Motores" />
                        <div className="card-body">
                          <h5 className="card-title">Motores</h5>
                          <p className="card-text">Motores industriais de alta performance e eficiência energética.</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="card produto-card h-100 border-0 shadow-lg">
                        <img src="/ferramentas.png" className="card-img-top produto-img" alt="Ferramentas" />
                        <div className="card-body">
                          <h5 className="card-title">Ferramentas</h5>
                          <p className="card-text">Ferramentas profissionais para manutenção e produção industrial.</p>
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