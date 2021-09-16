import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  addItem,
  editItem,
  setId,
  editFolder,
} from '../../store/action/bookmarkAction';

import classes from './FormModal.module.css';

function FormModal(props) {
  const propsType = props.type;
  const propsTypee = props.typee;
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
  const selectDepth = selected.selectFolderDepth;

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
    if (url) {
      switch (propsType) {
        case 'add':
          dispatch(
            addItem(selectedId + 1, selectedPath, selectDepth, title, url)
          );
          dispatch(setId(selectedId + 1));
          props.onClose();
          break;
        case 'edit':
          if (propsTypee === 'bookmark')
            dispatch(editItem(propsId, selectedPath, selectDepth, title, url));
          props.onClose();
          break;
        default:
          break;
      }
    } else {
      if (propsTypee === 'folder') {
        dispatch(editFolder(propsId, selectedPath, selectDepth, title));
        props.onClose();
      } else alertError();
    }
  };

  const alertError = () => {
    setIsError(true);
  };

  useEffect(() => {
    if (propsType === 'edit' && propsTypee === 'bookmark') {
      setTitle(propsTitle);
      setUrl(propsUrl);
    }
    if (propsType === 'edit' && propsTypee === 'folder') {
      setTitle(propsTitle);
    }
  }, [propsType, propsTitle, propsUrl, propsTypee]);

  return (
    <div className={classes.formModal}>
      {propsType === 'add' && propsTypee === 'bookmark' && (
        <div className={classes.title}>북마크 추가</div>
      )}
      {propsType === 'edit' && propsTypee === 'bookmark' && (
        <div className={classes.title}>북마크 수정</div>
      )}
      {propsType === 'edit' && propsTypee === 'folder' && (
        <div className={classes.title}>폴더 이름 바꾸기</div>
      )}
      <div className={classes.form}>
        <div className={classes.name}>
          <div className={classes.text}>이름</div>
          <input
            className={classes.input}
            value={title}
            onChange={changeTitle}
          />
        </div>
        {propsTypee === 'bookmark' && (
          <div className={classes.url}>
            <div className={classes.text}>URL</div>
            <input className={classes.input} value={url} onChange={chagneUrl} />
            {isError && (
              <div className={classes.error}>URL이 올바르지 않습니다.</div>
            )}
          </div>
        )}
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
  );
}

export default FormModal;
