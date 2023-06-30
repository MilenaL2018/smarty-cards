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
import { BsX } from "react-icons/bs";

export default function DeletedCards() {
  const cardStack = useSelector((state) => state.cardsReducer);
  const appTheme = useSelector((state) => state.themeReducer);
  const dispatch = useDispatch();

  return (
    <div className={styles.grid}>
        {cardStack
          .filter((card) => card.tag === "deleted")
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
  );
}
