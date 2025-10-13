import { Router } from "express";
import { check } from "express-validator";
import userCTRL from "../controllers/userController.mjs";
import auth from "../middleware/basicAuth.mjs";

const router = Router();

router
    .route("/")
    .post(
        [
            check("userName", "Please include a valid username").isLength({ min:4 }).trim().escape(),
            check("password", "Password must be at least 6 characters long").isLength({ min: 6 }).trim().escape(),

            check("email", "Email is required").notEmpty(),
            check("email", "Please include a valid email").isEmail().normalizeEmail(),

            check("password", "Password is required").notEmpty(),
            check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
        ],
        userCTRL.registerUser
    );

router.route("/me").get(auth, userCTRL.getUserInfo);

export default router;