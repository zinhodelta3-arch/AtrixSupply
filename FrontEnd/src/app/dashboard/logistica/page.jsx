"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import "../algo.css";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
const LOGISTICA_ENDPOINT = `${API_URL}/api/logistica`;
const LIMITE = 10;

const VEICULO_OPTIONS = [
  { value: "caminhão", label: "Caminhão" },
  { value: "van", label: "Van" },
  { value: "moto", label: "Moto" },
  { value: "carro", label: "Carro" },
  { value: "bicicleta", label: "Bicicleta" },
  { value: "não selecionado", label: "Não selecionado" },
];

const DISPONIBILIDADE_OPTIONS = [
  { value: "disponivel", label: "Disponível" },
  { value: "ocupado", label: "Ocupado" },
  { value: "manutencao", label: "Manutenção" },
];

const FORM_INICIAL = {
  id_dono: "",
  nome_logistica: "",
  veiculo: "não selecionado",
  disponibilidade: "disponivel",
  destino: "",
};

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

const modalInputStyle = {
  backgroundColor: "rgba(255,255,255,.04)",
  border: "1px solid rgba(255,255,255,.10)",
  color: "#ffffff",
  minHeight: "56px",
  borderRadius: "16px",
  boxShadow: "none",
};

const labelStyle = {
  color: "rgba(255,255,255,.72)",
  fontSize: ".9rem",
  fontWeight: "700",
};

const dashboardTableWrapperStyle = {
  borderRadius: "22px",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,.08)",
  background: "linear-gradient(145deg, rgba(10,10,14,.98), rgba(22,13,18,.98))",
};

const dashboardTableStyle = {
  "--bs-table-bg": "transparent",
  "--bs-table-color": "#ffffff",
  "--bs-table-hover-bg": "rgba(255,136,0,.06)",
  "--bs-table-hover-color": "#ffffff",
  "--bs-table-border-color": "rgba(255,255,255,.07)",
  marginBottom: 0,
};

const dashboardTableHeadCellStyle = {
  background: "rgba(255,179,0,.08)",
  color: "#ffcf40",
  borderColor: "rgba(255,255,255,.08)",
  padding: "16px 18px",
  fontWeight: "800",
  whiteSpace: "nowrap",
};

const dashboardTableCellStyle = {
  background: "transparent",
  color: "#ffffff",
  borderColor: "rgba(255,255,255,.07)",
  padding: "16px 18px",
  verticalAlign: "middle",
};

const paginationBtnStyle = {
  background: "rgba(255,255,255,.04)",
  border: "1px solid rgba(255,255,255,.08)",
  color: "#ffcf40",
  borderRadius: "14px",
  fontWeight: "800",
  boxShadow: "none",
};

const modalBackdropStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 100020,
  background: "rgba(0,0,0,.72)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  padding: "22px",
  overflowY: "auto",
};

function obterToken() {
  if (typeof window === "undefined") return "";

  return (
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("jwt") ||
    ""
  );
}

function lerUsuarioLocal() {
  if (typeof window === "undefined") return null;

  const usuarioSalvo = localStorage.getItem("usuario");

  if (!usuarioSalvo) return null;

  try {
    return JSON.parse(usuarioSalvo);
  } catch {
    return null;
  }
}

