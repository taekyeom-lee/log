import { useState } from 'react';

import BookmarksFolderNode from './BookmarksFolderNode';
import classes from './BookmarksFolder.module.css';

import { folders } from '../../resources/data';

function BookmarksFolder() {
  const [foldersSelected, setFoldersSelected] = useState(
    new Array(folders.length).fill(false)
  );

  const selectFolder = (index) => {
    let result = new Array(folders.length).fill(false);
    result[index] = true;
    setFoldersSelected(result);
  };

  return (
    <div className={classes.bookmarksFolder}>
      {folders.map((folder, index) => (
        <BookmarksFolderNode
          key={folder.id}
          folder={folder}
          isSelected={foldersSelected[index]}
          select={(index) => selectFolder(index)}
          index={index}
        />
      ))}
    </div>
  );
}

export default BookmarksFolder;
