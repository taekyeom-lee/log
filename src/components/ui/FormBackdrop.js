import classes from './FormBackdrop.module.css';

function FormBackdrop(props) {
  return <div className={classes.formBackdrop} onClick={props.onClose} />;
}

export default FormBackdrop;
