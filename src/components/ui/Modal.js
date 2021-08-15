import { useEffect } from 'react';

import classes from './Modal.module.css';

function Modal(props) {
  function editHandler() {
    props.getEditModalIsOpen();
    props.onClose();
  }

  function closeHandler() {
    props.getModalDelete();
    props.onClose();
  }

  useEffect(() => {
    document.getElementsByClassName(classes.modal)[0].style.top =
      props.topPosition + 'px';
  }, []);

  return (
    <div className={classes.modal}>
      <p className={classes.item} onClick={editHandler}>
        편집(E)
      </p>
      <p className={classes.item} onClick={closeHandler}>
        삭제(D)
      </p>
    </div>
  );
}

export default Modal;
