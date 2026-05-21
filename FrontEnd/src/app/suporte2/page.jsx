"use client"

import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./suporte2.css"

export default function Suporte() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");}, []);
  return (
    <main
      style={{
        background: "#000000",
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
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <span className="badge bg-warning text-dark mb-3 px-3 py-2">
                Central de Suporte
              </span>

              <h1 className="display-4 fw-bold mb-4">
                Precisa de ajuda com uma peça ou pedido?
              </h1>

              <p className="lead mb-4">
                Nossa equipe está pronta para auxiliar sua empresa na busca,
                compra e acompanhamento de peças industriais específicas para
                suas máquinas.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <button onClick={() => document.getElementById('chamado').scrollIntoView({ behavior: "smooth" })} className="btn btn-warning btn-lg fw-semibold">
                  Abrir chamado
                </button>

            
                <button className="btn btn-outline-light btn-lg">
                  Falar no WhatsApp
                </button>
              </div>
            </div>

            <div className="col-lg-5 text-center mt-5 mt-lg-0">
              <img
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop"
                alt="Suporte técnico"
                className="img-fluid rounded-4 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>


      <section id="chamado" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold ttl">Como podemos ajudar?</h2>
            <p className="sbttl">
              Escolha uma das opções abaixo para receber suporte rapidamente.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div
                className=" fundo card border-0 shadow h-100 p-4 suporte-card"
                style={{ borderTop: "5px solid #f5061d" }}
              >
                <div className="mb-3 fs-1">📦</div>

                <h4 className="fw-bold mb-3 ttl">Status do Pedido</h4>

                <p className="sbttl">
                  Consulte informações sobre envio, rastreamento e prazo de
                  entrega das peças adquiridas.
                </p>

                <button className="btn btn-outline-danger mt-3">
                  Consultar pedido
                </button>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="fundo card border-0 shadow h-100 p-4 suporte-card"
                style={{ borderTop: "5px solid #ff8800" }}
              >
                <div className="mb-3 fs-1">⚙️</div>

                <h4 className="fw-bold mb-3 ttl">Encontrar Peças</h4>

                <p className="sbttl">
                  Não encontrou a peça ideal? Nossa equipe localiza componentes
                  específicos com nossos parceiros.
                </p>

                <button className="btn btn-outline-warning mt-3">
                  Solicitar peça
                </button>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="fundo card border-0 shadow h-100 p-4 suporte-card"
                style={{ borderTop: "5px solid #940533" }}
              >
                <div className="mb-3 fs-1">🛠️</div>

                <h4 className="fw-bold mb-3 ttl">Suporte Técnico</h4>

                <p className="sbttl">
                  Receba ajuda especializada sobre compatibilidade, aplicação e
                  funcionamento das peças industriais.
                </p>

                <button className="btn btn-especialista mt-3">
                    Falar com especialista
                    </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section
        className="py-5"
        style={{
          background:
            "rgba(102, 0, 0, 0.91)",
        }}
      >
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <h2 className="ttl fw-bold mb-4">
                Entre em contato com nosso suporte
              </h2>

              <p className="sbttl">
                Preencha o formulário ao lado e nossa equipe retornará o mais
                rápido possível.
              </p>

              <div className="mt-4">
                <p className="mb-2 ttl">
                  <strong>Email:</strong> suporte@atrixsupply.com
                </p>

                <p className="mb-2 ttl">
                  <strong>Telefone:</strong> (11) 4002-8922
                </p>

                <p className="ttl">
                  <strong>Horário:</strong> Segunda a Sexta, das 8h às 18h
                </p>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="sprt card border-0 shadow-lg p-4 rounded-4">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="ctt form-control form-control-lg"
                        placeholder="Nome"
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="text"
                        className="ctt form-control form-control-lg"
                        placeholder="Empresa"
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="email"
                        className="ctt form-control form-control-lg"
                        placeholder="E-mail"
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="text"
                        className="ctt form-control form-control-lg"
                        placeholder="Telefone"
                      />
                    </div>

                    <div className="col-12">
                      <textarea
                        rows="5"
                        className="ctt form-control form-control-lg"
                        placeholder="Descreva sua dúvida ou problema"
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <button
                        className="btn btn-lg text-white w-100 fw-semibold"
                        style={{
                          background:
                            "linear-gradient(to right, #c0012a, #ff8800)",
                          border: "none",
                        }}
                      >
                        Enviar solicitação
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold ttl">Perguntas Frequentes</h2>

            <p className="sbttl">
              Tire dúvidas comuns sobre pedidos, fornecedores e entregas.
            </p>
          </div>

          <div className="accordion" id="faqAccordion">


  <div className="accordion-item faq-item mb-3">
    <h2 className="accordion-header">
      <button
        className="accordion-button collapsed faq-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#faq1"
      >
        Como encontro uma peça específica?
      </button>
    </h2>

    <div
      id="faq1"
      className="accordion-collapse collapse"
      data-bs-parent="#faqAccordion"
    >
      <div className="accordion-body faq-body">
        Basta pesquisar pelo nome, código ou modelo da máquina.
        Caso não encontre, nossa equipe pode localizar a peça
        diretamente com fornecedores parceiros.
      </div>
    </div>
  </div>


  <div className="accordion-item faq-item mb-3">
    <h2 className="accordion-header">
      <button
        className="accordion-button collapsed faq-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#faq2"
      >
        Vocês fabricam as peças?
      </button>
    </h2>

    <div
      id="faq2"
      className="accordion-collapse collapse"
      data-bs-parent="#faqAccordion"
    >
      <div className="accordion-body faq-body">
        Não. Trabalhamos conectando empresas compradoras aos nossos
        fornecedores parceiros especializados.
      </div>
    </div>
  </div>


  <div className="accordion-item faq-item mb-3">
    <h2 className="accordion-header">
      <button
        className="accordion-button collapsed faq-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#faq3"
      >
        Qual o prazo médio de entrega?
      </button>
    </h2>

    <div
      id="faq3"
      className="accordion-collapse collapse"
      data-bs-parent="#faqAccordion"
    >
      <div className="accordion-body faq-body">
        O prazo varia conforme disponibilidade do fornecedor e região
        da entrega, mas todas as etapas podem ser acompanhadas pelo
        cliente em nosso site.
      </div>
    </div>
  </div>


  <div className="accordion-item faq-item">
    <h2 className="accordion-header">
      <button
        className="accordion-button collapsed faq-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#faq4"
      >
        Posso solicitar orçamento antes da compra?
      </button>
    </h2>

    <div
      id="faq4"
      className="accordion-collapse collapse"
      data-bs-parent="#faqAccordion"
    >
      <div className="accordion-body faq-body">
        Sim! Você pode solicitar um orçamento sem compromisso
        para comparar valores e disponibilidade.
      </div>
    </div>
  </div>

</div>
          
        </div>
      </section>
    </main>
  );
}