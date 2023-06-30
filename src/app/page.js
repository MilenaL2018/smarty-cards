"use client";
import { changeBackground, changeColor } from "@/redux/features/theme-slice";
import Display from "./components/cardDisplay/cardDisplay";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineBgColors } from "react-icons/ai";
import { RiDeleteBack2Line } from "react-icons/ri";
import Modal from "./components/Modal/modal";
import { useEffect, useState } from "react";
import { BlockPicker } from "react-color";
import styles from "./page.module.css";
import {
  getCards,
  deleteCards,
  undomoveCard,
  addCard,
  editCard,
  sortCards,
} from "@/redux/features/cards-slice";
import SmartyLogo from "../../public/logo.svg";
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
  const [showResults, setResults] = useState(false);
  const [displayCards, setDisplay] = useState("active");
  const [modalOpen, setModalOpen] = useState(false);
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

  useEffect(() => {
    document.body.style.background = appTheme.background;

    let element = document.querySelector(".app");

    element.style.color = appTheme.color;
    element.style.borderColor = appTheme.color;
  }, [appTheme, showResults]);

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
                Inicio
              </li>
            )}
            <li
              name="nav-link"
              className={styles.li}
              onClick={() => handleNavigation("deleted")}
              id="deleted"
            >
              Papelera
            </li>
            <li
              name="nav-link"
              className={styles.li}
              onClick={() => handleNavigation("archived")}
              id="archived"
            >
              Archivo
            </li>
          </ul>

          {appTheme.background === "#ffffff" ? (
            <BsMoonStars fontSize={"1.5rem"} onClick={toggleTheme} />
          ) : (
            <BsBrightnessHigh fontSize={"1.5rem"} onClick={toggleTheme} />
          )}

          <AiOutlineBgColors fontSize={"2rem"} onClick={handleModal} />

          {modalOpen && !editCard && (
            <Modal
              closeModal={() => setModalOpen(false)}
              title={"Choose a color"}
            >
              <BlockPicker
                color={appTheme.color}
                triangle="hide"
                onChangeComplete={handleChangeComplete}
              />
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
                  placeholder="Agrega un título aquí..."
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
                  placeholder="y un poco de contenido por acá."
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
                Crear
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
                  placeholder="Escribe una palabra clave"
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

          {showResults ? (
            <Display handleModal={handleModal} cardStack={showResults} />
          ) : (
            <Display
              handleModal={handleModal}
              cardStack={cardStack.filter((card) => card.tag === displayCards)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
