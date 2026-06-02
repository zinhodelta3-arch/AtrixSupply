"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LogisticaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState("entregas"); // 'entregas' ou 'orcamentos'
  const [busca, setBusca] = useState("");

  // Estados dos dados vindos do Backend
  const [entregas, setEntregas] = useState([]);
  const [orcamentos, setOrcamentos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // Validação de autenticação idêntica ao do seu Header
    try {
      const usuarioStorage = localStorage.getItem("usuario");
      if (usuarioStorage) {
        const userParsed = JSON.parse(usuarioStorage);
        setUsuario(userParsed);
        
        // Carrega os dados do backend passando o usuário validado
        carregarDados(userParsed.id || 1);
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Erro ao carregar sessão na logística:", error);
      router.push("/login");
    }
  }, []);

  // Integração com a API do Backend
  const carregarDados = async (userId) => {
    try {
      // Faz as requisições em paralelo para otimizar o carregamento
      const [resLogistica, resOrcamentos] = await Promise.all([
        fetch(`/api/logistica?userId=${userId}`),
        fetch(`/api/orcamentos?userId=${userId}`)
      ]);

      if (!resLogistica.ok || !resOrcamentos.ok) {
        throw new Error("Falha ao sincronizar dados com o servidor de suprimentos.");
      }

      const dadosLogistica = await resLogistica.json();
      const dadosOrcamentos = await resOrcamentos.json();

      setEntregas(dadosLogistica);
      setOrcamentos(dadosOrcamentos);
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filtros de busca em tempo real
  const entregasFiltradas = entregas.filter(item => 
    item.item.toLowerCase().includes(busca.toLowerCase()) ||
    item.codigoRastreio.toLowerCase().includes(busca.toLowerCase())
  );

  const orcamentosFiltrados = orcamentos.filter(orc => 
    orc.destino.toLowerCase().includes(busca.toLowerCase()) ||
    orc.id.toString().includes(busca)
  );

  // Cálculos rápidos para os Cards de KPI
  const totalEmTransito = entregas.filter(e => e.status === "Em Trânsito").length;
  const orcamentosPendentes = orcamentos.filter(o => o.status === "Em Análise").length;

  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="spinner-border text-light" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Carregando painel Atrix...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5 text-white animate-fade-in">
      
      {/* HEADER DO PAINEL */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-5 border-bottom pb-4 border-secondary border-opacity-25">
        <div>
          <span className="text-uppercase tracking-label text-muted small fw-bold">Atrix Supply Chain</span>
          <h1 className="fw-black m-0 mt-1" style={{ fontSize: "2.5rem", letterSpacing: "-1px" }}>
            Painel de Logística & Distribuição
          </h1>
          <p className="text-muted m-0 mt-2">
            Bem-vindo, <strong className="text-white">{usuario?.nome_user}</strong>. Gerencie o fluxo de transporte e cotações de frete corporativo.
          </p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-light d-flex align-items-center gap-2 px-3" onClick={() => carregarDados(usuario?.id || 1)}>
            <i className="bi bi-arrow-clockwise"></i> Atualizar Dados
          </button>
        </div>
      </div>

      {erro && (
        <div className="alert alert-danger bg-danger bg-opacity-10 text-danger border-danger border-opacity-25 mb-4" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i> {erro}
        </div>
      )}

      {/* CARDS DE RESUMO OPERACIONAL (KPIs) */}
      <div className="row g-4 mb-5">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card bg-dark text-white border-secondary border-opacity-25 p-3 h-100 shadow-sm dashboard-kpi-card">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small fw-bold text-uppercase">Entregas Ativas</span>
              <i className="bi bi-truck fs-4 text-info"></i>
            </div>
            <h2 className="fw-bold m-0">{entregas.filter(e => e.status !== "Entregue").length}</h2>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card bg-dark text-white border-secondary border-opacity-25 p-3 h-100 shadow-sm dashboard-kpi-card">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small fw-bold text-uppercase">Em Trânsito</span>
              <i className="bi bi-cone-striped fs-4 text-warning"></i>
            </div>
            <h2 className="fw-bold text-warning m-0">{totalEmTransito}</h2>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card bg-dark text-white border-secondary border-opacity-25 p-3 h-100 shadow-sm dashboard-kpi-card">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small fw-bold text-uppercase">Orçamentos Ativos</span>
              <i className="bi bi-calculator fs-4 text-purple" style={{ color: "#b967ff" }}></i>
            </div>
            <h2 className="fw-bold m-0">{orcamentos.length}</h2>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card bg-dark text-white border-secondary border-opacity-25 p-3 h-100 shadow-sm dashboard-kpi-card">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small fw-bold text-uppercase">Aguardando Aprovação</span>
              <i className="bi bi-hourglass-split fs-4 text-danger"></i>
            </div>
            <h2 className="fw-bold text-danger m-0">{orcamentosPendentes}</h2>
          </div>
        </div>
      </div>

      {/* FILTROS E ABAS */}
      <div className="row g-3 align-items-center justify-content-between mb-4 bg-dark bg-opacity-50 p-3 rounded border border-secondary border-opacity-25 mx-1">
        <div className="col-12 col-md-auto">
          <div className="nav nav-pills gap-2" role="tablist">
            <button 
              className={`btn px-4 py-2 fw-bold tracking-wide transition-all ${abaAtiva === "entregas" ? "btn-light text-black shadow" : "btn-outline-secondary text-white border-0"}`}
              onClick={() => { setAbaAtiva("entregas"); setBusca(""); }}
            >
              <i className="bi bi-geo-alt-fill me-2"></i> Rastreamento de Carga
            </button>
            <button 
              className={`btn px-4 py-2 fw-bold tracking-wide transition-all ${abaAtiva === "orcamentos" ? "btn-light text-black shadow" : "btn-outline-secondary text-white border-0"}`}
              onClick={() => { setAbaAtiva("orcamentos"); setBusca(""); }}
            >
              <i className="bi bi-file-earmark-text-fill me-2"></i> Orçamentos de Frete
            </button>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="input-group">
            <span className="input-group-text bg-black border-secondary border-opacity-50 text-muted">
              <i className="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              className="form-control bg-black text-white border-secondary border-opacity-50 shadow-none focus-border-white"
              placeholder={abaAtiva === "entregas" ? "Buscar por item ou rastreio..." : "Buscar por destino..."}
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* CONTEÚDO DAS ABAS */}
      <div className="tab-content">
        
        {/* ABA: RASTREAMENTO DE ENTREGAS */}
        {abaAtiva === "entregas" && (
          <div className="row g-4">
            {entregasFiltradas.length === 0 ? (
              <div className="col-12 text-center p-5 rounded border border-secondary border-opacity-25 bg-dark bg-opacity-20">
                <i className="bi bi-box-seam fs-1 text-muted mb-3 d-block"></i>
                <p className="text-muted m-0">Nenhum registro de transporte localizado para esta pesquisa.</p>
              </div>
            ) : (
              entregasFiltradas.map((entrega) => (
                <div key={entrega.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 bg-dark text-white border-secondary border-opacity-25 shadow-sm hover-card-premium">
                    <div className="card-header bg-black bg-opacity-40 border-secondary border-opacity-25 d-flex justify-content-between align-items-center py-3">
                      <span className="small text-uppercase fw-bold text-muted tracking-label">Pedido #{entrega.pedidoId}</span>
                      <span className={`badge px-2.5 py-1.5 rounded-pill font-monospace small ${
                        entrega.status === "Entregue" ? "bg-success bg-opacity-15 text-success border border-success border-opacity-25" : 
                        entrega.status === "Em Trânsito" ? "bg-warning bg-opacity-15 text-warning border border-warning border-opacity-25" : 
                        "bg-info bg-opacity-15 text-info border border-info border-opacity-25"
                      }`}>
                        {entrega.status}
                      </span>
                    </div>
                    <div className="card-body d-flex flex-column justify-content-between p-4">
                      <div>
                        <h5 className="card-title fw-bold text-truncate mb-3" title={entrega.item}>{entrega.item}</h5>
                        
                        <div className="mb-3">
                          <span className="text-muted small d-block">Destino Operacional</span>
                          <span className="text-white-50 small fw-semibold">{entrega.destino}</span>
                        </div>

                        <div className="mb-3">
                          <span className="text-muted small d-block">Janela Estimada de Entrega</span>
                          <span className="text-white-50 small fw-semibold"><i className="bi bi-calendar3 me-1"></i> {entrega.previsaoEntrega}</span>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-black bg-opacity-60 rounded border border-secondary border-opacity-25 d-flex justify-content-between align-items-center">
                        <div>
                          <span className="text-muted d-block font-monospace" style={{ fontSize: "9px", letterSpacing: "1px" }}>TRACKING ID</span>
                          <code className="text-info fw-bold font-monospace" style={{ fontSize: "13px" }}>{entrega.codigoRastreio}</code>
                        </div>
                        <button 
                          className="btn btn-sm btn-light px-3 fw-bold"
                          onClick={() => alert(`Conectando ao mapa da transportadora para o código: ${entrega.codigoRastreio}`)}
                        >
                          <i className="bi bi-geo-alt-fill"></i> Rastrear
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ABA: ORÇAMENTOS DE FRETE */}
        {abaAtiva === "orcamentos" && (
          <div className="card bg-dark border-secondary border-opacity-25 shadow-sm overflow-hidden">
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle mb-0 text-white border-secondary border-opacity-25">
                <thead className="table-light text-black">
                  <tr className="font-monospace small text-uppercase fw-bold tracking-label">
                    <th className="py-3 ps-4">Ref. Cotar</th>
                    <th className="py-3">Rota / Destino</th>
                    <th className="py-3">Modalidade</th>
                    <th className="py-3">Cubagem / Peso</th>
                    <th className="py-3">Custo Estimado</th>
                    <th className="py-3">Status</th>
                    <th className="py-3 pe-4 text-end">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {orcamentosFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center p-5 text-muted">
                        <i className="bi bi-calculator fs-2 mb-2 d-block"></i>
                        Nenhuma requisição de orçamento de logística aberta.
                      </td>
                    </tr>
                  ) : (
                    orcamentosFiltrados.map((orc) => (
                      <tr key={orc.id}>
                        <td className="ps-4 fw-bold font-monospace text-muted">#{orc.id}</td>
                        <td>
                          <div className="fw-semibold">{orc.destino}</div>
                          <span className="text-muted small">Solicitado em: {orc.dataSolicitacao}</span>
                        </td>
                        <td>
                          <span className="badge bg-secondary bg-opacity-25 text-white-50 border border-secondary border-opacity-25">{orc.modal}</span>
                        </td>
                        <td className="font-monospace text-white-50">{orc.pesoVolume}</td>
                        <td className="fw-bold text-success">
                          {orc.valor ? orc.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : "Calculando..."}
                        </td>
                        <td>
                          <span className={`badge ${
                            orc.status === "Aprovado" ? "bg-success" : 
                            orc.status === "Em Análise" ? "bg-warning text-dark" : "bg-danger"
                          }`}>
                            {orc.status}
                          </span>
                        </td>
                        <td className="pe-4 text-end">
                          {orc.status === "Em Análise" ? (
                            <button className="btn btn-sm btn-outline-info px-3 fw-bold" onClick={() => alert("Aguardando retorno da transportadora homologada.")}>
                              Cobrar Retorno
                            </button>
                          ) : (
                            <button className="btn btn-sm btn-premium-checkout font-monospace py-1 px-3 fs-7" disabled={orc.status === "Aprovado"}>
                              {orc.status === "Aprovado" ? "Contratado" : "Revisar"}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
} 