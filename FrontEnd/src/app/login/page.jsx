"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");

export default function Login() {
  const mountRef = useRef(null);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const lerJsonComSeguranca = async (response) => {
    try {
      return await response.json();
    } catch {
      return {};
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setErro("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const data = await lerJsonComSeguranca(response);

      if (response.ok && (data.sucesso || data.success)) {
        const token = data.dados?.token;
        const usuario = data.dados?.usuario;

        if (!token || !usuario) {
          setErro("Resposta do servidor incompleta. Token ou usuário não recebido.");
          return;
        }

        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuario));

        const tipoUsuario = usuario.tipo?.toLowerCase();

        if (tipoUsuario === "administrador" || tipoUsuario === "admin") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }

        return;
      }

      setErro(data.mensagem || data.erro || "Email ou senha inválidos.");
    } catch (error) {
      console.error("Erro na requisição de login:", error);
      setErro("Erro de conexão com o servidor. Verifique se o backend está ligado na porta 3001.");
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
      <div
        ref={mountRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 30%, #1a0a0a 80%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          position: "relative",
          zIndex: 2,
        }}
      >
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

          <form onSubmit={handleLogin}>
            {erro && (
              <div
                className="alert alert-danger p-2 text-center"
                style={{
                  fontSize: "14px",
                  borderRadius: "10px",
                }}
              >
                {erro}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Email</label>

              <input
                type="email"
                className="form-control"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
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
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                autoComplete="current-password"
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
              type="submit"
              className="btn w-100 mt-1"
              disabled={loading}
              style={{
                backgroundColor: "#ffb300",
                color: "#1a0a0a",
                borderRadius: "10px",
                fontWeight: "bold",
                fontSize: "16px",
                boxShadow: "0 0 20px rgba(255,179,0,0.35)",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p
            className="text-center mt-3 d-flex flex-column gap-2"
            style={{
              color: "#ccc",
              fontSize: "14px",
            }}
          >
            <span>
              Não tem conta?{" "}
              <Link
                href="/cadastro"
                style={{
                  color: "#0d6efd",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
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