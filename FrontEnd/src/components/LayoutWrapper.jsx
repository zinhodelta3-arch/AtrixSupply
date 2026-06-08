"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "./Sidebar";

export default function LayoutWrapper({ children }) {

  const pathname = usePathname();
  const router = useRouter();
  const [dashboardAutorizado, setDashboardAutorizado] = useState(false);
  const [validandoDashboard, setValidandoDashboard] = useState(false);

  const hideLayout =
    pathname.startsWith("/dashboard")

  useEffect(() => {
    if (!hideLayout) {
      setDashboardAutorizado(false);
      setValidandoDashboard(false);
      return;
    }

    setValidandoDashboard(true);

    try {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("authToken") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("usuarioToken") ||
        localStorage.getItem("jwt");
      const usuarioStorage = localStorage.getItem("usuario");
      const usuario = usuarioStorage ? JSON.parse(usuarioStorage) : null;
      const tipo = String(usuario?.tipo || usuario?.tipo_user || "").toLowerCase();
      const autorizado = Boolean(token && ["admin", "administrador"].includes(tipo));

      if (!autorizado) {
        setDashboardAutorizado(false);
        router.replace(token ? "/not-found" : "/login");
        return;
      }

      setDashboardAutorizado(true);
    } catch (error) {
      setDashboardAutorizado(false);
      router.replace("/login");
    } finally {
      setValidandoDashboard(false);
    }
  }, [hideLayout, router]);

  if (hideLayout && (validandoDashboard || !dashboardAutorizado)) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark text-white">
        Validando acesso...
      </div>
    );
  }

  return (
    <>
      {!hideLayout && <Header/>}
    {hideLayout &&
        <div className="app-layout d-flex">
        <Sidebar />
        <div className="app-content flex-grow-1 overflow-hidden">
            {children}
        </div>
        </div>

        }


      {!hideLayout && children}

      {!hideLayout && <Footer />}
    </>
  );
}
