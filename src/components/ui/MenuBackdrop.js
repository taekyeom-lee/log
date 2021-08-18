import classes from './MenuBackdrop.module.css';

function MenuBackdrop(props) {
  return <div className={classes.menuBackdrop} onClick={props.onClose}></div>;
}

export default MenuBackdrop;
