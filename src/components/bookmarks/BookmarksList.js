import BookmarksItem from './BookmarksItem';
import classes from './BookmarksList.module.css';

function BookmarksList(props) {
  const removeHandler = (index) => {
    props.getRemoveId(index);
  };

  const editHandler = (title, url, index) => {
    props.getEditValue(title, url, index);
  };

  return (
    <div className={classes.bookmarksList}>
      {props.myBookmarks.map((myBookmark, index) => (
        <BookmarksItem
          key={myBookmark.id}
          index={index}
          id={myBookmark.id}
          myBookmark={myBookmark}
          moveBookmark={props.moveBookmark}
          getRemoveId={removeHandler}
          getEditValue={editHandler}
        />
      ))}
    </div>
  );
}

export default BookmarksList;
