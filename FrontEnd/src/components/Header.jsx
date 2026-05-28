"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  // Carrega o pacote JS do Bootstrap apenas no lado do cliente (evita erros de SSR no Next.js)
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  // ESTADO DO CARRINHO: Gerencia a lista de produtos com IDs únicos para a remoção funcionar
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "RTX 4090 ASUS ROG STRIX", qty: 1, price: 12499.90, img: "/fixadores.png" },
    { id: 2, name: "RTX 4090 ASUS ROG STRIX", qty: 1, price: 12499.90, img: "/fixadores.png" },
    { id: 3, name: "RTX 4090 ASUS ROG STRIX", qty: 1, price: 12499.90, img: "/fixadores.png" },
    { id: 4, name: "RTX 4090 ASUS ROG STRIX", qty: 1, price: 12499.90, img: "/fixadores.png" },
    { id: 5, name: "RTX 4090 ASUS ROG STRIX", qty: 1, price: 12499.90, img: "/fixadores.png" },
    { id: 6, name: "RTX 4090 ASUS ROG STRIX", qty: 1, price: 12499.90, img: "/fixadores.png" },
    { id: 7, name: "RTX 4090 ASUS ROG STRIX", qty: 1, price: 12499.90, img: "/fixadores.png" },
    { id: 8, name: "RTX 4090 ASUS ROG STRIX", qty: 1, price: 12499.90, img: "/fixadores.png" },
  ]);

  // FUNÇÃO PARA REMOVER UM PRODUTO ESPECÍFICO PELO ID
  const handleRemoveItem = (idToRemove) => {
    setCartItems(cartItems.filter(item => item.id !== idToRemove));
  };

  // CÁLCULO DO VALOR TOTAL DO CARRINHO
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const subtotalFormatado = subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <>
      {/* ==========================================================================
          NAVBAR PRINCIPAL (GLASSMORPHISM)
          ========================================================================== */}
      <header>
        <nav className="glass-navbar navbar navbar-expand-lg p-0">
          <div className="container position-relative d-flex align-items-center justify-content-between">
            
            {/* LADO ESQUERDO: Logo e Nome da Marca */}
            <div className="d-flex align-items-center gap-2">
              <Link className="navbar-brand-premium d-flex align-items-center gap-2 text-decoration-none" href="/">
                <img src="/logo.png" className="photoLogo" alt="Logo Atrix Supply" />
                <span>Atrix Supply</span>
              </Link>
            </div>

            {/* LADO DIREITO: Carrinho, Perfil e Hamburguer Mobile */}
            <div className="d-flex align-items-center gap-3 order-lg-3">
              
              {/* BOTÃO DO CARRINHO (Dispara a aba lateral) */}
              <div className="cart-wrapper">
                <button 
                  className="cart-btn" 
                  type="button"
                  data-bs-toggle="offcanvas" 
                  data-bs-target="#offcanvasCarrinho"
                  aria-controls="offcanvasCarrinho"
                >
                  <i className="bi bi-cart3"></i>
                  {/* Badge numérico dinâmico */}
                  {cartItems.length > 0 && (
                    <span className="cart-badge">{cartItems.length}</span>
                  )}
                </button>
              </div>

              {/* BOTÃO DO PERFIL + DROPDOWN NO HOVER */}
              <div className="profile-wrapper">
                <div className="profile-btn">
                  <i className="bi bi-person-fill"></i>
                </div>
                <div className="profile-dropdown">
                  <Link href="/login">Entrar</Link>
                  <Link href="/cadastro">Cadastrar</Link>
                </div>
              </div>

              {/* BOTÃO HAMBURGUER (Aparece apenas em telas menores) */}
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

            {/* CENTRO: Links de Navegação Principal */}
            <div className="collapse navbar-collapse order-lg-2" id="navbarNav">
              <ul className="navbar-nav navbar-center gap-lg-4">
                <li className="nav-item">
                  <Link className="nav-link" href="/produtos">Produtos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/pedidos">Pedidos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/encomendas">Encomendas</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/logistica">Logística</Link>
                </li>
              </ul>
            </div>

          </div>
        </nav>
      </header>

      {/* ==========================================================================
          ABA LATERAL DO CARRINHO (OFFCANVAS PREMIUM)
          ========================================================================== */}
      <div 
        className="offcanvas offcanvas-end custom-cart-sidebar" 
        tabIndex="-1" 
        id="offcanvasCarrinho" 
        aria-labelledby="offcanvasCarrinhoLabel"
      >
        {/* TOPO DA ABA */}
        <div className="offcanvas-header sidebar-premium-header">
          <h5 className="offcanvas-title sidebar-premium-title" id="offcanvasCarrinhoLabel">
            <i className="bi bi-cart3 me-2"></i> Seu Carrinho
          </h5>
          <button 
            type="button" 
            className="btn-close btn-close-white shadow-none" 
            data-bs-dismiss="offcanvas" 
            aria-label="Close"
          ></button>
        </div>
        
        {/* CORPO DA ABA */}
        <div className="offcanvas-body d-flex flex-column justify-content-between">
          
          {/* Lista de Produtos (Rolável caso tenha muitos itens) */}
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
                  
                  <div className="d-flex flex-column justify-content-center flex-grow-1">
                    <h6 className="cart-item-name m-0 text-truncate">{item.name}</h6>
                    <span className="cart-item-qty text-muted small">Quantidade: {item.qty}</span>
                    <span className="cart-item-price mt-1">
                      {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                  
                  {/* BOTÃO DE REMOVER O PRODUTO */}
                  <button 
                    className="btn cart-item-remove-btn p-0 align-self-center" 
                    type="button"
                    title="Remover item"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              ))
            )}

          </div>

          {/* RODAPÉ DO CARRINHO (Valores e Ação) */}
          <div className="sidebar-premium-footer">
            <div className="d-flex justify-content-between mb-4 align-items-center">
              <span className="text-muted text-uppercase fw-bold small tracking-label">Subtotal</span>
              <span className="sidebar-total-price">{subtotalFormatado}</span>
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

      {/* Espaçador de segurança para o conteúdo da página não sumir sob a barra fixa */}
      <div className="navbar-spacer"></div>
    </>
  );
}