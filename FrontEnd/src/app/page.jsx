"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import "./page.css";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
const METRICAS_HOME_PUBLICAS_URL = `${API_URL}/api/public/metricas-home`;

const pageBackground = `
  radial-gradient(circle at top left, rgba(255,136,0,.10), transparent 25%),
  radial-gradient(circle at bottom right, rgba(192,1,42,.16), transparent 30%),
  linear-gradient(145deg,#08080a,#101014,#160d12)
`;

const heroGradient = "linear-gradient(135deg,#940533,#c0012a,#f5061d,#ff8800)";

const surfaceGradient = `
  linear-gradient(
    145deg,
    rgba(17,17,17,.96),
    rgba(25,18,22,.96)
  )
`;

const softSurfaceGradient = `
  linear-gradient(
    145deg,
    rgba(255,255,255,.035),
    rgba(255,255,255,.015)
  )
`;

const serviceCardStyle = {
  background: surfaceGradient,
  borderBottom: "4px solid #f5061d",
  borderLeft: "1px solid rgba(255,255,255,.06)",
  borderRight: "1px solid rgba(255,255,255,.06)",
  borderTop: "1px solid rgba(255,255,255,.06)",
  borderRadius: "22px",
  boxShadow: "none",
};

const productCardStyle = {
  background: surfaceGradient,
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "22px",
  overflow: "hidden",
  boxShadow: "none",
  cursor: "pointer",
  transition: "border-color .22s ease, background .22s ease",
};

const statsCardStyle = {
  background: softSurfaceGradient,
  border: "1px solid rgba(255,255,255,.06)",
  borderRadius: "22px",
  padding: "18px 28px",
  minWidth: "170px",
  boxShadow: "none",
};

const carouselProdutosFixos = [
  {
    titulo: "Fixadores",
    descricao: "Parafusos, porcas, arruelas e sistemas de fixação industrial.",
    imagem: "/fixadores.png",
  },
  {
    titulo: "Engrenagens",
    descricao: "Engrenagens industriais de alta precisão para máquinas e motores.",
    imagem: "/engrenagens.png",
  },
  {
    titulo: "Rolamentos",
    descricao: "Rolamentos resistentes para aplicações industriais pesadas.",
    imagem: "/rolamentos.png",
  },
  {
    titulo: "Hidráulica",
    descricao: "Componentes hidráulicos para sistemas industriais modernos.",
    imagem: "/hidra.png",
  },
  {
    titulo: "Motores",
    descricao: "Motores industriais de alta performance e eficiência energética.",
    imagem: "/motoress.png",
  },
  {
    titulo: "Ferramentas",
    descricao: "Ferramentas profissionais para manutenção e produção industrial.",
    imagem: "/ferramentass.png",
  },
];

const pageMotion = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -42,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 42,
    scale: 0.98,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};

const statCardMotion = {
  hidden: {
    opacity: 0,
    y: 22,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const serviceCardMotion = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.96,
    filter: "blur(7px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const carouselSlideMotion = {
  enter: {
    opacity: 0,
    x: 50,
    filter: "blur(8px)",
  },
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    x: -50,
    filter: "blur(8px)",
  },
};

const productItemMotion = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.97,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.48,
      ease: "easeOut",
    },
  },
};

