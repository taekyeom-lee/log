import { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { GoKebabVertical } from 'react-icons/go';

import Modal from '../ui/Modal';
import Backdrop from '../ui/Backdrop';
import MenuModal from '../ui/MenuModal';
import MenuBackdrop from '../ui/MenuBackdrop';
import classes from './BookmarksItem.module.css';

const ItemTypes = {
  Bookmark: 'bookmark',
};

function BookmarksItem(props) {
  const [menuModalIsOpen, setMenuModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const ref = useRef(null);

  const index = props.index;
  const id = props.id;
  const moveBookmark = props.moveBookmark;

  const [, drop] = useDrop({
    accept: ItemTypes.Bookmark,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveBookmark(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.Bookmark,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

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
      e.target.childNodes[1].childNodes[1].classList.add(classes.display);
    } else if (
      e.target.parentNode.className === classes.bookmarksItem ||
      e.target.parentNode.className ===
        classes.bookmarksItem + ' ' + classes.clicked
    ) {
      removeClassListClickedHandler(e.target.parentNode.parentNode.childNodes);
      e.target.parentNode.classList.add(classes.clicked);
      e.target.parentNode.childNodes[1].childNodes[1].classList.add(
        classes.display
      );
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
      e.target.parentNode.parentNode.childNodes[1].childNodes[1].classList.add(
        classes.display
      );
      setMenuModalLocationHandler(e.target.parentNode);
    }
  };

  const removeClassListClickedHandler = (child) => {
    for (let i = 0; i < child.length; i++) {
      child[i].classList.remove(classes.clicked);
      child[i].childNodes[1].childNodes[1].classList.remove(classes.display);
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

  const removeBookmarkHandler = () => {
    props.getDeleteAction(id);
  };

  return (
    <div
      ref={ref}
      className={classes.bookmarksItem}
      style={{ opacity }}
      onClick={addClassListClickedHandler}
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
        <MenuModal
          type="item"
          x={x}
          y={y}
          id={props.myBookmark.id}
          getDeleteAction={removeBookmarkHandler}
          getEditAction={openEditModalHandler}
          onClose={closeMenuModalHandler}
        />
      )}
      {menuModalIsOpen && <MenuBackdrop onClose={closeMenuModalHandler} />}
      {editModalIsOpen && (
        <Modal
          type="edit"
          title={props.myBookmark.title}
          url={props.myBookmark.url}
          id={props.myBookmark.id}
          getModalCancel={closeEditModalHandler}
        />
      )}
      {editModalIsOpen && <Backdrop onClose={closeEditModalHandler} />}
    </div>
  );
}

export default BookmarksItem;
