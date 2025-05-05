const mongoose = require("mongoose");

const utilisateurSchema = new mongoose.Schema({
    nom: { type: String, required: false },
    prenom: { type: String, required: false },
    age: { type: Number, required: false },
    email: { type: String, required: false, unique: true },
    motDePasse: { type: String, required: true },
    avatar: { type: String, default: "default-avatar.png" },
    estVerifie: { type: Boolean, default: false },
    verificationToken: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Utilisateur", utilisateurSchema);
