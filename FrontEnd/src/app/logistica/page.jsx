"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import AlertCard from "@/components/AlertCard";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
const LOGISTICA_URL = `${API_URL}/api/logistica`;
const FOTO_USUARIO_FALLBACK = "/logo.png";

const veiculosValidos = [
  "caminhão",
  "van",
  "moto",
  "carro",
  "bicicleta",
  "não selecionado",
];

const disponibilidadesValidas = ["disponivel", "ocupado", "manutencao"];

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

const motionTransition = {
  duration: 0.42,
  ease: [0.22, 1, 0.36, 1],
};

const fadeUpMotion = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: motionTransition,
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
    usuario?.usuario?.id_user ||
    usuario?.usuario?.id_usuario ||
    usuario?.usuario?.id ||
    usuario?.usuario?.userId ||
    ""
  );
}

function obterNomeUsuario(usuario) {
  return (
    usuario?.nome_user ||
    usuario?.nome ||
    usuario?.name ||
    usuario?.empresa ||
    usuario?.dados?.nome_user ||
    usuario?.dados?.nome ||
    usuario?.dados?.empresa ||
    usuario?.usuario?.nome_user ||
    usuario?.usuario?.nome ||
    usuario?.usuario?.empresa ||
    "Usuário"
  );
}

function obterIniciaisUsuario(nome) {
  const partes = String(nome || "")
    .trim()
    .split(" ")
    .filter(Boolean);

  if (partes.length === 0) return "US";

  if (partes.length === 1) {
    return partes[0].slice(0, 2).toUpperCase();
  }

  return `${partes[0][0]}${partes[partes.length - 1][0]}`.toUpperCase();
}

function obterFotoBrutaUsuario(usuario) {
  return (
    usuario?.foto ||
    usuario?.foto_user ||
    usuario?.foto_perfil ||
    usuario?.imagem ||
    usuario?.avatar ||
    usuario?.profile_image ||
    usuario?.dados?.foto ||
    usuario?.dados?.foto_user ||
    usuario?.dados?.foto_perfil ||
    usuario?.dados?.imagem ||
    usuario?.dados?.avatar ||
    usuario?.usuario?.foto ||
    usuario?.usuario?.foto_user ||
    usuario?.usuario?.foto_perfil ||
    usuario?.usuario?.imagem ||
    usuario?.usuario?.avatar ||
    ""
  );
}

function resolverUrlImagemUsuario(imagem) {
  const valorOriginal = String(imagem || "")
    .trim()
    .replace(/\\/g, "/");

  if (!valorOriginal) {
    return "";
  }

  if (
    valorOriginal.startsWith("http://") ||
    valorOriginal.startsWith("https://") ||
    valorOriginal.startsWith("data:image") ||
    valorOriginal.startsWith("blob:")
  ) {
    return valorOriginal;
  }

  if (valorOriginal.startsWith("/")) {
    if (valorOriginal.startsWith("/uploads")) {
      return `${API_URL}${valorOriginal}`;
    }

    return valorOriginal;
  }

  const caminhoLimpo = valorOriginal.replace(/^\/+/, "");

  if (caminhoLimpo.startsWith("uploads/")) {
    return `${API_URL}/${caminhoLimpo}`;
  }

  return `${API_URL}/uploads/imagens/${caminhoLimpo}`;
}

function obterFotoUsuario(usuario) {
  return resolverUrlImagemUsuario(obterFotoBrutaUsuario(usuario));
}

