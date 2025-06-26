import deleteIcon from '../../../../images/delete.svg';
import likeIcon from '../../../../images/like.svg';

export default function Card({ card, handleOpenPopup }) {
      const { name, link, likes = [] } = card;
  return (
    <div className="card">
      <div
        className="card__img"
        onClick={() => handleOpenPopup(card)}
      >
        <img className="card__delete-icon" src={deleteIcon} alt="Eliminar" />
        <img className="card__img-url" src={link} alt={name} />
      </div>
      <div className="card__text-container">
        <h2 className="card__text">{name}</h2>
        <div className="card__like-section">
          <button className="card__text-button-like">
            <img src={likeIcon} alt="Like" />
          </button>
          <span className="card__like-count">{likes.length}</span>
        </div>
      </div>
    </div>
  );
}