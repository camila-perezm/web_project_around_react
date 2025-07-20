import '../../index.css'
import { useState, useEffect } from 'react'
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NewCard from '../Main/components/Form/NewCard/NewCard';
import EditProfile from '../Main/components/Form/EditProfile/EditProfile';
import EditAvatar from '../Main/components/Form/EditAvatar/EditAvatar';
import AddCardButton from '../Main/components/Card/AddCardButton';

import api from '../../utils/api'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';



function App() {

  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const handleClosePopup = () => setPopup(null);

   //this goes in hooks folder 
  const editProfilePopup = { title: 'Editar perfil', children: <EditProfile /> };
  const newCardPopup = { title: 'Nuevo lugar', children: <NewCard /> };
  const avatarPopup = { title: 'Editar avatar', children: <EditAvatar /> };
 

useEffect(() => {
  (async () => {
    try {
      const userData = await api.getUserInfo();
      setCurrentUser(userData);

      const initialCards = await api.getInitialCards();
      setCards(initialCards);
    } catch (error) {
      console.error(error);
    }
  })();
}, []);

  const handleUpdateUser = (data) => {
    (async () => {
      await api.updateUserInfo(data).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
    })();
  }
 const handleUpdateAvatar  = (data) => {
    (async () => {
      await api.updateAvatar(data).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
    })();
};

  function handleCardLike(newCardState) {
    const { _id: cardId } = newCardState
    setCards((state) => {
      return state.map((card) => (card._id === cardId ? newCardState : card))
    });
  }

  function handleCardDelete(card) {
    setCards((state) => state.filter((c) => c._id !== card._id))
    }

  async function handleAddPlaceSubmit(cardData) {
  try {
    const newCard = await api.addCard(cardData);
    setCards([newCard, ...cards]); // añade la nueva tarjeta al inicio
    handleClosePopup();
  } catch (error) {
    console.error("Error al agregar nueva tarjeta:", error);
  }
}

  return (
    <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}>
    <div className="page">
      <Header />
      <Main 
      popup={popup}
      setPopup={setPopup}
      handleClosePopup={handleClosePopup}
      editProfilePopup={editProfilePopup}
      avatarPopup={avatarPopup}
      cards={cards}
      onCardLike={handleCardLike}
      onCardDelete={handleCardDelete}
      onAddCard={handleAddPlaceSubmit} 
      />
      <Footer />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
