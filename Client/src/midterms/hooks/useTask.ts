import { useEffect, useState } from "react";
import { Task } from "../types/task.type";
import { adaptTaskData } from "../adapters/taskAdapter";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:3000/tasks");
      const rawData = await response.json();
      const adapted = rawData.map(adaptTaskData);
      setTasks(adapted);
    };
    fetchTasks();
  }, []);

  return tasks;
};
