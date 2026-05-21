"use client";

import { usePathname } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "./Sidebar";

export default function LayoutWrapper({ children }) {

  const pathname = usePathname();

  const hideLayout =
    pathname.startsWith("/dashboard")

  return (
    <>
      {!hideLayout && <Header/>}
      {!hideLayout && <div className="mb-5"></div>}
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