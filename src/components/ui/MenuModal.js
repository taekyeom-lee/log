import { useEffect } from 'react';

import classes from './MenuModal.module.css';

function MenuModal(props) {
  const addBookmarkHandler = () => {
    props.getAddAction();
    props.onClose();
  };

  const editBookmarkHandler = () => {
    props.getEditAction();
    props.onClose();
  };

  const removeBookmarkHandler = () => {
    props.getDeleteAction();
    props.onClose();
  };

  useEffect(() => {
    document.getElementsByClassName(classes.menuModal)[0].style.top =
      props.y + 'px';
    document.getElementsByClassName(classes.menuModal)[0].style.left =
      props.x + 'px';
    document
      .getElementsByClassName(classes.menuModal)[0]
      .classList.add(classes.active);
  }, [props.y, props.x]);

  return (
    <div className={classes.menuModal}>
      {props.type === 'contextMenu' && (
        <p className={classes.contextMenu} onClick={addBookmarkHandler}>
          새 북마크 추가
        </p>
      )}
      {props.type === 'item' && (
        <div>
          <p className={classes.item} onClick={editBookmarkHandler}>
            편집(E)
          </p>
          <p className={classes.item} onClick={removeBookmarkHandler}>
            삭제(D)
          </p>
        </div>
      )}
    </div>
  );
}

export default MenuModal;
