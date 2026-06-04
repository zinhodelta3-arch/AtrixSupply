"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
const LOGISTICA_ENDPOINT = `${API_URL}/api/logistica`;
const LIMITE = 10;

const VEICULO_OPTIONS = [
  { value: "caminhao", label: "Caminhão" },
  { value: "van", label: "Van" },
  { value: "moto", label: "Moto" },
  { value: "carro", label: "Carro" },
  { value: "bicicleta", label: "Bicicleta" },
  { value: "nao_selecionado", label: "Não selecionado" },
];

const DISPONIBILIDADE_OPTIONS = [
  { value: "disponivel", label: "Disponível" },
  { value: "ocupado", label: "Ocupado" },
  { value: "manutencao", label: "Manutenção" },
];

const FORM_INICIAL = {
  id_dono: "",
  nome_logistica: "",
  veiculo: "nao_selecionado",
  disponibilidade: "disponivel",
  destino: "",
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

function obterIdUsuarioLogado() {
  const usuario = lerUsuarioLocal() || decodificarToken(obterToken());

  return (
    usuario?.id_user ||
    usuario?.id_usuario ||
    usuario?.id ||
    usuario?.dados?.id_user ||
    usuario?.dados?.id_usuario ||
    usuario?.dados?.id ||
    ""
  );
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

  return options.find((option) => option.value === normalizado);
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

export default function LogisticaDashboard() {
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

  const totalPaginas = Math.max(1, Number(paginacao.totalPaginas || 1));

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
  }, [endpointAtual, pagina]);

  useEffect(() => {
    carregarLogisticas();
  }, [carregarLogisticas]);

  function limparFeedbacks() {
    setErroLista(null);
    setFeedback(null);
    setFormErro(null);
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
      veiculo: getOpcao(VEICULO_OPTIONS, logistica?.veiculo)?.value || "nao_selecionado",
      disponibilidade:
        getOpcao(DISPONIBILIDADE_OPTIONS, logistica?.disponibilidade)?.value || "disponivel",
      destino: logistica?.destino || "",
    });
    setModalAberto(true);
  }

  function fecharModal() {
    if (salvando) return;

    setModalAberto(false);
    setModoEdicao(false);
    setLogisticaEditando(null);
    setFormData(FORM_INICIAL);
    setFormErro(null);
  }

  function handleCampo(event) {
    const { name, value } = event.target;

    setFormData((atual) => ({
      ...atual,
      [name]: value,
    }));
  }

  function validarFormulario() {
    if (!modoEdicao) {
      const idDono = Number(formData.id_dono);

      if (!idDono || Number.isNaN(idDono) || idDono <= 0) {
        return "Informe um ID de dono válido.";
      }
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

      const payloadBase = {
        nome_logistica: formData.nome_logistica.trim(),
        veiculo: formData.veiculo,
        disponibilidade: formData.disponibilidade,
        destino: formData.destino.trim() || null,
      };

      const endpoint = modoEdicao
        ? `${LOGISTICA_ENDPOINT}/${logisticaEditando.id_logistica}`
        : LOGISTICA_ENDPOINT;

      await apiRequest(endpoint, {
        method: modoEdicao ? "PUT" : "POST",
        body: JSON.stringify(
          modoEdicao
            ? payloadBase
            : {
                id_dono: Number(formData.id_dono),
                ...payloadBase,
              }
        ),
      });

      setFeedback(
        modoEdicao
          ? "Logística atualizada com sucesso."
          : "Logística criada com sucesso."
      );

      fecharModal();

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

    const idLogistica = logistica?.id_logistica;

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
    if (!logistica?.id_logistica || logistica.disponibilidade === novaDisponibilidade) return;

    try {
      limparFeedbacks();
      setStatusAtualizandoId(logistica.id_logistica);

      await apiRequest(`${LOGISTICA_ENDPOINT}/${logistica.id_logistica}`, {
        method: "PUT",
        body: JSON.stringify({
          disponibilidade: novaDisponibilidade,
        }),
      });

      setFeedback("Disponibilidade atualizada com sucesso.");
      await carregarLogisticas();
    } catch (error) {
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

  return (
    <div
      className="container-fluid py-4 px-3 px-lg-4"
      style={{
        background: "#09090b",
        minHeight: "100vh",
      }}
    >
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
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
              color: "#71717a",
              fontSize: ".95rem",
            }}
          >
            Gerenciamento de veículos, destinos e disponibilidade
          </p>
        </div>

        <button
          type="button"
          onClick={abrirCadastro}
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          style={{
            background: "#c0012a",
            border: "1px solid rgba(255,255,255,0.06)",
            color: "#ffffff",
            borderRadius: "14px",
            fontWeight: "600",
          }}
        >
          <i className="bi bi-plus-lg" />
          Nova Logística
        </button>
      </div>

      {(feedback || erroLista) && (
        <div
          className="alert border-0 mb-4"
          style={{
            background: feedback ? "rgba(34,197,94,0.10)" : "rgba(245,6,29,0.10)",
            color: feedback ? "#22c55e" : "#f5061d",
            borderRadius: "18px",
          }}
        >
          {feedback || erroLista}
        </div>
      )}

      <div
        className="p-3 p-lg-4"
        style={{
          background: "#111113",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "28px",
        }}
      >
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
                color: "#71717a",
                fontSize: ".9rem",
              }}
            >
              {paginacao.total} registro(s) encontrado(s)
            </p>
          </div>

          <div className="d-flex flex-column flex-xl-row gap-2 align-items-stretch align-items-xl-center w-100 w-xl-auto">
            <form onSubmit={handlePesquisar} className="d-flex gap-2">
              <div
                className="d-flex align-items-center px-3 flex-grow-1"
                style={{
                  background: "#151518",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "14px",
                  minWidth: "260px",
                  height: "46px",
                }}
              >
                <i
                  className="bi bi-search"
                  style={{
                    color: "#71717a",
                  }}
                />

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
                style={iconButtonStyle}
                title="Pesquisar"
              >
                <i className="bi bi-arrow-right" />
              </button>
            </form>

            <select
              value={filtroVeiculo}
              onChange={handleFiltroVeiculo}
              className="form-select shadow-none"
              style={filterSelectStyle}
            >
              <option value="">Todos os veículos</option>
              {VEICULO_OPTIONS.map((veiculo) => (
                <option key={veiculo.value} value={veiculo.value}>
                  {veiculo.label}
                </option>
              ))}
            </select>

            <select
              value={filtroDisponibilidade}
              onChange={handleFiltroDisponibilidade}
              className="form-select shadow-none"
              style={filterSelectStyle}
            >
              <option value="">Todas as disponibilidades</option>
              {DISPONIBILIDADE_OPTIONS.map((disponibilidade) => (
                <option key={disponibilidade.value} value={disponibilidade.value}>
                  {disponibilidade.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={limparFiltros}
              className="btn px-3"
              style={clearButtonStyle}
            >
              Limpar
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table
            className="table align-middle mb-0"
            style={{
              color: "#ffffff",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <th className="py-3" style={thStyle}>
                  Logística
                </th>
                <th className="py-3" style={thStyle}>
                  Dono
                </th>
                <th className="py-3" style={thStyle}>
                  Veículo
                </th>
                <th className="py-3" style={thStyle}>
                  Destino
                </th>
                <th className="py-3" style={thStyle}>
                  Disponibilidade
                </th>
                <th className="py-3 text-end" style={thStyle}>
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {carregando ? (
                <tr>
                  <td colSpan="6" className="text-center py-5" style={emptyTdStyle}>
                    <div className="spinner-border mb-3" role="status" style={{ color: "#ffb300" }} />
                    <p className="mb-0">Carregando logísticas...</p>
                  </td>
                </tr>
              ) : logisticas.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-5" style={emptyTdStyle}>
                    <i className="bi bi-truck" style={{ fontSize: "2.5rem", color: "#ffb300" }} />
                    <p className="mt-3 mb-0">Nenhuma logística encontrada.</p>
                  </td>
                </tr>
              ) : (
                logisticas.map((logistica) => {
                  const disponibilidade =
                    getOpcao(DISPONIBILIDADE_OPTIONS, logistica.disponibilidade)?.value ||
                    "disponivel";
                  const atualizando = statusAtualizandoId === logistica.id_logistica;

                  return (
                    <tr
                      key={logistica.id_logistica}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <td className="py-3" style={tdStyle}>
                        <div className="d-flex align-items-center">
                          <div
                            className="d-flex justify-content-center align-items-center fw-bold"
                            style={{
                              width: "46px",
                              height: "46px",
                              borderRadius: "14px",
                              background: "rgba(255,136,0,0.12)",
                              border: "1px solid rgba(255,179,0,0.12)",
                              color: "#ffb300",
                              fontSize: ".9rem",
                            }}
                          >
                            {getIniciais(logistica.nome_logistica)}
                          </div>

                          <div className="ms-3">
                            <div
                              className="fw-semibold"
                              style={{
                                color: "#ffffff",
                                fontSize: ".95rem",
                              }}
                            >
                              {logistica.nome_logistica}
                            </div>

                            <div
                              style={{
                                color: "#71717a",
                                fontSize: ".8rem",
                              }}
                            >
                              ID: {logistica.id_logistica}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td style={tdStyle}>
                        <span style={mutedTextStyle}>#{logistica.id_dono}</span>
                      </td>

                      <td style={tdStyle}>
                        <span style={mutedTextStyle}>{formatarVeiculo(logistica.veiculo)}</span>
                      </td>

                      <td style={tdStyle}>
                        <span style={mutedTextStyle}>{logistica.destino || "Sem destino"}</span>
                      </td>

                      <td style={tdStyle}>
                        <select
                          value={disponibilidade}
                          onChange={(event) =>
                            atualizarDisponibilidadeRapida(logistica, event.target.value)
                          }
                          disabled={atualizando || salvando}
                          className="form-select form-select-sm shadow-none"
                          style={{
                            ...statusSelectStyle,
                            ...getStatusStyle(disponibilidade),
                            opacity: atualizando ? 0.65 : 1,
                          }}
                        >
                          {DISPONIBILIDADE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="text-end" style={tdStyle}>
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            type="button"
                            onClick={() => abrirEdicao(logistica)}
                            disabled={salvando}
                            className="btn d-flex align-items-center justify-content-center"
                            style={editButtonStyle}
                            title="Editar logística"
                          >
                            <i className="bi bi-pencil-square" />
                          </button>

                          <button
                            type="button"
                            onClick={() => excluirLogistica(logistica)}
                            disabled={salvando}
                            className="btn d-flex align-items-center justify-content-center"
                            style={deleteButtonStyle}
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

        {!carregando && (
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4">
            <span style={{ color: "#71717a", fontSize: ".9rem" }}>
              Página {paginacao.pagina || pagina} de {totalPaginas}
            </span>

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn px-3"
                disabled={pagina <= 1 || carregando}
                onClick={() => setPagina((paginaAtual) => Math.max(1, paginaAtual - 1))}
                style={{
                  ...paginationBtnStyle,
                  opacity: pagina <= 1 ? 0.45 : 1,
                }}
              >
                Anterior
              </button>

              <button
                type="button"
                className="btn px-3"
                disabled={pagina >= totalPaginas || carregando}
                onClick={() => setPagina((paginaAtual) => Math.min(totalPaginas, paginaAtual + 1))}
                style={{
                  ...paginationBtnStyle,
                  opacity: pagina >= totalPaginas ? 0.45 : 1,
                }}
              >
                Próxima
              </button>
            </div>
          </div>
        )}
      </div>

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
            style={modalContentStyle}
          >
            <div className="border-0 pt-4 px-4 position-relative">
              <div className="w-100 text-center">
                <div
                  className="d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "78px",
                    height: "78px",
                    borderRadius: "22px",
                    background: "rgba(255,179,0,0.08)",
                    border: "1px solid rgba(255,179,0,0.12)",
                  }}
                >
                  <i
                    className={modoEdicao ? "bi bi-pencil-square" : "bi bi-truck"}
                    style={{
                      color: "#ffb300",
                      fontSize: "2rem",
                    }}
                  />
                </div>

                <h2
                  className="fw-bold mb-0"
                  style={{
                    color: "#ffb300",
                    letterSpacing: "-1px",
                  }}
                >
                  {modoEdicao ? "Editar Logística" : "Nova Logística"}
                </h2>
              </div>

              <button
                type="button"
                onClick={fecharModal}
                disabled={salvando}
                className="btn-close btn-close-white position-absolute top-0 end-0 m-4"
                aria-label="Close"
              />
            </div>

            <div className="p-4 p-lg-5">
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

              <div className="row g-4">
                {!modoEdicao && (
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
                      style={inputStyle}
                    />
                  </div>
                )}

                <div className={modoEdicao ? "col-12" : "col-12 col-lg-6"}>
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
                    style={inputStyle}
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
                    style={inputStyle}
                  >
                    {VEICULO_OPTIONS.map((veiculo) => (
                      <option key={veiculo.value} value={veiculo.value}>
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
                    style={inputStyle}
                  >
                    {DISPONIBILIDADE_OPTIONS.map((disponibilidade) => (
                      <option key={disponibilidade.value} value={disponibilidade.value}>
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
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="mt-5 d-flex gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={fecharModal}
                  disabled={salvando}
                  className="btn py-3 fw-semibold"
                  style={cancelButtonStyle}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={salvando}
                  className="btn flex-fill py-3 fw-semibold"
                  style={{
                    background: salvando
                      ? "rgba(255,179,0,0.45)"
                      : "linear-gradient(90deg,#ff8800,#ffb300)",
                    border: "none",
                    color: "#3b0215",
                    borderRadius: "16px",
                    fontSize: "1rem",
                  }}
                >
                  {salvando
                    ? "Salvando..."
                    : modoEdicao
                      ? "Salvar alterações"
                      : "Criar logística"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function getStatusStyle(disponibilidade) {
  if (disponibilidade === "disponivel") {
    return {
      backgroundColor: "rgba(34,197,94,0.10)",
      border: "1px solid rgba(34,197,94,0.15)",
      color: "#22c55e",
    };
  }

  if (disponibilidade === "ocupado") {
    return {
      backgroundColor: "rgba(255,179,0,0.10)",
      border: "1px solid rgba(255,179,0,0.18)",
      color: "#ffb300",
    };
  }

  return {
    backgroundColor: "rgba(245,6,29,0.10)",
    border: "1px solid rgba(245,6,29,0.15)",
    color: "#f5061d",
  };
}

const thStyle = {
  color: "#71717a",
  fontWeight: "500",
  border: "none",
  background: "transparent",
  whiteSpace: "nowrap",
};

const tdStyle = {
  background: "transparent",
  border: "none",
  color: "#d4d4d8",
  verticalAlign: "middle",
};

const emptyTdStyle = {
  background: "transparent",
  border: "none",
  color: "#71717a",
};

const mutedTextStyle = {
  color: "#d4d4d8",
  fontSize: ".9rem",
};

const filterSelectStyle = {
  backgroundColor: "#151518",
  border: "1px solid rgba(255,255,255,0.06)",
  color: "#ffffff",
  borderRadius: "14px",
  height: "46px",
  minWidth: "190px",
};

const iconButtonStyle = {
  background: "#151518",
  border: "1px solid rgba(255,179,0,0.16)",
  color: "#ffb300",
  borderRadius: "14px",
  minWidth: "46px",
};

const clearButtonStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.06)",
  color: "#d4d4d8",
  borderRadius: "14px",
  height: "46px",
};

const editButtonStyle = {
  width: "42px",
  height: "42px",
  borderRadius: "12px",
  background: "#151518",
  border: "1px solid rgba(255,255,255,0.06)",
  color: "#ffb300",
};

const deleteButtonStyle = {
  width: "42px",
  height: "42px",
  borderRadius: "12px",
  background: "rgba(245,6,29,0.10)",
  border: "1px solid rgba(245,6,29,0.15)",
  color: "#f5061d",
};

const statusSelectStyle = {
  width: "170px",
  borderRadius: "12px",
  fontSize: ".8rem",
  fontWeight: "600",
};

const paginationBtnStyle = {
  background: "#151518",
  border: "1px solid rgba(255,255,255,0.06)",
  color: "#ffb300",
  borderRadius: "12px",
};

const modalBackdropStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 9999,
  background: "rgba(0,0,0,.78)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  padding: "24px",
  overflowY: "auto",
};

const modalContentStyle = {
  background:
    "linear-gradient(135deg, #940533 0%, #7d042b 35%, #5f0321 70%, #3b0215 100%)",
  borderRadius: "28px",
  width: "100%",
  maxWidth: "960px",
};

const labelStyle = {
  color: "#f3f4f6",
  fontSize: ".92rem",
};

const inputStyle = {
  backgroundColor: "rgba(0,0,0,0.18)",
  border: "1px solid rgba(245,6,29,0.35)",
  color: "#ffffff",
  minHeight: "56px",
  borderRadius: "16px",
};

const cancelButtonStyle = {
  width: "35%",
  minWidth: "160px",
  background: "rgba(255,255,255,.08)",
  border: "1px solid rgba(255,255,255,.12)",
  color: "#ffffff",
  borderRadius: "16px",
  fontSize: "1rem",
};
