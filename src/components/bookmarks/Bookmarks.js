import { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

import BookmarsList from './BookmarksList';
import Modal from '../ui/Modal';
import Backdrop from '../ui/Backdrop';
import MenuModal from '../ui/MenuModal';
import MenuBackdrop from '../ui/MenuBackdrop';
import classes from './Bookmarks.module.css';

import { bookmarks } from '../../data';
import icon from '../../img/logo512.png';

function Bookmarks() {
  const [menuModalIsOpen, setMenuModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [myBookmarks, setMyBookmarks] = useState(bookmarks);

  const location = useLocation();

  const openMenuModalHandler = () => {
    setMenuModalIsOpen(true);
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

  const setMenuModalLocationHandler = (e) => {
    const substring = 'Backdrop';
    if (
      location.pathname === '/bookmarks' &&
      !e.target.className.includes(substring)
    ) {
      e.preventDefault();

      setY(e.nativeEvent.pageY);
      setX(e.nativeEvent.pageX);

      openMenuModalHandler();
    }
  };

  const addBookmarkHandler = (title, url) => {
    let newMyBookmarks = [...myBookmarks];

    const length = newMyBookmarks.length;

    newMyBookmarks.push({ id: length + 1, title: title, url: url, icon: icon });

    setMyBookmarks(newMyBookmarks);

    closeAddModalHandler();
  };

  const removeBookmarkHandler = (id) => {
    let newMyBookmarks = [...myBookmarks];

    newMyBookmarks.splice(id - 1, 1);

    for (let i = 0; i < newMyBookmarks.length; i++) {
      newMyBookmarks[i].id = i + 1;
    }

    setMyBookmarks(newMyBookmarks);
  };

  const editBookmarkHandler = (title, url, id) => {
    let newMyBookmarks = [...myBookmarks];

    newMyBookmarks[id - 1].url = url;
    newMyBookmarks[id - 1].title = title;

    setMyBookmarks(newMyBookmarks);
  };

  const moveBookmark = useCallback((dragIndex, hoverIndex) => {
    const dragBookmark = myBookmarks[dragIndex];
    setMyBookmarks(
      update(myBookmarks, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragBookmark],
        ],
      })
    );
  }, [myBookmarks]);

  return (
    <div
      className={classes.bookmarks}
      onContextMenu={setMenuModalLocationHandler}
    >
      <DndProvider backend={HTML5Backend}>
        <BookmarsList
          myBookmarks={myBookmarks}
          getRemoveId={removeBookmarkHandler}
          getEditValue={editBookmarkHandler}
          moveBookmark={moveBookmark}
        />
      </DndProvider>
      {menuModalIsOpen && (
        <MenuModal
          type="contextMenu"
          x={x}
          y={y}
          getAddAction={openAddModalHandler}
          onClose={closeMenuModalHandler}
        />
      )}
      {menuModalIsOpen && <MenuBackdrop onClose={closeMenuModalHandler} />}
      {addModalIsOpen && (
        <Modal
          type="add"
          getModalSave={addBookmarkHandler}
          getModalCancel={closeAddModalHandler}
        />
      )}
      {addModalIsOpen && <Backdrop onClose={closeAddModalHandler} />}
    </div>
  );
}

export default Bookmarks;
