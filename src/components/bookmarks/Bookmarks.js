import { useState, useCallback, useEffect } from 'react';
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

import { useSelector, useDispatch } from 'react-redux';
import {
  setKeyword,
  deleteItem,
  restoreItem,
} from '../../store/action/bookmarkAction';

function Bookmarks() {
  const [menuModalIsOpen, setMenuModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [alertToast, setAlertToast] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [myBookmarks, setMyBookmarks] = useState(bookmarks);
  const [deleteData, setDeleteData] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(0);

  const location = useLocation();

  const selectedData = useSelector((state) => state.bookmark.bookmarks);
  const dispatch = useDispatch();

  // let filteredBookmarks;

  // filteredBookmarks = myBookmarks.filter((myBookmarks) =>
  //   myBookmarks.title.toLowerCase().includes(selectedData.bookmark.keyword)
  // );

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

  const removeBookmarkHandler = (id, index) => {
    setDeleteData(selectedData[index]);
    setDeleteIndex(index);

    dispatch(deleteItem(id));
    openAlertToastHandler();
  };

  const restoreBookmarkHandler = () => {
    dispatch(restoreItem(deleteIndex, deleteData));
  };

  useEffect(() => {
    if (alertToast) {
      setTimeout(() => setAlertToast(false), 3000);
    }
  }, [alertToast]);

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
    dispatch(setKeyword(''));
  }, []);

  return (
    <div
      className={classes.bookmarks}
      onContextMenu={setMenuModalLocationHandler}
    >
      <DndProvider backend={HTML5Backend}>
        <BookmarsList
          myBookmarks={selectedData}
          moveBookmark={moveBookmark}
          getDeleteAction={removeBookmarkHandler}
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
        <Modal type="add" getModalCancel={closeAddModalHandler} />
      )}
      {addModalIsOpen && <Backdrop onClose={closeAddModalHandler} />}

      {alertToast && (
        <AlertToast
          title={deleteData.title}
          onClose={closeAlertToastHandler}
          onCancel={restoreBookmarkHandler}
        />
      )}
    </div>
  );
}

export default Bookmarks;
