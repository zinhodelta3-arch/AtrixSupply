"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  FALLBACK_PROFILE_IMAGE,
  resolveImageUrl,
  useImageFallback,
} from "@/utils/imageUrl";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");

const ROTAS_USUARIOS = [
  `${API_URL}/api/usuarios`,
  `${API_URL}/usuarios`,
  `${API_URL}/api/auth`,
  `${API_URL}/auth`,
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

const innerSurfaceGradient = `
  linear-gradient(
    145deg,
    rgba(255,255,255,.035),
    rgba(255,255,255,.015)
  )
`;

const panelStyle = {
  background: surfaceGradient,
  borderRadius: "30px",
  border: "1px solid rgba(255,255,255,.10)",
  boxShadow: "none",
};

const innerPanelStyle = {
  background: innerSurfaceGradient,
  border: "1px solid rgba(255,255,255,.06)",
  boxShadow: "none",
};

const inputStyle = {
  background: "rgba(255,255,255,.04)",
  border: "1px solid rgba(255,255,255,.08)",
  color: "white",
  borderRadius: "16px",
  padding: "13px 15px",
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

  const token = obterToken();

  return decodificarToken(token);
}

function obterIdUsuario(usuario) {
  return (
    usuario?.id_user ||
    usuario?.id_usuario ||
    usuario?.id ||
    usuario?.userId ||
    usuario?.idUser ||
    usuario?.sub ||
    usuario?.dados?.id_user ||
    usuario?.dados?.id_usuario ||
    usuario?.dados?.id ||
    usuario?.dados?.userId ||
    usuario?.dados?.idUser ||
    usuario?.dados?.sub ||
    usuario?.dados?.usuario?.id_user ||
    usuario?.dados?.usuario?.id_usuario ||
    usuario?.dados?.usuario?.id ||
    usuario?.usuario?.id_user ||
    usuario?.usuario?.id_usuario ||
    usuario?.usuario?.id ||
    ""
  );
}

function normalizarUsuarioPayload(data) {
  return (
    data?.dados?.usuario ||
    data?.dados?.user ||
    data?.dados ||
    data?.usuario ||
    data?.user ||
    data ||
    null
  );
}

function normalizarUsuarioComIdSeguro(usuarioApi, usuarioBase) {
  const idApi = obterIdUsuario(usuarioApi);
  const idBase = obterIdUsuario(usuarioBase);
  const idSeguro = idBase || idApi;

  return {
    ...(usuarioBase || {}),
    ...(usuarioApi || {}),
    id_user: idSeguro || usuarioApi?.id_user || usuarioBase?.id_user,
  };
}

function montarHeaders({ multipart = false } = {}) {
  const token = obterToken();

  return {
    ...(multipart ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function tratarResposta(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const detalhes = Array.isArray(data?.detalhes)
      ? data.detalhes.map((item) => item.mensagem).join(" | ")
      : null;

    throw new Error(
      detalhes ||
        data?.mensagem ||
        data?.erro ||
        "Não foi possível concluir a operação."
    );
  }

  return data;
}

async function buscarUsuarioPorId(idUsuario) {
  let ultimoErro = null;

  for (const baseUrl of ROTAS_USUARIOS) {
    try {
      const response = await fetch(`${baseUrl}/${idUsuario}`, {
        method: "GET",
        headers: montarHeaders(),
        cache: "no-store",
      });

      if (response.status === 404) {
        ultimoErro = new Error(`Rota não encontrada em ${baseUrl}/${idUsuario}`);
        continue;
      }

      const data = await tratarResposta(response);
      const usuario = normalizarUsuarioPayload(data);

      return {
        usuario,
        baseUrl,
      };
    } catch (error) {
      ultimoErro = error;

      if (
        error.message?.toLowerCase().includes("credenciais") ||
        error.message?.toLowerCase().includes("token") ||
        error.message?.toLowerCase().includes("autoriz")
      ) {
        break;
      }
    }
  }

  throw ultimoErro || new Error("Não foi possível localizar a rota de usuários.");
}

async function atualizarUsuarioPorId(idUsuario, body, rotaPreferida) {
  const rotas = rotaPreferida
    ? [rotaPreferida, ...ROTAS_USUARIOS.filter((rota) => rota !== rotaPreferida)]
    : ROTAS_USUARIOS;

  let ultimoErro = null;

  for (const baseUrl of rotas) {
    try {
      const isMultipart = body instanceof FormData;

      const response = await fetch(`${baseUrl}/${idUsuario}`, {
        method: "PUT",
        headers: montarHeaders({ multipart: isMultipart }),
        body: isMultipart ? body : JSON.stringify(body),
      });

      if (response.status === 404) {
        ultimoErro = new Error(`Rota de atualização não encontrada em ${baseUrl}/${idUsuario}`);
        continue;
      }

      const data = await tratarResposta(response);

      return {
        data,
        baseUrl,
      };
    } catch (error) {
      ultimoErro = error;

      if (error.message?.includes("Rota de atualização não encontrada")) {
        continue;
      }

      break;
    }
  }

  throw ultimoErro || new Error("Não foi possível atualizar o usuário.");
}

function formatarTipo(tipo) {
  switch (tipo) {
    case "admin":
      return "Administrador";
    case "administrador":
      return "Administrador";
    case "fornecedor":
      return "Fornecedor";
    case "comum":
      return "Usuário comum";
    default:
      return "Não informado";
  }
}

function getCorTipo(tipo) {
  switch (tipo) {
    case "admin":
    case "administrador":
      return "#ffcf40";
    case "fornecedor":
      return "#5cff95";
    case "comum":
      return "#8ab4ff";
    default:
      return "#ffcf40";
  }
}

function formatarDocumento(valor) {
  if (!valor) return "Não informado";

  const limpo = String(valor).replace(/\D/g, "");

  if (limpo.length !== 14) return valor;

  return limpo.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}

function formatarCep(valor) {
  if (!valor) return "Não informado";

  const limpo = String(valor).replace(/\D/g, "");

  if (limpo.length !== 8) return valor;

  return limpo.replace(/^(\d{5})(\d{3})$/, "$1-$2");
}

function pegarIniciais(nome) {
  if (!nome) return "US";

  const partes = nome.trim().split(" ").filter(Boolean);

  if (partes.length === 1) {
    return partes[0].slice(0, 2).toUpperCase();
  }

  return `${partes[0][0]}${partes[partes.length - 1][0]}`.toUpperCase();
}

export default function Perfil() {
  const router = useRouter();

  const [perfil, setPerfil] = useState(null);
  const [idUsuarioLogado, setIdUsuarioLogado] = useState("");
  const [rotaUsuariosAtiva, setRotaUsuariosAtiva] = useState(null);

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const [modalAberto, setModalAberto] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [formErro, setFormErro] = useState(null);

  const [formData, setFormData] = useState({
    nome_user: "",
    email: "",
    empresa: "",
    cargo: "",
    endereco: "",
    cnpj: "",
    cep: "",
    senha: "",
    foto: null,
  });

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    carregarPerfil();
  }, []);

  async function carregarPerfil() {
    try {
      setCarregando(true);
      setErro(null);

      const usuarioLocal = obterUsuarioLocal();
      const idUsuario = obterIdUsuario(usuarioLocal);

      if (!idUsuario) {
        router.replace("/login");
        return;
      }

      setIdUsuarioLogado(String(idUsuario));

      const { usuario, baseUrl } = await buscarUsuarioPorId(idUsuario);

      if (!usuario) {
        throw new Error("Perfil não encontrado.");
      }

      const usuarioNormalizado = normalizarUsuarioComIdSeguro(usuario, usuarioLocal);

      setPerfil(usuarioNormalizado);
      setRotaUsuariosAtiva(baseUrl);

      if (typeof window !== "undefined") {
        localStorage.setItem("usuario", JSON.stringify(usuarioNormalizado));
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      setErro(error.message || "Não foi possível carregar o perfil.");
    } finally {
      setCarregando(false);
    }
  }

  function abrirModalEdicao() {
    if (!perfil) return;

    setFormData({
      nome_user: perfil.nome_user || "",
      email: perfil.email || "",
      empresa: perfil.empresa || "",
      cargo: perfil.cargo || "",
      endereco: perfil.endereco || "",
      cnpj: perfil.cnpj || "",
      cep: perfil.cep || "",
      senha: "",
      foto: null,
    });

    setFormErro(null);
    setFeedback(null);
    setModalAberto(true);
  }

  function fecharModal() {
    if (salvando) return;

    setModalAberto(false);
    setFormErro(null);
  }

  function atualizarCampo(campo, valor) {
    setFormData((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  async function salvarPerfil(event) {
    event.preventDefault();

    try {
      setSalvando(true);
      setFormErro(null);
      setFeedback(null);

      const idParaAtualizar =
        idUsuarioLogado ||
        obterIdUsuario(obterUsuarioLocal()) ||
        obterIdUsuario(perfil);

      if (!idParaAtualizar) {
        setFormErro("ID do usuário logado não encontrado.");
        return;
      }

      if (!formData.nome_user.trim()) {
        setFormErro("O nome é obrigatório.");
        return;
      }

      if (!formData.email.trim()) {
        setFormErro("O email é obrigatório.");
        return;
      }

      if (!formData.empresa.trim()) {
        setFormErro("A empresa é obrigatória.");
        return;
      }

      if (!formData.cargo.trim()) {
        setFormErro("O cargo é obrigatório.");
        return;
      }

      if (!formData.endereco.trim()) {
        setFormErro("O endereço é obrigatório.");
        return;
      }

      if (!formData.cnpj.trim()) {
        setFormErro("O CNPJ é obrigatório.");
        return;
      }

      if (!formData.cep.trim()) {
        setFormErro("O CEP é obrigatório.");
        return;
      }

      const body = new FormData();

      body.append("nome_user", formData.nome_user.trim());
      body.append("email", formData.email.trim());
      body.append("empresa", formData.empresa.trim());
      body.append("cargo", formData.cargo.trim());
      body.append("endereco", formData.endereco.trim());
      body.append("cnpj", formData.cnpj.trim());
      body.append("cep", formData.cep.trim());

      if (formData.senha.trim()) {
        body.append("senha", formData.senha.trim());
      }

      if (formData.foto) {
        body.append("foto", formData.foto);
      }

      const { data, baseUrl } = await atualizarUsuarioPorId(
        idParaAtualizar,
        body,
        rotaUsuariosAtiva
      );

      setRotaUsuariosAtiva(baseUrl);
      setFeedback(data?.mensagem || "Perfil atualizado com sucesso.");

      await carregarPerfil();

      setModalAberto(false);

      setFormData((prev) => ({
        ...prev,
        senha: "",
        foto: null,
      }));
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      setFormErro(error.message || "Não foi possível atualizar o perfil.");
    } finally {
      setSalvando(false);
    }
  }

  const idPerfilSeguro =
    idUsuarioLogado ||
    obterIdUsuario(perfil) ||
    obterIdUsuario(obterUsuarioLocal());

  const tipoCor = getCorTipo(perfil?.tipo);
  const iniciais = pegarIniciais(perfil?.nome_user);
  const fotoPerfil = resolveImageUrl(perfil?.foto, FALLBACK_PROFILE_IMAGE);

  const resumoConta = useMemo(() => {
    if (!perfil) return [];

    return [
      {
        titulo: "Tipo",
        valor: formatarTipo(perfil.tipo),
        icon: "bi-shield-check",
        cor: getCorTipo(perfil.tipo),
      },
      {
        titulo: "Empresa",
        valor: perfil.empresa || "Não informado",
        icon: "bi-buildings",
        cor: "#ffcf40",
      },
      {
        titulo: "Cargo",
        valor: perfil.cargo || "Não informado",
        icon: "bi-person-badge",
        cor: "#ff8800",
      },
    ];
  }, [perfil]);

  const informacoesPrincipais = useMemo(() => {
    if (!perfil) return [];

    return [
      {
        titulo: "Email",
        descricao: "Contato principal da conta",
        valor: perfil.email || "Não informado",
        icon: "bi-envelope",
      },
      {
        titulo: "Endereço",
        descricao: "Local vinculado ao cadastro",
        valor: perfil.endereco || "Não informado",
        icon: "bi-geo-alt",
      },
      {
        titulo: "CNPJ",
        descricao: "Documento empresarial",
        valor: formatarDocumento(perfil.cnpj),
        icon: "bi-file-earmark-text",
      },
      {
        titulo: "CEP",
        descricao: "Código postal cadastrado",
        valor: formatarCep(perfil.cep),
        icon: "bi-mailbox",
      },
    ];
  }, [perfil]);

  if (carregando) {
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

          <h4 className="fw-bold">Carregando perfil...</h4>

          <p className="text-secondary mb-0">
            Buscando suas informações na API.
          </p>
        </div>
      </main>
    );
  }

  if (erro) {
    return (
      <main
        className="d-flex justify-content-center align-items-center text-white p-4"
        style={{
          minHeight: "100vh",
          background: pageBackground,
        }}
      >
        <div
          className="text-center"
          style={{
            maxWidth: "560px",
            ...panelStyle,
            padding: "35px",
          }}
        >
          <i
            className="bi bi-exclamation-triangle"
            style={{
              fontSize: "3rem",
              color: "#ffb300",
            }}
          />

          <h3 className="fw-bold mt-3">Não foi possível carregar o perfil</h3>

          <p className="text-secondary mt-3">{erro}</p>

          <div
            className="text-start mt-4"
            style={{
              ...innerPanelStyle,
              borderRadius: "18px",
              padding: "18px",
              color: "rgba(255,255,255,.7)",
              fontSize: ".92rem",
              lineHeight: "1.7",
            }}
          >
            Verifique se o router foi registrado como{" "}
            <strong>/api/usuarios</strong>, <strong>/usuarios</strong>,{" "}
            <strong>/api/auth</strong> ou <strong>/auth</strong>, e se o token
            está salvo no localStorage.
          </div>

          <button
            type="button"
            className="btn mt-4"
            onClick={carregarPerfil}
            style={{
              ...buttonGradient,
              padding: "12px 22px",
            }}
          >
            Tentar novamente
          </button>
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
      <header
        className="px-4 px-lg-5 py-4 d-flex justify-content-between align-items-center flex-wrap gap-3"
        style={{
          borderBottom: "1px solid rgba(255,255,255,.05)",
          backdropFilter: "blur(10px)",
          background: "rgba(0,0,0,.10)",
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "20px",
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.08)",
              boxShadow: "none",
            }}
          >
            <i
              className="bi bi-person-circle"
              style={{
                fontSize: "1.75rem",
                color: "#ffcf40",
              }}
            />
          </div>

          <div>
            <h1
              style={{
                margin: 0,
                fontWeight: "800",
                fontSize: "2rem",
                background: "linear-gradient(90deg,#ffcf40,#ff9d00,#c0012a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Perfil do Usuário
            </h1>

            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,.55)",
              }}
            >
              Gerencie seus dados, conta e informações profissionais.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={abrirModalEdicao}
          className="btn"
          style={{
            ...buttonGradient,
            padding: "14px 24px",
          }}
        >
          <i className="bi bi-pencil-square me-2" />
          Editar perfil
        </button>
      </header>

      <div className="container-fluid px-4 px-lg-5 py-5">
        {feedback && (
          <div
            className="alert alert-success mb-4"
            style={{
              borderRadius: "18px",
              border: "none",
            }}
          >
            {feedback}
          </div>
        )}

        <div className="row g-4">
          <div className="col-xl-4">
            <aside
              className="h-100"
              style={{
                ...panelStyle,
                padding: "30px",
              }}
            >
              <div className="text-center">
                <div
                  style={{
                    width: "170px",
                    height: "170px",
                    margin: "0 auto",
                    borderRadius: "34px",
                    position: "relative",
                    overflow: "hidden",
                    border: "2px solid rgba(255,255,255,.10)",
                    boxShadow: "none",
                  }}
                >
                  <img
                    src={fotoPerfil}
                    alt="Perfil"
                    onError={(event) => useImageFallback(event, FALLBACK_PROFILE_IMAGE)}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div
                  className="mx-auto d-flex justify-content-center align-items-center"
                  style={{
                    width: "64px",
                    height: "64px",
                    marginTop: "-28px",
                    position: "relative",
                    zIndex: 2,
                    borderRadius: "20px",
                    background: "linear-gradient(145deg,#940533,#c0012a,#ff8800)",
                    border: "4px solid rgba(17,17,17,1)",
                    fontWeight: "900",
                    color: "white",
                    letterSpacing: ".5px",
                    boxShadow: "none",
                  }}
                >
                  {iniciais}
                </div>

                <h2
                  className="mt-4 mb-2"
                  style={{
                    color: "#ffe082",
                    fontWeight: "800",
                    fontSize: "1.65rem",
                  }}
                >
                  {perfil?.nome_user || "Usuário"}
                </h2>

                <p
                  className="mb-3"
                  style={{
                    color: "rgba(255,255,255,.62)",
                  }}
                >
                  {perfil?.cargo || "Cargo não informado"}
                </p>

                <span
                  className="badge"
                  style={{
                    background: `${tipoCor}20`,
                    color: tipoCor,
                    border: `1px solid ${tipoCor}66`,
                    borderRadius: "999px",
                    padding: "10px 14px",
                    fontWeight: "800",
                  }}
                >
                  <i className="bi bi-shield-check me-2" />
                  {formatarTipo(perfil?.tipo)}
                </span>
              </div>

              <div
                className="mt-5"
                style={{
                  ...innerPanelStyle,
                  borderRadius: "24px",
                  padding: "24px",
                }}
              >
                <h5
                  style={{
                    color: "#ffcf40",
                    fontWeight: "800",
                    marginBottom: "14px",
                  }}
                >
                  Resumo
                </h5>

                <p
                  style={{
                    color: "rgba(255,255,255,.72)",
                    lineHeight: "1.8",
                    margin: 0,
                  }}
                >
                  {perfil?.nome_user || "Este usuário"} faz parte da empresa{" "}
                  <strong style={{ color: "#ffe082" }}>
                    {perfil?.empresa || "não informada"}
                  </strong>{" "}
                  atuando como{" "}
                  <strong style={{ color: "#ffe082" }}>
                    {perfil?.cargo || "cargo não informado"}
                  </strong>
                  .
                </p>
              </div>

              <div className="d-flex flex-column gap-3 mt-4">
                {resumoConta.map((item) => (
                  <div
                    key={item.titulo}
                    className="d-flex align-items-center gap-3"
                    style={{
                      ...innerPanelStyle,
                      borderRadius: "20px",
                      padding: "16px",
                    }}
                  >
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "15px",
                        background: `${item.cor}18`,
                        color: item.cor,
                      }}
                    >
                      <i className={`bi ${item.icon}`} />
                    </div>

                    <div style={{ minWidth: 0 }}>
                      <p
                        style={{
                          margin: 0,
                          color: "rgba(255,255,255,.52)",
                          fontSize: ".78rem",
                          textTransform: "uppercase",
                          fontWeight: "800",
                          letterSpacing: ".6px",
                        }}
                      >
                        {item.titulo}
                      </p>

                      <span
                        style={{
                          display: "block",
                          color: "rgba(255,255,255,.9)",
                          fontWeight: "700",
                          wordBreak: "break-word",
                        }}
                      >
                        {item.valor}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="col-xl-8">
            <section
              style={{
                ...panelStyle,
                padding: "35px",
                height: "100%",
              }}
            >
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
                <div>
                  <h2
                    style={{
                      color: "#ffe082",
                      fontWeight: "800",
                      marginBottom: "8px",
                    }}
                  >
                    Informações da Conta
                  </h2>

                  <p
                    style={{
                      margin: 0,
                      color: "rgba(255,255,255,.55)",
                    }}
                  >
                    Dados principais usados no sistema.
                  </p>
                </div>

                <span
                  className="badge"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    color: "rgba(255,255,255,.75)",
                    border: "1px solid rgba(255,255,255,.08)",
                    borderRadius: "999px",
                    padding: "10px 13px",
                  }}
                >
                  ID #{idPerfilSeguro || "---"}
                </span>
              </div>

              <div className="row g-4">
                {informacoesPrincipais.map((item) => (
                  <div className="col-md-6" key={item.titulo}>
                    <div
                      className="h-100"
                      style={{
                        ...innerPanelStyle,
                        borderRadius: "24px",
                        padding: "24px",
                      }}
                    >
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "16px",
                            background: "rgba(255,179,0,.12)",
                            color: "#ffcf40",
                          }}
                        >
                          <i className={`bi ${item.icon}`} />
                        </div>

                        <div>
                          <h5
                            style={{
                              margin: 0,
                              color: "#ffcf40",
                              fontWeight: "800",
                            }}
                          >
                            {item.titulo}
                          </h5>

                          <p
                            style={{
                              margin: 0,
                              color: "rgba(255,255,255,.48)",
                              fontSize: ".86rem",
                            }}
                          >
                            {item.descricao}
                          </p>
                        </div>
                      </div>

                      <span
                        style={{
                          display: "block",
                          color: "rgba(255,255,255,.92)",
                          fontSize: "1.02rem",
                          fontWeight: "600",
                          wordBreak: "break-word",
                        }}
                      >
                        {item.valor}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-4"
                style={{
                  ...innerPanelStyle,
                  borderRadius: "24px",
                  padding: "26px",
                }}
              >
                <div className="row g-4 align-items-center">
                  <div className="col-lg-8">
                    <h4
                      style={{
                        color: "#ffe082",
                        fontWeight: "800",
                        marginBottom: "8px",
                      }}
                    >
                      Segurança e acesso
                    </h4>

                    <p
                      style={{
                        color: "rgba(255,255,255,.58)",
                        margin: 0,
                        lineHeight: "1.7",
                      }}
                    >
                      Use o botão de edição para atualizar seus dados. Para
                      alterar senha, preencha o campo de nova senha no modal.
                    </p>
                  </div>

                  <div className="col-lg-4 d-grid">
                    <button
                      type="button"
                      onClick={abrirModalEdicao}
                      className="btn"
                      style={{
                        ...buttonGradient,
                        padding: "14px 18px",
                      }}
                    >
                      <i className="bi bi-lock me-2" />
                      Atualizar dados
                    </button>
                  </div>
                </div>
              </div>
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
              width: "min(850px, 100%)",
              maxHeight: "92vh",
              overflowY: "auto",
              borderRadius: "28px",
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
                    background: "rgba(255,179,0,.12)",
                    border: "1px solid rgba(255,255,255,.08)",
                    boxShadow: "none",
                  }}
                >
                  <i
                    className="bi bi-pencil-square"
                    style={{
                      color: "#ffcf40",
                      fontSize: "1.35rem",
                    }}
                  />
                </div>

                <div>
                  <h3
                    style={{
                      color: "#ffe082",
                      fontWeight: "800",
                      margin: 0,
                    }}
                  >
                    Editar Perfil
                  </h3>

                  <p
                    style={{
                      color: "rgba(255,255,255,.55)",
                      margin: "6px 0 0",
                    }}
                  >
                    Atualize suas informações pessoais.
                  </p>

                  <small
                    style={{
                      color: "rgba(255,255,255,.42)",
                    }}
                  >
                    ID autenticado: #{idPerfilSeguro || "---"}
                  </small>
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
                  boxShadow: "none",
                }}
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <form onSubmit={salvarPerfil}>
              <div style={{ padding: "28px 32px 10px" }}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small text-white-50">
                      Nome
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={formData.nome_user}
                      onChange={(event) =>
                        atualizarCampo("nome_user", event.target.value)
                      }
                      style={inputStyle}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small text-white-50">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(event) =>
                        atualizarCampo("email", event.target.value)
                      }
                      style={inputStyle}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small text-white-50">
                      Empresa
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={formData.empresa}
                      onChange={(event) =>
                        atualizarCampo("empresa", event.target.value)
                      }
                      style={inputStyle}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small text-white-50">
                      Cargo
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={formData.cargo}
                      onChange={(event) =>
                        atualizarCampo("cargo", event.target.value)
                      }
                      style={inputStyle}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small text-white-50">
                      CNPJ
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={formData.cnpj}
                      onChange={(event) =>
                        atualizarCampo("cnpj", event.target.value)
                      }
                      style={inputStyle}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small text-white-50">
                      CEP
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={formData.cep}
                      onChange={(event) =>
                        atualizarCampo("cep", event.target.value)
                      }
                      style={inputStyle}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small text-white-50">
                      Endereço
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={formData.endereco}
                      onChange={(event) =>
                        atualizarCampo("endereco", event.target.value)
                      }
                      style={inputStyle}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small text-white-50">
                      Foto do perfil
                    </label>

                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(event) =>
                        atualizarCampo("foto", event.target.files?.[0] || null)
                      }
                      style={inputStyle}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small text-white-50">
                      Nova senha
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      value={formData.senha}
                      onChange={(event) =>
                        atualizarCampo("senha", event.target.value)
                      }
                      placeholder="Deixe vazio para não alterar"
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
                    minWidth: "170px",
                  }}
                >
                  {salvando ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Salvando...
                    </>
                  ) : (
                    "Salvar Alterações"
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
