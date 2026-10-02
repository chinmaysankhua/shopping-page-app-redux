const Notification = ({ status }) => {
  if (status === "sending") {
    return (
      <div className="notification sending">
        <strong>Sending...</strong>
        <span>Sending cart data!</span>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="notification success">
        <strong>Success!</strong>
        <span>Sent cart data successfully!</span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="notification error">
        <strong>Error!</strong>
        <span>Sending cart data failed!</span>
      </div>
    );
  }

  return null;
};

export default Notification;