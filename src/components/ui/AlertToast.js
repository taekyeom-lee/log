import classes from './AlertToast.module.css';

function AlertToast({ title, onCancel, onClose }) {
  const cancelHandler = () => {
    onCancel();
    onClose();
  };

  return (
    <div className={classes.alertModal}>
      <div className={classes.alert}>'{title}' 삭제됨</div>
      <div className={classes.cancel} onClick={cancelHandler}>
        실행 취소(U)
      </div>
    </div>
  );
}

export default AlertToast;
