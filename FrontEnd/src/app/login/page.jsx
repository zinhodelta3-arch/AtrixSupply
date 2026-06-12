"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import * as THREE from "three";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AlertCard from "@/components/AlertCard";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 34,
    scale: 0.96,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const logoVariants = {
  hidden: {
    opacity: 0,
    y: -22,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const formVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.12,
      duration: 0.55,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const fieldVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: "easeOut",
    },
  },
};

const alertMotion = {
  initial: {
    opacity: 0,
    y: -10,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.32,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};


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

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

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

      return {
        mesh: orb,
        geometry: orbGeo,
        material: orbMat,
      };
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

      orbs.forEach((orbData, idx) => {
        const orb = orbData.mesh;

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

      orbs.forEach((orbData) => {
        orbData.geometry.dispose();
        orbData.material.dispose();
      });

      renderer.dispose();
    };
  }, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      style={{
        backgroundColor: "#1a0a0a",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style jsx global>{`
        .login-input {
          color: #ffffff !important;
        }

        .login-input::placeholder {
          color: rgba(255, 255, 255, 0.68) !important;
          opacity: 1 !important;
        }

        .login-input:focus {
          background-color: rgba(26, 10, 10, 0.82) !important;
          border-color: #ffb300 !important;
          color: #ffffff !important;
          box-shadow: 0 0 0 0.2rem rgba(255, 179, 0, 0.15) !important;
        }

        .login-input:-webkit-autofill,
        .login-input:-webkit-autofill:hover,
        .login-input:-webkit-autofill:focus {
          -webkit-text-fill-color: #ffffff !important;
          -webkit-box-shadow: 0 0 0px 1000px rgba(26, 10, 10, 0.95) inset !important;
          caret-color: #ffffff !important;
          border-color: #ffb300 !important;
        }
      `}</style>

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

      <motion.div
        className="d-flex justify-content-center align-items-center"
        variants={cardVariants}
        style={{
          minHeight: "100vh",
          position: "relative",
          zIndex: 2,
          padding: "20px",
        }}
      >
        <motion.div
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
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
            <motion.div className="d-flex justify-content-center" variants={logoVariants}>
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
            </motion.div>

            <motion.h1
              variants={titleVariants}
              style={{
                color: "#ffb300",
                fontSize: "32px",
                marginBottom: "20px",
                textShadow: "0 0 20px rgba(255,179,0,0.4)",
              }}
            >
              Login
            </motion.h1>
          </div>

          <motion.form onSubmit={handleLogin} variants={formVariants}>
            <AnimatePresence>
              {erro && (
                <motion.div key="login-error-alert" {...alertMotion}>
                  <AlertCard
                    variant="danger"
                    title="Erro"
                    message={erro}
                    style={{ padding: "12px", borderRadius: "14px" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div className="mb-3" variants={fieldVariants}>
              <label className="form-label">Email</label>

              <input
                type="email"
                className="form-control login-input"
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
            </motion.div>

            <motion.div className="mb-3" variants={fieldVariants}>
              <label className="form-label">Senha</label>

              <input
                type="password"
                className="form-control login-input"
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
            </motion.div>

            <motion.button
              variants={fieldVariants}
              whileHover={loading ? undefined : { y: -2, scale: 1.015 }}
              whileTap={loading ? undefined : { scale: 0.98 }}
              type="submit"
              className="btn w-100 mt-1"
              disabled={loading}
              style={{
                backgroundColor: loading ? "#946b00" : "#ffb300",
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
            </motion.button>
          </motion.form>

          <motion.p
            variants={fieldVariants}
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

          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
