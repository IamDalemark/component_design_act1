import { Task } from "../types/task.type";

export const TaskSortingStrategy = {
  sortByDate: (tasks: Task[]) =>
    [...tasks].sort(
      (a, b) =>
        new Date(a.dueDate || "").getTime() -
        new Date(b.dueDate || "").getTime()
    ),
  sortByName: (tasks: Task[]) =>
    [...tasks].sort((a, b) => a.title.localeCompare(b.title)),
};
