"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/dashboardSidebar";
import PanelFooter from "@/components/panelFooter";
import MegaMenu from "@/components/magaMenu/MegaMenu";
import "./style.css";

export default function DashboardLayout({ children }) {
  const [isClient, setIsClient] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // الان روی کلاینت هستیم
    const storedToken = localStorage.getItem("access_token");
    setToken(storedToken);

    if (!storedToken) {
      router.replace("/login");
    }
  }, [router]);

  if (!isClient) return null; // تا زمان SSR چیزی رندر نشه

  return (
    <>
      {token ? (
        <>
          <MegaMenu backgrondOn={false} />
          <div className="row dashboard-container container">
            <div className="col-12 col-lg-2 dashboard-sidebar">
              <Sidebar />
            </div>
            <div className="col-12 col-lg-9 dashboard-content">
              <main>{children}</main>
            </div>
          </div>
          <PanelFooter />
        </>
      ) : null}
    </>
  );
}
