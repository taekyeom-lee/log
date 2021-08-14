import { useState } from 'react';
import { GoKebabVertical } from 'react-icons/go';

import Modal from '../ui/Modal';
import Backdrop from '../ui/Backdrop';
import EditModal from '../ui/EditModal';
import EditBackdrop from '../ui/EditBackdrop';
import classes from './Bookmarks.module.css';
import icon from '../../img/logo512.png';

function Bookmarks() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [topPositin, setTopPositin] = useState(0);
  const [myBookmarks, setMyBookmarksList] = useState([
    {
      id: 1,
      url: 'https://www.google.com/',
      title: 'Google',
      icon: icon,
    },
    {
      id: 2,
      url: 'https://www.netflix.com/',
      title: 'Netflix',
      icon: icon,
    },
    {
      id: 3,
      url: 'https://www.instagram.com/',
      title: 'Instagram',
      icon: icon,
    },
  ]);

  function openModalHandler(relativeTop) {
    setModalIsOpen(true);
    setTopPositin(relativeTop);
  }

  function closeModalHadler() {
    setModalIsOpen(false);
  }

  function clickHandler(e) {
    if (
      e.target.className === classes.item ||
      e.target.className === classes.item + ' ' + classes.clicked
    ) {
      const child = e.target.parentNode.childNodes;

      for (let i = 0; i < child.length; i++) {
        child[i].classList.remove(classes.clicked);
      }

      e.target.classList.add(classes.clicked);
    } else if (
      e.target.parentNode.className === classes.item ||
      e.target.parentNode.className === classes.item + ' ' + classes.clicked
    ) {
      const child = e.target.parentNode.parentNode.childNodes;

      for (let i = 0; i < child.length; i++) {
        child[i].classList.remove(classes.clicked);
      }

      e.target.parentNode.classList.add(classes.clicked);

      if (e.target.className === classes.image) {
        const clientRect = e.target.getBoundingClientRect();
        const relativeTop = clientRect.top;

        openModalHandler(relativeTop);
      }
    } else if (
      e.target.parentNode.parentNode.className === classes.item ||
      e.target.parentNode.parentNode.className ===
        classes.item + ' ' + classes.clicked
    ) {
      const child = e.target.parentNode.parentNode.parentNode.childNodes;

      for (let i = 0; i < child.length; i++) {
        child[i].classList.remove(classes.clicked);
      }

      e.target.parentNode.parentNode.classList.add(classes.clicked);

      if (e.target.parentNode.className === classes.image) {
        const clientRect = e.target.parentNode.getBoundingClientRect();
        const relativeTop = clientRect.top;

        openModalHandler(relativeTop);
      }
    }
  }

  function openEditModalHadler() {
    setEditModalIsOpen(true);
  }

  function closeEditModalHandler() {
    setEditModalIsOpen(false);
  }

  function updateEditModalHadler() {
    setTitle(myBookmarks[0].title);
    setUrl(myBookmarks[0].url);
  }

  return (
    <div className={classes.bookmarks}>
      {myBookmarks.map((myBookmark) => (
        <div
          className={classes.item}
          key={myBookmark.id}
          onClick={clickHandler}
        >
          <img src={myBookmark.icon} alt={icon} />
          <div className={classes.text}>
            <div>{myBookmark.title}</div>
            <div className={classes.url}>{myBookmark.url}</div>
          </div>
          <div className={classes.image} onClick={updateEditModalHadler}>
            <GoKebabVertical />
          </div>
        </div>
      ))}
      {editModalIsOpen && (
        <EditModal
          title={title}
          url={url}
          getEditCancel={closeEditModalHandler}
        />
      )}
      {modalIsOpen && (
        <Modal
          onClose={closeModalHadler}
          topPosition={topPositin}
          getEditModalIsOpen={openEditModalHadler}
        />
      )}
      {modalIsOpen && <Backdrop onClose={closeModalHadler} />}
      {editModalIsOpen && <EditBackdrop />}
    </div>
  );
}

export default Bookmarks;
