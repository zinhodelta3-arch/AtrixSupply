"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
const LOGISTICA_URL = `${API_URL}/api/logistica`;

const veiculosValidos = [
  "caminhão",
  "van",
  "moto",
  "carro",
  "bicicleta",
  "não selecionado",
];

const pageBackground = `
  radial-gradient(circle at top left, rgba(255,136,0,.10), transparent 25%),
  radial-gradient(circle at bottom right, rgba(192,1,42,.16), transparent 30%),
  linear-gradient(145deg,#08080a,#101014,#160d12)
`;

const heroGradient = "linear-gradient(135deg,#940533,#c0012a,#f5061d,#ff8800)";

const surfaceGradient = `
  linear-gradient(
    145deg,
    rgba(17,17,17,.96),
    rgba(25,18,22,.96)
  )
`;

const panelStyle = {
  background: surfaceGradient,
  borderRadius: "30px",
  border: "1px solid rgba(255,255,255,.10)",
  boxShadow: "none",
};

const inputStyle = {
  background: "rgba(255,255,255,.04)",
  border: "1px solid rgba(255,255,255,.08)",
  color: "white",
  borderRadius: "16px",
  padding: "13px 15px",
};

const buttonGradient = {
  background: "linear-gradient(90deg,#940533,#c0012a,#ff8800)",
  border: "none",
  color: "white",
  borderRadius: "16px",
  fontWeight: "800",
};

function obterToken() {
  if (typeof window === "undefined") return "";

  return (
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("jwt") ||
    ""
  );
}

