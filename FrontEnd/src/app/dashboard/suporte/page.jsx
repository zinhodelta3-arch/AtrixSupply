"use client";

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./suporte.css";
import { FileX, TextAlignCenter } from "lucide-react";

export default function SuporteAdmin() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  
  const [mensagens, setMensagens] = useState([
    {
      id: 1,
      nome: "Nome do cliente",
      email: "emaildocliente@gmail.com",
      assunto: "Assunto",
      mensagem:
        "Mensagem, reclamação, dúvida",
      status: "Pendente",
      data: "15/06/2026",
    },

  ]);

  
  const [busca, setBusca] = useState("");
  const [statusSelecionado, setStatusSelecionado] =
    useState("Todos");

    useEffect(() => {
    setPaginaAtual(1);
}, [busca, statusSelecionado]);

 
  const [paginaAtual, setPaginaAtual] = useState(1);

  const mensagensPorPagina = 7;

  
  const [mensagemSelecionada, setMensagemSelecionada] =
    useState(null);

  const [resposta, setResposta] = useState("");

  
  const mensagensFiltradas = mensagens.filter(
    (mensagem) => {
      const buscaMatch =
        mensagem.nome
          .toLowerCase()
          .includes(busca.toLowerCase()) ||
        mensagem.email
          .toLowerCase()
          .includes(busca.toLowerCase()) ||
        mensagem.assunto
          .toLowerCase()
          .includes(busca.toLowerCase());

      const statusMatch =
        statusSelecionado === "Todos" ||
        mensagem.status === statusSelecionado;

      return buscaMatch && statusMatch;
    }
  );

  
  const indiceUltimaMensagem =
    paginaAtual * mensagensPorPagina;

  const indicePrimeiraMensagem =
    indiceUltimaMensagem - mensagensPorPagina;

  const mensagensAtuais = mensagensFiltradas.slice(
    indicePrimeiraMensagem,
    indiceUltimaMensagem
  );

  const totalPaginas = Math.ceil(
    mensagensFiltradas.length / mensagensPorPagina
  );


  const alterarStatus = (id, novoStatus) => {
    const novasMensagens = mensagens.map((msg) => {
      if (msg.id === id) {
        return {
          ...msg,
          status: novoStatus,
        };
      }

      return msg;
    });

    setMensagens(novasMensagens);
  };

  return (
    <main
      style={{
        background: "#09090b",
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
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="badge bg-warning text-dark mb-3 px-3 py-2">
                Central Administrativa
              </span>

              <h1 className="display-4 fw-bold">
                Solicitações de suporte
              </h1>

              <p className="lead mt-3">
                Gerencie mensagens, dúvidas e problemas
                enviados pelos usuários da plataforma.
              </p>
            </div>

            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <button
                className="btn btn-outline-light btn-lg fw-semibold"
                onClick={() => window.location.reload()}
              >
                Atualizar mensagens
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
                  background: "#111113",
                  border:
                    "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <h3 className="text-white fw-bold mb-4">
                  Filtrar mensagens
                </h3>

           
                <div className="mb-4">
                  <label className="form-label text-white">
                    Buscar
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nome, email ou assunto..."
                    value={busca}
                    onChange={(e) =>
                      setBusca(e.target.value)
                    }
                    style={{
                      background: "#151518",
                      border:
                        "1px solid rgba(255,255,255,0.06)",
                      color: "#fff",
                    }}
                  />
                </div>

           
                <div className="mb-4">
                  <label className="form-label text-white">
                    Status
                  </label>

                  <select
                    className="form-select"
                    value={statusSelecionado}
                    onChange={(e) =>
                      setStatusSelecionado(
                        e.target.value
                      )
                    }
                    style={{
                      background: "#151518",
                      border:
                        "1px solid rgba(255,255,255,0.06)",
                      color: "#fff",
                    }}
                  >
                    <option>Todas</option>
                    <option>Pendente</option>
                    <option>Em análise</option>
                    <option>Respondida</option>
                    <option>Resolvida</option>
                  </select>
                </div>
              </div>
            </div>

           
            <div className="col-lg-9">
              <div className="row g-4">
                {mensagensAtuais.length > 0 ? (
                  mensagensAtuais.map((mensagem) => (
                    <div
                      className="col-12"
                      key={mensagem.id}
                    >
                      <div
                        className="card border-0 shadow-lg overflow-hidden"
                        style={{
                          background: "#111113",
                          border:
                            "1px solid rgba(255,255,255,0.06)",
                          borderRadius: "24px",
                        }}
                      >
                        <div className="card-body p-4">
                          <div className="row align-items-center">
                           
                            <div className="col-lg-8">
                              <div className="d-flex flex-wrap gap-2 mb-3">
                                <span
                                className="badge"
                                style={{
                                background:
                                  mensagem.status === "Pendente"
                                  ? "rgba(239, 68, 68, 0.25)"
                                  : mensagem.status === "Em análise"
                                  ? "rgba(255, 217, 0, 0.29)"
                                  : mensagem.status === "Respondida"
                                  ? "rgba(59, 131, 246, 0.29)"
                                  : mensagem.status === "Resolvida"
                                  ? "rgba(103, 246, 59, 0.15)"
                                  : "rgba(81, 246, 59, 0.15)",
                                  
                                color:
                                  mensagem.status === "Pendente"
                                  ? "#ef4444"
                                  : mensagem.status === "Em análise"
                                  ? "#f59e0b"
                                  : mensagem.status === "Respondida"
                                  ? "#3ba9bd"
                                  : mensagem.status === "Resolvida"
                                  ? "#52b401"
                                  : "#22c55e",
                                  
                                border:
                                  mensagem.status === "Pendente"
                                  ? "1.8px solid rgba(241, 12, 12, 0.35)"
                                  : mensagem.status === "Em análise"
                                  ? "1.8px solid rgba(250, 225, 0, 0.36)"
                                  : mensagem.status === "Respondida"
                                  ? "1.8px solid rgba(18, 108, 253, 0.37)"
                                  : mensagem.status === "Ressolvida"
                                  ? "1.8px solid rgba(245,158,11,0.25)"
                                  : "1.8px solid rgba(34, 197, 94, 0.36)",
                                  
                                  fontSize: ".80rem",
                                  fontWeight: "650",
                                  padding: "6px 14px",
                                  borderRadius: "6px",
                                  
                                  }}
                                  >
                                    {mensagem.status}
                                </span>

                                <span className="badge bg-warning text-dark d-flex align-items-center justify-content-center">
                                  {mensagem.data}
                                </span>
                              </div>

                              <h3 className="text-white fw-bold">
                                {mensagem.assunto}
                              </h3>

                              <p className="text-secondary mb-2">
                                Cliente:
                                <span className="text-white fw-semibold ms-2">
                                  {mensagem.nome}
                                </span>
                              </p>

                              <p className="text-secondary mb-2">
                                E-mail:
                                <span className="text-white fw-semibold ms-2">
                                  {mensagem.email}
                                </span>
                              </p>

                              <p
                                className="mt-3"
                                style={{
                                  color: "#cfcfcf",
                                }}
                              >
                                {mensagem.mensagem.slice(
                                  0,
                                  100
                                )}
                                ...
                              </p>
                            </div>

                       
                            <div className="col-lg-4 mt-4 mt-lg-0">
                              <div className="d-grid gap-3">
                                <button
                                  className="btn text-white fw-semibold"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalMensagem"
                                  onClick={() =>
                                    setMensagemSelecionada(
                                      mensagem
                                    )
                                  }
                                  style={{
                                    background:
                                      "linear-gradient(to right, #940533, #ff8800)",
                                    border: "none",
                                    borderRadius: "14px",
                                  }}
                                >
                                  Ver mensagem
                                </button>

                                <select
                                  className="form-select"
                                  value={
                                    mensagem.status
                                  }
                                  onChange={(e) =>
                                    alterarStatus(
                                      mensagem.id,
                                      e.target.value
                                    )
                                  }
                                  style={{
                                    background:
                                      "#151518",
                                    border:
                                      "1px solid rgba(255,255,255,0.06)",
                                    color: "#fff",
                                  }}
                                >
                                  <option>
                                    Pendente
                                  </option>

                                  <option>
                                    Em análise
                                  </option>

                                  <option>
                                    Respondida
                                  </option>

                                  <option>
                                    Resolvida
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <div
                      className="text-center py-5"
                      style={{
                        background: "#111113",
                        borderRadius: "24px",
                        border:
                          "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <h3 className="text-white">
                        Nenhuma solicitação encontrada
                      </h3>

                      <p className="text-secondary mt-3">
                        Tente alterar os filtros de
                        pesquisa.
                      </p>
                    </div>
                  </div>
                )}
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

     
      <div
        className="modal fade"
        id="modalMensagem"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div
            className="modal-content border-0"
            style={{
              background: "#111113",
              borderRadius: "24px",
            }}
          >
            <div className="modal-header border-0">
              <div>
                <h3 className="text-white fw-bold mb-1">
                  {
                    mensagemSelecionada?.assunto
                  }
                </h3>

                <p className="text-secondary mb-0">
                  {
                    mensagemSelecionada?.nome
                  }{" "}
                  •{" "}
                  {
                    mensagemSelecionada?.email
                  }
                </p>
              </div>

              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <div
                className="p-4"
                style={{
                  background: "#151518",
                  borderRadius: "18px",
                  border:
                    "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p
                  style={{
                    color: "#d4d4d8",
                    lineHeight: "1.8",
                  }}
                >
                  {
                    mensagemSelecionada?.mensagem
                  }
                </p>
              </div>

              <button
              className="btn w-100 text-white fw-semibold mt-4"
              data-bs-toggle="modal"
              data-bs-target="#modalResponder"
                style={{
                  background:
                    "linear-gradient(to right, #940533, #ff8800)",
                  border: "none",
                  borderRadius: "14px",
                }}
              >
                Responder solicitação
              </button>
            </div>
          </div>
        </div>
      </div>

<div
  className="modal fade"
  id="modalResponder"
  tabIndex="-1"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div
      className="modal-content border-0"
      style={{
        background: "#111113",
        borderRadius: "24px",
      }}
    >
        
      <div className="modal-header border-0">
        <div>
          <h3 className="text-white fw-bold mb-1">
            Responder solicitação
          </h3>

          <p className="text-secondary mb-0">
            {mensagemSelecionada?.nome} •{" "}
            {mensagemSelecionada?.email}
          </p>
        </div>

        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="modal"
        ></button>
      </div>

   
      <div className="modal-body">

 
        <div
          className="p-3 mb-4"
          style={{
            background: "#151518",
            borderRadius: "16px",
            border:
              "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span
            className="fw-semibold"
            style={{
              color: "#ffb300",
            }}
          >
            Assunto:
          </span>

          <p
            className="mb-0 mt-2"
            style={{
              color: "#d4d4d8",
            }}
          >
            {mensagemSelecionada?.assunto}
          </p>
        </div>

  
        <div className="mb-4">
          <label
            className="form-label fw-semibold"
            style={{
              color: "#ffffff",
            }}
          >
            Sua resposta
          </label>

          <textarea
            className="form-control shadow-none"
            rows={7}
            placeholder="Digite sua resposta ao cliente..."
            value={resposta}
            onChange={(e) =>
              setResposta(e.target.value)
            }
            style={{
              background: "#151518",
              border:
                "1px solid rgba(255,255,255,0.06)",
              color: "#ffffff",
              borderRadius: "18px",
              resize: "none",
            }}
          />
        </div>

     
        <button
          className="btn w-100 fw-semibold"
          style={{
            background:
              "linear-gradient(to right, #940533, #ff8800)",
            border: "none",
            color: "#fff",
            borderRadius: "16px",
            padding: "14px",
          }}
        >
          Enviar resposta
        </button>
      </div>
    </div>
  </div>
</div>
    </main>
  );
}