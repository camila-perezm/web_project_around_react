import { useState, useEffect, useContext } from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import api from '../../utils/api.js'
import avatar from '../../images/Avatar.png';
import editIcon from '../../images/edit-icon.svg';
import editProfile from '../../images/edit_profile.png';

import Popup from './components/Popup/Popup.jsx';
import NewCard from './components/Form/NewCard/NewCard.jsx';
import EditProfile from './components/Form/EditProfile/EditProfile.jsx';
import EditAvatar from './components/Form/EditAvatar/EditAvatar.jsx';
import Card from './components/Card/Card.jsx';
import ImagePopup from './components/Popup/ImagePopup.jsx';

export default function Main() {
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (!currentUser) return;

    api.getInitialCards()
      .then((cardsData) => {
        const cardsWithLikes = cardsData.map(card => ({
          ...card,
          likes: card.likes || [],
          isLiked: Array.isArray(card.likes) && currentUser
            ? card.likes.some(user => user._id === currentUser._id)
            : false,
        }));
        setCards(cardsWithLikes);
      })
      .catch((err) => {
        console.error('Error al obtener las tarjetas:', err);
      });
  }, [currentUser]);

  const editProfilePopup = { title: 'Editar perfil', children: <EditProfile /> };
  const newCardPopup = { title: 'Nuevo lugar', children: <NewCard /> };
  const avatarPopup = { title: 'Editar avatar', children: <EditAvatar /> };
  const handleClosePopup = () => setPopup(null);

  async function handleCardLike(card) {
    const isLiked = Array.isArray(card.likes) && currentUser
      ? card.likes.some(user => user._id === currentUser._id)
      : false;

    try {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);
      console.log('Respuesta de API newCard:', newCard);

   const newCardWithIsLiked = {
  ...newCard,
  likes: newCard.likes || [],
  isLiked: Array.isArray(newCard.likes) && currentUser
    ? newCard.likes.some(user => user._id === currentUser._id)
    : false,
};

      setCards((state) =>
        state.map((c) => (c._id === card._id ? newCardWithIsLiked : c))
      );
    } catch (error) {
      console.error('Error al actualizar like:', error);
    }
  }

  async function handleCardDelete(card) {
  try {
    await api.deleteCard(card._id);
    setCards((state) => state.filter((c) => c._id !== card._id));
  } catch (error) {
    console.error('Error al eliminar la tarjeta:', error);
  }
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

        <button
          className="profile__button-add"
          onClick={() => setPopup(newCardPopup)}
        >
          +
        </button>
      </section>

      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={setSelectedCard}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
      </section>

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
