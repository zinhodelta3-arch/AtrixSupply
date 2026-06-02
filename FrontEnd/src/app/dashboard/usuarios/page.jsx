"use client";

import { useState, useEffect } from "react";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");

const formInicial = {
  nome_user: "",
  email: "",
  cnpj: "",
  empresa: "",
  cargo: "",
  cep: "",
  endereco: "",
  senha: "",
  confirmarSenha: "",
  tipo: "",
};

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erroLista, setErroLista] = useState(null);

  const [formData, setFormData] = useState(formInicial);

  const [formErro, setFormErro] = useState(null);
  const [formSucesso, setFormSucesso] = useState(null);

  const [modalCriarAberto, setModalCriarAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [processandoForm, setProcessandoForm] = useState(false);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const obterTokenAdmin = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }

    return null;
  };

  const lerJsonComSeguranca = async (res) => {
    try {
      return await res.json();
    } catch {
      return {};
    }
  };

  const carregarUsuarios = async () => {
    setCarregando(true);
    setErroLista(null);

    const token = obterTokenAdmin();

    try {
      const res = await fetch(`${API_URL}/api/usuarios`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await lerJsonComSeguranca(res);

      if (res.ok) {
        setUsuarios(Array.isArray(data.dados) ? data.dados : []);
      } else {
        console.error("Erro do servidor ao listar:", res.status, data);
        setErroLista(data.mensagem || data.erro || "Erro ao carregar usuários.");
        setUsuarios([]);
      }
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      setErroLista("Erro de conexão com o servidor.");
      setUsuarios([]);
    } finally {
      setCarregando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const limparFormulario = () => {
    setFormData(formInicial);
  };

  const limparMensagens = () => {
    setFormErro(null);
    setFormSucesso(null);
  };

  const abrirModalCriar = () => {
    limparFormulario();
    limparMensagens();
    setUsuarioEditando(null);
    setModalCriarAberto(true);
  };

  const abrirModalEditar = (user) => {
    limparMensagens();
    setUsuarioEditando(user);

    setFormData({
      nome_user: user.nome_user || "",
      email: user.email || "",
      cnpj: user.cnpj || "",
      empresa: user.empresa || "",
      cargo: user.cargo || "",
      cep: user.cep || "",
      endereco: user.endereco || "",
      senha: "",
      confirmarSenha: "",
      tipo: user.tipo || "",
    });

    setModalEditarAberto(true);
  };

  const fecharModais = () => {
    setModalCriarAberto(false);
    setModalEditarAberto(false);
    setUsuarioEditando(null);
    setProcessandoForm(false);
    limparFormulario();
    limparMensagens();
  };

  const validarCriacao = () => {
    if (!formData.nome_user.trim()) return "O nome é obrigatório.";
    if (!formData.email.trim()) return "O email é obrigatório.";
    if (!formData.email.includes("@")) return "Digite um email válido.";
    if (!formData.empresa.trim()) return "A empresa é obrigatória.";
    if (!formData.cargo.trim()) return "O cargo é obrigatório.";
    if (!formData.cep.trim()) return "O CEP é obrigatório.";
    if (!formData.endereco.trim()) return "O endereço é obrigatório.";
    if (!formData.tipo.trim()) return "Selecione o tipo do usuário.";

    const cnpjLimpo = formData.cnpj.replace(/\D/g, "");

    if (cnpjLimpo.length !== 14) {
      return "O CNPJ deve conter exatamente 14 números.";
    }

    if (!formData.senha.trim()) return "A senha é obrigatória.";

    if (formData.senha !== formData.confirmarSenha) {
      return "As senhas não coincidem.";
    }

    return null;
  };

  const validarEdicao = () => {
    if (!formData.nome_user.trim()) return "O nome é obrigatório.";
    if (!formData.email.trim()) return "O email é obrigatório.";
    if (!formData.email.includes("@")) return "Digite um email válido.";
    if (!formData.empresa.trim()) return "A empresa é obrigatória.";
    if (!formData.cargo.trim()) return "O cargo é obrigatório.";
    if (!formData.cep.trim()) return "O CEP é obrigatório.";
    if (!formData.endereco.trim()) return "O endereço é obrigatório.";
    if (!formData.tipo.trim()) return "Selecione o tipo do usuário.";

    const cnpjLimpo = formData.cnpj.replace(/\D/g, "");

    if (cnpjLimpo.length !== 14) {
      return "O CNPJ deve conter exatamente 14 números.";
    }

    return null;
  };

  const handleCriarUsuario = async (e) => {
  e.preventDefault();

  setFormErro(null);
  setFormSucesso(null);

  const token = obterTokenAdmin();

  if (!token) {
    setFormErro("Token não encontrado. Faça login novamente.");
    return;
  }

  const erroValidacao = validarCriacao();

  if (erroValidacao) {
    setFormErro(erroValidacao);
    return;
  }

  const cnpjLimpo = formData.cnpj.replace(/\D/g, "");

  setProcessandoForm(true);

  try {
    const res = await fetch(`${API_URL}/api/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nome_user: formData.nome_user.trim(),
        email: formData.email.trim(),
        cnpj: cnpjLimpo,
        empresa: formData.empresa.trim(),
        cargo: formData.cargo.trim(),
        cep: formData.cep.trim(),
        endereco: formData.endereco.trim(),
        senha: formData.senha,
        tipo: formData.tipo,
      }),
    });

    const data = await lerJsonComSeguranca(res);

    console.log("STATUS CADASTRO:", res.status);
    console.log("RESPOSTA CADASTRO:", data);

    if (res.ok) {
      setFormSucesso(data.mensagem || "Usuário criado com sucesso!");
      await carregarUsuarios();

      setTimeout(() => {
        fecharModais();
      }, 900);

      return;
    }

    const detalhes =
      Array.isArray(data.detalhes)
        ? data.detalhes.map((item) => item.mensagem).join(" | ")
        : null;

    console.log("STATUS:", res.status);
    console.log("RESPOSTA DO BACKEND:", data);

setFormErro(
  data.mensagem ||
  data.erro ||
  data.detalhes?.map((erro) => erro.mensagem).join(", ") ||
  "Erro ao cadastrar usuário."
);
  } catch (error) {
    console.error("Erro na requisição de cadastro:", error);
    setFormErro("Erro de conexão com o servidor.");
  } finally {
    setProcessandoForm(false);
  }
};

  const handleEditarUsuario = async (e) => {
    e.preventDefault();

    if (!usuarioEditando) {
      setFormErro("Nenhum usuário selecionado para edição.");
      return;
    }

    setFormErro(null);
    setFormSucesso(null);

    const erroValidacao = validarEdicao();

    if (erroValidacao) {
      setFormErro(erroValidacao);
      return;
    }

    const token = obterTokenAdmin();
    const cnpjLimpo = formData.cnpj.replace(/\D/g, "");

    setProcessandoForm(true);

    try {
      const res = await fetch(`${API_URL}/api/usuarios/admin/${usuarioEditando.id_user}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome_user: formData.nome_user,
          email: formData.email,
          cnpj: cnpjLimpo,
          empresa: formData.empresa,
          cargo: formData.cargo,
          cep: formData.cep,
          endereco: formData.endereco,
          tipo: formData.tipo,
        }),
      });

      const data = await lerJsonComSeguranca(res);

      if (res.ok && (data.sucesso || data.success)) {
        setFormSucesso("Usuário atualizado com sucesso!");
        await carregarUsuarios();

        setTimeout(() => {
          fecharModais();
        }, 900);
      } else {
        setFormErro(data.mensagem || data.erro || "Erro ao atualizar usuário.");
      }
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
      setFormErro("Erro de conexão com o servidor.");
    } finally {
      setProcessandoForm(false);
    }
  };

  const handleDelete = async (id_user) => {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;

    const token = obterTokenAdmin();

    try {
      const res = await fetch(`${API_URL}/api/usuarios/admin/${id_user}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await lerJsonComSeguranca(res);

      if (res.ok) {
        setUsuarios((prev) => prev.filter((user) => user.id_user !== id_user));
      } else {
        alert(data.mensagem || data.erro || "Erro ao excluir usuário.");
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
      alert("Erro de conexão com o servidor.");
    }
  };

  const usuariosFiltrados = usuarios.filter((user) => {
    const nome = user.nome_user || "";
    const email = user.email || "";

    return (
      nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
      email.toLowerCase().includes(pesquisa.toLowerCase())
    );
  });

  const inputStyle = {
    background: "rgba(0,0,0,0.18)",
    border: "1px solid rgba(245,6,29,0.35)",
    color: "#ffffff",
    height: "56px",
    borderRadius: "16px",
  };

  const modalBackdropStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    background: "rgba(0,0,0,.78)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    padding: "24px",
    overflowY: "auto",
  };

  const renderFormularioUsuario = ({ modo }) => {
    const editando = modo === "editar";

    return (
      <form
        onSubmit={editando ? handleEditarUsuario : handleCriarUsuario}
        className="border-0 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #940533 0%, #7d042b 35%, #5f0321 70%, #3b0215 100%)",
          borderRadius: "28px",
          width: "100%",
          maxWidth: "1120px",
        }}
      >
        <div className="border-0 pt-4 px-4 position-relative">
          <div className="w-100 text-center">
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
                className={editando ? "bi bi-pencil-square" : "bi bi-grid-1x2-fill"}
                style={{ color: "#ffb300", fontSize: "2rem" }}
              />
            </div>

            <h2
              className="fw-bold mb-0"
              style={{ color: "#ffb300", letterSpacing: "-1px" }}
            >
              {editando ? "Editar Usuário" : "Cadastro"}
            </h2>

            <p className="mt-2 mb-0" style={{ color: "rgba(255,255,255,.72)" }}>
              {editando
                ? "Atualize os dados do usuário selecionado"
                : "Crie um novo usuário para a plataforma"}
            </p>
          </div>

          <button
            type="button"
            onClick={fecharModais}
            className="btn-close btn-close-white position-absolute top-0 end-0 m-4"
            aria-label="Close"
          />
        </div>

        <div className="p-4 p-lg-5">
          {formErro && (
            <div className="alert alert-danger p-2 mb-4">{formErro}</div>
          )}

          {formSucesso && (
            <div className="alert alert-success p-2 mb-4">{formSucesso}</div>
          )}

          <div className="row g-4">
            {[
              {
                name: "nome_user",
                label: "Nome",
                placeholder: "Seu nome completo",
              },
              {
                name: "email",
                label: "Email empresarial",
                placeholder: "email@empresa.com",
                type: "email",
              },
              {
                name: "cnpj",
                label: "CNPJ",
                placeholder: "Apenas números (14 dígitos)",
              },
              {
                name: "empresa",
                label: "Empresa",
                placeholder: "Sua empresa",
              },
              {
                name: "cargo",
                label: "Cargo",
                placeholder: "Cargo que ocupa em sua empresa",
              },
              {
                name: "cep",
                label: "CEP",
                placeholder: "00000-000",
              },
              {
                name: "endereco",
                label: "Endereço",
                placeholder: "Rua, número, bairro",
              },
            ].map((field, index) => (
              <div key={index} className="col-12 col-lg-6">
                <label
                  className="form-label mb-2"
                  style={{ color: "#f3f4f6", fontSize: ".92rem" }}
                >
                  {field.label}
                </label>

                <input
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  type={field.type || "text"}
                  className="form-control shadow-none"
                  placeholder={field.placeholder}
                  required
                  style={inputStyle}
                />
              </div>
            ))}

            {!editando && (
              <>
                <div className="col-12 col-lg-6">
                  <label
                    className="form-label mb-2"
                    style={{ color: "#f3f4f6", fontSize: ".92rem" }}
                  >
                    Senha
                  </label>

                  <input
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    type="password"
                    className="form-control shadow-none"
                    placeholder="Crie uma senha"
                    required
                    style={inputStyle}
                  />
                </div>

                <div className="col-12 col-lg-6">
                  <label
                    className="form-label mb-2"
                    style={{ color: "#f3f4f6", fontSize: ".92rem" }}
                  >
                    Confirmar senha
                  </label>

                  <input
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    type="password"
                    className="form-control shadow-none"
                    placeholder="Confirme sua senha"
                    required
                    style={inputStyle}
                  />
                </div>
              </>
            )}

            <div className="col-12 col-lg-6">
              <label
                className="form-label mb-2"
                style={{ color: "#f3f4f6", fontSize: ".92rem" }}
              >
                Tipo
              </label>

              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="form-select shadow-none"
                required
                style={{
                  backgroundColor: "rgba(0,0,0,0.18)",
                  border: "1px solid rgba(245,6,29,0.35)",
                  color: "#ffffff",
                  height: "56px",
                  borderRadius: "16px",
                }}
              >
                <option
                  value=""
                  disabled
                  style={{ background: "#3b0215", color: "#fff" }}
                >
                  Selecione o tipo
                </option>

                <option
                  value="comum"
                  style={{ background: "#3b0215", color: "#fff" }}
                >
                  Comum (Cliente)
                </option>

                <option
                  value="fornecedor"
                  style={{ background: "#3b0215", color: "#fff" }}
                >
                  Fornecedor
                </option>
              </select>
            </div>
          </div>

          <div className="mt-5 d-flex gap-3">
            <button
              type="button"
              onClick={fecharModais}
              className="btn py-3 fw-semibold"
              style={{
                width: "35%",
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#ffffff",
                borderRadius: "16px",
                fontSize: "1rem",
              }}
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={processandoForm}
              className="btn flex-fill py-3 fw-semibold"
              style={{
                background: "linear-gradient(90deg,#ff8800,#ffb300)",
                border: "none",
                color: "#3b0215",
                borderRadius: "16px",
                fontSize: "1rem",
                opacity: processandoForm ? 0.7 : 1,
              }}
            >
              {processandoForm
                ? editando
                  ? "Salvando..."
                  : "Criando..."
                : editando
                ? "Salvar alterações"
                : "Criar usuário"}
            </button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div
      className="container-fluid py-4 px-3 px-lg-4"
      style={{ background: "#09090b", minHeight: "100vh" }}
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
            style={{ color: "#71717a", fontSize: ".95rem" }}
          >
            Gerenciamento de usuários da plataforma
          </p>
        </div>

        <button
          type="button"
          onClick={abrirModalCriar}
          className="btn d-flex align-items-center gap-2 px-4 py-2"
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
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <h4
              className="fw-bold mb-1"
              style={{ color: "#ffffff", letterSpacing: "-0.5px" }}
            >
              Lista de Usuários
            </h4>

            <p
              className="mb-0"
              style={{ color: "#71717a", fontSize: ".9rem" }}
            >
              Controle e gerenciamento dos usuários
            </p>
          </div>

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
            <i className="bi bi-search" style={{ color: "#71717a" }} />

            <input
              type="text"
              placeholder="Pesquisar usuário..."
              className="form-control border-0 shadow-none"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              style={{
                background: "transparent",
                color: "#ffffff",
                fontSize: ".92rem",
              }}
            />
          </div>
        </div>

        {erroLista && (
          <div
            className="alert alert-danger mb-4"
            style={{ borderRadius: "14px" }}
          >
            {erroLista}
          </div>
        )}

        <div className="table-responsive">
          <table className="table align-middle mb-0" style={{ color: "#ffffff" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
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
                  Tipo
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
              {carregando ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted">
                    Carregando usuários...
                  </td>
                </tr>
              ) : usuariosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted">
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              ) : (
                usuariosFiltrados.map((user) => (
                  <tr
                    key={user.id_user}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <td
                      className="py-3"
                      style={{ background: "transparent", border: "none" }}
                    >
                      <div className="d-flex align-items-center">
                        <div
                          className="d-flex justify-content-center align-items-center fw-bold text-uppercase"
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
                          {user.nome_user
                            ? user.nome_user
                                .split(" ")
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join("")
                            : "US"}
                        </div>

                        <div className="ms-3">
                          <div
                            className="fw-semibold"
                            style={{ color: "#ffffff", fontSize: ".95rem" }}
                          >
                            {user.nome_user}
                          </div>

                          <div style={{ color: "#71717a", fontSize: ".8rem" }}>
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td style={{ background: "transparent", border: "none" }}>
                      <span style={{ color: "#d4d4d8", fontSize: ".9rem" }}>
                        {user.cargo || "Não informado"}
                      </span>
                    </td>

                    <td style={{ background: "transparent", border: "none" }}>
                      <span
                        className="px-3 py-2 d-inline-flex align-items-center text-capitalize"
                        style={{
                          borderRadius: "12px",
                          background:
                            user.tipo === "fornecedor"
                              ? "rgba(34,197,94,0.10)"
                              : "rgba(255, 179, 0, 0.10)",
                          border:
                            user.tipo === "fornecedor"
                              ? "1px solid rgba(34,197,94,0.15)"
                              : "1px solid rgba(255, 179, 0, 0.15)",
                          color:
                            user.tipo === "fornecedor" ? "#22c55e" : "#ffb300",
                          fontSize: ".8rem",
                          fontWeight: "600",
                        }}
                      >
                        {user.tipo || "comum"}
                      </span>
                    </td>

                    <td
                      className="text-end"
                      style={{ background: "transparent", border: "none" }}
                    >
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          onClick={() => abrirModalEditar(user)}
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
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(user.id_user)}
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalCriarAberto && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={modalBackdropStyle}
        >
          {renderFormularioUsuario({ modo: "criar" })}
        </div>
      )}

      {modalEditarAberto && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={modalBackdropStyle}
        >
          {renderFormularioUsuario({ modo: "editar" })}
        </div>
      )}
    </div>
  );
}