import { useState } from 'react';

import classes from './Auth.module.css';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  function switchIsLoginHandler() {
    setIsLogin((prevState) => !prevState);
  }

  return (
    <div className={classes.auth}>
      <h1>{isLogin ? 'Log In' : 'Sign Up'}</h1>
      <div>
        <div className={classes.control}>
          <label>Your Email</label>
          <input type='email' id='email' placeholder='Enter Email' />
        </div>
        <div className={classes.control}>
          <label>Your Password</label>
          <input type='password' id='password' placeholder='Enter password' />
        </div>
        <div className={classes.control}>
          <button>{isLogin ? 'Log In' : 'Create Account'}</button>
          <span onClick={switchIsLoginHandler}>
            {isLogin ? 'Create new account' : 'Log In with existing account'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Auth;
