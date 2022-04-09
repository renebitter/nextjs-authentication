import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
  // //Handled by getServerSideProps() on profile page
  // const router = useRouter();
  // const { data: session, status } = useSession();
  // const loading = status === 'loading';
  // const authenticated = status === 'authenticated';

  // if (loading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  // if (!authenticated) {
  //   router.push('/auth');
  // }

  // if (authenticated) {
  //   return (
  //     <section className={classes.profile}>
  //       <h1>Your User Profile</h1>
  //       <ProfileForm />
  //     </section>
  //   );
  // }

  const changePasswordHandler = async (passwordData) => {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log(data);
  };

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
