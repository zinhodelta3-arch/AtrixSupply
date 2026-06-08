"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [notificacoes, setNotificacoes] = useState([]);

  const tipoUsuario = normalizarTipoUsuario(usuario);
  const nomeUsuario = obterNomeUsuario(usuario);

  const usuarioLogado = Boolean(usuario);
  const usuarioFornecedor =
    tipoUsuario === "fornecedor" ||
    tipoUsuario === "fornecedores" ||
    tipoUsuario === "supplier";
  const usuarioComum = tipoUsuario === "comum" || tipoUsuario === "cliente";
  const exibirLinksCliente = !usuarioLogado || usuarioComum;
  const exibirCarrinho = usuarioLogado && usuarioComum;
  const exibirOpcoesFornecedor = usuarioLogado && usuarioFornecedor;
  const notificacoesNaoLidas = notificacoes.filter((item) => !item.lida).length;

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

  const carregarUsuarioDoStorage = () => {
    try {
      const usuarioStorage = localStorage.getItem("usuario");

      if (usuarioStorage) {
        const userParsed = JSON.parse(usuarioStorage);
        setUsuario(userParsed || null);
      } else {
        setUsuario(null);
      }
    } catch (error) {
      console.error("Erro ao ler dados do usuário:", error);
      setUsuario(null);
    } finally {
      setLoading(false);
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
    if (!notificacao?.id_notificacao || notificacao.lida) return;

    const token = obterTokenLocal();

    try {
      await fetch(`${NOTIFICACOES_URL}/${notificacao.id_notificacao}/lida`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotificacoes((atuais) =>
        atuais.map((item) =>
          item.id_notificacao === notificacao.id_notificacao
            ? { ...item, lida: 1 }
            : item
        )
      );
    } catch (error) {
      // Mantem a notificacao como nao lida para nova tentativa.
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
                  <button className="cart-btn" type="button" aria-label="Notificações">
                    <i className="bi bi-bell"></i>

                    {notificacoesNaoLidas > 0 && (
                      <span className="cart-badge">{notificacoesNaoLidas}</span>
                    )}
                  </button>

                  <div className="profile-dropdown" style={{ minWidth: "280px" }}>
                    <span
                      style={{
                        padding: "10px 15px",
                        display: "block",
                        fontWeight: "bold",
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      Notificações
                    </span>

                    {notificacoes.length === 0 ? (
                      <span style={{ padding: "10px 15px", display: "block" }}>
                        Nenhuma notificação.
                      </span>
                    ) : (
                      notificacoes.map((notificacao) => (
                        <button
                          key={notificacao.id_notificacao}
                          type="button"
                          onClick={() => marcarNotificacaoLida(notificacao)}
                          style={{
                            width: "100%",
                            textAlign: "left",
                            background: notificacao.lida ? "transparent" : "rgba(255,136,0,0.10)",
                            border: "none",
                            color: "inherit",
                            padding: "10px 15px",
                          }}
                        >
                          <strong style={{ display: "block" }}>{notificacao.titulo}</strong>
                          <small>{notificacao.mensagem}</small>
                        </button>
                      ))
                    )}

                    <Link href="/notificacoes">Ver todas</Link>
                  </div>
                </div>
              )}

              <div className="profile-wrapper">
                <div className="profile-btn">
                  <i className="bi bi-person-fill"></i>
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
                  <Link className="nav-link" href="/produtos">
                    Produtos
                  </Link>
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
