import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai';

import {
  setSelectFolderDepth,
  setSelectFolderPath,
  resetSelectFolderPath,
  setOpenFolderDepth,
  setOpenFolderPath,
  resetOpenFolderPath,
} from '../../store/action/bookmarkAction';
import Folder from '../../resources/img/folder.svg';
import OpenedFolder from '../../resources/img/opened_folder.svg';
import classes from './BookmarksFolderNode.module.css';

function BookmarksFolderNode(props) {
  const tab = useRef();
  const img = useRef();
  const title = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!props.folder.isSelected) {
      tab.current.style.backgroundColor = 'transparent';
      img.current.src = Folder;
      title.current.style.color = 'black';
    } else {
      tab.current.style.backgroundColor = '#1a73eb';
      img.current.src = OpenedFolder;
      title.current.style.color = '#1a73eb';
    }
  });

  const selectFolder = () => {
    dispatch(resetSelectFolderPath());
    dispatch(setSelectFolderDepth(props.folder.depth));

    props.select(props.index);
  };

  const openFolder = () => {
    dispatch(resetOpenFolderPath());
    dispatch(setOpenFolderDepth(props.folder.depth));

    props.open(props.index);
  };

  const selectParentfolder = (index) => {
    dispatch(setSelectFolderPath(index));

    props.select(props.index);
  };

  const openParentFolder = (index) => {
    dispatch(setOpenFolderPath(index));

    props.open(props.index);
  };

  const paddingLeft = 20 * (props.folder.depth - 1);

  return (
    <div className={classes.bookmarksFolderNode}>
      <div className={classes.bookmarksMainFolderNode}>
        <div className={classes.verticalTab} ref={tab}></div>
        <div className={classes.innerContainer} style={{ paddingLeft }}>
          {props.folder.subFolder ? (
            <div className={classes.icon} onClick={openFolder}>
              {props.folder.isOpened ? (
                <AiFillCaretDown className={classes.ironIcon} />
              ) : (
                <AiFillCaretRight className={classes.ironIcon} />
              )}
            </div>
          ) : (
            <div className={classes.noIcon}></div>
          )}
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
        {props.folder.isOpened &&
          props.folder.subFolder.map((subFolder, index) => (
            <BookmarksFolderNode
              key={subFolder.id}
              folder={subFolder}
              index={index}
              select={(index) => selectParentfolder(index)}
              open={(index) => openParentFolder(index)}
            />
          ))}
      </div>
    </div>
  );
}

export default BookmarksFolderNode;
