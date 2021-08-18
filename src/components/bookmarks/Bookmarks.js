import { useState } from 'react';
import { GoKebabVertical } from 'react-icons/go';

import Modal from '../ui/Modal';
import Backdrop from '../ui/Backdrop';
import EditModal from '../ui/EditModal';
import EditBackdrop from '../ui/EditBackdrop';
import AddModal from '../ui/AddModal';
import classes from './Bookmarks.module.css';
import icon from '../../img/logo512.png';

function Bookmarks() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [index, setIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [topPosition, setTopPosition] = useState(0);
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
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
    {
      id: 4,
      url: 'https://www.google.com/',
      title: 'Google1',
      icon: icon,
    },
    {
      id: 5,
      url: 'https://www.netflix.com/',
      title: 'Netflix1',
      icon: icon,
    },
    {
      id: 6,
      url: 'https://www.instagram.com/',
      title: 'Instagram1',
      icon: icon,
    },
    {
      id: 7,
      url: 'https://www.google.com/',
      title: 'Google2',
      icon: icon,
    },
    {
      id: 8,
      url: 'https://www.netflix.com/',
      title: 'Netflix2',
      icon: icon,
    },
    {
      id: 9,
      url: 'https://www.instagram.com/',
      title: 'Instagram2',
      icon: icon,
    },
    {
      id: 10,
      url: 'https://www.google.com/',
      title: 'Google3',
      icon: icon,
    },
    {
      id: 11,
      url: 'https://www.netflix.com/',
      title: 'Netflix3',
      icon: icon,
    },
    {
      id: 12,
      url: 'https://www.instagram.com/',
      title: 'Instagram3',
      icon: icon,
    },
    {
      id: 13,
      url: 'https://www.google.com/',
      title: 'Google4',
      icon: icon,
    },
    {
      id: 14,
      url: 'https://www.netflix.com/',
      title: 'Netflix4',
      icon: icon,
    },
    {
      id: 15,
      url: 'https://www.instagram.com/',
      title: 'Instagram4',
      icon: icon,
    },
    {
      id: 16,
      url: 'https://www.google.com/',
      title: 'Google5',
      icon: icon,
    },
    {
      id: 17,
      url: 'https://www.netflix.com/',
      title: 'Netflix5',
      icon: icon,
    },
    {
      id: 18,
      url: 'https://www.instagram.com/',
      title: 'Instagram5',
      icon: icon,
    },
  ]);

  function openModalHandler(relativeTop) {
    setModalIsOpen(true);
    setTopPosition(relativeTop);
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

  // Modal
  // Modal - Edit function
  function openEditModalHadler() {
    setEditModalIsOpen(true);
  }

  function closeEditModalHandler() {
    setEditModalIsOpen(false);
  }

  const updateEditModalHandler = (id) => (e) => {
    setTitle(myBookmarks[id - 1].title);
    setUrl(myBookmarks[id - 1].url);
    setIndex(id - 1);
  };

  function saveEditModalHandler(title, url) {
    let newMyBookmarks = [...myBookmarks];

    newMyBookmarks[index].url = url;
    newMyBookmarks[index].title = title;

    setMyBookmarksList(newMyBookmarks);
    setEditModalIsOpen(false);
  }

  // Modal - Delete function
  function deleteModalHandler() {
    let newMyBookmarks = [...myBookmarks];

    newMyBookmarks.splice(index, 1);

    for (let i = 0; i < newMyBookmarks.length; i++) {
      newMyBookmarks[i].id = i + 1;
    }

    setMyBookmarksList(newMyBookmarks);
  }

  function saveAddModalHandler(title, url) {
    let newMyBookmarks = [...myBookmarks];

    const length = newMyBookmarks.length;

    newMyBookmarks.push({ id: length + 1, title: title, url: url, icon: icon });

    setMyBookmarksList(newMyBookmarks);
    setAddModalIsOpen(false);
  }

  function closeAddModalHandler() {
    setAddModalIsOpen(false);
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
          <div
            className={classes.image}
            onClick={updateEditModalHandler(myBookmark.id)}
          >
            <GoKebabVertical />
          </div>
        </div>
      ))}
      {modalIsOpen && (
        <Modal
          onClose={closeModalHadler}
          topPosition={topPosition}
          getEditModalIsOpen={openEditModalHadler}
          getModalDelete={deleteModalHandler}
        />
      )}
      {editModalIsOpen && (
        <EditModal
          title={title}
          url={url}
          getEditModalCancel={closeEditModalHandler}
          getEditModalSave={saveEditModalHandler}
        />
      )}
      {addModalIsOpen && (
        <AddModal
          title={title}
          url={url}
          getAddModalCancel={closeAddModalHandler}
          getAddModalSave={saveAddModalHandler}
        />
      )}
      {modalIsOpen && <Backdrop onClose={closeModalHadler} />}
      {editModalIsOpen && <EditBackdrop />}
      {addModalIsOpen && <EditBackdrop />}
    </div>
  );
}

export default Bookmarks;
