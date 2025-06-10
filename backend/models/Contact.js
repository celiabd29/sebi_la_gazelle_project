const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true,
  },
  prenom: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
  // Champ alternatif pour la compatibilité
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);