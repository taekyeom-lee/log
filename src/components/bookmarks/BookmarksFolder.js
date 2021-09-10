import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateCurrentRoute } from '../../store/action/bookmarkAction';
import BookmarksFolderNode from './BookmarksFolderNode';
import classes from './BookmarksFolder.module.css';

import { folders } from '../../resources/data';

function BookmarksFolder() {
  const folder = useRef();

  const selected = useSelector((state) => state.bookmark);
  const dispatch = useDispatch();

  const selectFolder = (index) => {
    dispatch(updateCurrentRoute(index));
  };

  useEffect(() => {
    const depth = selected.currentDepth;
    let selectedFolder;
    for (let i = depth; i > 0; i--) {
      if (!selectedFolder) {
        selectedFolder = folders[selected.currentRoute[i - 1]];
      } else {
        selectedFolder = selectedFolder.subFolder[selected.currentRoute[i - 1]];
      }
      if (i === 1 && selectedFolder) {
        selectedFolder.selected = false;
      }
    }
  });

  return (
    <div className={classes.bookmarksFolder} ref={folder}>
      {folders.map((folder, index) => (
        <BookmarksFolderNode
          key={folder.id}
          folder={folder}
          select={(index) => selectFolder(index)}
          index={index}
        />
      ))}
    </div>
  );
}

export default BookmarksFolder;
