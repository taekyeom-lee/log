import { useSelector } from 'react-redux';

import BookmarksItem from './BookmarksItem';
import classes from './BookmarksList.module.css';

function BookmarksList(props) {
  const selectedData = useSelector((state) => state.bookmark.bookmarks);

  const height = selectedData.length * 40 + 16;

  const removeBookmarkHandler = (id) => {
    props.getDeleteAction(id);
  };

  return (
    <div className={classes.bookmarksList} style={{ height }}>
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
