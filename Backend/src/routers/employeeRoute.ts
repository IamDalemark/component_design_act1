import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json([{ id: 1, name: "daniel1", role: "waterboy", salary: 30000 }, { id: 2, name: "daniel2", role: "waterboy", salary: 40000 }, { id: 3, name: "daniel3", role: "deluxe waterboy ", salary: 50001 }, { id: 4, name: "daniel4", role: "waterboy", salary: 10000 }, { id: 5, name: "daniel5", role: "waterboy with skills", salary: 60000 },]);
});

export default router;
