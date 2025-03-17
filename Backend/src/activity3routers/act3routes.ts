import express, { Request, Response } from "express";
import { Member } from "../types/member.type";

const router = express.Router();

let users: Member[] = [];

// GET 
router.get("/", (req: Request, res: Response): void => {
  res.json(users);
});

// POST
router.post("/", (req: Request, res: Response): any => {
  try {
    const newMember: Member = req.body;
    console.log(newMember)
    if (!newMember.firstName || !newMember.lastName) {
      return res.status(400).json({ error: "First name and last name are required" });
    }


    users.push(newMember);


    res.status(201).json(newMember);
  } catch (error) {
    console.error("Error adding new member:", error);
    res.status(500).json({ error: "Failed to add new member" });
  }
});

// DELETE member
router.delete("/:id", (req: Request, res: Response): any => {
  try {
    const memberId = req.params.id;
    const initialLength = users.length;

    users = users.filter(user => user.id !== memberId);

    if (users.length === initialLength) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({ error: "Failed to delete member" });
  }
});

// PATCH member salary
router.patch("/:id", (req: Request, res: Response): any => {
  try {
    const memberId = req.params.id;
    const updates = req.body;

    const memberIndex = users.findIndex(user => user.id === memberId);

    if (memberIndex === -1) {
      return res.status(404).json({ error: "Member not found" });
    }

    users[memberIndex] = {
      ...users[memberIndex],
      ...updates
    };

    res.status(200).json(users[memberIndex]);
  } catch (error) {
    console.error("Error updating member:", error);
    res.status(500).json({ error: "Failed to update member" });
  }
});
export default router;