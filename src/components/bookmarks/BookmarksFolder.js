import BookmarksFolderNode from './BookmarksFolderNode';
import classes from './BookmarksFolder.module.css';
import Folder from '../../resources/img/folder.svg';

import { folders } from '../../resources/data';
import { useRef } from 'react';

function BookmarksFolder() {
  const node = useRef();

  const selectFolderHandler = () => {
    for (let i = 0; i < node.current.children.length; i++) {
      node.current.children[i].children[0].style.backgroundColor =
        'transparent';
      node.current.children[i].children[1].children[1].src = Folder;
      node.current.children[i].children[1].children[2].style.color = 'black';
    }
  };

  return (
    <div className={classes.bookmarksFolder} ref={node}>
      {folders.map((folder) => (
        <BookmarksFolderNode
          key={folder.id}
          folder={folder}
          onSelected={selectFolderHandler}
        />
      ))}
    </div>
  );
}

export default BookmarksFolder;
