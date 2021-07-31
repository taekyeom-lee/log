import { Link } from 'react-router-dom';

import classes from './Header.module.css';

function Header({ propsFunction }) {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to='/'>
          Christopher Log
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to='/favorites'>북마크</Link>
          </li>
          <li>
            <Link to='/write'>새글 작성</Link>
          </li>
          <li>
            <p onClick={propsFunction}>로그인</p>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
