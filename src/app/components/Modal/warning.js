import React from "react";
import Modal from "./modal";
import style from "./modal.module.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Warning = ({ closeFn = () => null, open = false }) => {
  const appTheme = useSelector((state) => state.themeReducer);
  const { t } = useTranslation();

  return (
    <Modal open={open}>
      <div className={style.modal}>
        <div className={style.modalheader}>
          <h1>Warning</h1>
        </div>
        <div className={style.modalbody}>
          <p>{t("deletionWarning")}</p>
          <div
            style={{
              flexDirection: "row",
              display: "inline-flex",
              columnGap: "1rem",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <button
              className={style.submitButton}
              onClick={() => handleDelete(card)}
            >
              {t("cancel")}
            </button>

            <button
              style={{
                background: appTheme.color,
                color: appTheme.background,
              }}
              className={style.submitButton}
            >
              {t("continue")}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Warning;
