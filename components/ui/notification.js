import classes from './notification.module.css';

function Notification(props) {
  const { title, message } = props;

  return (
    <div className={classes.notification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
