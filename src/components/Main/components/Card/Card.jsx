import { useContext } from 'react';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext';
import deleteIcon from '../../../../images/delete.svg';
import likeIcon from '../../../../images/like.svg';
import likeActiveIcon from '../../../../images/like-active.svg';

export default function Card({ card, handleOpenPopup, onCardLike, onCardDelete }) {
  const { name, link, likes = [], isLiked } = card;
  const currentUser = useContext(CurrentUserContext);

  function handleLikeClick() {
    console.log('Click en like, tarjeta:', card._id, 'isLiked:', isLiked);
    onCardLike(card);
  }

  function handleDeleteClick(e) {
    e.stopPropagation(); // Evita que se dispare el evento del popup al hacer click en eliminar
    onCardDelete(card);
  }

  return (
    <div className="card">
      <div className="card__img" onClick={() => handleOpenPopup(card)}>
        <button
          className="card__delete-button"
          onClick={handleDeleteClick}
          aria-label="Eliminar tarjeta"
        >
          <img src={deleteIcon} alt="Eliminar" />
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
            <img
              src={isLiked ? likeActiveIcon : likeIcon}
              alt="Like"
              className="card__like-icon"
            />
          </button>
          <span className="card__like-count">{likes?.length || 0}</span>
        </div>
      </div>
    </div>
  );
}
