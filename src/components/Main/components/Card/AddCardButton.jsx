import { useState } from "react";
import Popup from "../Popup/Popup";
import NewCard from "../Form/NewCard/NewCard";

export default function AddCardButton({ onAddCard }) {
  const [popup, setPopup] = useState(null);

  const newCardPopup = { title: "Nuevo lugar" };
  const handleOpenPopup = () => setPopup(newCardPopup);
  const handleClosePopup = () => setPopup(null);

 async function handleAddCard(cardData) {
    try {
      await onAddCard(cardData);  // espera que se agregue la tarjeta
      handleClosePopup();         // cierra el popup después de agregar
    } catch (error) {
      console.error(error);
      // opcional: mostrar mensaje de error
    }
  }

  return (
    <>
      <button className="profile__button-add" onClick={handleOpenPopup}>
        +
      </button>

      {popup && (
        <Popup title={popup.title} onClose={handleClosePopup}>
          <NewCard onAddCard={handleAddCard} />
        </Popup>
      )}
    </>
  );
}
