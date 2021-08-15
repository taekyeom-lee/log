import { useState } from 'react';

import classes from './EditModal.module.css';

function EditModal(props) {
  const [title, setTitle] = useState(props.title);
  const [url, setUrl] = useState(props.url);

  function titleChangeHandler(e) {
    setTitle(e.target.value);
  }

  function urlChangeHandler(e) {
    setUrl(e.target.value);
  }

  function cancelHandler() {
    props.getEditModalCancel();
  }

  function saveHandler() {
    props.getEditModalSave(title, url);
  }

  return (
    <div className={classes.editModal}>
      <div className={classes.title}>북마크 수정</div>
      <div className={classes.form}>
        <div className={classes.name}>
          <div className={classes.text}>이름</div>
          <input
            className={classes.input}
            value={title}
            onChange={titleChangeHandler}
          />
        </div>
        <div className={classes.url}>
          <div className={classes.text}>URL</div>
          <input
            className={classes.input}
            value={url}
            onChange={urlChangeHandler}
          />
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

export default EditModal;
