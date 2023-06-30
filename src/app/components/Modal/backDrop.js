import React from "react";
import { createPortal } from "react-dom";
import style from "./modal.module.css";

export default function Backdrop({ children, closeModal }) {
  return createPortal(
    <div className={style.backdrop + ' active'} onClick={closeModal}>
      {children}
    </div>,
    document.getElementById("portal")
  );
}
