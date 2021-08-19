import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import BookmarsList from './BookmarksList';
import MenuModal from '../ui/MenuModal';
import MenuBackdrop from '../ui/MenuBackdrop';
import Modal from '../ui/Modal';
import Backdrop from '../ui/Backdrop';
import classes from './Bookmarks.module.css';

function Bookmarks() {
  const [menuModalIsOpen, setMenuModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
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

  const openAddModalHandler = () => {
    setAddModalIsOpen(true);
  };

  const closeAddModalHandler = () => {
    setAddModalIsOpen(false);
  };

  const saveAddModalHandler = () => {
    console.log('save');
    closeAddModalHandler();
  };

  return (
    <div className={classes.bookmarks} onContextMenu={openMenuModalHandler}>
      <BookmarsList />
      {menuModalIsOpen && (
        <MenuModal
          x={x}
          y={y}
          type="contextMenu"
          getAddModal={openAddModalHandler}
          onClose={closeMenuModalHandler}
        />
      )}
      {menuModalIsOpen && <MenuBackdrop onClose={closeMenuModalHandler} />}
      {addModalIsOpen && (
        <Modal
          getModalSave={saveAddModalHandler}
          getModalCancel={closeAddModalHandler}
        />
      )}
      {addModalIsOpen && <Backdrop onClose={closeAddModalHandler} />}
    </div>
  );
}

export default Bookmarks;
