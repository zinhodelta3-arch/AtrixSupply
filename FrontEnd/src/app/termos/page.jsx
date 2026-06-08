export default function TermosPage() {
  return (
    <main
      className="text-white"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(255,136,0,.12), transparent 28%), linear-gradient(145deg,#08080a,#111116,#180d12)",
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
          <span className="badge bg-warning text-dark mb-3">Documento legal</span>
          <h1 className="fw-bold mb-3">Termos de Uso</h1>
          <p style={{ color: "rgba(255,255,255,.72)" }}>
            Consulte as regras de uso da plataforma Atrix Supply, incluindo cadastro,
            compras, encomendas, suporte e responsabilidades dos usuários.
          </p>
          <a
            className="btn fw-bold mt-3"
            href="/docs/Termos_de_Uso.pdf"
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
            Abrir PDF dos termos
          </a>
        </div>
      </section>
    </main>
  );
}
