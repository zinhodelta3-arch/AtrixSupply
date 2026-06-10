import Link from "next/link";

export default function Footer() {
  const termosPdf = "/docs/Termos_de_Servico_ATRIX_SUPPLY_texto.pdf";
  const privacidadePdf = "/docs/Termos_de_Privacidade.pdf";

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
                <Link href="/suporte" className="footer-link">
                  Ajuda
                </Link>
              </li>

              <li>
                <Link
                  href={termosPdf}
                  className="footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Termos
                </Link>
              </li>

              <li>
                <Link
                  href={privacidadePdf}
                  className="footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes */}
          <div className="col-12 col-lg-3">
            <h5 className="fw-bold mb-3">Redes Sociais</h5>

            <div className="d-flex align-items-center gap-3 flex-wrap">
              <a href="https://www.instagram.com/" className="social-icon" aria-label="Instagram" target="_blank">
                <i className="bi bi-instagram" />
              </a>

              <a href="https://www.facebook.com/" className="social-icon" aria-label="Facebook" target="_blank">
                <i className="bi bi-facebook" />
              </a>

              <a href="https://x.com/" className="social-icon" aria-label="Twitter/X" target="_blank">
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