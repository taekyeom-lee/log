import Auth from './Auth';
import classes from './Modal.module.css';

function Modal() {
  return (
    <div className={classes.modal}>
      <Auth/>
    </div>
  );
}

export default Modal;
