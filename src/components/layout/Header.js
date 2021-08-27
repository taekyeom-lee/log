import { Link, useLocation } from 'react-router-dom';

import SearchBar from '../ui/SearchBar'
import classes from './Header.module.css';

function Header() {
  const location = useLocation();

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">Christopher Log</Link>
      </div>
      {location.pathname ==='/bookmarks' && <SearchBar />}
      <nav className={classes.nav}>
        <ul>
          <li>
            <Link to="/bookmarks">북마크</Link>
          </li>
          <li>
            <Link to="/write">새글 작성</Link>
          </li>
          <li>
            <p>로그인</p>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
