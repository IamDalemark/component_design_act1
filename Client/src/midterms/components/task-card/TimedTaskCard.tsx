import { useState } from "react";
import { Task } from "../../types/task.type";
interface TaskComponentProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onToggleChecklistItem?: (taskId: string, index: number) => void;
  onComplete?: (id: string, completed: boolean) => void;
}

const TimedTask = ({
  task,
  onDelete,
  onEdit,
  onComplete,
}: TaskComponentProps) => {
  const isDueToday =
    task.dueDate &&
    new Date(task.dueDate).toDateString() === new Date().toDateString();
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
  const [isCompleted, setIsCompleted] = useState(task.completed || false);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleCompletion = () => {
    const newCompletedState = !isCompleted;
    setIsCompleted(newCompletedState);
    if (onComplete) {
      onComplete(task.id, newCompletedState);
    }
  };

  return (
    <div
      className={`timed-task border border-black p-2 shadow-xl ${
        isCompleted ? "bg-green-200" : "bg-red-300"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleCompletion}
            className="h-4 w-4 mt-1"
          />
          <h3
            className={`text-xl font-semibold ml-5 ${
              isCompleted ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </h3>
        </div>

        <span className="bg-yellow-200 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
          Timed
        </span>
      </div>

      {task.description && (
        <p
          className={`mb-2 ${isCompleted ? "text-gray-500" : "text-gray-600"}`}
        >
          {task.description}
        </p>
      )}

      {!isCompleted && task.dueDate && (
        <div
          className={`mb-4 p-2 rounded ${
            isOverdue
              ? "bg-red-100"
              : isDueToday
              ? "bg-yellow-100"
              : "bg-blue-50"
          }`}
        >
          <p className="flex items-center">
            <span className="mr-2">⏰</span>
            <span>
              {isOverdue ? "Overdue: " : "Due: "}
              {formatDate(task.dueDate)}
            </span>
          </p>
        </div>
      )}

      <div className="flex justify-end mt-2">
        <button
          onClick={() => onEdit(task)}
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded mr-2"
          disabled={isCompleted}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-100 text-red-700 px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TimedTask;
