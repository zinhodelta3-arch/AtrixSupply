"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import AlertCard from "@/components/AlertCard";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
const NOTIFICACOES_URL = `${API_URL}/api/notificacoes`;

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const stateVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.18,
      ease: "easeIn",
    },
  },
};

const notificationVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.36,
      ease: "easeOut",
      delay: Math.min(Number(index) || 0, 12) * 0.055,
    },
  }),
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.985,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

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
    <motion.main
      className="text-white"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(255,136,0,.12), transparent 25%), radial-gradient(circle at bottom right, rgba(192,1,42,.16), transparent 30%), linear-gradient(145deg,#08080a,#101014,#160d12)",
        padding: "120px 0 70px",
      }}
    >
      <section className="container">
        <motion.div
          className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <span className="badge bg-warning text-dark mb-3">Central do usuário</span>
            <h1 className="fw-bold mb-2">Notificações</h1>
            <p style={{ color: "rgba(255,255,255,.72)" }}>
              Acompanhe respostas de suporte, pedidos e atualizações importantes.
            </p>
          </div>

          <motion.button
            type="button"
            className="btn fw-bold align-self-start"
            onClick={marcarTodasComoLidas}
            disabled={atualizando || notificacoes.length === 0}
            whileHover={
              atualizando || notificacoes.length === 0
                ? undefined
                : { y: -2, scale: 1.015 }
            }
            whileTap={
              atualizando || notificacoes.length === 0
                ? undefined
                : { scale: 0.985 }
            }
            style={{
              background: "linear-gradient(90deg,#940533,#c0012a,#ff8800)",
              color: "white",
              border: "none",
              borderRadius: "14px",
              padding: "12px 18px",
            }}
          >
            {atualizando ? "Atualizando..." : "Marcar todas como lidas"}
          </motion.button>
        </motion.div>

        <AnimatePresence mode="wait">
          {carregando ? (
            <motion.div
              key="carregando"
              variants={stateVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <AlertCard
                variant="neutral"
                icon={<span className="spinner-border spinner-border-sm" aria-hidden="true" />}
                title="Carregando notificações..."
                centered
                style={{ minHeight: "210px" }}
              />
            </motion.div>
          ) : erro ? (
            <motion.div
              key="erro"
              variants={stateVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <AlertCard variant="warning" title="Atenção" message={erro} />
            </motion.div>
          ) : notificacoes.length === 0 ? (
            <motion.div
              key="vazio"
              variants={stateVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <AlertCard
                variant="empty"
                icon="bi-bell"
                title="Nenhuma notificação"
                message="Quando houver novidades, elas aparecerão aqui."
                centered
                style={{ minHeight: "240px" }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="lista"
              className="d-flex flex-column gap-3"
              variants={stateVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <AnimatePresence initial={false}>
                {notificacoes.map((notificacao, index) => (
                  <motion.article
                    key={notificacao.id_notificacao}
                    custom={index}
                    variants={notificationVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
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

                        <motion.button
                          type="button"
                          onClick={() => excluirNotificacao(notificacao)}
                          disabled={excluindoId === notificacao.id_notificacao}
                          title="Excluir notificação"
                          aria-label="Excluir notificação"
                          whileHover={
                            excluindoId === notificacao.id_notificacao
                              ? undefined
                              : { scale: 1.06 }
                          }
                          whileTap={
                            excluindoId === notificacao.id_notificacao
                              ? undefined
                              : { scale: 0.94 }
                          }
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
                        </motion.button>
                      </div>
                    </div>

                    {notificacao.mensagem_original && (
                      <motion.div
                        className="mb-3"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
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
                      </motion.div>
                    )}

                    {notificacao.resposta_admin ? (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
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
                      </motion.div>
                    ) : notificacao.tipo === "suporte" ? (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
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
                      </motion.div>
                    ) : null}
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.main>
  );
}