function decodificarToken(token) {
  try {
    if (!token || !token.includes(".")) return null;

    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");

    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => {
          return "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(json);
  } catch {
    return null;
  }
}

function obterUsuarioLocal() {
  if (typeof window === "undefined") return null;

  const chaves = ["usuario", "user", "dadosUsuario", "authUser"];

  for (const chave of chaves) {
    const valor = localStorage.getItem(chave);

    if (!valor) continue;

    try {
      return JSON.parse(valor);
    } catch {
      continue;
    }
  }

  return null;
}

function obterUsuarioAutenticado() {
  const usuarioLocal = obterUsuarioLocal();

  if (usuarioLocal) return usuarioLocal;

  const token = obterToken();

  return decodificarToken(token);
}

function obterTipoUsuario(usuario) {
  return String(
    usuario?.tipo ||
      usuario?.tipo_user ||
      usuario?.cargo ||
      usuario?.role ||
      usuario?.nivel ||
      usuario?.dados?.tipo ||
      usuario?.dados?.tipo_user ||
      usuario?.dados?.cargo ||
      usuario?.dados?.role ||
      usuario?.dados?.nivel ||
      ""
  )
    .toLowerCase()
    .trim();
}

function usuarioPodeAcessarLogistica(tipoUsuario) {
  return (
    tipoUsuario === "fornecedor" ||
    tipoUsuario === "administrador" ||
    tipoUsuario === "admin"
  );
}

function obterIdUsuarioLogado() {
  const usuario = obterUsuarioAutenticado();

  return (
    usuario?.id_user ||
    usuario?.id_usuario ||
    usuario?.id ||
    usuario?.userId ||
    usuario?.idUser ||
    usuario?.dados?.id_user ||
    usuario?.dados?.id_usuario ||
    usuario?.dados?.id ||
    usuario?.dados?.userId ||
    usuario?.dados?.idUser ||
    ""
  );
}

function getCorDisponibilidade(disponibilidade) {
  switch (disponibilidade) {
    case "disponivel":
      return "#5cff95";
    case "ocupado":
      return "#ffb300";
    case "manutencao":
      return "#ff8a65";
    default:
      return "#ffcf40";
  }
}

function getLabelDisponibilidade(disponibilidade) {
  switch (disponibilidade) {
    case "disponivel":
      return "Disponível";
    case "ocupado":
      return "Ocupado";
    case "manutencao":
      return "Manutenção";
    default:
      return "Não informado";
  }
}

export default function LogisticaFornecedor() {
  const router = useRouter();

  const [validandoAcesso, setValidandoAcesso] = useState(true);

  const [logisticas, setLogisticas] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [filtroVeiculo, setFiltroVeiculo] = useState("");
  const [filtroDisponibilidade, setFiltroDisponibilidade] = useState("");

  const [pagina, setPagina] = useState(1);
  const [limite] = useState(10);
  const [paginacao, setPaginacao] = useState(null);

  const [carregando, setCarregando] = useState(true);
  const [erroLista, setErroLista] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [statusAtualizandoId, setStatusAtualizandoId] = useState(null);

  const [formErro, setFormErro] = useState(null);

  const [formData, setFormData] = useState({
    id_dono: "",
    nome_logistica: "",
    veiculo: "não selecionado",
    disponibilidade: "disponivel",
    destino: "",
  });

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    const usuario = obterUsuarioAutenticado();
    const tipoUsuario = obterTipoUsuario(usuario);

    if (!usuario || !usuarioPodeAcessarLogistica(tipoUsuario)) {
      router.replace("/");
      return;
    }

    const idUsuario = obterIdUsuarioLogado();

    if (idUsuario) {
      setFormData((prev) => ({
        ...prev,
        id_dono: String(idUsuario),
      }));
    }

    setValidandoAcesso(false);
  }, [router]);

  useEffect(() => {
    if (validandoAcesso) return;

    carregarLogisticas();
  }, [validandoAcesso, pagina, pesquisa, filtroVeiculo, filtroDisponibilidade]);

  function montarHeaders() {
    const token = obterToken();

    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  async function tratarResposta(response) {
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const mensagem =
        data?.mensagem ||
        data?.erro ||
        "Não foi possível concluir a operação";

      throw new Error(mensagem);
    }

    return data;
  }

  async function carregarLogisticas() {
    try {
      setCarregando(true);
      setErroLista(null);

      const query = `?pagina=${pagina}&limite=${limite}`;
      let url = `${LOGISTICA_URL}${query}`;

      if (pesquisa.trim()) {
        url = `${LOGISTICA_URL}/nome/${encodeURIComponent(pesquisa.trim())}${query}`;
      } else if (filtroVeiculo) {
        url = `${LOGISTICA_URL}/veiculo/${encodeURIComponent(filtroVeiculo)}${query}`;
      } else if (filtroDisponibilidade) {
        url = `${LOGISTICA_URL}/disponibilidade/${encodeURIComponent(filtroDisponibilidade)}${query}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: montarHeaders(),
      });

      const data = await tratarResposta(response);

      setLogisticas(Array.isArray(data?.dados) ? data.dados : []);
      setPaginacao(data?.paginacao || null);
    } catch (error) {
      console.error("Erro ao carregar logísticas:", error);
      setErroLista(error.message || "Não foi possível carregar as logísticas");
      setLogisticas([]);
    } finally {
      setCarregando(false);
    }
  }

  function limparFormulario() {
    const idUsuario = obterIdUsuarioLogado();

    setFormData({
      id_dono: idUsuario ? String(idUsuario) : "",
      nome_logistica: "",
      veiculo: "não selecionado",
      disponibilidade: "disponivel",
      destino: "",
    });

    setEditandoId(null);
    setFormErro(null);
  }

  function abrirModalCriacao() {
    limparFormulario();
    setFeedback(null);
    setModalAberto(true);
  }

  function fecharModal() {
    if (salvando) return;

    limparFormulario();
    setModalAberto(false);
  }

  function atualizarCampo(campo, valor) {
    setFormData((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  function editarLogistica(item) {
    setEditandoId(item.id_logistica);

    setFormData({
      id_dono: item.id_dono ? String(item.id_dono) : "",
      nome_logistica: item.nome_logistica || "",
      veiculo: item.veiculo || "não selecionado",
      disponibilidade: item.disponibilidade || "disponivel",
      destino: item.destino || "",
    });

    setFormErro(null);
    setFeedback(null);
    setModalAberto(true);
  }

  function abrirRota(item) {
    if (!item.destino) {
      setFeedback({
        tipo: "warning",
        texto: "Essa logística ainda não possui destino cadastrado.",
      });
      return;
    }

    const destino = encodeURIComponent(item.destino);
    window.open(`https://www.google.com/maps/search/?api=1&query=${destino}`, "_blank");
  }

  async function atualizarDisponibilidadeRapida(item, novaDisponibilidade) {
    if (item.disponibilidade === novaDisponibilidade) return;

    try {
      setStatusAtualizandoId(item.id_logistica);
      setErroLista(null);
      setFeedback(null);

      const response = await fetch(`${LOGISTICA_URL}/${item.id_logistica}`, {
        method: "PUT",
        headers: montarHeaders(),
        body: JSON.stringify({
          disponibilidade: novaDisponibilidade,
        }),
      });

      const data = await tratarResposta(response);

      setFeedback({
        tipo: "success",
        texto:
          data?.mensagem ||
          `Status da logística LG-${item.id_logistica} atualizado com sucesso.`,
      });

      await carregarLogisticas();
    } catch (error) {
      console.error("Erro ao atualizar disponibilidade:", error);

      setFeedback({
        tipo: "danger",
        texto:
          error.message ||
          "Não foi possível atualizar a disponibilidade da logística.",
      });
    } finally {
      setStatusAtualizandoId(null);
    }
  }

  async function salvarLogistica(event) {
    event.preventDefault();

    try {
      setSalvando(true);
      setFormErro(null);
      setFeedback(null);

      if (!formData.nome_logistica.trim()) {
        setFormErro("O nome da logística é obrigatório");
        return;
      }

      if (!editandoId && !formData.id_dono) {
        setFormErro("O ID do dono é obrigatório para criar uma logística");
        return;
      }

      const bodyCriacao = {
        id_dono: Number(formData.id_dono),
        nome_logistica: formData.nome_logistica.trim(),
        veiculo: formData.veiculo,
        disponibilidade: formData.disponibilidade,
        destino: formData.destino.trim() || null,
      };

      const bodyAtualizacao = {
        nome_logistica: formData.nome_logistica.trim(),
        veiculo: formData.veiculo,
        disponibilidade: formData.disponibilidade,
        destino: formData.destino.trim() || null,
      };

      const response = await fetch(
        editandoId ? `${LOGISTICA_URL}/${editandoId}` : LOGISTICA_URL,
        {
          method: editandoId ? "PUT" : "POST",
          headers: montarHeaders(),
          body: JSON.stringify(editandoId ? bodyAtualizacao : bodyCriacao),
        }
      );

      const data = await tratarResposta(response);

      setFeedback({
        tipo: "success",
        texto:
          data?.mensagem ||
          (editandoId
            ? "Logística atualizada com sucesso"
            : "Logística criada com sucesso"),
      });

      await carregarLogisticas();

      limparFormulario();
      setModalAberto(false);
    } catch (error) {
      console.error("Erro ao salvar logística:", error);
      setFormErro(error.message || "Não foi possível salvar a logística");
    } finally {
      setSalvando(false);
    }
  }

  async function excluirLogistica(id_logistica) {
    const confirmar = window.confirm("Tem certeza que deseja excluir esta logística?");

    if (!confirmar) return;

    try {
      setErroLista(null);
      setFeedback(null);

      const response = await fetch(`${LOGISTICA_URL}/${id_logistica}`, {
        method: "DELETE",
        headers: montarHeaders(),
      });

      const data = await tratarResposta(response);

      setFeedback({
        tipo: "success",
        texto: data?.mensagem || "Logística excluída com sucesso",
      });

      await carregarLogisticas();
    } catch (error) {
      console.error("Erro ao excluir logística:", error);
      setErroLista(error.message || "Não foi possível excluir a logística");
    }
  }

  function limparFiltros() {
    setPesquisa("");
    setFiltroVeiculo("");
    setFiltroDisponibilidade("");
    setPagina(1);
  }

  const metricas = useMemo(() => {
    const total = logisticas.length;

    const disponiveis = logisticas.filter(
      (item) => item.disponibilidade === "disponivel"
    ).length;

    const ocupadas = logisticas.filter(
      (item) => item.disponibilidade === "ocupado"
    ).length;

    const manutencao = logisticas.filter(
      (item) => item.disponibilidade === "manutencao"
    ).length;

    return {
      total,
      disponiveis,
      ocupadas,
      manutencao,
    };
  }, [logisticas]);

  if (validandoAcesso) {
    return (
      <main
        className="d-flex justify-content-center align-items-center text-white"
        style={{
          minHeight: "100vh",
          background: pageBackground,
        }}
      >
        <div className="text-center">
          <div className="spinner-border text-warning mb-3" />

          <h4 className="fw-bold">
            Verificando acesso...
          </h4>

          <p className="text-secondary mb-0">
            Apenas fornecedores e administradores podem acessar esta página.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: pageBackground,
        color: "white",
        overflow: "hidden",
      }}
    >
      <section
        className="py-5 text-white"
        style={{
          background: heroGradient,
          borderBottom: "1px solid rgba(255,255,255,.08)",
          minHeight: "245px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container-fluid px-4 px-lg-5 py-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-4">
            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "20px",
                  background: "rgba(255,255,255,.10)",
                  border: "1px solid rgba(255,255,255,.12)",
                }}
              >
                <i
                  className="bi bi-truck"
                  style={{
                    fontSize: "1.6rem",
                    color: "#ffcf40",
                  }}
                />
              </div>

              <div>
                <span className="badge bg-warning text-dark mb-2 px-3 py-2">
                  Central logística
                </span>

                <h1
                  style={{
                    margin: 0,
                    fontWeight: "800",
                    fontSize: "2rem",
                    color: "white",
                  }}
                >
                  Painel Logístico
                </h1>

                <p
                  style={{
                    margin: "6px 0 0",
                    color: "rgba(255,255,255,.72)",
                  }}
                >
                  Controle de veículos, disponibilidade, destinos e ações rápidas
                </p>
              </div>
            </div>

            <button
              onClick={abrirModalCriacao}
              className="btn"
              style={{
                ...buttonGradient,
                padding: "14px 24px",
              }}
            >
              <i className="bi bi-plus-circle-fill me-2" />
              Nova Logística
            </button>
          </div>
        </div>
      </section>

      <div className="container-fluid px-4 px-lg-5 py-5">
        <div className="row g-4">
          <div className="col-xl-3">
            <aside
              style={{
                ...panelStyle,
                padding: "30px",
                height: "100%",
              }}
            >
              <div className="text-center">
                <div
                  style={{
                    width: "140px",
                    height: "140px",
                    margin: "0 auto",
                    borderRadius: "28px",
                    overflow: "hidden",
                    position: "relative",
                    border: "2px solid rgba(255,255,255,.08)",
                  }}
                >
                  <Image
                    src="/core.png"
                    alt="Fornecedor"
                    fill
                    priority
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>

                <h3
                  style={{
                    marginTop: "22px",
                    fontWeight: "800",
                    color: "#ffe082",
                  }}
                >
                  Supplier Prime
                </h3>

                <p
                  style={{
                    color: "rgba(255,255,255,.55)",
                    marginBottom: 0,
                  }}
                >
                  Central logística premium
                </p>
              </div>

              <div className="d-flex flex-column gap-3 mt-5">
                {[
                  {
                    titulo: "Total",
                    valor: metricas.total,
                    icon: "bi-box-seam",
                  },
                  {
                    titulo: "Disponíveis",
                    valor: metricas.disponiveis,
                    icon: "bi-check-circle",
                  },
                  {
                    titulo: "Ocupados",
                    valor: metricas.ocupadas,
                    icon: "bi-truck-front",
                  },
                  {
                    titulo: "Manutenção",
                    valor: metricas.manutencao,
                    icon: "bi-tools",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center gap-3"
                    style={{
                      background: "rgba(255,255,255,.03)",
                      border: "1px solid rgba(255,255,255,.05)",
                      borderRadius: "20px",
                      padding: "18px",
                      boxShadow: "none",
                    }}
                  >
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "16px",
                        background: "rgba(255,179,0,.10)",
                      }}
                    >
                      <i
                        className={`bi ${item.icon}`}
                        style={{
                          color: "#ffcf40",
                          fontSize: "1.2rem",
                        }}
                      />
                    </div>

                    <div>
                      <p
                        style={{
                          margin: 0,
                          color: "rgba(255,255,255,.58)",
                          fontSize: ".82rem",
                        }}
                      >
                        {item.titulo}
                      </p>

                      <span
                        style={{
                          fontWeight: "800",
                          fontSize: "1.2rem",
                        }}
                      >
                        {String(item.valor).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="col-xl-9">
            <section
              style={{
                ...panelStyle,
                padding: "35px",
                height: "100%",
              }}
            >
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                <div>
                  <h2
                    style={{
                      color: "#ffe082",
                      fontWeight: "800",
                      marginBottom: "8px",
                    }}
                  >
                    Monitoramento Logístico
                  </h2>

                  <p
                    style={{
                      margin: 0,
                      color: "rgba(255,255,255,.55)",
                    }}
                  >
                    Visualize veículos, destinos, disponibilidade e ações.
                  </p>
                </div>

                <div className="d-flex flex-wrap gap-2">
                  <div
                    className="d-flex align-items-center gap-2"
                    style={{
                      background: "rgba(255,255,255,.03)",
                      border: "1px solid rgba(255,255,255,.05)",
                      borderRadius: "16px",
                      padding: "12px 16px",
                      minWidth: "260px",
                    }}
                  >
                    <i
                      className="bi bi-search"
                      style={{
                        color: "#ffcf40",
                      }}
                    />

                    <input
                      type="text"
                      placeholder="Buscar por nome..."
                      value={pesquisa}
                      onChange={(event) => {
                        setPesquisa(event.target.value);
                        setFiltroVeiculo("");
                        setFiltroDisponibilidade("");
                        setPagina(1);
                      }}
                      style={{
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: "white",
                        width: "100%",
                      }}
                    />
                  </div>

                  <select
                    value={filtroVeiculo}
                    onChange={(event) => {
                      setFiltroVeiculo(event.target.value);
                      setFiltroDisponibilidade("");
                      setPesquisa("");
                      setPagina(1);
                    }}
                    className="form-select"
                    style={{
                      ...inputStyle,
                      width: "190px",
                    }}
                  >
                    <option value="" style={{ color: "#111" }}>
                      Todos veículos
                    </option>

                    {veiculosValidos.map((veiculo) => (
                      <option key={veiculo} value={veiculo} style={{ color: "#111" }}>
                        {veiculo}
                      </option>
                    ))}
                  </select>

                  <select
                    value={filtroDisponibilidade}
                    onChange={(event) => {
                      setFiltroDisponibilidade(event.target.value);
                      setFiltroVeiculo("");
                      setPesquisa("");
                      setPagina(1);
                    }}
                    className="form-select"
                    style={{
                      ...inputStyle,
                      width: "190px",
                    }}
                  >
                    <option value="" style={{ color: "#111" }}>
                      Todas situações
                    </option>

                    <option value="disponivel" style={{ color: "#111" }}>
                      Disponível
                    </option>

                    <option value="ocupado" style={{ color: "#111" }}>
                      Ocupado
                    </option>

                    <option value="manutencao" style={{ color: "#111" }}>
                      Manutenção
                    </option>
                  </select>

                  <button
                    type="button"
                    onClick={limparFiltros}
                    className="btn btn-outline-light"
                    style={{
                      borderRadius: "16px",
                    }}
                  >
                    Limpar
                  </button>
                </div>
              </div>

              {feedback && (
                <div
                  className={`alert ${
                    feedback.tipo === "success"
                      ? "alert-success"
                      : feedback.tipo === "warning"
                      ? "alert-warning"
                      : feedback.tipo === "danger"
                      ? "alert-danger"
                      : "alert-info"
                  }`}
                >
                  {feedback.texto}
                </div>
              )}

              {erroLista && (
                <div className="alert alert-danger">{erroLista}</div>
              )}

              <div
                style={{
                  maxHeight: "72vh",
                  overflowY: "auto",
                  paddingRight: "6px",
                }}
              >
                {carregando ? (
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{
                      height: "320px",
                      borderRadius: "28px",
                      background: "rgba(255,255,255,.02)",
                      border: "1px solid rgba(255,255,255,.06)",
                    }}
                  >
                    <div className="spinner-border text-warning mb-3" />

                    <h4 style={{ fontWeight: "700" }}>
                      Carregando logísticas...
                    </h4>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-4">
                    {logisticas.map((item) => {
                      const cor = getCorDisponibilidade(item.disponibilidade);
                      const atualizando = statusAtualizandoId === item.id_logistica;

                      return (
                        <article
                          key={item.id_logistica}
                          style={{
                            position: "relative",
                            background: "rgba(255,255,255,.035)",
                            borderRadius: "28px",
                            padding: "28px",
                            border: "1px solid rgba(255,255,255,.06)",
                            overflow: "hidden",
                            boxShadow: "none",
                          }}
                        >
                          <div
                            className="d-flex gap-2"
                            style={{
                              position: "absolute",
                              top: "18px",
                              right: "18px",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => editarLogistica(item)}
                              className="btn"
                              style={{
                                width: "42px",
                                height: "42px",
                                borderRadius: "14px",
                                background: "rgba(255,255,255,.04)",
                                border: "1px solid rgba(255,255,255,.05)",
                                color: "#ffcf40",
                              }}
                            >
                              <i className="bi bi-pencil-fill" />
                            </button>

                            <button
                              type="button"
                              onClick={() => excluirLogistica(item.id_logistica)}
                              className="btn"
                              style={{
                                width: "42px",
                                height: "42px",
                                borderRadius: "14px",
                                background: "rgba(255,255,255,.04)",
                                border: "1px solid rgba(255,255,255,.05)",
                                color: "#ff758f",
                              }}
                            >
                              <i className="bi bi-trash3-fill" />
                            </button>
                          </div>

                          <div className="row g-4 align-items-center">
                            <div className="col-lg-4">
                              <p
                                style={{
                                  color: cor,
                                  fontWeight: "700",
                                  marginBottom: "10px",
                                  fontSize: ".82rem",
                                  textTransform: "uppercase",
                                  letterSpacing: ".8px",
                                }}
                              >
                                Logística #{item.id_logistica}
                              </p>

                              <h4
                                style={{
                                  fontWeight: "700",
                                  marginBottom: "14px",
                                  paddingRight: "80px",
                                }}
                              >
                                {item.nome_logistica}
                              </h4>

                              <div className="d-flex flex-column gap-2">
                                <span
                                  style={{
                                    color: "rgba(255,255,255,.65)",
                                  }}
                                >
                                  <i className="bi bi-geo-alt me-2" />
                                  {item.destino || "Destino não informado"}
                                </span>

                                <span
                                  style={{
                                    color: "rgba(255,255,255,.65)",
                                  }}
                                >
                                  <i className="bi bi-truck me-2" />
                                  {item.veiculo || "não selecionado"}
                                </span>
                              </div>
                            </div>

                            <div className="col-lg-3">
                              <div
                                style={{
                                  background: "rgba(255,255,255,.03)",
                                  border: "1px solid rgba(255,255,255,.05)",
                                  borderRadius: "22px",
                                  padding: "22px",
                                  boxShadow: "none",
                                }}
                              >
                                <p
                                  style={{
                                    color: cor,
                                    fontWeight: "700",
                                    marginBottom: "10px",
                                    textTransform: "uppercase",
                                    fontSize: ".78rem",
                                    letterSpacing: ".7px",
                                  }}
                                >
                                  Disponibilidade
                                </p>

                                <h5
                                  style={{
                                    margin: 0,
                                    fontWeight: "700",
                                  }}
                                >
                                  {getLabelDisponibilidade(item.disponibilidade)}
                                </h5>

                                {atualizando && (
                                  <span
                                    className="d-inline-flex align-items-center gap-2 mt-3"
                                    style={{
                                      color: "rgba(255,255,255,.65)",
                                      fontSize: ".82rem",
                                    }}
                                  >
                                    <span className="spinner-border spinner-border-sm" />
                                    Atualizando...
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="col-lg-3">
                              <p
                                style={{
                                  color: "#ffcf40",
                                  fontWeight: "700",
                                  marginBottom: "12px",
                                  textTransform: "uppercase",
                                  fontSize: ".78rem",
                                }}
                              >
                                Ações rápidas
                              </p>

                              <div className="d-flex flex-column gap-2">
                                <button
                                  type="button"
                                  onClick={() => abrirRota(item)}
                                  className="btn btn-sm text-start"
                                  disabled={!item.destino}
                                  style={{
                                    background: "rgba(255,255,255,.04)",
                                    border: "1px solid rgba(255,255,255,.07)",
                                    color: item.destino ? "white" : "rgba(255,255,255,.35)",
                                    borderRadius: "14px",
                                    padding: "10px 12px",
                                    fontWeight: "700",
                                  }}
                                >
                                  <i className="bi bi-map me-2" />
                                  Ver rota
                                </button>

                                <div
                                  style={{
                                    background: "rgba(255,255,255,.035)",
                                    border: "1px solid rgba(255,255,255,.06)",
                                    borderRadius: "14px",
                                    padding: "10px 12px",
                                    boxShadow: "none",
                                  }}
                                >
                                  <label
                                    style={{
                                      display: "block",
                                      color: "rgba(255,255,255,.55)",
                                      fontSize: ".72rem",
                                      fontWeight: "700",
                                      textTransform: "uppercase",
                                      letterSpacing: ".7px",
                                      marginBottom: "8px",
                                    }}
                                  >
                                    Alterar status
                                  </label>

                                  <div className="d-flex align-items-center gap-2">
                                    <select
                                      value={item.disponibilidade || "disponivel"}
                                      disabled={atualizando}
                                      onChange={(event) =>
                                        atualizarDisponibilidadeRapida(
                                          item,
                                          event.target.value
                                        )
                                      }
                                      className="form-select form-select-sm"
                                      style={{
                                        background: "rgba(20,21,26,.95)",
                                        border: `1px solid ${cor}`,
                                        color: "white",
                                        borderRadius: "12px",
                                        padding: "9px 12px",
                                        fontWeight: "700",
                                        boxShadow: "none",
                                        cursor: atualizando ? "not-allowed" : "pointer",
                                      }}
                                    >
                                      <option value="disponivel" style={{ color: "#111" }}>
                                        Disponível
                                      </option>

                                      <option value="ocupado" style={{ color: "#111" }}>
                                        Ocupado
                                      </option>

                                      <option value="manutencao" style={{ color: "#111" }}>
                                        Manutenção
                                      </option>
                                    </select>

                                    {atualizando && (
                                      <span
                                        className="spinner-border spinner-border-sm"
                                        style={{
                                          color: "#ffcf40",
                                          minWidth: "1rem",
                                        }}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-2 d-flex justify-content-lg-end">
                              <div
                                style={{
                                  textAlign: "right",
                                }}
                              >
                                <p
                                  style={{
                                    color: "rgba(255,255,255,.5)",
                                    marginBottom: "8px",
                                    fontSize: ".78rem",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  Código
                                </p>

                                <h6
                                  style={{
                                    color: "#ffe082",
                                    fontWeight: "700",
                                    margin: 0,
                                  }}
                                >
                                  LG-{item.id_logistica}
                                </h6>

                                <span
                                  className="badge mt-3"
                                  style={{
                                    background: "rgba(255,255,255,.06)",
                                    color: "rgba(255,255,255,.75)",
                                    border: "1px solid rgba(255,255,255,.08)",
                                    borderRadius: "999px",
                                    padding: "8px 10px",
                                  }}
                                >
                                  Dono #{item.id_dono}
                                </span>
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}

                    {logisticas.length === 0 && (
                      <div
                        className="d-flex flex-column justify-content-center align-items-center"
                        style={{
                          height: "320px",
                          borderRadius: "28px",
                          background: "rgba(255,255,255,.02)",
                          border: "1px solid rgba(255,255,255,.06)",
                        }}
                      >
                        <i
                          className="bi bi-truck"
                          style={{
                            fontSize: "4rem",
                            color: "#ffcf40",
                            marginBottom: "18px",
                          }}
                        />

                        <h3
                          style={{
                            fontWeight: "700",
                          }}
                        >
                          Nenhuma logística encontrada
                        </h3>

                        <p
                          style={{
                            color: "rgba(255,255,255,.55)",
                          }}
                        >
                          Cadastre uma nova logística ou altere os filtros.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {paginacao && paginacao.totalPaginas > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
                  <span style={{ color: "rgba(255,255,255,.55)" }}>
                    Página {paginacao.pagina} de {paginacao.totalPaginas} — Total:{" "}
                    {paginacao.total}
                  </span>

                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-light"
                      disabled={pagina <= 1}
                      onClick={() => setPagina((prev) => Math.max(prev - 1, 1))}
                      style={{ borderRadius: "14px" }}
                    >
                      Anterior
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-light"
                      disabled={pagina >= paginacao.totalPaginas}
                      onClick={() =>
                        setPagina((prev) =>
                          Math.min(prev + 1, paginacao.totalPaginas)
                        )
                      }
                      style={{ borderRadius: "14px" }}
                    >
                      Próxima
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      {modalAberto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={fecharModal}
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            zIndex: 9999,
            background: "rgba(0,0,0,.68)",
            backdropFilter: "blur(16px)",
            padding: "18px",
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "min(760px, 100%)",
              maxHeight: "92vh",
              overflowY: "auto",
              borderRadius: "32px",
              background: surfaceGradient,
              border: "1px solid rgba(255,255,255,.10)",
              boxShadow: "none",
              color: "white",
            }}
          >
            <div
              className="d-flex justify-content-between align-items-start gap-3"
              style={{
                padding: "30px 32px 20px",
                borderBottom: "1px solid rgba(255,255,255,.06)",
              }}
            >
              <div className="d-flex gap-3 align-items-center">
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    width: "54px",
                    height: "54px",
                    borderRadius: "18px",
                    background: "rgba(255,179,0,.10)",
                    border: "1px solid rgba(255,255,255,.08)",
                  }}
                >
                  <i
                    className={`bi ${editandoId ? "bi-pencil-square" : "bi-plus-circle"}`}
                    style={{
                      color: "#ffcf40",
                      fontSize: "1.35rem",
                    }}
                  />
                </div>

                <div>
                  <h3
                    style={{
                      margin: 0,
                      color: "#ffe082",
                      fontWeight: "800",
                    }}
                  >
                    {editandoId ? "Editar Logística" : "Nova Logística"}
                  </h3>

                  <p
                    style={{
                      margin: "4px 0 0",
                      color: "rgba(255,255,255,.55)",
                    }}
                  >
                    {editandoId
                      ? `Atualizando o registro LG-${editandoId}`
                      : "Cadastre uma nova logística para o painel"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={fecharModal}
                disabled={salvando}
                className="btn"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "15px",
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.08)",
                  color: "white",
                }}
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <form onSubmit={salvarLogistica}>
              <div style={{ padding: "28px 32px 10px" }}>
                <div className="row g-3">
                  {!editandoId && (
                    <div className="col-md-6">
                      <label className="form-label small text-white-50">
                        ID do dono
                      </label>

                      <input
                        type="number"
                        className="form-control"
                        value={formData.id_dono}
                        onChange={(event) =>
                          atualizarCampo("id_dono", event.target.value)
                        }
                        placeholder="Ex: 1"
                        style={inputStyle}
                      />
                    </div>
                  )}

                  <div className={editandoId ? "col-12" : "col-md-6"}>
                    <label className="form-label small text-white-50">
                      Nome da logística
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={formData.nome_logistica}
                      onChange={(event) =>
                        atualizarCampo("nome_logistica", event.target.value)
                      }
                      placeholder="Ex: Rota Express São Paulo"
                      style={inputStyle}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small text-white-50">
                      Veículo
                    </label>

                    <select
                      className="form-select"
                      value={formData.veiculo}
                      onChange={(event) =>
                        atualizarCampo("veiculo", event.target.value)
                      }
                      style={inputStyle}
                    >
                      {veiculosValidos.map((veiculo) => (
                        <option key={veiculo} value={veiculo} style={{ color: "#111" }}>
                          {veiculo}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small text-white-50">
                      Disponibilidade
                    </label>

                    <select
                      className="form-select"
                      value={formData.disponibilidade}
                      onChange={(event) =>
                        atualizarCampo("disponibilidade", event.target.value)
                      }
                      style={inputStyle}
                    >
                      <option value="disponivel" style={{ color: "#111" }}>
                        Disponível
                      </option>

                      <option value="ocupado" style={{ color: "#111" }}>
                        Ocupado
                      </option>

                      <option value="manutencao" style={{ color: "#111" }}>
                        Manutenção
                      </option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label small text-white-50">
                      Destino
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={formData.destino}
                      onChange={(event) =>
                        atualizarCampo("destino", event.target.value)
                      }
                      placeholder="Ex: São Paulo, SP"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {formErro && (
                  <div className="alert alert-danger mt-4 mb-0">
                    {formErro}
                  </div>
                )}
              </div>

              <div
                className="d-flex justify-content-end gap-2 flex-wrap"
                style={{
                  padding: "22px 32px 32px",
                  borderTop: "1px solid rgba(255,255,255,.06)",
                }}
              >
                <button
                  type="button"
                  onClick={fecharModal}
                  disabled={salvando}
                  className="btn btn-outline-light"
                  style={{
                    borderRadius: "16px",
                    padding: "12px 20px",
                    fontWeight: "700",
                  }}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={salvando}
                  className="btn"
                  style={{
                    ...buttonGradient,
                    padding: "12px 24px",
                    minWidth: "170px",
                  }}
                >
                  {salvando ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Salvando...
                    </>
                  ) : editandoId ? (
                    "Salvar Alterações"
                  ) : (
                    "Criar Logística"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}