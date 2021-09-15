import BookmarksItem from './BookmarksItem';
import classes from './BookmarksList.module.css';

function BookmarksList(props) {
  const propsMyBookmarks = props.myBookmarks;

  let height = 0;
  let paddingTop = 0;
  let paddingBottom = 0;

  if (propsMyBookmarks) {
    height = propsMyBookmarks.length * 40 + 16;
    paddingTop = 8;
    paddingBottom = 8;
  }

  // const removeBookmarkHandler = (id) => {
  //   props.getDeleteAction(id);
  // };

  return (
    <div className={classes.bookmarksList}>
      {propsMyBookmarks ? (
        <div
          className={classes.ironList}
          style={{ height, paddingTop, paddingBottom }}
        >
          {propsMyBookmarks.map((myBookmark, index) => (
            <BookmarksItem
              key={myBookmark.id}
              index={index}
              id={myBookmark.id}
              myBookmark={myBookmark}
              moveBookmark={props.moveBookmark}
              getDeleteAction={props.getDeleteAction}
            />
          ))}
        </div>
      ) : (
        <div className={classes.centerMessage}>
          페이지를 북마크에 추가하려면 오른쪽 마우스를 클릭하세요
        </div>
      )}
    </div>
  );
}

export default BookmarksList;
