import express from "express";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddleware.js";
import {
    activateUserProfile,
    changeUserPassword,
    deleteUserProfile,
    getNotificationsList,
    getTeamList,
    loginUser,
    logoutUser,
    markNotificationRead,
    registerUser,
    updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

// Route to register a new user
router.post("/register", registerUser);

// Route to log in a user
router.post("/login", loginUser);

// Route to log out a user
router.post("/logout", logoutUser);

// Route to get a list of all team members (admin only)
router.get("/get-team", protectRoute, isAdminRoute, getTeamList);

// Route to get notifications for the logged-in user
router.get("/notifications", protectRoute, getNotificationsList);

// Route to update user profile
router.put("/profile", protectRoute, updateUserProfile);

// Route to mark notifications as read
router.put("/read-noti", protectRoute, markNotificationRead);

// Route to change user password
router.put("/change-password", protectRoute, changeUserPassword);

// Routes for admin to activate or delete a user profile
router
    .route("/:id")
    .put(protectRoute, isAdminRoute, activateUserProfile)
    .delete(protectRoute, isAdminRoute, deleteUserProfile);

export default router;
