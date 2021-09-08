import { useState, useRef } from 'react';
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai';
import Folder from '../../resources/img/folder.svg';
import OpenedFolder from '../../resources/img/opened_folder.svg';

import classes from './BookmarksFolderNode.module.css';

function BookmarksFolderNode(props) {
  const [folderIsOpen, setFolderIsOpen] = useState(false);
  const tab = useRef();
  const img = useRef();
  const title = useRef();

  const selectFolderHandler = () => {
    props.onSelected();

    tab.current.style.backgroundColor = '#1a73eb';
    img.current.src = OpenedFolder;
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
        <img src={Folder} className={classes.folderIcon} ref={img} />
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
