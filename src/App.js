import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import AllPostPage from './pages/AllPost';
import NewPostPage from './pages/NewPost';
import FavoritesPage from './pages/Favorites';
import Header from './components/layout/Header';
import Modal from './components/layout/Modal';
import Backdrop from './components/layout/Backdrop';

function App() {  
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModalHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <Header propsFunction={openModalHandler}/>
      <Switch>
        <Route path='/' exact>
          <AllPostPage />
        </Route>
        <Route path='/write'>
          <NewPostPage />
        </Route>
        <Route path='/favorites'>
          <FavoritesPage />
        </Route>
      </Switch>
      {modalIsOpen && <Modal onOpen={openModalHandler} onClose={closeModalHandler}/>}
      {modalIsOpen && <Backdrop onClose={closeModalHandler} />}
    </div>
  );
}

export default App;
