import classes from './EditModal.module.css';

function EditModal(props) {
  function nameChangeHandler() {}

  function urlChangeHandler() {}

  function cancelHandler() {
    props.getEditCancel();
  }

  return (
    <div className={classes.editModal}>
      <div className={classes.title}>북마크 수정</div>
      <div className={classes.form}>
        <div className={classes.name}>
          <div className={classes.text}>이름</div>
          <input
            className={classes.input}
            value={props.title}
            onChange={nameChangeHandler}
          />
        </div>
        <div className={classes.url}>
          <div className={classes.text}>URL</div>
          <input
            className={classes.input}
            value={props.url}
            onChange={urlChangeHandler}
          />
        </div>
      </div>
      <div className={classes.button}>
        <button className={classes.cancelButton} onClick={cancelHandler}>
          취소
        </button>
        <button className={classes.saveButton}>저장</button>
      </div>
    </div>
  );
}

export default EditModal;
