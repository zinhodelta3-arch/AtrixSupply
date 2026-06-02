"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ Importado para redirecionamento

export default function Login() {
  const mountRef = useRef(null);
  const router = useRouter();

  // ✅ Estados para os inputs, carregamento e mensagens de erro
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ... (seu código Three.js aqui)
  }, []);

  // ✅ Função que gerencia o envio do formulário
  const handleLogin = async (e) => {
    e.preventDefault(); // Evita o recarregamento da página
    setErro("");
    setLoading(true);

    try {
      // Substitua pela URL base da sua API
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok && data.sucesso) {
        // ✅ Salva o token JWT e os dados do usuário (ajuste conforme a necessidade do seu app)
        localStorage.setItem("token", data.dados.token);
        localStorage.setItem("usuario", JSON.stringify(data.dados.usuario));
        
        // ✅ Redireciona para a página principal ou dashboard
        if(localStorage.usuario.tipo === 'administrador'){
          router.push("/dashboard"); 
        } else{
          router.push("/");
        }
        
      } else {
        // Mostra a mensagem de erro vinda do backend
        setErro(data.mensagem || "Erro ao realizar login.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setErro("Erro de conexão com o servidor. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#1a0a0a",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Three.js canvas mount */}
      <div ref={mountRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />

      {/* Radial vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 30%, #1a0a0a 80%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Bootstrap container para centralizar o card */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", position: "relative", zIndex: 2 }}
      >
        {/* Login card */}
        <div
          style={{
            backgroundColor: "rgba(148, 5, 50, 0.4)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            padding: "40px",
            borderRadius: "20px",
            width: "350px",
            maxWidth: "calc(100vw - 32px)",
            boxShadow:
              "0 0 40px rgba(245, 6, 30, 0.4), 0 0 80px rgba(245, 6, 30, 0.15), inset 0 1px 0 rgba(255,179,0,0.15)",
            border: "1px solid rgba(245, 6, 30, 0.3)",
            color: "white",
          }}
        >
          <div className="text-center">
            <div className="d-flex justify-content-center">
              <Image
                src="/ATRIXsuply.png"
                alt="ATRIXsuply logo"
                width={300}
                height={200}
                priority
                style={{
                  marginTop: "-70px",
                  marginBottom: "-30px",
                  filter: "drop-shadow(0 0 12px rgba(255,179,0,0.4))",
                }}
              />
            </div>
            <h1
              style={{
                color: "#ffb300",
                fontSize: "32px",
                marginBottom: "20px",
                textShadow: "0 0 20px rgba(255,179,0,0.4)",
              }}
            >
              Login
            </h1>
          </div>

          {/* ✅ Transformado em <form> para suportar o evento onSubmit (Enter no teclado) */}
          <form onSubmit={handleLogin}>
            
            {/* Exibição condicional de erro */}
            {erro && (
              <div className="alert alert-danger p-2 text-center" style={{ fontSize: "14px", borderRadius: "10px" }}>
                {erro}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Email</label> {/* ✅ Alterado de Usuário para Email */}
              <input
                type="email" // ✅ Melhorado para validação nativa de email
                className="form-control"
                placeholder="Digite seu email"
                value={email} // ✅ Vinculado ao estado
                onChange={(e) => setEmail(e.target.value)} // ✅ Atualiza o estado
                required
                style={{
                  borderRadius: "10px",
                  border: "1px solid rgba(245, 6, 29, 0.6)",
                  backgroundColor: "rgba(26, 10, 10, 0.7)",
                  color: "white",
                  backdropFilter: "blur(4px)",
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Senha</label>
              <input
                type="password"
                className="form-control"
                placeholder="Digite sua senha"
                value={senha} // ✅ Vinculado ao estado
                onChange={(e) => setSenha(e.target.value)} // ✅ Atualiza o estado
                required
                style={{
                  borderRadius: "10px",
                  border: "1px solid rgba(245, 6, 29, 0.6)",
                  backgroundColor: "rgba(26, 10, 10, 0.7)",
                  color: "white",
                  backdropFilter: "blur(4px)",
                }}
              />
            </div>

            <button
              type="submit" // ✅ Alterado para submit
              className="btn w-100 mt-1"
              disabled={loading} // ✅ Desabilita o botão enquanto carrega
              style={{
                backgroundColor: "#ffb300",
                color: "#1a0a0a",
                borderRadius: "10px",
                fontWeight: "bold",
                fontSize: "16px",
                boxShadow: "0 0 20px rgba(255,179,0,0.35)",
                opacity: loading ? 0.7 : 1, // Feedback visual de carregamento
              }}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p
            className="text-center mt-3 d-flex flex-column gap-2"
            style={{ color: "#ccc", fontSize: "14px" }}
          >
            <span>
              Não tem conta?{" "}
              <Link href="/cadastro" style={{ color: "#0d6efd", textDecoration: "none", fontWeight: "bold" }}>
                Cadastre-se
              </Link>
            </span>
            <span>Esqueceu sua senha?</span>
          </p>
        </div>
      </div>
    </div>
  );
}