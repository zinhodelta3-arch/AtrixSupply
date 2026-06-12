"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "motion/react";
import AlertCard from "@/components/AlertCard";
import "../algo.css";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");

const LIMITE_USUARIOS = 10;

const formInicial = {
  nome_user: "",
  email: "",
  cnpj: "",
  empresa: "",
  cargo: "",
  cep: "",
  endereco: "",
  senha: "",
  confirmarSenha: "",
  tipo: "",
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

const innerSurfaceGradient = `
  linear-gradient(
    145deg,
    rgba(255,255,255,.035),
    rgba(255,255,255,.015)
  )
`;

const cardStyle = {
  background: surfaceGradient,
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "28px",
  boxShadow: "none",
};

const innerCardStyle = {
  background: innerSurfaceGradient,
  border: "1px solid rgba(255,255,255,.06)",
  borderRadius: "20px",
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

const buttonGradient = {
  background: "linear-gradient(90deg,#940533,#c0012a,#ff8800)",
  color: "white",
  border: "none",
  borderRadius: "16px",
  fontWeight: "800",
  boxShadow: "none",
};

const inputStyle = {
  background: "rgba(255,255,255,.04)",
  border: "1px solid rgba(255,255,255,.08)",
  color: "#ffffff",
  height: "54px",
  borderRadius: "16px",
  boxShadow: "none",
};

const selectStyle = {
  ...inputStyle,
  cursor: "pointer",
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

const paginationBtnStyle = {
  background: "rgba(255,255,255,.04)",
  border: "1px solid rgba(255,255,255,.08)",
  color: "#ffcf40",
  borderRadius: "14px",
  fontWeight: "800",
  boxShadow: "none",
};


const pageMotionProps = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.42, ease: "easeOut" },
};

function getSequencedMotion(index = 0, deslocamento = 14) {
  const delay = Math.min(Number(index) || 0, 14) * 0.045;

  return {
    initial: { opacity: 0, y: deslocamento },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.32, ease: "easeOut", delay },
  };
}


