import { useState } from 'react';
import { GoSearch } from 'react-icons/go';

import classes from './SearchBar.module.css';

function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);

  const foucsHandler = () => {
    setIsFocused(true);
  }

  const blurHandler = () => {
    setIsFocused(false);
  }

  const changeHandler = (e) => {
    console.log(e.target.value)
  };

  return (
    <div className={classes.searchBar}>
      <GoSearch
          className={classes.searchIcon}
          style={{ color: isFocused ? 'white' : '#bec9e4' }}
        />
        <input
          className={classes.searchInput}
          onFocus={foucsHandler}
          onBlur={blurHandler}
          onChange={changeHandler}
          placeholder="북마크 검색"
        />
    </div>
  )
}

export default SearchBar;