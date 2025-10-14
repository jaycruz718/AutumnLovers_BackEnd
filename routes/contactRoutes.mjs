import express from 'express';
import Contact from '../models/contactSchema.mjs';

const router = express.Router();

// GET route to fetch all contact messages (or just test endpoint)
router.get('/', async (req, res) => {
  try {
    // If you want to fetch all contact messages from DB:
    const contacts = await Contact.find();
    res.json(contacts);

    // Or, for a simple test, you can just send a test message:
    // res.json({ message: 'Contact GET route is working!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts.' });
  }
});

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
