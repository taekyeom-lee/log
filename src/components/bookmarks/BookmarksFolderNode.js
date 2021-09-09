import { useState, useRef, useEffect } from 'react';
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai';

import Folder from '../../resources/img/folder.svg';
import OpenedFolder from '../../resources/img/opened_folder.svg';
import classes from './BookmarksFolderNode.module.css';

function BookmarksFolderNode(props) {
  const [folderIsOpen, setFolderIsOpen] = useState(false);
  const [subfoldersSelected, setSubFoldersSelected] = useState(
    new Array(props.folder.length).fill(false)
  );
  const tab = useRef();
  const img = useRef();
  const title = useRef();

  useEffect(() => {
    if (props.isSelected) {
      tab.current.style.backgroundColor = '#1a73eb';
      img.current.src = OpenedFolder;
      title.current.style.color = '#1a73eb';
    } else {
      tab.current.style.backgroundColor = 'transparent';
      img.current.src = Folder;
      title.current.style.color = 'black';
    }
  }, [props.isSelected]);

  const openFolder = () => {
    setFolderIsOpen((prevState) => !prevState);
  };

  const selectFolder = () => {
    props.select(props.index);
  };

  const selectSubfolder = (index) => {
    let result = new Array(props.folder.subFolder.length).fill(false);
    result[index] = true;
    setSubFoldersSelected(result);
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
          <img src={Folder} className={classes.folderIcon} ref={img} />
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
              isSelected={subfoldersSelected[index]}
              select={(index) => selectSubfolder(index)}
            />
          ))}
      </div>
    </div>
  );
}

export default BookmarksFolderNode;
