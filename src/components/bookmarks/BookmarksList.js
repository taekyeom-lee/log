import BookmarksItem from './BookmarksItem';
import classes from './BookmarksList.module.css';

function BookmarksList(props) {
  const removeBookmarkHandler = (id, index) => {
    props.getDeleteAction(id, index);
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
          getDeleteAction={removeBookmarkHandler}
        />
      ))}
    </div>
  );
}

export default BookmarksList;
