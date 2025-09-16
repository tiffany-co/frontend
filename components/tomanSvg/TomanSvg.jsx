import Image from "next/image";
import React from "react";
import tomanWhite from "@/public/images/content/toman-white.svg";
import tomanBlack from "@/public/images/content/toman-black.svg";
function TomanSvg({ isWhite }) {
  return (
    <Image width={20} src={isWhite ? tomanWhite : tomanBlack} alt="toman" />
  );
}

export default TomanSvg;
