const mongoose = require("mongoose");

const recompenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
  url: { type: String, required: true },
  jeu: { type: String }, // ex : "Drys", "James"
  level: { type: Number },
  stars: { type: Number },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Recompense", recompenseSchema);
