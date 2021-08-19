import { useState } from 'react';

import BookmarksItem from './BookmarksItem';
import Modal from '../ui/Modal';
import Backdrop from '../ui/Backdrop';
import classes from './BookmarksList.module.css';

import { bookmarks } from '../../data';

function BookmarksList() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [index, setIndex] = useState(0);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [myBookmarks, setMyBookmarks] = useState(bookmarks);

  const openEditModalHandler = () => {
    setEditModalIsOpen(true);
  };

  const closeEditModalHandler = () => {
    setEditModalIsOpen(false);
  };

  return (
    <div className={classes.bookmarksList}>
      {myBookmarks.map((myBookmark) => (
        <BookmarksItem
          key={myBookmark.id}
          myBookmark={myBookmark}
        />
      ))}
    </div>
  );
}

export default BookmarksList;
