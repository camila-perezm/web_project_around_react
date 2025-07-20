import useToggleLike from "../../../../hooks/useToggleLike";
import useDeleteCard from "../../../../hooks/useDeleteCard";
import deleteIcon from "../../../../images/delete.svg";
import likeIcon from "../../../../images/like.svg";
import likeActiveIcon from "../../../../images/like-active.svg";
import Spinner from "../../../ui/Spinner";

export default function Card({
  card,
  handleOpenPopup,
  onCardLike,
  onCardDelete,
}) {
  const { name, link, likes = [], isLiked } = card;

  const { isTogglingLike, toggleLike } = useToggleLike(card);
  const { isDeletingCard, deleteCard } = useDeleteCard(card);

  async function handleLikeClick() {
    try {
      const newCardState = await toggleLike();
      onCardLike(newCardState);
    } catch (error) {
      console.error("Error al actualizar like:", error);
    }
  }

  async function handleDeleteClick(e) {
    e.stopPropagation();
    try {
      const response = await deleteCard();
      if (response === "ok") {
        onCardDelete(card);
      }
    } catch (error) {
      console.error("Error al eliminar la tarjeta:", error);
    }
  }

  return (
    <div className="card">
      <div className="card__img" onClick={() => handleOpenPopup(card)}>
        <button
          className="card__delete-button"
          onClick={handleDeleteClick}
          aria-label="Eliminar tarjeta"
        >
          {isDeletingCard ? (
            <Spinner />
          ) : (
            <img src={deleteIcon} alt="Eliminar" />
          )}
        </button>
        <img className="card__img-url" src={link} alt={name} />
      </div>
      <div className="card__text-container">
        <h2 className="card__text">{name}</h2>
        <div className="card__like-section">
          <button
            onClick={handleLikeClick}
            aria-label="Like"
            className="card__like-button"
          >
            {isTogglingLike ? (
              <Spinner />
            ) : (
              <img
                src={isLiked ? likeActiveIcon : likeIcon}
                alt="Like"
                className="card__like-icon"
              />
            )}
          </button>
          <span className="card__like-count">{likes?.length || 0}</span>
        </div>
      </div>
    </div>
  );
}
