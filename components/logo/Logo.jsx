// import logo from "@/public/images/content/bazak_logo.png";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./logo.css";
function Logo({ isMain }) {
  return (
    <>
      <Link href={"/"}>
        {/* <Image priority className="img-logo" width={65} src={logo} alt="logo" /> */}
        <h3 style={{padding:"5px", color:"goldenrod"}}>Logo</h3>
      </Link>
    </>
  );
}

export default Logo;
