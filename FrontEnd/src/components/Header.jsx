"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ALERT_PRODUTO_ADICIONADO = "Produto adicionado com sucesso!";

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

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const tipoUsuario = normalizarTipoUsuario(usuario);
  const nomeUsuario = obterNomeUsuario(usuario);

  const usuarioLogado = Boolean(usuario);
  const usuarioFornecedor = tipoUsuario === "fornecedor" || tipoUsuario === "supplier";
  const usuarioComum = tipoUsuario === "comum";
  const usuarioSemTipo = usuarioLogado && !tipoUsuario;

  const exibirLinksCliente = !usuarioLogado || usuarioComum || usuarioSemTipo;
  const exibirCarrinho = usuarioLogado && (usuarioComum || usuarioSemTipo);
  const exibirOpcoesFornecedor = usuarioLogado && usuarioFornecedor;

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

  const atualizarDadosLocais = () => {
    carregarUsuarioDoStorage();
    atualizarCarrinhoDoStorage();
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    import("bootstrap/dist/js/bootstrap.bundle.min.js");

    const alertOriginal = window.alert;

    const alertFiltrado = (mensagem) => {
      if (String(mensagem).trim() === ALERT_PRODUTO_ADICIONADO) {
        return;
      }

      alertOriginal.call(window, mensagem);
    };

    window.alert = alertFiltrado;

    atualizarDadosLocais();

    window.addEventListener("carrinhoAtualizado", atualizarCarrinhoDoStorage);
    window.addEventListener("storage", atualizarDadosLocais);

    return () => {
      window.removeEventListener("carrinhoAtualizado", atualizarCarrinhoDoStorage);
      window.removeEventListener("storage", atualizarDadosLocais);

      if (window.alert === alertFiltrado) {
        window.alert = alertOriginal;
      }
    };
  }, [pathname]);

  const handleLogout = (event) => {
    event.preventDefault();

    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("jwt");

    setUsuario(null);
    setCartItems([]);

    router.push("/login");
  };

  const handleRemoveItem = (idToRemove) => {
    const novoCarrinho = cartItems.filter((item) => item.id !== idToRemove);

    setCartItems(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));

    window.dispatchEvent(new Event("carrinhoAtualizado"));
  };

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

                    {cartItems.length > 0 && (
                      <span className="cart-badge">
                        {cartItems.length}
                      </span>
                    )}
                  </button>
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
                {exibirLinksCliente && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" href="/produtos">
                        Produtos
                      </Link>
                    </li>

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
                <div className="text-center text-muted mt-5">
                  <i className="bi bi-bag-x fs-1 mb-3 d-block"></i>
                  <p>Seu carrinho está vazio.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item-card d-flex gap-3">
                    <div className="cart-item-img-container">
                      <img src={item.img} alt={item.name} />
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

                      <span className="cart-item-qty text-muted small">
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
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="sidebar-premium-footer">
              <div className="d-flex justify-content-between mb-4 align-items-center mt-3">
                <span className="text-muted text-uppercase fw-bold small tracking-label">
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