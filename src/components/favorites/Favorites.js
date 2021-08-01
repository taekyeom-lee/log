import { useState, useRef } from 'react';

import classes from './Favorites.module.css';

function Favorites() {
  const [isValidLink, setIsValidLink] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setURL] = useState('');

  const linkInputRef = useRef();

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

        setIsValidLink(true);
      })
      .catch((err) => console.log('Failed to fetch page: ', err));
  }

  return (
    <div>
      <div className={classes.favorites}>
        <input type='text' required ref={linkInputRef} placeholder='링크' />
        <button type='submit' onClick={handler}>
          추가
        </button>
      </div>
      {isValidLink && <div>{title}</div>}
      {isValidLink && <div>{url}</div>}
    </div>
  );
}

export default Favorites;
