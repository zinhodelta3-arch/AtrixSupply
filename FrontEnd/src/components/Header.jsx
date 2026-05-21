import Image from "next/image";


export default function Header() {
    return(
        <>
        <header>
         <nav className="glass-navbar">

        <div className="container">

          <div className="navbar navbar-expand-lg p-0 position-relative">

            <img src="logo.png" className="photoLogo" alt="" />

            
           
  <nav className="navbar">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">
        Atrix Supply
      </a>
    </div>
  </nav>



            {/* BUTTON MOBILE */}
            <button
              className="navbar-toggler border-0 shadow-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* NAV */}
            <div
              className="collapse navbar-collapse"
              id="navbarNav"
            >

              {/* LINKS CENTRALIZADOS */}
              <ul className="navbar-nav navbar-center gap-lg-4">

                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Inicio
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Projetos
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Tecnologia
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contato
                  </a>
                </li>

              </ul>

              {/* PERFIL */}
              <div className="ms-auto profile-wrapper">

                <div className="profile-btn">
                  <i className="bi bi-person-fill"></i>
                </div>

                {/* DROPDOWN */}
                <div className="profile-dropdown">

                  <a href="#">
                    Entrar
                  </a>

                  <a href="#">
                    Cadastrar
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

      </nav>
      </header>
        </>
    )
}