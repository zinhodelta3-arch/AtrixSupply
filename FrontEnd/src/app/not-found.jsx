"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import "bootstrap-icons/font/bootstrap-icons.css";

const pageBackground = `
  radial-gradient(circle at top left, rgba(255,136,0,.14), transparent 28%),
  radial-gradient(circle at 85% 15%, rgba(245,6,29,.12), transparent 24%),
  radial-gradient(circle at bottom right, rgba(192,1,42,.18), transparent 32%),
  linear-gradient(145deg,#050506 0%,#09090b 35%,#130a0f 68%,#1a080d 100%)
`;

const surfaceGradient = `
  linear-gradient(
    145deg,
    rgba(17,17,20,.88),
    rgba(29,17,22,.86)
  )
`;

const buttonGradient = {
  background: "linear-gradient(90deg,#940533,#c0012a,#ff8800)",
  color: "white",
  border: "none",
  borderRadius: "16px",
  fontWeight: "800",
  boxShadow: "none",
};

const ghostButtonStyle = {
  background: "rgba(255,255,255,.045)",
  color: "#ffffff",
  border: "1px solid rgba(255,255,255,.10)",
  borderRadius: "16px",
  fontWeight: "800",
  boxShadow: "none",
};

const particles = [
  { left: "8%", top: "18%", size: 7, delay: 0.1, duration: 7 },
  { left: "18%", top: "76%", size: 5, delay: 0.7, duration: 8 },
  { left: "28%", top: "24%", size: 4, delay: 1.1, duration: 6 },
  { left: "41%", top: "82%", size: 6, delay: 0.4, duration: 9 },
  { left: "54%", top: "16%", size: 5, delay: 1.5, duration: 7 },
  { left: "67%", top: "70%", size: 8, delay: 0.2, duration: 8 },
  { left: "78%", top: "27%", size: 4, delay: 1.0, duration: 6 },
  { left: "90%", top: "64%", size: 6, delay: 0.8, duration: 9 },
  { left: "83%", top: "87%", size: 5, delay: 1.8, duration: 7 },
  { left: "12%", top: "49%", size: 4, delay: 1.3, duration: 8 },
];

