import { useEffect } from "react";

const Notification = ({ status, message, onClear }) => {
  useEffect(() => {
    if (!status) {
      return;
    }

    const timer = setTimeout(() => {
      onClear();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [status, onClear]);

  if (!status) {
    return null;
  }

  return (
    <div className={`notification ${status}`}>
      <strong>
        {status === "pending" && "Sending..."}
        {status === "success" && "Success!"}
        {status === "error" && "Error!"}
      </strong>

      <span>{message}</span>
    </div>
  );
};

export default Notification;