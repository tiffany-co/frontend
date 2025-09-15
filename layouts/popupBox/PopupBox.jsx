import React from "react";
import "./popup-box.css";
import { usePopUpContextContext } from "@/context/popupContext/PopupContex";
function PopupBox({ children, size }) {
  const { setPopUpOpen } = usePopUpContextContext();
  const closePopup = () => {
    setPopUpOpen(false);
  };
  return (
    <div className="popup-container">
      <button className={size === "small" ? `closePopup-s` : "closePopup"} onClick={closePopup}>
        ×
      </button>
      <div className={size === "small" ? `popup-body-s` : "popup-body"}>
        {children}
      </div>
    </div>
  );
}

export default PopupBox;
