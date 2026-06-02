"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [carregando, setCarregando] = useState(true);

  const [formData, setFormData] = useState({
    nome_user: "", email: "", cnpj: "", empresa: "", cargo: "", 
    cep: "", endereco: "", senha: "", confirmarSenha: "", tipo: ""
  });

  const [formErro, setFormErro] = useState(null);
  const [formSucesso, setFormSucesso] = useState(null);

  // Busca os usuários ao carregar a página
  useEffect(() => {
    carregarUsuarios();
  }, []);

  // Função auxiliar para pegar o token do Admin (ajuste se salvar em Cookies/sessionStorage)
  const obterTokenAdmin = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token"); 
    }
    return null;
  };

  const carregarUsuarios = async () => {
    setCarregando(true);
    const token = obterTokenAdmin();

    try {
      // GET /api/usuarios protegido por authMiddleware e adminMiddleware
      const res = await fetch(`http://localhost:3001/api/usuarios`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }); 

      if (res.ok) {
        const data = await res.json();
        console.log(data); // confira o retorno
        setUsuarios(data.dados); 
      } else {
        console.error("Erro do servidor ao listar:", res.status);
      }
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    } finally {
      setCarregando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErro(null);
    setFormSucesso(null);

    if (formData.senha !== formData.confirmarSenha) {
      return setFormErro("As senhas não coincidem.");
    }

    const cnpjLimpo = formData.cnpj.replace(/\D/g, "");
    if (cnpjLimpo.length !== 14) {
      return setFormErro("O CNPJ deve conter exatamente 14 números.");
    }

    const token = obterTokenAdmin();

    try {
      // CORREÇÃO: Batendo na rota correta de Admin do seu backend: POST /api/usuarios
      const res = await fetch("/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          nome_user: formData.nome_user,
          email: formData.email,
          cnpj: cnpjLimpo,
          empresa: formData.empresa,
          cargo: formData.cargo,
          cep: formData.cep,
          endereco: formData.endereco,
          senha: formData.senha,
          tipo: formData.tipo,
        }),
      });

      const data = await res.json();

      if (res.ok && (data.sucesso || data.success)) {
        setFormSucesso("Usuário criado com sucesso!");
        setFormData({
          nome_user: "", email: "", cnpj: "", empresa: "", cargo: "", 
          cep: "", endereco: "", senha: "", confirmarSenha: "", tipo: ""
        });
        
        carregarUsuarios(); 

        setTimeout(() => {
          const botaoFechar = document.getElementById("closeModalBtn");
          if (botaoFechar) botaoFechar.click();
          setFormSucesso(null);
        }, 1500);
      } else {
        setFormErro(data.mensagem || data.erro || "Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setFormErro("Erro de conexão com o servidor.");
    }
  };

  const handleDelete = async (id_user) => {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;
    const token = obterTokenAdmin();

    try {
      // CORREÇÃO: Rota de exclusão do Admin: DELETE /api/usuarios/admin/:id_user
      const res = await fetch(`/api/usuarios/admin/${id_user}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        setUsuarios(usuarios.filter(user => user.id_user !== id_user));
      } else {
        const data = await res.json();
        alert(data.mensagem || "Erro ao excluir usuário.");
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  const usuariosFiltrados = usuarios.filter((user) =>
    user.nome_user?.toLowerCase().includes(pesquisa.toLowerCase()) ||
    user.email?.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="container-fluid py-4 px-3 px-lg-4" style={{ background: "#09090b", minHeight: "100vh" }}>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h1 className="fw-bold mb-1" style={{ color: "#ffb300", fontSize: "2rem", letterSpacing: "-1px" }}>
            Usuários
          </h1>
          <p className="mb-0" style={{ color: "#71717a", fontSize: ".95rem" }}>
            Gerenciamento de usuários da plataforma
          </p>
        </div>

        <button
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          data-bs-toggle="modal"
          data-bs-target="#newUserModal"
          style={{
            background: "#c0012a", border: "1px solid rgba(255,255,255,0.06)",
            color: "#ffffff", borderRadius: "14px", fontWeight: "600",
          }}
        >
          <i className="bi bi-plus-lg"></i>
          Novo Usuário
        </button>
      </div>

      {/* TABLE CARD */}
      <div className="p-3 p-lg-4" style={{ background: "#111113", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "28px" }}>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <h4 className="fw-bold mb-1" style={{ color: "#ffffff", letterSpacing: "-0.5px" }}>
              Lista de Usuários
            </h4>
            <p className="mb-0" style={{ color: "#71717a", fontSize: ".9rem" }}>
              Controle e gerenciamento dos usuários
            </p>
          </div>

          <div className="d-flex align-items-center px-3" style={{ background: "#151518", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", minWidth: "260px", height: "46px" }}>
            <i className="bi bi-search" style={{ color: "#71717a" }} />
            <input
              type="text"
              placeholder="Pesquisar usuário..."
              className="form-control border-0 shadow-none"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              style={{ background: "transparent", color: "#ffffff", fontSize: ".92rem" }}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0" style={{ color: "#ffffff" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <th className="py-3" style={{ color: "#71717a", fontWeight: "500", border: "none", background: "transparent" }}>Usuário</th>
                <th className="py-3" style={{ color: "#71717a", fontWeight: "500", border: "none", background: "transparent" }}>Cargo</th>
                <th className="py-3" style={{ color: "#71717a", fontWeight: "500", border: "none", background: "transparent" }}>Tipo</th>
                <th className="py-3 text-end" style={{ color: "#71717a", fontWeight: "500", border: "none", background: "transparent" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {carregando ? (
                <tr><td colSpan="4" className="text-center py-4 text-muted">Carregando usuários...</td></tr>
              ) : usuariosFiltrados.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-4 text-muted">Nenhum usuário encontrado.</td></tr>
              ) : (
                usuariosFiltrados.map((user) => (
                  <tr key={user.id_user} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td className="py-3" style={{ background: "transparent", border: "none" }}>
                      <div className="d-flex align-items-center">
                        <div
                          className="d-flex justify-content-center align-items-center fw-bold text-uppercase"
                          style={{
                            width: "46px", height: "46px", borderRadius: "14px",
                            background: "rgba(255,136,0,0.12)", border: "1px solid rgba(255,179,0,0.12)", color: "#ffb300", fontSize: ".9rem",
                          }}
                        >
                          {user.nome_user ? user.nome_user.split(" ").map((n) => n[0]).slice(0, 2).join("") : "US"}
                        </div>
                        <div className="ms-3">
                          <div className="fw-semibold" style={{ color: "#ffffff", fontSize: ".95rem" }}>{user.nome_user}</div>
                          <div style={{ color: "#71717a", fontSize: ".8rem" }}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ background: "transparent", border: "none" }}>
                      <span style={{ color: "#d4d4d8", fontSize: ".9rem" }}>{user.cargo}</span>
                    </td>
                    <td style={{ background: "transparent", border: "none" }}>
                      <span
                        className="px-3 py-2 d-inline-flex align-items-center text-capitalize"
                        style={{
                          borderRadius: "12px",
                          background: user.tipo === "fornecedor" ? "rgba(34,197,94,0.10)" : "rgba(255, 179, 0, 0.10)",
                          border: user.tipo === "fornecedor" ? "1px solid rgba(34,197,94,0.15)" : "1px solid rgba(255, 179, 0, 0.15)",
                          color: user.tipo === "fornecedor" ? "#22c55e" : "#ffb300", fontSize: ".8rem", fontWeight: "600",
                        }}
                      >
                        {user.tipo}
                      </span>
                    </td>
                    <td className="text-end" style={{ background: "transparent", border: "none" }}>
                      <div className="d-flex justify-content-end gap-2">
                        <Link
                          href={`/dashboard/usuarios/${user.id_user}`}
                          className="btn d-flex align-items-center justify-content-center"
                          style={{ width: "42px", height: "42px", borderRadius: "12px", background: "#151518", border: "1px solid rgba(255,255,255,0.06)", color: "#ffb300" }}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Link>
                        <button
                          onClick={() => handleDelete(user.id_user)}
                          className="btn d-flex align-items-center justify-content-center"
                          style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(245,6,29,0.10)", border: "1px solid rgba(245,6,29,0.15)", color: "#f5061d" }}
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

      {/* MODAL */}
      <div className="modal fade" id="newUserModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <form 
            onSubmit={handleSubmit}
            className="modal-content border-0 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #940533 0%, #7d042b 35%, #5f0321 70%, #3b0215 100%)", borderRadius: "28px" }}
          >
            <div className="modal-header border-0 pt-4 px-4 position-relative">
              <div className="w-100 text-center">
                <div className="d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "78px", height: "78px", borderRadius: "22px", background: "rgba(255,179,0,0.08)", border: "1px solid rgba(255,179,0,0.12)" }}>
                  <i className="bi bi-grid-1x2-fill" style={{ color: "#ffb300", fontSize: "2rem" }} />
                </div>
                <h2 className="fw-bold mb-0" style={{ color: "#ffb300", letterSpacing: "-1px" }}>Cadastro</h2>
              </div>
              <button type="button" id="closeModalBtn" className="btn-close btn-close-white position-absolute top-0 end-0 m-4" data-bs-dismiss="modal" aria-label="Close" />
            </div>

            <div className="modal-body p-4 p-lg-5">
              {formErro && <div className="alert alert-danger p-2 mb-4">{formErro}</div>}
              {formSucesso && <div className="alert alert-success p-2 mb-4">{formSucesso}</div>}

              <div className="row g-4">
                {[
                  { name: "nome_user", label: "Nome", placeholder: "Seu nome completo" },
                  { name: "email", label: "Email empresarial", placeholder: "email@empresa.com", type: "email" },
                  { name: "cnpj", label: "CNPJ", placeholder: "Apenas números (14 dígitos)" },
                  { name: "empresa", label: "Empresa", placeholder: "Sua empresa" },
                  { name: "cargo", label: "Cargo", placeholder: "Cargo que ocupa em sua empresa" },
                  { name: "cep", label: "CEP", placeholder: "00000-000" },
                  { name: "endereco", label: "Endereço", placeholder: "Rua, número, bairro" },
                  { name: "senha", label: "Senha", placeholder: "Crie uma senha", type: "password" },
                  { name: "confirmarSenha", label: "Confirmar senha", placeholder: "Confirme sua senha", type: "password" },
                ].map((field, index) => (
                  <div key={index} className="col-12 col-lg-6">
                    <label className="form-label mb-2" style={{ color: "#f3f4f6", fontSize: ".92rem" }}>{field.label}</label>
                    <input
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      type={field.type || "text"}
                      className="form-control border-0 shadow-none"
                      placeholder={field.placeholder}
                      required
                      style={{ background: "rgba(0,0,0,0.18)", border: "1px solid rgba(245,6,29,0.35)", color: "#ffffff", height: "56px", borderRadius: "16px" }}
                    />
                  </div>
                ))}

                <div className="col-12 col-lg-6">
                  <label className="form-label mb-2" style={{ color: "#f3f4f6", fontSize: ".92rem" }}>Tipo</label>
                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    className="form-select border-0 shadow-none"
                    required
                    style={{ backgroundColor: "rgba(0,0,0,0.18)", border: "1px solid rgba(245,6,29,0.35)", color: "#ffffff", height: "56px", borderRadius: "16px" }}
                  >
                    <option value="" disabled style={{ background: "#3b0215", color: "#fff" }}>Selecione o tipo</option>
                    <option value="comum" style={{ background: "#3b0215", color: "#fff" }}>Comum (Cliente)</option>
                    <option value="fornecedor" style={{ background: "#3b0215", color: "#fff" }}>Fornecedor</option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <button type="submit" className="btn w-100 py-3 fw-semibold" style={{ background: "linear-gradient(90deg,#ff8800,#ffb300)", border: "none", color: "#3b0215", borderRadius: "16px", fontSize: "1rem" }}>
                  Criar usuário
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}