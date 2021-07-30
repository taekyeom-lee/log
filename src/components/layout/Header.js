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
            <Link to='/favorites'>My Favorites</Link>
          </li>
          <li>
            <Link to='/write'>New Log</Link>
          </li>
          <li>
            <p onClick={propsFunction}>Sign In</p>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
