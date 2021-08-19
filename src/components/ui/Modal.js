import { useState } from 'react';

import classes from './Modal.module.css';

function Modal(props) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [isError, setIsError] = useState(false);

  const changeTitleHandler = (e) => {
    setTitle(e.target.value);
  };

  const chagneUrlHandler = (e) => {
    setUrl(e.target.value);
  };

  const cancelHandler = () => {
    props.getModalCancel();
  };

  const saveHandler = (e) => {
    if (url) {
      props.getModalSave();
    } else {
      alertErrorHandler(e);
    }
  };

  const alertErrorHandler = (e) => {
    e.target.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[0].classList.add(
      classes.error
    );

    setIsError(true);
  };

  return (
    <div className={classes.modal}>
      <div className={classes.title}>북마크 추가</div>
      <div className={classes.form}>
        <div className={classes.name}>
          <div className={classes.text}>이름</div>
          <input
            className={classes.input}
            value={title}
            onChange={changeTitleHandler}
          />
        </div>
        <div className={classes.url}>
          <div className={classes.text}>URL</div>
          <input
            className={classes.input}
            value={url}
            onChange={chagneUrlHandler}
          />
          {isError && (
            <div className={classes.error}>URL이 올바르지 않습니다.</div>
          )}
        </div>
      </div>
      <div className={classes.button}>
        <button className={classes.cancelButton} onClick={cancelHandler}>
          취소
        </button>
        <button className={classes.saveButton} onClick={saveHandler}>
          저장
        </button>
      </div>
    </div>
  );
}

export default Modal;
