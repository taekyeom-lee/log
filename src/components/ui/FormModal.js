import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addItem, editItem } from '../../store/action/bookmarkAction';

import classes from './FormModal.module.css';

function FormModal(props) {
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const id = props.id;

  const selectedData = useSelector((state) => state.bookmark.bookmarks);
  const nextId = useRef(selectedData[selectedData.length - 1].id);
  const dispatch = useDispatch();

  const changeTitleHandler = (e) => {
    setTitle(e.target.value);
  };

  const chagneUrlHandler = (e) => {
    setUrl(e.target.value);
  };

  const cancelHandler = () => {
    props.onClose();
  };

  const saveHandler = (e) => {
    if (url) {
      if (props.type === 'add') {
        dispatch(addItem(nextId.current + 1, title, url));
        props.onClose();
      } else if (props.type === 'edit') {
        dispatch(editItem(id, title, url));
        props.onClose();
      }
    } else {
      alertErrorHandler(e);
    }
  };

  const alertErrorHandler = (e) => {
    e.target.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[0].classList.add(
      classes.error
    );
    setIsError(true);
  };

  useEffect(() => {
    if (props.type === 'edit') {
      setTitle(props.title);
      setUrl(props.url);
    }
  }, []);

  return (
    <div className={classes.formModal}>
      {props.type === 'add' && <div className={classes.title}>북마크 추가</div>}
      {props.type === 'edit' && (
        <div className={classes.title}>북마크 수정</div>
      )}
      <div className={classes.form}>
        <div className={classes.name}>
          <div className={classes.text}>이름</div>
          <input
            className={classes.input}
            value={title}
            onChange={changeTitleHandler}
          />
        </div>
        <div className={classes.url}>
          <div className={classes.text}>URL</div>
          <input
            className={classes.input}
            value={url}
            onChange={chagneUrlHandler}
          />
          {isError && (
            <div className={classes.error}>URL이 올바르지 않습니다.</div>
          )}
        </div>
      </div>
      <div className={classes.button}>
        <button className={classes.cancelButton} onClick={cancelHandler}>
          취소
        </button>
        <button className={classes.saveButton} onClick={saveHandler}>
          저장
        </button>
      </div>
    </div>
  );
}

export default FormModal;
