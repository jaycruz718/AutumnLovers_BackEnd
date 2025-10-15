import { Router } from "express";
import { check } from "express-validator";
import auth from "../middleware/basicAuth.mjs";
import userCTRL from "../controllers/userController.mjs";

const router = Router();

router.post(
  "/",
  [
    check("userName", "Username must be at least 4 characters").isLength({ min: 4 }),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
    check("password2", "Confirm password must not be empty").notEmpty(),
    check("password2", "Passwords do not match").custom((value, { req }) => value === req.body.password),
  ],
  userCTRL.registerUser
);

router.get("/me", auth, userCTRL.getUserInfo);

export default router;
