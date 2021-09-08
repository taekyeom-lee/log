import { useState, useRef } from 'react';
import { FcFolder, FcOpenedFolder } from 'react-icons/fc';
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai';

import classes from './BookmarksFolderNode.module.css';

function BookmarksFolderNode(props) {
  const [isSelected, setIsSelected] = useState(false);
  const [folderIsOpen, setFolderIsOpen] = useState(false);
  const tab = useRef();
  const title = useRef();

  const selectFolderHandler = () => {
    props.onSelected();

    setIsSelected((prevState) => !prevState);

    tab.current.style.backgroundColor = '#1a73eb';
    title.current.style.color = '#1a73eb';
  };

  const openFolderHandler = () => {
    setFolderIsOpen((prevState) => !prevState);
  };

  return (
    <div className={classes.bookmarksFolderNode}>
      <div className={classes.verticalTab} ref={tab}></div>
      <div className={classes.innerContainer}>
        <div className={classes.icon} onClick={openFolderHandler}>
          {folderIsOpen ? (
            <AiFillCaretDown className={classes.ironIcon} />
          ) : (
            <AiFillCaretRight className={classes.ironIcon} />
          )}
        </div>
        {isSelected ? (
          <FcOpenedFolder
            className={classes.folderIcon}
            onClick={selectFolderHandler}
          />
        ) : (
          <FcFolder
            className={classes.folderIcon}
            onClick={selectFolderHandler}
          />
        )}
        <div
          className={classes.menuLabel}
          onClick={selectFolderHandler}
          ref={title}
        >
          {props.folder.title}
        </div>
      </div>
    </div>
  );
}

export default BookmarksFolderNode;
