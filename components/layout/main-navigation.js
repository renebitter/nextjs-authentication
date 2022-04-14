import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

import classes from './main-navigation.module.css';

function MainNavigation() {
  const { data: session, status } = useSession();
  const authenticated = status === 'authenticated';

  const logoutHandler = () => {
    signOut();
  };

  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && !authenticated && (
            <li>
              <Link href='/auth'>Login</Link>
            </li>
          )}

          {session && authenticated && (
            <>
              <li>
                <Link href='/profile'>
                  <a>Hello, {session.user.email}</a>
                </Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
