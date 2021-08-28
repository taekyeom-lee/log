import { useState, useRef, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

import BookmarsList from './BookmarksList';
import Modal from '../ui/Modal';
import Backdrop from '../ui/Backdrop';
import MenuModal from '../ui/MenuModal';
import MenuBackdrop from '../ui/MenuBackdrop';
import AlertToast from '../ui/AlertToast';
import classes from './Bookmarks.module.css';

import { bookmarks } from '../../data';
import icon from '../../img/logo512.png';

import { useSelector } from 'react-redux';

function Bookmarks() {
  const [menuModalIsOpen, setMenuModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [alertToast, setAlertToast] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [myBookmarks, setMyBookmarks] = useState(bookmarks);
  const [deleteItem, setDeleteItem] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(0);
  const nextId = useRef(myBookmarks.length + 1);

  const location = useLocation();

  const selectedData = useSelector((state) => state);

  const filteredBookmarks = myBookmarks.filter((myBookmarks) =>
    myBookmarks.title.toLowerCase().includes(selectedData.bookmarks.keyword)
  );

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

  const openAlertToastHandler = () => {
    setAlertToast(true);
  };

  const closeAlertToastHandler = () => {
    setAlertToast(false);
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

    newMyBookmarks.push({
      id: nextId.current,
      title: title,
      url: url,
      icon: icon,
    });

    setMyBookmarks(newMyBookmarks);

    nextId.current += 1;

    closeAddModalHandler();
  };

  const removeBookmarkHandler = (index) => {
    let newMyBookmarks = [...myBookmarks];
    setDeleteItem(newMyBookmarks[index]);
    setDeleteIndex(index);

    newMyBookmarks.splice(index, 1);

    setMyBookmarks(newMyBookmarks);

    openAlertToastHandler();
  };

  const editBookmarkHandler = (title, url, index) => {
    let newMyBookmarks = [...myBookmarks];

    newMyBookmarks[index].url = url;
    newMyBookmarks[index].title = title;

    setMyBookmarks(newMyBookmarks);
  };

  const restoreBookmarkHandler = () => {
    let newMyBookmarks = [...myBookmarks];

    newMyBookmarks.splice(deleteIndex, 0, deleteItem);

    setMyBookmarks(newMyBookmarks);
  };

  const moveBookmark = useCallback(
    (dragIndex, hoverIndex) => {
      const dragBookmark = myBookmarks[dragIndex];
      setMyBookmarks(
        update(myBookmarks, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragBookmark],
          ],
        })
      );
    },
    [myBookmarks]
  );

  useEffect(() => {
    if (alertToast) {
      setTimeout(() => setAlertToast(false), 3000);
    }
  }, [alertToast]);

  return (
    <div
      className={classes.bookmarks}
      onContextMenu={setMenuModalLocationHandler}
    >
      <DndProvider backend={HTML5Backend}>
        <BookmarsList
          myBookmarks={filteredBookmarks}
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
      {alertToast && (
        <AlertToast
          title={deleteItem.title}
          onClose={closeAlertToastHandler}
          onCancel={restoreBookmarkHandler}
        />
      )}
    </div>
  );
}

export default Bookmarks;
