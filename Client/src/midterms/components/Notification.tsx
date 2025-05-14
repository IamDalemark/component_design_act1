interface NotificationProps {
  message: string;
  type?: "success" | "warning" | "error" | "info";
  onClose?: () => void;
}

const Notification = ({
  message,
  type = "info",
  onClose,
}: NotificationProps) => {
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          container: "bg-green-100 border-green-500",
          text: "text-green-700",
          icon: "✓",
        };
      case "warning":
        return {
          container: "bg-yellow-100 border-yellow-500",
          text: "text-yellow-700",
          icon: "⚠️",
        };
      case "error":
        return {
          container: "bg-red-100 border-red-500",
          text: "text-red-700",
          icon: "✕",
        };
      case "info":
      default:
        return {
          container: "bg-blue-100 border-blue-500",
          text: "text-blue-700",
          icon: "ℹ️",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={`flex items-center p-3 mb-3 border-l-4 rounded-r ${styles.container}`}
    >
      <div className={`font-bold mr-2 ${styles.text}`}>{styles.icon}</div>
      <div className={`flex-grow ${styles.text}`}>{message}</div>
      {onClose && (
        <button
          onClick={onClose}
          className={`ml-2 ${styles.text} hover:opacity-70`}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Notification;
