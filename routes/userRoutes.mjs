import { Router } from "express";
import { check } from "express-validator";
import userCTRL from "../controllers/userController.mjs";

const router = Router();

router
    .route("/")
    .post(
        [
            check("userName", "Please include a valid username").isLength({ min:4 }).trim().escape(),
            check("email", "Please include a valid email").isEmail().normalizeEmail(),
            check("password", "Password must be at least 6 characters long").isLength(
                { min: 6 }
            ),
        ],
        userCTRL.registerUser
    );

export default router;