import express from 'express';
import Event from '../models/eventSchema.mjs';

const router = express.Router();

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events.' });
  }
});

// GET single event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found.' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch event.' });
  }
});

// POST create a new event
router.post('/', async (req, res) => {
  console.log('Incoming POST /api/events');
  console.log('Request body:', req.body);

  const { title, description, date } = req.body;

  if (!title || !description || !date) {
    console.log('Missing fields');
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const newEvent = new Event({ title, description, date });
    await newEvent.save();
    console.log('Event saved:', newEvent);
    res.status(201).json(newEvent);
  } catch (err) {
    console.error('Failed to save event:', err);
    res.status(500).json({ error: 'Failed to create event.' });
  }
});

// PUT update an event
router.put('/:id', async (req, res) => {
  const { title, description, date } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, date },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) return res.status(404).json({ error: 'Event not found.' });

    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update event.' });
  }
});

// DELETE an event
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Event not found.' });
    res.json({ message: 'Event deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event.' });
  }
});

export default router;
