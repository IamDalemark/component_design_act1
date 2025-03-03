import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "on post bogsh route" });
});

router.post("/", (req: Request, res: Response) => {

  res.status(200).json({ message: "Data received", data: req.body });
});
export default router;
