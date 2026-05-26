"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Image from "next/image";
import { useState } from "react";

export default function Compra() {
  const [quantidade, setQuantidade] = useState(1);

  const produto = {
    nome: "RTX 4090 ASUS ROG STRIX",
    preco: 12499.9,
    parcela: "12x de R$ 1.041,65",
    estoque: "Em estoque",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `
          radial-gradient(circle at top left, rgba(224, 179, 73, 0.06), transparent 25%),
          radial-gradient(circle at bottom right, rgba(252, 29, 77, 0.1), transparent 25%),
          linear-gradient(
            145deg,
            #0c0d10 0%,
            #121317 30%,
            #181418 55%,
            #57271ea1 100%
          )
        `,
        overflow: "hidden",
        color: "white",
      }}
    >
      {/* HEADER */}
      <div
        className="d-flex justify-content-center align-items-center px-4 px-lg-5 py-4"
        style={{
          borderBottom: "1px solid rgba(221, 25, 25, 0.05)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="d-flex align-items-center">
          <span
            style={{
              fontSize: "2rem",
              fontWeight: "800",
              letterSpacing: "1px",
              background:
                "linear-gradient(90deg,#ffcf40,#ff9d00,#c0012a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter:
                "drop-shadow(0 0 12px rgba(255,179,0,.22))",
            }}
          >
        
          </span>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="container-fluid px-4 px-lg-5 py-5">
        <div className="row g-4">
          {/* ESQUERDA */}
          <div className="col-lg-6">
            <div
              style={{
                background: `
                  linear-gradient(
                    145deg,
                    rgba(22,23,27,.96),
                    rgba(28,22,25,.96)
                  )
                `,
                borderRadius: "32px",
                padding: "30px",
                border:
                  "1px solid rgba(255,215,120,.10)",
                boxShadow: `
                  0 25px 60px rgba(221,25,25,.20),
                  0 0 25px rgba(235,194,13,.08)
                `,
                overflow: "hidden",
                height: "100%",
              }}
            >
              {/* IMAGEM */}
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  height: "520px",
                  position: "relative",
                }}
              >
                <Image
                  src="/fixadores.png"
                  alt="Produto"
                  fill
                  priority
                  style={{
                    objectFit: "contain",
                    padding: "30px",
                    filter:
                      "drop-shadow(0 25px 40px rgba(0,0,0,.55))",
                  }}
                />
              </div>

              {/* DESCRIÇÃO */}
              <div
                style={{
                  marginTop: "15px",
                  background: "rgba(255,255,255,.03)",
                  border:
                    "1px solid rgba(255,255,255,.05)",
                  borderRadius: "24px",
                  padding: "28px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <h4
                  style={{
                    color: "#ffcf40",
                    fontWeight: "700",
                    marginBottom: "18px",
                    fontSize: "1.25rem",
                  }}
                >
                  Sobre o Produto
                </h4>

                <p
                  style={{
                    color: "rgba(255,255,255,.78)",
                    lineHeight: "1.95",
                    margin: 0,
                    fontSize: ".98rem",
                  }}
                >
                  Os Fixadores oferecem
                  desempenho extremo para jogos,
                  edição profissional, modelagem 3D e
                  aplicações avançadas. Sua
                  arquitetura moderna garante gráficos
                  ultra realistas, ray tracing em
                  tempo real e máxima estabilidade
                  mesmo sob altas cargas de uso.
                </p>
              </div>
            </div>
          </div>

          {/* DIREITA */}
          <div className="col-lg-6">
            <div
              style={{
                background: `
                  linear-gradient(
                    145deg,
                    rgba(22,23,27,.96),
                    rgba(28,22,25,.96)
                  )
                `,
                borderRadius: "32px",
                padding: "42px",
                border:
                  "1px solid rgba(255,215,120,.10)",
                boxShadow: `
                  0 25px 60px rgba(221,25,25,.18),
                  0 0 25px rgba(235,194,13,.06)
                `,
                height: "100%",
              }}
            >
              {/* CATEGORIA */}
              <span
                style={{
                  color: "#ffcf40",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  fontWeight: "700",
                  fontSize: ".82rem",
                }}
              >
                Categoria
              </span>

              {/* TITULO */}
              <h1
                style={{
                  marginTop: "18px",
                  fontSize: "3rem",
                  fontWeight: "800",
                  lineHeight: "1.1",
                }}
              >
                {produto.nome}
              </h1>

              {/* PREÇO */}
              <div className="mt-5">
                <h2
                  style={{
                    color: "#ffe082",
                    fontWeight: "800",
                    fontSize: "3rem",
                    marginBottom: "10px",
                  }}
                >
                  {produto.preco.toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    }
                  )}
                </h2>

                <p
                  style={{
                    color: "rgba(255,255,255,.55)",
                    marginBottom: "8px",
                  }}
                >
                  {produto.parcela}
                </p>

                <span
                  style={{
                    color: "#5cff95",
                    fontWeight: "700",
                  }}
                >
                  <i className="bi bi-check-circle-fill me-2" />
                  {produto.estoque}
                </span>
              </div>

              {/* QUANTIDADE */}
              <div className="mt-5">
                <p
                  style={{
                    color: "#ffcf40",
                    fontWeight: "700",
                    marginBottom: "16px",
                    textTransform: "uppercase",
                    letterSpacing: ".7px",
                    fontSize: ".82rem",
                  }}
                >
                  Quantidade
                </p>

                <div
                  className="d-flex align-items-center"
                  style={{
                    width: "fit-content",
                    background:
                      "rgba(255,255,255,.03)",
                    border:
                      "1px solid rgba(255,255,255,.05)",
                    borderRadius: "18px",
                    overflow: "hidden",
                  }}
                >
                  <button
                    className="btn"
                    onClick={() =>
                      quantidade > 1 &&
                      setQuantidade(quantidade - 1)
                    }
                    style={{
                      width: "58px",
                      height: "58px",
                      border: "none",
                      color: "white",
                    }}
                  >
                    <i className="bi bi-dash-lg" />
                  </button>

                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      width: "75px",
                      fontWeight: "700",
                      fontSize: "1.15rem",
                    }}
                  >
                    {quantidade}
                  </div>

                  <button
                    className="btn"
                    onClick={() =>
                      setQuantidade(quantidade + 1)
                    }
                    style={{
                      width: "58px",
                      height: "58px",
                      border: "none",
                      color: "white",
                    }}
                  >
                    <i className="bi bi-plus-lg" />
                  </button>
                </div>
              </div>

              {/* BOTÃO */}
              <div className="mt-5">
                <button
                  className="btn w-100"
                  style={{
                    background:
                      "linear-gradient(90deg,#ffcf40,#ff9d00,#c0012a)",
                    color: "white",
                    border: "none",
                    padding: "18px",
                    borderRadius: "18px",
                    fontWeight: "700",
                    fontSize: "1.05rem",
                    letterSpacing: ".4px",
                    boxShadow:
                      "0 14px 28px rgba(192,1,42,.24)",
                  }}
                >
                  <i className="bi bi-lightning-charge-fill me-2" />
                  Adicionar ao carrinho
                </button>
              </div>

              {/* INFORMAÇÕES */}
              <div
                className="d-flex flex-column gap-3 mt-5"
              >
                {[
                  "Entrega rápida para todo Brasil",
                  "Garantia oficial de 12 meses",
                  "Pagamento seguro e criptografado",
                ].map((texto, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center gap-3"
                    style={{
                      background:
                        "rgba(218, 123, 123, 0.03)",
                      border:
                        "1px solid rgba(255,255,255,.05)",
                      borderRadius: "16px",
                      padding: "16px 18px",
                      color:
                        "rgba(255,255,255,.75)",
                    }}
                  >
                    <i
                      className="bi bi-shield-check"
                      style={{
                        color: "#ffcf40",
                        fontSize: "1.1rem",
                      }}
                    />

                    <span>{texto}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}