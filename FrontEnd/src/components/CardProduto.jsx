"use client";

import Link from "next/link";
import "./card.css";
import { FALLBACK_IMAGE, getEntityImage, useImageFallback } from "@/utils/imageUrl";

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

  const imagemUrl = getEntityImage(produto);

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
            onError={(event) => useImageFallback(event, FALLBACK_IMAGE)}
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
