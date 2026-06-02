"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Importado usePathname
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname(); // Ativado para monitorar a troca de páginas
  
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }

    try {
      const usuarioStorage = localStorage.getItem("usuario");
      if (usuarioStorage) {
        const userParsed = JSON.parse(usuarioStorage);
        setUsuario(userParsed);
      } else {
        setUsuario(null); 
      }
    } catch (error) {
      console.error("Erro ao ler dados do usuário:", error);
      setUsuario(null);
    } finally {
      setLoading(false); 
    }
  }, [pathname]); // <<< Roda o efeito toda vez que a URL/página mudar

  const handleLogout = (e) => {
    e.preventDefault(); 
    localStorage.removeItem("usuario");
    setUsuario(null); 
    router.push("/login"); 
  };

  const [cartItems, setCartItems] = useState([
    { 
      id: 1, 
      name: "Parafuso Sextavado de Alta Resistência (M16 x 50mm)", 
      qty: 250, 
      price: 4.50, 
      img: "/engrenagem.png" 
    },
    { 
      id: 2, 
      name: "Engrenagem Helicoidal de Aço Temperado Módulo 3", 
      qty: 4, 
      price: 389.90, 
      img: "/engrenagem.png" 
    },
    { 
      id: 3, 
      name: "Rolamento de Esferas Blindado SKF 6204-2Z", 
      qty: 12, 
      price: 42.80, 
      img: "/engrenagem.png" 
    },
    { 
      id: 4, 
      name: "Porca Autotravante em Aço Inox AISI 316 (M16)", 
      qty: 200, 
      price: 2.10, 
      img: "/engrenagem.png" 
    }
  ]);

  const handleRemoveItem = (idToRemove) => {
    setCartItems(cartItems.filter(item => item.id !== idToRemove));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const subtotalFormatado = subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  if (loading) {
    return null;
  }

  return (
    <>
      <header style={{ background: "transparent", border: "none", boxShadow: "none" }}>
        <nav 
          className="glass-navbar navbar navbar-expand-lg p-0" 
          style={{ background: "transparent", backgroundColor: "transparent" }}
        >
          <div className="container position-relative d-flex align-items-center justify-content-between">
            
            {/* LADO ESQUERDO: Logo */}
            <div className="d-flex align-items-center gap-2">
              <Link className="navbar-brand-premium d-flex align-items-center gap-2 text-decoration-none" href="/">
                <img src="/logo.png" className="photoLogo" alt="Logo Atrix Supply" />
                <span>Atrix Supply</span>
              </Link>
            </div>

            {/* LADO DIREITO: Carrinho, Perfil e Mobile */}
            <div className="d-flex align-items-center gap-3 order-lg-3">
              
              {/* BOTÃO DO CARRINHO */}
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
                    <span className="cart-badge">{cartItems.length}</span>
                  )}
                </button>
              </div>

              {/* BOTÃO DO PERFIL */}
              <div className="profile-wrapper">
                <div className="profile-btn">
                  <i className="bi bi-person-fill"></i>
                </div>
                <div className="profile-dropdown">
                  {!usuario ? (
                    <>
                      <Link href="/login">Entrar</Link>
                      <Link href="/cadastro">Cadastrar</Link>
                    </>
                  ) : (
                    <>
                      {/* Exibe o nome do usuário logado se existir */}
                      {usuario.nome_user && (
                        <span className="dropdown-user-name" style={{ padding: "10px 15px", display: "block", fontWeight: "bold", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                          Olá, {usuario.nome_user}
                        </span>
                      )}
                      <Link href="/perfil">Perfil</Link>
                      <Link onClick={handleLogout} href="#">Logout</Link>
                    </>
                  )}
                </div>
              </div>

              {/* HAMBURGUER (Mobile) */}
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

            {/* CENTRO: Links de Navegação */}
            <div className="collapse navbar-collapse order-lg-2" id="navbarNav">
              <ul className="navbar-nav navbar-center gap-lg-4">
                
                <li className="nav-item">
                  <Link className="nav-link" href="/produtos">Produtos</Link>
                </li>
                
                {/* Se o usuário estiver logado, exibe as opções restritas */}
                {usuario && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" href="/pedidos">Pedidos</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="/encomendas">Encomendas</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="/logistica">Orçamentos</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="/logistica">Logística</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

          </div>
        </nav>
      </header>

      {/* ABA LATERAL DO CARRINHO (OFFCANVAS) */}
      <div className="offcanvas offcanvas-end custom-cart-sidebar" tabIndex="-1" id="offcanvasCarrinho">
        <div className="offcanvas-header sidebar-premium-header">
          <h5 className="offcanvas-title sidebar-premium-title">
            <i className="bi bi-cart3 me-2"></i> Seu Carrinho
          </h5>
          <button type="button" className="btn-close btn-close-white shadow-none" data-bs-dismiss="offcanvas"></button>
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
                  <div className="d-flex flex-column justify-content-center flex-grow-1" style={{ minWidth: 0 }}>
                    <h6 className="cart-item-name m-0 text-truncate" title={item.name}>{item.name}</h6>
                    <span className="cart-item-qty text-muted small">Qtd: {item.qty}</span>
                    <span className="cart-item-price mt-1">
                      {(item.price * item.qty).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                  <button className="btn cart-item-remove-btn p-0 align-self-center" type="button" onClick={() => handleRemoveItem(item.id)}>
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="sidebar-premium-footer">
            <div className="d-flex justify-content-between mb-4 align-items-center mt-3">
              <span className="text-muted text-uppercase fw-bold small tracking-label">Subtotal</span>
              <span className="sidebar-total-price">{subtotalFormatado}</span>
            </div>
            <button className="btn btn-premium-checkout w-100 d-flex align-items-center justify-content-center gap-2" type="button" disabled={cartItems.length === 0}>
              <i className="bi bi-lightning-charge-fill" /> Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </>
  );
}