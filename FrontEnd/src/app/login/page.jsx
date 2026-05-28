"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import Link from "next/link";

export default function Login() {
  const mountRef = useRef(null);

  const router = useRouter();
  const [nome_user, setUsuario] = useState("");
  const [senha, setSenha ] = useState("");
  const [erro, setErro] = useState("");


  function fazerLogin(e) {
    e.preventDefault();

    setLoading(true);
    setErro("");

    fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome_user: nome_user,
        senha: senha,
      }),
    })
      .then((res) => {
        return res.json().then((data) => {
          if (!res.ok) {
            throw new Error(data.mensagem || "Erro ao fazer login");
          }

          return data;
        });
      })
      .then((data) => {
        console.log("Login feito:", data);

        // Se sua API retornar token
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // Redireciona depois do login
        router.push("/");
      })
      .catch((error) => {
        setErro(error.message);
      })
  }

  useEffect(() => {
    // ... (mesmo código Three.js)
  }, []);

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

      {/* ✅ Bootstrap container para centralizar o card */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", position: "relative", zIndex: 2 }}
      >
        {/* Login card — largura fixa, não cresce */}
        <div
          style={{
            backgroundColor: "rgba(148, 5, 50, 0.4)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            padding: "40px",
            borderRadius: "20px",
            width: "350px",
            maxWidth: "calc(100vw - 32px)",   // ← responsivo em mobile
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
              <form onSubmit={fazerLogin}>
          <div className="mb-3">
            <label className="form-label">Usuário</label>
            <input
              type="text"
              className="form-control"
              placeholder="Digite seu usuário"
              style={{
                borderRadius: "10px",
                border: "1px solid rgba(245, 6, 29, 0.6)",
                backgroundColor: "rgba(26, 10, 10, 0.7)",
                color: "white",
                backdropFilter: "blur(4px)",
              }}
              value={nome_user}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              type="password "
              className="form-control"
              placeholder="Digite sua senha"
              style={{
                borderRadius: "10px",
                border: "1px solid rgba(245, 6, 29, 0.6)",
                backgroundColor: "rgba(26, 10, 10, 0.7)",
                color: "white",
                backdropFilter: "blur(4px)",
              }}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn w-100 mt-1"
            style={{
              backgroundColor: "#ffb300",
              color: "#1a0a0a",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "16px",
              boxShadow: "0 0 20px rgba(255,179,0,0.35)",
            }}
          >
            Entrar
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