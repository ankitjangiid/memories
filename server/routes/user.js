import express from "express";
import {
  signin,
  signup,
  forgot_password,
  getUserByToken,
  password_reset,
} from "../controllers/user.js";
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/forgot_password", forgot_password);
router.post("/getUserByToken", getUserByToken);
router.post("/reset_password/:token", password_reset);

export default router;
