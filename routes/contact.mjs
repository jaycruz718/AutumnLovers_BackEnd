import express from 'express';
import Contact from '../models/contactSchema.mjs';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.'});
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: 'Message received successfully!'});
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).json({ error: 'Server error. Please try again later.'});
  }
});

export default router;
