import { Task } from "../types/task.type";
interface TaskData {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  type: "basic" | "timed" | "checklist";
}

export const adaptTaskData = (data: TaskData): Task => ({
  id: data.id,
  title: data.title,
  description: data.description,
  dueDate: data.dueDate,
  type: data.type,
});
