import { useState, useEffect } from "react";
import { useTasks } from "./midterms/hooks/useTask";
import TaskFactory from "./midterms/components/TaskFactory";
import { TaskSortingStrategy } from "./midterms/strategies/taskSortingStrategy";
import { TaskManager } from "./midterms/managers/taskManager";

import { Task } from "./midterms/types/task.type";
const MidtermApp = () => {
  const tasksFromHook = useTasks();
  console.log(tasksFromHook);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortMethod, setSortMethod] = useState<"date" | "name" | "id">("date");
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    dueDate: string;
    type: "basic" | "timed" | "checklist";
    checklistItems: { text: string; completed: boolean }[];
  }>({
    title: "",
    description: "",
    dueDate: "",
    type: "basic",
    checklistItems: [],
  });

  const [newChecklistItem, setNewChecklistItem] = useState("");
  useEffect(() => {
    console.log("Tasks from hook:", tasksFromHook);

    if (
      tasksFromHook &&
      Array.isArray(tasksFromHook) &&
      tasksFromHook.length > 0
    ) {
      tasksFromHook.forEach((task) => {
        TaskManager.addTask(task);
      });

      setTasks(TaskManager.getTasks());
    }
  }, [tasksFromHook]);

  const refreshTasks = () => {
    setTasks([...TaskManager.getTasks()]);
  };
  const getSortedTasks = () => {
    switch (sortMethod) {
      case "date":
        return TaskSortingStrategy.sortByDate(tasks);
      case "name":
        return TaskSortingStrategy.sortByName(tasks);

      default:
        return tasks;
    }
  };

  const handleFormChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setFormData((prev) => ({
        ...prev,
        checklistItems: [
          ...prev.checklistItems,
          { text: newChecklistItem, completed: false },
        ],
      }));
      setNewChecklistItem("");
    }
  };

  const removeChecklistItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      checklistItems: prev.checklistItems.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      alert("Title is required");
      return;
    }

    const taskData: Task = {
      id: editingTask
        ? editingTask.id
        : Math.random().toString(36).substr(2, 9),
      title: formData.title,
      description: formData.description || undefined,
      dueDate: formData.dueDate || undefined,
      type: formData.type,
      checklistItems:
        formData.type === "checklist" ? formData.checklistItems : undefined,
    };

    if (editingTask) {
      TaskManager.updateTask(taskData);
    } else {
      TaskManager.addTask(taskData);
    }

    // Reset
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      type: "basic",
      checklistItems: [],
    });
    setShowAddTaskForm(false);
    setEditingTask(null);
    refreshTasks();
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || "",
      dueDate: task.dueDate || "",
      type: task.type,
      checklistItems: task.checklistItems || [],
    });
    setShowAddTaskForm(true);
  };

  const handleDeleteTask = (id: string) => {
    TaskManager.removeTask(id);
    refreshTasks();
  };

  const handleToggleChecklistItem = (taskId: string, index: number) => {
    TaskManager.toggleChecklistItem(taskId, index);
    refreshTasks();
  };

  const sortedTasks = getSortedTasks();

  return (
    <div className="flex justify-center p-6 min-h-screen">
      <div className="p-6 max-w-4xl mx-auto ">
        <h1 className="text-3xl font-bold mb-6 text-blue-600 ">Task Manager</h1>

        <div className="flex justify-between items-center mb-6">
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
              onClick={() => setShowAddTaskForm(true)}
            >
              Add New Task
            </button>
          </div>

          <div className="flex items-center">
            <span className="mr-2">Sort by:</span>
            <select
              className="border rounded p-2"
              value={sortMethod}
              onChange={(e) => setSortMethod(e.target.value as "date" | "name")}
            >
              <option value="date">Due Date</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {showAddTaskForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {editingTask ? "Edit Task" : "Add New Task"}
              </h2>

              <div>
                <div className="mb-4">
                  <label className="block mb-1">Title:</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleFormChange("title", e.target.value)}
                    className="w-full border rounded p-2"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1">Description:</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      handleFormChange("description", e.target.value)
                    }
                    className="w-full border rounded p-2"
                    rows={3}
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1">Task Type:</label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      handleFormChange(
                        "type",
                        e.target.value as "basic" | "timed" | "checklist"
                      )
                    }
                    className="w-full border rounded p-2"
                  >
                    <option value="basic">Basic</option>
                    <option value="timed">Timed</option>
                    <option value="checklist">Checklist</option>
                  </select>
                </div>

                {(formData.type === "timed" ||
                  formData.type === "checklist") && (
                  <div className="mb-4">
                    <label className="block mb-1">Due Date:</label>
                    <input
                      type="datetime-local"
                      value={formData.dueDate}
                      onChange={(e) =>
                        handleFormChange("dueDate", e.target.value)
                      }
                      className="w-full border rounded p-2"
                    />
                  </div>
                )}

                {formData.type === "checklist" && (
                  <div className="mb-4">
                    <label className="block mb-1">Checklist Items:</label>
                    <ul className="mb-2">
                      {formData.checklistItems.map((item, index) => (
                        <li key={index} className="flex items-center mb-1">
                          <span className="flex-grow">{item.text}</span>
                          <button
                            type="button"
                            onClick={() => removeChecklistItem(index)}
                            className="text-red-500 ml-2"
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                    </ul>

                    <div className="flex">
                      <input
                        type="text"
                        value={newChecklistItem}
                        onChange={(e) => setNewChecklistItem(e.target.value)}
                        className="flex-grow border rounded p-2 mr-2"
                        placeholder="Add item"
                      />
                      <button
                        type="button"
                        onClick={addChecklistItem}
                        className="bg-gray-200 px-3 py-1 rounded"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddTaskForm(false);
                      setEditingTask(null);
                    }}
                    className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    {editingTask ? "Update Task" : "Add Task"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {sortedTasks.map((task) => (
            <div key={task.id} className="border rounded-lg p-4 shadow-sm">
              <TaskFactory
                type={task.type}
                task={task}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
                onToggleChecklistItem={handleToggleChecklistItem}
              />
            </div>
          ))}

          {sortedTasks.length === 0 && (
            <div className="col-span-2 text-center py-8 text-gray-500">
              No tasks available. Add your first task!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MidtermApp;
