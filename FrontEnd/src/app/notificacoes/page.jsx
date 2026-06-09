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
                  border: "1px solid rgba(255,255,255,.10)",
                  borderRadius: "24px",
                  padding: "22px",
                }}
              >
                <div className="d-flex justify-content-between gap-3 flex-wrap">
                  <div>
                    <span className="badge text-bg-dark border border-warning mb-2">
                      {notificacao.tipo || "sistema"}
                    </span>
                    <h2 className="h5 fw-bold mb-2">{notificacao.titulo}</h2>
                    <p className="mb-0" style={{ color: "rgba(255,255,255,.76)" }}>
                      {notificacao.mensagem}
                    </p>
                  </div>

                  <small style={{ color: "rgba(255,255,255,.58)" }}>
                    {formatarData(notificacao.data_criacao)}
                  </small>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
