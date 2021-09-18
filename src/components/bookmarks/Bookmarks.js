import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';

import {
  setKeyword,
  deleteItem,
  restoreItem,
  updateItem,
} from '../../store/action/bookmarkAction';
import BookmarksFolder from './BookmarksFolder';
import BookmarsList from './BookmarksList';
import FormModal from '../ui/FormModal';
import FormBackdrop from '../ui/FormBackdrop';
import MenuModal from '../ui/MenuModal';
import MenuBackdrop from '../ui/MenuBackdrop';
import AlertToast from '../ui/AlertToast';
import classes from './Bookmarks.module.css';

function Bookmarks() {
  const [menuModalIsOpen, setMenuModalIsOpen] = useState(false);
  const [formModalIsOpen, setFormModalIsOpen] = useState(false);
  const [alertToast, setAlertToast] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [deleteData, setDeleteData] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(0);
  const [dataType, setDataType] = useState('');

  const location = useLocation();

  const selected = useSelector((state) => state.bookmark);
  // const selectedData = useSelector((state) => state.bookmark.bookmarks); // 지울거
  const dispatch = useDispatch();

  const path = selected.selectFolderPath;
  const depth = selected.selectFolderDepth;

  let array = selected.folders;

  for (let i = 0; i < depth; i++) {
    array = array[path[i]].subFolder;
  }

  // let filteredBookmarks;

  // filteredBookmarks = selectedData.filter(
  //   (
  //     selectedData // 수정
  //   ) => selectedData.title.toLowerCase().includes(selected.keyword)
  // );

  const openMenuModal = () => {
    setMenuModalIsOpen(true);
  };

  const closeMenuModal = () => {
    setMenuModalIsOpen(false);
  };

  const openFormModal = () => {
    setFormModalIsOpen(true);
  };

  const closeFormModal = () => {
    setFormModalIsOpen(false);
  };

  const openAlertToast = () => {
    setAlertToast(true);
  };

  const closeAlertToast = () => {
    setAlertToast(false);
  };

  const setMenuModalLocation = (e) => {
    // 수정
    const substring = 'Backdrop';
    if (
      location.pathname === '/bookmarks' &&
      !e.target.className.includes(substring)
    ) {
      e.preventDefault();

      setY(e.nativeEvent.pageY);
      setX(e.nativeEvent.pageX);

      openMenuModal();
    }
  };

  const removeBookmark = (id) => {
    const data = array.filter((selectedData) => selectedData.id === id);
    const dataIndex = array.findIndex((array) => array.id === id);

    setDeleteData(data[0]);
    setDeleteIndex(dataIndex);

    dispatch(deleteItem(path, depth, dataIndex));

    openAlertToast();
  };

  const restoreBookmark = () => {
    dispatch(restoreItem(path, depth, deleteIndex, deleteData));
  };

  const moveBookmark = useCallback(
    (dragIndex, hoverIndex) => {
      const dragBookmark = array[dragIndex];
      dispatch(updateItem(path, depth, dragIndex, hoverIndex, dragBookmark));
    },
    [dispatch, array, depth, path]
  );

  const addBookmark = () => {
    setDataType('bookmark');
    openFormModal();
  };

  const addFolder = () => {
    setDataType('folder');
    openFormModal();
  };

  useEffect(() => {
    dispatch(setKeyword(''));
    if (alertToast) {
      setTimeout(() => setAlertToast(false), 3000);
    }
  }, [dispatch, alertToast]);

  return (
    <div className={classes.bookmarks} onContextMenu={setMenuModalLocation}>
      <BookmarksFolder />
      <DndProvider backend={HTML5Backend}>
        <BookmarsList
          myBookmarks={array}
          // myBookmarks={filteredBookmarks}
          moveBookmark={moveBookmark}
          getDeleteAction={removeBookmark}
        />
      </DndProvider>
      {menuModalIsOpen && (
        <MenuModal
          clickType="contextMenu"
          x={x}
          y={y}
          getAddBookmarkAction={addBookmark}
          getAddFolderAction={addFolder}
          onClose={closeMenuModal}
        />
      )}
      {menuModalIsOpen && <MenuBackdrop onClose={closeMenuModal} />}
      {formModalIsOpen && (
        <FormModal
          functionType="add"
          dataType={dataType}
          onClose={closeFormModal}
        />
      )}
      {formModalIsOpen && <FormBackdrop onClose={closeFormModal} />}
      {alertToast && (
        <AlertToast
          title={deleteData.title}
          onClose={closeAlertToast}
          onCancel={restoreBookmark}
        />
      )}
    </div>
  );
}

export default Bookmarks;
