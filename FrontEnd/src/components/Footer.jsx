export default function Footer() {
  const termosPdf = "/docs/Termos_de_Uso.pdf";
  const privacidadePdf = "/docs/Politica_de_Privacidade";

  return (
    <footer className="footer-custom text-white">
      <div className="container py-5">
        <div className="row gy-4 justify-content-between">
          {/* Sobre */}
          <div className="col-12 col-md-6 col-lg-4">
            <h3 className="fw-bold mb-3">Atrix Supply</h3>

            <p className="footer-text">
              Performance, qualidade e desempenho em um só lugar.
            </p>
          </div>

          {/* Suporte */}
          <div className="col-6 col-md-3 col-lg-2">
            <h5 className="fw-bold mb-3">Suporte</h5>

            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <a href="/suporte" className="footer-link">
                  Ajuda
                </a>
              </li>

              <li>
                <a
                  href={termosPdf}
                  className="footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Termos
                </a>
              </li>

              <li>
                <a
                  href={privacidadePdf}
                  className="footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Redes */}
          <div className="col-12 col-lg-3">
            <h5 className="fw-bold mb-3">Redes Sociais</h5>

            <div className="d-flex align-items-center gap-3 flex-wrap">
              <a href="#" className="social-icon" aria-label="Instagram">
                <i className="bi bi-instagram" />
              </a>

              <a href="#" className="social-icon" aria-label="Facebook">
                <i className="bi bi-facebook" />
              </a>

              <a href="#" className="social-icon" aria-label="Twitter/X">
                <i className="bi bi-twitter-x" />
              </a>
            </div>
          </div>
        </div>

        <hr className="footer-divider my-4" />

        <div className="text-center">
          <p className="mb-0 footer-copy">
            © 2026 Atrix Supply — Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}