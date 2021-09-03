import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GoSearch } from 'react-icons/go';

import { setKeyword } from '../../store/action/bookmarkAction';

import classes from './SearchBar.module.css';

function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);

  const dispatch = useDispatch();

  const foucsHandler = () => {
    setIsFocused(true);
  };

  const blurHandler = () => {
    setIsFocused(false);
  };

  const changeHandler = (e) => {
    dispatch(setKeyword(e.target.value));
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
  );
}

export default SearchBar;
