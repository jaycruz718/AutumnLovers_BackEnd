// routes/signupRoute.mjs
import { Router } from "express";
import { check } from "express-validator";
import dotenv from "dotenv";
import { signupUser } from "../controllers/signupController.mjs";

dotenv.config();

const router = Router();

// POST /api/signup
router.post(
  "/",
  [
    check("userName", "Username must be at least 4 characters")
      .isLength({ min: 4 })
      .trim()
      .escape(),
    check("email", "Please include a valid email")
      .isEmail()
      .normalizeEmail(),
    check("password", "Password must be at least 6 characters")
      .isLength({ min: 6 }),
    check("password2", "Confirm password field must not be empty").notEmpty(),
  ],
  signupUser
);

export default router;
