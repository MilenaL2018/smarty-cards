import { BiArchiveOut, BiArchiveIn } from "react-icons/bi";
import { BsCheckSquare, BsPencil } from "react-icons/bs";
import { editCard } from "@/redux/features/cards-slice";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "./cardDisplay.module.css";
import { useState } from "react";

function Display({ cardStack }) {
  const appTheme = useSelector((state) => state.themeReducer);
  const [updateCard, setUpdate] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = (card) => {
    dispatch(editCard(card));
  };

  return cardStack.map((card) => {
    return (
      <div className={styles.card} key={card.uid}>
        <div className={styles.cardheader}>
          <AiOutlineDelete
            fontSize={"1.5rem"}
            onClick={() => handleEdit({ ...card, tag: "deleted" })}
          />

          {card.tag === "active" && !updateCard ? (
            <BsPencil
              color={appTheme.color}
              fontSize={"1.5rem"}
              onClick={() => {
                setUpdate(true);
                handleModal();
              }}
            />
          ) : (
            <BsCheckSquare
              color={appTheme.color}
              fontSize={"1.5rem"}
              onClick={(e) => handleSubmit(e)}
            />
          )}

          {card.tag === "active" ? (
            <BiArchiveIn
              color={appTheme.color}
              fontSize={"1.5rem"}
              onClick={() => handleEdit({ ...card, tag: "archived" })}
            />
          ) : (
            <BiArchiveOut
              color={appTheme.color}
              fontSize={"1.5rem"}
              onClick={() => handleEdit({ ...card, tag: "active" })}
            />
          )}
        </div>

        <div className={styles.cardbody}>
          {updateCard ? (
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              id="edit-form"
            >
              <input
                type="text"
                name="title"
                onChange={(e) => handleEdit({ ...card, title: e.target.value })}
                className={styles.input}
                placeholder={card.title}
                style={{
                  borderColor: appTheme.color,
                  "--placeholder-color": appTheme.color,
                }}
              />

              <input
                type="text"
                name="content"
                value={""}
                className={styles.input}
                placeholder={card.content}
                onChange={(e) =>
                  handleEdit({ ...card, content: e.target.value })
                }
                style={{
                  borderColor: appTheme.color,
                  "--placeholder-color": appTheme.color,
                }}
              />
            </form>
          ) : (
            <>
              <h2>{card.title}</h2>
              <p className={styles.cardcontent}>{card.content}</p>
            </>
          )}
        </div>
      </div>
    );
  });
}

export default Display;
