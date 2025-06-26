import { useState } from 'react';
import avatar from '../../images/Avatar.png';
import editIcon from '../../images/edit-icon.svg';
import editProfile from '../../images/edit_profile.png';

import Popup from './components/Popup/Popup.jsx';
import NewCard from './components/Form/NewCard/NewCard.jsx';
import EditProfile from './components/Form/EditProfile/EditProfile.jsx';
import EditAvatar from './components/Form/EditAvatar/EditAvatar.jsx';
import Card from './components/Card/Card.jsx';
import ImagePopup from './components/Popup/ImagePopup.jsx';

const cards = [
  {
    isLiked: false,
    _id: '5d1f0611d321eb4bdcd707dd',
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:10:57.741Z',
  },
  {
    isLiked: false,
    _id: '5d1f064ed321eb4bdcd707de',
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:11:58.324Z',
  },
];

export default function Main() {
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const editProfilePopup = { title: 'Editar perfil', children: <EditProfile /> };
  const newCardPopup = { title: 'Nuevo lugar', children: <NewCard /> };
  const avatarPopup = { title: 'Editar avatar', children: <EditAvatar /> };

  const handleClosePopup = () => setPopup(null);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img src={avatar} alt="Avatar" className="profile__avatar-img" />
          <button
            className="profile__avatar-edit-button"
            onClick={() => setPopup(avatarPopup)}
          >
            <img src={editIcon} alt="Editar avatar" className="profile__avatar-edit-icon" />
          </button>
        </div>

        <div className="profile__about">
          <h2 className="profile__about-name">Jacques Cousteau</h2>
          <p className="profile__about-occupation">Explorador</p>
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
         <Card key={card._id} card={card} handleOpenPopup={setSelectedCard} />
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