import { useState } from 'react';
import { GoKebabVertical } from 'react-icons/go';

import MenuModal from '../ui/MenuModal';
import MenuBackdrop from '../ui/MenuBackdrop';
import classes from './BookmarksItem.module.css';

function BookmarksItem(props) {
  const [menuModalIsOpen, setMenuModalIsOpen] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const openMenuModalHandler = () => {
    setMenuModalIsOpen(true);
  };

  const closeMenuModalHandler = () => {
    setMenuModalIsOpen(false);
  };

  const clickItemHandler = (id) => (e) => {
    addClassListClickedHandler(e);
  };

  const addClassListClickedHandler = (e) => {
    if (
      e.target.className === classes.bookmarksItem ||
      e.target.className === classes.bookmarksItem + ' ' + classes.clicked
    ) {
      removeClassListClickedHandler(e.target.parentNode.childNodes);
      e.target.classList.add(classes.clicked);
    } else if (
      e.target.parentNode.className === classes.bookmarksItem ||
      e.target.parentNode.className ===
        classes.bookmarksItem + ' ' + classes.clicked
    ) {
      removeClassListClickedHandler(e.target.parentNode.parentNode.childNodes);
      e.target.parentNode.classList.add(classes.clicked);
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
      setMenuModalLocationHandler(e.target.parentNode);
    }
  };

  const removeClassListClickedHandler = (child) => {
    for (let i = 0; i < child.length; i++) {
      child[i].classList.remove(classes.clicked);
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

  return (
    <div
      className={classes.bookmarksItem}
      onClick={clickItemHandler(props.myBookmark.id)}
    >
      <img src={props.myBookmark.icon} alt={props.myBookmark.icon} />
      <div className={classes.text}>
        <div>{props.myBookmark.title}</div>
        <div className={classes.url}>{props.myBookmark.url}</div>
      </div>
      <div className={classes.image}>
        <GoKebabVertical />
      </div>
      {menuModalIsOpen && (
        <MenuModal x={x} y={y} type="item" onClose={closeMenuModalHandler} />
      )}
      {menuModalIsOpen && <MenuBackdrop onClose={closeMenuModalHandler} />}
    </div>
  );
}

export default BookmarksItem;
