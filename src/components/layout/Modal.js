import { useState } from 'react';

import classes from './Modal.module.css';

function Modal(props) {
  const [isLogin, setIsLogin] = useState(true);

  function switchIsLoginHandler() {
    setIsLogin((prevState) => !prevState);
  }

  return (
    <div className={classes.modal}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <div onClick={props.onOpen}>
        <div>
          <label>Your Email</label>
          <input name='email' />
        </div>
        <div>
          <label>Your Password</label>
          <input />
        </div>
        <div>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button onClick={switchIsLoginHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
