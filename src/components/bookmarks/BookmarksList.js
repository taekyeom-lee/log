import BookmarksItem from './BookmarksItem';
import classes from './BookmarksList.module.css'

function BookmarksList(props) {
  return (
    <div className={classes.bookmarksList}>
      {props.myBookmarks.map((myBookmark) => (
        <BookmarksItem key={myBookmark.id} myBookmark={myBookmark} />
      ))}
    </div>
  );
}

export default BookmarksList;
