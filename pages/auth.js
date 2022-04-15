import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import AuthForm from '../components/auth/auth-form';

function AuthPage() {
  const router = useRouter();
  const { status } = useSession();

  if (status === 'loading') {
    //TODO: add styling
    return <p>Loading...</p>;
  }
  if (status === 'authenticated') {
    router.replace('/profile');
  } else {
    //(status === 'unauthenticated')
    return <AuthForm />;
  }

  // //Alternatively with getSession()
  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (session) {
  //       router.replace('/');
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, [router]);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // } else {
  //   return <AuthForm />;
  // }
}

export default AuthPage;
