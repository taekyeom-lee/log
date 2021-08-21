import { useState } from 'react';
import { GoKebabVertical } from 'react-icons/go';

import Modal from '../ui/Modal';
import Backdrop from '../ui/Backdrop';
import MenuModal from '../ui/MenuModal';
import MenuBackdrop from '../ui/MenuBackdrop';
import classes from './BookmarksItem.module.css';

function BookmarksItem(props) {
  const [menuModalIsOpen, setMenuModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const openMenuModalHandler = () => {
    setMenuModalIsOpen(true);
  };

  const closeMenuModalHandler = () => {
    setMenuModalIsOpen(false);
  };

  const openEditModalHandler = () => {
    setEditModalIsOpen(true);
  };

  const closeEditModalHandler = () => {
    setEditModalIsOpen(false);
  };

  const addClassListClickedHandler = (e) => {
    if (
      e.target.className === classes.bookmarksItem ||
      e.target.className === classes.bookmarksItem + ' ' + classes.clicked
    ) {
      removeClassListClickedHandler(e.target.parentNode.childNodes);
      e.target.classList.add(classes.clicked);
      e.target.childNodes[1].childNodes[1].classList.add(classes.display)
    } else if (
      e.target.parentNode.className === classes.bookmarksItem ||
      e.target.parentNode.className ===
        classes.bookmarksItem + ' ' + classes.clicked
    ) {
      removeClassListClickedHandler(e.target.parentNode.parentNode.childNodes);
      e.target.parentNode.classList.add(classes.clicked);
      e.target.parentNode.childNodes[1].childNodes[1].classList.add(classes.display)
      setMenuModalLocationHandler(e.target);
    } else if (
      e.target.parentNode.parentNode.className === classes.bookmarksItem ||
      e.target.parentNode.parentNode.className ===
        classes.bookmarksItem + ' ' + classes.clicked
    ) {
      removeClassListClickedHandler(
        e.target.parentNode.parentNode.parentNode.childNodes
      );
      e.target.parentNode.parentNode.classList.add(classes.clicked);
      e.target.parentNode.parentNode.childNodes[1].childNodes[1].classList.add(classes.display)
      setMenuModalLocationHandler(e.target.parentNode);
    }
  };

  const removeClassListClickedHandler = (child) => {
    for (let i = 0; i < child.length; i++) {
      child[i].classList.remove(classes.clicked);
      child[i].childNodes[1].childNodes[1].classList.remove(classes.display)
    }
  };

  const setMenuModalLocationHandler = (parent) => {
    if (parent.className === classes.image) {
      const clientRect = parent.getBoundingClientRect();
      const relativeLeft = clientRect.left;
      const relativeTop = clientRect.top;

      setX(relativeLeft);
      setY(relativeTop);

      openMenuModalHandler();
    }
  };

  const removeHandler = () => {
    props.getRemoveId(props.myBookmark.id);
  };

  const saveEditModalHanlder = (title, url) => {
    props.getEditValue(title, url, props.myBookmark.id);

    closeEditModalHandler();
  };

  return (
    <div className={classes.bookmarksItem} onClick={addClassListClickedHandler}>
      <img src={props.myBookmark.icon} alt={props.myBookmark.icon} />
      <div className={classes.text}>
        <div>{props.myBookmark.title}</div>
        <div className={classes.url}>{props.myBookmark.url}</div>
      </div>
      <div className={classes.image}>
        <GoKebabVertical />
      </div>
      {menuModalIsOpen && (
        <MenuModal
          type="item"
          x={x}
          y={y}
          getEditAction={openEditModalHandler}
          getRemoveAction={removeHandler}
          onClose={closeMenuModalHandler}
        />
      )}
      {menuModalIsOpen && <MenuBackdrop onClose={closeMenuModalHandler} />}
      {editModalIsOpen && (
        <Modal
          type="edit"
          title={props.myBookmark.title}
          url={props.myBookmark.url}
          getModalSave={saveEditModalHanlder}
          getModalCancel={closeEditModalHandler}
        />
      )}
      {editModalIsOpen && <Backdrop onClose={closeEditModalHandler} />}
    </div>
  );
}

export default BookmarksItem;
