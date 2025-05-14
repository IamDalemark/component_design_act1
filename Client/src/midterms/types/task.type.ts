export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  type: "basic" | "timed" | "checklist";
  checklistItems?: { text: string; completed: boolean }[];
  completed?: boolean;
}
