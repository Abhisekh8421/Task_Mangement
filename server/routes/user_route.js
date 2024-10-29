import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user_controller.js";
import { UserAuthentication } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/auth", UserAuthentication);
router.get("/logout", logoutUser);

export default router;
