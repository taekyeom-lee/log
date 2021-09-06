import BookmarksFolderNode from './BookmarksFolderNode';
import classes from './BookmarksFolder.module.css';

function BookmarksFolder() {
  return (
    <div className={classes.bookmarksFolder}>
      <BookmarksFolderNode />
    </div>
  );
}

export default BookmarksFolder;
