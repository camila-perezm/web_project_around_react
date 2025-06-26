import closeIcon from '../../../../images/Close Icon.png';

export default function ImagePopup({ card, onClose }) {
  if (!card) return null;

  return (
 <div className="popup popup_opened">
  <div className="popup__content popup__content_type_image">
    <button className="popup__close-button" onClick={onClose}>
      <img src={closeIcon} alt="Cerrar" className="popup__close-button-icon" />
    </button>
    <img src={card.link} alt={card.name} className="popup__image" />
    <p className="popup__caption">{card.name}</p>
  </div>
</div>
  );
}