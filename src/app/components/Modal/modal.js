import style from "./modal.module.css";
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

export default Modal;
