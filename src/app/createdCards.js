"use client";

import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import {
  getCards,
  deleteCards,
  undomoveCard,
  addCard,
  editCard,
  findCard,
} from "@/redux/features/cards-slice";
import { BsCheckSquare, BsX } from "react-icons/bs";

export default function CreatedCards() {
  const cardStack = useSelector((state) => state.cardsReducer);
  const appTheme = useSelector((state) => state.themeReducer);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let newCard = Object.fromEntries(new FormData(e.target).entries());
    dispatch(addCard({ ...newCard, tag: "active" }));
  };

  return (
    <>
      <div className={styles.header}>
        <form method="post" onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="title"
            className={styles.input}
            style={{
              borderColor: appTheme.color,
              color: appTheme.background === "light" ? "black" : appTheme.color,
            }}
          />
          <input
            type="text"
            name="content"
            className={styles.input}
            style={{
              borderColor: appTheme.color,
              color: appTheme.background === "light" ? "black" : appTheme.color,
            }}
          />
          <button className={styles.submitButton} type="submit">
            <BsCheckSquare color={appTheme.color} fontSize={"1.5rem"} />
          </button>
        </form>
      </div>
      <div className={styles.grid}>
        {cardStack
          .filter((card) => card.tag === "active")
          .map((card) => {
            return (
              <div
                className={styles.card}
                style={{
                  borderColor: appTheme.color,
                  color:
                    appTheme.background === "light" ? "black" : appTheme.color,
                }}
                key={card.uid}
              >
                <div className={styles.cardheader}>
                  <BsX
                    fontSize={"1.5rem"}
                    onClick={() =>
                      dispatch(editCard({ ...card, tag: "deleted" }))
                    }
                  />
                </div>
                <div className={styles.cardbody}>
                  <h2>{card.title}</h2>
                  <p className={styles.cardcontent}>{card.content}</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