const diagnostics = [
  {
    icon: "bi-signpost-split-fill",
    title: "Rota não encontrada",
    text: "O endereço solicitado não existe ou foi movido.",
  },
  {
    icon: "bi-shield-lock-fill",
    title: "Acesso protegido",
    text: "Algumas áreas exigem login ou permissão correta.",
  },
  {
    icon: "bi-compass-fill",
    title: "Redirecionamento seguro",
    text: "Volte para uma rota válida e continue navegando.",
  },
];

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add("atrix-not-found-active");

    return () => {
      document.body.classList.remove("atrix-not-found-active");
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        body.atrix-not-found-active .main-glass-header,
        body.atrix-not-found-active .footer-custom,
        body.atrix-not-found-active header,
        body.atrix-not-found-active footer {
          display: none !important;
        }

        body.atrix-not-found-active {
          overflow-x: hidden;
          background: #050506 !important;
        }
      `}</style>

      <main
        className="position-relative d-flex align-items-center"
        style={{
          minHeight: "100vh",
          background: pageBackground,
          color: "white",
          overflow: "hidden",
          padding: "32px 0",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.72))",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        <motion.div
          aria-hidden="true"
          className="position-absolute"
          initial={{ opacity: 0, scale: 0.85, rotate: -18 }}
          animate={{
            opacity: [0.12, 0.22, 0.12],
            scale: [0.85, 1.02, 0.85],
            rotate: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: "620px",
            height: "620px",
            right: "-180px",
            top: "-170px",
            borderRadius: "50%",
            border: "1px dashed rgba(255,179,0,.22)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <motion.div
          aria-hidden="true"
          className="position-absolute"
          animate={{ rotate: -360 }}
          transition={{
            duration: 42,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: "420px",
            height: "420px",
            left: "-120px",
            bottom: "-130px",
            borderRadius: "50%",
            border: "1px solid rgba(245,6,29,.20)",
            boxShadow: "inset 0 0 90px rgba(192,1,42,.10)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {particles.map((particle, index) => (
          <motion.span
            key={index}
            aria-hidden="true"
            className="position-absolute"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [30, -60, -120],
              x: [0, index % 2 === 0 ? 20 : -20, 0],
              scale: [0.8, 1.2, 0.7],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              borderRadius: "50%",
              background:
                index % 3 === 0
                  ? "#ffb300"
                  : index % 3 === 1
                  ? "#ff8800"
                  : "#f5061d",
              boxShadow: "0 0 18px rgba(255,179,0,.28)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
        ))}

        <div className="container position-relative" style={{ zIndex: 5 }}>
          <div className="row align-items-center justify-content-center g-5">
            <div className="col-12 col-lg-6">
              <motion.section
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="p-4 p-md-5"
                style={{
                  background: surfaceGradient,
                  border: "1px solid rgba(255,255,255,.10)",
                  borderRadius: "34px",
                  boxShadow: "0 28px 90px rgba(0,0,0,.42)",
                  backdropFilter: "blur(22px)",
                  WebkitBackdropFilter: "blur(22px)",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16, duration: 0.55 }}
                  className="d-flex align-items-center gap-3 mb-4"
                >
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "18px",
                      background: "rgba(255,179,0,.12)",
                      border: "1px solid rgba(255,179,0,.22)",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src="/logo.png"
                      alt="Logo Atrix Supply"
                      width={34}
                      height={40}
                      priority
                    />
                  </div>

                  <div>
                    <span
                      className="d-block fw-bold"
                      style={{
                        color: "#ffffff",
                        fontSize: "1.05rem",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      Atrix Supply
                    </span>

                    <span
                      style={{
                        color: "rgba(255,255,255,.56)",
                        fontSize: ".86rem",
                      }}
                    >
                      Sistema de navegação industrial
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24, duration: 0.6 }}
                >
                  <span
                    className="badge mb-4"
                    style={{
                      background: "rgba(255,179,0,.14)",
                      color: "#ffcf40",
                      border: "1px solid rgba(255,179,0,.25)",
                      borderRadius: "999px",
                      padding: "10px 14px",
                      fontWeight: "800",
                    }}
                  >
                    <i className="bi bi-exclamation-octagon-fill me-2" />
                    Erro 404
                  </span>

                  <h1
                    className="fw-bold mb-3"
                    style={{
                      fontSize: "clamp(2.4rem, 6vw, 5.4rem)",
                      lineHeight: 0.92,
                      letterSpacing: "-3px",
                    }}
                  >
                    Rota fora do{" "}
                    <span
                      style={{
                        background:
                          "linear-gradient(90deg,#ffcf40,#ff9d00,#f5061d)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      eixo
                    </span>
                  </h1>

                  <p
                    className="mb-4"
                    style={{
                      color: "rgba(255,255,255,.68)",
                      fontSize: "1.05rem",
                      lineHeight: 1.8,
                      maxWidth: "620px",
                    }}
                  >
                    A página que você tentou acessar não foi encontrada no mapa
                    operacional. Pode ter sido removida, renomeada ou digitada
                    com uma rota inválida.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.34, duration: 0.6 }}
                  className="d-flex flex-wrap gap-3"
                >
                  <Link
                    href="/"
                    className="btn d-inline-flex align-items-center gap-2 px-4 py-3"
                    style={{
                      ...buttonGradient,
                      textDecoration: "none",
                    }}
                  >
                    <i className="bi bi-house-door-fill" />
                    Voltar para o início
                  </Link>

                  <Link
                    href="/produtos"
                    className="btn d-inline-flex align-items-center gap-2 px-4 py-3"
                    style={{
                      ...ghostButtonStyle,
                      textDecoration: "none",
                    }}
                  >
                    <i className="bi bi-box-seam-fill" />
                    Ver produtos
                  </Link>

                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="btn d-inline-flex align-items-center gap-2 px-4 py-3"
                    style={ghostButtonStyle}
                  >
                    <i className="bi bi-arrow-left-circle-fill" />
                    Voltar
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.46, duration: 0.6 }}
                  className="row g-3 mt-4"
                >
                  {diagnostics.map((item, index) => (
                    <div className="col-12 col-md-4" key={item.title}>
                      <motion.div
                        whileHover={{
                          y: -5,
                          borderColor: "rgba(255,179,0,.26)",
                          backgroundColor: "rgba(255,255,255,.055)",
                        }}
                        transition={{ duration: 0.22 }}
                        className="h-100 p-3"
                        style={{
                          background: "rgba(255,255,255,.035)",
                          border: "1px solid rgba(255,255,255,.07)",
                          borderRadius: "20px",
                        }}
                      >
                        <i
                          className={`bi ${item.icon} d-block mb-3`}
                          style={{
                            color:
                              index === 0
                                ? "#ff758f"
                                : index === 1
                                ? "#ffcf40"
                                : "#8ab4ff",
                            fontSize: "1.35rem",
                          }}
                        />

                        <h6 className="fw-bold mb-2" style={{ color: "#ffffff" }}>
                          {item.title}
                        </h6>

                        <p
                          className="mb-0"
                          style={{
                            color: "rgba(255,255,255,.52)",
                            fontSize: ".84rem",
                            lineHeight: 1.6,
                          }}
                        >
                          {item.text}
                        </p>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </motion.section>
            </div>

            <div className="col-12 col-lg-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.85, rotateX: 18 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.18,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="position-relative mx-auto"
                style={{
                  maxWidth: "560px",
                  minHeight: "540px",
                }}
              >
                <motion.div
                  aria-hidden="true"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 26,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="position-absolute top-50 start-50 translate-middle"
                  style={{
                    width: "430px",
                    height: "430px",
                    borderRadius: "50%",
                    border: "1px dashed rgba(255,179,0,.28)",
                    zIndex: 1,
                  }}
                />

                <motion.div
                  aria-hidden="true"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 34,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="position-absolute top-50 start-50 translate-middle"
                  style={{
                    width: "310px",
                    height: "310px",
                    borderRadius: "50%",
                    border: "1px solid rgba(245,6,29,.22)",
                    zIndex: 1,
                  }}
                />

                <motion.div
                  initial={{ y: 0 }}
                  animate={{
                    y: [-10, 12, -10],
                    rotate: [-1.5, 1.5, -1.5],
                  }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="position-absolute top-50 start-50 translate-middle text-center"
                  style={{
                    width: "100%",
                    zIndex: 3,
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(7rem, 18vw, 12rem)",
                      lineHeight: 0.8,
                      fontWeight: 950,
                      letterSpacing: "-10px",
                      background:
                        "linear-gradient(135deg,#ffcf40 0%,#ff8800 35%,#c0012a 70%,#940533 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: "drop-shadow(0 28px 40px rgba(0,0,0,.46))",
                    }}
                  >
                    404
                  </div>

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "min(320px, 72vw)" }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="mx-auto mt-4"
                    style={{
                      height: "2px",
                      background:
                        "linear-gradient(90deg,transparent,#ffcf40,#f5061d,transparent)",
                    }}
                  />

                  <p
                    className="mt-4 mb-0 mx-auto"
                    style={{
                      color: "rgba(255,255,255,.62)",
                      maxWidth: "380px",
                      lineHeight: 1.8,
                    }}
                  >
                    Núcleo de navegação interrompido. Recalculando uma rota
                    segura para continuar sua operação.
                  </p>
                </motion.div>

                <motion.div
                  aria-hidden="true"
                  className="position-absolute"
                  animate={{
                    y: [-8, 10, -8],
                    rotate: [0, 8, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    top: "70px",
                    left: "36px",
                    width: "92px",
                    height: "92px",
                    borderRadius: "24px",
                    background: "rgba(255,179,0,.08)",
                    border: "1px solid rgba(255,179,0,.16)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <i
                    className="bi bi-gear-wide-connected"
                    style={{
                      color: "#ffcf40",
                      fontSize: "2.2rem",
                      position: "absolute",
                      inset: 0,
                      display: "grid",
                      placeItems: "center",
                    }}
                  />
                </motion.div>

                <motion.div
                  aria-hidden="true"
                  className="position-absolute"
                  animate={{
                    y: [12, -10, 12],
                    rotate: [0, -10, 0],
                  }}
                  transition={{
                    duration: 6.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    right: "48px",
                    bottom: "88px",
                    width: "104px",
                    height: "104px",
                    borderRadius: "28px",
                    background: "rgba(245,6,29,.08)",
                    border: "1px solid rgba(245,6,29,.16)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <i
                    className="bi bi-exclamation-diamond-fill"
                    style={{
                      color: "#ff758f",
                      fontSize: "2.25rem",
                      position: "absolute",
                      inset: 0,
                      display: "grid",
                      placeItems: "center",
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}