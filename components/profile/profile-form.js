import { useRef, useState, useEffect } from 'react';
import Notification from '../ui/notification';

import classes from './profile-form.module.css';

function ProfileForm(props) {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();
  const [requestSuccess, setRequestSuccess] = useState();

  useEffect(() => {
    //Sets notification timeout
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
        setRequestSuccess(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const submitHandler = async (event) => {
    event.preventDefault();

    setRequestStatus('pending');

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPasswordRef = newPasswordRef.current.value;

    const changePassword = {
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPasswordRef,
    };

    try {
      const response = await fetch('/api/user/change-password', {
        method: 'PATCH',
        body: JSON.stringify(changePassword),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      setRequestStatus('success');
      setRequestSuccess(data.message);

      return data;
    } catch (error) {
      setRequestStatus('error');
      setRequestError(error.message);
    }
  };

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
      message: requestSuccess,
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error',
      message: requestError,
    };
  }

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id='new-password'
          ref={newPasswordRef}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id='old-password'
          ref={oldPasswordRef}
        />
      </div>
      <button type='button' onClick={togglePassword}>
        {showPassword ? 'Hide Passwords' : 'Show Passwords'}
      </button>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </form>
  );
}

export default ProfileForm;
