import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  setSelectFolder,
  setSelectFolderPath,
  setOpenFolder,
  setOpenFolderPath,
} from '../../store/action/bookmarkAction';
import BookmarksFolderNode from './BookmarksFolderNode';
import classes from './BookmarksFolder.module.css';

function BookmarksFolder() {
  const folder = useRef();

  const selected = useSelector((state) => state.bookmark);
  const dispatch = useDispatch();

  const folders = selected.folders;

  const selectParentfolder = (index) => {
    dispatch(setSelectFolderPath(index));
    dispatch(setSelectFolder());
  };

  const openParentFolder = (index) => {
    dispatch(setOpenFolderPath(index));
    dispatch(setOpenFolder());
  };

  return (
    <div className={classes.bookmarksFolder} ref={folder}>
      {folders.map((folder, index) => (
        <BookmarksFolderNode
          key={folder.id}
          folder={folder}
          index={index}
          select={(index) => selectParentfolder(index)}
          open={(index) => openParentFolder(index)}
        />
      ))}
    </div>
  );
}

export default BookmarksFolder;
