const express = require("express");
const { contact } = require("../controllers/contactController");
const Message = require('../models/Contact');

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("Données reçues :", req.body); // ✅ Vérifiez dans les logs Render
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json({ message: "Message reçu !" });
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du message:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ sentAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error("Erreur lors de la récupération des messages:", err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.delete('/messages/:id', async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    if (!deletedMessage) {
      return res.status(404).json({ error: 'Message non trouvé' });
    }
    res.json({ message: 'Message supprimé avec succès' });
  } catch (err) {
    console.error("Erreur lors de la suppression du message:", err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
