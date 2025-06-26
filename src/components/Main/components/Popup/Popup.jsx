import closeIcon from '../../../../images/Close Icon.png';

export default function Popup({ title, children, onClose }) {
   console.log('Popup title:', title);
  return (
    <section className="popup"> 
      <div className="popup__content">
        <button className="popup__close-button" onClick={onClose}>
          <img src={closeIcon} alt="Cerrar" className="popup__close-button-icon" />
        </button>
        <h3 className="popup__title">{title}</h3>
        {children}
      </div>
    </section>
  );
}