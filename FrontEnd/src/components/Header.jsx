"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AlertCard from "@/components/AlertCard";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
const NOTIFICACOES_URL = `${API_URL}/api/notificacoes`;

function normalizarTipoUsuario(usuario) {
  if (!usuario) return "";

  if (typeof usuario === "string") {
    return usuario.trim().toLowerCase();
  }

  return String(
    usuario?.tipo ||
      usuario?.tipo_user ||
      usuario?.role ||
      usuario?.nivel ||
      usuario?.dados?.tipo ||
      usuario?.dados?.tipo_user ||
      usuario?.usuario?.tipo ||
      ""
  )
    .trim()
    .toLowerCase();
}

function obterNomeUsuario(usuario) {
  if (!usuario || typeof usuario === "string") return "";

  return (
    usuario?.nome_user ||
    usuario?.nome ||
    usuario?.name ||
    usuario?.dados?.nome_user ||
    usuario?.dados?.nome ||
    usuario?.usuario?.nome_user ||
    ""
  );
}

function obterIniciaisUsuario(nome) {
  if (!nome) return "US";

  const partes = String(nome).trim().split(" ").filter(Boolean);

  if (partes.length === 0) return "US";

  if (partes.length === 1) {
    return partes[0].slice(0, 2).toUpperCase();
  }

  return `${partes[0][0]}${partes[partes.length - 1][0]}`.toUpperCase();
}

function obterFotoBrutaUsuario(usuario) {
  if (!usuario || typeof usuario === "string") return "";

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

function obterFotoUsuario(usuario) {
  return resolverUrlImagemUsuario(obterFotoBrutaUsuario(usuario));
}

function obterIdUsuario(usuario) {
  if (!usuario || typeof usuario === "string") return "";

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

function mesclarUsuarioLocalComApi(usuarioLocal, usuarioApi) {
  const idSeguro = obterIdUsuario(usuarioLocal) || obterIdUsuario(usuarioApi);

  return {
    ...(usuarioLocal || {}),
    ...(usuarioApi || {}),
    id_user: idSeguro || usuarioApi?.id_user || usuarioLocal?.id_user,
  };
}

async function buscarUsuarioAtualizado(usuarioBase) {
  const token = obterTokenLocal();
  const idUsuario = obterIdUsuario(usuarioBase);

  if (!token) return null;

  const urls = [];

  if (idUsuario) {
    urls.push(`${API_URL}/api/usuarios/${idUsuario}`);
    urls.push(`${API_URL}/usuarios/${idUsuario}`);
  }

  urls.push(`${API_URL}/api/auth/perfil`);
  urls.push(`${API_URL}/auth/perfil`);

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (!response.ok) continue;

      const data = await response.json().catch(() => null);

      if (!data || data?.sucesso === false) continue;

      const usuarioApi = normalizarUsuarioPayload(data);

      if (!usuarioApi || typeof usuarioApi === "string") continue;

      return mesclarUsuarioLocalComApi(usuarioBase, usuarioApi);
    } catch (error) {
      // Tenta a próxima rota disponível.
    }
  }

  return null;
}

