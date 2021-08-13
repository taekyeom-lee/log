import { useState } from 'react';
import { GoKebabVertical } from 'react-icons/go';

import classes from './Bookmarks.module.css';
import icon from '../../img/logo512.png';

function Bookmarks() {
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
  ]);

  function onClickHandler(e) {
    if (e.target.className === classes.item) {
      const child = e.target.parentNode.childNodes;

      for (let i = 0; i < child.length; i++) {
        child[i].classList.remove(classes.clicked);
      }

      e.target.classList.add(classes.clicked);
    } else if (e.target.parentNode.className === classes.item) {
      const child = e.target.parentNode.parentNode.childNodes;

      for (let i = 0; i < child.length; i++) {
        child[i].classList.remove(classes.clicked);
      }

      e.target.parentNode.classList.add(classes.clicked);
    } else if (e.target.parentNode.parentNode.className === classes.item) {
      const child = e.target.parentNode.parentNode.parentNode.childNodes;

      for (let i = 0; i < child.length; i++) {
        child[i].classList.remove(classes.clicked);
      }

      e.target.parentNode.parentNode.classList.add(classes.clicked);
    }
  }

  return (
    <div className={classes.bookmarks}>
      {myBookmarks.map((myBookmark) => (
        <div className={classes.item} key={myBookmark.id} onClick={onClickHandler}>
          <img src={myBookmark.icon} alt={icon}/>
          <div className={classes.text}>
            <div>{myBookmark.title}</div>
            <div className={classes.url}>{myBookmark.url}</div>
          </div>
          <div className={classes.image}>
            <GoKebabVertical />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Bookmarks;
