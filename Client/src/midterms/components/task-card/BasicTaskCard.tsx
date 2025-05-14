import { useState } from "react";
import { Task } from "../../types/task.type";
interface TaskComponentProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onToggleChecklistItem?: (taskId: string, index: number) => void;
  onComplete?: (id: string, completed: boolean) => void;
}

const BasicTask = ({
  task,
  onDelete,
  onEdit,
  onComplete,
}: TaskComponentProps) => {
  const [isCompleted, setIsCompleted] = useState(task.completed || false);

  const handleCompletion = () => {
    const newCompletedState = !isCompleted;
    setIsCompleted(newCompletedState);
    if (onComplete) {
      onComplete(task.id, newCompletedState);
    }
  };

  return (
    <div
      className={`basic-task border border-black p-2 shadow-xl ${
        isCompleted ? "bg-green-200" : "bg-orange-300"
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
            className={`text-xl font-semibold ml-3 ${
              isCompleted ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </h3>
        </div>

        <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded">
          Basic
        </span>
      </div>

      {task.description && (
        <p
          className={`mb-4 ${isCompleted ? "text-gray-500" : "text-gray-600"}`}
        >
          {task.description}
        </p>
      )}

      <div className="flex justify-end mt-4">
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
export default BasicTask;