function obterTokenLocal() {
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

function obterIdNotificacao(notificacao, index = 0) {
  return (
    notificacao?.id_notificacao ||
    notificacao?.id ||
    notificacao?.id_notificacao_usuario ||
    `${notificacao?.titulo || "notificacao"}-${index}`
  );
}

function obterTituloNotificacao(notificacao) {
  return (
    notificacao?.titulo ||
    notificacao?.assunto ||
    notificacao?.suporte_assunto ||
    notificacao?.dados?.titulo ||
    "Notificação"
  );
}

function obterMensagemNotificacao(notificacao) {
  return (
    notificacao?.mensagem ||
    notificacao?.descricao ||
    notificacao?.texto ||
    notificacao?.dados?.mensagem ||
    "Sem mensagem disponível."
  );
}

function obterTipoNotificacao(notificacao) {
  return String(
    notificacao?.tipo ||
      notificacao?.categoria ||
      notificacao?.tipo_notificacao ||
      notificacao?.dados?.tipo ||
      "sistema"
  )
    .trim()
    .toLowerCase();
}

function obterDataNotificacao(notificacao) {
  return (
    notificacao?.data_criacao ||
    notificacao?.created_at ||
    notificacao?.data ||
    notificacao?.dados?.data_criacao ||
    null
  );
}

function formatarDataNotificacao(valor) {
  if (!valor) return "Agora";

  const data = new Date(valor);

  if (Number.isNaN(data.getTime())) return "Agora";

  return data.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function notificacaoEstaLida(notificacao) {
  return Boolean(Number(notificacao?.lida ?? notificacao?.visualizada ?? 0));
}

function notificacaoPossuiResposta(notificacao) {
  return Boolean(
    notificacao?.resposta_admin ||
      notificacao?.resposta ||
      notificacao?.mensagem_resposta ||
      notificacao?.dados?.resposta_admin ||
      notificacao?.dados?.resposta
  );
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [notificacoes, setNotificacoes] = useState([]);
  const [fotoPerfilQuebrou, setFotoPerfilQuebrou] = useState(false);

  const tipoUsuario = normalizarTipoUsuario(usuario);
  const nomeUsuario = obterNomeUsuario(usuario);
  const iniciaisUsuario = obterIniciaisUsuario(nomeUsuario);
  const fotoUsuario = obterFotoUsuario(usuario);

  const usuarioLogado = Boolean(usuario);
  const exibirFotoPerfil = Boolean(usuarioLogado && fotoUsuario && !fotoPerfilQuebrou);
  const usuarioFornecedor =
    tipoUsuario === "fornecedor" ||
    tipoUsuario === "fornecedores" ||
    tipoUsuario === "supplier";
  const usuarioComum = tipoUsuario === "comum" || tipoUsuario === "cliente";
  const exibirLinksCliente = !usuarioLogado || usuarioComum;
  const exibirCarrinho = usuarioLogado && usuarioComum;
  const exibirOpcoesFornecedor = usuarioLogado && usuarioFornecedor;
  const notificacoesNaoLidas = notificacoes.filter((item) => !notificacaoEstaLida(item)).length;

  const atualizarCarrinhoDoStorage = () => {
    try {
      const carrinhoStorage = localStorage.getItem("carrinho");

      if (carrinhoStorage) {
        const carrinhoParseado = JSON.parse(carrinhoStorage);
        setCartItems(Array.isArray(carrinhoParseado) ? carrinhoParseado : []);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Erro ao ler o carrinho do localStorage:", error);
      setCartItems([]);
    }
  };

  const carregarUsuarioDoStorage = async () => {
    let usuarioLocal = null;

    try {
      const usuarioStorage = localStorage.getItem("usuario");

      if (usuarioStorage) {
        usuarioLocal = JSON.parse(usuarioStorage) || null;
        setUsuario(usuarioLocal);
      } else {
        setUsuario(null);
      }
    } catch (error) {
      console.error("Erro ao ler dados do usuário:", error);
      setUsuario(null);
    } finally {
      setLoading(false);
    }

    if (!usuarioLocal) return;

    const usuarioAtualizado = await buscarUsuarioAtualizado(usuarioLocal);

    if (!usuarioAtualizado) return;

    setUsuario(usuarioAtualizado);

    try {
      localStorage.setItem("usuario", JSON.stringify(usuarioAtualizado));
    } catch (error) {
      console.error("Erro ao atualizar usuário no localStorage:", error);
    }
  };

  const carregarNotificacoes = async () => {
    const token = obterTokenLocal();

    if (!token) {
      setNotificacoes([]);
      return;
    }

    try {
      const response = await fetch(`${NOTIFICACOES_URL}?pagina=1&limite=5`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.sucesso) {
        setNotificacoes([]);
        return;
      }

      setNotificacoes(Array.isArray(data?.dados) ? data.dados : []);
    } catch (error) {
      setNotificacoes([]);
    }
  };

  const atualizarDadosLocais = () => {
    carregarUsuarioDoStorage();
    atualizarCarrinhoDoStorage();
    carregarNotificacoes();
  };

  useEffect(() => {
    setFotoPerfilQuebrou(false);
  }, [usuario]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    import("bootstrap/dist/js/bootstrap.bundle.min.js");

    atualizarDadosLocais();

    window.addEventListener("carrinhoAtualizado", atualizarCarrinhoDoStorage);
    window.addEventListener("storage", atualizarDadosLocais);

    return () => {
      window.removeEventListener("carrinhoAtualizado", atualizarCarrinhoDoStorage);
      window.removeEventListener("storage", atualizarDadosLocais);

    };
  }, [pathname]);

  const handleLogout = (event) => {
    event.preventDefault();

    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("usuarioToken");
    localStorage.removeItem("jwt");

    setUsuario(null);
    setCartItems([]);
    setNotificacoes([]);

    router.push("/login");
  };

  const marcarNotificacaoLida = async (notificacao) => {
    const idNotificacao = obterIdNotificacao(notificacao);

    if (!idNotificacao || notificacaoEstaLida(notificacao)) return;

    const token = obterTokenLocal();

    try {
      await fetch(`${NOTIFICACOES_URL}/${idNotificacao}/lida`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotificacoes((atuais) =>
        atuais.map((item) =>
          String(obterIdNotificacao(item)) === String(idNotificacao)
            ? { ...item, lida: 1, visualizada: 1 }
            : item
        )
      );
    } catch (error) {
      // Mantém a notificação como não lida para nova tentativa.
    }
  };

  const marcarTodasNotificacoesLidas = async () => {
    if (notificacoesNaoLidas === 0) return;

    const token = obterTokenLocal();

    if (!token) return;

    try {
      await fetch(`${NOTIFICACOES_URL}/lidas`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotificacoes((atuais) =>
        atuais.map((item) => ({
          ...item,
          lida: 1,
          visualizada: 1,
        }))
      );

      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      // Mantém a lista atual se a API falhar.
    }
  };

  const handleRemoveItem = (idToRemove) => {
    const novoCarrinho = cartItems.filter(
      (item) => String(item.id) !== String(idToRemove)
    );

    setCartItems(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));

    window.dispatchEvent(new Event("carrinhoAtualizado"));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    setTimeout(() => {
      router.push("/finalizarpedido");
    }, 120);
  };

  const totalItensCarrinho = cartItems.reduce((acc, item) => {
    return acc + Number(item.qty || 1);
  }, 0);

  const subtotal = cartItems.reduce((acc, item) => {
    const preco = Number(item.price || 0);
    const quantidade = Number(item.qty || 1);

    return acc + preco * quantidade;
  }, 0);

  const subtotalFormatado = subtotal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  if (loading) {
    return null;
  }

  return (
    <>
      <header className="main-glass-header">
        <div className="container header-glass-container">
          <div className="navbar-glass-bg" aria-hidden="true"></div>

          <nav className="navbar navbar-expand-lg p-0 header-navbar-content">
            <div className="d-flex align-items-center gap-2">
              <Link
                className="navbar-brand-premium d-flex align-items-center gap-2 text-decoration-none"
                href="/"
              >
                <img
                  src="/logo.png"
                  className="photoLogo"
                  alt="Logo Atrix Supply"
                />

                <span>Atrix Supply</span>
              </Link>
            </div>

            <div className="d-flex align-items-center gap-3 order-lg-3">
              {exibirCarrinho && (
                <div className="cart-wrapper">
                  <button
                    className="cart-btn"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasCarrinho"
                    aria-controls="offcanvasCarrinho"
                  >
                    <i className="bi bi-cart3"></i>

                    {totalItensCarrinho > 0 && (
                      <span className="cart-badge">
                        {totalItensCarrinho}
                      </span>
                    )}
                  </button>
                </div>
              )}

              {usuarioLogado && (
                <div className="profile-wrapper">
                  <button
                    className="cart-btn"
                    type="button"
                    aria-label="Notificações"
                    title={
                      notificacoesNaoLidas > 0
                        ? `${notificacoesNaoLidas} notificação(ões) não lida(s)`
                        : "Notificações"
                    }
                  >
                    <i className="bi bi-bell"></i>

                    {notificacoesNaoLidas > 0 && (
                      <span className="cart-badge">{notificacoesNaoLidas}</span>
                    )}
                  </button>

                  <div
                    className="profile-dropdown"
                    style={{
                      minWidth: "380px",
                      maxWidth: "min(92vw, 430px)",
                      padding: "10px",
                      borderRadius: "22px",
                    }}
                  >
                    <div
                      className="d-flex justify-content-between align-items-start gap-3"
                      style={{
                        padding: "10px 10px 12px",
                        borderBottom: "1px solid rgba(255,255,255,0.10)",
                      }}
                    >
                      <div>
                        <strong
                          style={{
                            display: "block",
                            color: "#ffffff",
                            fontSize: ".95rem",
                            lineHeight: 1.2,
                          }}
                        >
                          Notificações
                        </strong>

                        <small style={{ color: "rgba(255,255,255,.55)" }}>
                          {notificacoesNaoLidas > 0
                            ? `${notificacoesNaoLidas} não lida(s)`
                            : "Tudo em dia"}
                        </small>
                      </div>

                      {notificacoesNaoLidas > 0 && (
                        <button
                          type="button"
                          onClick={marcarTodasNotificacoesLidas}
                          style={{
                            background: "rgba(255,179,0,.10)",
                            border: "1px solid rgba(255,179,0,.22)",
                            color: "#ffcf40",
                            borderRadius: "999px",
                            padding: "6px 10px",
                            fontSize: ".72rem",
                            fontWeight: 800,
                            whiteSpace: "nowrap",
                          }}
                        >
                          Marcar lidas
                        </button>
                      )}
                    </div>

                    {notificacoes.length === 0 ? (
                      <AlertCard
                        variant="empty"
                        icon="bi-bell-slash"
                        title="Nenhuma notificação"
                        message="Quando houver novidades, elas aparecerão aqui."
                        centered
                        style={{
                          margin: "10px 4px",
                          width: "calc(100% - 8px)",
                          padding: "22px 16px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          maxHeight: "340px",
                          overflowY: "auto",
                          padding: "10px 4px",
                        }}
                      >
                        {notificacoes.map((notificacao, index) => {
                          const idNotificacao = obterIdNotificacao(notificacao, index);
                          const lida = notificacaoEstaLida(notificacao);
                          const tipoNotificacao = obterTipoNotificacao(notificacao);
                          const tituloNotificacao = obterTituloNotificacao(notificacao);
                          const mensagemNotificacao = obterMensagemNotificacao(notificacao);
                          const temResposta = notificacaoPossuiResposta(notificacao);

                          return (
                            <button
                              key={idNotificacao}
                              type="button"
                              onClick={() => marcarNotificacaoLida(notificacao)}
                              style={{
                                width: "100%",
                                textAlign: "left",
                                background: lida
                                  ? "rgba(255,255,255,.035)"
                                  : "linear-gradient(135deg,rgba(255,136,0,.16),rgba(148,5,51,.20))",
                                border: lida
                                  ? "1px solid rgba(255,255,255,.07)"
                                  : "1px solid rgba(255,179,0,.22)",
                                color: "inherit",
                                padding: "12px",
                                borderRadius: "16px",
                                marginBottom: "8px",
                                display: "block",
                                boxShadow: "none",
                              }}
                            >
                              <div className="d-flex align-items-start gap-3">
                                <span
                                  className="d-flex align-items-center justify-content-center"
                                  style={{
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "13px",
                                    background: temResposta
                                      ? "rgba(92,255,149,.12)"
                                      : "rgba(255,179,0,.12)",
                                    border: temResposta
                                      ? "1px solid rgba(92,255,149,.20)"
                                      : "1px solid rgba(255,179,0,.20)",
                                    color: temResposta ? "#5cff95" : "#ffcf40",
                                    flexShrink: 0,
                                  }}
                                >
                                  <i
                                    className={
                                      temResposta
                                        ? "bi bi-chat-left-text-fill"
                                        : tipoNotificacao === "suporte"
                                        ? "bi bi-headset"
                                        : "bi bi-bell-fill"
                                    }
                                  />
                                </span>

                                <span style={{ minWidth: 0, flex: 1 }}>
                                  <span className="d-flex justify-content-between align-items-start gap-2 mb-1">
                                    <strong
                                      style={{
                                        display: "block",
                                        color: "#ffffff",
                                        fontSize: ".88rem",
                                        lineHeight: 1.25,
                                      }}
                                    >
                                      {tituloNotificacao}
                                    </strong>

                                    {!lida && (
                                      <span
                                        style={{
                                          width: "8px",
                                          height: "8px",
                                          borderRadius: "999px",
                                          background: "#ffcf40",
                                          flexShrink: 0,
                                          marginTop: "4px",
                                        }}
                                      />
                                    )}
                                  </span>

                                  <small
                                    style={{
                                      display: "-webkit-box",
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden",
                                      color: "rgba(255,255,255,.62)",
                                      lineHeight: 1.45,
                                    }}
                                  >
                                    {mensagemNotificacao}
                                  </small>

                                  <span
                                    className="d-flex align-items-center justify-content-between gap-2 mt-2"
                                    style={{
                                      color: "rgba(255,255,255,.42)",
                                      fontSize: ".72rem",
                                    }}
                                  >
                                    <span
                                      style={{
                                        textTransform: "capitalize",
                                      }}
                                    >
                                      {tipoNotificacao}
                                    </span>

                                    <span>{formatarDataNotificacao(obterDataNotificacao(notificacao))}</span>
                                  </span>
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    <div
                      style={{
                        padding: "10px 4px 2px",
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <Link
                        href="/notificacoes"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "14px",
                          background: "linear-gradient(90deg,#940533,#c0012a,#ff8800)",
                          color: "#ffffff",
                          textDecoration: "none",
                          fontWeight: 800,
                        }}
                      >
                        Abrir central de notificações
                        <i className="bi bi-arrow-right-short" style={{ fontSize: "1.2rem" }} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              <div className="profile-wrapper">
                <div
                  className="profile-btn"
                  title={usuarioLogado ? nomeUsuario || "Usuário" : "Entrar"}
                  style={{
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {!usuarioLogado ? (
                    <i className="bi bi-person-fill"></i>
                  ) : exibirFotoPerfil ? (
                    <img
                      src={fotoUsuario}
                      alt={nomeUsuario ? `Foto de ${nomeUsuario}` : "Foto do usuário"}
                      onError={() => setFotoPerfilQuebrou(true)}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        borderRadius: "inherit",
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
                        color: "#ffcf40",
                        fontWeight: "900",
                        fontSize: ".78rem",
                        letterSpacing: ".4px",
                        lineHeight: 1,
                      }}
                    >
                      {iniciaisUsuario}
                    </span>
                  )}
                </div>

                <div className="profile-dropdown">
                  {!usuarioLogado ? (
                    <>
                      <Link href="/login">Entrar</Link>
                      <Link href="/cadastro">Cadastrar</Link>
                    </>
                  ) : (
                    <>
                      {nomeUsuario && (
                        <span
                          className="dropdown-user-name"
                          style={{
                            padding: "10px 15px",
                            display: "block",
                            fontWeight: "bold",
                            borderBottom: "1px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          Olá, {nomeUsuario}
                        </span>
                      )}

                      <Link href="/perfil">Perfil</Link>

                      <Link onClick={handleLogout} href="#">
                        Logout
                      </Link>
                    </>
                  )}
                </div>
              </div>

              <button
                className="navbar-toggler border-0 shadow-none p-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>

            <div className="collapse navbar-collapse order-lg-2" id="navbarNav">
              <ul className="navbar-nav navbar-center gap-lg-4">
                <li className="nav-item">
                  {usuario?.tipo !== 'fornecedor' ? (
                    <>
                      <Link className="nav-link" href="/produtos">
                        Produtos
                      </Link>
                    </>
                  ) : (
                    <>
                    </>
                  )}
                  
                </li>

                {exibirLinksCliente && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" href="/pedidos">
                        Pedidos
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" href="/encomendas">
                        Encomendas
                      </Link>
                    </li>
                  </>
                )}

                {exibirOpcoesFornecedor && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" href="/encomendasrecebe">
                        Encomendas
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" href="/logistica">
                        Logística
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </header>

      {exibirCarrinho && (
        <div
          className="offcanvas offcanvas-end custom-cart-sidebar"
          tabIndex="-1"
          id="offcanvasCarrinho"
        >
          <div className="offcanvas-header sidebar-premium-header">
            <h5 className="offcanvas-title sidebar-premium-title">
              <i className="bi bi-cart3 me-2"></i>
              Seu Carrinho
            </h5>

            <button
              type="button"
              className="btn-close btn-close-white shadow-none"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>

          <div className="offcanvas-body d-flex flex-column justify-content-between">
            <div className="cart-items-wrapper">
              {cartItems.length === 0 ? (
                <div className="cart-empty-state text-center mt-5">
                  <i className="bi bi-bag-x fs-1 mb-3 d-block"></i>
                  <p>Seu carrinho está vazio.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item-card d-flex gap-3">
                    <div className="cart-item-img-container">
                      <img
                        src={item.img || "/logo.png"}
                        alt={item.name || "Produto"}
                        onError={(event) => {
                          event.currentTarget.src = "/logo.png";
                        }}
                      />
                    </div>

                    <div
                      className="d-flex flex-column justify-content-center flex-grow-1"
                      style={{ minWidth: 0 }}
                    >
                      <h6
                        className="cart-item-name m-0 text-truncate"
                        title={item.name}
                      >
                        {item.name}
                      </h6>

                      <span className="cart-item-qty small">
                        Qtd: {item.qty}
                      </span>

                      <span className="cart-item-price mt-1">
                        {(Number(item.price || 0) * Number(item.qty || 1)).toLocaleString(
                          "pt-BR",
                          {
                            style: "currency",
                            currency: "BRL",
                          }
                        )}
                      </span>
                    </div>

                    <button
                      className="btn cart-item-remove-btn p-0 align-self-center"
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      aria-label="Remover produto do carrinho"
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="sidebar-premium-footer">
              <div className="d-flex justify-content-between mb-4 align-items-center mt-3">
                <span className="text-uppercase fw-bold small tracking-label">
                  Subtotal
                </span>

                <span className="sidebar-total-price">
                  {subtotalFormatado}
                </span>
              </div>

              <button
                className="btn btn-premium-checkout w-100 d-flex align-items-center justify-content-center gap-2"
                type="button"
                disabled={cartItems.length === 0}
                data-bs-dismiss={cartItems.length > 0 ? "offcanvas" : undefined}
                onClick={handleCheckout}
              >
                <i className="bi bi-lightning-charge-fill" />
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
