import express from "express";
import {
    createSubTask,
    createTask,
    dashboardStatistics,
    deleteRestoreTask,
    duplicateTask,
    getTask,
    getTasks,
    postTaskActivity,
    trashTask,
    updateTask,
} from "../controllers/taskController.js";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to create a new task (admin only)
router.post("/create", protectRoute, isAdminRoute, createTask);

// Route to duplicate an existing task (admin only)
router.post("/duplicate/:id", protectRoute, isAdminRoute, duplicateTask);

// Route to post an activity related to a task
router.post("/activity/:id", protectRoute, postTaskActivity);

// Route to get dashboard statistics
router.get("/dashboard", protectRoute, dashboardStatistics);

// Route to get all tasks
router.get("/", protectRoute, getTasks);

// Route to get a specific task by ID
router.get("/:id", protectRoute, getTask);

// Route to create a subtask under a specific task (admin only)
router.put("/create-subtask/:id", protectRoute, isAdminRoute, createSubTask);

// Route to update an existing task (admin only)
router.put("/update/:id", protectRoute, isAdminRoute, updateTask);

// Route to mark a task as trashed (admin only)
router.put("/:id", protectRoute, isAdminRoute, trashTask);

// Route to delete or restore a task (admin only)
router.delete("/delete-restore/:id?", protectRoute, isAdminRoute, deleteRestoreTask);

export default router;
