import BookmarksItem from './BookmarksItem';
import classes from './BookmarksList.module.css';

function BookmarksList(props) {
  const removeHandler = (id) => {
    props.getRemoveId(id);
  };

  const editHandler = (title, url, id) => {
    props.getEditValue(title, url, id);
  };

  return (
    <div className={classes.bookmarksList}>
      {props.myBookmarks.map((myBookmark) => (
        <BookmarksItem
          key={myBookmark.id}
          myBookmark={myBookmark}
          getRemoveId={removeHandler}
          getEditValue={editHandler}
        />
      ))}
    </div>
  );
}

export default BookmarksList;
