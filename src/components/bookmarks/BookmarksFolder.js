import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  updateCurrentRoute,
  setFolderSelected,
} from '../../store/action/bookmarkAction';
import BookmarksFolderNode from './BookmarksFolderNode';
import classes from './BookmarksFolder.module.css';

function BookmarksFolder() {
  const folder = useRef();

  const selected = useSelector((state) => state.bookmark);
  const dispatch = useDispatch();

  const folders = selected.folders;

  const selectFolder = (index) => {
    dispatch(updateCurrentRoute(index));
    dispatch(setFolderSelected(true));
  };

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
