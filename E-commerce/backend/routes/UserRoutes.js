import express from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getCurrentUserProfile,
  getUserById,
  loginUser,
  logoutCurrentUser,
  updateCurrentUserProfile,
  updateUserById,
} from "../controllers/UserController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();


router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin);

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin,  getUserById)
  .get(authenticate, authorizeAdmin, getAllUsers)
  .put(authenticate, authorizeAdmin, updateUserById);


export default router;