function obterIniciais(nome) {
  if (!nome) return "US";

  return nome
    .split(" ")
    .filter(Boolean)
    .map((parte) => parte[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function manterApenasNumeros(valor) {
  return String(valor || "").replace(/\D/g, "");
}

function formatarCNPJInput(valor) {
  const numeros = manterApenasNumeros(valor).slice(0, 14);

  return numeros
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function formatarCEPInput(valor) {
  const numeros = manterApenasNumeros(valor).slice(0, 8);

  return numeros.replace(/^(\d{5})(\d)/, "$1-$2");
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

function resolverUrlImagemUsuario(usuario) {
  const valorOriginal = String(obterFotoBrutaUsuario(usuario) || "")
    .trim()
    .replace(/\\/g, "/");

  if (!valorOriginal) return "";

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

function normalizarTipo(tipo) {
  return String(tipo || "comum").trim().toLowerCase();
}

function formatarTipo(tipo) {
  const tipoNormalizado = normalizarTipo(tipo);

  switch (tipoNormalizado) {
    case "fornecedor":
      return "Fornecedor";
    case "administrador":
    case "admin":
      return "Administrador";
    case "comum":
      return "Comum";
    default:
      return tipoNormalizado || "Comum";
  }
}

function getTipoBadgeStyle(tipo) {
  const tipoNormalizado = normalizarTipo(tipo);

  if (tipoNormalizado === "fornecedor") {
    return {
      background: "rgba(92,255,149,.10)",
      border: "1px solid rgba(92,255,149,.22)",
      color: "#5cff95",
    };
  }

  if (tipoNormalizado === "administrador" || tipoNormalizado === "admin") {
    return {
      background: "rgba(138,180,255,.10)",
      border: "1px solid rgba(138,180,255,.22)",
      color: "#8ab4ff",
    };
  }

  return {
    background: "rgba(255,207,64,.10)",
    border: "1px solid rgba(255,207,64,.22)",
    color: "#ffcf40",
  };
}

function formatarDocumento(valor) {
  const limpo = manterApenasNumeros(valor);

  if (limpo.length !== 14) {
    return valor || "Não informado";
  }

  return limpo.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erroLista, setErroLista] = useState(null);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [paginacao, setPaginacao] = useState({
    pagina: 1,
    limite: LIMITE_USUARIOS,
    total: 0,
    totalPaginas: 1,
  });

  const [formData, setFormData] = useState(formInicial);
  const [formErro, setFormErro] = useState(null);
  const [formSucesso, setFormSucesso] = useState(null);

  const [modalCriarAberto, setModalCriarAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [processandoForm, setProcessandoForm] = useState(false);

  const [cardHoverAtivo, setCardHoverAtivo] = useState(null);

  useEffect(() => {
    carregarUsuarios(1);
  }, []);

  const obterTokenAdmin = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }

    return null;
  };

  const lerJsonComSeguranca = async (res) => {
    try {
      return await res.json();
    } catch {
      return {};
    }
  };

  const carregarUsuarios = async (pagina = 1) => {
    setCarregando(true);
    setErroLista(null);

    const token = obterTokenAdmin();

    try {
      const res = await fetch(
        `${API_URL}/api/usuarios?pagina=${pagina}&limite=${LIMITE_USUARIOS}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await lerJsonComSeguranca(res);

      if (res.ok) {
        const listaUsuarios = Array.isArray(data.dados)
          ? data.dados
          : Array.isArray(data.usuarios)
          ? data.usuarios
          : [];

        const paginaApi = Number(data.paginacao?.pagina || data.pagina || pagina);
        const limiteApi = Number(
          data.paginacao?.limite || data.limite || LIMITE_USUARIOS
        );
        const totalApi = Number(
          data.paginacao?.total || data.total || listaUsuarios.length
        );
        const totalPaginasApi = Number(
          data.paginacao?.totalPaginas ||
            data.totalPaginas ||
            Math.max(1, Math.ceil(totalApi / limiteApi))
        );

        setUsuarios(listaUsuarios);

        setPaginacao({
          pagina: paginaApi,
          limite: limiteApi,
          total: totalApi,
          totalPaginas: totalPaginasApi,
        });

        setPaginaAtual(paginaApi);
      } else {
        setErroLista(data.mensagem || data.erro || "Erro ao carregar usuários.");
        setUsuarios([]);
      }
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      setErroLista("Erro de conexão com o servidor.");
      setUsuarios([]);
    } finally {
      setCarregando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let valorFormatado = value;

    if (name === "cnpj") {
      valorFormatado = formatarCNPJInput(value);
    }

    if (name === "cep") {
      valorFormatado = formatarCEPInput(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: valorFormatado,
    }));
  };

  const limparFormulario = () => {
    setFormData(formInicial);
  };

  const limparMensagens = () => {
    setFormErro(null);
    setFormSucesso(null);
  };

  const abrirModalCriar = () => {
    limparFormulario();
    limparMensagens();
    setUsuarioEditando(null);
    setModalCriarAberto(true);
  };

  const abrirModalEditar = (user) => {
    limparMensagens();
    setUsuarioEditando(user);

    setFormData({
      nome_user: user.nome_user || "",
      email: user.email || "",
      cnpj: formatarCNPJInput(user.cnpj || ""),
      empresa: user.empresa || "",
      cargo: user.cargo || "",
      cep: formatarCEPInput(user.cep || ""),
      endereco: user.endereco || "",
      senha: "",
      confirmarSenha: "",
      tipo: user.tipo || "",
    });

    setModalEditarAberto(true);
  };

  const fecharModais = () => {
    setModalCriarAberto(false);
    setModalEditarAberto(false);
    setUsuarioEditando(null);
    setProcessandoForm(false);
    limparFormulario();
    limparMensagens();
  };

  const validarCriacao = () => {
    if (!formData.nome_user.trim()) return "O nome é obrigatório.";
    if (!formData.email.trim()) return "O email é obrigatório.";
    if (!formData.email.includes("@")) return "Digite um email válido.";
    if (!formData.empresa.trim()) return "A empresa é obrigatória.";
    if (!formData.cargo.trim()) return "O cargo é obrigatório.";
    if (!formData.cep.trim()) return "O CEP é obrigatório.";
    if (!formData.endereco.trim()) return "O endereço é obrigatório.";
    if (!formData.tipo.trim()) return "Selecione o tipo do usuário.";

    const cnpjLimpo = manterApenasNumeros(formData.cnpj);
    const cepLimpo = manterApenasNumeros(formData.cep);

    if (cnpjLimpo.length !== 14) {
      return "O CNPJ deve conter exatamente 14 números.";
    }

    if (cepLimpo.length !== 8) {
      return "O CEP deve conter exatamente 8 números.";
    }

    if (!formData.senha.trim()) return "A senha é obrigatória.";

    if (formData.senha !== formData.confirmarSenha) {
      return "As senhas não coincidem.";
    }

    return null;
  };

  const validarEdicao = () => {
    if (!formData.nome_user.trim()) return "O nome é obrigatório.";
    if (!formData.email.trim()) return "O email é obrigatório.";
    if (!formData.email.includes("@")) return "Digite um email válido.";
    if (!formData.empresa.trim()) return "A empresa é obrigatória.";
    if (!formData.cargo.trim()) return "O cargo é obrigatório.";
    if (!formData.cep.trim()) return "O CEP é obrigatório.";
    if (!formData.endereco.trim()) return "O endereço é obrigatório.";
    if (!formData.tipo.trim()) return "Selecione o tipo do usuário.";

    const cnpjLimpo = manterApenasNumeros(formData.cnpj);
    const cepLimpo = manterApenasNumeros(formData.cep);

    if (cnpjLimpo.length !== 14) {
      return "O CNPJ deve conter exatamente 14 números.";
    }

    if (cepLimpo.length !== 8) {
      return "O CEP deve conter exatamente 8 números.";
    }

    return null;
  };

  const handleCriarUsuario = async (e) => {
    e.preventDefault();

    setFormErro(null);
    setFormSucesso(null);

    const token = obterTokenAdmin();

    if (!token) {
      setFormErro("Token não encontrado. Faça login novamente.");
      return;
    }

    const erroValidacao = validarCriacao();

    if (erroValidacao) {
      setFormErro(erroValidacao);
      return;
    }

    const cnpjLimpo = manterApenasNumeros(formData.cnpj);
    const cepLimpo = manterApenasNumeros(formData.cep);

    setProcessandoForm(true);

    try {
      const res = await fetch(`${API_URL}/api/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome_user: formData.nome_user.trim(),
          email: formData.email.trim(),
          cnpj: cnpjLimpo,
          empresa: formData.empresa.trim(),
          cargo: formData.cargo.trim(),
          cep: cepLimpo,
          endereco: formData.endereco.trim(),
          senha: formData.senha,
          tipo: formData.tipo,
        }),
      });

      const data = await lerJsonComSeguranca(res);

      if (res.ok && data?.sucesso !== false) {
        setFormSucesso(data.mensagem || "Usuário criado com sucesso!");
        await carregarUsuarios(1);

        setTimeout(() => {
          fecharModais();
        }, 900);

        return;
      }

      setFormErro(
        data.mensagem ||
          data.erro ||
          data.detalhes?.map((erro) => erro.mensagem).join(", ") ||
          "Erro ao cadastrar usuário."
      );
    } catch (error) {
      console.error("Erro na requisição de cadastro:", error);
      setFormErro("Erro de conexão com o servidor.");
    } finally {
      setProcessandoForm(false);
    }
  };

  const handleEditarUsuario = async (e) => {
    e.preventDefault();

    if (!usuarioEditando) {
      setFormErro("Nenhum usuário selecionado para edição.");
      return;
    }

    setFormErro(null);
    setFormSucesso(null);

    const erroValidacao = validarEdicao();

    if (erroValidacao) {
      setFormErro(erroValidacao);
      return;
    }

    const token = obterTokenAdmin();
    const cnpjLimpo = manterApenasNumeros(formData.cnpj);
    const cepLimpo = manterApenasNumeros(formData.cep);

    setProcessandoForm(true);

    try {
      const res = await fetch(`${API_URL}/api/usuarios/admin/${usuarioEditando.id_user}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome_user: formData.nome_user.trim(),
          email: formData.email.trim(),
          cnpj: cnpjLimpo,
          empresa: formData.empresa.trim(),
          cargo: formData.cargo.trim(),
          cep: cepLimpo,
          endereco: formData.endereco.trim(),
          tipo: formData.tipo,
        }),
      });

      const data = await lerJsonComSeguranca(res);

      if (res.ok && data?.sucesso !== false) {
        setFormSucesso(data.mensagem || "Usuário atualizado com sucesso!");
        await carregarUsuarios(paginaAtual);

        setTimeout(() => {
          fecharModais();
        }, 900);
      } else {
        setFormErro(data.mensagem || data.erro || "Erro ao atualizar usuário.");
      }
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
      setFormErro("Erro de conexão com o servidor.");
    } finally {
      setProcessandoForm(false);
    }
  };

  const handleDelete = async (id_user) => {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;

    const token = obterTokenAdmin();

    try {
      const res = await fetch(`${API_URL}/api/usuarios/admin/${id_user}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await lerJsonComSeguranca(res);

      if (res.ok) {
        const proximaPagina =
          usuarios.length === 1 && paginaAtual > 1 ? paginaAtual - 1 : paginaAtual;

        await carregarUsuarios(proximaPagina);
      } else {
        alert(data.mensagem || data.erro || "Erro ao excluir usuário.");
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
      alert("Erro de conexão com o servidor.");
    }
  };

  const usuariosFiltrados = usuarios.filter((user) => {
    const nome = user.nome_user || "";
    const email = user.email || "";
    const empresa = user.empresa || "";
    const cargo = user.cargo || "";

    const termo = pesquisa.toLowerCase();

    return (
      nome.toLowerCase().includes(termo) ||
      email.toLowerCase().includes(termo) ||
      empresa.toLowerCase().includes(termo) ||
      cargo.toLowerCase().includes(termo)
    );
  });

  const metricas = useMemo(() => {
    const fornecedores = usuarios.filter(
      (user) => normalizarTipo(user.tipo) === "fornecedor"
    ).length;

    const comuns = usuarios.filter(
      (user) => normalizarTipo(user.tipo) === "comum"
    ).length;

    const administradores = usuarios.filter((user) => {
      const tipo = normalizarTipo(user.tipo);

      return tipo === "administrador" || tipo === "admin";
    }).length;

    return {
      totalPagina: usuarios.length,
      totalSistema: paginacao.total,
      fornecedores,
      comuns,
      administradores,
    };
  }, [usuarios, paginacao.total]);

  const renderFormularioUsuario = ({ modo }) => {
    const editando = modo === "editar";

    const camposPrincipais = [
      {
        name: "nome_user",
        label: "Nome",
        placeholder: "Nome completo",
      },
      {
        name: "email",
        label: "Email empresarial",
        placeholder: "email@empresa.com",
        type: "email",
      },
      {
        name: "cnpj",
        label: "CNPJ",
        placeholder: "00.000.000/0000-00",
        inputMode: "numeric",
        maxLength: 18,
        autoComplete: "off",
      },
      {
        name: "empresa",
        label: "Empresa",
        placeholder: "Nome da empresa",
      },
      {
        name: "cargo",
        label: "Cargo",
        placeholder: "Cargo do usuário",
      },
      {
        name: "cep",
        label: "CEP",
        placeholder: "00000-000",
        inputMode: "numeric",
        maxLength: 9,
        autoComplete: "postal-code",
      },
      {
        name: "endereco",
        label: "Endereço",
        placeholder: "Rua, número, bairro",
      },
    ];

    return (
      <form
        onSubmit={editando ? handleEditarUsuario : handleCriarUsuario}
        className="border-0 overflow-hidden"
        style={{
          background: surfaceGradient,
          border: "1px solid rgba(255,255,255,.10)",
          borderRadius: "30px",
          width: "100%",
          maxWidth: "1120px",
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
                className={editando ? "bi bi-pencil-square" : "bi bi-person-plus-fill"}
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
                {editando ? "Editar Usuário" : "Novo Usuário"}
              </h2>

              <p
                className="mb-0"
                style={{
                  color: "rgba(255,255,255,.58)",
                }}
              >
                {editando
                  ? "Atualize os dados do usuário selecionado."
                  : "Cadastre um novo usuário na plataforma."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={fecharModais}
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
            <AlertCard
              variant="danger"
              title="Erro"
              message={formErro}
              className="mb-4"
            />
          )}

          {formSucesso && (
            <AlertCard
              variant="success"
              title="Sucesso"
              message={formSucesso}
              className="mb-4"
            />
          )}

          <div className="row g-3">
            {camposPrincipais.map((field) => (
              <div key={field.name} className="col-12 col-lg-6">
                <label
                  className="form-label mb-2"
                  style={{
                    color: "rgba(255,255,255,.72)",
                    fontSize: ".9rem",
                    fontWeight: "700",
                  }}
                >
                  {field.label}
                </label>

                <input
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  type={field.type || "text"}
                  inputMode={field.inputMode}
                  maxLength={field.maxLength}
                  autoComplete={field.autoComplete}
                  className="form-control"
                  placeholder={field.placeholder}
                  required
                  style={inputStyle}
                />
              </div>
            ))}

            {!editando && (
              <>
                <div className="col-12 col-lg-6">
                  <label
                    className="form-label mb-2"
                    style={{
                      color: "rgba(255,255,255,.72)",
                      fontSize: ".9rem",
                      fontWeight: "700",
                    }}
                  >
                    Senha
                  </label>

                  <input
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    type="password"
                    className="form-control"
                    placeholder="Crie uma senha"
                    required
                    style={inputStyle}
                  />
                </div>

                <div className="col-12 col-lg-6">
                  <label
                    className="form-label mb-2"
                    style={{
                      color: "rgba(255,255,255,.72)",
                      fontSize: ".9rem",
                      fontWeight: "700",
                    }}
                  >
                    Confirmar senha
                  </label>

                  <input
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    type="password"
                    className="form-control"
                    placeholder="Confirme sua senha"
                    required
                    style={inputStyle}
                  />
                </div>
              </>
            )}

            <div className="col-12 col-lg-6">
              <label
                className="form-label mb-2"
                style={{
                  color: "rgba(255,255,255,.72)",
                  fontSize: ".9rem",
                  fontWeight: "700",
                }}
              >
                Tipo
              </label>

              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="form-select"
                required
                style={selectStyle}
              >
                <option value="" disabled style={{ background: "#151518", color: "#fff" }}>
                  Selecione o tipo
                </option>

                <option value="comum" style={{ background: "#151518", color: "#fff" }}>
                  Comum (Cliente)
                </option>

                <option value="fornecedor" style={{ background: "#151518", color: "#fff" }}>
                  Fornecedor
                </option>
              </select>
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
            onClick={fecharModais}
            className="btn btn-outline-light"
            disabled={processandoForm}
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
            disabled={processandoForm}
            className="btn"
            style={{
              ...buttonGradient,
              padding: "12px 24px",
              minWidth: "190px",
              opacity: processandoForm ? 0.7 : 1,
              cursor: processandoForm ? "not-allowed" : "pointer",
            }}
          >
            {processandoForm ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                {editando ? "Salvando..." : "Criando..."}
              </>
            ) : editando ? (
              "Salvar alterações"
            ) : (
              "Criar usuário"
            )}
          </button>
        </div>
      </form>
    );
  };

  return (
    <motion.main {...pageMotionProps}
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
            Administração
          </span>

          <h1
            className="fw-bold mb-1"
            style={{
              color: "#ffb300",
              fontSize: "2rem",
              letterSpacing: "-1px",
            }}
          >
            Usuários
          </h1>

          <p
            className="mb-0"
            style={{
              color: "rgba(255,255,255,.58)",
              fontSize: ".95rem",
            }}
          >
            Gerenciamento de usuários, clientes e fornecedores da plataforma.
          </p>
        </div>

        <button
          type="button"
          onClick={abrirModalCriar}
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          style={buttonGradient}
        >
          <i className="bi bi-plus-lg"></i>
          Novo Usuário
        </button>
      </div>

      <div className="row g-4 mb-4">
        {[
          {
            titulo: "Total no sistema",
            valor: metricas.totalSistema,
            detalhe: "Registros cadastrados",
            icon: "bi-people-fill",
            cor: "#ffcf40",
          },
          {
            titulo: "Nesta página",
            valor: metricas.totalPagina,
            detalhe: "Usuários carregados",
            icon: "bi-list-check",
            cor: "#ff8800",
          },
          {
            titulo: "Clientes",
            valor: metricas.comuns,
            detalhe: "Usuários comuns nesta página",
            icon: "bi-person-check-fill",
            cor: "#8ab4ff",
          },
          {
            titulo: "Fornecedores",
            valor: metricas.fornecedores,
            detalhe: "Fornecedores nesta página",
            icon: "bi-building-check",
            cor: "#5cff95",
          },
        ].map((card, index) => {
          const ativo = cardHoverAtivo === card.titulo;

          return (
            <motion.div className="col-12 col-md-6 col-xl-3" key={card.titulo} {...getSequencedMotion(index, 16)}>
              <div
                className="p-4 h-100"
                style={metricCardStyle(card.cor, ativo)}
                onMouseEnter={() => setCardHoverAtivo(card.titulo)}
                onMouseLeave={() => setCardHoverAtivo(null)}
              >
                <div className="d-flex justify-content-between align-items-start gap-3">
                  <div>
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
                      }}
                    >
                      {Number(card.valor || 0).toLocaleString("pt-BR")}
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
            </motion.div>
          );
        })}
      </div>

      <motion.section className="p-3 p-lg-4" style={cardStyle}>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <h4
              className="fw-bold mb-1"
              style={{
                color: "#ffffff",
                letterSpacing: "-0.5px",
              }}
            >
              Lista de Usuários
            </h4>

            <p
              className="mb-0"
              style={{
                color: "rgba(255,255,255,.55)",
                fontSize: ".9rem",
              }}
            >
              {paginacao.total} usuário(s) cadastrado(s)
            </p>
          </div>

          <div
            className="d-flex align-items-center px-3"
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: "16px",
              minWidth: "280px",
              height: "48px",
            }}
          >
            <i className="bi bi-search" style={{ color: "#ffcf40" }} />

            <input
              type="text"
              placeholder="Pesquisar por nome, email, empresa..."
              className="form-control border-0 shadow-none"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              style={{
                background: "transparent",
                color: "#ffffff",
                fontSize: ".92rem",
              }}
            />
          </div>
        </div>

        {erroLista && (
          <AlertCard
            variant="danger"
            title="Erro"
            message={erroLista}
            className="mb-4"
          />
        )}

        <div className="table-responsive" style={dashboardTableWrapperStyle}>
          <table
            className="table table-hover align-middle"
            style={dashboardTableStyle}
          >
            <thead>
              <motion.tr>
                <th style={dashboardTableHeadCellStyle}>Usuário</th>
                <th style={dashboardTableHeadCellStyle}>Empresa</th>
                <th style={dashboardTableHeadCellStyle}>Cargo</th>
                <th style={dashboardTableHeadCellStyle}>Tipo</th>
                <th style={dashboardTableHeadCellStyle}>CNPJ</th>
                <th style={{ ...dashboardTableHeadCellStyle, textAlign: "right" }}>
                  Ações
                </th>
              </motion.tr>
            </thead>

            <tbody>
              {carregando ? (
                <motion.tr>
                  <td
                    colSpan="6"
                    className="text-center"
                    style={{
                      ...dashboardTableCellStyle,
                      padding: "34px 18px",
                      color: "rgba(255,255,255,.65)",
                    }}
                  >
                    <AlertCard
                      variant="neutral"
                      icon={<span className="spinner-border spinner-border-sm" aria-hidden="true" />}
                      title="Carregando usuários..."
                      centered
                      style={{ boxShadow: "none" }}
                    />
                  </td>
                </motion.tr>
              ) : usuariosFiltrados.length === 0 ? (
                <motion.tr>
                  <td
                    colSpan="6"
                    className="text-center"
                    style={{
                      ...dashboardTableCellStyle,
                      padding: "42px 18px",
                    }}
                  >
                    <AlertCard
                      variant="empty"
                      icon="bi-person-x"
                      title="Nenhum usuário encontrado"
                      message="Tente pesquisar por outro nome, email ou empresa."
                      centered
                      style={{ boxShadow: "none" }}
                    />
                  </td>
                </motion.tr>
              ) : (
                usuariosFiltrados.map((user, index) => {
                  const tipoStyle = getTipoBadgeStyle(user.tipo);
                  const fotoUsuario = resolverUrlImagemUsuario(user);

                  return (
                    <motion.tr key={user.id_user} {...getSequencedMotion(index)}>
                      <td style={dashboardTableCellStyle}>
                        <div className="d-flex align-items-center">
                          <div
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "16px",
                              overflow: "hidden",
                              position: "relative",
                              flexShrink: 0,
                              border: "1px solid rgba(255,179,0,.20)",
                              background: "rgba(255,179,0,.12)",
                            }}
                          >
                            {fotoUsuario && (
                              <img
                                src={fotoUsuario}
                                alt={user.nome_user ? `Foto de ${user.nome_user}` : "Foto do usuário"}
                                onError={(event) => {
                                  event.currentTarget.style.display = "none";

                                  const fallback = event.currentTarget.nextElementSibling;

                                  if (fallback) {
                                    fallback.style.display = "flex";
                                  }
                                }}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  display: "block",
                                }}
                              />
                            )}

                            <div
                              className="justify-content-center align-items-center fw-bold text-uppercase"
                              style={{
                                width: "100%",
                                height: "100%",
                                display: fotoUsuario ? "none" : "flex",
                                color: "#ffcf40",
                                fontSize: ".9rem",
                              }}
                            >
                              {obterIniciais(user.nome_user)}
                            </div>
                          </div>

                          <div className="ms-3" style={{ minWidth: 0 }}>
                            <div
                              className="fw-bold text-truncate"
                              style={{
                                color: "#ffffff",
                                fontSize: ".95rem",
                                maxWidth: "220px",
                              }}
                              title={user.nome_user}
                            >
                              {user.nome_user || "Sem nome"}
                            </div>

                            <div
                              className="text-truncate"
                              style={{
                                color: "rgba(255,255,255,.50)",
                                fontSize: ".82rem",
                                maxWidth: "240px",
                              }}
                              title={user.email}
                            >
                              {user.email || "Email não informado"}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td style={dashboardTableCellStyle}>
                        <span style={{ color: "rgba(255,255,255,.82)" }}>
                          {user.empresa || "Não informado"}
                        </span>
                      </td>

                      <td style={dashboardTableCellStyle}>
                        <span style={{ color: "rgba(255,255,255,.72)" }}>
                          {user.cargo || "Não informado"}
                        </span>
                      </td>

                      <td style={dashboardTableCellStyle}>
                        <span
                          className="px-3 py-2 d-inline-flex align-items-center text-capitalize"
                          style={{
                            borderRadius: "999px",
                            fontSize: ".78rem",
                            fontWeight: "800",
                            ...tipoStyle,
                          }}
                        >
                          {formatarTipo(user.tipo)}
                        </span>
                      </td>

                      <td style={dashboardTableCellStyle}>
                        <span
                          style={{
                            color: "rgba(255,255,255,.65)",
                            fontSize: ".9rem",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {formatarDocumento(user.cnpj)}
                        </span>
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
                            onClick={() => abrirModalEditar(user)}
                            className="btn d-flex align-items-center justify-content-center"
                            title="Editar usuário"
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "14px",
                              background: "rgba(255,179,0,.08)",
                              border: "1px solid rgba(255,179,0,.16)",
                              color: "#ffcf40",
                              boxShadow: "none",
                            }}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(user.id_user)}
                            className="btn d-flex align-items-center justify-content-center"
                            title="Excluir usuário"
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "14px",
                              background: "rgba(245,6,29,.10)",
                              border: "1px solid rgba(245,6,29,.18)",
                              color: "#ff758f",
                              boxShadow: "none",
                            }}
                          >
                            <i className="bi bi-trash3"></i>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
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
              Página {paginacao.pagina || paginaAtual} de {paginacao.totalPaginas || 1}
            </span>

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn px-3"
                disabled={paginaAtual <= 1 || carregando}
                onClick={() => carregarUsuarios(paginaAtual - 1)}
                style={{
                  ...paginationBtnStyle,
                  opacity: paginaAtual <= 1 ? 0.45 : 1,
                  cursor: paginaAtual <= 1 ? "not-allowed" : "pointer",
                }}
              >
                <i className="bi bi-chevron-left me-1" />
                Anterior
              </button>

              <button
                type="button"
                className="btn px-3"
                disabled={paginaAtual >= (paginacao.totalPaginas || 1) || carregando}
                onClick={() => carregarUsuarios(paginaAtual + 1)}
                style={{
                  ...paginationBtnStyle,
                  opacity:
                    paginaAtual >= (paginacao.totalPaginas || 1) ? 0.45 : 1,
                  cursor:
                    paginaAtual >= (paginacao.totalPaginas || 1)
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                Próxima
                <i className="bi bi-chevron-right ms-1" />
              </button>
            </div>
          </div>
        )}
      </motion.section>

      {modalCriarAberto && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={modalBackdropStyle}
        >
          {renderFormularioUsuario({ modo: "criar" })}
        </div>
      )}

      {modalEditarAberto && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={modalBackdropStyle}
        >
          {renderFormularioUsuario({ modo: "editar" })}
        </div>
      )}
    </motion.main>
  );
}
