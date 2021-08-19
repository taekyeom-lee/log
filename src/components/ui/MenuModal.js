import { useEffect } from 'react';

import classes from './MenuModal.module.css';

function MenuModal(props) {
  const addBookmarkHandler = () => {
    props.getAddModal();
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
  }, []);

  return (
    <div className={classes.menuModal}>
      <p className={classes.item} onClick={addBookmarkHandler}>
        새 북마크 추가
      </p>
    </div>
  );
}

export default MenuModal;
