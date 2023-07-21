/* import style from "./modal.module.css";
import { BsXLg } from "react-icons/bs";
import Backdrop from "./backDrop";

function Modal({ title, children, closeModal }) {
  return (
    <Backdrop closeModal={closeModal}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <div className={style.modalheader}>
          <h3>{title}</h3>
          <BsXLg onClick={closeModal} fontSize={"1rem"} fontWeight={"400"} />
        </div>
        <div className={style.modalbody}>{children}</div>
      </div>
    </Backdrop>
  );
}

export default Modal; */

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import style from "./modal.module.css";

const Modal = ({ children, open = false }) => {
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
  }, []);

  if (!open) return null;

  return createPortal(
    <div className={style.backdrop}>{children}</div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
