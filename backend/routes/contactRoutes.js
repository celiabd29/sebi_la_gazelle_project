const express = require("express");
const { contact } = require("../controllers/contactController");
const Message = require('../models/Contact');

const router = express.Router();

router.post("/", contact);


router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ sentAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
