"use client";

import { useEffect, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./suporte.css";
import "../algo.css";
import AlertCard from "@/components/AlertCard";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
const SUPORTE_URL = `${API_URL}/api/suporte`;

const STATUS_OPTIONS = ["Pendente", "Em análise", "Respondida", "Resolvida"];
const PRIORIDADE_OPTIONS = ["Baixa", "Média", "Alta", "Urgente"];

const MENSAGENS_INICIAIS = [];

const RESPOSTAS_RAPIDAS = [
  {
    titulo: "Agradecer e avisar análise",
    texto:
      "Olá! Obrigado por entrar em contato com o suporte da Atrix Supply. Recebemos sua solicitação e nossa equipe já está analisando o caso. Em breve retornaremos com uma atualização.",
  },
  {
    titulo: "Pedir mais informações",
    texto:
      "Olá! Para conseguirmos te ajudar melhor, poderia nos enviar mais detalhes sobre o ocorrido? Se possível, inclua prints, número do pedido ou qualquer informação relacionada ao problema.",
  },
  {
    titulo: "Informar resolução",
    texto:
      "Olá! Sua solicitação foi analisada e o problema foi resolvido. Caso ainda perceba alguma inconsistência, responda esta mensagem para reabrirmos a análise.",
  },
];

const pageBackground = `
  radial-gradient(circle at top left, rgba(255,136,0,.10), transparent 25%),
  radial-gradient(circle at bottom right, rgba(192,1,42,.16), transparent 30%),
  linear-gradient(145deg,#08080a,#101014,#160d12)
`;

const surfaceGradient = `
  linear-gradient(
    145deg,
    rgba(17,17,17,.96),
    rgba(25,18,22,.96)
  )
`;

const cardStyle = {
  background: surfaceGradient,
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "28px",
  boxShadow: "none",
};

const buttonGradient = {
  background: "linear-gradient(90deg,#940533,#c0012a,#ff8800)",
  color: "white",
  border: "none",
  borderRadius: "16px",
  fontWeight: "800",
  boxShadow: "none",
};

const metricCardStyle = (cor, ativo) => ({
  background: ativo
    ? `
      linear-gradient(
        145deg,
        rgba(22,22,26,.98),
        rgba(35,20,25,.98)
      )
    `
    : surfaceGradient,
  border: ativo ? `1px solid ${cor}66` : "1px solid rgba(255,255,255,.08)",
  borderRadius: "28px",
  boxShadow: ativo
    ? `0 18px 42px rgba(0,0,0,.26), 0 0 0 1px ${cor}22`
    : "none",
  transform: ativo ? "translateY(-5px)" : "translateY(0)",
  transition:
    "transform .22s ease, border-color .22s ease, background .22s ease, box-shadow .22s ease",
  cursor: "default",
});

const metricIconStyle = (cor, ativo) => ({
  width: "56px",
  height: "56px",
  borderRadius: "18px",
  background: ativo ? `${cor}24` : `${cor}18`,
  border: ativo ? `1px solid ${cor}55` : `1px solid ${cor}33`,
  color: cor,
  flexShrink: 0,
  transform: ativo ? "scale(1.07) rotate(-3deg)" : "scale(1)",
  transition: "transform .22s ease, background .22s ease, border-color .22s ease",
});

const inputStyle = {
  background: "rgba(255,255,255,.04)",
  border: "1px solid rgba(255,255,255,.08)",
  color: "#ffffff",
  minHeight: "54px",
  borderRadius: "16px",
  boxShadow: "none",
};

const smallButtonStyle = {
  width: "42px",
  height: "42px",
  borderRadius: "14px",
  background: "rgba(255,179,0,.08)",
  border: "1px solid rgba(255,179,0,.16)",
  color: "#ffcf40",
  boxShadow: "none",
};

const paginationBtnStyle = {
  background: "rgba(255,255,255,.04)",
  border: "1px solid rgba(255,255,255,.08)",
  color: "#ffcf40",
  borderRadius: "14px",
  fontWeight: "800",
  boxShadow: "none",
};

function getStatusStyle(status) {
  if (status === "Pendente") {
    return {
      background: "rgba(255,117,143,.10)",
      border: "1px solid rgba(255,117,143,.22)",
      color: "#ff758f",
    };
  }

  if (status === "Em análise") {
    return {
      background: "rgba(255,207,64,.10)",
      border: "1px solid rgba(255,207,64,.22)",
      color: "#ffcf40",
    };
  }

  if (status === "Respondida") {
    return {
      background: "rgba(138,180,255,.10)",
      border: "1px solid rgba(138,180,255,.22)",
      color: "#8ab4ff",
    };
  }

  return {
    background: "rgba(92,255,149,.10)",
    border: "1px solid rgba(92,255,149,.22)",
    color: "#5cff95",
  };
}

function getPrioridadeStyle(prioridade) {
  if (prioridade === "Urgente") {
    return {
      background: "rgba(245,6,29,.12)",
      border: "1px solid rgba(245,6,29,.28)",
      color: "#ff758f",
    };
  }

  if (prioridade === "Alta") {
    return {
      background: "rgba(255,136,0,.12)",
      border: "1px solid rgba(255,136,0,.28)",
      color: "#ff8800",
    };
  }

  if (prioridade === "Média") {
    return {
      background: "rgba(255,207,64,.10)",
      border: "1px solid rgba(255,207,64,.22)",
      color: "#ffcf40",
    };
  }

  return {
    background: "rgba(138,180,255,.10)",
    border: "1px solid rgba(138,180,255,.22)",
    color: "#8ab4ff",
  };
}

function getIniciais(nome) {
  return String(nome || "CL")
    .split(" ")
    .filter(Boolean)
    .map((parte) => parte[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function cortarTexto(texto, limite = 90) {
  const textoSeguro = String(texto || "");

  if (textoSeguro.length <= limite) return textoSeguro;

  return `${textoSeguro.slice(0, limite)}...`;
}

function getStatusDot(status) {
  if (status === "Pendente") return "#ff758f";
  if (status === "Em análise") return "#ffcf40";
  if (status === "Respondida") return "#8ab4ff";
  return "#5cff95";
}

function obterToken() {
  if (typeof window === "undefined") return "";

  return (
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("usuarioToken") ||
    localStorage.getItem("jwt") ||
    ""
  );
}

function statusApiParaTela(status) {
  const valor = String(status || "").toLowerCase();

  if (valor === "em_atendimento") return "Em análise";
  if (valor === "respondido") return "Respondida";
  if (valor === "fechado") return "Resolvida";

  return "Pendente";
}

function statusTelaParaApi(status) {
  if (status === "Em análise") return "em_atendimento";
  if (status === "Respondida") return "respondido";
  if (status === "Resolvida") return "fechado";

  return "aberto";
}

function formatarDataTicket(data) {
  const dataObj = new Date(data);

  if (Number.isNaN(dataObj.getTime())) return "Agora";

  return dataObj.toLocaleDateString("pt-BR");
}

function normalizarTicket(ticket) {
  const data = formatarDataTicket(ticket.data_criacao);
  const historico = [
    {
      autor: ticket.nome_user || "Cliente",
      texto: ticket.mensagem || "",
      data,
    },
  ];

  if (ticket.resposta_admin) {
    historico.push({
      autor: "Suporte",
      texto: ticket.resposta_admin,
      data: formatarDataTicket(ticket.data_atualizacao),
    });
  }

  return {
    id: ticket.id_ticket,
    nome: ticket.nome_user || "Cliente",
    email: ticket.email || "",
    assunto: ticket.assunto || "Sem assunto",
    mensagem: ticket.mensagem || "",
    status: statusApiParaTela(ticket.status),
    prioridade: "Média",
    categoria: ticket.categoria || "geral",
    data,
    resposta: ticket.resposta_admin || "",
    historico,
  };
}

async function lerResposta(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.mensagem || data?.erro || "Não foi possível concluir a operação.");
  }

  return data;
}

export default function SuporteAdmin() {
  const [mensagens, setMensagens] = useState(MENSAGENS_INICIAIS);

  const [busca, setBusca] = useState("");
  const [statusSelecionado, setStatusSelecionado] = useState("Todos");
  const [prioridadeSelecionada, setPrioridadeSelecionada] = useState("Todas");

  const [paginaAtual, setPaginaAtual] = useState(1);
  const mensagensPorPagina = 6;

  const [mensagemSelecionada, setMensagemSelecionada] = useState(
    MENSAGENS_INICIAIS[0] || null
  );

  const [resposta, setResposta] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const [cardHoverAtivo, setCardHoverAtivo] = useState(null);
  const [ticketHoverAtivo, setTicketHoverAtivo] = useState(null);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    async function carregarTickets() {
      try {
        setCarregando(true);
        setErro(null);

        const token = obterToken();

        if (!token) {
          setErro("Faça login como administrador para acessar o suporte.");
          setMensagens([]);
          setMensagemSelecionada(null);
          return;
        }

        const response = await fetch(`${SUPORTE_URL}?pagina=1&limite=100`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await lerResposta(response);
        const tickets = Array.isArray(data?.dados)
          ? data.dados.map(normalizarTicket)
          : [];

        setMensagens(tickets);
        setMensagemSelecionada(tickets[0] || null);
      } catch (error) {
        setErro(error.message || "Não foi possível carregar as solicitações.");
        setMensagens([]);
        setMensagemSelecionada(null);
      } finally {
        setCarregando(false);
      }
    }

    carregarTickets();
  }, []);

  useEffect(() => {
    setPaginaAtual(1);
  }, [busca, statusSelecionado, prioridadeSelecionada]);

  useEffect(() => {
    if (!mensagemSelecionada && mensagens.length > 0) {
      setMensagemSelecionada(mensagens[0]);
    }
  }, [mensagemSelecionada, mensagens]);

  function limparFeedbacks() {
    setFeedback(null);
    setErro(null);
  }

  function selecionarMensagem(mensagem) {
    limparFeedbacks();
    setMensagemSelecionada(mensagem);
    setResposta(mensagem.resposta || "");
  }

  async function alterarStatus(id, novoStatus) {
    limparFeedbacks();

    try {
      const token = obterToken();
      const response = await fetch(`${SUPORTE_URL}/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: statusTelaParaApi(novoStatus) }),
      });

      await lerResposta(response);
    } catch (error) {
      setErro(error.message || "Não foi possível atualizar o status.");
      return;
    }

    setMensagens((mensagensAtuais) =>
      mensagensAtuais.map((mensagem) =>
        mensagem.id === id
          ? {
              ...mensagem,
              status: novoStatus,
            }
          : mensagem
      )
    );

    setMensagemSelecionada((atual) =>
      atual?.id === id
        ? {
            ...atual,
            status: novoStatus,
          }
        : atual
    );

    setFeedback("Status atualizado com sucesso.");
  }

  function alterarPrioridade(id, novaPrioridade) {
    limparFeedbacks();

    setMensagens((mensagensAtuais) =>
      mensagensAtuais.map((mensagem) =>
        mensagem.id === id
          ? {
              ...mensagem,
              prioridade: novaPrioridade,
            }
          : mensagem
      )
    );

    setMensagemSelecionada((atual) =>
      atual?.id === id
        ? {
            ...atual,
            prioridade: novaPrioridade,
          }
        : atual
    );

    setFeedback("Prioridade atualizada com sucesso.");
  }

  function usarRespostaRapida(texto) {
    limparFeedbacks();

    setResposta((valorAtual) => {
      if (!valorAtual.trim()) return texto;

      return `${valorAtual}\n\n${texto}`;
    });
  }

  async function enviarResposta(event) {
    event.preventDefault();
    limparFeedbacks();

    if (!mensagemSelecionada?.id) {
      setErro("Nenhuma solicitação selecionada para responder.");
      return;
    }

    if (!resposta.trim()) {
      setErro("Digite uma resposta antes de enviar.");
      return;
    }

    const respostaFinal = resposta.trim();

    try {
      const token = obterToken();
      const response = await fetch(`${SUPORTE_URL}/${mensagemSelecionada.id}/responder`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ resposta: respostaFinal }),
      });

      await lerResposta(response);
    } catch (error) {
      setErro(error.message || "Não foi possível enviar a resposta.");
      return;
    }

    setMensagens((mensagensAtuais) =>
      mensagensAtuais.map((mensagem) =>
        mensagem.id === mensagemSelecionada.id
          ? {
              ...mensagem,
              resposta: respostaFinal,
              status: "Respondida",
              historico: [
                ...(mensagem.historico || []),
                {
                  autor: "Suporte",
                  texto: respostaFinal,
                  data: "Agora",
                },
              ],
            }
          : mensagem
      )
    );

    setMensagemSelecionada((atual) =>
      atual
        ? {
            ...atual,
            resposta: respostaFinal,
            status: "Respondida",
            historico: [
              ...(atual.historico || []),
              {
                autor: "Suporte",
                texto: respostaFinal,
                data: "Agora",
              },
            ],
          }
        : atual
    );

    setFeedback("Resposta registrada com sucesso.");
  }

  function marcarComoResolvida() {
    if (!mensagemSelecionada?.id) return;

    alterarStatus(mensagemSelecionada.id, "Resolvida");
  }

  const mensagensFiltradas = useMemo(() => {
    return mensagens.filter((mensagem) => {
      const termo = busca.trim().toLowerCase();

      const buscaMatch =
        !termo ||
        mensagem.nome.toLowerCase().includes(termo) ||
        mensagem.email.toLowerCase().includes(termo) ||
        mensagem.assunto.toLowerCase().includes(termo) ||
        mensagem.mensagem.toLowerCase().includes(termo);

      const statusMatch =
        statusSelecionado === "Todos" || mensagem.status === statusSelecionado;

      const prioridadeMatch =
        prioridadeSelecionada === "Todas" ||
        mensagem.prioridade === prioridadeSelecionada;

      return buscaMatch && statusMatch && prioridadeMatch;
    });
  }, [mensagens, busca, statusSelecionado, prioridadeSelecionada]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(mensagensFiltradas.length / mensagensPorPagina)
  );

  const indiceUltimaMensagem = paginaAtual * mensagensPorPagina;
  const indicePrimeiraMensagem = indiceUltimaMensagem - mensagensPorPagina;

  const mensagensAtuais = mensagensFiltradas.slice(
    indicePrimeiraMensagem,
    indiceUltimaMensagem
  );

  const paginasVisiveis = useMemo(() => {
    const tamanho = 5;

    let inicio = Math.max(1, paginaAtual - Math.floor(tamanho / 2));
    let fim = Math.min(totalPaginas, inicio + tamanho - 1);

    if (fim - inicio + 1 < tamanho) {
      inicio = Math.max(1, fim - tamanho + 1);
    }

    return Array.from({ length: fim - inicio + 1 }, (_, index) => inicio + index);
  }, [paginaAtual, totalPaginas]);

  const metricas = useMemo(() => {
    return {
      total: mensagens.length,
      pendentes: mensagens.filter((mensagem) => mensagem.status === "Pendente")
        .length,
      analise: mensagens.filter((mensagem) => mensagem.status === "Em análise")
        .length,
      respondidas: mensagens.filter((mensagem) => mensagem.status === "Respondida")
        .length,
      resolvidas: mensagens.filter((mensagem) => mensagem.status === "Resolvida")
        .length,
      urgentes: mensagens.filter((mensagem) => mensagem.prioridade === "Urgente")
        .length,
    };
  }, [mensagens]);

  const metricasCards = [
    {
      titulo: "Fila total",
      valor: metricas.total,
      detalhe: "Solicitações registradas",
      icon: "bi-inbox-fill",
      cor: "#ffcf40",
    },
    {
      titulo: "Pendentes",
      valor: metricas.pendentes,
      detalhe: "Aguardando primeira ação",
      icon: "bi-exclamation-circle-fill",
      cor: "#ff758f",
    },
    {
      titulo: "Em análise",
      valor: metricas.analise,
      detalhe: "Solicitações em atendimento",
      icon: "bi-hourglass-split",
      cor: "#ff8800",
    },
    {
      titulo: "Urgentes",
      valor: metricas.urgentes,
      detalhe: "Precisam de prioridade",
      icon: "bi-lightning-charge-fill",
      cor: "#8ab4ff",
    },
  ];

  return (
    <main
      className="container-fluid py-4 px-3 px-lg-4"
      style={{
        background: pageBackground,
        minHeight: "100vh",
        color: "white",
      }}
    >
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
        <div>
          <span
            className="badge mb-3"
            style={{
              background: "rgba(255,179,0,.14)",
              color: "#ffcf40",
              border: "1px solid rgba(255,179,0,.25)",
              borderRadius: "999px",
              padding: "9px 13px",
              fontWeight: "800",
            }}
          >
            Central Administrativa
          </span>

          <h1
            className="fw-bold mb-1"
            style={{
              color: "#ffb300",
              fontSize: "2rem",
              letterSpacing: "-1px",
            }}
          >
            Suporte
          </h1>

          <p
            className="mb-0"
            style={{
              color: "rgba(255,255,255,.58)",
              fontSize: ".95rem",
            }}
          >
            Fila de atendimento, triagem, prioridade e resposta ao cliente em uma única tela.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            limparFeedbacks();
            setFeedback("Mensagens atualizadas.");
          }}
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          style={buttonGradient}
        >
          <i className="bi bi-arrow-clockwise" />
          Atualizar fila
        </button>
      </div>

      <div className="row g-4 mb-4">
        {metricasCards.map((card) => {
          const ativo = cardHoverAtivo === card.titulo;

          return (
            <div className="col-12 col-md-6 col-xl-3" key={card.titulo}>
              <div
                className="p-4 h-100"
                style={metricCardStyle(card.cor, ativo)}
                onMouseEnter={() => setCardHoverAtivo(card.titulo)}
                onMouseLeave={() => setCardHoverAtivo(null)}
              >
                <div className="d-flex justify-content-between align-items-start gap-3">
                  <div style={{ minWidth: 0 }}>
                    <p
                      className="mb-2"
                      style={{
                        color: ativo
                          ? "rgba(255,255,255,.74)"
                          : "rgba(255,255,255,.58)",
                        fontSize: ".9rem",
                        transition: "color .22s ease",
                      }}
                    >
                      {card.titulo}
                    </p>

                    <h2
                      className="fw-bold mb-2"
                      style={{
                        color: "#ffffff",
                        letterSpacing: "-1px",
                        fontSize: "1.8rem",
                      }}
                    >
                      {Number(card.valor || 0).toLocaleString("pt-BR")}
                    </h2>

                    <span
                      style={{
                        color: ativo
                          ? "rgba(255,255,255,.58)"
                          : "rgba(255,255,255,.42)",
                        fontSize: ".82rem",
                        transition: "color .22s ease",
                      }}
                    >
                      {card.detalhe}
                    </span>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={metricIconStyle(card.cor, ativo)}
                  >
                    <i className={`bi ${card.icon}`} style={{ fontSize: "1.35rem" }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {(feedback || erro) && (
        <AlertCard
          variant={feedback ? "success" : "danger"}
          title={feedback ? "Sucesso" : "Erro"}
          message={feedback || erro}
          className="mb-4"
        />
      )}

      <section className="p-3 p-lg-4" style={cardStyle}>
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
          <div>
            <h4
              className="fw-bold mb-1"
              style={{
                color: "#ffffff",
                letterSpacing: "-0.5px",
              }}
            >
              Fila de atendimento
            </h4>

            <p
              className="mb-0"
              style={{
                color: "rgba(255,255,255,.55)",
                fontSize: ".9rem",
              }}
            >
              {mensagensFiltradas.length} solicitação(ões) encontrada(s)
            </p>
          </div>

          <div
            className="d-flex flex-column flex-xl-row gap-2 align-items-stretch align-items-xl-center"
            style={{
              width: "min(100%, 980px)",
            }}
          >
            <div
              className="d-flex align-items-center px-3 flex-grow-1"
              style={{
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: "16px",
                minWidth: "240px",
                height: "48px",
              }}
            >
              <i className="bi bi-search" style={{ color: "#ffcf40" }} />

              <input
                type="text"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
                placeholder="Buscar por nome, email, assunto ou mensagem..."
                className="form-control border-0 shadow-none"
                style={{
                  background: "transparent",
                  color: "#ffffff",
                  fontSize: ".92rem",
                }}
              />
            </div>

            <select
              value={statusSelecionado}
              onChange={(event) => setStatusSelecionado(event.target.value)}
              className="form-select shadow-none"
              style={{
                ...inputStyle,
                minWidth: "190px",
                height: "48px",
                cursor: "pointer",
              }}
            >
              <option value="Todos" style={{ background: "#151518", color: "#fff" }}>
                Todos os status
              </option>

              {STATUS_OPTIONS.map((status) => (
                <option
                  key={status}
                  value={status}
                  style={{ background: "#151518", color: "#fff" }}
                >
                  {status}
                </option>
              ))}
            </select>

            <select
              value={prioridadeSelecionada}
              onChange={(event) => setPrioridadeSelecionada(event.target.value)}
              className="form-select shadow-none"
              style={{
                ...inputStyle,
                minWidth: "190px",
                height: "48px",
                cursor: "pointer",
              }}
            >
              <option value="Todas" style={{ background: "#151518", color: "#fff" }}>
                Todas prioridades
              </option>

              {PRIORIDADE_OPTIONS.map((prioridade) => (
                <option
                  key={prioridade}
                  value={prioridade}
                  style={{ background: "#151518", color: "#fff" }}
                >
                  {prioridade}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => {
                setBusca("");
                setStatusSelecionado("Todos");
                setPrioridadeSelecionada("Todas");
                setPaginaAtual(1);
              }}
              className="btn px-3"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#d4d4d8",
                borderRadius: "14px",
                height: "48px",
                fontWeight: "800",
              }}
            >
              Limpar
            </button>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-xl-5">
            <div
              style={{
                maxHeight: "720px",
                overflowY: "auto",
                paddingRight: "4px",
              }}
            >
              <div className="d-flex flex-column gap-3">
                {carregando ? (
                  <AlertCard
                    variant="neutral"
                    icon={<span className="spinner-border spinner-border-sm" aria-hidden="true" />}
                    title="Carregando solicitações..."
                    centered
                    style={{ minHeight: "210px" }}
                  />
                ) : mensagensAtuais.length === 0 ? (
                  <AlertCard
                    variant="empty"
                    title="Nenhuma solicitação encontrada"
                    message="Tente alterar os filtros de pesquisa."
                    centered
                    style={{ minHeight: "230px" }}
                  />
                ) : (
                  mensagensAtuais.map((mensagem) => {
                    const selecionada = mensagemSelecionada?.id === mensagem.id;
                    const hover = ticketHoverAtivo === mensagem.id;

                    return (
                      <button
                        type="button"
                        key={mensagem.id}
                        onClick={() => selecionarMensagem(mensagem)}
                        onMouseEnter={() => setTicketHoverAtivo(mensagem.id)}
                        onMouseLeave={() => setTicketHoverAtivo(null)}
                        className="text-start w-100"
                        style={{
                          background: selecionada
                            ? "linear-gradient(145deg, rgba(148,5,51,.32), rgba(255,136,0,.10))"
                            : hover
                            ? "rgba(255,255,255,.045)"
                            : "rgba(255,255,255,.025)",
                          border: selecionada
                            ? "1px solid rgba(255,179,0,.32)"
                            : "1px solid rgba(255,255,255,.07)",
                          borderRadius: "24px",
                          padding: "18px",
                          color: "white",
                          boxShadow: "none",
                          transform: hover ? "translateY(-2px)" : "translateY(0)",
                          transition:
                            "background .22s ease, border-color .22s ease, transform .22s ease",
                        }}
                      >
                        <div className="d-flex align-items-start gap-3">
                          <div
                            className="d-flex justify-content-center align-items-center fw-bold text-uppercase"
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "16px",
                              background: "rgba(255,179,0,.12)",
                              border: "1px solid rgba(255,179,0,.20)",
                              color: "#ffcf40",
                              fontSize: ".9rem",
                              flexShrink: 0,
                            }}
                          >
                            {getIniciais(mensagem.nome)}
                          </div>

                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div className="d-flex justify-content-between align-items-start gap-2">
                              <div style={{ minWidth: 0 }}>
                                <h6
                                  className="fw-bold text-truncate mb-1"
                                  style={{
                                    color: "#ffffff",
                                    maxWidth: "260px",
                                  }}
                                  title={mensagem.assunto}
                                >
                                  {mensagem.assunto}
                                </h6>

                                <p
                                  className="text-truncate mb-0"
                                  style={{
                                    color: "rgba(255,255,255,.52)",
                                    fontSize: ".84rem",
                                    maxWidth: "280px",
                                  }}
                                  title={mensagem.nome}
                                >
                                  {mensagem.nome} • {mensagem.email}
                                </p>
                              </div>

                              <span
                                style={{
                                  width: "10px",
                                  height: "10px",
                                  borderRadius: "50%",
                                  background: getStatusDot(mensagem.status),
                                  flexShrink: 0,
                                  marginTop: "7px",
                                }}
                              />
                            </div>

                            <p
                              className="mb-3 mt-3"
                              style={{
                                color: "rgba(255,255,255,.64)",
                                fontSize: ".88rem",
                                lineHeight: "1.6",
                              }}
                            >
                              {cortarTexto(mensagem.mensagem, 120)}
                            </p>

                            <div className="d-flex flex-wrap gap-2 align-items-center">
                              <span
                                className="px-3 py-2 d-inline-flex align-items-center"
                                style={{
                                  borderRadius: "999px",
                                  fontSize: ".72rem",
                                  fontWeight: "800",
                                  ...getStatusStyle(mensagem.status),
                                }}
                              >
                                {mensagem.status}
                              </span>

                              <span
                                className="px-3 py-2 d-inline-flex align-items-center"
                                style={{
                                  borderRadius: "999px",
                                  fontSize: ".72rem",
                                  fontWeight: "800",
                                  ...getPrioridadeStyle(mensagem.prioridade),
                                }}
                              >
                                {mensagem.prioridade}
                              </span>

                              <span
                                className="ms-auto"
                                style={{
                                  color: "rgba(255,255,255,.45)",
                                  fontSize: ".78rem",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {mensagem.data}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {mensagensFiltradas.length > 0 && (
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4">
                <span
                  style={{
                    color: "rgba(255,255,255,.55)",
                    fontSize: ".9rem",
                  }}
                >
                  Página {paginaAtual} de {totalPaginas}
                </span>

                <div className="d-flex gap-2 flex-wrap">
                  <button
                    type="button"
                    className="btn px-3"
                    disabled={paginaAtual <= 1}
                    onClick={() =>
                      setPaginaAtual((pagina) => Math.max(1, pagina - 1))
                    }
                    style={{
                      ...paginationBtnStyle,
                      opacity: paginaAtual <= 1 ? 0.45 : 1,
                      cursor: paginaAtual <= 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    <i className="bi bi-chevron-left" />
                  </button>

                  {paginasVisiveis.map((numeroPagina) => {
                    const ativo = numeroPagina === paginaAtual;

                    return (
                      <button
                        key={numeroPagina}
                        type="button"
                        className="btn px-3"
                        disabled={ativo}
                        onClick={() => setPaginaAtual(numeroPagina)}
                        style={{
                          ...paginationBtnStyle,
                          background: ativo
                            ? "linear-gradient(90deg,#940533,#c0012a,#ff8800)"
                            : paginationBtnStyle.background,
                          color: "#ffffff",
                          border: ativo
                            ? "1px solid rgba(255,255,255,.10)"
                            : paginationBtnStyle.border,
                        }}
                      >
                        {numeroPagina}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    className="btn px-3"
                    disabled={paginaAtual >= totalPaginas}
                    onClick={() =>
                      setPaginaAtual((pagina) => Math.min(totalPaginas, pagina + 1))
                    }
                    style={{
                      ...paginationBtnStyle,
                      opacity: paginaAtual >= totalPaginas ? 0.45 : 1,
                      cursor:
                        paginaAtual >= totalPaginas ? "not-allowed" : "pointer",
                    }}
                  >
                    <i className="bi bi-chevron-right" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="col-12 col-xl-7">
            <div
              className="h-100"
              style={{
                background: "rgba(255,255,255,.025)",
                border: "1px solid rgba(255,255,255,.07)",
                borderRadius: "28px",
                overflow: "hidden",
              }}
            >
              {!mensagemSelecionada ? (
                <div className="d-flex flex-column align-items-center justify-content-center text-center p-5 h-100">
                  <i
                    className="bi bi-chat-square-text"
                    style={{
                      color: "#ffcf40",
                      fontSize: "3rem",
                    }}
                  />

                  <h4 className="fw-bold mt-3">Selecione uma solicitação</h4>

                  <p
                    className="mb-0"
                    style={{
                      color: "rgba(255,255,255,.55)",
                    }}
                  >
                    Escolha um ticket na fila para analisar e responder.
                  </p>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      padding: "28px",
                      borderBottom: "1px solid rgba(255,255,255,.07)",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                      <div style={{ minWidth: 0 }}>
                        <div className="d-flex flex-wrap gap-2 mb-3">
                          <span
                            className="px-3 py-2 d-inline-flex align-items-center"
                            style={{
                              borderRadius: "999px",
                              fontSize: ".78rem",
                              fontWeight: "800",
                              ...getStatusStyle(mensagemSelecionada.status),
                            }}
                          >
                            {mensagemSelecionada.status}
                          </span>

                          <span
                            className="px-3 py-2 d-inline-flex align-items-center"
                            style={{
                              borderRadius: "999px",
                              fontSize: ".78rem",
                              fontWeight: "800",
                              ...getPrioridadeStyle(mensagemSelecionada.prioridade),
                            }}
                          >
                            {mensagemSelecionada.prioridade}
                          </span>

                          <span
                            className="px-3 py-2 d-inline-flex align-items-center"
                            style={{
                              borderRadius: "999px",
                              fontSize: ".78rem",
                              fontWeight: "800",
                              background: "rgba(255,255,255,.04)",
                              border: "1px solid rgba(255,255,255,.08)",
                              color: "rgba(255,255,255,.68)",
                            }}
                          >
                            {mensagemSelecionada.categoria}
                          </span>
                        </div>

                        <h2
                          className="fw-bold mb-2"
                          style={{
                            color: "#ffe082",
                            letterSpacing: "-1px",
                          }}
                        >
                          {mensagemSelecionada.assunto}
                        </h2>

                        <p
                          className="mb-0"
                          style={{
                            color: "rgba(255,255,255,.56)",
                          }}
                        >
                          {mensagemSelecionada.nome} • {mensagemSelecionada.email} •{" "}
                          {mensagemSelecionada.data}
                        </p>
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn d-flex align-items-center justify-content-center"
                          title="Marcar como resolvida"
                          onClick={marcarComoResolvida}
                          style={{
                            ...smallButtonStyle,
                            background: "rgba(92,255,149,.10)",
                            border: "1px solid rgba(92,255,149,.20)",
                            color: "#5cff95",
                          }}
                        >
                          <i className="bi bi-check2-circle" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: "28px" }}>
                    <div className="row g-3 mb-4">
                      <div className="col-12 col-lg-6">
                        <label
                          className="form-label fw-bold"
                          style={{ color: "rgba(255,255,255,.70)" }}
                        >
                          Status
                        </label>

                        <select
                          value={mensagemSelecionada.status}
                          onChange={(event) =>
                            alterarStatus(mensagemSelecionada.id, event.target.value)
                          }
                          className="form-select shadow-none"
                          style={{
                            ...inputStyle,
                            cursor: "pointer",
                          }}
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option
                              key={status}
                              value={status}
                              style={{ background: "#151518", color: "#fff" }}
                            >
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-12 col-lg-6">
                        <label
                          className="form-label fw-bold"
                          style={{ color: "rgba(255,255,255,.70)" }}
                        >
                          Prioridade
                        </label>

                        <select
                          value={mensagemSelecionada.prioridade}
                          onChange={(event) =>
                            alterarPrioridade(
                              mensagemSelecionada.id,
                              event.target.value
                            )
                          }
                          className="form-select shadow-none"
                          style={{
                            ...inputStyle,
                            cursor: "pointer",
                          }}
                        >
                          {PRIORIDADE_OPTIONS.map((prioridade) => (
                            <option
                              key={prioridade}
                              value={prioridade}
                              style={{ background: "#151518", color: "#fff" }}
                            >
                              {prioridade}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div
                      className="p-4 mb-4"
                      style={{
                        background: "rgba(255,255,255,.035)",
                        borderRadius: "20px",
                        border: "1px solid rgba(255,255,255,.06)",
                      }}
                    >
                      <span
                        className="fw-bold d-block mb-3"
                        style={{
                          color: "#ffcf40",
                        }}
                      >
                        Mensagem do cliente
                      </span>

                      <p
                        className="mb-0"
                        style={{
                          color: "#d4d4d8",
                          lineHeight: "1.8",
                        }}
                      >
                        {mensagemSelecionada.mensagem}
                      </p>
                    </div>

                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                        <label
                          className="form-label fw-bold mb-0"
                          style={{ color: "rgba(255,255,255,.78)" }}
                        >
                          Resposta rápida
                        </label>

                        <span
                          style={{
                            color: "rgba(255,255,255,.45)",
                            fontSize: ".82rem",
                          }}
                        >
                          Clique para preencher o campo de resposta
                        </span>
                      </div>

                      <div className="d-flex flex-wrap gap-2">
                        {RESPOSTAS_RAPIDAS.map((template) => (
                          <button
                            key={template.titulo}
                            type="button"
                            onClick={() => usarRespostaRapida(template.texto)}
                            className="btn"
                            style={{
                              background: "rgba(255,255,255,.04)",
                              border: "1px solid rgba(255,255,255,.08)",
                              color: "#ffcf40",
                              borderRadius: "999px",
                              fontSize: ".84rem",
                              fontWeight: "800",
                              boxShadow: "none",
                            }}
                          >
                            {template.titulo}
                          </button>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={enviarResposta}>
                      <div className="mb-4">
                        <label
                          className="form-label fw-bold"
                          style={{
                            color: "rgba(255,255,255,.78)",
                          }}
                        >
                          Sua resposta
                        </label>

                        <textarea
                          className="form-control shadow-none"
                          rows={8}
                          placeholder="Digite sua resposta ao cliente..."
                          value={resposta}
                          onChange={(event) => setResposta(event.target.value)}
                          style={{
                            background: "rgba(255,255,255,.04)",
                            border: "1px solid rgba(255,255,255,.08)",
                            color: "#ffffff",
                            borderRadius: "18px",
                            resize: "none",
                          }}
                        />
                      </div>

                      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div
                          style={{
                            color: "rgba(255,255,255,.48)",
                            fontSize: ".88rem",
                          }}
                        >
                          {resposta.trim().length} caracteres digitados
                        </div>

                        <div className="d-flex gap-2 flex-wrap">
                          <button
                            type="button"
                            className="btn btn-outline-light"
                            onClick={() => setResposta("")}
                            style={{
                              borderRadius: "16px",
                              padding: "12px 20px",
                              fontWeight: "800",
                              boxShadow: "none",
                            }}
                          >
                            Limpar resposta
                          </button>

                          <button
                            type="submit"
                            className="btn"
                            style={{
                              ...buttonGradient,
                              padding: "12px 24px",
                              minWidth: "190px",
                            }}
                          >
                            <i className="bi bi-send-fill me-2" />
                            Enviar resposta
                          </button>
                        </div>
                      </div>
                    </form>

                    {mensagemSelecionada.historico?.length > 0 && (
                      <div className="mt-5">
                        <h5
                          className="fw-bold mb-3"
                          style={{
                            color: "#ffffff",
                          }}
                        >
                          Histórico do ticket
                        </h5>

                        <div className="d-flex flex-column gap-3">
                          {mensagemSelecionada.historico.map((item, index) => (
                            <div
                              key={`${item.autor}-${index}`}
                              className="p-3"
                              style={{
                                background:
                                  item.autor === "Suporte"
                                    ? "rgba(138,180,255,.08)"
                                    : "rgba(255,255,255,.035)",
                                border:
                                  item.autor === "Suporte"
                                    ? "1px solid rgba(138,180,255,.16)"
                                    : "1px solid rgba(255,255,255,.06)",
                                borderRadius: "18px",
                              }}
                            >
                              <div className="d-flex justify-content-between gap-3 mb-2">
                                <strong
                                  style={{
                                    color:
                                      item.autor === "Suporte"
                                        ? "#8ab4ff"
                                        : "#ffcf40",
                                  }}
                                >
                                  {item.autor}
                                </strong>

                                <span
                                  style={{
                                    color: "rgba(255,255,255,.45)",
                                    fontSize: ".82rem",
                                  }}
                                >
                                  {item.data}
                                </span>
                              </div>

                              <p
                                className="mb-0"
                                style={{
                                  color: "#d4d4d8",
                                  lineHeight: "1.7",
                                }}
                              >
                                {item.texto}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
