import Image from "next/image";


export default function Footer(){
    return(
        <>
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
            <a href="suporte" className="footer-link">
              Ajuda
            </a>
          </li>
          <li>
            <a href="#" className="footer-link">
              Termos
            </a>
          </li>
          <li>
            <a href="#" className="footer-link">
              Privacidade
            </a>
          </li>
        </ul>
      </div>
      {/* Redes */}
      <div className="col-12 col-lg-3">
        <h5 className="fw-bold mb-3">Redes Sociais</h5>
        <div className="d-flex align-items-center gap-3 flex-wrap">
          <a href="#" className="social-icon">
            <i className="bi bi-instagram" />
          </a>
          <a href="#" className="social-icon">
            <i className="bi bi-facebook" />
          </a>
          <a href="#" className="social-icon">
            <i className="bi bi-twitter-x" />
          </a>
        </div>
      </div>
    </div>
    {/* Linha */}
    <hr className="footer-divider my-4" />
    {/* Copyright */}
    <div className="text-center">
      <p className="mb-0 footer-copy">
        © 2026 Atrix Center — Todos os direitos reservados.
      </p>
    </div>
  </div>
</footer>
        </>
    )
}