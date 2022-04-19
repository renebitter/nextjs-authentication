import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
  return (
    <section className={classes.profile}>
      <h1>Authenticated User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
