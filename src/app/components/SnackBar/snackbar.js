import React from "react";
import ReactDOM from "react-dom";
import { closeHandler } from "@/redux/features/snackbar-slice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import style from "./snackbar.module.css";

const Snackbar = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.snackBarReducer);
  const { t } = useTranslation();

  const handleClose = () => {
    dispatch(closeHandler());
  };

  return ReactDOM.createPortal(
    <div className={style.snackbarContainer}>
      <div className={style.snackbarLabel}>{t('deletionWarning')}</div>
      <div className={style.snackbarLabel}>
        <button
          className={style.snackbarButton}
          style={{ background: "red" }}
        >
          {t('cancel')}
        </button>
        <button
          className={style.snackbarButton}
          style={{ background: "white", color: "black" }}
        >
          {t('continue')}
        </button>
      </div>
      <div className={style.snackbarDismiss} onClick={handleClose}>
        &times;
      </div>
    </div>,
    document.getElementById("snackbar__root")
  );
};

export default Snackbar;
