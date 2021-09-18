import { useEffect, useRef } from 'react';

import classes from './MenuModal.module.css';

function MenuModal(props) {
  const propsClickType = props.clickType;
  const propsDataType = props.dataType;
  const propsX = props.x;
  const propsY = props.y;

  const menuModalRef = useRef(null);

  const addBookmark = () => {
    props.getAddBookmarkAction();
    props.onClose();
  };

  const addFolder = () => {
    props.getAddFolderAction();
    props.onClose();
  };

  const editBookmark = () => {
    props.getEditAction();
    props.onClose();
  };

  const editFolder = () => {
    props.getEditFolderAction();
    props.onClose();
  };

  const removeBookmark = () => {
    props.getDeleteAction();
    props.onClose();
  };

  useEffect(() => {
    menuModalRef.current.style.top = propsY + 'px';
    menuModalRef.current.style.left = propsX + 'px';
    menuModalRef.current.classList.add(classes.active);
  }, [propsY, propsX]);

  return (
    <div className={classes.menuModal} ref={menuModalRef}>
      {propsClickType === 'contextMenu' && (
        <div>
          <p className={classes.menu} onClick={addBookmark}>
            새 북마크 추가
          </p>
          <p className={classes.menu} onClick={addFolder}>
            새 폴더 추가
          </p>
        </div>
      )}
      {propsClickType === 'item' && propsDataType === 'bookmark' && (
        <div>
          <p className={classes.menu} onClick={editBookmark}>
            편집(E)
          </p>
          <p className={classes.menu} onClick={removeBookmark}>
            삭제(D)
          </p>
        </div>
      )}
      {propsClickType === 'item' && propsDataType === 'folder' && (
        <div>
          <p className={classes.menu} onClick={editFolder}>
            이름 바꾸기
          </p>
          <p className={classes.menu} onClick={removeBookmark}>
            삭제(D)
          </p>
        </div>
      )}
    </div>
  );
}

export default MenuModal;
