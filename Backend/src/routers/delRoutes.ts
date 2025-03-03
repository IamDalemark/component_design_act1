import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Delbogsh" });
});

router.delete("/", (req: Request, res: Response) => {
  res.json({ message: " Data Deleted" });
})

export default router;
