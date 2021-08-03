import { useState, useRef } from 'react';
import { GoChevronUp, GoChevronDown } from 'react-icons/go';

import FavoritesList from './FavoriteList';
import classes from './Favorites.module.css';

function Favorites() {
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setURL] = useState('');
  const [myFavorites, setMyFavoritesList] = useState([
    {
      id: 1,
      url: 'https://evan-moon.github.io/2020/05/21/about-cors/',
      title: 'CORS는 왜 이렇게 우리를 힘들게 하는걸까?',
      subject: 'Cors',
    },
    {
      id: 2,
      url: 'https://flamingotiger.github.io/frontend/react/create-react-app-deploy/',
      title: 'React 프로젝트 GitHub Pages로 배포하기',
      subject: 'React',
    },
  ]);

  const nextId = useRef(0);
  const linkInputRef = useRef();
  const urlInputRef = useRef();
  const titleInputRef = useRef();
  const subjectInputRef = useRef();

  function handler(event) {
    event.preventDefault();

    const enteredLink = linkInputRef.current.value;

    fetch(enteredLink)
      .then((res) => res.text())
      .then((html) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, 'text/html');

        setTitle(doc.getElementsByTagName('title')[0].innerHTML);
        setURL(enteredLink);
        setFormIsOpen(true);
      })
      .catch((err) => console.log('Failed to fetch page: ', err));
  }

  function submitHandler(event) {
    event.preventDefault();

    console.log(urlInputRef.current.value);
    console.log(titleInputRef.current.value);
    console.log(subjectInputRef.current.value);

    const myFavorite = {
      id: nextId.current,
      url: urlInputRef.current.value,
      title: titleInputRef.current.value,
      subject: subjectInputRef.current.value,
    };

    setMyFavoritesList(myFavorites.concat(myFavorite));
  }

  function formHandler() {
    setFormIsOpen((prevState) => !prevState);
    nextId.current += 1;
  }

  return (
    <div>
      <div className={classes.favorites}>
        <input type='text' placeholder='링크' ref={linkInputRef} />
        <button type='submit' onClick={handler}>
          입력
        </button>
        {formIsOpen ? (
          <GoChevronUp className={classes.icon} onClick={formHandler} />
        ) : (
          <GoChevronDown className={classes.icon} onClick={formHandler} />
        )}
      </div>
      {formIsOpen && (
        <div className={classes.card}>
          <input
            className={classes.input}
            type='text'
            defaultValue={url}
            placeholder='URL'
            ref={urlInputRef}
          />
          <input
            className={classes.input}
            type='text'
            defaultValue={title}
            placeholder='제목'
            ref={titleInputRef}
          />
          <input
            className={classes.input}
            type='text'
            placeholder='주제'
            ref={subjectInputRef}
          />
          <button className={classes.button} onClick={submitHandler}>
            추가
          </button>
        </div>
      )}
      <FavoritesList myFavorites={myFavorites} />
    </div>
  );
}

export default Favorites;
