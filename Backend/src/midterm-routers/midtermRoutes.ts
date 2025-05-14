import { Router, Request, Response } from "express";

const router = Router();

const tasks = [
  {
    id: "1",
    title: "Sample Task",
    type: "basic",
    description: "This is a sample task",
    dueDate: "2025-12-31",
  },
  {
    id: "2",
    title: "Timed Task",
    type: "timed",
    description: "This task is time-bound",
    dueDate: "2025-11-30",
  },
];

router.get("/", (req: Request, res: Response) => {
  res.json(tasks);
});

export default router;
