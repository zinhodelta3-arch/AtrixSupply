import Link from "next/link";
import "./card.css"
export default function CardProduto({ produto }) {
  return (
    <div className="col-md-6 col-lg-3">
      <Link
        href={`/produtos/${produto.id_produto}`}
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
            src={produto.imagem || "/placeholder.png"}
            className="card-img-top"
            alt={produto.nome_produto}
            style={{
              height: "220px",
              objectFit: "cover",
            }}
          />

          <div className="card-body d-flex flex-column">
            <h5 className="card-title text-white fw-bold">
              {produto.nome}
            </h5>

            <p
              className="card-text mt-2"
              style={{
                color: "#cfcfcf",
              }}
            >
              {produto.descricao}
            </p>

            <p
              className="card-text mt-2 tam"
              style={{
                color: "#ffee8b",
              }}
            >
              {produto.categoria}
            </p>

            <p
              className="card-text mt-2 fw-bold"
              style={{
                color: "#5ba100dc",
              }}
            >
              {produto.preco}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}