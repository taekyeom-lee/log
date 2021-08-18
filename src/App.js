import { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import AllPostPage from './pages/AllPost';
import NewPostPage from './pages/NewPost';
import BookmarksPage from './pages/Bookmarks';
import Header from './components/layout/Header';
import MenuModal from './components/ui/MenuModal';
import MenuBackdrop from './components/ui/MenuBackdrop';

import './App.css';

function App() {
  const [menuModalIsOpen, setMenuModalIsOpen] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const location = useLocation();

  const openMenuModalHandler = (e) => {
    if (location.pathname === '/bookmarks') {
      e.preventDefault();

      setY(e.nativeEvent.pageY);
      setX(e.nativeEvent.pageX);

      setMenuModalIsOpen(true);
    }
  };

  const closeMenuModalHandler = () => {
    setMenuModalIsOpen(false);
  };

  return (
    <div>
      <Header />
      <div className="layout" onContextMenu={openMenuModalHandler}>
        <Switch>
          <Route path="/" exact>
            <AllPostPage />
          </Route>
          <Route path="/write">
            <NewPostPage />
          </Route>
          <Route path="/bookmarks">
            <BookmarksPage />
          </Route>
        </Switch>
      </div>
      {menuModalIsOpen && (
        <MenuModal x={x} y={y} onClose={closeMenuModalHandler} />
      )}
      {menuModalIsOpen && <MenuBackdrop onClose={closeMenuModalHandler} />}
    </div>
  );
}

export default App;
