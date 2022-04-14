function Notification(props) {
  const { title, message } = props;

  return (
    <div style={{ color: 'white' }}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
