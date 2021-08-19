import classes from './Backdrop.module.css';

function ExtraBackdrop(props) {
  return <div className={classes.backdrop} onClick={props.onClose} />;
}

export default ExtraBackdrop;
