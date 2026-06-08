export default function PrivacidadePage() {
  return (
    <main
      className="text-white"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, rgba(192,1,42,.16), transparent 30%), linear-gradient(145deg,#08080a,#111116,#180d12)",
        padding: "120px 0 70px",
      }}
    >
      <section className="container">
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background: "rgba(17,17,17,.96)",
            border: "1px solid rgba(255,255,255,.10)",
            borderRadius: "30px",
            padding: "38px",
          }}
        >
          <span className="badge bg-warning text-dark mb-3">Privacidade</span>
          <h1 className="fw-bold mb-3">Política de Privacidade</h1>
          <p style={{ color: "rgba(255,255,255,.72)" }}>
            Veja como a Atrix Supply trata dados de cadastro, pedidos, encomendas,
            suporte e comunicação dentro da plataforma.
          </p>
          <a
            className="btn fw-bold mt-3"
            href="/docs/Politica_de_Privacidade.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "linear-gradient(90deg,#940533,#c0012a,#ff8800)",
              color: "white",
              border: "none",
              borderRadius: "14px",
              padding: "12px 18px",
            }}
          >
            Abrir PDF da política
          </a>
        </div>
      </section>
    </main>
  );
}
