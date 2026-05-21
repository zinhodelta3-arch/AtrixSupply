"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./suporteadmin.css";

export default function AdminSuporte() {
  return (
    <main
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(to bottom, #111111, #1a1a1a)",
      }}
    >
      <div className="container">
        <div className="mb-5 text-center">
          <span className="badge px-4 py-2 fs-6 admin-badge">
            Painel Administrativo
          </span>

          <h1 className="display-5 fw-bold text-white mt-4">
            Central de Suporte
          </h1>

          <p className="text-secondary fs-5">
            Gerencie solicitações e acompanhe o andamento dos atendimentos.
          </p>
        </div>

        <div className="card border-0 shadow-lg rounded-4 admin-card">
          <div className="card-body p-4 p-lg-5">

            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-4 gap-3">
              
              <div>
                <h3 className="fw-bold text-white mb-1">
                  Solicitação #2048
                </h3>

                <p className="text-secondary mb-0">
                  Recebido em 18/05/2026 às 14:22
                </p>
              </div>

              <div className="d-flex align-items-center gap-3">

                <span className="fw-semibold text-white">
                  Status:
                </span>

                <select className="form-select status-select">
                  <option>Pendente</option>
                  <option>Em análise</option>
                  <option>Respondido</option>
                  <option>Resolvido</option>
                </select>

              </div>
            </div>

            <div className="row g-4">

              <div className="col-lg-4">

                <div className="info-box p-4 rounded-4 h-100">

                  <h5 className="text-white fw-bold mb-4">
                    Informações do Cliente
                  </h5>

                  <div className="mb-3">
                    <small className="text-secondary">
                      Empresa
                    </small>

                    <p className="text-white mb-0">
                      Metalúrgica Alpha
                    </p>
                  </div>

                  <div className="mb-3">
                    <small className="text-secondary">
                      Responsável
                    </small>

                    <p className="text-white mb-0">
                      Carlos Henrique
                    </p>
                  </div>

                  <div className="mb-3">
                    <small className="text-secondary">
                      E-mail
                    </small>

                    <p className="text-white mb-0">
                      contato@alpha.com
                    </p>
                  </div>

                  <div>
                    <small className="text-secondary">
                      Telefone
                    </small>

                    <p className="text-white mb-0">
                      (11) 99999-9999
                    </p>
                  </div>

                </div>

              </div>

              <div className="col-lg-8">

                <div className="mensagem-box p-4 rounded-4 h-100">

                  <div className="d-flex justify-content-between align-items-center mb-4">

                    <h5 className="text-white fw-bold mb-0">
                      Mensagem do Cliente
                    </h5>

                    <span className="badge mensagem-badge">
                      Prioridade Alta
                    </span>

                  </div>

                  <div className="mensagem-area rounded-4 p-4">

                    <p className="text-secondary mb-0">
                      A mensagem enviada pelo cliente aparecerá aqui.
                      Esta área será preenchida futuramente pelo banco de dados.
                    </p>

                  </div>


                  <div className="d-flex flex-wrap gap-3 mt-4">

                    <button className="btn btn-outline-warning px-4">
                      Entrar em contato
                    </button>

                    <button className="btn btn-outline-light px-4">
                      Ver histórico
                    </button>

                    <button className="btn responder-btn px-4 text-white">
                      Responder chamado
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}