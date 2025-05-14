import { Task } from "../types/task.type";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Buy groceries",
    description: "Milk, Bread, Eggs",
    dueDate: "2025-05-10T12:00:00Z", // overdue
    type: "basic",
  },
  {
    id: "2",
    title: "Math Homework",
    description: "Complete chapter 5 problems",
    dueDate: "2025-05-15T23:59:00Z", // future
    type: "timed",
  },
  {
    id: "3",
    title: "Packing Checklist",
    description: "Pack clothes, charger, passport",
    dueDate: "2025-05-14T18:00:00Z", // future
    type: "checklist",
  },
  {
    id: "4",
    title: "Call Dentist",
    description: "Schedule next appointment",
    type: "basic",
  },
  {
    id: "5",
    title: "Submit project",
    description: "Push final code to GitHub",
    dueDate: "2025-05-11T15:00:00Z", // overdue
    type: "timed",
  },
];
