"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";

export default function Perfil() {
  return (
    <div
      className="d-flex justify-content-center align-items-center p-4"
      style={{
        minHeight: "100vh",
        background: `
          radial-gradient(circle at top left, rgba(255,215,120,.05), transparent 25%),
          radial-gradient(circle at bottom right, rgba(192,1,42,.08), transparent 25%),
          linear-gradient(
            145deg,
            #0c0d10 0%,
            #121317 30%,
            #181418 55%,
            #1e1217 100%
          )
        `,
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1080px",
          background: `
            linear-gradient(
              145deg,
              rgba(22,23,27,.96),
              rgba(28,22,25,.96)
            )
          `,
          borderRadius: "28px",
          overflow: "hidden",
          border: "1px solid rgba(255,215,120,.14)",
          boxShadow: `
            0 20px 50px rgba(221, 25, 25, 0.45),
            0 0 30px rgba(235, 194, 13, 0.43)
          `,
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="row g-0">
          {/* LADO ESQUERDO */}
          <div
            className="col-lg-5"
            style={{
              background: `
                linear-gradient(
                  180deg,
                  #ffb300cc,
                  #ff88008c,
                  #f5061e93
                )
              `,
              borderRight:
                "1px solid rgba(255,255,255,.06)",
            }}
          >
            <div
              className="d-flex flex-column align-items-center"
              style={{
                padding: "50px 35px",
              }}
            >
              {/* FOTO */}
              <div
                style={{
                  width: "220px",
                  height: "220px",
                  borderRadius: "24px",
                  overflow: "hidden",
                  position: "relative",
                  border:
                    "3px solid rgba(255,179,0,.75)",
                  boxShadow: `
                    0 15px 35px rgba(0,0,0,.45),
                    0 0 20px rgba(192,1,42,.18)
                  `,
                }}
              >
                <Image
                  src="/core.png"
                  alt="Perfil"
                  fill
                  priority
                  sizes="220px"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* NOME */}
              <div
                className="w-100 mt-4"
                style={{
                  background: "rgba(255,255,255,.03)",
                  border:
                    "1px solid rgba(255,215,120,.12)",
                  borderRadius: "18px",
                  padding: "18px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: "#ffe082",
                    fontWeight: "700",
                    fontSize: "1.35rem",
                    letterSpacing: ".4px",
                  }}
                >
                  Henrique Lopez Vieira
                </p>

                <span
                  style={{
                    color: "rgba(255,255,255,.60)",
                    fontSize: ".92rem",
                  }}
                >
                  Frontend Developer
                </span>
              </div>

              {/* DESCRIÇÃO */}
              <div
                className="w-100 mt-4"
                style={{
                  background: "rgba(255,255,255,.03)",
                  border:
                    "1px solid rgba(192,1,42,.15)",
                  borderRadius: "18px",
                  padding: "28px",
                }}
              >
                <h4
                  style={{
                    color: "#ffcf40",
                    fontWeight: "700",
                    marginBottom: "18px",
                    textAlign: "center",
                    fontSize: "1.35rem",
                  }}
                >
                  Descrição
                </h4>

                <p
                  style={{
                    color: "rgba(255,255,255,.86)",
                    lineHeight: "1.9",
                    fontSize: ".98rem",
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  Desenvolvedor Frontend especializado
                  em interfaces modernas, experiência
                  do usuário e desenvolvimento de
                  aplicações web responsivas utilizando
                  React e Next.js.
                </p>
              </div>
            </div>
          </div>

          {/* LADO DIREITO */}
          <div className="col-lg-7">
            <div
              style={{
                padding: "50px 45px",
              }}
            >
              <h2
                style={{
                  color: "#ee3110",
                  textAlign: "center",
                  fontWeight: "800",
                  marginBottom: "35px",
                  fontSize: "2.1rem",
                  letterSpacing: ".5px",
                }}
              >
                Informações Pessoais
              </h2>

              <div
                style={{
                  background: `
                    linear-gradient(
                      145deg,
                      rgba(29,31,36,.95),
                      rgba(35,22,27,.95)
                    )
                  `,
                  borderRadius: "22px",
                  padding: "38px",
                  border:
                    "1px solid rgba(199, 31, 31, 0.64)",
                  boxShadow:
                    "0 10px 25px rgba(0,0,0,.28)",
                }}
              >
                {/* ITEM */}
                {[
                  {
                    titulo: "Email",
                    cor: "#ffcf40",
                    valor: "henrique.vieira@intel.com",
                  },
                  {
                    titulo: "Empresa",
                    cor: "#ffcf40",
                    valor: "Intel Corporation",
                  },
                  {
                    titulo: "Cargo",
                    cor: "#ffcf40",
                    valor: "Frontend Developer",
                  },
                  {
                    titulo: "Endereço",
                    cor: "#ffcf40",
                    valor: "São Paulo, Brasil",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      paddingBottom: "22px",
                      marginBottom:
                        index !== 3 ? "22px" : "0",
                      borderBottom:
                        index !== 3
                          ? "1px solid rgba(255,255,255,.06)"
                          : "none",
                    }}
                  >
                    <p
                      style={{
                        color: item.cor,
                        marginBottom: "8px",
                        fontWeight: "700",
                        fontSize: ".98rem",
                        textTransform: "uppercase",
                        letterSpacing: ".8px",
                      }}
                    >
                      {item.titulo}
                    </p>

                    <span
                      style={{
                        color: "rgba(255,255,255,.92)",
                        fontSize: "1.05rem",
                        fontWeight: "500",
                      }}
                    >
                      {item.valor}
                    </span>
                  </div>
                ))}
              </div>

              {/* BOTÃO */}
              <div className="d-flex justify-content-center mt-5">
                <button
                  className="btn"
                  style={{
                    background:
                      "linear-gradient(90deg,#ffcf40,#ffb300,#c0012a)",
                    color: "white",
                    padding: "14px 34px",
                    borderRadius: "14px",
                    fontWeight: "700",
                    border: "none",
                    fontSize: ".98rem",
                    letterSpacing: ".3px",
                    boxShadow:
                      "0 10px 22px rgba(192,1,42,.25)",
                  }}
                >
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}