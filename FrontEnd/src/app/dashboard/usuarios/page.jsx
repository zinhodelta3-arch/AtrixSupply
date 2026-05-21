"use client";

import Link from "next/link";

const users = [
  {
    id: 1,
    name: "João Victor",
    email: "joao@atrix.com",
    role: "Administrador",
    status: "Ativo",
  },

  {
    id: 2,
    name: "Maria Clara",
    email: "maria@atrix.com",
    role: "Gerente",
    status: "Ativo",
  },

  {
    id: 3,
    name: "Pedro Henrique",
    email: "pedro@atrix.com",
    role: "Usuário",
    status: "Inativo",
  },

  {
    id: 4,
    name: "Ana Luiza",
    email: "ana@atrix.com",
    role: "Moderador",
    status: "Ativo",
  },
];

export default function Usuarios() {
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
            Usuários
          </h1>

          <p
            className="mb-0"
            style={{
              color: "#71717a",
              fontSize: ".95rem",
            }}
          >
            Gerenciamento de usuários da plataforma
          </p>
        </div>

        {/* BUTTON */}
        <button
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          data-bs-toggle="modal"
          data-bs-target="#newUserModal"
          style={{
            background: "#c0012a",
            border: "1px solid rgba(255,255,255,0.06)",
            color: "#ffffff",
            borderRadius: "14px",
            fontWeight: "600",
          }}
        >
          <i className="bi bi-plus-lg"></i>
          Novo Usuário
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
              Lista de Usuários
            </h4>

            <p
              className="mb-0"
              style={{
                color: "#71717a",
                fontSize: ".9rem",
              }}
            >
              Controle e gerenciamento dos usuários
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
              placeholder="Pesquisar usuário..."
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
                  Usuário
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
                  Cargo
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
              {users.map((user) => (
                <tr
                  key={user.id}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  {/* USER */}
                  <td
                    className="py-3"
                    style={{
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      {/* AVATAR */}
                      <div
                        className="d-flex justify-content-center align-items-center fw-bold"
                        style={{
                          width: "46px",
                          height: "46px",
                          borderRadius: "14px",
                          background: "rgba(255,136,0,0.12)",
                          border: "1px solid rgba(255,179,0,0.12)",
                          color: "#ffb300",
                          fontSize: ".9rem",
                        }}
                      >
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
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
                          {user.name}
                        </div>

                        <div
                          style={{
                            color: "#71717a",
                            fontSize: ".8rem",
                          }}
                        >
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* ROLE */}
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
                      {user.role}
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

                        background:
                          user.status === "Ativo"
                            ? "rgba(34,197,94,0.10)"
                            : "rgba(245,6,29,0.10)",

                        border:
                          user.status === "Ativo"
                            ? "1px solid rgba(34,197,94,0.15)"
                            : "1px solid rgba(245,6,29,0.15)",

                        color:
                          user.status === "Ativo"
                            ? "#22c55e"
                            : "#f5061d",

                        fontSize: ".8rem",
                        fontWeight: "600",
                      }}
                    >
                      {user.status}
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
                        href={`/dashboard/usuarios/${user.id}`}
                        className="btn d-flex align-items-center justify-content-center"
                        style={{
                          width: "42px",
                          height: "42px",

                          borderRadius: "12px",

                          background: "#151518",

                          border:
                            "1px solid rgba(255,255,255,0.06)",

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

                          border:
                            "1px solid rgba(245,6,29,0.15)",

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
        id="newUserModal"
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

                    background:
                      "rgba(255,179,0,0.08)",

                    border:
                      "1px solid rgba(255,179,0,0.12)",
                  }}
                >
                  <i
                    className="bi bi-grid-1x2-fill"
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
                  Cadastro
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
                    label: "Nome",
                    placeholder: "Seu nome completo",
                  },

                  {
                    label: "Email empresarial",
                    placeholder: "email@empresa.com",
                  },

                  {
                    label: "CNPJ",
                    placeholder: "00.000.000/0000-00",
                  },

                  {
                    label: "Empresa",
                    placeholder: "Sua empresa",
                  },

                  {
                    label: "Cargo",
                    placeholder:
                      "Cargo que ocupa em sua empresa",
                  },

                  {
                    label: "CEP",
                    placeholder: "00000-000",
                  },

                  {
                    label: "Endereço",
                    placeholder:
                      "Rua, número, bairro",
                  },

                  {
                    label: "Senha",
                    placeholder: "Crie uma senha",
                    type: "password",
                  },

                  {
                    label: "Confirmar senha",
                    placeholder:
                      "Confirme sua senha",
                    type: "password",
                  },
                ].map((field, index) => (
                  <div
                    key={index}
                    className="col-12 col-lg-6"
                  >
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
                        background:
                          "rgba(0,0,0,0.18)",

                        border:
                          "1px solid rgba(245,6,29,0.35)",

                        color: "#ffffff",

                        height: "56px",

                        borderRadius: "16px",
                      }}
                    />
                  </div>
                ))}

                {/* SELECT */}
                <div className="col-12 col-lg-6">
                  <label
                    className="form-label mb-2"
                    style={{
                      color: "#f3f4f6",
                      fontSize: ".92rem",
                    }}
                  >
                    Tipo
                  </label>

                  <select
                    className="form-select border-0 shadow-none"
                    style={{
                      backgroundColor:
                        "rgba(0,0,0,0.18)",

                      border:
                        "1px solid rgba(245,6,29,0.35)",

                      color: "#ffffff",

                      height: "56px",

                      borderRadius: "16px",
                    }}
                  >
                    <option>
                      Selecione o tipo
                    </option>

                    <option>
                      Administrador
                    </option>

                    <option>
                      Moderador
                    </option>

                    <option>Usuário</option>
                  </select>
                </div>
              </div>

              {/* BUTTON */}
              <div className="mt-5">
                <button
                  className="btn w-100 py-3 fw-semibold"
                  style={{
                    background:
                      "linear-gradient(90deg,#ff8800,#ffb300)",

                    border: "none",

                    color: "#3b0215",

                    borderRadius: "16px",

                    fontSize: "1rem",
                  }}
                >
                  Criar usuário
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}