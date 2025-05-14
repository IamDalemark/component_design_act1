import { Task } from "../types/task.type";

type TaskEventType = "add" | "update" | "remove" | "toggle-checklist";
type TaskEventCallback = (task: Task) => void;

class TaskManagerClass {
  private static instance: TaskManagerClass;
  private tasks: Task[] = [];
  private eventListeners: Map<TaskEventType, TaskEventCallback[]> = new Map();

  private constructor() {
    this.eventListeners.set("add", []);
    this.eventListeners.set("update", []);
    this.eventListeners.set("remove", []);
    this.eventListeners.set("toggle-checklist", []);
  }

  public static getInstance(): TaskManagerClass {
    if (!TaskManagerClass.instance) {
      TaskManagerClass.instance = new TaskManagerClass();
    }
    return TaskManagerClass.instance;
  }

  public addTask(task: Task): void {
    if (!task.id || !task.title) {
      console.error("Task must have an id and title");
      return;
    }

    const existingIndex = this.tasks.findIndex((t) => t.id === task.id);
    if (existingIndex >= 0) {
      console.warn(
        `Task with ID ${task.id} already exists. Use updateTask instead.`
      );
      return;
    }

    this.tasks.push(task);

    this.notifyListeners("add", task);
  }
  public updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);

    if (index === -1) {
      console.error(`No task found with ID ${updatedTask.id}`);
      return;
    }

    this.tasks[index] = updatedTask;

    this.notifyListeners("update", updatedTask);
  }
  public clearTasks(): void {
    this.tasks = [];
  }

  public removeTask(id: string): void {
    const taskToRemove = this.getTaskById(id);
    if (!taskToRemove) {
      console.error(`No task found with ID ${id}`);
      return;
    }

    this.tasks = this.tasks.filter((task) => task.id !== id);

    this.notifyListeners("remove", taskToRemove);
  }

  public getTasks(): Task[] {
    return [...this.tasks];
  }

  public getTaskById(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  public searchTask(query: string): Task[] {
    if (!query) return this.getTasks();

    const lowercaseQuery = query.toLowerCase();
    return this.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowercaseQuery) ||
        (task.description &&
          task.description.toLowerCase().includes(lowercaseQuery))
    );
  }

  public filterTasksByType(type: Task["type"]): Task[] {
    return this.tasks.filter((task) => task.type === type);
  }

  public getDueTasks(date: Date = new Date()): Task[] {
    const dateString = date.toDateString();

    return this.tasks.filter((task) => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return taskDate.toDateString() === dateString;
    });
  }

  public getOverdueTasks(): Task[] {
    const now = new Date();

    return this.tasks.filter((task) => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return taskDate < now;
    });
  }

  public toggleChecklistItem(taskId: string, index: number): void {
    const task = this.getTaskById(taskId);

    if (!task) {
      console.error(`No task found with ID ${taskId}`);
      return;
    }

    if (
      task.type !== "checklist" ||
      !task.checklistItems ||
      index >= task.checklistItems.length
    ) {
      console.error("Invalid checklist item index or task type");
      return;
    }

    task.checklistItems[index].completed =
      !task.checklistItems[index].completed;

    this.notifyListeners("toggle-checklist", task);
  }

  public addEventListener(
    eventType: TaskEventType,
    callback: TaskEventCallback
  ): void {
    const listeners = this.eventListeners.get(eventType) || [];
    listeners.push(callback);
    this.eventListeners.set(eventType, listeners);
  }

  public removeEventListener(
    eventType: TaskEventType,
    callback: TaskEventCallback
  ): void {
    const listeners = this.eventListeners.get(eventType) || [];
    this.eventListeners.set(
      eventType,
      listeners.filter((cb) => cb !== callback)
    );
  }

  private notifyListeners(eventType: TaskEventType, task: Task): void {
    const listeners = this.eventListeners.get(eventType) || [];
    listeners.forEach((callback) => callback(task));
  }
}

export const TaskManager = TaskManagerClass.getInstance();
