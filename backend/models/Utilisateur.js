const mongoose = require("mongoose");

const recompenseSchema = new mongoose.Schema({
  url: { type: String, required: true },
  date: { type: Date, default: Date.now },
  jeu: { type: String, required: true },
  description: { type: String, default: "" },
});

const utilisateurSchema = new mongoose.Schema(
  {
    // ... tes champs existants
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true },
    avatar: { type: String, required: true },
    dateDeNaissance: { type: Date, required: true },
    estVerifie: { type: Boolean, default: false },
    verificationToken: { type: String },
    role: {
      type: String,
      enum: ["utilisateur", "admin"],
      default: "utilisateur",
    },
    codeParental: { type: String, default: null },

    recompenses: [recompenseSchema], // <- ajout ici
  },
  { timestamps: true }
);

module.exports = mongoose.model("Utilisateur", utilisateurSchema);
