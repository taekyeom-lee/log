import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  addItem,
  editItem,
  setId,
  editFolder,
  addFolder,
} from '../../store/action/bookmarkAction';

import classes from './FormModal.module.css';

function FormModal(props) {
  const propsFunctionType = props.functionType;
  const propsDataType = props.dataType;
  const propsId = props.id;
  const propsTitle = props.title;
  const propsUrl = props.url;

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [isError, setIsError] = useState(false);

  const selected = useSelector((state) => state.bookmark);
  const dispatch = useDispatch();

  const selectedId = selected.currentId;
  const selectedPath = selected.selectFolderPath;
  const selectedDepth = selected.selectFolderDepth;

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const chagneUrl = (e) => {
    setUrl(e.target.value);
  };

  const cancelButton = () => {
    props.onClose();
  };

  const saveButton = () => {
    if (propsDataType === 'bookmark') {
      if (url) {
        switch (propsFunctionType) {
          case 'add':
            dispatch(
              addItem(selectedId + 1, selectedPath, selectedDepth, title, url)
            );
            dispatch(setId(selectedId + 1));
            props.onClose();
            break;
          case 'edit':
            dispatch(
              editItem(propsId, selectedPath, selectedDepth, title, url)
            );
            props.onClose();
            break;
          default:
            break;
        }
      } else {
        alertError();
      }
    }
    if (propsDataType === 'folder') {
      switch (propsFunctionType) {
        case 'add':
          dispatch(
            addFolder(selectedId + 1, selectedPath, selectedDepth, title)
          );
          dispatch(setId(selectedId + 1));
          props.onClose();
          break;
        case 'edit':
          dispatch(editFolder(propsId, selectedPath, selectedDepth, title));
          props.onClose();
          break;
        default:
          break;
      }
    }
  };

  const alertError = () => {
    setIsError(true);
  };

  useEffect(() => {
    if (propsFunctionType === 'edit') {
      if (propsDataType === 'bookmark') {
        setTitle(propsTitle);
        setUrl(propsUrl);
      }
      if (propsDataType === 'folder') {
        setTitle(propsTitle);
      }
    }
  }, [propsFunctionType, propsDataType, propsTitle, propsUrl]);

  return (
    <div className={classes.formModal}>
      {propsDataType === 'bookmark' && (
        <div>
          {propsFunctionType === 'add' && (
            <div className={classes.title}>북마크 추가</div>
          )}
          {propsFunctionType === 'edit' && (
            <div className={classes.title}>북마크 수정</div>
          )}
          <div className={classes.bookmarkForm}>
            <div className={classes.name}>
              <div className={classes.text}>이름</div>
              <input
                className={classes.input}
                value={title}
                onChange={changeTitle}
              />
            </div>
            <div className={classes.url}>
              <div className={classes.text}>URL</div>
              <input
                className={classes.input}
                value={url}
                onChange={chagneUrl}
              />
              {isError && (
                <div className={classes.error}>URL이 올바르지 않습니다.</div>
              )}
            </div>
          </div>
          <div className={classes.button}>
            <button className={classes.cancelButton} onClick={cancelButton}>
              취소
            </button>
            <button className={classes.saveButton} onClick={saveButton}>
              저장
            </button>
          </div>
        </div>
      )}
      {propsDataType === 'folder' && (
        <div>
          {propsFunctionType === 'add' && (
            <div className={classes.title}>폴더 추가</div>
          )}
          {propsFunctionType === 'edit' && (
            <div className={classes.title}>폴더 이름 바꾸기</div>
          )}
          <div className={classes.folderForm}>
            <div className={classes.name}>
              <div className={classes.text}>이름</div>
              <input
                className={classes.input}
                value={title}
                onChange={changeTitle}
              />
            </div>
          </div>
          <div className={classes.button}>
            <button className={classes.cancelButton} onClick={cancelButton}>
              취소
            </button>
            <button className={classes.saveButton} onClick={saveButton}>
              저장
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormModal;
