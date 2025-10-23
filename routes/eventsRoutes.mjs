import express from "express";
import eventsData from "../utilities/eventsData.mjs";

const router = express.Router();

// GET all events
router.get("/", (req, res) => {
  res.json(eventsData);
});

// GET single event by id
router.get("/:id", (req, res) => {
  const event = eventsData.find(e => e._id === req.params.id);
  if (!event) return res.status(404).json({ error: "Event not found" });
  res.json(event);
});

// Optional: POST new event
router.post("/", (req, res) => {
  const { title, description, date, location, createdBy } = req.body;
  if (!title || !description || !date || !location) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newEvent = {
    _id: String(Date.now()),
    title,
    description,
    date: new Date(date),
    location,
    createdBy: createdBy || "Guest"
  };

  eventsData.push(newEvent);
  res.status(201).json(newEvent);
});

export default router;
