// routes/signupRoute.mjs
import { Router } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import signUp from "../models/signupSchema.mjs";

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
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userName, email, password } = req.body;

    try {
      // Check if user already exists
      let user = await signUp.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      // Create new user
      user = new signUp({
        userName,
        email,
        password,
      });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Create JWT payload
      const payload = {
        user: {
          id: user._id,
          isAdmin: user.isAdmin,
        },
      };

      // Sign JWT token
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "6h" },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

export default router;
