function Notification(props) {
  const { title, message } = props;

  return (
    <div style={{ color: 'white', backgroundColor: '#38015c' }}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
