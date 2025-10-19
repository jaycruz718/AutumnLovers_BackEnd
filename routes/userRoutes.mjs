
import { Router } from "express";
import { check } from "express-validator";
import auth from "../middleware/basicAuth.mjs";

// Import only what you need:
import { signupUser } from "../controllers/signupController.mjs";  // for registration
import { registerUser, getUserInfo, loginUser } from "../controllers/userController.mjs";    // for user info

const router = Router();

router.post(
  "/register",
  [
    check("userName", "Username must be at least 4 characters").isLength({ min: 4 }),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
    check("password2", "Confirm password must not be empty").notEmpty(),
    check("password2", "Passwords do not match").custom((value, { req }) => value === req.body.password),
  ],
  registerUser
);

router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  loginUser
);

router.get("/me", auth, getUserInfo);

export default router;
