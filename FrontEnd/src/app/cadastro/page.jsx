"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import Link from "next/link";

const TERMOS_SERVICO_URL = "/docs/Termos_de_Servico_ATRIX_SUPPLY.pdf";
const TERMOS_PRIVACIDADE_URL = "/docs/Termos_de_Privacidade_ATRIX_SUPPLY.pdf";

export default function Cadastro() {
  const mountRef = useRef(null);
  const router = useRouter();

  const API_URL = (
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
  ).replace(/\/$/, "");

  const [formData, setFormData] = useState({
    nome_user: "",
    email: "",
    cnpj: "",
    empresa: "",
    cargo: "",
    tipo: "",
    cep: "",
    endereco: "",
    senha: "",
    confirmarSenha: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [aceitouTermos, setAceitouTermos] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setErro("");
    setSucesso("");

    if (!aceitouTermos) {
      setErro("Você precisa ler e aceitar os Termos de Serviço e Termos de Privacidade para efetuar o cadastro.");
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setErro("As senhas não são iguais.");
      return;
    }

    if (formData.senha.length < 6) {
      setErro("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setCarregando(true);

      const dadosParaEnviar = {
        nome_user: formData.nome_user,
        email: formData.email,
        cnpj: formData.cnpj,
        empresa: formData.empresa,
        cargo: formData.cargo,
        tipo: formData.tipo,
        cep: formData.cep,
        endereco: formData.endereco,
        senha: formData.senha,
      };

      const resposta = await fetch(`${API_URL}/api/auth/registrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosParaEnviar),
      });

      const data = await resposta.json();

      if (!resposta.ok || data.sucesso === false) {
        throw new Error(data.mensagem || "Não foi possível fazer o cadastro.");
      }

      setSucesso("Cadastro realizado com sucesso! Redirecionando para o login...");

      setFormData({
        nome_user: "",
        email: "",
        cnpj: "",
        empresa: "",
        cargo: "",
        tipo: "",
        cep: "",
        endereco: "",
        senha: "",
        confirmarSenha: "",
      });

      setAceitouTermos(false);

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    mount.appendChild(renderer.domElement);

    const PARTICLE_COUNT = 1800;

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    const velocities = [];

    const palette = [
      new THREE.Color("#940533"),
      new THREE.Color("#c0012a"),
      new THREE.Color("#f5061d"),
      new THREE.Color("#ff8800"),
      new THREE.Color("#ffb300"),
    ];

    const initParticle = (i) => {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = -6 + Math.random() * 3;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

      const col = palette[Math.floor(Math.random() * palette.length)];

      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = Math.random() * 12 + 3;

      velocities[i] = {
        vx: (Math.random() - 0.5) * 0.015,
        vy: Math.random() * 0.025 + 0.008,
        life: 0,
        maxLife: Math.random() * 200 + 80,
      };
    };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      initParticle(i);

      positions[i * 3 + 1] += Math.random() * 12 - 6;

      velocities[i].life = Math.random() * velocities[i].maxLife;
    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    geometry.setAttribute(
      "size",
      new THREE.BufferAttribute(sizes, 1)
    );

    const canvas2d = document.createElement("canvas");

    canvas2d.width = 64;
    canvas2d.height = 64;

    const ctx = canvas2d.getContext("2d");

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);

    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.4, "rgba(255,255,255,0.6)");
    grad.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const sprite = new THREE.CanvasTexture(canvas2d);

    const material = new THREE.PointsMaterial({
      size: 0.12,
      map: sprite,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);

    scene.add(particles);

    const orbColors = [
      "#940533",
      "#c0012a",
      "#f5061d",
      "#ff8800",
      "#ffb300",
      "#940533",
    ];

    const orbs = orbColors.map((color) => {
      const orbGeo = new THREE.SphereGeometry(
        0.5 + Math.random() * 0.8,
        16,
        16
      );

      const orbMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.07,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const orb = new THREE.Mesh(orbGeo, orbMat);

      orb.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        -2 + Math.random() * 2
      );

      scene.add(orb);

      return orb;
    });

    let frameId;
    let time = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      time += 0.01;

      const posArr = geometry.attributes.position.array;
      const colArr = geometry.attributes.color.array;
      const sizeArr = geometry.attributes.size.array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const v = velocities[i];

        v.life += 1;

        posArr[i * 3] += v.vx + Math.sin(time + i * 0.5) * 0.003;
        posArr[i * 3 + 1] += v.vy;

        const progress = v.life / v.maxLife;

        const alpha =
          progress < 0.2
            ? progress / 0.2
            : progress > 0.7
            ? 1 - (progress - 0.7) / 0.3
            : 1;

        const col =
          progress < 0.4
            ? palette[Math.random() > 0.5 ? 0 : 1]
            : progress < 0.7
            ? palette[2 + Math.floor(Math.random() * 2)]
            : palette[4];

        colArr[i * 3] = col.r * alpha;
        colArr[i * 3 + 1] = col.g * alpha;
        colArr[i * 3 + 2] = col.b * alpha;

        sizeArr[i] = (Math.random() * 10 + 3) * (1 - progress * 0.5);

        if (v.life >= v.maxLife || posArr[i * 3 + 1] > 7) {
          initParticle(i);
        }
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;
      geometry.attributes.size.needsUpdate = true;

      orbs.forEach((orb, idx) => {
        orb.position.y += Math.sin(time * 0.4 + idx * 1.2) * 0.005;
        orb.position.x += Math.cos(time * 0.3 + idx * 0.9) * 0.004;

        orb.material.opacity = 0.05 + Math.sin(time * 0.5 + idx) * 0.03;
      });

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);

      window.removeEventListener("resize", onResize);

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      sprite.dispose();
      renderer.dispose();
    };
  }, []);

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    marginTop: "5px",
    borderRadius: "10px",
    border: "1px solid rgba(245, 6, 29, 0.6)",
    backgroundColor: "rgba(26, 10, 10, 0.7)",
    color: "white",
    boxSizing: "border-box",
    outline: "none",
    backdropFilter: "blur(4px)",
    fontSize: "14px",
  };

  const labelStyle = {
    fontSize: "13px",
    color: "#ccc",
    display: "block",
    marginBottom: "2px",
  };

  const fieldStyle = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div
      style={{
        backgroundColor: "#1a0a0a",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        position: "relative",
        overflow: "hidden",
        padding: "20px",
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
          background:
            "radial-gradient(ellipse at center, transparent 30%, #1a0a0a 80%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <main
        style={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "rgba(148, 5, 50, 0.4)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          padding: "40px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "720px",
          boxShadow:
            "0 0 40px rgba(245, 6, 30, 0.4), 0 0 80px rgba(245, 6, 30, 0.15), inset 0 1px 0 rgba(255,179,0,0.15)",
          border: "1px solid rgba(245, 6, 30, 0.3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          src="/ATRIXsuply.png"
          alt="ATRIXsuply logo"
          width={260}
          height={174}
          priority
          style={{
            marginTop: "-70px",
            marginBottom: "-20px",
            filter: "drop-shadow(0 0 12px rgba(255,179,0,0.4))",
          }}
        />

        <h1
          style={{
            color: "#ffb300",
            fontSize: "28px",
            marginBottom: "24px",
            textShadow: "0 0 20px rgba(255,179,0,0.4)",
          }}
        >
          Cadastro
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "16px",
          }}
        >
          {erro && (
            <div
              style={{
                backgroundColor: "rgba(245, 6, 29, 0.18)",
                border: "1px solid rgba(245, 6, 29, 0.6)",
                color: "#fff",
                padding: "10px 12px",
                borderRadius: "10px",
                fontSize: "14px",
              }}
            >
              {erro}
            </div>
          )}

          {sucesso && (
            <div
              style={{
                backgroundColor: "rgba(255, 179, 0, 0.18)",
                border: "1px solid rgba(255, 179, 0, 0.6)",
                color: "#fff",
                padding: "10px 12px",
                borderRadius: "10px",
                fontSize: "14px",
              }}
            >
              {sucesso}
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div style={fieldStyle}>
              <label style={labelStyle}>Nome</label>

              <input
                name="nome_user"
                type="text"
                placeholder="Seu nome completo"
                value={formData.nome_user}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Email empresarial</label>

              <input
                name="email"
                type="email"
                placeholder="email@empresa.com"
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div style={fieldStyle}>
              <label style={labelStyle}>CNPJ</label>

              <input
                name="cnpj"
                type="text"
                placeholder="00.000.000/0000-00"
                value={formData.cnpj}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Empresa</label>

              <input
                name="empresa"
                type="text"
                placeholder="Sua empresa"
                value={formData.empresa}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Cargo</label>

              <input
                name="cargo"
                type="text"
                placeholder="Cargo que ocupa em sua empresa"
                value={formData.cargo}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Tipo</label>

              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  cursor: "pointer",
                }}
                required
              >
                <option value="" disabled>
                  Selecione o tipo
                </option>

                <option value="comum">Comum</option>
                <option value="fornecedor">Fornecedor</option>
              </select>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>CEP</label>

              <input
                name="cep"
                type="text"
                placeholder="00000-000"
                value={formData.cep}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Endereço</label>

              <input
                name="endereco"
                type="text"
                placeholder="Rua, número, bairro"
                value={formData.endereco}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div style={fieldStyle}>
              <label style={labelStyle}>Senha</label>

              <input
                name="senha"
                type="password"
                placeholder="Crie uma senha"
                value={formData.senha}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Confirmar senha</label>

              <input
                name="confirmarSenha"
                type="password"
                placeholder="Confirme sua senha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              backgroundColor: aceitouTermos
                ? "rgba(255, 179, 0, 0.12)"
                : "rgba(255, 255, 255, 0.055)",
              border: aceitouTermos
                ? "1px solid rgba(255, 179, 0, 0.55)"
                : "1px solid rgba(255, 255, 255, 0.14)",
              borderRadius: "12px",
              padding: "14px",
              color: "#fff",
            }}
          >
            <input
              id="aceite-termos-servico"
              type="checkbox"
              checked={aceitouTermos}
              onChange={(event) => setAceitouTermos(event.target.checked)}
              style={{
                width: "18px",
                height: "18px",
                marginTop: "3px",
                accentColor: "#ffb300",
                cursor: "pointer",
                flexShrink: 0,
              }}
            />

            <label
              htmlFor="aceite-termos-servico"
              style={{
                fontSize: "13px",
                lineHeight: "1.55",
                color: "rgba(255,255,255,0.82)",
                cursor: "pointer",
                margin: 0,
              }}
            >
              Para criar sua conta, você precisa ler e aceitar os{" "}
              <Link
                href={TERMOS_SERVICO_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#ffb300",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Termos de Serviço
              </Link> e {" "}
              <Link
                href={TERMOS_PRIVACIDADE_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#ffb300",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Termos de Privacidade
              </Link>
              . Ao marcar esta opção, você confirma que leu, compreendeu e aceita
              as regras de uso da plataforma ATRIX Supply.
            </label>
          </div>

          <button
            type="submit"
            disabled={carregando || !aceitouTermos}
            style={{
              backgroundColor: carregando || !aceitouTermos ? "#946b00" : "#ffb300",
              color: "#1a0a0a",
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              cursor: carregando || !aceitouTermos ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "16px",
              marginTop: "4px",
              boxShadow: "0 0 20px rgba(255,179,0,0.35)",
              opacity: carregando || !aceitouTermos ? 0.65 : 1,
            }}
          >
            {carregando ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <p
          style={{
            color: "#ccc",
            fontSize: "14px",
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          Já tem conta?{" "}

          <Link
            href="/login"
            style={{
              color: "#0d6efd",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Faça login
          </Link>
        </p>
      </main>
    </div>
  );
}