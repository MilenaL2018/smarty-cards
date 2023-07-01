"use client";
import { changeBackground, changeColor } from "@/redux/features/theme-slice";
import { addCard, sortCards } from "@/redux/features/cards-slice";
import Display from "./components/cardDisplay/cardDisplay";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineBgColors } from "react-icons/ai";
import { RiDeleteBack2Line } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import SmartyLogo from "../../public/logo.svg";
import EmptyBox from "../../public/empty.svg";
import Modal from "./components/Modal/modal";
import { useEffect, useState } from "react";
import { BlockPicker } from "react-color";
import { LANGUAGES } from "../constants";
import styles from "./page.module.css";
let _ = require("lodash");
import {
  BsMoonStars,
  BsBrightnessHigh,
  BsSortAlphaDownAlt,
  BsSortAlphaDown,
  BsSearch,
} from "react-icons/bs";

export default function Home() {
  const appTheme = useSelector((state) => state.themeReducer);
  const cardStack = useSelector((state) => state.cardsReducer);
  const [displayCards, setDisplay] = useState("active");
  const [showResults, setResults] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateCard, setUpdate] = useState(false);
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let card = Object.fromEntries(new FormData(e.target).entries());

    if (Object.values(card).some((value) => value === "")) {
      alert("¡No dejes espacios vacíos!");
    } else {
      dispatch(addCard({ ...card, tag: "active" }));
      let inputs = document.getElementsByTagName("input");
      for (let input of inputs) {
        input.value = "";
      }
    }
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

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleTheme = () => {
    dispatch(changeBackground());
  };

  const handleChangeComplete = (color) => {
    dispatch(changeColor(color.hex));
  };

  const handleSort = (order) => {
    dispatch(sortCards(order));
  };

  const handleSearch = () => {
    let keyword = document.getElementById("search").value;

    if (keyword === "") {
      alert("¡Ingresa una palabra clave!");
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
  }, [appTheme, showResults, cardStack]);

  return (
    <div className={"app"}>
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
          <AiOutlineBgColors fontSize={"2rem"} onClick={handleModal} />

          {displayCards !== "deleted" && modalOpen && (
            <Modal closeModal={handleModal} title={t("modalColorPick")}>
              <BlockPicker
                color={appTheme.color}
                triangle="hide"
                onChangeComplete={handleChangeComplete}
              />
            </Modal>
          )}

          {displayCards === "deleted" && modalOpen && (
            <Modal closeModal={handleModal} title={""}>
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
                  className={styles.submitButton}
                  onClick={() => handleDelete(card)}
                >
                  {t("cancel")}
                </button>

                <button
                  style={{
                    background: appTheme.color,
                    color: appTheme.background,
                  }}
                  className={styles.submitButton}
                >
                  {t("continue")}
                </button>
              </div>
            </Modal>
          )}
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
                  placeholder={t("inputNewCardContent")}
                  className={styles.input}
                  style={{
                    borderColor: appTheme.color,
                    lineHeight: "2",
                    "--placeholder-color": appTheme.color,
                  }}
                />
              </div>

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
                    fontSize={"1.5rem"}
                  />
                ) : (
                  <BsSearch color={appTheme.color} onClick={handleSearch} />
                )}
              </div>
            </div>

            <BsSortAlphaDownAlt
              color={appTheme.color}
              fontSize={"2rem"}
              onClick={() => handleSort("ZA")}
            />

            <BsSortAlphaDown
              color={appTheme.color}
              fontSize={"2rem"}
              onClick={() => handleSort("AZ")}
            />
          </div>

          {_.isEmpty(cardStack) ? (
            <div className={styles.emptyBox}>
              <EmptyBox
                style={{ color: appTheme.color }}
                className={styles.emptyImage}
              />
              <h2>{t("firstCardTitle")}</h2>
            </div>
          ) : (
            <>
              {showResults ? (
                <Display handleModal={handleModal} cardStack={showResults} />
              ) : (
                <Display
                  handleModal={handleModal}
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
    </div>
  );
}
