import PanelFooter from "@/components/panelFooter";
import MegaMenu from "../../components/magaMenu/MegaMenu";
import SpaFooter from "../../components/spaFooter";
import React from "react";

export default function MainLayout({ children }) {
  return (
    <>
      <MegaMenu backgrondOn={true} CategoryType={0} />
      <main>{children}</main>
      <div className="spa-footer">
        <SpaFooter />
        <PanelFooter />
      </div>
    </>
  );
}