function decodificarToken(token) {
  try {
    if (!token || !token.includes(".")) return null;

    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");

    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => `%${("00" + char.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );

    return JSON.parse(json);
  } catch {
    return null;
  }
}

function obterUsuarioBase() {
  return lerUsuarioLocal() || decodificarToken(obterToken());
}

function obterIdUsuarioLogado() {
  const usuario = obterUsuarioBase();

  return (
    usuario?.id_user ||
    usuario?.id_usuario ||
    usuario?.id ||
    usuario?.dados?.id_user ||
    usuario?.dados?.id_usuario ||
    usuario?.dados?.id ||
    usuario?.usuario?.id_user ||
    ""
  );
}

function normalizarTipoUsuario(usuario) {
  return String(
    usuario?.tipo ||
      usuario?.tipo_user ||
      usuario?.role ||
      usuario?.nivel ||
      usuario?.dados?.tipo ||
      usuario?.usuario?.tipo ||
      ""
  )
    .trim()
    .toLowerCase();
}

function usuarioPodeAcessar(usuario) {
  const tipo = normalizarTipoUsuario(usuario);

  return tipo === "fornecedor" || tipo === "administrador" || tipo === "admin";
}

function normalizarValor(valor) {
  return String(valor || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s-]+/g, "_");
}

function getOpcao(options, valor) {
  const normalizado = normalizarValor(valor);

  return options.find((option) => normalizarValor(option.value) === normalizado);
}

function formatarVeiculo(veiculo) {
  return getOpcao(VEICULO_OPTIONS, veiculo)?.label || "Não informado";
}

function formatarDisponibilidade(disponibilidade) {
  return getOpcao(DISPONIBILIDADE_OPTIONS, disponibilidade)?.label || "Não informado";
}

function getIniciais(nome) {
  return String(nome || "LG")
    .split(" ")
    .filter(Boolean)
    .map((parte) => parte[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getMensagemErro(data, status) {
  if (Array.isArray(data?.detalhes) && data.detalhes.length) {
    return data.detalhes.map((erro) => erro.mensagem).join(" | ");
  }

  return (
    data?.mensagem ||
    data?.erro ||
    `Erro ${status}: não foi possível concluir a operação.`
  );
}

async function apiRequest(endpoint, options = {}) {
  const token = obterToken();

  if (!token) {
    throw new Error("Token não encontrado. Faça login novamente.");
  }

  const response = await fetch(endpoint, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || data?.sucesso === false) {
    throw new Error(getMensagemErro(data, response.status));
  }

  return data;
}

function getStatusStyle(disponibilidade) {
  const normalizado = normalizarValor(disponibilidade);

  if (normalizado === "disponivel") {
    return {
      backgroundColor: "rgba(92,255,149,.10)",
      border: "1px solid rgba(92,255,149,.22)",
      color: "#5cff95",
    };
  }

  if (normalizado === "ocupado") {
    return {
      backgroundColor: "rgba(255,136,0,.10)",
      border: "1px solid rgba(255,136,0,.22)",
      color: "#ff8800",
    };
  }

  return {
    backgroundColor: "rgba(255,117,143,.10)",
    border: "1px solid rgba(255,117,143,.22)",
    color: "#ff758f",
  };
}

function getVeiculoIcone(veiculo) {
  const normalizado = normalizarValor(veiculo);

  if (normalizado === "caminhao") return "bi-truck";
  if (normalizado === "van") return "bi-bus-front";
  if (normalizado === "moto") return "bi-bicycle";
  if (normalizado === "bicicleta") return "bi-bicycle";
  if (normalizado === "carro") return "bi-car-front";

  return "bi-box-seam";
}

function getIdLogistica(logistica) {
  return logistica?.id_logistica || logistica?.id || "";
}

function montarPayloadLogistica(logistica, disponibilidadeExtra = null) {
  const veiculo =
    getOpcao(VEICULO_OPTIONS, logistica?.veiculo)?.value ||
    logistica?.veiculo ||
    "não selecionado";

  const disponibilidade =
    disponibilidadeExtra ||
    getOpcao(DISPONIBILIDADE_OPTIONS, logistica?.disponibilidade)?.value ||
    logistica?.disponibilidade ||
    "disponivel";

  return {
    id_dono: Number(logistica?.id_dono || obterIdUsuarioLogado()),
    nome_logistica: String(logistica?.nome_logistica || "").trim(),
    veiculo,
    disponibilidade,
    destino: String(logistica?.destino || "").trim() || null,
  };
}

export default function LogisticaDashboard() {
  const router = useRouter();

  const [acessoValidado, setAcessoValidado] = useState(false);

  const [logisticas, setLogisticas] = useState([]);
  const [pagina, setPagina] = useState(1);

  const [paginacao, setPaginacao] = useState({
    pagina: 1,
    limite: LIMITE,
    total: 0,
    totalPaginas: 1,
  });

  const [pesquisa, setPesquisa] = useState("");
  const [pesquisaAplicada, setPesquisaAplicada] = useState("");
  const [filtroVeiculo, setFiltroVeiculo] = useState("");
  const [filtroDisponibilidade, setFiltroDisponibilidade] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [statusAtualizandoId, setStatusAtualizandoId] = useState(null);

  const [erroLista, setErroLista] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [logisticaEditando, setLogisticaEditando] = useState(null);
  const [formData, setFormData] = useState(FORM_INICIAL);
  const [formErro, setFormErro] = useState(null);

  const [cardHoverAtivo, setCardHoverAtivo] = useState(null);

  const totalPaginas = Math.max(1, Number(paginacao.totalPaginas || 1));

  const paginasVisiveis = useMemo(() => {
    const total = totalPaginas;
    const atual = Number(pagina || 1);
    const tamanho = 5;

    let inicio = Math.max(1, atual - Math.floor(tamanho / 2));
    let fim = Math.min(total, inicio + tamanho - 1);

    if (fim - inicio + 1 < tamanho) {
      inicio = Math.max(1, fim - tamanho + 1);
    }

    return Array.from({ length: fim - inicio + 1 }, (_, index) => inicio + index);
  }, [pagina, totalPaginas]);

  const endpointAtual = useMemo(() => {
    const params = new URLSearchParams({
      pagina: String(pagina),
      limite: String(LIMITE),
    });

    if (pesquisaAplicada.trim()) {
      return `${LOGISTICA_ENDPOINT}/nome/${encodeURIComponent(pesquisaAplicada.trim())}?${params.toString()}`;
    }

    if (filtroVeiculo) {
      return `${LOGISTICA_ENDPOINT}/veiculo/${encodeURIComponent(filtroVeiculo)}?${params.toString()}`;
    }

    if (filtroDisponibilidade) {
      return `${LOGISTICA_ENDPOINT}/disponibilidade/${encodeURIComponent(filtroDisponibilidade)}?${params.toString()}`;
    }

    return `${LOGISTICA_ENDPOINT}?${params.toString()}`;
  }, [pagina, pesquisaAplicada, filtroVeiculo, filtroDisponibilidade]);

  const carregarLogisticas = useCallback(async () => {
    if (!acessoValidado) return;

    try {
      setCarregando(true);
      setErroLista(null);

      const data = await apiRequest(endpointAtual);
      const lista = Array.isArray(data?.dados) ? data.dados : [];

      setLogisticas(lista);

      setPaginacao({
        pagina: Number(data?.paginacao?.pagina || pagina),
        limite: Number(data?.paginacao?.limite || LIMITE),
        total: Number(data?.paginacao?.total || lista.length),
        totalPaginas: Number(data?.paginacao?.totalPaginas || 1),
      });
    } catch (error) {
      setLogisticas([]);
      setErroLista(error.message || "Não foi possível carregar as logísticas.");
    } finally {
      setCarregando(false);
    }
  }, [endpointAtual, pagina, acessoValidado]);

  useEffect(() => {
    const token = obterToken();
    const usuario = obterUsuarioBase();

    if (!token || !usuarioPodeAcessar(usuario)) {
      router.replace("/");
      return;
    }

    setAcessoValidado(true);
  }, [router]);

  useEffect(() => {
    carregarLogisticas();
  }, [carregarLogisticas]);

  function limparFeedbacks() {
    setErroLista(null);
    setFeedback(null);
    setFormErro(null);
  }

  function fecharModalForcado() {
    setModalAberto(false);
    setModoEdicao(false);
    setLogisticaEditando(null);
    setFormData(FORM_INICIAL);
    setFormErro(null);
  }

  function fecharModal() {
    if (salvando) return;
    fecharModalForcado();
  }

  function abrirCadastro() {
    limparFeedbacks();

    setModoEdicao(false);
    setLogisticaEditando(null);

    setFormData({
      ...FORM_INICIAL,
      id_dono: obterIdUsuarioLogado() ? String(obterIdUsuarioLogado()) : "",
    });

    setModalAberto(true);
  }

  function abrirEdicao(logistica) {
    limparFeedbacks();

    setModoEdicao(true);
    setLogisticaEditando(logistica);

    setFormData({
      id_dono: logistica?.id_dono ? String(logistica.id_dono) : "",
      nome_logistica: logistica?.nome_logistica || "",
      veiculo:
        getOpcao(VEICULO_OPTIONS, logistica?.veiculo)?.value ||
        "não selecionado",
      disponibilidade:
        getOpcao(DISPONIBILIDADE_OPTIONS, logistica?.disponibilidade)?.value ||
        "disponivel",
      destino: logistica?.destino || "",
    });

    setModalAberto(true);
  }

  function handleCampo(event) {
    const { name, value } = event.target;

    setFormData((atual) => ({
      ...atual,
      [name]: value,
    }));
  }

  function validarFormulario() {
    const idDono = Number(formData.id_dono);

    if (!idDono || Number.isNaN(idDono) || idDono <= 0) {
      return "Informe um ID de dono válido.";
    }

    if (!formData.nome_logistica.trim()) {
      return "O nome da logística é obrigatório.";
    }

    if (!VEICULO_OPTIONS.some((option) => option.value === formData.veiculo)) {
      return "Selecione um veículo válido.";
    }

    if (!DISPONIBILIDADE_OPTIONS.some((option) => option.value === formData.disponibilidade)) {
      return "Selecione uma disponibilidade válida.";
    }

    if (!formData.destino.trim()) {
      return "O destino é obrigatório.";
    }

    return null;
  }

  async function salvarLogistica(event) {
    event.preventDefault();
    limparFeedbacks();

    const erroValidacao = validarFormulario();

    if (erroValidacao) {
      setFormErro(erroValidacao);
      return;
    }

    try {
      setSalvando(true);

      const payload = {
        id_dono: Number(formData.id_dono),
        nome_logistica: formData.nome_logistica.trim(),
        veiculo: formData.veiculo,
        disponibilidade: formData.disponibilidade,
        destino: formData.destino.trim(),
      };

      const endpoint = modoEdicao
        ? `${LOGISTICA_ENDPOINT}/${getIdLogistica(logisticaEditando)}`
        : LOGISTICA_ENDPOINT;

      await apiRequest(endpoint, {
        method: modoEdicao ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });

      setFeedback(
        modoEdicao
          ? "Logística atualizada com sucesso."
          : "Logística criada com sucesso."
      );

      fecharModalForcado();

      if (!modoEdicao && pagina !== 1) {
        setPagina(1);
      } else {
        await carregarLogisticas();
      }
    } catch (error) {
      setFormErro(error.message || "Não foi possível salvar a logística.");
    } finally {
      setSalvando(false);
    }
  }

  async function excluirLogistica(logistica) {
    limparFeedbacks();

    const idLogistica = getIdLogistica(logistica);

    if (!idLogistica) {
      setErroLista("ID da logística não encontrado.");
      return;
    }

    const confirmar = window.confirm(
      `Deseja excluir a logística "${logistica.nome_logistica}"?`
    );

    if (!confirmar) return;

    try {
      setSalvando(true);

      await apiRequest(`${LOGISTICA_ENDPOINT}/${idLogistica}`, {
        method: "DELETE",
      });

      setFeedback("Logística excluída com sucesso.");

      if (logisticas.length === 1 && pagina > 1) {
        setPagina((paginaAtual) => Math.max(1, paginaAtual - 1));
      } else {
        await carregarLogisticas();
      }
    } catch (error) {
      setErroLista(error.message || "Não foi possível excluir a logística.");
    } finally {
      setSalvando(false);
    }
  }

  async function atualizarDisponibilidadeRapida(logistica, novaDisponibilidade) {
    const idLogistica = getIdLogistica(logistica);
    const disponibilidadeAtual =
      getOpcao(DISPONIBILIDADE_OPTIONS, logistica.disponibilidade)?.value ||
      logistica.disponibilidade;

    if (!idLogistica || disponibilidadeAtual === novaDisponibilidade) return;

    const logisticasAntes = logisticas;

    try {
      limparFeedbacks();
      setStatusAtualizandoId(idLogistica);

      setLogisticas((atuais) =>
        atuais.map((item) =>
          getIdLogistica(item) === idLogistica
            ? { ...item, disponibilidade: novaDisponibilidade }
            : item
        )
      );

      await apiRequest(`${LOGISTICA_ENDPOINT}/${idLogistica}`, {
        method: "PUT",
        body: JSON.stringify(montarPayloadLogistica(logistica, novaDisponibilidade)),
      });

      setFeedback("Disponibilidade atualizada com sucesso.");
    } catch (error) {
      setLogisticas(logisticasAntes);
      setErroLista(error.message || "Não foi possível atualizar a disponibilidade.");
    } finally {
      setStatusAtualizandoId(null);
    }
  }

  function handlePesquisar(event) {
    event.preventDefault();
    limparFeedbacks();
    setFiltroVeiculo("");
    setFiltroDisponibilidade("");
    setPesquisaAplicada(pesquisa);
    setPagina(1);
  }

  function handleFiltroVeiculo(event) {
    limparFeedbacks();
    setPesquisa("");
    setPesquisaAplicada("");
    setFiltroDisponibilidade("");
    setFiltroVeiculo(event.target.value);
    setPagina(1);
  }

  function handleFiltroDisponibilidade(event) {
    limparFeedbacks();
    setPesquisa("");
    setPesquisaAplicada("");
    setFiltroVeiculo("");
    setFiltroDisponibilidade(event.target.value);
    setPagina(1);
  }

  function limparFiltros() {
    limparFeedbacks();
    setPesquisa("");
    setPesquisaAplicada("");
    setFiltroVeiculo("");
    setFiltroDisponibilidade("");
    setPagina(1);
  }

  const metricas = useMemo(() => {
    const totalPagina = logisticas.length;

    const disponiveis = logisticas.filter(
      (item) => normalizarValor(item.disponibilidade) === "disponivel"
    ).length;

    const ocupados = logisticas.filter(
      (item) => normalizarValor(item.disponibilidade) === "ocupado"
    ).length;

    const manutencao = logisticas.filter(
      (item) => normalizarValor(item.disponibilidade) === "manutencao"
    ).length;

    return {
      totalSistema: paginacao.total || totalPagina,
      totalPagina,
      disponiveis,
      ocupados,
      manutencao,
    };
  }, [logisticas, paginacao.total]);

  const metricasCards = [
    {
      titulo: "Total no sistema",
      valor: Number(metricas.totalSistema || 0).toLocaleString("pt-BR"),
      detalhe: "Logísticas cadastradas",
      icon: "bi-truck",
      cor: "#ffcf40",
    },
    {
      titulo: "Disponíveis",
      valor: Number(metricas.disponiveis || 0).toLocaleString("pt-BR"),
      detalhe: "Veículos prontos para operação",
      icon: "bi-check-circle-fill",
      cor: "#5cff95",
    },
    {
      titulo: "Ocupados",
      valor: Number(metricas.ocupados || 0).toLocaleString("pt-BR"),
      detalhe: "Veículos em rota ou indisponíveis",
      icon: "bi-hourglass-split",
      cor: "#ff8800",
    },
    {
      titulo: "Manutenção",
      valor: Number(metricas.manutencao || 0).toLocaleString("pt-BR"),
      detalhe: "Veículos fora de operação",
      icon: "bi-tools",
      cor: "#ff758f",
    },
  ];

  if (!acessoValidado) {
    return (
      <main
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: pageBackground,
          color: "#ffb300",
        }}
      >
        <div className="text-center">
          <div className="spinner-border text-warning mb-3" />
          <h4 className="fw-bold">Validando acesso...</h4>
        </div>
      </main>
    );
  }

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
            Operação
          </span>

          <h1
            className="fw-bold mb-1"
            style={{
              color: "#ffb300",
              fontSize: "2rem",
              letterSpacing: "-1px",
            }}
          >
            Logística
          </h1>

          <p
            className="mb-0"
            style={{
              color: "rgba(255,255,255,.58)",
              fontSize: ".95rem",
            }}
          >
            Gerenciamento de veículos, destinos e disponibilidade.
          </p>
        </div>

        <button
          type="button"
          onClick={abrirCadastro}
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          style={buttonGradient}
        >
          <i className="bi bi-plus-lg" />
          Nova Logística
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
                        color: ativo ? "rgba(255,255,255,.74)" : "rgba(255,255,255,.58)",
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
                      {card.valor}
                    </h2>

                    <span
                      style={{
                        color: ativo ? "rgba(255,255,255,.58)" : "rgba(255,255,255,.42)",
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

      {(feedback || erroLista) && (
        <div
          className="alert border-0 mb-4"
          style={{
            background: feedback ? "rgba(34,197,94,0.10)" : "rgba(245,6,29,0.10)",
            color: feedback ? "#5cff95" : "#ff758f",
            borderRadius: "18px",
          }}
        >
          {feedback || erroLista}
        </div>
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
              Lista de logísticas
            </h4>

            <p
              className="mb-0"
              style={{
                color: "rgba(255,255,255,.55)",
                fontSize: ".9rem",
              }}
            >
              {paginacao.total} registro(s) encontrado(s)
            </p>
          </div>

          <div
            className="d-flex flex-column flex-xl-row gap-2 align-items-stretch align-items-xl-center"
            style={{
              width: "min(100%, 980px)",
            }}
          >
            <form onSubmit={handlePesquisar} className="d-flex gap-2 flex-grow-1">
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
                  value={pesquisa}
                  onChange={(event) => setPesquisa(event.target.value)}
                  placeholder="Pesquisar por nome..."
                  className="form-control border-0 shadow-none"
                  style={{
                    background: "transparent",
                    color: "#ffffff",
                    fontSize: ".92rem",
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn"
                style={{
                  ...paginationBtnStyle,
                  minWidth: "48px",
                }}
                title="Pesquisar"
              >
                <i className="bi bi-arrow-right" />
              </button>
            </form>

            <select
              value={filtroVeiculo}
              onChange={handleFiltroVeiculo}
              className="form-select shadow-none"
              style={{
                ...inputStyle,
                minWidth: "190px",
                height: "48px",
                cursor: "pointer",
              }}
            >
              <option value="" style={{ background: "#151518", color: "#fff" }}>
                Todos os veículos
              </option>

              {VEICULO_OPTIONS.map((veiculo) => (
                <option
                  key={veiculo.value}
                  value={veiculo.value}
                  style={{ background: "#151518", color: "#fff" }}
                >
                  {veiculo.label}
                </option>
              ))}
            </select>

            <select
              value={filtroDisponibilidade}
              onChange={handleFiltroDisponibilidade}
              className="form-select shadow-none"
              style={{
                ...inputStyle,
                minWidth: "220px",
                height: "48px",
                cursor: "pointer",
              }}
            >
              <option value="" style={{ background: "#151518", color: "#fff" }}>
                Todas as disponibilidades
              </option>

              {DISPONIBILIDADE_OPTIONS.map((disponibilidade) => (
                <option
                  key={disponibilidade.value}
                  value={disponibilidade.value}
                  style={{ background: "#151518", color: "#fff" }}
                >
                  {disponibilidade.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={limparFiltros}
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

        <div className="table-responsive" style={dashboardTableWrapperStyle}>
          <table
            className="table table-hover align-middle"
            style={dashboardTableStyle}
          >
            <thead>
              <tr>
                <th style={dashboardTableHeadCellStyle}>Logística</th>
                <th style={dashboardTableHeadCellStyle}>Dono</th>
                <th style={dashboardTableHeadCellStyle}>Veículo</th>
                <th style={dashboardTableHeadCellStyle}>Destino</th>
                <th style={dashboardTableHeadCellStyle}>Disponibilidade</th>
                <th style={{ ...dashboardTableHeadCellStyle, textAlign: "right" }}>
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {carregando ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center"
                    style={{
                      ...dashboardTableCellStyle,
                      padding: "34px 18px",
                      color: "rgba(255,255,255,.65)",
                    }}
                  >
                    <span className="spinner-border spinner-border-sm text-warning me-2" />
                    Carregando logísticas...
                  </td>
                </tr>
              ) : logisticas.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center"
                    style={{
                      ...dashboardTableCellStyle,
                      padding: "42px 18px",
                    }}
                  >
                    <i
                      className="bi bi-truck d-block mb-3"
                      style={{
                        color: "#ffcf40",
                        fontSize: "2.4rem",
                      }}
                    />

                    <h5 className="fw-bold mb-1">Nenhuma logística encontrada</h5>

                    <p
                      className="mb-0"
                      style={{
                        color: "rgba(255,255,255,.52)",
                      }}
                    >
                      Tente mudar os filtros ou cadastre uma nova logística.
                    </p>
                  </td>
                </tr>
              ) : (
                logisticas.map((logistica) => {
                  const idLogistica = getIdLogistica(logistica);
                  const disponibilidade =
                    getOpcao(DISPONIBILIDADE_OPTIONS, logistica.disponibilidade)?.value ||
                    "disponivel";

                  const atualizando = statusAtualizandoId === idLogistica;

                  return (
                    <tr key={idLogistica}>
                      <td style={dashboardTableCellStyle}>
                        <div className="d-flex align-items-center">
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
                            {getIniciais(logistica.nome_logistica)}
                          </div>

                          <div className="ms-3" style={{ minWidth: 0 }}>
                            <div
                              className="fw-bold text-truncate"
                              style={{
                                color: "#ffffff",
                                fontSize: ".95rem",
                                maxWidth: "250px",
                              }}
                              title={logistica.nome_logistica}
                            >
                              {logistica.nome_logistica || "Sem nome"}
                            </div>

                            <div
                              style={{
                                color: "rgba(255,255,255,.50)",
                                fontSize: ".82rem",
                              }}
                            >
                              ID: {idLogistica}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td style={dashboardTableCellStyle}>
                        <span style={{ color: "rgba(255,255,255,.72)" }}>
                          #{logistica.id_dono ?? "—"}
                        </span>
                      </td>

                      <td style={dashboardTableCellStyle}>
                        <span
                          className="d-inline-flex align-items-center gap-2"
                          style={{
                            color: "rgba(255,255,255,.82)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <i
                            className={`bi ${getVeiculoIcone(logistica.veiculo)}`}
                            style={{ color: "#ffcf40" }}
                          />
                          {formatarVeiculo(logistica.veiculo)}
                        </span>
                      </td>

                      <td style={dashboardTableCellStyle}>
                        <span
                          className="d-inline-block text-truncate"
                          style={{
                            color: "rgba(255,255,255,.72)",
                            maxWidth: "230px",
                          }}
                          title={logistica.destino}
                        >
                          {logistica.destino || "Sem destino"}
                        </span>
                      </td>

                      <td style={dashboardTableCellStyle}>
                        <select
                          value={disponibilidade}
                          onChange={(event) =>
                            atualizarDisponibilidadeRapida(logistica, event.target.value)
                          }
                          disabled={atualizando || salvando}
                          className="form-select form-select-sm shadow-none"
                          style={{
                            ...getStatusStyle(disponibilidade),
                            borderRadius: "999px",
                            fontSize: ".78rem",
                            fontWeight: "800",
                            width: "165px",
                            cursor: atualizando || salvando ? "not-allowed" : "pointer",
                            opacity: atualizando ? 0.65 : 1,
                          }}
                        >
                          {DISPONIBILIDADE_OPTIONS.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                              style={{ background: "#151518", color: "#fff" }}
                            >
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td
                        style={{
                          ...dashboardTableCellStyle,
                          textAlign: "right",
                        }}
                      >
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            type="button"
                            onClick={() => abrirEdicao(logistica)}
                            disabled={salvando}
                            className="btn d-flex align-items-center justify-content-center"
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "14px",
                              background: "rgba(255,179,0,.08)",
                              border: "1px solid rgba(255,179,0,.16)",
                              color: "#ffcf40",
                              boxShadow: "none",
                            }}
                            title="Editar logística"
                          >
                            <i className="bi bi-pencil-square" />
                          </button>

                          <button
                            type="button"
                            onClick={() => excluirLogistica(logistica)}
                            disabled={salvando}
                            className="btn d-flex align-items-center justify-content-center"
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "14px",
                              background: "rgba(245,6,29,.10)",
                              border: "1px solid rgba(245,6,29,.18)",
                              color: "#ff758f",
                              boxShadow: "none",
                            }}
                            title="Excluir logística"
                          >
                            <i className="bi bi-trash3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {!carregando && !erroLista && (
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4">
            <span
              style={{
                color: "rgba(255,255,255,.55)",
                fontSize: ".9rem",
              }}
            >
              Página {paginacao.pagina || pagina} de {totalPaginas}
            </span>

            <div className="d-flex gap-2 flex-wrap">
              <button
                type="button"
                className="btn px-3"
                disabled={pagina <= 1 || carregando}
                onClick={() => setPagina((paginaAtual) => Math.max(1, paginaAtual - 1))}
                style={{
                  ...paginationBtnStyle,
                  opacity: pagina <= 1 ? 0.45 : 1,
                  cursor: pagina <= 1 ? "not-allowed" : "pointer",
                }}
              >
                <i className="bi bi-chevron-left me-1" />
                Anterior
              </button>

              {paginasVisiveis.map((numeroPagina) => {
                const ativo = numeroPagina === pagina;

                return (
                  <button
                    key={numeroPagina}
                    type="button"
                    className="btn px-3"
                    onClick={() => setPagina(numeroPagina)}
                    disabled={ativo || carregando}
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
                disabled={pagina >= totalPaginas || carregando}
                onClick={() => setPagina((paginaAtual) => Math.min(totalPaginas, paginaAtual + 1))}
                style={{
                  ...paginationBtnStyle,
                  opacity: pagina >= totalPaginas ? 0.45 : 1,
                  cursor: pagina >= totalPaginas ? "not-allowed" : "pointer",
                }}
              >
                Próxima
                <i className="bi bi-chevron-right ms-1" />
              </button>
            </div>
          </div>
        )}
      </section>

      {modalAberto && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={modalBackdropStyle}
          role="dialog"
          aria-modal="true"
        >
          <form
            onSubmit={salvarLogistica}
            className="border-0 overflow-hidden"
            style={{
              background: surfaceGradient,
              border: "1px solid rgba(255,255,255,.10)",
              borderRadius: "30px",
              width: "100%",
              maxWidth: "980px",
              color: "white",
              boxShadow: "0 28px 90px rgba(0,0,0,.38)",
            }}
          >
            <div
              className="d-flex justify-content-between align-items-start gap-3"
              style={{
                padding: "30px 32px 22px",
                borderBottom: "1px solid rgba(255,255,255,.07)",
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "18px",
                    background: "rgba(255,179,0,.12)",
                    border: "1px solid rgba(255,179,0,.22)",
                    color: "#ffcf40",
                    flexShrink: 0,
                  }}
                >
                  <i
                    className={modoEdicao ? "bi bi-pencil-square" : "bi bi-truck"}
                    style={{ fontSize: "1.45rem" }}
                  />
                </div>

                <div>
                  <h2
                    className="fw-bold mb-1"
                    style={{
                      color: "#ffe082",
                      letterSpacing: "-1px",
                    }}
                  >
                    {modoEdicao ? "Editar Logística" : "Nova Logística"}
                  </h2>

                  <p
                    className="mb-0"
                    style={{
                      color: "rgba(255,255,255,.58)",
                    }}
                  >
                    {modoEdicao
                      ? "Atualize os dados da logística selecionada."
                      : "Cadastre uma nova operação logística."}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={fecharModal}
                disabled={salvando}
                className="btn"
                aria-label="Fechar modal"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "15px",
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.08)",
                  color: "white",
                  boxShadow: "none",
                }}
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <div style={{ padding: "28px 32px 10px" }}>
              {formErro && (
                <div
                  className="alert border-0 mb-4"
                  style={{
                    background: "rgba(245,6,29,0.14)",
                    color: "#fecaca",
                    borderRadius: "16px",
                  }}
                >
                  {formErro}
                </div>
              )}

              <div className="row g-3">
                <div className="col-12 col-lg-6">
                  <label className="form-label mb-2" style={labelStyle}>
                    ID do dono
                  </label>

                  <input
                    type="number"
                    min="1"
                    name="id_dono"
                    value={formData.id_dono}
                    onChange={handleCampo}
                    className="form-control shadow-none"
                    placeholder="Ex: 1"
                    required
                    style={modalInputStyle}
                  />
                </div>

                <div className="col-12 col-lg-6">
                  <label className="form-label mb-2" style={labelStyle}>
                    Nome da logística
                  </label>

                  <input
                    type="text"
                    name="nome_logistica"
                    value={formData.nome_logistica}
                    onChange={handleCampo}
                    className="form-control shadow-none"
                    placeholder="Ex: Rota Express São Paulo"
                    required
                    style={modalInputStyle}
                  />
                </div>

                <div className="col-12 col-lg-6">
                  <label className="form-label mb-2" style={labelStyle}>
                    Veículo
                  </label>

                  <select
                    name="veiculo"
                    value={formData.veiculo}
                    onChange={handleCampo}
                    className="form-select shadow-none"
                    required
                    style={{
                      ...modalInputStyle,
                      cursor: "pointer",
                    }}
                  >
                    {VEICULO_OPTIONS.map((veiculo) => (
                      <option
                        key={veiculo.value}
                        value={veiculo.value}
                        style={{ background: "#151518", color: "#fff" }}
                      >
                        {veiculo.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12 col-lg-6">
                  <label className="form-label mb-2" style={labelStyle}>
                    Disponibilidade
                  </label>

                  <select
                    name="disponibilidade"
                    value={formData.disponibilidade}
                    onChange={handleCampo}
                    className="form-select shadow-none"
                    required
                    style={{
                      ...modalInputStyle,
                      cursor: "pointer",
                    }}
                  >
                    {DISPONIBILIDADE_OPTIONS.map((disponibilidade) => (
                      <option
                        key={disponibilidade.value}
                        value={disponibilidade.value}
                        style={{ background: "#151518", color: "#fff" }}
                      >
                        {disponibilidade.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label mb-2" style={labelStyle}>
                    Destino
                  </label>

                  <input
                    type="text"
                    name="destino"
                    value={formData.destino}
                    onChange={handleCampo}
                    className="form-control shadow-none"
                    placeholder="Ex: São Paulo, SP"
                    required
                    style={modalInputStyle}
                  />
                </div>
              </div>
            </div>

            <div
              className="d-flex justify-content-end gap-2 flex-wrap"
              style={{
                padding: "22px 32px 32px",
                borderTop: "1px solid rgba(255,255,255,.07)",
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
                  fontWeight: "800",
                  boxShadow: "none",
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
                  minWidth: "190px",
                  opacity: salvando ? 0.7 : 1,
                  cursor: salvando ? "not-allowed" : "pointer",
                }}
              >
                {salvando ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Salvando...
                  </>
                ) : modoEdicao ? (
                  "Salvar alterações"
                ) : (
                  "Criar logística"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}