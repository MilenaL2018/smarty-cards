import { editCard } from "@/redux/features/cards-slice";
import { displayHandler } from "@/redux/features/snackbar-slice";
import { BiArchiveOut, BiArchiveIn } from "react-icons/bi";
import { BsCheckSquare, BsPencil } from "react-icons/bs";
import { MdOutlineRestorePage } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "./cardDisplay.module.css";

function Display({ cardStack, updateCard, setUpdate, openModal }) {
  const appTheme = useSelector((state) => state.themeReducer);
  const dispatch = useDispatch();

  const handleEdit = (card) => {
    dispatch(editCard(card));
  };

  const handleDelete = (card) => {
    dispatch(displayHandler({ msg: 'Hello', id: card.id}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdate(false);

    let inputs = document.getElementsByTagName("input");
    if (inputs) {
      for (let input of inputs) {
        input.value = "";
      }
    }
  };

  return cardStack.map((card) => {
    return (
      <div className={styles.card} key={card.id}>
        <div className={styles.cardheader}>
          <AiOutlineDelete
            fontSize={"1.5rem"}
            data-modal="modal-two"
            onClick={() => {
              if (card.tag === "deleted") {
                handleDelete(card);
              } else {
                handleEdit({ ...card, tag: "deleted" });
              }
            }}
          />

          {card.tag === "active" && (
            <div>
              {updateCard ? (
                <BsCheckSquare
                  color={appTheme.color}
                  fontSize={"1.5rem"}
                  onClick={(e) => handleSubmit(e)}
                />
              ) : (
                <BsPencil
                  color={appTheme.color}
                  fontSize={"1.5rem"}
                  onClick={() => {
                    setUpdate(true);
                  }}
                />
              )}
            </div>
          )}

          {card.tag === "active" && (
            <BiArchiveIn
              color={appTheme.color}
              fontSize={"1.5rem"}
              onClick={() => handleEdit({ ...card, tag: "archived" })}
            />
          )}

          {card.tag === "archived" && (
            <BiArchiveOut
              color={appTheme.color}
              fontSize={"1.5rem"}
              onClick={() => handleEdit({ ...card, tag: "active" })}
            />
          )}

          {card.tag === "deleted" && (
            <MdOutlineRestorePage
              color={appTheme.color}
              fontSize={"1.5rem"}
              onClick={() => handleEdit({ ...card, tag: "active" })}
            />
          )}
        </div>

        <div className={styles.cardbody}>
          {updateCard ? (
            <div className={styles.form} id="edit-form">
              <input
                type="text"
                name="title"
                id="title"
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
                id="content"
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
            </div>
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
