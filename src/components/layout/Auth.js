import { useState } from 'react';

import classes from './Auth.module.css';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  function switchIsLoginHandler() {
    setIsLogin((prevState) => !prevState);
  }

  return (
    <div className={classes.auth}>
      <h1>{isLogin ? '로그인' : '회원가입'}</h1>
      <div>
        <div className={classes.control}>
          <input type='email' id='email' placeholder='이메일' />
        </div>
        <div className={classes.control}>
          <input type='password' id='password' placeholder='비밀번호' />
        </div>
        <div className={classes.control}>
          <button>{isLogin ? '로그인' : '회원가입'}</button>
        </div>
        <div className={classes.foot}>
          <span>
            {isLogin ? '아직 회원이 아니신가요?' : '계정이 이미 있으신가요?'}
          </span>
          <div className={classes.link} onClick={switchIsLoginHandler}>
            {isLogin ? '회원가입' : '로그인'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
