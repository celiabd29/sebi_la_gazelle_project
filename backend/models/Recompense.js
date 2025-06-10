const mongoose = require("mongoose");

const recompenseSchema = new mongoose.Schema({
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
  url: { type: String, required: true },
  jeu: { type: String, required: true },
  niveau: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Recompense", recompenseSchema);