function formatarPerfilLogistica(tipoUsuario) {
  if (tipoUsuario === "admin" || tipoUsuario === "administrador") {
    return "Administrador logístico";
  }

  if (tipoUsuario === "fornecedor") {
    return "Fornecedor logístico";
  }

  return "Central logística";
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

function logisticaEstaBloqueada(item) {
  return item?.disponibilidade === "ocupado" || Boolean(item?.destino);
}

function normalizarTextoExibicao(valor) {
  return String(valor || "")
    .replaceAll("_", " ")
    .trim();
}

export default function LogisticaFornecedor() {
  const router = useRouter();

  const [validandoAcesso, setValidandoAcesso] = useState(true);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [fotoUsuarioQuebrou, setFotoUsuarioQuebrou] = useState(false);

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
    nome_logistica: "",
    veiculo: "não selecionado",
    disponibilidade: "disponivel",
  });

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    setFotoUsuarioQuebrou(false);
  }, [usuarioLogado]);

  useEffect(() => {
    const usuario = obterUsuarioAutenticado();
    const tipoUsuario = obterTipoUsuario(usuario);

    if (!usuario || !usuarioPodeAcessarLogistica(tipoUsuario)) {
      router.replace("/");
      return;
    }

    setUsuarioLogado(usuario);
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
    setFormData({
      nome_logistica: "",
      veiculo: "não selecionado",
      disponibilidade: "disponivel",
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
      nome_logistica: item.nome_logistica || "",
      veiculo: item.veiculo || "não selecionado",
      disponibilidade: item.disponibilidade || "disponivel",
    });

    setFormErro(null);
    setFeedback(null);
    setModalAberto(true);
  }

  function abrirRota(item) {
    if (!item.destino) {
      setFeedback({
        tipo: "warning",
        texto: "Essa logística ainda não possui destino definido. O destino será preenchido quando ela for atribuída a uma encomenda.",
      });
      return;
    }

    const destino = encodeURIComponent(item.destino);
    window.open(`https://www.google.com/maps/search/?api=1&query=${destino}`, "_blank");
  }

  async function atualizarDisponibilidadeRapida(item, novaDisponibilidade) {
    if (item.disponibilidade === novaDisponibilidade) return;

    if (logisticaEstaBloqueada(item) && novaDisponibilidade === "disponivel") {
      setFeedback({
        tipo: "warning",
        texto:
          "Essa logística está vinculada a uma encomenda ativa e não pode voltar para Disponível.",
      });
      return;
    }

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
        texto: data?.mensagem || "Status da logística atualizado com sucesso.",
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

      const idDonoLogado = obterIdUsuarioLogado();

      if (!idDonoLogado) {
        setFormErro("Não foi possível identificar o usuário logado. Faça login novamente.");
        return;
      }

      const bodyCriacao = {
        id_dono: Number(idDonoLogado),
        nome_logistica: formData.nome_logistica.trim(),
        veiculo: formData.veiculo,
        disponibilidade: formData.disponibilidade,
      };

      const bodyAtualizacao = {
        nome_logistica: formData.nome_logistica.trim(),
        veiculo: formData.veiculo,
        disponibilidade: formData.disponibilidade,
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

  async function excluirLogistica(item) {
    if (logisticaEstaBloqueada(item)) {
      setFeedback({
        tipo: "warning",
        texto:
          "Essa logística está atribuída a uma encomenda ativa e não pode ser excluída.",
      });
      return;
    }

    const confirmar = window.confirm("Tem certeza que deseja excluir esta logística?");

    if (!confirmar) return;

    try {
      setErroLista(null);
      setFeedback(null);

      const response = await fetch(`${LOGISTICA_URL}/${item.id_logistica}`, {
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

      setFeedback({
        tipo: "danger",
        texto: error.message || "Não foi possível excluir a logística",
      });
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

  const nomeUsuarioPainel = obterNomeUsuario(usuarioLogado);
  const fotoUsuarioPainel = obterFotoUsuario(usuarioLogado);
  const iniciaisUsuarioPainel = obterIniciaisUsuario(nomeUsuarioPainel);
  const exibirFotoUsuarioPainel = Boolean(fotoUsuarioPainel && !fotoUsuarioQuebrou);
  const perfilUsuarioPainel = formatarPerfilLogistica(obterTipoUsuario(usuarioLogado));

  if (validandoAcesso) {
    return (
      <motion.main
        className="d-flex justify-content-center align-items-center text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={motionTransition}
        style={{
          minHeight: "100vh",
          background: pageBackground,
        }}
      >
        <motion.div className="text-center" {...fadeUpMotion}>
          <div className="spinner-border text-warning mb-3" />

          <h4 className="fw-bold">
            Verificando acesso...
          </h4>

          <p className="text-secondary mb-0">
            Apenas fornecedores e administradores podem acessar esta página.
          </p>
        </motion.div>
      </motion.main>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        minHeight: "100vh",
        background: pageBackground,
        color: "white",
        overflow: "hidden",
      }}
    >
      <motion.section
        className="py-5 text-white"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={motionTransition}
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
                  Controle de veículos, disponibilidade, destinos automáticos e ações rápidas
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.div
        className="container-fluid px-4 px-lg-5 py-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...motionTransition, delay: 0.08 }}
      >
        <div className="row g-4">
          <div className="col-xl-3">
            <motion.aside
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...motionTransition, delay: 0.12 }}
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
                  {exibirFotoUsuarioPainel ? (
                    <img
                      src={fotoUsuarioPainel}
                      alt={`Foto de ${nomeUsuarioPainel}`}
                      onError={() => setFotoUsuarioQuebrou(true)}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                          "linear-gradient(135deg, rgba(148,5,51,.72), rgba(192,1,42,.58), rgba(255,136,0,.38))",
                        color: "#ffcf40",
                        fontWeight: "900",
                        fontSize: "2.35rem",
                        letterSpacing: "1px",
                        textShadow: "0 0 18px rgba(255,179,0,.25)",
                      }}
                    >
                      {iniciaisUsuarioPainel}
                    </span>
                  )}
                </div>

                <h3
                  style={{
                    marginTop: "22px",
                    fontWeight: "800",
                    color: "#ffe082",
                  }}
                >
                  {nomeUsuarioPainel}
                </h3>

                <p
                  style={{
                    color: "rgba(255,255,255,.55)",
                    marginBottom: 0,
                  }}
                >
                  {perfilUsuarioPainel}
                </p>

                <button
                  type="button"
                  onClick={abrirModalCriacao}
                  className="btn w-100 mt-4"
                  style={{
                    ...buttonGradient,
                    padding: "13px 18px",
                  }}
                >
                  <i className="bi bi-plus-circle-fill me-2" />
                  Nova Logística
                </button>
              </div>

              <div className="d-flex flex-column gap-3 mt-4">
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
            </motion.aside>
          </div>

          <div className="col-xl-9">
            <motion.section
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...motionTransition, delay: 0.16 }}
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
                    O destino é preenchido automaticamente pelo endereço do comprador quando a logística é atribuída.
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
                <AlertCard
                  variant={feedback.tipo}
                  title={
                    feedback.tipo === "success"
                      ? "Sucesso"
                      : feedback.tipo === "warning"
                        ? "Atenção"
                        : feedback.tipo === "danger"
                          ? "Erro"
                          : "Informação"
                  }
                  message={feedback.texto}
                  className="mb-3"
                />
              )}

              {erroLista && (
                <AlertCard
                  variant="danger"
                  title="Erro"
                  message={erroLista}
                  className="mb-3"
                />
              )}

              <div
                style={{
                  maxHeight: "72vh",
                  overflowY: "auto",
                  paddingRight: "6px",
                }}
              >
                {carregando ? (
                  <AlertCard
                    variant="neutral"
                    icon={<span className="spinner-border spinner-border-sm" aria-hidden="true" />}
                    title="Carregando logísticas..."
                    centered
                    style={{ minHeight: "320px" }}
                  />
                ) : (
                  <div className="d-flex flex-column gap-4">
                    {logisticas.map((item, index) => {
                      const cor = getCorDisponibilidade(item.disponibilidade);
                      const atualizando = statusAtualizandoId === item.id_logistica;
                      const bloqueada = logisticaEstaBloqueada(item);

                      return (
                        <motion.article
                          key={item.id_logistica}
                          initial={{ opacity: 0, y: 22 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            ...motionTransition,
                            delay: Math.min(index, 10) * 0.06,
                          }}
                          whileHover={{
                            y: -2,
                            borderColor: "rgba(255,179,0,.18)",
                          }}
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
                            className="d-flex gap-3"
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
                              onClick={() => excluirLogistica(item)}
                              disabled={bloqueada}
                              title={
                                bloqueada
                                  ? "Logística vinculada a uma encomenda ativa"
                                  : "Excluir logística"
                              }
                              className="btn"
                              style={{
                                width: "42px",
                                height: "42px",
                                borderRadius: "14px",
                                background: "rgba(255,255,255,.04)",
                                border: "1px solid rgba(255,255,255,.05)",
                                color: bloqueada ? "rgba(255,255,255,.25)" : "#ff758f",
                                cursor: bloqueada ? "not-allowed" : "pointer",
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
                                Registro logístico
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
                                  {item.destino || "Destino automático ainda não definido"}
                                </span>

                                <span
                                  style={{
                                    color: "rgba(255,255,255,.65)",
                                  }}
                                >
                                  <i className="bi bi-truck me-2" />
                                  {normalizarTextoExibicao(item.veiculo || "não selecionado")}
                                </span>

                                {bloqueada && (
                                  <span
                                    className="badge align-self-start"
                                    style={{
                                      background: "rgba(255,179,0,.12)",
                                      color: "#ffe082",
                                      border: "1px solid rgba(255,179,0,.22)",
                                      borderRadius: "999px",
                                      padding: "8px 12px",
                                    }}
                                  >
                                    <i className="bi bi-lock-fill me-1" />
                                    Vinculada / bloqueada
                                  </span>
                                )}
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

                              <div className="d-flex flex-column gap-2 ml-2">
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
                                    cursor: item.destino ? "pointer" : "not-allowed",
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
                                      <option
                                        value="disponivel"
                                        disabled={bloqueada}
                                        style={{ color: "#ffffff" }}
                                      >
                                        Disponível
                                      </option>

                                      <option value="ocupado" style={{ color: "#ffffff" }}>
                                        Ocupado
                                      </option>

                                      <option value="manutencao" style={{ color: "#ffffff" }}>
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

                      
                          </div>
                        </motion.article>
                      );
                    })}

                    {logisticas.length === 0 && (
                      <AlertCard
                        variant="empty"
                        icon="bi-truck"
                        title="Nenhuma logística encontrada"
                        message="Cadastre uma nova logística ou altere os filtros."
                        centered
                        style={{ minHeight: "320px" }}
                      />
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
            </motion.section>
          </div>
        </div>
      </motion.div>

      {modalAberto && (
        <motion.div
          role="dialog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
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
          <motion.div
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={motionTransition}
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
                      ? "Atualize os dados desta logística."
                      : "Cadastre uma nova logística para o painel."}
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
                  <div className="col-12">
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
                      {disponibilidadesValidas.map((disponibilidade) => (
                        <option
                          key={disponibilidade}
                          value={disponibilidade}
                          style={{ color: "#111" }}
                        >
                          {getLabelDisponibilidade(disponibilidade)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <AlertCard
                      variant="info"
                      title="Destino automático"
                      message="O destino será definido automaticamente pelo endereço do comprador quando esta logística for atribuída a uma encomenda."
                    />
                  </div>
                </div>

                {formErro && (
                  <AlertCard
                    variant="danger"
                    title="Erro"
                    message={formErro}
                    className="mt-4 mb-0"
                  />
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
          </motion.div>
        </motion.div>
      )}
    </motion.main>
  );
}
