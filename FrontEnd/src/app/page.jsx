import Image from "next/image";
import styles from "./page.module.css";
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
        alt="Bootstrap Themes"
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
        Fornecemos componentes industriais de alta qualidade, desenvolvidos para garantir segurança, eficiência e máxima durabilidade em todos os tipos de operações e projetos industriais.
      </p>
      <div className="d-grid gap-2 d-md-flex justify-content-md-start">
        <button type="button" className="btn btn-primary btn-lg px-4 me-md-2 btn-custom">
          Orçamento
        </button>
        <button type="button" className="btn btn-outline-secondary btn-lg px-4 btn-sec">
          Categorias
        </button>
      </div>
    </div>
  </div>
</div>





<>
  {/* Service 4 - Bootstrap Brain Component */}
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
          Oferecemos peças de qualidade, atendimento especializado e soluções eficientes para você
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
            borderBottom: "4px solid #f5061d"
          }}
        >
          <div className="card-body text-center p-4 p-xxl-5">

           <svg
        xmlns="http://www.w3.org/2000/svg"
        width={56}
        height={56}
        fill="currentColor"
        className="bi bi-headset mb-4"
        style={{ color: "#f5061d" }}
        viewBox="0 0 16 16"
      >
        <path d="M8 1a5 5 0 0 0-5 5v4a2 2 0 0 0 2 2h1V8H4V6a4 4 0 1 1 8 0v2h-2v4h1a2 2 0 0 0 2-2V6a5 5 0 0 0-5-5z" />
      </svg>

            <h4 className="mb-4 text-white">Atendimento Especializado</h4>

            <p style={{ color: "#b3b3b3" }}>
              Nossa equipe oferece suporte completo para ajudar você a encontrar as peças ideais com rapidez e total confiança.
            </p>

            <a
              href="#!"
              className="fw-bold text-decoration-none"
              style={{ color: "#f5061d" }}
            >
              Ler mais
            </a>

          </div>
        </div>
      </div>

      {/* CARD 2 */}
      <div className="col-12 col-sm-6 col-xl-3">
        <div
          className="card text-light border-0 shadow h-100"
          style={{
            backgroundColor: "#000",
            borderBottom: "4px solid #f5061d"
          }}
        >
          <div className="card-body text-center p-4 p-xxl-5">

           <svg
  xmlns="http://www.w3.org/2000/svg"
  width={56}
  height={56}
  fill="currentColor"
  className="bi bi-box-seam mb-4"
  style={{ color: "#f5061d" }}
  viewBox="0 0 16 16"
>
  <path d="M8.186.113a1 1 0 0 0-.372 0l-7 1.75A1 1 0 0 0 0 2.83v8.338a1 1 0 0 0 .757.97l7 1.75a1 1 0 0 0 .486 0l7-1.75a1 1 0 0 0 .757-.97V2.83a1 1 0 0 0-.814-.967l-7-1.75zM8 1.15l6.5 1.625L8 4.4 1.5 2.775 8 1.15zM1 3.694l6.5 1.625v7.531L1 11.225V3.694zm7.5 9.156V5.319L15 3.694v7.531L8.5 12.85z" />
</svg>
            <h4 className="mb-4 text-white">Entrega <br /> Rápida</h4>

            <p style={{ color: "#b3b3b3" }}>
             Contamos com logística eficiente para entregar suas peças com mais velocidade, segurança e praticidade diária.
            </p>

            <a
              href="#!"
              className="fw-bold text-decoration-none"
              style={{ color: "#f5061d" }}
            >
              Ler mais
            </a>

          </div>
        </div>
      </div>

      {/* CARD 3 */}
      <div className="col-12 col-sm-6 col-xl-3">
        <div
          className="card text-light border-0 shadow h-100"
          style={{
            backgroundColor: "#000",
            borderBottom: "4px solid #f5061d"
          }}
        >
          <div className="card-body text-center p-4 p-xxl-5">

           <svg
  xmlns="http://www.w3.org/2000/svg"
  width={56}
  height={56}
  fill="currentColor"
  className="bi bi-shield-gear mb-4"
  style={{ color: "#f5061d" }}
  viewBox="0 0 16 16"
>
  {/* Engrenagem */}
  <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.46 1.46 0 0 1-2.105.872l-.31-.17c-1.26-.69-2.66.71-1.97 1.97l.17.31a1.46 1.46 0 0 1-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.46 1.46 0 0 1 .872 2.105l-.17.31c-.69 1.26.71 2.66 1.97 1.97l.31-.17a1.46 1.46 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.46 1.46 0 0 1 2.105-.872l.31.17c1.26.69 2.66-.71 1.97-1.97l-.17-.31a1.46 1.46 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.46 1.46 0 0 1-.872-2.105l.17-.31c.69-1.26-.71-2.66-1.97-1.97l-.31.17a1.46 1.46 0 0 1-2.105-.872l-.1-.34zM8 5.2A2.8 2.8 0 1 1 8 10.8 2.8 2.8 0 0 1 8 5.2z" />


