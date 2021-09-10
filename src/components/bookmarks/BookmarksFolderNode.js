import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai';

import {
  updateCurrentRoute,
  updateCurrentDepth,
  resetCurrentRoute,
} from '../../store/action/bookmarkAction';
import Folder from '../../resources/img/folder.svg';
import OpenedFolder from '../../resources/img/opened_folder.svg';
import classes from './BookmarksFolderNode.module.css';

function BookmarksFolderNode(props) {
  const [folderIsOpen, setFolderIsOpen] = useState(false);

  const tab = useRef();
  const img = useRef();
  const title = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!props.folder.selected) {
      tab.current.style.backgroundColor = 'transparent';
      img.current.src = Folder;
      title.current.style.color = 'black';
    }
  });

  const openFolder = () => {
    setFolderIsOpen((prevState) => !prevState);
  };

  const selectFolder = () => {
    props.folder.selected = true;

    tab.current.style.backgroundColor = '#1a73eb';
    img.current.src = OpenedFolder;
    title.current.style.color = '#1a73eb';

    dispatch(resetCurrentRoute());
    dispatch(updateCurrentDepth(props.folder.depth));
    props.select(props.index);
  };

  const selectSubfolder = (index) => {
    dispatch(updateCurrentRoute(index));
    props.select(props.index);
  };

  const paddingLeft = 20 * (props.folder.depth - 1);

  return (
    <div className={classes.bookmarksFolderNode}>
      <div className={classes.bookmarksMainFolderNode}>
        <div className={classes.verticalTab} ref={tab}></div>
        <div className={classes.innerContainer} style={{ paddingLeft }}>
          <div className={classes.icon} onClick={openFolder}>
            {props.folder.subFolder &&
              (folderIsOpen ? (
                <AiFillCaretDown className={classes.ironIcon} />
              ) : (
                <AiFillCaretRight className={classes.ironIcon} />
              ))}
          </div>
          <img
            src={Folder}
            alt={Folder}
            className={classes.folderIcon}
            ref={img}
          />
          <div className={classes.menuLabel} onClick={selectFolder} ref={title}>
            {props.folder.title}
          </div>
        </div>
      </div>
      <div className={classes.bookmarksSubFolderNode}>
        {folderIsOpen &&
          props.folder.subFolder.map((subFolder, index) => (
            <BookmarksFolderNode
              key={subFolder.id}
              folder={subFolder}
              index={index}
              select={(index) => selectSubfolder(index)}
            />
          ))}
      </div>
    </div>
  );
}

export default BookmarksFolderNode;
