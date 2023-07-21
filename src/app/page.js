"use client";

//Redux
import { addCard, sortCards } from "@/redux/features/cards-slice";
import { changeBackground } from "@/redux/features/theme-slice";
import { useDispatch, useSelector } from "react-redux";

//Components
import Display from "./components/cardDisplay/cardDisplay";
import ModalManager from "./components/Modal/modalManager";
import Snackbar from "./components/SnackBar/snackbar";

//Icons
import { AiOutlineBgColors } from "react-icons/ai";
import { RiDeleteBack2Line } from "react-icons/ri";
import {
  BsMoonStars,
  BsBrightnessHigh,
  BsSortAlphaDownAlt,
  BsSortAlphaDown,
  BsSearch,
} from "react-icons/bs";

//Logos
import SmartyLogo from "../../public/logo.svg";
import EmptyBox from "../../public/empty.svg";

import { useEffect, useState } from "react";

//Language config
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../constants";
import styles from "./page.module.css";

//Utils
let _ = require("lodash");

export default function Home() {
  const appTheme = useSelector((state) => state.themeReducer);
  const cardStack = useSelector((state) => state.cardsReducer);
  const snackbar = useSelector((state) => state.snackBarReducer);

  const [displayCards, setDisplay] = useState("active");
  const [showResults, setResults] = useState(false);
  const [updateCard, setUpdate] = useState(false);
  const [formValid, setValid] = useState(true);
  const [missingKey, setMissing] = useState(true);
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let card = Object.fromEntries(new FormData(e.target).entries());
    console.log(card)
    /* if (Object.values(card).some((value) => value === "")) {
      setValid(false);
    } else {
      dispatch(addCard({ ...card, tag: "active" }));
      setValid(true);
      let inputs = document.getElementsByTagName("input");
      for (let input of inputs) {
        input.value = "";
      }
    } */
  };

  const handleNavigation = (param) => {
    setDisplay(param);
    let links = document.getElementsByName("nav-link");
    let activeLink = document.getElementById(param);

    if (activeLink) {
      activeLink.style.border = "1px solid";
      activeLink.style.borderColor = appTheme.color;
    }

    if (links) {
      links.forEach(function (element) {
        if (element !== activeLink) {
          element.style.border = "none";
        }
      });
    }
  };

  //Modal Controls
  const [modalOpen, setModal] = useState(false);

  const openModal = (event) => {
    event.preventDefault();

    const {
      target: {
        dataset: { modal },
      },
    } = event;
    if (modal) setModal(modal);
  };

  const closeModal = () => {
    setModal("");
  };

  const toggleTheme = () => {
    dispatch(changeBackground());
  };

  const handleSort = (order) => {
    dispatch(sortCards(order));
  };

  const handleSearch = () => {
    let keyword = document.getElementById("search").value;

    if (keyword === "") {
      setMissing(false);
    } else {
      let filterCards = [];
      let searchKey = keyword.toLowerCase();
      cardStack.forEach((card) => {
        let title = card["title"].toLowerCase();
        let content = card["content"].toLowerCase();

        let isInTitle = title.indexOf(searchKey);
        let isInContent = content.indexOf(searchKey);

        if (isInTitle !== -1 || isInContent !== -1) {
          filterCards.push(card);
        }
      });
      setMissing(true);
      setResults(filterCards);
    }
  };

  const handleResetSearch = () => {
    let searchInput = document.getElementById("search");
    searchInput.value = "";
    setResults(false);
  };

  const onChangeLang = (e) => {
    const lang_code = e.target.value;
    i18n.changeLanguage(lang_code);
  };

  useEffect(() => {
    document.body.style.background = appTheme.background;

    let element = document.querySelector(".app");

    element.style.color = appTheme.color;
    element.style.borderColor = appTheme.color;
  }, [appTheme, showResults, snackbar.isDisplayed]);

  return (
    <div className={"app"}>
      <ModalManager closeFn={closeModal} modal={modalOpen} />

      <div className={styles.appbar}>
        <div className={styles.left}>
          <SmartyLogo
            style={{ color: appTheme.color }}
            className={styles.logo}
          />

          <h2
            name="nav-link"
            id="home"
            onClick={() => handleNavigation("active")}
          >
            Smarty Cards
          </h2>
        </div>

        <div className={styles.right}>
          <ul className={styles.navigation}>
            {displayCards !== "active" && (
              <li
                name="nav-link"
                className={styles.li}
                onClick={() => handleNavigation("active")}
                id="home"
              >
                {t("home")}
              </li>
            )}
            <li
              name="nav-link"
              className={styles.li}
              onClick={() => handleNavigation("deleted")}
              id="deleted"
            >
              {t("trash")}
            </li>
            <li
              name="nav-link"
              className={styles.li}
              onClick={() => handleNavigation("archived")}
              id="archived"
            >
              {t("archive")}
            </li>
          </ul>

          <select
            defaultValue={i18n.language}
            onChange={onChangeLang}
            className={styles.langPicker}
            style={{ color: appTheme.color, borderColor: appTheme.color }}
          >
            {LANGUAGES.map(({ code, label }) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>

          {appTheme.background === "#ffffff" ? (
            <BsMoonStars fontSize={"1.5rem"} onClick={toggleTheme} />
          ) : (
            <BsBrightnessHigh fontSize={"1.5rem"} onClick={toggleTheme} />
          )}

          <AiOutlineBgColors
            fontSize={"2rem"}
            onClick={openModal}
            data-modal="modal-one"
          />
        </div>
      </div>
      <div className={styles.main}>
        {displayCards === "active" && (
          <div className={styles.sidebar}>
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              id="card-form"
            >
              <div className={styles.formfield}>
                <input
                  type="text"
                  name="title"
                  id='title-input'
                  className={styles.input}
                  placeholder={t("inputNewCardTitle")}
                  style={{
                    borderColor: appTheme.color,
                    "--placeholder-color": appTheme.color,
                  }}
                />
              </div>

              <div className={styles.formfield}>
                <input
                  type="text"
                  name="content"
                  id='content-input'
                  placeholder={t("inputNewCardContent")}
                  className={styles.input}
                  style={{
                    borderColor: appTheme.color,
                    lineHeight: "2",
                    "--placeholder-color": appTheme.color,
                  }}
                />
              </div>

              {!formValid && (
                <span className={styles.formError}>
                  {t("incompleteFields")}
                </span>
              )}

              <button
                className={styles.submitButton}
                style={{
                  background: appTheme.color,
                  color: appTheme.background,
                }}
                type="submit"
              >
                {t("createButton")}
              </button>
            </form>
          </div>
        )}

        <div className={styles.grid}>
          <div className={styles.utilities}>
            <div className={styles.searchForm} id="search-form">
              <div className={styles.formfield}>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className={styles.input}
                  placeholder={t("searchPlaceholder")}
                  style={{
                    borderColor: appTheme.color,
                    "--placeholder-color": appTheme.color,
                  }}
                />

                {showResults ? (
                  <RiDeleteBack2Line
                    color={appTheme.color}
                    onClick={handleResetSearch}
                  />
                ) : (
                  <BsSearch color={appTheme.color} onClick={handleSearch} />
                )}
              </div>

              {!missingKey && (
                <span className={styles.formError}>{t("missingKeyWord")}</span>
              )}
            </div>

            <div className={styles.filters}>
              <BsSortAlphaDownAlt
                color={appTheme.color}
                fontSize={"30px"}
                onClick={() => handleSort("ZA")}
              />
              <BsSortAlphaDown
                color={appTheme.color}
                fontSize={"30px"}
                onClick={() => handleSort("AZ")}
              />
            </div>
          </div>

          {_.isEmpty(cardStack) ? (
            <div className={styles.emptyBox}>
              <EmptyBox
                style={{ color: appTheme.color }}
                className={styles.emptyImage}
              />
              <span>{t("firstCardTitle")}</span>
            </div>
          ) : (
            <>
              {showResults ? (
                <Display openModal={openModal} cardStack={showResults} />
              ) : (
                <Display
                  openModal={openModal}
                  updateCard={updateCard}
                  setUpdate={setUpdate}
                  cardStack={cardStack.filter(
                    (card) => card.tag === displayCards
                  )}
                />
              )}
            </>
          )}
        </div>
      </div>
      {snackbar.isDisplayed && <Snackbar />}
    </div>
  );
}
