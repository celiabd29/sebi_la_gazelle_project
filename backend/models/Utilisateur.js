const mongoose = require("mongoose");

const utilisateurSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true },
    avatar: { type: String, default: "default-avatar.png" },
}, { timestamps: true });

module.exports = mongoose.model("Utilisateur", utilisateurSchema);
