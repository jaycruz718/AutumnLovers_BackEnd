// routes/eventsRoutes.mjs
import express from "express";
import Event from "../models/eventsSchema.mjs";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

export default router;
