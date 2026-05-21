"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

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

  return (
    <aside
      className="d-flex flex-column p-3"
      style={{
        width: "280px",
        minHeight: "100vh",
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
        position: "sticky",
        top: 0,
      }}
    >
      {/* LOGO */}
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

      {/* DIVIDER */}
      <div
        className="mb-3"
        style={{
          width: "100%",
          height: "1px",
          background: "rgba(255,255,255,0.08)",
        }}
      />

      {/* NAVIGATION */}

      <ul className="nav nav-pills flex-column gap-1">

        {/* DASHBOARD */}
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

        {/* USUÁRIOS */}
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

        {/* PRODUTOS */}
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

        {/* PEDIDOS */}
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

        {/* FORNECEDORES */}
        <li className="nav-item mb-2">
          <Link
            href="/dashboard/fornecedores"
            className="nav-link d-flex align-items-center px-3 py-2 text-decoration-none"
            style={linkStyle(isActive("/dashboard/fornecedores"))}
          >
            <i
              className="bi bi-truck me-3"
              style={iconStyle(isActive("/dashboard/fornecedores"))}
            />
            Fornecedores
          </Link>
        </li>
      </ul>

      {/* PROFILE AREA */}
      <div className="mt-auto pt-4">
        <div
          className="d-flex align-items-center justify-content-between p-2"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "18px",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* USER INFO */}
          <div className="d-flex align-items-center">
            <div
              className="d-flex justify-content-center align-items-center fw-bold"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "14px",
                background: "rgba(255,136,0,0.15)",
                border: "1px solid rgba(255,179,0,0.12)",
                color: "#ffb300",
                fontSize: ".9rem",
              }}
            >
              AS
            </div>

            <div className="ms-3">
              <div
                className="fw-semibold"
                style={{ color: "#ffffff", fontSize: ".9rem" }}
              >
                Admin
              </div>

              <div
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: ".72rem",
                }}
              >
                admin@atrix.com
              </div>
            </div>
          </div>

          {/* LOGOUT */}
          <button
            className="btn d-flex align-items-center justify-content-center p-0"
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#ff8800",
              transition: "all .25s ease",
            }}
          >
            <i className="bi bi-box-arrow-right" />
          </button>
        </div>
      </div>
    </aside>
  );
}