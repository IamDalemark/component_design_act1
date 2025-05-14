import { Task } from "../types/task.type";
import { BasicTask, TimedTask, ChecklistTask } from "./task-card";
interface TaskFactoryProps {
  type: Task["type"];
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onToggleChecklistItem?: (taskId: string, index: number) => void;
  onComplete?: (id: string, completed: boolean) => void;
}

const TaskFactory = ({
  type,
  task,
  onDelete,
  onEdit,
  onToggleChecklistItem,
  onComplete,
}: TaskFactoryProps) => {
  switch (type) {
    case "basic":
      return (
        <BasicTask
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onComplete={onComplete}
        />
      );
    case "timed":
      return (
        <TimedTask
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onComplete={onComplete}
        />
      );
    case "checklist":
      return (
        <ChecklistTask
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleChecklistItem={onToggleChecklistItem}
        />
      );
    default:
      return <div>Unknown task type</div>;
  }
};

export default TaskFactory;
