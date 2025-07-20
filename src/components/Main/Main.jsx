import { useState, useEffect, useContext } from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import api from '../../utils/api.js'
import avatar from '../../images/Avatar.png';
import editIcon from '../../images/edit-icon.svg';
import editProfile from '../../images/edit_profile.png';

import Popup from './components/Popup/Popup.jsx';
import Card from './components/Card/Card.jsx';
import ImagePopup from './components/Popup/ImagePopup.jsx';
import AddCardButton from './components/Card/AddCardButton.jsx';


export default function Main({
  popup,
  setPopup,
  handleClosePopup,
  editProfilePopup,
  newCardPopup,
  avatarPopup,
  cards,
  onCardLike,
  onCardDelete,
  onAddCard
}) {

  const {currentUser} = useContext(CurrentUserContext);
  const [selectedCard, setSelectedCard] = useState(null);

 useEffect(() => {
  console.log("useEffect: currentUser actualizado:", currentUser);
}, [currentUser]); 

function handleAddCard(cardData) {
  api.addCard(cardData)
    .then((newCard) => {
      onAddCard(newCard);
    })
    .catch((err) => {
      console.error("Error al agregar tarjeta:", err);
    });
}

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img src={currentUser?.avatar || avatar} alt="Avatar" className="profile__avatar-img" />
          <button
            className="profile__avatar-edit-button"
            onClick={() => setPopup(avatarPopup)}
          >
            <img src={editIcon} alt="Editar avatar" className="profile__avatar-edit-icon" />
          </button>
        </div>

        <div className="profile__about">
          <h2 className="profile__about-name">{currentUser?.name || 'Cargando...'}</h2>
          <p className="profile__about-occupation">{currentUser?.about || ''}</p>
        </div>

        <button
          className="profile__about-edit"
          onClick={() => setPopup(editProfilePopup)}
        >
          <img src={editProfile} alt="Editar perfil" className="profile__about-edit-icon" />
        </button>
       <AddCardButton onAddCard={handleAddCard} />

      </section>

      <div className="cards">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={setSelectedCard}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </div>

      {popup && (
        <Popup title={popup.title} onClose={handleClosePopup}>
          {popup.children}
        </Popup>
      )}

      {selectedCard && (
        <ImagePopup card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
    </main>
  );
}
