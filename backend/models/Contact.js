const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  prenom: { type: String, required: true },
  nom: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Contact", contactSchema);