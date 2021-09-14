import { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { GoKebabVertical } from 'react-icons/go';

import FormModal from '../ui/FormModal';
import FormBackdrop from '../ui/FormBackdrop';
import MenuModal from '../ui/MenuModal';
import MenuBackdrop from '../ui/MenuBackdrop';
import classes from './BookmarksItem.module.css';

const ItemTypes = {
  Bookmark: 'bookmark',
};

function BookmarksItem(props) {
  const [menuModalIsOpen, setMenuModalIsOpen] = useState(false);
  const [formModalIsOpen, setFormModalIsOpen] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const bookmarkItemRef = useRef(null);
  const urlRef = useRef(null);
  const imgRef = useRef(null);

  const propsIndex = props.index;
  const propsId = props.id;
  const propsMyBookmark = props.myBookmark;

  const [, drop] = useDrop({
    accept: ItemTypes.Bookmark,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!bookmarkItemRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect =
        bookmarkItemRef.current?.getBoundingClientRect();
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
      props.moveBookmark(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.Bookmark,
    item: () => {
      return { propsId, propsIndex };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(bookmarkItemRef));

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

  const addClassListClicked = (e) => {
    removeClassListClicked();
    bookmarkItemRef.current.classList.add(classes.clicked);
    urlRef.current.classList.add(classes.display);
  };

  const removeClassListClicked = () => {
    const bookmarkList = bookmarkItemRef.current.parentNode;
    const length = bookmarkList.childNodes.length;

    for (let i = 0; i < length; i++) {
      bookmarkList.childNodes[i].classList.remove(classes.clicked);
      bookmarkList.childNodes[i].childNodes[1].childNodes[1].classList.remove(
        classes.display
      );
    }
  };

  const clickImage = () => {
    const clientRect = imgRef.current.getBoundingClientRect();
    const relativeLeft = clientRect.left - 110;
    const relativeTop = clientRect.top;

    setX(relativeLeft);
    setY(relativeTop);

    openMenuModal();
  };

  const removeBookmark = () => {
    props.getDeleteAction(propsId);
  };

  return (
    <div
      ref={bookmarkItemRef}
      className={classes.bookmarksItem}
      style={{ opacity }}
      onClick={addClassListClicked}
    >
      <img src={props.myBookmark.icon} alt={props.myBookmark.icon} />
      <div className={classes.text}>
        <div>{props.myBookmark.title}</div>
        <div className={classes.url} ref={urlRef}>
          {props.myBookmark.url}
        </div>
      </div>
      <div className={classes.image} ref={imgRef} onClick={clickImage}>
        <GoKebabVertical />
      </div>
      {menuModalIsOpen && (
        <MenuModal
          type="item"
          x={x}
          y={y}
          id={propsMyBookmark.id}
          getDeleteAction={removeBookmark}
          getEditAction={openFormModal}
          onClose={closeMenuModal}
        />
      )}
      {menuModalIsOpen && <MenuBackdrop onClose={closeMenuModal} />}
      {formModalIsOpen && (
        <FormModal
          type="edit"
          title={propsMyBookmark.title}
          url={propsMyBookmark.url}
          id={propsMyBookmark.id}
          onClose={closeFormModal}
        />
      )}
      {formModalIsOpen && <FormBackdrop onClose={closeFormModal} />}
    </div>
  );
}

export default BookmarksItem;
