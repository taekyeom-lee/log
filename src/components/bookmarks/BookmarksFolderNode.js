import { useState } from 'react';
import { FcFolder, FcOpenedFolder } from 'react-icons/fc';
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai';

import classes from './BookmarksFolderNode.module.css';

function BookmarksFolderNode() {
  const [folderIsOpen, setFolderIsOpen] = useState(false);
  const [caretIsOpen, setCaretIsOpen] = useState(false);

  const handler = () => {
    setFolderIsOpen((prevState) => !prevState);
    setCaretIsOpen((prevState) => !prevState);
  };

  return (
    <div className={classes.bookmarksFolderNode}>
      <div className={classes.verticalTab}></div>
      <div className={classes.innerContainer}>
        <div className={classes.icon} onClick={handler}>
          {caretIsOpen ? (
            <AiFillCaretDown className={classes.ironIcon} />
          ) : (
            <AiFillCaretRight className={classes.ironIcon} />
          )}
        </div>
        {folderIsOpen ? (
          <FcOpenedFolder className={classes.folderIcon} />
        ) : (
          <FcFolder className={classes.folderIcon} />
        )}
        <div className={classes.menuLabel}>리액트</div>
      </div>
    </div>
  );
}

export default BookmarksFolderNode;
