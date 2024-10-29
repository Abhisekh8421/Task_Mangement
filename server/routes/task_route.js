import express from "express";
import {
  addNewTask,
  deleteTask,
  getAllTasks,
  UpdateTask,
} from "../controllers/task_controller.js";

const router = express.Router();

router.post("/add-new-task", addNewTask);
router.get("/get-all-tasks-by-userid/:id", getAllTasks);
router.delete("/delete-task/:id", deleteTask);
router.put("/update-task", UpdateTask);

export default router;