const floatingPieceMotion = {
  y: [0, -10, 0],
  rotate: [0, 1.5, -1.5, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const floatingGearMotion = {
  y: [0, -8, 0],
  rotate: [0, 4, -4, 0],
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const slowFloatingMotion = {
  y: [0, 14, 0],
  scale: [1, 1.03, 1],
  transition: {
    duration: 9,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

function normalizarTipoUsuario(usuario) {
  if (!usuario) return "";

  if (typeof usuario === "string") {
    return usuario.trim().toLowerCase();
  }

  return String(
    usuario?.tipo ||
      usuario?.tipo_user ||
      usuario?.tipo_usuario ||
      usuario?.tipoUser ||
      usuario?.role ||
      usuario?.cargo ||
      usuario?.perfil ||
      usuario?.nivel ||
      usuario?.nivel_acesso ||
      usuario?.dados?.tipo ||
      usuario?.dados?.tipo_user ||
      usuario?.dados?.tipo_usuario ||
      usuario?.dados?.tipoUser ||
      usuario?.dados?.role ||
      usuario?.dados?.cargo ||
      usuario?.dados?.perfil ||
      usuario?.dados?.nivel ||
      usuario?.dados?.nivel_acesso ||
      usuario?.usuario?.tipo ||
      usuario?.usuario?.tipo_user ||
      usuario?.usuario?.tipo_usuario ||
      usuario?.usuario?.tipoUser ||
      usuario?.usuario?.role ||
      usuario?.usuario?.cargo ||
      usuario?.usuario?.perfil ||
      usuario?.usuario?.nivel ||
      usuario?.usuario?.nivel_acesso ||
      usuario?.dados?.usuario?.tipo ||
      usuario?.dados?.usuario?.tipo_user ||
      usuario?.dados?.usuario?.tipo_usuario ||
      usuario?.dados?.usuario?.tipoUser ||
      ""
  )
    .trim()
    .toLowerCase();
}

function dividirEmSlides(lista, tamanho = 3) {
  const slides = [];

  for (let index = 0; index < lista.length; index += tamanho) {
    slides.push(lista.slice(index, index + tamanho));
  }

  return slides;
}

async function lerJsonComSeguranca(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function aproximarContadorPublico(valor) {
  const numero = Number(valor || 0);

  if (!Number.isFinite(numero) || numero <= 0) {
    return "0";
  }

  if (numero < 10) {
    return "Menos de 10";
  }

  if (numero < 100) {
    return `${Math.floor(numero / 10) * 10}+`;
  }

  if (numero < 1000) {
    return `${Math.floor(numero / 50) * 50}+`;
  }

  if (numero < 10000) {
    return `${Math.floor(numero / 100) * 100}+`;
  }

  return `${Math.floor(numero / 1000) * 1000}+`;
}

function normalizarValorMetricaPublica(valor) {
  if (valor === null || valor === undefined || valor === "") {
    return "0";
  }

  if (typeof valor === "number") {
    return aproximarContadorPublico(valor);
  }

  const texto = String(valor).trim();

  if (!texto) {
    return "0";
  }

  const pareceNumeroExato = /^\d+([.,]\d+)?$/.test(texto);

  if (pareceNumeroExato) {
    return aproximarContadorPublico(Number(texto.replace(",", ".")));
  }

  return texto;
}

function extrairMetricasPublicas(data) {
  const dados = data?.dados || data?.data || data?.metricas || data || {};

  return {
    produtosCatalogados: normalizarValorMetricaPublica(
      dados?.produtosCatalogados ??
        dados?.produtos_catalogados ??
        dados?.totalProdutos ??
        dados?.total_produtos ??
        dados?.produtos
    ),
    usuariosCadastrados: normalizarValorMetricaPublica(
      dados?.usuariosCadastrados ??
        dados?.usuarios_cadastrados ??
        dados?.totalUsuarios ??
        dados?.total_usuarios ??
        dados?.usuarios
    ),
    pedidosFeitos: normalizarValorMetricaPublica(
      dados?.pedidosFeitos ??
        dados?.pedidos_feitos ??
        dados?.totalPedidos ??
        dados?.total_pedidos ??
        dados?.pedidos ??
        dados?.encomendas
    ),
  };
}

function metricasPublicasValidas(metricas) {
  return Boolean(
    metricas &&
      typeof metricas === "object" &&
      metricas.produtosCatalogados !== undefined &&
      metricas.usuariosCadastrados !== undefined &&
      metricas.pedidosFeitos !== undefined
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFornecedor, setIsFornecedor] = useState(false);
  const [tipoUsuarioCarregado, setTipoUsuarioCarregado] = useState(false);

  const [metricasHome, setMetricasHome] = useState({
    produtosCatalogados: "0",
    usuariosCadastrados: "0",
    pedidosFeitos: "0",
  });

  const [carregandoDados, setCarregandoDados] = useState(true);
  const [erroDados, setErroDados] = useState("");

  const slidesProdutos = useMemo(() => dividirEmSlides(carouselProdutosFixos, 3), []);
  const totalSlides = slidesProdutos.length;
  const slideAtual = slidesProdutos[currentSlide] || [];

  useEffect(() => {
    try {
      const usuarioStorage = localStorage.getItem("usuario");

      if (!usuarioStorage) {
        setIsFornecedor(false);
        return;
      }

      const userParsed = JSON.parse(usuarioStorage);
      const tipo = normalizarTipoUsuario(userParsed);

      setIsFornecedor(
        tipo.includes("fornecedor") ||
          tipo.includes("supplier")
      );
    } catch (error) {
      console.error("Erro ao verificar tipo de usuário na Home:", error);
      setIsFornecedor(false);
    } finally {
      setTipoUsuarioCarregado(true);
    }
  }, []);

  useEffect(() => {
    carregarMetricasPublicasHome();
  }, []);

  async function carregarMetricasPublicasHome() {
    try {
      setCarregandoDados(true);
      setErroDados("");

      const response = await fetch(METRICAS_HOME_PUBLICAS_URL, {
        method: "GET",
        cache: "no-store",
      });

      const data = await lerJsonComSeguranca(response);

      if (!response.ok || data?.sucesso === false) {
        throw new Error(
          data?.mensagem ||
            data?.erro ||
            "Não foi possível carregar as métricas públicas da Home."
        );
      }

      const metricasExtraidas = extrairMetricasPublicas(data);

      if (!metricasPublicasValidas(metricasExtraidas)) {
        throw new Error("Formato inválido recebido da API pública de métricas.");
      }

      setMetricasHome(metricasExtraidas);
    } catch (error) {
      console.error("Erro ao carregar métricas públicas da Home:", error);

      setErroDados("Dados públicos temporariamente indisponíveis");
      setMetricasHome({
        produtosCatalogados: "0",
        usuariosCadastrados: "0",
        pedidosFeitos: "0",
      });
    } finally {
      setCarregandoDados(false);
    }
  }

  const statsHome = useMemo(() => {
    if (carregandoDados) {
      return [
        { valor: "...", label: "Produtos catalogados" },
        { valor: "...", label: "Usuários cadastrados" },
        { valor: "...", label: "Pedidos feitos" },
      ];
    }

    if (erroDados) {
      return [
        { valor: "6", label: "Linhas em destaque" },
        { valor: "24h", label: "Suporte comercial" },
        { valor: "100%", label: "Catálogo industrial" },
      ];
    }

    return [
      {
        valor: metricasHome.produtosCatalogados,
        label: "Produtos catalogados",
      },
      {
        valor: metricasHome.usuariosCadastrados,
        label: "Usuários cadastrados",
      },
      {
        valor: metricasHome.pedidosFeitos,
        label: "Pedidos feitos",
      },
    ];
  }, [carregandoDados, erroDados, metricasHome]);

  function nextSlide() {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }

  function prevSlide() {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }

  function impedirArrastarBotao(event) {
    event.preventDefault();
  }

  return (
    <>
      <motion.main
        variants={pageMotion}
        initial="hidden"
        animate="show"
        style={{
          minHeight: "100vh",
          background: pageBackground,
          color: "white",
          overflow: "hidden",
        }}
      >
        <motion.div
          className="hero-industrial"
          variants={fadeUp}
          style={{
            background: pageBackground,
            borderBottom: "1px solid rgba(255,255,255,.06)",
          }}
        >
          <motion.img
            src="/en1.png"
            className="gear-big"
            alt=""
            animate={floatingGearMotion}
          />

          <motion.img
            src="/en2.png"
            className="gear-small"
            alt=""
            animate={floatingGearMotion}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />

          <motion.img
            src="/engrenagem.png"
            className="bg-piece-blur"
            alt=""
            animate={slowFloatingMotion}
          />

          <motion.img
            src="/parafuso.png"
            className="bg-piece-back"
            alt=""
            animate={floatingPieceMotion}
          />

          <div className="container col-xxl-8 px-4" style={{ paddingTop: "50px" }}>
            <motion.div
              className="row flex-lg-row-reverse align-items-center g-5"
              variants={staggerContainer}
            >
              <motion.div className="col-10 col-sm-8 col-lg-6" variants={fadeRight}>
                <motion.img
                  src="/porca.png"
                  className="d-block mx-lg-auto img-fluid porca-bd"
                  alt="Peça Industrial"
                  width={700}
                  height={500}
                  loading="lazy"
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, 1.2, 0],
                  }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              <motion.div className="col-lg-6" variants={fadeLeft}>
                <motion.h1
                  className="display-5 fw-bold lh-1 mb-3 titulo"
                  variants={fadeUp}
                  style={{
                    fontSize: "60px",
                  }}
                >
                  A Melhor{" "}
                  <span
                    style={{
                      background: "linear-gradient(90deg,#ffcf40,#ff8800,#f5061d)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Fornecedora
                  </span>{" "}
                  de Peças Industriais para a sua Empresa
                </motion.h1>

                <motion.p
                  className="lead"
                  variants={fadeUp}
                  style={{ fontSize: "25px" }}
                >
                  Fornecemos componentes industriais de alta qualidade,
                  desenvolvidos para garantir segurança, eficiência e máxima
                  durabilidade em todos os tipos de operações e projetos
                  industriais.
                </motion.p>

                <motion.div
                  className="d-grid gap-2 d-md-flex justify-content-md-start"
                  variants={fadeUp}
                >
                  <motion.div
                    whileHover={{
                      y: -3,
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                  >
                    <Link
                      style={{
                        color: "#ffffff",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        WebkitUserDrag: "none",
                      }}
                      type="button"
                      className="btn btn-outline-secondary btn-lg px-4 btn-custom hero-action-btn"
                      href={isFornecedor ? "/encomendasrecebe" : "/encomendas"}
                      draggable={false}
                      onDragStart={impedirArrastarBotao}
                    >
                      Confira agora!
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{
                      y: -3,
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                  >
                    <Link
                      type="button"
                      className="btn btn-outline-secondary btn-lg px-4 btn-sec hero-action-btn"
                      href={isFornecedor ? "/logistica" : "/produtos"}
                      draggable={false}
                      onDragStart={impedirArrastarBotao}
                      style={{
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        WebkitUserDrag: "none",
                      }}
                    >
                      {isFornecedor ? "Central" : "Categorias"}
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "40px",
                }}
              >
                <motion.div
                  className="d-flex flex-wrap justify-content-center"
                  variants={staggerContainer}
                  style={{
                    gap: "24px",
                    alignItems: "center",
                  }}
                >
                  {statsHome.map((item) => (
                    <motion.div
                      key={item.label}
                      variants={statCardMotion}
                      whileHover={{
                        y: -7,
                        scale: 1.035,
                        borderColor: "rgba(255,136,0,.28)",
                      }}
                      style={statsCardStyle}
                    >
                      <motion.h1
                        key={item.valor}
                        initial={{
                          opacity: 0,
                          y: 8,
                          scale: 0.98,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        transition={{
                          duration: 0.35,
                          ease: "easeOut",
                        }}
                        style={{ color: "#ff8800", marginBottom: "5px" }}
                      >
                        {item.valor}
                      </motion.h1>

                      <p style={{ margin: 0, color: "#a0a0a0" }}>
                        {item.label}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {erroDados && (
                  <motion.div
                    className="col-12 text-center"
                    initial={{
                      opacity: 0,
                      y: -8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    style={{ marginTop: "14px" }}
                  >
                    <small style={{ color: "rgba(255,255,255,.48)" }}>
                      {erroDados}. Exibindo indicadores institucionais temporários.
                    </small>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>

        <motion.section
          className="text-light py-5 py-xl-8"
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.22,
          }}
          variants={staggerContainer}
          style={{
            background: "transparent",
          }}
        >
          <div className="container">
            <motion.div className="row justify-content-md-center" variants={fadeUp}>
              <div className="col-12 col-md-10 col-lg-8 col-xl-7">
                <motion.h3
                  className="fs-6 mb-2 text-center text-uppercase"
                  variants={fadeUp}
                  style={{ color: "#f5061d" }}
                >
                  Por que escolher o AtrixSupply?
                </motion.h3>

                <motion.h2
                  className="display-5 mb-5 text-center text-white"
                  variants={fadeUp}
                >
                  Oferecemos peças de qualidade, atendimento especializado e
                  soluções eficientes para você
                </motion.h2>

                <motion.hr
                  className="w-50 mx-auto mb-5 mb-xl-9"
                  variants={fadeUp}
                  style={{ borderColor: "#f5061d", opacity: 0.8 }}
                />
              </div>
            </motion.div>
          </div>

          <div className="container overflow-hidden">
            <motion.div className="row gy-4 gy-xl-0" variants={staggerContainer}>
              <motion.div className="col-12 col-sm-6 col-xl-3" variants={serviceCardMotion}>
                <motion.div
                  className="card text-light border-0 h-100"
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    borderColor: "rgba(245,6,29,.35)",
                  }}
                  style={serviceCardStyle}
                >
                  <div className="card-body text-center p-4 p-xxl-5">
                    <motion.i
                      className="bi bi-headset mb-4"
                      whileHover={{
                        rotate: [-3, 3, -3, 0],
                        scale: 1.08,
                      }}
                      transition={{
                        duration: 0.45,
                      }}
                      style={{
                        fontSize: "55px",
                        color: "#f5061d",
                        display: "block",
                      }}
                    />

                    <h4 className="mb-4 text-white">
                      Atendimento Especializado
                    </h4>

                    <p style={{ color: "#b3b3b3" }}>
                      Nossa equipe oferece suporte completo para ajudar você a
                      encontrar as peças ideais com rapidez e total confiança.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div className="col-12 col-sm-6 col-xl-3" variants={serviceCardMotion}>
                <motion.div
                  className="card text-light border-0 h-100"
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    borderColor: "rgba(245,6,29,.35)",
                  }}
                  style={serviceCardStyle}
                >
                  <div className="card-body text-center p-4 p-xxl-5">
                    <motion.i
                      className="bi bi-truck mb-4"
                      whileHover={{
                        x: [0, 5, -3, 0],
                        scale: 1.08,
                      }}
                      transition={{
                        duration: 0.45,
                      }}
                      style={{
                        fontSize: "55px",
                        color: "#f5061d",
                        display: "block",
                      }}
                    />

                    <h4 className="mb-4 text-white">
                      Entrega <br /> Rápida
                    </h4>

                    <p style={{ color: "#b3b3b3" }}>
                      Contamos com logística eficiente para entregar suas peças
                      com mais velocidade e segurança.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div className="col-12 col-sm-6 col-xl-3" variants={serviceCardMotion}>
                <motion.div
                  className="card text-light border-0 h-100"
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    borderColor: "rgba(245,6,29,.35)",
                  }}
                  style={serviceCardStyle}
                >
                  <div className="card-body text-center p-4 p-xxl-5">
                    <motion.i
                      className="bi bi-gear-wide-connected mb-4"
                      whileHover={{
                        rotate: 180,
                        scale: 1.08,
                      }}
                      transition={{
                        duration: 0.65,
                        ease: "easeInOut",
                      }}
                      style={{
                        fontSize: "55px",
                        color: "#f5061d",
                        display: "block",
                      }}
                    />

                    <h4 className="mb-4 text-white">
                      Peças de Qualidade
                    </h4>

                    <p style={{ color: "#b3b3b3" }}>
                      Selecionamos produtos de alta qualidade para garantir mais
                      desempenho e durabilidade.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div className="col-12 col-sm-6 col-xl-3" variants={serviceCardMotion}>
                <motion.div
                  className="card text-light border-0 h-100"
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    borderColor: "rgba(245,6,29,.35)",
                  }}
                  style={serviceCardStyle}
                >
                  <div className="card-body text-center p-4 p-xxl-5">
                    <motion.i
                      className="bi bi-shield-check mb-4"
                      whileHover={{
                        scale: 1.1,
                        y: -3,
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                      style={{
                        fontSize: "55px",
                        color: "#f5061d",
                        display: "block",
                      }}
                    />

                    <h4 className="mb-4 text-white">
                      Compra <br /> Segura
                    </h4>

                    <p style={{ color: "#b3b3b3" }}>
                      Garantimos uma experiência segura com pagamentos
                      confiáveis e proteção em cada pedido.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="py-5 position-relative"
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.18,
          }}
          variants={fadeUp}
          style={{
            background: heroGradient,
            borderTop: "1px solid rgba(255,255,255,.08)",
            borderBottom: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <div className="container position-relative">
            <motion.div
              className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3"
              variants={fadeUp}
            >
              <div>
                <motion.span
                  className="badge bg-warning text-dark mb-2 px-3 py-2"
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                >
                  Catálogo
                </motion.span>

                <h2 className="text-white fw-bold mb-0">
                  Nossos Produtos
                </h2>
              </div>

              {tipoUsuarioCarregado && !isFornecedor && (
                <motion.div
                  whileHover={{
                    y: -3,
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                >
                  <Link
                    href="/produtos"
                    className="btn btn-outline-light fw-bold"
                    style={{ borderRadius: "14px", padding: "10px 16px" }}
                  >
                    Ver todos
                    <i className="bi bi-arrow-right ms-2" />
                  </Link>
                </motion.div>
              )}
            </motion.div>

            <div id="carouselProdutos" className="carousel slide">
              <button
                className="carousel-control-prev custom-arrow"
                type="button"
                onClick={prevSlide}
                style={{ transform: "translateX(-90px)" }}
              >
                <span className="custom-icon">❮</span>
              </button>

              <button
                className="carousel-control-next custom-arrow"
                type="button"
                onClick={nextSlide}
                style={{ transform: "translateX(90px)" }}
              >
                <span className="custom-icon">❯</span>
              </button>

              <div className="carousel-inner">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`slide-${currentSlide}`}
                    className="carousel-item active"
                    variants={carouselSlideMotion}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: 0.42,
                      ease: "easeOut",
                    }}
                  >
                    <motion.div
                      className="row g-4"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="show"
                    >
                      {slideAtual.map((produto) => (
                        <motion.div
                          className="col-md-4"
                          key={produto.titulo}
                          variants={productItemMotion}
                        >
                          <Link
                            href={isFornecedor ? "#" : "/produtos"}
                            onClick={(event) => {
                              if (isFornecedor) {
                                event.preventDefault();
                              }
                            }}
                            aria-label={`Ver produtos de ${produto.titulo}`}
                            draggable={false}
                            onDragStart={impedirArrastarBotao}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                              userSelect: "none",
                              WebkitUserSelect: "none",
                              WebkitUserDrag: "none",
                            }}
                          >
                            <motion.div
                              className="card produto-card h-100 border-0"
                              {...(!isFornecedor
                                ? {
                                    whileHover: {
                                      y: -9,
                                      scale: 1.025,
                                      borderColor: "rgba(255,255,255,.20)",
                                    },
                                    whileTap: {
                                      scale: 0.985,
                                    },
                                  }
                                : {})}
                              style={{
                                ...productCardStyle,
                                cursor: isFornecedor ? "default" : "pointer",
                                pointerEvents: isFornecedor ? "none" : "auto",
                              }}
                            >
                              <motion.img
                                src={produto.imagem}
                                className="card-img-top produto-img"
                                alt={produto.titulo}
                                whileHover={
                                  !isFornecedor
                                    ? {
                                        scale: 1.04,
                                      }
                                    : undefined
                                }
                                transition={{
                                  duration: 0.35,
                                  ease: "easeOut",
                                }}
                              />

                              <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                                  <h5 className="card-title text-white mb-0">
                                    {produto.titulo}
                                  </h5>

                                  {!isFornecedor && (
                                    <motion.span
                                      className="badge"
                                      whileHover={{
                                        scale: 1.04,
                                      }}
                                      style={{
                                        background: "rgba(255,179,0,.12)",
                                        color: "#ffcf40",
                                        border: "1px solid rgba(255,179,0,.22)",
                                        borderRadius: "999px",
                                      }}
                                    >
                                      Ver catálogo
                                    </motion.span>
                                  )}
                                </div>

                                <p className="card-text mb-0" style={{ color: "#b3b3b3" }}>
                                  {produto.descricao}
                                </p>
                              </div>
                            </motion.div>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.section>
      </motion.main>
    </>
  );
}