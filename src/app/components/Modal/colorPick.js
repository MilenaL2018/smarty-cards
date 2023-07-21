import React from "react";
import Modal from "./modal";
import { useDispatch, useSelector } from "react-redux";
import { changeColor } from "@/redux/features/theme-slice";
import style from "./modal.module.css";
import { BsXLg } from "react-icons/bs";
import { BlockPicker } from "react-color";

const ColorPick = ({ closeFn = () => null, open = false }) => {
  const appTheme = useSelector((state) => state.themeReducer);
  const dispatch = useDispatch();

  const handleChangeComplete = (color) => {
    dispatch(changeColor(color.hex));
  };

  return (
    <Modal open={open}>
      <div className={style.modal}>
        <div className="modal-window">
          <header className={style.modalheader}>
            <h2>Modal One</h2>
            <BsXLg onClick={closeFn} fontSize={"1rem"} fontWeight={"400"} />
          </header>
          <div className={style.modalbody}>
            <BlockPicker
              color={appTheme.color}
              triangle="hide"
              onChangeComplete={handleChangeComplete}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ColorPick;
