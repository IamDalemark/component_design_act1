import { Task } from "../../types/task.type";
interface TaskComponentProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onToggleChecklistItem?: (taskId: string, index: number) => void;
}
const ChecklistTask = ({
  task,
  onDelete,
  onEdit,
  onToggleChecklistItem,
}: TaskComponentProps) => {
  const isDueToday =
    task.dueDate &&
    new Date(task.dueDate).toDateString() === new Date().toDateString();
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const completedItemsCount =
    task.checklistItems?.filter((item) => item.completed).length || 0;
  const totalItems = task.checklistItems?.length || 0;
  const progress =
    totalItems > 0 ? Math.round((completedItemsCount / totalItems) * 100) : 0;

  return (
    <div className="checklist-task  bg-green-300 border border-black p-2 shadow-xl">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold">{task.title}</h3>
        <span className="bg-green-200 text-green-800 text-xs font-medium px-2 py-1 rounded">
          Checklist
        </span>
      </div>

      {task.description && (
        <p className="text-gray-600 mb-2">{task.description}</p>
      )}

      {task.dueDate && (
        <div
          className={`mb-3 p-2 rounded ${
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

      {task.checklistItems && task.checklistItems.length > 0 && (
        <div>
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>
                Progress: {completedItemsCount}/{totalItems}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <ul className="bg-gray-50 p-2 rounded mb-3">
            {task.checklistItems.map((item, index) => (
              <li key={index} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() =>
                    onToggleChecklistItem &&
                    onToggleChecklistItem(task.id, index)
                  }
                  className="mr-2"
                />
                <span
                  className={item.completed ? "line-through text-gray-500" : ""}
                >
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-end mt-2">
        <button
          onClick={() => onEdit(task)}
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded mr-2"
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

export default ChecklistTask;