</svg>

            <h4 className="mb-4 text-white">Peças de Qualidade</h4>

            <p style={{ color: "#b3b3b3" }}>
              Selecionamos produtos de alta qualidade para garantir mais desempenho, resistência e durabilidade contínua.
            </p>

            <a
              href="#!"
              className="fw-bold text-decoration-none"
              style={{ color: "#f5061d" }}
            >
              Ler mais
            </a>

          </div>
        </div>
      </div>

      {/* CARD 4 */}
      <div className="col-12 col-sm-6 col-xl-3">
        <div
          className="card text-light border-0 shadow h-100"
          style={{
            backgroundColor: "#000",
            borderBottom: "4px solid #f5061d"
          }}
        >
          <div className="card-body text-center p-4 p-xxl-5">

           <svg
  xmlns="http://www.w3.org/2000/svg"
  width={56}
  height={56}
  fill="currentColor"
  className="bi bi-cart-check mb-4"
  style={{ color: "#f5061d" }}
  viewBox="0 0 16 16"
>
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .49.402L2.89 3H14.5a.5.5 0 0 1 .49.598l-1.5 7A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.49-.402L1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 6h8.184l1.286-6H3.102z" />
  
  <path d="M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
  
  <path d="M10.854 5.646a.5.5 0 0 0-.708 0L8.5 7.293 7.854 6.646a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708z" />
</svg>

            <h4 className="mb-4 text-white">Compra <br />Segura</h4>

            <p style={{ color: "#b3b3b3" }}>
            Garantimos uma experiência segura com pagamentos confiáveis, transparência e proteção em cada pedido realizado diariamente.
            </p>

            <a
              href="#!"
              className="fw-bold text-decoration-none"
              style={{ color: "#f5061d" }}
            >
              Ler mais
            </a>

          </div>
        </div>
      </div>

    </div>
  </div>
</section>
</>












<section className="py-5 bg-dark position-relative">
  <div className="container position-relative">

    {/* Topo */}
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="text-white fw-bold">Nossos Produtos</h2>
    </div>

    {/* Carousel */}
    <div
      id="carouselProdutos"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="4000"
    >

      {/* BOTÃO ESQUERDA */}
      <button
        className="carousel-control-prev custom-arrow"
        type="button"
        data-bs-target="#carouselProdutos"
        data-bs-slide="prev"
      >
        <span className="custom-icon">❮</span>
      </button>

      {/* BOTÃO DIREITA */}
      <button
        className="carousel-control-next custom-arrow"
        type="button"
        data-bs-target="#carouselProdutos"
        data-bs-slide="next"
      >
        <span className="custom-icon">❯</span>
      </button>

      <div className="carousel-inner">

        {/* Slide 1 */}
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
                    Parafusos, porcas e arruelas para aplicações industriais.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card produto-card h-100 border-0 shadow-lg">
                <img
                  src="rolamentos.png"
                  className="card-img-top"
                  alt="Rolamentos"
                />

                <div className="card-body">
                  <h5 className="card-title">Rolamentos</h5>

                  <p className="card-text">
                    Redução de atrito e maior desempenho mecânico.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card produto-card h-100 border-0 shadow-lg">
                <img
                  src="engrenagens.png"
                  className="card-img-top"
                  alt="Engrenagens"
                />

                <div className="card-body">
                  <h5 className="card-title">Engrenagens</h5>

                  <p className="card-text">
                    Transmissão de força com precisão.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Slide 2 */}
        <div className="carousel-item">
          <div className="row g-4">

            <div className="col-md-4">
              <div className="card produto-card h-100 border-0 shadow-lg">
                <img
                  src="correias.png"
                  className="card-img-top"
                  alt="Correias"
                />

                <div className="card-body">
                  <h5 className="card-title">Correias</h5>

                  <p className="card-text">
                    Soluções para transmissão mecânica.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card produto-card h-100 border-0 shadow-lg">
                <img
                  src="buchas.png"
                  className="card-img-top"
                  alt="Buchas"
                />

                <div className="card-body">
                  <h5 className="card-title">Buchas</h5>

                  <p className="card-text">
                    Redução de desgaste em componentes.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card produto-card h-100 border-0 shadow-lg">
                <img
                  src="mangueiras.png"
                  className="card-img-top"
                  alt="Mangueiras"
                />

                <div className="card-body">
                  <h5 className="card-title">Mangueiras</h5>

                  <p className="card-text">
                    Condução segura de fluidos industriais.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Slide 3 */}
        <div className="carousel-item">
          <div className="row g-4">

            <div className="col-md-4">
              <div className="card produto-card h-100 border-0 shadow-lg">
                <img
                  src="aclopamentos.png"
                  className="card-img-top"
                  alt="Acoplamentos"
                />

                <div className="card-body">
                  <h5 className="card-title">Acoplamentos</h5>

                  <p className="card-text">
                    Conexão eficiente entre sistemas mecânicos.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card produto-card h-100 border-0 shadow-lg">
                <img
                  src="rolamentos.png"
                  className="card-img-top"
                  alt="Rolamentos Premium"
                />

                <div className="card-body">
                  <h5 className="card-title">Rolamentos Premium</h5>

                  <p className="card-text">
                    Alta durabilidade industrial.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card produto-card h-100 border-0 shadow-lg">
                <img
                  src="vedadores.png"
                  className="card-img-top"
                  alt="Vedadores"
                />

                <div className="card-body">
                  <h5 className="card-title">Vedadores</h5>

                  <p className="card-text">
                    Proteção contra vazamentos e contaminação.
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
