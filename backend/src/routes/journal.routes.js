const express = require('express');
const { authenticate, isAdmin } = require('../middleware/authenticat');
const Journal = require('../models/journal.model');
const router = express.Router();



router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    console.log("create journel", req.body);
    const journal = new Journal(req.body);
    await journal.save();
    res.status(201).json(journal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const journals = await Journal.find();
    res.status(200).json(journals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal) return res.status(404).json({ error: 'Journal not found' });
    res.status(200).json(journal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const journal = await Journal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!journal) return res.status(404).json({ error: 'Journal not found' });
    res.status(200).json(journal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const journal = await Journal.findByIdAndDelete(req.params.id);
    if (!journal) return res.status(404).json({ error: 'Journal not found' });
    res.status(200).json({ message: 'Journal deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
