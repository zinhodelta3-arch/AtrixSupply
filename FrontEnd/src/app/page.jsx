"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import "./page.css";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");
const PRODUTOS_URL = `${API_URL}/api/produtos`;

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
  transition: "transform .22s ease, border-color .22s ease, background .22s ease",
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

function normalizarTipoUsuario(usuario) {
  if (!usuario) return "";
  if (typeof usuario === "string") return usuario.trim().toLowerCase();

  return String(
    usuario?.tipo ||
      usuario?.tipo_user ||
      usuario?.role ||
      usuario?.nivel ||
      usuario?.dados?.tipo ||
      usuario?.dados?.tipo_user ||
      usuario?.usuario?.tipo ||
      ""
  )
    .trim()
    .toLowerCase();
}

function normalizarTexto(valor) {
  return String(valor || "").trim();
}

function extrairListaProdutos(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.dados)) return data.dados;
  if (Array.isArray(data?.produtos)) return data.produtos;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.dados?.produtos)) return data.dados.produtos;
  if (Array.isArray(data?.dados?.itens)) return data.dados.itens;
  if (Array.isArray(data?.dados?.rows)) return data.dados.rows;

  return [];
}

function extrairTotalProdutos(data, listaProdutos) {
  const possiveisTotais = [
    data?.paginacao?.total,
    data?.dados?.total,
    data?.total,
    data?.meta?.total,
    data?.dados?.paginacao?.total,
  ];

  const totalEncontrado = possiveisTotais.find((valor) => Number(valor) > 0);

  return Number(totalEncontrado || listaProdutos.length || 0);
}

function obterCategoriaProduto(produto) {
  return normalizarTexto(
    produto?.categoria ||
      produto?.nome_categoria ||
      produto?.tipo ||
      produto?.linha ||
      produto?.grupo ||
      produto?.categoria_produto
  );
}

function obterPrecoProduto(produto) {
  const valor = produto?.preco ?? produto?.valor ?? produto?.preco_unitario ?? produto?.price;
  const numero = Number(String(valor || "").replace(",", "."));

  return Number.isFinite(numero) && numero > 0 ? numero : null;
}

function formatarNumeroCompacto(valor) {
  const numero = Number(valor || 0);

  if (numero >= 1000) {
    return numero.toLocaleString("pt-BR", {
      notation: "compact",
      maximumFractionDigits: 1,
    });
  }

  return numero.toLocaleString("pt-BR");
}

