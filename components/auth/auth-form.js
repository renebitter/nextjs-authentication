import { useState, useRef, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Notification from '../ui/notification';

import classes from './auth-form.module.css';

const createUser = async (email, password) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
};

const AuthForm = () => {
  const router = useRouter();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const emailRegisterInputRef = useRef();
  const passwordRegisterInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  const switchAuthModeHandler = (event) => {
    setIsLogin((prevState) => !prevState);
  };

  useEffect(() => {
    //TODO: outsource notification timeout to util/helper
    //Sets notification timeout
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const submitHandler = async (event) => {
    event.preventDefault();

    setRequestStatus('pending');

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredRegisterEmail = emailRegisterInputRef.current.value;
    const enteredRegisterPassword = passwordRegisterInputRef.current.value;

    //Login
    if (isLogin) {
      //Uses next-auth signIn
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        setRequestStatus('success');
        router.replace('/profile');
      }

      if (result.error) {
        setRequestStatus('error');
        setRequestError(result.error);
      }
    } else {
      //Create Account
      try {
        //Creates user
        const result = await createUser(
          enteredRegisterEmail,
          enteredRegisterPassword
        );

        console.log(result);
        setRequestStatus('success');

        //Signs in
        await signIn('credentials', {
          redirect: false,
          email: enteredRegisterEmail,
          password: enteredRegisterPassword,
        });

        //Redirects
        router.replace('/profile');
      } catch (error) {
        setRequestStatus('error');
        setRequestError(error.message);
      }
    }
  };

  //TODO: outsource notification logic to util/helper
  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Pending',
      message: 'Sending request',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success',
      //TODO: when outsourcing needs to account for profile-form as well with data.message. if(data.message){data.message}else{'Authentication successful'}
      message: 'Authentication successful',
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error',
      message: requestError,
    };
  }

  return (
    <section className={classes.auth}>
      <div className={classes.card}>
        <div
          className={
            isLogin
              ? classes.content
              : classes.content + ' ' + classes.cardRotate
          }>
          <div className={classes.front}>
            <div className={classes.innerContent}>
              <h1>Login</h1>
              <form is={classes.loginForm} onSubmit={submitHandler}>
                <div className={classes.control}>
                  <label htmlFor='login-email'>Your Email</label>
                  <input
                    type='email'
                    id='login-email'
                    required
                    ref={emailInputRef}
                  />
                </div>
                <div className={classes.control}>
                  <label htmlFor='login-password'>Your Password</label>
                  <input
                    type='password'
                    id='login-password'
                    required
                    ref={passwordInputRef}
                  />
                </div>
                <div className={classes.actions}>
                  <button>Login</button>
                  <button
                    type='button'
                    className={classes.toggle}
                    onClick={switchAuthModeHandler}>
                    Create new account
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className={classes.back}>
            <div className={classes.innerContent}>
              <h1>Sign Up</h1>
              <form id={classes.registerForm} onSubmit={submitHandler}>
                <div className={classes.control}>
                  <label htmlFor='register-email'>Your Email</label>
                  <input
                    type='email'
                    id='register-email'
                    required
                    ref={emailRegisterInputRef}
                  />
                </div>
                <div className={classes.control}>
                  <label htmlFor='register-password'>Your Password</label>
                  <input
                    type='password'
                    id='register-password'
                    required
                    ref={passwordRegisterInputRef}
                  />
                </div>
                <div className={classes.actions}>
                  <button>Create Account</button>
                  <button
                    type='button'
                    className={classes.toggle}
                    onClick={switchAuthModeHandler}>
                    Login with existing account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
};

export default AuthForm;
