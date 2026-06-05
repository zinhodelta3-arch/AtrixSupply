"use client";

import Link from "next/link";
import "./card.css";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
const FALLBACK_IMAGE = "/logo.png";

function obterImagemProduto(produto) {
  return (
    produto?.imagem ||
    produto?.imagem_produto ||
    produto?.url_imagem ||
    produto?.imagem_url ||
    produto?.foto ||
    produto?.img ||
    produto?.image ||
    ""
  );
}

function limparCaminhoImagem(imagem) {
  return String(imagem || "")
    .trim()
    .replaceAll("\\", "/")
    .replace(/^\/+/, "");
}

function montarImagemPrincipal(imagem) {
  const valorOriginal = String(imagem || "").trim().replaceAll("\\", "/");

  if (!valorOriginal) {
    return FALLBACK_IMAGE;
  }

  if (
    valorOriginal.startsWith("http://") ||
    valorOriginal.startsWith("https://") ||
    valorOriginal.startsWith("data:image")
  ) {
    return valorOriginal;
  }

  if (valorOriginal.startsWith("/uploads/")) {
    return `${API_URL}${valorOriginal}`;
  }

  if (valorOriginal.startsWith("uploads/")) {
    return `${API_URL}/${valorOriginal}`;
  }

  if (valorOriginal.startsWith("/")) {
    return `${API_URL}${valorOriginal}`;
  }

  const valorLimpo = limparCaminhoImagem(valorOriginal);
  const nomeArquivo = valorLimpo.split("/").pop();

  if (!nomeArquivo) {
    return FALLBACK_IMAGE;
  }

  return `${API_URL}/uploads/imagens/${encodeURIComponent(nomeArquivo)}`;
}

function formatarPreco(valor) {
  const numero = Number(valor || 0);

  if (Number.isNaN(numero)) return valor;

  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarCategoria(categoria) {
  if (!categoria) return "Sem categoria";

  return String(categoria)
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letra) => letra.toUpperCase());
}

export default function CardProduto({ produto }) {
  const idProduto = produto?.id_produto || produto?.id;
  const nomeProduto = produto?.nome_produto || produto?.nome || "Produto sem nome";

  const imagemOriginal = obterImagemProduto(produto);
  const imagemUrl = montarImagemPrincipal(imagemOriginal);

  function usarFallback(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = FALLBACK_IMAGE;
  }

  return (
    <div className="col-md-6 col-lg-3">
      <Link
        href={idProduto ? `/produtos/${idProduto}` : "/produtos"}
        style={{ textDecoration: "none" }}
      >
        <div
          className="borda amplia card h-100 border-0 shadow-lg overflow-hidden"
          style={{
            background: "#111",
            transition: "0.3s",
            border: "1px solid rgba(199, 68, 68, 0.14)",
          }}
        >
          <img
            src={imagemUrl}
            className="card-img-top"
            alt={nomeProduto}
            loading="lazy"
            onError={usarFallback}
            style={{
              width: "100%",
              height: "220px",
              objectFit: "cover",
              background: "#09090b",
            }}
          />

          <div className="card-body d-flex flex-column">
            <h5
              className="card-title fw-bold mb-2"
              style={{
                color: "#ffffff",
                fontSize: "1.05rem",
                lineHeight: "1.35",
              }}
            >
              {nomeProduto}
            </h5>

            <p
              className="card-text mt-1 mb-3"
              style={{
                color: "#cfcfcf",
                fontSize: ".95rem",
                lineHeight: "1.55",
              }}
            >
              {produto?.descricao || "Produto sem descrição."}
            </p>

            <p
              className="card-text mt-auto tam"
              style={{
                color: "#ffee8b",
                fontSize: ".82rem",
                fontWeight: "700",
                textTransform: "capitalize",
              }}
            >
              {formatarCategoria(produto?.categoria)}
            </p>

            <p
              className="card-text mt-2 fw-bold"
              style={{
                color: "#5ba100dc",
                fontSize: "1rem",
              }}
            >
              {formatarPreco(produto?.preco)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}