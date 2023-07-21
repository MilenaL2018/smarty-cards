/* import React from "react";
import { createPortal } from "react-dom";
import style from "./modal.module.css";

export default function Backdrop({ children, closeModal }) {
  return createPortal(
    <div className={style.backdrop} onClick={closeModal}>
      {children}
    </div>,
    document.getElementById("portal")
  );
} */

import React from "react";
import ColorPick from "./colorPick";
import Warning from "./warning";

const ModalManager = ({ closeFn = () => null, modal = "" }) => (
  <div>
    <ColorPick closeFn={closeFn} open={modal === "modal-one"} />
    <Warning closeFn={closeFn} open={modal === "modal-two"} />
  </div>
);

export default ModalManager;
