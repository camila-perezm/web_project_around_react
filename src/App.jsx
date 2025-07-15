import './index.css';
import { useState, useEffect } from 'react'
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

import api from './utils/api'
import { CurrentUserContext } from './contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error('Error al obtener info del usuario:', err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <Main />
      <Footer />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
