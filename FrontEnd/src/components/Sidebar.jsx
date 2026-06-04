"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

const SIDEBAR_WIDTH = "280px";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState({ nome_user: "Carregando..." });

  useEffect(() => {
    try {
      const usuarioStorage = localStorage.getItem("usuario");

      if (usuarioStorage) {
        const userParsed = JSON.parse(usuarioStorage);
        const tipoUsuario = String(userParsed.tipo || "").toLowerCase();

        if (tipoUsuario !== "administrador" && tipoUsuario !== "admin") {
          router.push("/not-found");
          return;
        }

        setUsuario(userParsed);
        setLoading(false);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Erro ao ler dados do usuário:", error);
      router.push("/");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("jwt");

    router.push("/");
  };

  const isActive = (path) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const linkStyle = (active) => ({
    borderRadius: "14px",
    background: active ? "rgba(255,255,255,0.08)" : "transparent",
    border: active
      ? "1px solid rgba(255,179,0,0.18)"
      : "1px solid transparent",
    color: active ? "#ffb300" : "#f3f4f6",
    transition: "all .25s ease",
  });

  const iconStyle = (active) => ({
    fontSize: "1.1rem",
    color: active ? "#ff8800" : "#e4e4e7",
    transition: "all .25s ease",
  });

  const sidebarBaseStyle = {
    width: SIDEBAR_WIDTH,
    minWidth: SIDEBAR_WIDTH,
    height: "100dvh",
    minHeight: "100dvh",
    maxHeight: "100dvh",
    background: `
      linear-gradient(
        180deg,
        #940533 0%,
        #7d042b 35%,
        #5f0321 70%,
        #3b0215 100%
      )
    `,
    borderRight: "1px solid rgba(255,255,255,0.06)",
    boxShadow: "inset -1px 0 0 rgba(255,255,255,0.04)",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    overflowY: "auto",
    overflowX: "hidden",
    flexShrink: 0,
  };

  const spacerStyle = {
    width: SIDEBAR_WIDTH,
    minWidth: SIDEBAR_WIDTH,
    flex: `0 0 ${SIDEBAR_WIDTH}`,
    height: "100dvh",
  };

  if (loading) {
    return <div aria-hidden="true" style={spacerStyle} />;
  }

  return (
    <>
      <aside
        className="d-flex flex-column p-3 admin-sidebar-fixed"
        style={sidebarBaseStyle}
      >
        <Link
          href="/ATRIXsupply"
          className="d-flex align-items-center text-decoration-none mb-4 px-2"
        >
          <div className="d-flex justify-content-center align-items-center me-3">
            <Image
              src="/logo.png"
              alt="ATRIX Logo"
              width={35}
              height={42}
              priority
            />
          </div>

          <div className="d-flex flex-column">
            <span
              className="fw-bold"
              style={{
                color: "#ffffff",
                fontSize: "1.05rem",
                letterSpacing: "-0.5px",
              }}
            >
              ATRIX<span style={{ color: "#ffffff" }}>supply</span>
            </span>

            <span
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: ".72rem",
              }}
            >
              Painel Admin
            </span>
          </div>
        </Link>

        <div
          className="mb-3"
          style={{
            width: "100%",
            height: "1px",
            background: "rgba(255,255,255,0.08)",
          }}
        />

        <ul className="nav nav-pills flex-column gap-1">
          <li className="nav-item mb-2">
            <Link
              href="/dashboard"
              className="nav-link d-flex align-items-center px-3 py-2 text-decoration-none"
              style={linkStyle(isActive("/dashboard"))}
            >
              <i
                className="bi bi-speedometer2 me-3"
                style={iconStyle(isActive("/dashboard"))}
              />
              Dashboard
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              href="/dashboard/usuarios"
              className="nav-link d-flex align-items-center px-3 py-2 text-decoration-none"
              style={linkStyle(isActive("/dashboard/usuarios"))}
            >
              <i
                className="bi bi-people me-3"
                style={iconStyle(isActive("/dashboard/usuarios"))}
              />
              Usuários
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              href="/dashboard/produtos"
              className="nav-link d-flex align-items-center px-3 py-2 text-decoration-none"
              style={linkStyle(isActive("/dashboard/produtos"))}
            >
              <i
                className="bi bi-box-seam me-3"
                style={iconStyle(isActive("/dashboard/produtos"))}
              />
              Produtos
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              href="/dashboard/pedidos"
              className="nav-link d-flex align-items-center px-3 py-2 text-decoration-none"
              style={linkStyle(isActive("/dashboard/pedidos"))}
            >
              <i
                className="bi bi-cart3 me-3"
                style={iconStyle(isActive("/dashboard/pedidos"))}
              />
              Pedidos
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              href="/dashboard/logistica"
              className="nav-link d-flex align-items-center px-3 py-2 text-decoration-none"
              style={linkStyle(isActive("/dashboard/logistica"))}
            >
              <i
                className="bi bi-truck me-3"
                style={iconStyle(isActive("/dashboard/logistica"))}
              />
              Logística
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              href="/dashboard/suporte"
              className="nav-link d-flex align-items-center px-3 py-2 text-decoration-none"
              style={linkStyle(isActive("/dashboard/suporte"))}
            >
              <i
                className="bi bi-headset me-3"
                style={iconStyle(isActive("/dashboard/suporte"))}
              />
              Suporte
            </Link>
          </li>
        </ul>

        <div className="mt-auto pt-4">
          <div
            className="d-flex align-items-center justify-content-between p-2"
            style={{
              background: "rgba(255, 229, 229, 0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "18px",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="d-flex align-items-center" style={{ minWidth: 0 }}>
              <div
                className="d-flex justify-content-center align-items-center fw-bold text-uppercase"
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "14px",
                  background: "rgba(255,136,0,0.15)",
                  border: "1px solid rgba(255,179,0,0.12)",
                  color: "#ffb300",
                  fontSize: ".9rem",
                  flexShrink: 0,
                }}
              >
                {usuario.nome_user ? usuario.nome_user.substring(0, 3) : "ADM"}
              </div>

              <div className="ms-3" style={{ minWidth: 0 }}>
                <div
                  className="fw-semibold"
                  style={{
                    color: "#ffffff",
                    fontSize: ".9rem",
                  }}
                >
                  Admin
                </div>

                <div
                  className="text-truncate"
                  title={usuario.nome_user}
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: ".72rem",
                    maxWidth: "130px",
                  }}
                >
                  {usuario.nome_user}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="btn d-flex align-items-center justify-content-center p-0"
              title="Sair da conta"
              type="button"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#ff8800",
                transition: "all .25s ease",
                flexShrink: 0,
              }}
            >
              <i className="bi bi-box-arrow-right" />
            </button>
          </div>
        </div>
      </aside>

      <div aria-hidden="true" style={spacerStyle} />
    </>
  );
}