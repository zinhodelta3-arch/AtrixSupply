"use client";

import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Ferramentas",
    sku: "PROD-01",
    category: "Ferramentas",
    price: "R$ 89,90",
    stock: 42,
    status: "Disponível",
  },

  {
    id: 2,
    name: "Parafusos",
    sku: "PROD-002",
    category: "Suporte",
    price: "R$ 149,90",
    stock: 18,
    status: "Disponível",
  },

  {
    id: 3,
    name: "Algo",
    sku: "PROD-003",
    category: "algo2",
    price: "R$ 39,90",
    stock: 0,
    status: "Esgotado",
  },

  {
    id: 4,
    name: "maquinario",
    sku: "PROD-004",
    category: "maquinario",
    price: "R$ 189,90",
    stock: 5,
    status: "Baixo estoque",
  },
];

export default function Produtos() {
  const getStatusStyle = (status) => {
    if (status === "Disponível") {
      return {
        background: "rgba(34,197,94,0.10)",
        border: "1px solid rgba(34,197,94,0.15)",
        color: "#22c55e",
      };
    }

    if (status === "Baixo estoque") {
      return {
        background: "rgba(255,179,0,0.10)",
        border: "1px solid rgba(255,179,0,0.18)",
        color: "#ffb300",
      };
    }

    return {
      background: "rgba(245,6,29,0.10)",
      border: "1px solid rgba(245,6,29,0.15)",
      color: "#f5061d",
    };
  };

  return (
    <div
      className="container-fluid py-4 px-3 px-lg-4"
      style={{
        background: "#09090b",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h1
            className="fw-bold mb-1"
            style={{
              color: "#ffb300",
              fontSize: "2rem",
              letterSpacing: "-1px",
            }}
          >
            Produtos
          </h1>

          <p
            className="mb-0"
            style={{
              color: "#71717a",
              fontSize: ".95rem",
            }}
          >
            Gerenciamento de produtos da plataforma
          </p>
        </div>

        {/* BUTTON */}
        <button
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          data-bs-toggle="modal"
          data-bs-target="#newProductModal"
          style={{
            background: "#c0012a",
            border: "1px solid rgba(255,255,255,0.06)",
            color: "#ffffff",
            borderRadius: "14px",
            fontWeight: "600",
          }}
        >
          <i className="bi bi-plus-lg"></i>
          Novo Produto
        </button>
      </div>

      {/* TABLE CARD */}
      <div
        className="p-3 p-lg-4"
        style={{
          background: "#111113",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "28px",
        }}
      >
        {/* TOP */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <h4
              className="fw-bold mb-1"
              style={{
                color: "#ffffff",
                letterSpacing: "-0.5px",
              }}
            >
              Lista de Produtos
            </h4>

            <p
              className="mb-0"
              style={{
                color: "#71717a",
                fontSize: ".9rem",
              }}
            >
              Controle e gerenciamento dos produtos cadastrados
            </p>
          </div>

          {/* SEARCH */}
          <div
            className="d-flex align-items-center px-3"
            style={{
              background: "#151518",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "14px",
              minWidth: "260px",
              height: "46px",
            }}
          >
            <i
              className="bi bi-search"
              style={{
                color: "#71717a",
              }}
            />

            <input
              type="text"
              placeholder="Pesquisar produto..."
              className="form-control border-0 shadow-none"
              style={{
                background: "transparent",
                color: "#ffffff",
                fontSize: ".92rem",
              }}
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="table-responsive">
          <table
            className="table align-middle mb-0"
            style={{
              color: "#ffffff",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <th
                  className="py-3"
                  style={{
                    color: "#71717a",
                    fontWeight: "500",
                    border: "none",
                    background: "transparent",
                  }}
                >
                  Produto
                </th>

                <th
                  className="py-3"
                  style={{
                    color: "#71717a",
                    fontWeight: "500",
                    border: "none",
                    background: "transparent",
                  }}
                >
                  Categoria
                </th>

                <th
                  className="py-3"
                  style={{
                    color: "#71717a",
                    fontWeight: "500",
                    border: "none",
                    background: "transparent",
                  }}
                >
                  Preço
                </th>

                <th
                  className="py-3"
                  style={{
                    color: "#71717a",
                    fontWeight: "500",
                    border: "none",
                    background: "transparent",
                  }}
                >
                  Estoque
                </th>

                <th
                  className="py-3"
                  style={{
                    color: "#71717a",
                    fontWeight: "500",
                    border: "none",
                    background: "transparent",
                  }}
                >
                  Status
                </th>

                <th
                  className="py-3 text-end"
                  style={{
                    color: "#71717a",
                    fontWeight: "500",
                    border: "none",
                    background: "transparent",
                  }}
                >
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  {/* PRODUCT */}
                  <td
                    className="py-3"
                    style={{
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      {/* ICON */}
                      <div
                        className="d-flex justify-content-center align-items-center fw-bold"
                        style={{
                          width: "46px",
                          height: "46px",
                          borderRadius: "14px",
                          background: "rgba(255,136,0,0.12)",
                          border: "1px solid rgba(255,179,0,0.12)",
                          color: "#ffb300",
                          fontSize: "1.1rem",
                        }}
                      >
                        <i className="bi bi-box-seam"></i>
                      </div>

                      {/* INFO */}
                      <div className="ms-3">
                        <div
                          className="fw-semibold"
                          style={{
                            color: "#ffffff",
                            fontSize: ".95rem",
                          }}
                        >
                          {product.name}
                        </div>

                        <div
                          style={{
                            color: "#71717a",
                            fontSize: ".8rem",
                          }}
                        >
                          SKU: {product.sku}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td
                    style={{
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    <span
                      style={{
                        color: "#d4d4d8",
                        fontSize: ".9rem",
                      }}
                    >
                      {product.category}
                    </span>
                  </td>

                  {/* PRICE */}
                  <td
                    style={{
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    <span
                      className="fw-semibold"
                      style={{
                        color: "#ffb300",
                        fontSize: ".9rem",
                      }}
                    >
                      {product.price}
                    </span>
                  </td>

                  {/* STOCK */}
                  <td
                    style={{
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    <span
                      style={{
                        color: "#d4d4d8",
                        fontSize: ".9rem",
                      }}
                    >
                      {product.stock} unidades
                    </span>
                  </td>

                  {/* STATUS */}
                  <td
                    style={{
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    <span
                      className="px-3 py-2 d-inline-flex align-items-center"
                      style={{
                        borderRadius: "12px",
                        fontSize: ".8rem",
                        fontWeight: "600",
                        ...getStatusStyle(product.status),
                      }}
                    >
                      {product.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td
                    className="text-end"
                    style={{
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    <div className="d-flex justify-content-end gap-2">
                      {/* EDIT */}
                      <Link
                        href={`/dashboard/produtos/${product.id}`}
                        className="btn d-flex align-items-center justify-content-center"
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "12px",
                          background: "#151518",
                          border: "1px solid rgba(255,255,255,0.06)",
                          color: "#ffb300",
                        }}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Link>

                      {/* DELETE */}
                      <button
                        className="btn d-flex align-items-center justify-content-center"
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "12px",
                          background: "rgba(245,6,29,0.10)",
                          border: "1px solid rgba(245,6,29,0.15)",
                          color: "#f5061d",
                        }}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      <div
        className="modal fade"
        id="newProductModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div
            className="modal-content border-0 overflow-hidden"
            style={{
              background: `
                linear-gradient(
                  135deg,
                  #940533 0%,
                  #7d042b 35%,
                  #5f0321 70%,
                  #3b0215 100%
                )
              `,
              borderRadius: "28px",
            }}
          >
            {/* HEADER */}
            <div className="modal-header border-0 pt-4 px-4">
              <div className="w-100 text-center">
                {/* LOGO */}
                <div
                  className="d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "78px",
                    height: "78px",
                    borderRadius: "22px",
                    background: "rgba(255,179,0,0.08)",
                    border: "1px solid rgba(255,179,0,0.12)",
                  }}
                >
                  <i
                    className="bi bi-box-seam-fill"
                    style={{
                      color: "#ffb300",
                      fontSize: "2rem",
                    }}
                  />
                </div>

                <h2
                  className="fw-bold mb-0"
                  style={{
                    color: "#ffb300",
                    letterSpacing: "-1px",
                  }}
                >
                  Cadastro de Produto
                </h2>
              </div>

              {/* CLOSE */}
              <button
                type="button"
                className="btn-close btn-close-white position-absolute top-0 end-0 m-4"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            {/* BODY */}
            <div className="modal-body p-4 p-lg-5">
              <div className="row g-4">
                {[
                  {
                    label: "Nome do produto",
                    placeholder: "Ex: Camiseta Anime Oversized",
                  },

                  {
                    label: "SKU",
                    placeholder: "Ex: PROD-001",
                  },

                  {
                    label: "Preço",
                    placeholder: "Ex: R$ 89,90",
                  },

                  {
                    label: "Estoque",
                    placeholder: "Quantidade disponível",
                    type: "number",
                  },

                  {
                    label: "Marca",
                    placeholder: "Marca do produto",
                  },

                  {
                    label: "Fornecedor",
                    placeholder: "Nome do fornecedor",
                  },

                  {
                    label: "Imagem do produto",
                    placeholder: "URL da imagem",
                  },

                  {
                    label: "Peso",
                    placeholder: "Ex: 300g",
                  },
                ].map((field, index) => (
                  <div key={index} className="col-12 col-lg-6">
                    <label
                      className="form-label mb-2"
                      style={{
                        color: "#f3f4f6",
                        fontSize: ".92rem",
                      }}
                    >
                      {field.label}
                    </label>

                    <input
                      type={field.type || "text"}
                      className="form-control border-0 shadow-none"
                      placeholder={field.placeholder}
                      style={{
                        background: "rgba(0,0,0,0.18)",
                        border: "1px solid rgba(245,6,29,0.35)",
                        color: "#ffffff",
                        height: "56px",
                        borderRadius: "16px",
                      }}
                    />
                  </div>
                ))}

                {/* CATEGORY SELECT */}
                <div className="col-12 col-lg-6">
                  <label
                    className="form-label mb-2"
                    style={{
                      color: "#f3f4f6",
                      fontSize: ".92rem",
                    }}
                  >
                    Categoria
                  </label>

                  <select
                    className="form-select border-0 shadow-none"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.18)",
                      border: "1px solid rgba(245,6,29,0.35)",
                      color: "#ffffff",
                      height: "56px",
                      borderRadius: "16px",
                    }}
                  >
                    <option>Selecione a categoria</option>
                    <option>Vestuário</option>
                    <option>Colecionáveis</option>
                    <option>Acessórios</option>
                    <option>Decoração</option>
                    <option>Livros e Mangás</option>
                  </select>
                </div>

                {/* STATUS SELECT */}
                <div className="col-12 col-lg-6">
                  <label
                    className="form-label mb-2"
                    style={{
                      color: "#f3f4f6",
                      fontSize: ".92rem",
                    }}
                  >
                    Status
                  </label>

                  <select
                    className="form-select border-0 shadow-none"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.18)",
                      border: "1px solid rgba(245,6,29,0.35)",
                      color: "#ffffff",
                      height: "56px",
                      borderRadius: "16px",
                    }}
                  >
                    <option>Selecione o status</option>
                    <option>Disponível</option>
                    <option>Baixo estoque</option>
                    <option>Esgotado</option>
                  </select>
                </div>

                {/* DESCRIPTION */}
                <div className="col-12">
                  <label
                    className="form-label mb-2"
                    style={{
                      color: "#f3f4f6",
                      fontSize: ".92rem",
                    }}
                  >
                    Descrição
                  </label>

                  <textarea
                    className="form-control border-0 shadow-none"
                    placeholder="Descreva os detalhes do produto..."
                    rows="4"
                    style={{
                      background: "rgba(0,0,0,0.18)",
                      border: "1px solid rgba(245,6,29,0.35)",
                      color: "#ffffff",
                      borderRadius: "16px",
                      resize: "none",
                    }}
                  />
                </div>
              </div>

              {/* BUTTON */}
              <div className="mt-5">
                <button
                  className="btn w-100 py-3 fw-semibold"
                  style={{
                    background: "linear-gradient(90deg,#ff8800,#ffb300)",
                    border: "none",
                    color: "#3b0215",
                    borderRadius: "16px",
                    fontSize: "1rem",
                  }}
                >
                  Criar produto
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}