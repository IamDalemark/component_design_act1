import { Task } from "../types/task.type";

const ReminderDecorator = ({
  task,
  children,
}: {
  task: Task;
  children: React.ReactNode;
}) => {
  const isDueToday =
    task.dueDate &&
    new Date(task.dueDate).toDateString() === new Date().toDateString();

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  const getTimeRemaining = () => {
    if (!task.dueDate) return null;

    const currentTime = new Date().getTime();
    const dueTime = new Date(task.dueDate).getTime();
    const timeRemaining = dueTime - currentTime;

    if (timeRemaining < 0) {
      return "Overdue";
    }

    // Convert milliseconds to days, hours, minutes
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );

    if (days > 0) {
      return `${days}d ${hours}h remaining`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    } else {
      return `${minutes}m remaining`;
    }
  };

  const getReminderStatus = () => {
    if (!task.dueDate) return null;

    if (isOverdue) {
      return {
        icon: "🔴",
        color: "text-red-600",
        label: "Overdue",
      };
    } else if (isDueToday) {
      return {
        icon: "🟠",
        color: "text-orange-500",
        label: "Due today",
      };
    } else {
      return {
        icon: "🟢",
        color: "text-green-500",
        label: getTimeRemaining(),
      };
    }
  };

  const reminderStatus = getReminderStatus();

  return (
    <div className="relative">
      {reminderStatus && (
        <div
          className={`absolute top-0 right-0 ${reminderStatus.color} flex items-center text-xs font-medium`}
        >
          <span className="mr-1">{reminderStatus.icon}</span>
          <span>{reminderStatus.label}</span>
        </div>
      )}
      {children}
    </div>
  );
};

export default ReminderDecorator;
