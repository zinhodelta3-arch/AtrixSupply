"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
const NOTIFICACOES_URL = `${API_URL}/api/notificacoes`;

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

function formatarData(valor) {
  if (!valor) return "Data não informada";

  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) return "Data não informada";

  return data.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export default function NotificacoesPage() {
  const router = useRouter();

  const [notificacoes, setNotificacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [atualizando, setAtualizando] = useState(false);
  const [excluindoId, setExcluindoId] = useState(null);

  useEffect(() => {
    carregarNotificacoes();
  }, []);

  async function carregarNotificacoes() {
    const token = obterToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      setCarregando(true);
      setErro("");

      const response = await fetch(`${NOTIFICACOES_URL}?pagina=1&limite=50`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.sucesso) {
        throw new Error(data?.mensagem || "Não foi possível carregar as notificações.");
      }

      setNotificacoes(Array.isArray(data?.dados) ? data.dados : []);
    } catch (error) {
      console.error("Erro ao carregar notificações:", error);
      setErro("Não foi possível carregar suas notificações agora.");
      setNotificacoes([]);
    } finally {
      setCarregando(false);
    }
  }

  async function marcarTodasComoLidas() {
    const token = obterToken();
    if (!token) return;

    try {
      setAtualizando(true);

      const response = await fetch(`${NOTIFICACOES_URL}/lidas`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Não foi possível atualizar as notificações.");
      }

      setNotificacoes((atuais) => atuais.map((item) => ({ ...item, lida: 1 })));
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Erro ao marcar notificações:", error);
      setErro("Não foi possível marcar as notificações como lidas.");
    } finally {
      setAtualizando(false);
    }
  }

  async function excluirNotificacao(notificacao) {
    const token = obterToken();
    const idNotificacao = notificacao?.id_notificacao;

    if (!token || !idNotificacao) return;

    try {
      setExcluindoId(idNotificacao);
      setErro("");

      const response = await fetch(`${NOTIFICACOES_URL}/${idNotificacao}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || data?.sucesso === false) {
        throw new Error(data?.mensagem || "Não foi possível excluir a notificação.");
      }

      setNotificacoes((atuais) =>
        atuais.filter((item) => item.id_notificacao !== idNotificacao)
      );

      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Erro ao excluir notificação:", error);
      setErro(error.message || "Não foi possível excluir a notificação.");
    } finally {
      setExcluindoId(null);
    }
  }

  return (
    <main
      className="text-white"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(255,136,0,.12), transparent 25%), radial-gradient(circle at bottom right, rgba(192,1,42,.16), transparent 30%), linear-gradient(145deg,#08080a,#101014,#160d12)",
        padding: "120px 0 70px",
      }}
    >
      <section className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
          <div>
            <span className="badge bg-warning text-dark mb-3">Central do usuário</span>
            <h1 className="fw-bold mb-2">Notificações</h1>
            <p style={{ color: "rgba(255,255,255,.72)" }}>
              Acompanhe respostas de suporte, pedidos e atualizações importantes.
            </p>
          </div>

          <button
            type="button"
            className="btn fw-bold align-self-start"
            onClick={marcarTodasComoLidas}
            disabled={atualizando || notificacoes.length === 0}
            style={{
              background: "linear-gradient(90deg,#940533,#c0012a,#ff8800)",
              color: "white",
              border: "none",
              borderRadius: "14px",
              padding: "12px 18px",
            }}
          >
            {atualizando ? "Atualizando..." : "Marcar todas como lidas"}
          </button>
        </div>

        {carregando ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning mb-3" />
            <p>Carregando notificações...</p>
          </div>
        ) : erro ? (
          <div className="alert alert-warning border-0">{erro}</div>
        ) : notificacoes.length === 0 ? (
          <div
            className="text-center"
            style={{
              background: "rgba(17,17,17,.96)",
              border: "1px solid rgba(255,255,255,.10)",
              borderRadius: "26px",
              padding: "44px 24px",
            }}
          >
            <i className="bi bi-bell fs-1 text-warning d-block mb-3" />
            <h2 className="h4 fw-bold">Nenhuma notificação</h2>
            <p className="mb-0" style={{ color: "rgba(255,255,255,.70)" }}>
              Quando houver novidades, elas aparecerão aqui.
            </p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {notificacoes.map((notificacao) => (
              <article
                key={notificacao.id_notificacao}
                style={{
                  background: notificacao.lida
                    ? "rgba(17,17,17,.96)"
                    : "linear-gradient(135deg,rgba(255,136,0,.16),rgba(148,5,51,.18))",
                  border: notificacao.resposta_admin
                    ? "1px solid rgba(255,179,0,.26)"
                    : "1px solid rgba(255,255,255,.10)",
                  borderRadius: "24px",
                  padding: "22px",
                }}
              >
                <div className="d-flex justify-content-between gap-3 flex-wrap mb-3">
                  <div>
                    <div className="d-flex align-items-center gap-2 flex-wrap mb-2">
                      <span className="badge text-bg-dark border border-warning">
                        {notificacao.tipo || "sistema"}
                      </span>

                      {!notificacao.lida && (
                        <span className="badge bg-warning text-dark">
                          Nova
                        </span>
                      )}

                      {notificacao.resposta_admin && (
                        <span
                          className="badge"
                          style={{
                            background: "rgba(91,161,0,.14)",
                            color: "#8dff9f",
                            border: "1px solid rgba(91,161,0,.28)",
                          }}
                        >
                          Respondida
                        </span>
                      )}
                    </div>

                    <h2 className="h5 fw-bold mb-2">
                      {notificacao.suporte_assunto || notificacao.titulo}
                    </h2>

                    <p className="mb-0" style={{ color: "rgba(255,255,255,.76)" }}>
                      {notificacao.mensagem}
                    </p>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <small style={{ color: "rgba(255,255,255,.58)" }}>
                      {formatarData(notificacao.data_criacao)}
                    </small>

                    <button
                      type="button"
                      onClick={() => excluirNotificacao(notificacao)}
                      disabled={excluindoId === notificacao.id_notificacao}
                      title="Excluir notificação"
                      aria-label="Excluir notificação"
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "12px",
                        border: "1px solid rgba(245,6,29,.22)",
                        background: "rgba(245,6,29,.10)",
                        color: "#ff758f",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor:
                          excluindoId === notificacao.id_notificacao
                            ? "not-allowed"
                            : "pointer",
                        opacity: excluindoId === notificacao.id_notificacao ? 0.65 : 1,
                      }}
                    >
                      {excluindoId === notificacao.id_notificacao ? (
                        <span className="spinner-border spinner-border-sm" />
                      ) : (
                        <i className="bi bi-trash3" />
                      )}
                    </button>
                  </div>
                </div>

                {notificacao.mensagem_original && (
                  <div
                    className="mb-3"
                    style={{
                      background: "rgba(255,255,255,.035)",
                      border: "1px solid rgba(255,255,255,.08)",
                      borderRadius: "18px",
                      padding: "16px",
                    }}
                  >
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <i className="bi bi-chat-left-text text-warning" />

                      <strong style={{ color: "#ffcf40" }}>
                        Sua mensagem
                      </strong>
                    </div>

                    <p
                      className="mb-0"
                      style={{
                        color: "rgba(255,255,255,.72)",
                        lineHeight: 1.7,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {notificacao.mensagem_original}
                    </p>
                  </div>
                )}

                {notificacao.resposta_admin ? (
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg,rgba(91,161,0,.10),rgba(255,179,0,.08))",
                      border: "1px solid rgba(255,179,0,.22)",
                      borderRadius: "18px",
                      padding: "18px",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <i
                          className="bi bi-person-check-fill"
                          style={{ color: "#8dff9f" }}
                        />

                        <strong style={{ color: "#8dff9f" }}>
                          Resposta do suporte
                        </strong>
                      </div>

                      <small style={{ color: "rgba(255,255,255,.55)" }}>
                        {(notificacao.nome_admin_resposta || "Administração")} •{" "}
                        {formatarData(notificacao.data_resposta)}
                      </small>
                    </div>

                    <p
                      className="mb-0"
                      style={{
                        color: "rgba(255,255,255,.84)",
                        lineHeight: 1.75,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {notificacao.resposta_admin}
                    </p>
                  </div>
                ) : notificacao.tipo === "suporte" ? (
                  <div
                    style={{
                      background: "rgba(255,255,255,.025)",
                      border: "1px dashed rgba(255,255,255,.12)",
                      borderRadius: "16px",
                      padding: "14px 16px",
                      color: "rgba(255,255,255,.55)",
                    }}
                  >
                    <i className="bi bi-hourglass-split me-2 text-warning" />
                    Essa solicitação ainda não recebeu uma resposta detalhada do suporte.
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