function formatarMoeda(valor) {
  const numero = Number(valor || 0);

  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function dividirEmSlides(lista, tamanho = 3) {
  const slides = [];

  for (let index = 0; index < lista.length; index += tamanho) {
    slides.push(lista.slice(index, index + tamanho));
  }

  return slides;
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFornecedor, setIsFornecedor] = useState(false);
  const [produtosBanco, setProdutosBanco] = useState([]);
  const [totalProdutosBanco, setTotalProdutosBanco] = useState(0);
  const [carregandoDados, setCarregandoDados] = useState(true);
  const [erroDados, setErroDados] = useState("");

  const slidesProdutos = useMemo(() => dividirEmSlides(carouselProdutosFixos, 3), []);
  const totalSlides = slidesProdutos.length;

  useEffect(() => {
    try {
      const usuarioStorage = localStorage.getItem("usuario");

      if (usuarioStorage) {
        const userParsed = JSON.parse(usuarioStorage);
        const tipo = normalizarTipoUsuario(userParsed);

        if (tipo === "fornecedor" || tipo === "fornecedores" || tipo === "supplier") {
          setIsFornecedor(true);
        }
      }
    } catch (error) {
      console.error("Erro ao verificar tipo de usuário na Home:", error);
    }
  }, []);

  useEffect(() => {
    carregarDadosReaisHome();
  }, []);

  async function carregarDadosReaisHome() {
    try {
      setCarregandoDados(true);
      setErroDados("");

      const response = await fetch(`${PRODUTOS_URL}?pagina=1&limite=100`, {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.sucesso) {
        throw new Error(data?.mensagem || data?.erro || "Não foi possível carregar os dados da Home.");
      }

      const listaProdutos = extrairListaProdutos(data);
      const totalProdutos = extrairTotalProdutos(data, listaProdutos);

      setProdutosBanco(listaProdutos);
      setTotalProdutosBanco(totalProdutos);
    } catch (error) {
      console.error("Erro ao carregar dados reais da Home:", error);
      setErroDados("Dados reais temporariamente indisponíveis");
      setProdutosBanco([]);
      setTotalProdutosBanco(0);
    } finally {
      setCarregandoDados(false);
    }
  }

  const metricasReais = useMemo(() => {
    const categorias = new Set(
      produtosBanco
        .map(obterCategoriaProduto)
        .filter(Boolean)
        .map((categoria) => categoria.toLowerCase())
    );

    const precosValidos = produtosBanco
      .map(obterPrecoProduto)
      .filter((preco) => Number.isFinite(preco) && preco > 0);

    const menorPreco = precosValidos.length ? Math.min(...precosValidos) : 0;
    const maiorPreco = precosValidos.length ? Math.max(...precosValidos) : 0;
    const produtosComPreco = precosValidos.length;

    return {
      totalProdutos: totalProdutosBanco || produtosBanco.length,
      categoriasAtivas: categorias.size,
      menorPreco,
      maiorPreco,
      produtosComPreco,
    };
  }, [produtosBanco, totalProdutosBanco]);

  const statsHome = useMemo(() => {
    if (carregandoDados) {
      return [
        { valor: "...", label: "Produtos catalogados" },
        { valor: "...", label: "Linhas industriais" },
        { valor: "...", label: "Faixa inicial" },
      ];
    }

    if (erroDados || metricasReais.totalProdutos === 0) {
      return [
        { valor: "6", label: "Linhas em destaque" },
        { valor: "24h", label: "Suporte comercial" },
        { valor: "100%", label: "Catálogo industrial" },
      ];
    }

    return [
      {
        valor: formatarNumeroCompacto(metricasReais.totalProdutos),
        label: "Produtos catalogados",
      },
      {
        valor: String(metricasReais.categoriasAtivas || carouselProdutosFixos.length).padStart(2, "0"),
        label: "Categorias no banco",
      },
      {
        valor: metricasReais.menorPreco ? formatarMoeda(metricasReais.menorPreco) : formatarNumeroCompacto(metricasReais.produtosComPreco),
        label: metricasReais.menorPreco ? "Menor preço cadastrado" : "Produtos com preço",
      },
    ];
  }, [carregandoDados, erroDados, metricasReais]);

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
      <main
        style={{
          minHeight: "100vh",
          background: pageBackground,
          color: "white",
          overflow: "hidden",
        }}
      >
        <div
          className="hero-industrial"
          style={{
            background: pageBackground,
            borderBottom: "1px solid rgba(255,255,255,.06)",
          }}
        >
          <img src="/en1.png" className="gear-big" alt="" />
          <img src="/en2.png" className="gear-small" alt="" />
          <img src="/engrenagem.png" className="bg-piece-blur" alt="" />
          <img src="/parafuso.png" className="bg-piece-back" alt="" />

          <div className="container col-xxl-8 px-4" style={{ paddingTop: "50px" }}>
            <div className="row flex-lg-row-reverse align-items-center g-5">
              <div className="col-10 col-sm-8 col-lg-6">
                <img
                  src="/porca.png"
                  className="d-block mx-lg-auto img-fluid porca-bd"
                  alt="Peça Industrial"
                  width={700}
                  height={500}
                  loading="lazy"
                />
              </div>

              <div className="col-lg-6">
                <h1
                  className="display-5 fw-bold lh-1 mb-3 titulo"
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
                </h1>

                <p className="lead" style={{ fontSize: "25px" }}>
                  Fornecemos componentes industriais de alta qualidade,
                  desenvolvidos para garantir segurança, eficiência e máxima
                  durabilidade em todos os tipos de operações e projetos
                  industriais.
                </p>

                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
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
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "40px",
                }}
              >
                <div
                  className="d-flex flex-wrap justify-content-center"
                  style={{
                    gap: "24px",
                    alignItems: "center",
                  }}
                >
                  {statsHome.map((item) => (
                    <div key={item.label} style={statsCardStyle}>
                      <h1 style={{ color: "#ff8800", marginBottom: "5px" }}>
                        {item.valor}
                      </h1>
                      <p style={{ margin: 0, color: "#a0a0a0" }}>
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {erroDados && (
                <div className="col-12 text-center" style={{ marginTop: "14px" }}>
                  <small style={{ color: "rgba(255,255,255,.48)" }}>
                    {erroDados}. Exibindo indicadores institucionais temporários.
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>

        <section
          className="text-light py-5 py-xl-8"
          style={{
            background: "transparent",
          }}
        >
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-12 col-md-10 col-lg-8 col-xl-7">
                <h3
                  className="fs-6 mb-2 text-center text-uppercase"
                  style={{ color: "#f5061d" }}
                >
                  Por que escolher o AtrixSupply?
                </h3>

                <h2 className="display-5 mb-5 text-center text-white">
                  Oferecemos peças de qualidade, atendimento especializado e
                  soluções eficientes para você
                </h2>

                <hr
                  className="w-50 mx-auto mb-5 mb-xl-9"
                  style={{ borderColor: "#f5061d", opacity: 0.8 }}
                />
              </div>
            </div>
          </div>

          <div className="container overflow-hidden">
            <div className="row gy-4 gy-xl-0">
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card text-light border-0 h-100" style={serviceCardStyle}>
                  <div className="card-body text-center p-4 p-xxl-5">
                    <i
                      className="bi bi-headset mb-4"
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
                </div>
              </div>

              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card text-light border-0 h-100" style={serviceCardStyle}>
                  <div className="card-body text-center p-4 p-xxl-5">
                    <i
                      className="bi bi-truck mb-4"
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
                </div>
              </div>

              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card text-light border-0 h-100" style={serviceCardStyle}>
                  <div className="card-body text-center p-4 p-xxl-5">
                    <i
                      className="bi bi-gear-wide-connected mb-4"
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
                </div>
              </div>

              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card text-light border-0 h-100" style={serviceCardStyle}>
                  <div className="card-body text-center p-4 p-xxl-5">
                    <i
                      className="bi bi-shield-check mb-4"
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
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="py-5 position-relative"
          style={{
            background: heroGradient,
            borderTop: "1px solid rgba(255,255,255,.08)",
            borderBottom: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <div className="container position-relative">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
              <div>
                <span className="badge bg-warning text-dark mb-2 px-3 py-2">
                  Catálogo
                </span>

                <h2 className="text-white fw-bold mb-0">
                  Nossos Produtos
                </h2>
              </div>

              <Link
                href="/produtos"
                className="btn btn-outline-light fw-bold"
                style={{ borderRadius: "14px", padding: "10px 16px" }}
              >
                Ver todos
                <i className="bi bi-arrow-right ms-2" />
              </Link>
            </div>

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
                {slidesProdutos.map((slide, index) => (
                  <div
                    key={`slide-${index}`}
                    className={`carousel-item ${currentSlide === index ? "active" : ""}`}
                  >
                    <div className="row g-4">
                      {slide.map((produto) => (
                        <div className="col-md-4" key={produto.titulo}>
                          <Link
                            href="/produtos"
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
                            <div
                              className="card produto-card h-100 border-0"
                              style={productCardStyle}
                            >
                              <img
                                src={produto.imagem}
                                className="card-img-top produto-img"
                                alt={produto.titulo}
                              />

                              <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                                  <h5 className="card-title text-white mb-0">
                                    {produto.titulo}
                                  </h5>

                                  <span
                                    className="badge"
                                    style={{
                                      background: "rgba(255,179,0,.12)",
                                      color: "#ffcf40",
                                      border: "1px solid rgba(255,179,0,.22)",
                                      borderRadius: "999px",
                                    }}
                                  >
                                    Ver catálogo
                                  </span>
                                </div>

                                <p className="card-text mb-0" style={{ color: "#b3b3b3" }}>
                                  {produto.descricao}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
