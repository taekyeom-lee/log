import { GoKebabVertical } from 'react-icons/go';

import classes from './BookmarksItem.module.css'

function BookmarksItem(props) {
  return (
    <div className={classes.bookmarksItem}>
      <img src={props.myBookmark.icon} alt={props.myBookmark.icon} />
      <div className={classes.text}>
        <div>{props.myBookmark.title}</div>
        <div className={classes.url}>{props.myBookmark.url}</div>
      </div>
      <div
        className={classes.image}
      >
        <GoKebabVertical />
      </div>
    </div>
  );
}

export default BookmarksItem;
