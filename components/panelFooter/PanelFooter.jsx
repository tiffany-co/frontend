import React from "react";
import "./panel-footer.css";
import Link from "next/link";
import { useAuthState } from "@/context/auth/auth-context";
function PanelFooter() {
  const { token } = useAuthState();

  return (
    <>
      <div className="panel-container row">
        <Link href={"/"} className="col-2">
          <i className="fa fa-home"></i>
          خانه
        </Link>
        <Link href={""} className="col-2">
          <i className="fa fa-address-book"></i>
          مخاطبان
        </Link>
        <Link href={""} className="col-2">
          <i className="fa fa-search"></i>
          جست و جو
        </Link>
        <Link
          href={token ? "/dashboard/dashboard-content" : "/login"}
          className="col-2"
        >
          <i className="fa fa-user"></i>
          داشبورد
        </Link>
      </div>
    </>
  );
}

export default PanelFooter;
