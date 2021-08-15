import { useEffect } from 'react';

import classes from './AddModal.module.css';

function AddModal(props) {
  function addHandler() {
    props.getAddModal();
    props.onClose();
  }

  useEffect(() => {
    document
      .getElementsByClassName(classes.addModal)[0]
      .classList.add(classes.active);

    document.getElementsByClassName(classes.addModal)[0].style.top =
      props.yPosition + 'px';
    document.getElementsByClassName(classes.addModal)[0].style.left =
      props.xPosition + 'px';
  }, []);

  return (
    <div className={classes.addModal}>
      <p className={classes.item} onClick={addHandler}>
        새 북마크 추가
      </p>
    </div>
  );
}

export default AddModal;
